// Blog articles. These are new versions of the four articles on the previous
// site, kept at their original URLs so existing search rankings and links carry
// over. Wording is new; have a clinician review each before publishing
// (see docs/IMPLEMENTATION.md › Outstanding items).

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; text: string }

export type Post = {
  path: string
  title: string
  seoTitle: string
  description: string
  category: 'Healthy ageing' | 'Wellbeing' | 'NDIS' | 'Physiotherapy'
  /** Key in src/content/authors.ts (MOCK authors until the business confirms). */
  author: string
  /** Clinician who reviewed the article (key in authors.ts). */
  reviewedBy?: string
  /** "Key takeaways" box at the top (AEO: a short summary answer engines can quote). */
  takeaways: string[]
  /** Authoritative sources the article draws on (official Australian sites). */
  sources: { label: string; url: string }[]
  /** ISO date first published on the previous site, if known. */
  published?: string
  updated: string
  readMins: number
  tint: string
  intro: string
  body: Block[]
  related: { label: string; to: string }[]
}

export const posts: Post[] = [
  {
    path: '/fall-prevention/',
    title: 'Fall prevention: simple ways to stay strong and steady',
    seoTitle: 'Fall Prevention for Older Adults: Strength & Balance',
    description:
      'Why falls happen, the exercises that help most, how often to train, and simple home changes that reduce the risk of falling. From our physiotherapy team.',
    category: 'Healthy ageing',
    author: 'physio', // MOCK author
    takeaways: [
      'Exercise that targets leg strength and balance is one of the most effective ways to reduce falls.',
      'Two to three sessions a week can make a difference; start gently and build up.',
      'Simple home changes (better lighting, grab rails, removing loose rugs) also help.',
      'A physiotherapist can choose the right exercises for you and progress them safely.',
    ],
    sources: [
      { label: 'Older people and falls (healthdirect)', url: 'https://www.healthdirect.gov.au/falls' },
      { label: 'Physical activity guidelines for older people (healthdirect)', url: 'https://www.healthdirect.gov.au/physical-activity-guidelines-for-older-adults' },
      { label: 'Health benefits of tai chi (healthdirect)', url: 'https://www.healthdirect.gov.au/health-benefits-of-tai-chi' },
    ],
    published: '2024-08-05',
    updated: '2026-10-24',
    readMins: 5,
    tint: '#FFF4E0',
    intro:
      'Falls are one of the most common reasons older Australians lose confidence and independence. The good news: many falls can be prevented, and it is never too late to get stronger and steadier.',
    body: [
      { type: 'h2', text: 'Why falls matter' },
      { type: 'p', text: 'For people over 65, a fall can mean a serious injury, a hospital stay or a long recovery. Even a fall without injury can leave someone anxious about moving, which leads to less activity, weaker muscles and, in turn, a higher chance of falling again.' },
      { type: 'h2', text: 'What raises the risk' },
      { type: 'p', text: 'Falls rarely have a single cause. Common contributors include:' },
      { type: 'list', items: ['Weaker leg muscles and reduced balance', 'Changes to walking pattern (gait)', 'Joint pain, arthritis or osteoporosis', 'Vision problems', 'Some medications, or several medications together', 'Memory or thinking changes', 'Hazards at home, such as loose rugs or poor lighting'] },
      { type: 'h2', text: 'Strength and balance: the biggest difference' },
      { type: 'p', text: 'Exercise that targets leg strength and balance is one of the most effective ways to reduce falls. A physiotherapist can choose the right exercises for you, but programs often include movements such as:' },
      { type: 'list', items: ['Sit-to-stand: rising from a chair without using your hands', 'Heel raises: rising onto your toes while holding a bench', 'Heel-to-toe walking along a hallway', 'Side leg raises while holding a stable support', 'Mini knee bends with support'] },
      { type: 'callout', text: 'Start with support nearby, such as a kitchen bench or a sturdy chair, and stop if you feel dizzy or have pain. Check with your doctor or physiotherapist before starting a new program.' },
      { type: 'h2', text: 'How much, and how often' },
      { type: 'p', text: 'Two to three sessions a week can be enough to make a difference. Start gently and build up slowly. As exercises become easier, a physiotherapist may add repetitions, reduce the support you hold or introduce new challenges. Progress is often checked with simple tests, such as timing how quickly you can stand up and walk a short distance.' },
      { type: 'p', text: 'Most people notice benefits after about three months of regular practice, and the gains last as long as you keep going.' },
      { type: 'h2', text: 'Make it social' },
      { type: 'p', text: 'Exercising with others makes it more enjoyable and easier to stick with. Group classes, a walking partner or a family member who joins in can all help turn exercise into a habit.' },
      { type: 'h2', text: 'Bone health and vitamin D' },
      { type: 'p', text: 'Low vitamin D can affect muscle strength and balance. Older adults make less vitamin D from sunlight, so ask your GP whether a blood test or supplement is right for you. Don’t start supplements without advice.' },
      { type: 'h2', text: 'Make your home safer' },
      { type: 'list', items: ['Remove or secure loose rugs and cords', 'Improve lighting, especially on stairs and at night', 'Install grab rails in the bathroom and beside steps', 'Keep often-used items within easy reach', 'Wear well-fitting, supportive shoes'] },
      { type: 'h2', text: 'How we can help' },
      { type: 'p', text: 'Our physiotherapists run falls-prevention and balance programs in our clinics and at home. Occupational therapists can assess your home and recommend changes or equipment, and our podiatrists look after foot health, which also affects balance.' },
    ],
    related: [
      { label: 'Physiotherapy', to: '/allied-health-services/physiotherapy/' },
      { label: 'Aged care services', to: '/aged-care-services/' },
      { label: 'Occupational therapy', to: '/allied-health-services/occupational-therapy/' },
    ],
  },
  {
    path: '/integrating-mindfulness/',
    title: 'Bringing mindfulness into everyday life',
    seoTitle: 'Integrating Mindfulness Into Everyday Life: 5 Practices',
    description:
      'What mindfulness is, simple practices you can try in a few minutes a day, how to adapt them for different abilities, and when to seek extra support.',
    category: 'Wellbeing',
    author: 'ot', // MOCK author
    reviewedBy: 'physio', // MOCK reviewer
    takeaways: [
      'Many people find regular mindfulness helps them feel calmer, sleep better and cope with stress.',
      'A few minutes a day is enough to start; link it to something you already do.',
      'Practices can be adapted for different abilities: seated, lying down, guided or shortened.',
      'It supports wellbeing alongside other care, but isn’t a replacement for treatment. If stress or low mood affects daily life, talk to your GP.',
    ],
    sources: [
      { label: 'Mindfulness (healthdirect)', url: 'https://www.healthdirect.gov.au/mindfulness' },
      { label: 'Relaxation techniques for stress relief (healthdirect)', url: 'https://www.healthdirect.gov.au/relaxation-techniques-for-stress-relief' },
      { label: 'Head to Health (Australian Government)', url: 'https://www.headtohealth.gov.au/' },
    ],
    updated: '2026-10-24',
    readMins: 4,
    tint: '#EEE9FF',
    intro:
      'Mindfulness means paying attention to the present moment, on purpose and without judgement. It doesn’t need special equipment or lots of time, and it can fit around work, caring and everyday routines.',
    body: [
      { type: 'h2', text: 'Why practise mindfulness?' },
      { type: 'p', text: 'Many people find regular mindfulness helps them feel calmer, sleep better and cope with stress. Research suggests it can support wellbeing alongside other care, though it isn’t a replacement for treatment when you need it.' },
      { type: 'h2', text: 'Five simple practices to try' },
      { type: 'list', items: [
        'Two-minute breathing: sit comfortably and notice each breath in and out. When your mind wanders, gently bring it back.',
        'Body scan: slowly move your attention from your feet to your head, noticing any sensations without trying to change them.',
        'Mindful walking: notice the feeling of each step, the ground beneath you and the sounds around you.',
        'Everyday moments: pick one daily task, such as making a cup of tea, and give it your full attention.',
        'Five senses: name five things you can see, four you can hear, three you can feel, two you can smell and one you can taste.',
      ] },
      { type: 'h2', text: 'Making it stick' },
      { type: 'list', items: ['Start small: one to five minutes is enough', 'Link it to something you already do, like brushing your teeth', 'Use a reminder on your phone', 'Be kind to yourself on the days it doesn’t happen'] },
      { type: 'h2', text: 'Mindfulness for every ability' },
      { type: 'p', text: 'Mindfulness can be adapted to suit different needs. Practices can be done seated or lying down, guided with pictures or audio, shortened, or built into sensory activities. Carers can practise too: a few mindful breaths between tasks can make a busy day feel more manageable.' },
      { type: 'h2', text: 'When to seek more support' },
      { type: 'p', text: 'If stress, low mood or anxiety are affecting your daily life, talk to your GP or a mental health professional. Your GP can refer you to the right support.' },
      { type: 'callout', text: 'If you are in crisis or worried about your safety, call Lifeline on 13 11 14 (24 hours) or 000 in an emergency.' },
    ],
    related: [
      { label: 'Allied health services', to: '/allied-health-services/' },
      { label: 'Home & community support', to: '/home-community-support/' },
    ],
  },
  {
    path: '/how-to-choose-the-right-ndis-provider/',
    title: 'How to choose the right NDIS provider: 8 things to check',
    seoTitle: 'How to Choose the Right NDIS Provider: 8 Checks',
    description:
      'A practical checklist for choosing an NDIS provider: registration, services, flexibility, experience, communication, availability, goals and service agreements.',
    category: 'NDIS',
    author: 'ndis', // MOCK author
    reviewedBy: 'ot', // MOCK reviewer
    takeaways: [
      'Check that the provider is registered with the NDIS Quality and Safeguards Commission for the supports you need.',
      'Agency-managed plans can only use registered providers.',
      'Ask about their experience, availability and communication, and expect support built around your goals.',
      'Read the service agreement before you start, and remember you can change providers.',
    ],
    sources: [
      { label: 'How to find and choose a provider (NDIS)', url: 'https://www.ndis.gov.au/participants/working-providers/finding-providers/how-find-and-choose-provider' },
      { label: 'Guide to working with providers (NDIS)', url: 'https://www.ndis.gov.au/participants/working-providers/get-know-your-providers/guide-working-providers' },
      { label: 'Find a registered provider (NDIS Commission)', url: 'https://www.ndiscommission.gov.au/provider-registration/find-registered-provider' },
    ],
    published: '2026-08-20',
    updated: '2026-10-24',
    readMins: 6,
    tint: '#F0EDFF',
    intro:
      'The provider you choose shapes how well your NDIS plan works for you. Here’s what to look for, and the questions worth asking before you sign anything.',
    body: [
      { type: 'h2', text: 'What an NDIS provider does' },
      { type: 'p', text: 'An NDIS provider delivers the supports funded in your plan, such as therapy, nursing, support coordination or help with daily living. You can use one provider or several, and you can change providers if your needs change.' },
      { type: 'h2', text: '1. Check their registration' },
      { type: 'p', text: 'Ask whether the provider is registered with the NDIS Quality and Safeguards Commission, and for which registration groups. Registered providers are audited against the NDIS Practice Standards. If your plan is agency-managed, you can only use registered providers.' },
      { type: 'h2', text: '2. Look at the range of services' },
      { type: 'p', text: 'A provider that offers several of the supports you need (for example physiotherapy, occupational therapy and support work) can coordinate them, so your team shares goals and you repeat your story less often.' },
      { type: 'h2', text: '3. Ask where and how they deliver support' },
      { type: 'p', text: 'Can they see you at home, in a clinic, at school or work, or by telehealth? Flexibility matters, especially if transport is difficult or your needs change.' },
      { type: 'h2', text: '4. Find out about experience with your needs' },
      { type: 'p', text: 'Ask whether they have supported people with similar goals or conditions, and how they would tailor support for you.' },
      { type: 'h2', text: '5. Notice how they communicate' },
      { type: 'p', text: 'Do they return calls promptly? Do they explain things in plain language? Will you receive progress updates and reports? Good communication early on is usually a good sign.' },
      { type: 'h2', text: '6. Check availability' },
      { type: 'p', text: 'How soon can you start? How easy is it to change an appointment? Is there a waiting list?' },
      { type: 'h2', text: '7. Expect goal-based, personalised support' },
      { type: 'p', text: 'Support should be built around the goals in your plan, with regular reviews so it changes as you progress.' },
      { type: 'h2', text: '8. Read the service agreement' },
      { type: 'p', text: 'Before you start, you should receive a service agreement that sets out the supports, prices, cancellation terms and how to end the agreement. NDIS prices must stay within the limits in the NDIS Pricing Arrangements.' },
      { type: 'h2', text: 'Common mistakes to avoid' },
      { type: 'list', items: ['Choosing on price or availability alone', 'Not asking how and where support is delivered', 'Skipping the service agreement details', 'Rushing the decision: it’s fine to speak with more than one provider'] },
      { type: 'callout', text: 'You can change providers. Check the notice period in your service agreement, and talk to your support coordinator or local area coordinator if you need help.' },
      { type: 'h2', text: 'How we can help' },
      { type: 'p', text: 'We are a registered NDIS provider across 24 registration groups, with therapy, nursing, support coordination and in-home support in one team. We see clients at home, in three South East Queensland clinics and by telehealth.' },
    ],
    related: [
      { label: 'NDIS disability services', to: '/ndis-services/' },
      { label: 'Check your NDIS eligibility', to: '/ndis-eligibility/' },
      { label: 'Funding schemes', to: '/funding-schemes/' },
    ],
  },
  {
    path: '/physiotherapy-for-ndis-participants-in-logan-central/',
    title: 'Physiotherapy for NDIS participants in Logan Central',
    seoTitle: 'NDIS Physiotherapy in Logan Central | Clinic & Home',
    description:
      'How physiotherapy can support NDIS participants in Logan, what happens at your first appointment, how it is funded, and how to book at our Logan Central clinic.',
    category: 'Physiotherapy',
    author: 'physio', // MOCK author
    reviewedBy: 'ndis', // MOCK reviewer
    takeaways: [
      'For NDIS participants, physiotherapy is linked to the goals in your plan.',
      'Physiotherapy is usually funded from the capacity building supports in your plan.',
      'Our Logan Central clinic has a rehab gym, and we also visit you at home.',
      'We provide progress reports and functional capacity assessments to support plan reviews.',
    ],
    sources: [
      { label: 'Guide to using your funding (NDIS)', url: 'https://www.ndis.gov.au/participants/using-your-funding/understanding-your-ndis-funding/guide-using-your-funding' },
      { label: 'Find a registered provider (NDIS Commission)', url: 'https://www.ndiscommission.gov.au/provider-registration/find-registered-provider' },
    ],
    updated: '2026-10-24',
    readMins: 4,
    tint: '#E8F0FF',
    intro:
      'Physiotherapy can help NDIS participants move more easily, build strength and confidence, and do more of the things that matter to them. Here’s how it works at our Logan Central clinic and at home.',
    body: [
      { type: 'h2', text: 'How physiotherapy supports NDIS goals' },
      { type: 'p', text: 'Physiotherapy focuses on movement and function. For NDIS participants it is usually linked to the goals in your plan, such as:' },
      { type: 'list', items: ['Walking further or more safely', 'Getting in and out of bed, chairs or the car', 'Building strength, balance and fitness', 'Managing pain or stiffness', 'Joining in sport, work or community activities'] },
      { type: 'h2', text: 'Your first appointment' },
      { type: 'p', text: 'Your physiotherapist will talk with you about your goals and daily routine, assess how you move, and agree a plan with you. You’re welcome to bring a family member, carer or support worker.' },
      { type: 'h2', text: 'In clinic or at home' },
      { type: 'p', text: 'Our Logan Central clinic is at Unit 3/1 Mooney Street, Logan Central. If getting to the clinic is hard, or it helps to practise in your own environment, our physiotherapists can visit you at home.' },
      { type: 'h2', text: 'Funding' },
      { type: 'p', text: 'Physiotherapy for NDIS participants is usually funded from the capacity building supports in your plan. Check your plan or ask your support coordinator if you’re unsure, and we’ll confirm everything in your service agreement before you start.' },
      { type: 'h2', text: 'Reports and assessments' },
      { type: 'p', text: 'We can provide progress reports and functional capacity assessments to support plan reviews.' },
      { type: 'h2', text: 'Booking' },
      { type: 'p', text: 'Call 1300 450 334, book online, or ask your support coordinator to send us a referral.' },
    ],
    related: [
      { label: 'Physiotherapy', to: '/allied-health-services/physiotherapy/' },
      { label: 'NDIS disability services', to: '/ndis-services/' },
      { label: 'Our locations', to: '/locations/' },
    ],
  },
]

export const postsByPath = Object.fromEntries(posts.map(p => [p.path, p]))
export const categories = Array.from(new Set(posts.map(p => p.category)))

export function formatDate(iso: string) {
  // Fixed to UTC so the server-rendered date and the browser's always match.
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
