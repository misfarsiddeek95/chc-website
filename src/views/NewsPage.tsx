import { Icons } from '@/components/Icons'
import { CtaBand, PageHero, Section, TextLink } from '@/components/ui'
import { contact } from '@/content/site'
import { formatDate } from '@/content/blog'
import { news } from '@/content/news'

export default function NewsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'News' }]}
        badge="Announcements · Community · Careers"
        title="News from Complete Healthcare Connect."
        intro={<p>The latest from our clinics and team: new services, locations, community news and job opportunities.</p>}
        aside={
          <div className="rounded-3xl bg-[#27156F] text-white p-8 shadow-2xl shadow-purple-200 relative overflow-hidden">
            <div aria-hidden="true" className="absolute top-0 right-0 w-56 h-56 rounded-full bg-[#FF9D00]/10 translate-x-1/3 -translate-y-1/3" />
            <p className="relative text-[#FF9D00] text-xs font-semibold uppercase tracking-widest mb-3">Media enquiries</p>
            <h2 className="relative font-display text-2xl font-bold mb-3">Writing about us?</h2>
            <p className="relative text-white/80 leading-relaxed mb-5">For interviews, comment or information about our services, contact our team.</p>
            <a href={`mailto:${contact.email}?subject=${encodeURIComponent('Media enquiry')}`} className="relative inline-flex items-center gap-2 font-semibold text-white underline">
              <Icons.Mail /> {contact.email}
            </a>
          </div>
        }
      />

      <Section tone="white" id="latest" labelledBy="latest-title">
        <h2 id="latest-title" className="font-display text-3xl md:text-4xl font-bold text-[#1a1238] mb-10">Latest news.</h2>
        <ol className="relative border-l-2 border-[#F0EDFF] ml-3 space-y-10">
          {news.map(n => (
            <li key={n.id} id={n.id} className="relative pl-8 scroll-mt-28">
              <span aria-hidden="true" className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#FF9D00] ring-4 ring-white" />
              <p className="flex flex-wrap items-center gap-3 mb-2 text-sm">
                <span className="font-semibold text-[#27156F] bg-[#27156F]/8 rounded-full px-3 py-1 text-xs tracking-widest uppercase">{n.label}</span>
                <span className="text-gray-600">{n.date ? <time dateTime={n.date}>{formatDate(n.date)}</time> : 'Ongoing'}</span>
              </p>
              <h3 className="font-display text-2xl font-bold text-[#1a1238] mb-2">{n.title}</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-3 max-w-3xl">{n.summary}</p>
              <TextLink to={n.link.to}>{n.link.label}</TextLink>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="lavender" id="more" labelledBy="more-news-title">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-7 border border-purple-100 shadow-sm">
            <h2 id="more-news-title" className="font-display text-xl font-bold text-[#1a1238] mb-2">Read the blog</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">Health tips and NDIS guides from our clinicians.</p>
            <TextLink to="/blog/">Go to the blog</TextLink>
          </div>
          <div className="bg-white rounded-2xl p-7 border border-purple-100 shadow-sm">
            <h2 className="font-display text-xl font-bold text-[#1a1238] mb-2">Follow us</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">Day-to-day news and stories from our team on Facebook, Instagram and YouTube.</p>
            <TextLink to="/contact/">Find our social channels</TextLink>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
