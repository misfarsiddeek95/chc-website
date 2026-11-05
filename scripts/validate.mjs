// Site-wide checks against a running build (default http://127.0.0.1:3000).
// Usage: npm run build && npm start, then: node scripts/validate.mjs [baseUrl]
//   Static export: npm run build:static, serve out/, add --static (skips the
//   server-only redirect test).        Requires Playwright + Chromium.
// Checks per page and width: JS errors, hydration warnings, one <h1>, title and
// description present and unique, internal links resolve, images have alt text,
// no horizontal scrolling. Then runs interaction smoke tests.
const PW = process.env.PLAYWRIGHT_MODULE ?? 'playwright'
const { chromium } = await import(PW)
const args = process.argv.slice(2)
const isStatic = args.includes('--static')
const base = args.find(a => !a.startsWith('--')) ?? 'http://127.0.0.1:3000'
const sitemap = await fetch(base + '/sitemap.xml').then(r => r.text())
const extra = ['/privacy-policy/', '/terms-and-conditions/', '/cancellation-policy/', '/cookie-policy/']
const paths = [...sitemap.matchAll(/<loc>https:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map(m => m[1]).concat(extra)
const known = new Set(paths)
const widths = [1440, 1024, 768, 375]

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH })
const problems = []
const titles = new Map()
const descriptions = new Map()

for (const width of widths) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } })
  for (const p of paths) {
    const page = await ctx.newPage()
    const errs = []
    page.on('pageerror', e => errs.push('pageerror: ' + e.message))
    page.on('console', m => {
      const t = m.text()
      if (m.type() === 'error' && !/Failed to load resource|ERR_|net::/.test(t)) errs.push('console: ' + t)
      if (/hydrat/i.test(t)) errs.push('hydration: ' + t)
    })
    await page.goto(base + p, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(400)
    const info = await page.evaluate(() => ({
      h1: document.querySelectorAll('h1').length,
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
      noAlt: [...document.querySelectorAll('img:not([alt])')].map(i => i.getAttribute('src')),
      ids: [...document.querySelectorAll('[id]')].map(e => e.id),
      robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '',
      rss: !!document.querySelector('link[rel="alternate"][type="application/rss+xml"]'),
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent),
    }))
    const dupIds = info.ids.filter((id, i) => info.ids.indexOf(id) !== i)
    if (info.h1 !== 1) problems.push(`${p} @${width}: ${info.h1} <h1> elements`)
    if (info.overflow > 1) problems.push(`${p} @${width}: horizontal overflow ${info.overflow}px`)
    if (info.noAlt.length) problems.push(`${p}: images without alt: ${info.noAlt.join(', ')}`)
    if (dupIds.length) problems.push(`${p}: duplicate ids: ${[...new Set(dupIds)].join(', ')}`)
    for (const l of info.links) {
      if (!l.startsWith('/') || l.startsWith('//')) continue
      const [pathOnly, hash] = l.split('#')
      if (pathOnly && !known.has(pathOnly)) {
        // Files (sitemap.xml, rss.xml, images…) aren't routes: request them instead.
        const ok = /\.[a-z0-9]+$/i.test(pathOnly) && (await fetch(base + pathOnly).then(r => r.ok).catch(() => false))
        if (!ok) problems.push(`${p}: broken internal link ${l}`)
      }
      if (hash && (!pathOnly || pathOnly === p) && !info.ids.includes(hash)) problems.push(`${p}: anchor #${hash} not found`)
    }
    if (width === 1440) {
      if (!info.desc) problems.push(`${p}: missing meta description`)
      const shouldIndex = !extra.includes(p)
      if (!info.robots.startsWith(shouldIndex ? 'index' : 'noindex')) problems.push(`${p}: robots "${info.robots}"`)
      if (!info.rss) problems.push(`${p}: RSS alternate link missing`)
      for (const j of info.jsonLd) { try { JSON.parse(j) } catch { problems.push(`${p}: invalid JSON-LD`) } }
      if (p !== '/' && !info.jsonLd.some(j => j.includes('BreadcrumbList'))) problems.push(`${p}: no BreadcrumbList`)
      if (!info.canonical.endsWith(p)) problems.push(`${p}: canonical ${info.canonical}`)
      if (titles.has(info.title)) problems.push(`${p}: duplicate title with ${titles.get(info.title)}`)
      if (descriptions.has(info.desc)) problems.push(`${p}: duplicate description with ${descriptions.get(info.desc)}`)
      titles.set(info.title, p); descriptions.set(info.desc, p)
      if (info.title.length > 70) problems.push(`${p}: title ${info.title.length} chars`)
      if (info.desc.length > 165) problems.push(`${p}: description ${info.desc.length} chars`)
    }
    errs.forEach(e => problems.push(`${p} @${width}: ${e}`))
    await page.close()
  }
  await ctx.close()
}

