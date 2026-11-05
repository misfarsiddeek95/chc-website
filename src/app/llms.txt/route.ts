// /llms.txt: a plain-text guide to the site for AI assistants and answer engines
// (llmstxt.org). Generated from the route table and business facts, so it stays in sync.
import { clinics, contact, serviceRegions, SITE_NAME, SITE_URL, telehealthServices } from '@/content/site'
import { routes } from '@/lib/routes'

export const dynamic = 'force-static'

export function GET() {
  const indexed = routes.filter(r => !r.noindex)
  const group = (name: string) =>
    indexed.filter(r => r.section === name).map(r => `- [${r.title.replace(/ \| (CHC|Complete Healthcare Connect)$/, '')}](${SITE_URL}${r.path}): ${r.description}`).join('\n')

  const body = `# ${SITE_NAME}

> ${SITE_NAME} (CHC) is a registered NDIS and NIISQ provider offering allied health (physiotherapy, occupational therapy, speech pathology, podiatry), NDIS disability support, community nursing, DVA Community Nursing, aged care, paediatric early intervention and supported accommodation. It has three clinics in South East Queensland and provides in-home support and telehealth in other Australian states.

- Phone: ${contact.phone} (after-hours calls also go to this number)
- Fax: ${contact.fax}
- Email: ${contact.email}
- Hours: ${contact.hours}
- ABN: ${contact.abn}
- Telehealth: ${telehealthServices.join(', ')}
- NDIS provider registration ID: 4-FZ38IK2
- Clinics: ${clinics.map(c => `${c.name} (${c.street}, ${c.suburb} QLD ${c.postcode})`).join('; ')}
- Service regions: ${serviceRegions.map(r => `${r.state}: ${r.areas.replace(/\.$/, '')}`).join('; ')}

## Services
${group('Services')}

## Allied health
${group('Allied health')}

## Resources and help
${group('Resources & help')}

## About CHC
${group('About CHC')}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
