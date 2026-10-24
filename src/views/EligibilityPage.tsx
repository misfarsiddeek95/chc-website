'use client'

import React, { useState } from 'react'
import { Icons } from '@/components/Icons'
import { Callout, PageHero, PrimaryButton, Section, SectionHeader, TextLink } from '@/components/ui'
import Link from '@/components/Link'
import { contact } from '@/content/site'
import { useSiteUi } from '@/ui-context'

// A quick, private self-check based on the NDIS's published access requirements
// (ndis.gov.au, checked Oct 2026). Nothing is sent anywhere. Only the NDIA decides access.

type Answer = 'yes' | 'no' | 'unsure' | ''
const questions = [
  { id: 'age', q: 'Are you (or the person you’re asking for) aged under 65?', hint: 'You must be aged 0 to 64 when you apply.' },
  { id: 'residency', q: 'Do they live in Australia as an Australian citizen, permanent resident or Protected Special Category visa holder?', hint: '' },
  { id: 'disability', q: 'Do they have a disability from a permanent (or likely permanent) impairment, or is this a young child with developmental delay?', hint: 'This includes physical, intellectual, cognitive, neurological, sensory and psychosocial disability.' },
  { id: 'support', q: 'Do they usually need help from another person, equipment or home changes to do everyday things?', hint: 'For example personal care, getting around, communicating, learning or joining in community life.' },
] as const

type Result = { tone: 'good' | 'maybe' | 'other'; title: string; body: React.ReactNode }

export function evaluate(a: Record<string, Answer>): Result {
  if (a.age === 'no') {
    return {
      tone: 'other',
      title: 'The NDIS is for people who apply before age 65.',
      body: <>Aged care services are the usual path from 65. We provide in-home support, nursing and therapy for older Australians. See our <Link to="/aged-care-services/" className="underline font-semibold">aged care services</Link>, or call us to talk through options.</>,
    }
  }
  if (a.residency === 'no') {
    return {
      tone: 'other',
      title: 'The NDIS requires Australian residency.',
      body: <>You may still be able to use our services through other funding or privately. Call <a href={contact.phoneHref} className="underline font-semibold">{contact.phone}</a> and we’ll explain your options.</>,
    }
  }
  const yes = questions.filter(q => a[q.id] === 'yes').length
  if (yes === questions.length) {
    return {
      tone: 'good',
      title: 'You may be eligible for the NDIS.',
      body: <>Your answers match the NDIS access requirements. The next step is to apply to the NDIS, and we can help you prepare. Our team can also start supports now through other funding while you wait.</>,
    }
  }
  return {
    tone: 'maybe',
    title: 'You might be eligible. It’s worth a conversation.',
    body: <>Some answers were “no” or “not sure”. Eligibility depends on your circumstances and evidence from your health professionals. Talk to our team, your local area coordinator, or the NDIS on <a href="tel:1800800110" className="underline font-semibold">1800 800 110</a>.</>,
  }
}