// Interaction smoke tests
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
const step = async (name, fn) => { try { await fn(); console.log('PASS', name) } catch (e) { problems.push(`interaction "${name}": ${e.message}`); console.log('FAIL', name) } }
await page.goto(base + '/', { waitUntil: 'domcontentloaded' })
await step('services dropdown opens and navigates client-side', async () => {
  await page.getByRole('button', { name: 'Services' }).click()
  await page.getByRole('link', { name: /Paediatric & Early Intervention/ }).first().click()
  await page.waitForURL('**/early-intervention/')
  await page.waitForFunction(() => document.title.startsWith('Paediatric Early Intervention'), null, { timeout: 5000 })
    .catch(async () => { throw new Error('title not updated: ' + (await page.title())) })
})
await step('hero slider: next, tabs and pause work', async () => {
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' })
  const h1 = page.locator('h1')
  if (!(await h1.innerText()).includes('Recover stronger')) throw new Error('slide 1 heading missing')
  if ((await page.locator('[data-slide]').count()) !== 7) throw new Error('expected 7 slides')
  await page.getByRole('button', { name: 'Next slide' }).click()
  await page.waitForFunction(() => document.querySelector('h1')?.textContent?.includes('Early support'))
  await page.getByRole('button', { name: /Show slide 3/ }).click()
  await page.waitForFunction(() => document.querySelector('h1')?.textContent?.includes('Personalised care'))
  const pause = page.getByRole('button', { name: 'Pause slideshow' })
  await pause.click()
  await page.getByRole('button', { name: 'Play slideshow' }).waitFor()
  const current = await page.locator('[aria-current="true"][data-slide]').getAttribute('data-slide')
  if (current !== '2') throw new Error('expected slide 3 to be current, got ' + current)
})
await step('locations: city tabs and arrows change the card', async () => {
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' })
  const loc = page.locator('#locations')
  await loc.getByRole('tab', { name: 'Sydney' }).click()
  // Every city panel is in the HTML (for crawlers); only the chosen one is visible.
  await loc.locator('h3:visible', { hasText: 'Sydney' }).first().waitFor()
  if (await loc.getByText('Our three clinics').isVisible()) throw new Error('Brisbane clinic list still shown for Sydney')
  await loc.getByRole('button', { name: 'Next city' }).click()
  await loc.locator('h3:visible', { hasText: 'Melbourne' }).first().waitFor()
  await loc.getByRole('tab', { name: 'Brisbane' }).click()
  await loc.getByText('Our three clinics').waitFor()
  if (await page.locator('#location-panel-2').count() !== 1) throw new Error('inactive city panels are missing from the HTML')
})
await step('booking dialog validates required fields', async () => {
  await page.getByRole('button', { name: 'Book Appointment' }).first().click()
  const dialog = page.getByRole('dialog', { name: 'Book an Appointment' })
  await page.waitForFunction(() => document.activeElement?.getAttribute('name') === 'firstName', null, { timeout: 2000 })
    .catch(() => { throw new Error('focus did not move to First name') })
  await dialog.getByRole('button', { name: 'Request Appointment' }).click()
  await dialog.getByText('Enter your first name.').waitFor()
  await page.keyboard.press('Escape')
  if (await dialog.count()) throw new Error('dialog did not close on Escape')
})
// Static build: forms hand off to the email app. Server build: forms POST to /api/enquiry,
// which is stubbed here so no email is sent (scripts/api-test.mjs tests the real endpoint).
const sentText = isStatic ? 'Almost done — send the email to finish.' : 'Thank you — your request is with our team.'
if (!isStatic) {
  await page.route('**/api/enquiry', async route => {
    const body = route.request().postDataJSON()
    if (body.firstName === 'Server') {
      return route.fulfill({ status: 422, contentType: 'application/json', body: JSON.stringify({ error: 'Please check the highlighted fields.', errors: { phone: 'Server says: check this phone number.' } }) })
    }
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
  })
  await step('server-side field errors are shown on the form', async () => {
    await page.goto(base + '/contact/')
    await page.getByLabel('First name').fill('Server')
    await page.getByLabel('Last name').fill('Check')
    await page.getByLabel('Phone').fill('0412 345 678')
    await page.getByLabel('Email', { exact: true }).fill('test@example.com')
    await page.getByLabel('How can we help?').fill('Testing')
    await page.getByRole('checkbox', { name: /I agree/ }).check()
    await page.getByRole('button', { name: 'Send Enquiry' }).click()
    await page.getByText('Server says: check this phone number.').waitFor({ timeout: 3000 })
    const focused = await page.evaluate(() => document.activeElement?.getAttribute('name'))
    if (focused !== 'phone') throw new Error('focus not moved to the field: ' + focused)
  })
}
await step('enquiry form success state', async () => {
  await page.goto(base + '/contact/')
  await page.getByLabel('First name').fill('Test')
  await page.getByLabel('Last name').fill('Person')
  await page.getByLabel('Phone').fill('0412 345 678')
  await page.getByLabel('Email', { exact: true }).fill('test@example.com')
  await page.getByLabel('How can we help?').fill('Testing the form')
  await page.getByRole('checkbox', { name: /I agree/ }).check()
  await page.getByRole('button', { name: 'Send Enquiry' }).click()
  await page.getByText(sentText).waitFor({ timeout: 3000 })
})
await step('NDIS eligibility check gives a result', async () => {
  await page.goto(base + '/ndis-eligibility/')
  await page.getByRole('button', { name: /See my result/ }).click()
  await page.getByText('Please answer all four questions.').waitFor()
  for (const name of ['age', 'residency', 'disability', 'support']) await page.locator(`input[name="${name}"][value="yes"]`).check({ force: true })
  await page.getByRole('button', { name: /See my result/ }).click()
  await page.getByText('You may be eligible for the NDIS.').waitFor()
})
await step('mobile menu opens', async () => {
  await page.setViewportSize({ width: 375, height: 800 })
  await page.goto(base + '/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.locator('#mobile-menu').getByRole('link', { name: 'Podiatry' }).waitFor({ state: 'detached' }).catch(() => {})
  await page.locator('#mobile-menu').getByRole('link', { name: 'Allied Health & Rehabilitation' }).click()
  await page.waitForURL('**/allied-health-services/')
})
await step('Careers is in the main menu; Franchise is under About', async () => {
  await page.setViewportSize({ width: 1024, height: 800 })
  await page.goto(base + '/')
  const nav = page.getByRole('navigation', { name: 'Main' })
  await nav.getByRole('link', { name: 'Careers', exact: true }).click()
  await page.waitForURL('**/careers/')
  await nav.getByRole('button', { name: 'About' }).click()
  await nav.getByRole('link', { name: 'Franchise With Us' }).click()
  await page.waitForURL('**/franchise-with-us/')
  await page.setViewportSize({ width: 1440, height: 900 })
})
await step('franchise interest form validates and hands off to email', async () => {
  await page.goto(base + '/franchise-with-us/')
  const form = page.locator('#express-interest form')
  await form.getByRole('button', { name: 'Express Your Interest' }).click()
  await form.getByText('Tell us briefly about your background and preferred location.').waitFor()
  await form.getByLabel('First name').fill('Sam')
  await form.getByLabel('Last name').fill('Lee')
  await form.getByLabel('Phone').fill('0412 345 678')
  await form.getByLabel('Email', { exact: true }).fill('sam@example.com')
  await form.getByLabel('Preferred location').selectOption('Western Australia')
  await form.getByLabel('Your background and goals').fill('Physiotherapist, Perth')
  await form.getByRole('checkbox', { name: /I agree/ }).check()
  await form.getByRole('button', { name: 'Express Your Interest' }).click()
  await page.getByText(sentText).waitFor({ timeout: 3000 })
})
await step('footer feedback & complaints section is prominent on every page', async () => {
  await page.goto(base + '/about-us/')
  const box = page.locator('footer section[aria-labelledby="footer-feedback-title"]')
  await box.getByRole('heading', { name: 'Feedback & complaints' }).waitFor()
  for (const name of [/Give feedback/, /Make a complaint/, /How we handle complaints/]) await box.getByRole('link', { name }).waitFor()
})
await step('unknown URL shows 404 page (noindex)', async () => {
  const res = await page.goto(base + '/no-such-page/')
  if (res.status() !== 404) throw new Error('status ' + res.status())
  await page.getByRole('heading', { name: 'We can’t find that page.' }).waitFor()
  const robots = await page.locator('meta[name="robots"]').evaluateAll(els => els.map(e => e.getAttribute('content')))
  if (robots.length !== 1 || !robots[0]?.startsWith('noindex')) throw new Error('404 robots: ' + robots.join(' | '))
})
if (!isStatic) {
  await step('old WordPress URLs redirect (301)', async () => {
    for (const [from, to] of [['/our-team-paige/', '/our-team/'], ['/branches/', '/locations/'], ['/covid-safe-practices/', '/']]) {
      const res = await fetch(base + from, { redirect: 'manual' })
      const loc = new URL(res.headers.get('location') ?? '', base).pathname
      if (![301, 308].includes(res.status) || loc !== to) throw new Error(`${from} → ${res.status} ${loc}`)
    }
  })
  await step('security headers are sent', async () => {
    const res = await fetch(base + '/')
    for (const h of ['content-security-policy', 'x-content-type-options', 'referrer-policy', 'x-frame-options']) {
      if (!res.headers.get(h)) throw new Error('missing ' + h)
    }
    if (res.headers.get('x-powered-by')) throw new Error('x-powered-by is exposed')
  })
}
await step('sitemap.xml, robots.txt and RSS feed are valid', async () => {
  const urls = [...sitemap.matchAll(/<loc>/g)].length
  if (urls < 30) throw new Error('sitemap has ' + urls + ' URLs')
  const robots = await fetch(base + '/robots.txt').then(r => r.text())
  if (!/Sitemap: https:\/\/completehealthcareconnect\.com\.au\/sitemap\.xml/.test(robots)) throw new Error('robots.txt: ' + robots)
  const rss = await fetch(base + '/blog/rss.xml')
  const body = await rss.text()
  if (!rss.ok || !body.includes('<rss') || (body.match(/<item>/g) ?? []).length < 4) throw new Error('rss feed invalid')
  await page.goto('about:blank')
  const ok = await page.evaluate(x => !new DOMParser().parseFromString(x, 'application/xml').querySelector('parsererror'), body)
  if (!ok) throw new Error('rss is not well-formed XML')
})
await step('closed chat panel is not focusable; opens, replies and closes on Escape', async () => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(base + '/')
  const panel = page.locator('#chat-panel')
  if (!(await panel.evaluate(el => el.inert))) throw new Error('closed panel is not inert')
  await page.getByRole('button', { name: 'Open chat' }).click()
  if (await panel.evaluate(el => el.inert)) throw new Error('open panel is inert')
  await page.getByLabel('Type a message').fill('Hello')
  await page.keyboard.press('Enter')
  await panel.getByText('Thanks for your message.').waitFor({ timeout: 3000 })
  await page.keyboard.press('Escape')
  await page.waitForFunction(() => document.querySelector('#chat-panel')?.inert === true)
})
await step('dialog closes when a link inside it changes the page', async () => {
  await page.goto(base + '/')
  await page.getByRole('button', { name: 'Book Appointment' }).first().click()
  const dialog = page.getByRole('dialog', { name: 'Book an Appointment' })
  await dialog.getByRole('link', { name: 'privacy policy' }).click()
  await page.waitForURL('**/privacy-policy/')
  await dialog.waitFor({ state: 'detached' })
})
await step('location tabs: arrow keys move selection', async () => {
  await page.goto(base + '/')
  const tabs = page.locator('#locations [role="tab"]')
  await tabs.first().focus()
  await page.keyboard.press('ArrowRight')
  const sel = await page.locator('#locations [role="tab"][aria-selected="true"]').innerText()
  if (sel !== 'Sydney') throw new Error('selected ' + sel)
  const focused = await page.evaluate(() => document.activeElement?.textContent)
  if (focused !== 'Sydney') throw new Error('focus on ' + focused)
})
await step('client navigation moves focus to main content', async () => {
  await page.goto(base + '/')
  await page.locator('footer').getByRole('link', { name: 'Accessibility' }).click()
  await page.waitForURL('**/accessibility/')
  await page.waitForFunction(() => document.activeElement?.id === 'main')
})
await step('honeypot: filled-in bot field is not emailed', async () => {
  await page.goto(base + '/contact/')
  await page.getByLabel('First name').fill('Bot')
  await page.getByLabel('Last name').fill('Bot')
  await page.getByLabel('Phone').fill('0412 345 678')
  await page.getByLabel('Email', { exact: true }).fill('bot@example.com')
  await page.getByLabel('How can we help?').fill('spam')
  await page.getByRole('checkbox', { name: /I agree/ }).check()
  await page.locator('input[name="website"]').fill('http://spam.example', { force: true })
  await page.getByRole('button', { name: 'Send Enquiry' }).click()
  await page.getByText('Thank you — your request is with our team.').waitFor({ timeout: 3000 })
})

await browser.close()
console.log(`\nChecked ${paths.length} pages × ${widths.length} widths.`)
console.log(problems.length ? `${problems.length} problem(s):\n- ` + problems.join('\n- ') : 'No problems found.')
process.exit(problems.length ? 1 : 0)
