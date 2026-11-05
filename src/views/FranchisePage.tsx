import { Icons } from '@/components/Icons'
import EnquiryForm from '@/components/EnquiryForm'
import { CardGrid, CheckGrid, OutlineButton, PageHero, PrimaryLink, Section, SectionHeader, Steps } from '@/components/ui'
import { contact } from '@/content/site'

// Franchise content supplied by the business (Oct 2026). The model was confirmed as
// finalised in Nov 2026; the business holds the regulatory (disclosure) documents.

const benefits = [
  { title: 'Established brand', body: 'Build under the CHC healthcare identity.' },
  { title: 'Business setup support', body: 'Guidance with planning, operations and service development.' },
  { title: 'Marketing & growth', body: 'Branding, marketing and business development support.' },
  { title: 'Clinical governance', body: 'Access to quality, compliance and clinical governance frameworks.' },
  { title: 'Recruitment support', body: 'Help with workforce planning and onboarding.' },
  { title: 'Technology & systems', body: 'Access to approved clinical and operational systems.' },
  { title: 'Multidisciplinary opportunities', body: 'Potential to expand across allied health, disability, aged care and community nursing.' },
]

const models = [
  { title: 'Allied health clinics', body: 'Establish a clinic offering physiotherapy, occupational therapy, speech pathology, podiatry and rehabilitation.' },
  { title: 'Community nursing & healthcare', body: 'Develop community-based nursing, rehabilitation and in-home healthcare services.' },
  { title: 'Disability & aged care', body: 'Explore NDIS disability support, aged care and Support at Home services, subject to relevant approvals.' },
  { title: 'Regional & remote healthcare', body: 'Help improve healthcare access in underserved communities through clinics, outreach and telehealth.' },
]

const partners = [
  'Allied health professionals and nurses',
  'Healthcare entrepreneurs and business owners',
  'Existing clinic operators',
  'Investors and business partners',
  'People passionate about healthcare and community impact',
]

const regions = [
  { title: 'Queensland', body: 'Brisbane, Gold Coast, Sunshine Coast, Toowoomba, Townsville and Cairns.' },
  { title: 'New South Wales', body: 'Sydney and regional NSW.' },
  { title: 'Victoria', body: 'Melbourne and regional Victoria.' },
  { title: 'South Australia', body: 'Adelaide and surrounding regions.' },
  { title: 'Western Australia', body: 'Perth and regional WA.' },
  { title: 'Somewhere else?', body: 'Other locations may be considered. Tell us where you’d like to build your business.' },
]

export default function FranchisePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About', to: '/about-us/' }, { label: 'Franchise With Us' }]}
        badge="Be your own boss · Build your future · Make a difference"
        title="Your business. Your ambition. Our healthcare network."
        intro={
          <div className="space-y-4">
            <p>Dreaming of owning your own healthcare business? We’re creating opportunities for ambitious healthcare professionals, entrepreneurs and investors to explore business ownership within a growing multidisciplinary healthcare network.</p>
            <p>Whether you’re a physiotherapist, occupational therapist, speech pathologist, nurse, existing clinic owner or business-minded entrepreneur, explore building your future with CHC.</p>
          </div>
        }
        img="https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=800&h=600&fit=crop&auto=format"
        imgAlt="Healthcare worker smiling with an older patient"
        actions={
          <>
            <PrimaryLink href="#express-interest">Express Your Interest<Icons.ArrowRight /></PrimaryLink>
            <OutlineButton href="#opportunities">Explore Opportunities</OutlineButton>
          </>
        }
      />

      <Section tone="white" id="why-franchise" labelledBy="why-title">
        <SectionHeader
          eyebrow="Why franchise with CHC"
          title={<span id="why-title">The independence of business ownership. The strength of an established healthcare brand.</span>}
          intro="Starting a healthcare business doesn’t have to mean building everything from the ground up. Our franchise model offers:"
        />
        <CardGrid cards={benefits} />
      </Section>

      <Section tone="lavender" id="opportunities" labelledBy="opportunities-title">
        <SectionHeader eyebrow="Franchise opportunities" title={<span id="opportunities-title">Own your future. Grow with CHC.</span>} />
        <CardGrid cards={models} columns={4} />
      </Section>

      <Section tone="white" id="partners" labelledBy="partners-title">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="Who can become a franchise partner"
              title={<span id="partners-title">You bring the ambition. We’ll help you explore the opportunity.</span>}
              intro="We welcome expressions of interest from:"
            />
          </div>
          <CheckGrid items={partners} columns={1} tone="plain" />
        </div>
      </Section>

      <Section tone="warm" id="locations" labelledBy="locations-title">
        <SectionHeader eyebrow="Opportunities across Australia" title={<span id="locations-title">Where you could build your business.</span>} />
        <CardGrid cards={regions} />
      </Section>

      <Section tone="white" id="journey" labelledBy="journey-title">
        <SectionHeader eyebrow="Your journey starts here" title={<span id="journey-title">Four steps to business ownership.</span>} />
        <Steps
          steps={[
            { title: 'Express your interest', body: 'Tell us about your background and preferred location.' },
            { title: 'Explore the opportunity', body: 'Discuss potential franchise models and your business goals.' },
            { title: 'Plan your business', body: 'Review investment requirements, support and regulatory obligations.' },
            { title: 'Launch & grow', body: 'Subject to agreements and approvals, establish your healthcare business.' },
          ]}
        />
      </Section>

      <Section tone="cream" id="express-interest" labelledBy="interest-title">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">Build a business with purpose</p>
            <h2 id="interest-title" className="font-display text-3xl md:text-4xl font-bold text-[#1a1238] leading-tight mb-4">
              Take the first step towards business ownership.
            </h2>
            <div className="space-y-4 mb-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                Your future. Your success. Your opportunity. Join us in exploring a healthcare business that combines professional ambition with meaningful community impact.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Send your details and our team will be in touch to talk through the opportunity.
              </p>
            </div>
            <a href={contact.phoneHref} className="inline-flex items-center gap-2 text-[#27156F] font-semibold text-lg hover:text-[#9e5c00]">
              <Icons.Phone /> {contact.phone}
            </a>
          </div>
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-[#1a1238] mb-1">Become a franchise partner</h3>
            <p className="text-sm text-gray-600 mb-6">All fields are required unless marked optional.</p>
            <EnquiryForm variant="franchise" />
          </div>
        </div>
        <p className="mt-10 text-sm text-gray-600 max-w-4xl">
          Franchise opportunities are subject to due diligence, regulatory approvals and formal agreements. Before you sign, we provide a disclosure document and the franchise agreement as required by the Franchising Code of Conduct. Financial returns are not guaranteed, and we recommend independent legal and financial advice.
        </p>
      </Section>
    </>
  )
}
