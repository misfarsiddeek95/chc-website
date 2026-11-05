// Integration tests for POST /api/enquiry against a running server build.
//   npm run build && npm start   (then, in another terminal)
//   npm run test:api -- http://localhost:3000
// Uses no mail provider: in production mode without RESEND_API_KEY the endpoint
// answers 503 after all checks pass, which is what these tests expect for valid input.

const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '')
const url = base + '/api/enquiry'
const origin = new URL(base).origin
const good = { type: 'contact', firstName: 'Ana', lastName: 'Lee', phone: '0412 345 678', email: 'ana@example.com', message: 'Hello', consent: 'yes', page: '/contact/' }
let failures = 0
let ipCounter = 0

async function post(body, { headers = {}, raw } = {}) {
  ipCounter++
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin, 'Sec-Fetch-Site': 'same-origin', 'X-Forwarded-For': `203.0.113.${ipCounter}`, ...headers },
    body: raw ?? JSON.stringify(body),
  })
}

async function check(name, fn) {
  try {
    await fn()
    console.log('PASS', name)
  } catch (e) {
    failures++
    console.log('FAIL', name, '-', e.message)
  }
}
const expect = (cond, msg) => { if (!cond) throw new Error(msg) }

await check('GET is not allowed', async () => {
  const r = await fetch(url)
  expect(r.status === 405, `status ${r.status}`)
})
await check('cross-site POST is refused (CSRF)', async () => {
  const r = await post(good, { headers: { Origin: 'https://evil.example', 'Sec-Fetch-Site': 'cross-site' } })
  expect(r.status === 403, `status ${r.status}`)
})
await check('form-encoded POST is refused', async () => {
  const r = await post(null, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, raw: 'firstName=a' })
  expect(r.status === 415, `status ${r.status}`)
})
await check('malformed JSON gives 400', async () => {
  const r = await post(null, { raw: '{"type":' })
  expect(r.status === 400, `status ${r.status}`)
})
await check('oversized body gives 413', async () => {
  const r = await post({ ...good, message: 'x'.repeat(40_000) })
  expect(r.status === 413, `status ${r.status}`)
})
await check('invalid fields give 422 with field errors', async () => {
  const r = await post({ ...good, email: 'nope', phone: '1' })
  const b = await r.json()
  expect(r.status === 422 && b.errors.email && b.errors.phone, `status ${r.status} ${JSON.stringify(b)}`)
})
await check('honeypot is answered with 200 and not sent', async () => {
  const r = await post({ ...good, website: 'spam' })
  expect(r.status === 200, `status ${r.status}`)
})
await check('valid enquiry passes every check (503 without a mail provider, 200 with one)', async () => {
  const r = await post(good)
  expect(r.status === 503 || r.status === 200, `status ${r.status}`)
  expect(r.headers.get('cache-control')?.includes('no-store'), 'missing no-store')
})
await check('rate limit: 6th request from one IP in 10 minutes gets 429', async () => {
  const ip = '198.51.100.77'
  let last
  for (let i = 0; i < 6; i++) last = await post({ ...good, email: 'x' }, { headers: { 'X-Forwarded-For': ip } })
  expect(last.status === 429 && last.headers.get('retry-after'), `status ${last.status}`)
})
await check('security headers are set on pages', async () => {
  const r = await fetch(base + '/')
  for (const h of ['content-security-policy', 'strict-transport-security', 'x-content-type-options', 'x-frame-options', 'referrer-policy', 'permissions-policy']) {
    expect(r.headers.get(h), `missing ${h}`)
  }
  expect(!r.headers.get('x-powered-by'), 'x-powered-by is exposed')
})

console.log(failures ? `\n${failures} failed` : '\nAll API checks passed.')
process.exit(failures ? 1 : 0)
