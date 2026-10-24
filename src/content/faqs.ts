// Frequently asked questions. Answers use only facts confirmed on the current
// site; anything that depends on the client's circumstances points to the team.
export type Faq = { q: string; a: string; link?: { label: string; to: string } }
export type FaqGroup = { id: string; title: string; faqs: Faq[] }

export const faqGroups: FaqGroup[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    faqs: [
      { q: 'How do I book an appointment?', a: 'Call 1300 450 334, use the Book Appointment button on any page, or send an enquiry through our contact form. We’ll confirm a time that suits you.', link: { label: 'Contact us', to: '/contact/' } },
      { q: 'Do I need a referral?', a: 'You don’t need a referral to book most appointments privately. Some funding schemes, such as Medicare, WorkCover, CTP and DVA, have their own referral or approval requirements. Our team will let you know what you need.', link: { label: 'Funding schemes', to: '/funding-schemes/' } },
      { q: 'Can you see me at home?', a: 'Yes. Many of our services are mobile. Our clinicians and support workers visit homes across Brisbane, Logan, Ipswich, North Lakes, Caboolture, the Redlands and the Gold Coast.', link: { label: 'Areas we visit', to: '/locations/' } },
      { q: 'Do you offer telehealth?', a: 'Yes. Telehealth is available for many allied health appointments, including follow-ups and clients outside our local areas.' },
      { q: 'Do you have staff who speak other languages?', a: 'Yes. Our team includes bilingual and multilingual staff. Let us know your preferred language when you book.' },
    ],
  },
  {
    id: 'ndis',
    title: 'NDIS',
    faqs: [
      { q: 'Are you a registered NDIS provider?', a: 'Yes. We are a registered NDIS provider (registration ID 4-FZ38IK2), registered across 24 registration groups, including therapy, community nursing, support coordination, daily living support and supported accommodation.', link: { label: 'Our NDIS services', to: '/ndis-services/' } },
      { q: 'Can you help me apply for the NDIS?', a: 'Yes. Our therapists can complete functional assessments and reports that support an application, and our team can explain the process.', link: { label: 'Check your eligibility', to: '/ndis-eligibility/' } },
      { q: 'Can I use you if my plan is self-managed, plan-managed or agency-managed?', a: 'Yes. As a registered provider we can work with all three ways of managing a plan.' },
      { q: 'What is a service agreement?', a: 'It is an agreement between you and us that sets out the supports we’ll provide, how much they cost and how either of us can change or end the arrangement. We complete it with you before services begin.' },
    ],
  },
  {
    id: 'costs',
    title: 'Costs and funding',
    faqs: [
      { q: 'How much does it cost?', a: 'It depends on the service and how it’s funded. NDIS supports are priced within the NDIS Pricing Arrangements. We confirm costs and any out-of-pocket amount before your first appointment.' },
      { q: 'Which funding do you accept?', a: 'NDIS, NIISQ, Medicare (conditions apply), WorkCover Queensland, CTP insurance, DVA, Home Care Packages through My Aged Care and private health insurance.', link: { label: 'Funding schemes', to: '/funding-schemes/' } },
      { q: 'What if I need to cancel?', a: 'Please give us as much notice as you can so we can offer the time to someone else. Our cancellation policy explains notice periods and any fees.', link: { label: 'Cancellation policy', to: '/cancellation-policy/' } },
    ],
  },
  {
    id: 'feedback',
    title: 'Feedback and complaints',
    faqs: [
      { q: 'How do I give feedback or make a complaint?', a: 'You can talk to any team member, call us, email us or use our online feedback and complaint forms. We take every complaint seriously and won’t treat you differently for making one.', link: { label: 'Feedback & complaints', to: '/feedback-and-complaints/' } },
    ],
  },
]

export const allFaqs = faqGroups.flatMap(g => g.faqs)
