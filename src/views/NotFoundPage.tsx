import Link from '@/components/Link'
import { servicesNav } from '@/content/site'

export default function NotFoundPage() {
  return (
    <section className="bg-[#FAFAF7]">
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">Page not found</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1a1238] mb-5">We can’t find that page.</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-10">It may have moved when we updated our website. Try one of these instead.</p>
        <ul className="flex flex-wrap justify-center gap-2 mb-10">
          {servicesNav.map(s => (
            <li key={s.to}><Link to={s.to} className="block bg-white border border-gray-200 text-gray-700 hover:border-[#27156F] hover:text-[#27156F] text-sm font-medium px-4 py-2 rounded-full">{s.label}</Link></li>
          ))}
        </ul>
        <Link to="/" className="inline-flex items-center gap-2 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-7 py-4 rounded-xl">Go to the homepage</Link>
      </div>
    </section>
  )
}