export default function EligibilityPage() {
  const { openBook, openChat } = useSiteUi()
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (questions.some(q => !answers[q.id])) { setError(true); return }
    setError(false)
    setResult(evaluate(answers))
    requestAnimationFrame(() => document.getElementById('check-result')?.focus())
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Disability Services', to: '/ndis-services/' }, { label: 'NDIS Eligibility' }]}
        badge="Free · 1 minute · Nothing is sent"
        title="Am I eligible for the NDIS?"
        intro={<p>Answer four quick questions to see whether you, or someone you care for, may meet the NDIS access requirements, and what to do next.</p>}
        aside={
          <div className="rounded-3xl bg-white border border-purple-100 shadow-2xl shadow-purple-200 p-7">
            <h2 className="font-display text-xl font-bold text-[#1a1238] mb-4">The NDIS looks at three things</h2>
            <ol className="space-y-4">
              {[
                ['Age', 'Aged 0 to 64 when you apply. Children under 9 start with an early childhood partner.'],
                ['Residency', 'Living in Australia as a citizen, permanent resident or Protected Special Category visa holder.'],
                ['Disability or early intervention', 'A permanent impairment that significantly affects everyday life, or early supports that would reduce future needs (including children under 6 with developmental delay).'],
              ].map(([t, b], i) => (
                <li key={t} className="flex gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#27156F] text-white font-display font-bold text-xs flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <span><span className="block font-semibold text-[#1a1238]">{t}</span><span className="block text-sm text-gray-600 leading-relaxed">{b}</span></span>
                </li>
              ))}
            </ol>
          </div>
        }
      />

      <Section tone="lavender" id="check" labelledBy="check-title">
        <div className="max-w-3xl mx-auto">
          <SectionHeader eyebrow="Eligibility check" title={<span id="check-title">Quick self-check.</span>} intro="Your answers stay on this page. This is a guide only: the National Disability Insurance Agency makes the final decision." />
          <form onSubmit={submit} noValidate className="space-y-4">
            {questions.map((q, i) => (
              <fieldset key={q.id} className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6" aria-describedby={q.hint ? `${q.id}-hint` : undefined}>
                <legend className="font-display font-bold text-[#1a1238] text-lg leading-snug float-left w-full mb-1">
                  <span className="text-[#9e5c00] mr-2">{i + 1}.</span>{q.q}
                </legend>
                {q.hint && <p id={`${q.id}-hint`} className="clear-both text-sm text-gray-600 mb-3">{q.hint}</p>}
                <div className="clear-both flex flex-wrap gap-2 pt-1">
                  {(['yes', 'no', 'unsure'] as const).map(v => (
                    <label key={v} className={`cursor-pointer px-5 py-2.5 rounded-full text-sm font-medium border transition-all has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#FF9D00] ${answers[q.id] === v ? 'bg-[#27156F] text-white border-[#27156F]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#27156F]'}`}>
                      <input type="radio" name={q.id} value={v} className="sr-only" checked={answers[q.id] === v} onChange={() => { setAnswers(p => ({ ...p, [q.id]: v })); setResult(null) }} />
                      {v === 'yes' ? 'Yes' : v === 'no' ? 'No' : 'Not sure'}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            {error && <p role="alert" className="text-sm text-red-700 flex items-center gap-2"><Icons.AlertCircle /> Please answer all four questions.</p>}
            <PrimaryButton type="submit" className="w-full sm:w-auto">
              <span>See my result</span><Icons.ArrowRight />
            </PrimaryButton>
          </form>

          {result && <ResultCard result={result} onBook={openBook} />}
        </div>
      </Section>

      <Section tone="white" id="next-steps" labelledBy="next-title">
        <SectionHeader eyebrow="Next steps" title={<span id="next-title">How we can help you apply.</span>} />
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { t: 'Gather evidence', b: 'Our therapists can complete functional assessments and reports that describe how disability affects everyday life.' },
            { t: 'Apply to the NDIS', b: 'Submit an access request to the NDIS. Children under 9 can start with an early childhood partner.' },
            { t: 'Put your plan to work', b: 'Once approved, we’ll help you choose and coordinate supports that match your goals.' },
          ].map((s, i) => (
            <div key={s.t} className="rounded-2xl bg-[#FAFAF7] border border-gray-100 p-7">
              <span className="font-display text-sm font-bold text-[#9e5c00]">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-xl font-bold text-[#1a1238] mt-2 mb-2">{s.t}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.b}</p>
            </div>
          ))}
        </div>
        <Callout>
          Not sure who to ask? Your local area coordinator (age 9 and over) or early childhood partner (under 9) can help, or call the NDIS on <a href="tel:1800800110" className="font-semibold underline">1800 800 110</a>. You’re also welcome to call us on <a href={contact.phoneHref} className="font-semibold underline">{contact.phone}</a>.
        </Callout>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <TextLink to="/ndis-services/">Our NDIS services</TextLink>
          <TextLink to="/early-intervention/">Early intervention for children</TextLink>
          <button onClick={openChat} className="text-sm font-semibold text-[#27156F] hover:text-[#9e5c00] inline-flex items-center gap-1">Chat with our team <Icons.ArrowRight /></button>
        </div>
      </Section>
    </>
  )
}

/** The self-check result: what the answers suggest and the next step. */
export function ResultCard({ result, onBook }: { result: Result; onBook: () => void }) {
  return (
    <div id="check-result" tabIndex={-1} role="status" className={`mt-8 rounded-3xl p-7 md:p-9 ${result.tone === 'good' ? 'bg-[#27156F] text-white' : 'bg-white border border-purple-100'}`}>
              <h2 className={`font-display text-2xl md:text-3xl font-bold mb-3 ${result.tone === 'good' ? 'text-white' : 'text-[#1a1238]'}`}>{result.title}</h2>
              <p className={`leading-relaxed mb-6 ${result.tone === 'good' ? 'text-white/85' : 'text-gray-700'}`}>{result.body}</p>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={onBook} className="inline-flex items-center gap-2 bg-[#FF9D00] hover:bg-[#e88e00] text-white font-semibold px-6 py-3 rounded-xl text-sm">Talk to our team <Icons.ArrowRight /></button>
                <a href="https://www.ndis.gov.au/applying-access-ndis/how-apply" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm border-2 ${result.tone === 'good' ? 'border-white/70 text-white hover:bg-white hover:text-[#27156F]' : 'border-[#27156F] text-[#27156F] hover:bg-[#27156F] hover:text-white'}`}>How to apply on ndis.gov.au <Icons.ExternalLink /></a>
              </div>
            </div>
  )
}
