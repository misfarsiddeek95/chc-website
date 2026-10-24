// Service page content. Facts come from the current website (Oct 2026) and the
// homepage design; wording has been rewritten for clarity. Items needing a
// business check are listed in docs/IMPLEMENTATION.md › Outstanding items.

export type ServiceSection =
  | { kind: 'cards'; id: string; eyebrow?: string; title: string; intro?: string; columns?: 2 | 3 | 4; cards: { title: string; body?: string; items?: string[]; to?: string; linkLabel?: string; tag?: string }[] }
  | { kind: 'checks'; id: string; eyebrow?: string; title: string; intro?: string; items: string[]; columns?: 1 | 2 | 3 }
  | { kind: 'pills'; id: string; eyebrow?: string; title: string; intro?: string; items: string[] }
  | { kind: 'steps'; id: string; eyebrow?: string; title: string; intro?: string; steps: { title: string; body: string }[] }
  | { kind: 'split'; id: string; eyebrow?: string; title: string; body: string[]; bullets?: string[]; img?: string; imgAlt?: string; tint?: string }
  | { kind: 'details'; id: string; eyebrow?: string; title: string; intro?: string; summary: string; items: string[] }

export type ServiceContent = {
  path: string
  parent?: { label: string; to: string }
  navLabel: string
  seoTitle: string
  description: string
  badge: string
  h1: string
  intro: string
  img?: string
  imgAlt?: string
  tint?: string
  primaryCta?: string
  defaultService?: string
  sections: ServiceSection[]
  funding: string[]
  related: string[]
  serviceType?: string
}

const img = (id: string, w = 800, h = 600) => `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`

export const services: ServiceContent[] = [
  // ── NDIS / Disability ──────────────────────────────────────────────────────
  {
    path: '/ndis-services/',
    navLabel: 'Disability Services (NDIS)',
    seoTitle: 'NDIS Disability Services in South East Queensland',
    description:
      'Registered NDIS provider in South East Queensland: therapy, support coordination, behaviour support, community nursing, home modifications and in-home support.',
    badge: 'Registered NDIS provider · 24 registration groups',
    h1: 'NDIS disability services, built around your goals.',
    intro:
      'As a registered NDIS provider, we bring therapy, nursing, support coordination and everyday support together in one team, so your plan works as one plan. Support is available in clinic, at home and in the community.',
    img: img('photo-1764006145420-df3006edf060'),
    imgAlt: 'Support worker walking beside a young man in a wheelchair outdoors',
    tint: '#EEE9FF',
    defaultService: 'NDIS Disability Services',
    serviceType: 'NDIS disability support',
    sections: [
      {
        kind: 'cards',
        id: 'what-we-offer',
        eyebrow: 'What we offer',
        title: 'Everything your NDIS plan funds, in one place.',
        intro: 'Choose one service or combine several. We coordinate between disciplines so you don’t have to.',
        cards: [
          { title: 'Therapy & early childhood supports', body: 'Physiotherapy, occupational therapy, speech pathology, podiatry, dietetics and exercise physiology, in clinic or mobile.', to: '/allied-health-services/', linkLabel: 'Allied health services' },
          { title: 'Support coordination', body: 'Help to understand your plan, connect with providers, prepare for plan meetings and get ready for reviews. Levels 1 to 3.' },
          { title: 'Behaviour support', body: 'Behaviour support assessments and plans, restrictive practice reviews and practical strategies for you, your family and your support staff.' },
          { title: 'Community nursing & complex care', body: 'Nurse practitioners, registered and enrolled nurses for everyday to high-intensity care, including PEG and nasogastric feeding, tracheostomy and ventilator care, catheter care and subcutaneous injections.' },
          { title: 'Home modifications', body: 'Occupational therapists certified in complex home modifications work with experienced builders to design and deliver changes that make home safer and easier.' },
          { title: 'Personal mobility equipment', body: 'Assessment and supply of equipment such as wheelchairs, toileting aids and seat walkers for daily activities.' },
          { title: 'In-home & community support', body: 'Support workers for personal care, meals, household tasks, transport and getting out into the community.', to: '/home-community-support/', linkLabel: 'Home & community support' },
          { title: 'Supported accommodation', body: 'Supported Independent Living (SIL) and short-term accommodation (respite).', to: '/housing-living-support/', linkLabel: 'Housing & living support' },
        ],
      },
      {
        kind: 'steps',
        id: 'getting-started',
        eyebrow: 'Getting started',
        title: 'Starting with us is simple.',
        steps: [
          { title: 'Check your eligibility', body: 'New to the NDIS? Use our quick eligibility check, or call us and we’ll talk you through it.' },
          { title: 'Contact us or send a referral', body: 'Book online, call 1300 450 334, or ask your support coordinator, GP or hospital team to refer you.' },
          { title: 'Agree on your services', body: 'We’ll go through your goals and plan, then complete an NDIS service agreement together.' },
          { title: 'Start your support', body: 'Meet your team in clinic, at home or by telehealth, with regular check-ins on progress toward your goals.' },
        ],
      },
      {
        kind: 'details',
        id: 'registration-groups',
        eyebrow: 'Registration',
        title: 'Our NDIS registration groups.',
        intro: 'We are a registered NDIS provider (registration ID 4-FZ38IK2), approved to deliver supports across 24 registration groups.',
        summary: 'Show all 24 registration groups',
        items: [
          '0103 Assistive products for personal care and safety', '0104 High-intensity daily personal activities', '0105 Personal mobility equipment',
          '0106 Assistance in coordinating or managing life stages, transitions and supports', '0107 Daily personal activities', '0108 Assistance with travel and transport',
          '0110 Specialised behaviour support', '0111 Home modification design and construction', '0112 Assistive equipment for recreation',
          '0114 Community nursing care', '0115 Assistance with daily life tasks in a group or shared living arrangement', '0116 Innovative community participation',
          '0117 Development of daily living and life skills', '0118 Early childhood supports', '0120 Household tasks', '0121 Interpreting and translation',
          '0123 Assistive products for household tasks', '0125 Participation in community, social and civic activities', '0126 Exercise physiology and personal training',
          '0127 Management of funding for supports (plan management)', '0128 Therapeutic supports', '0132 Specialised support coordination',
          '0135 Custom prosthetics and orthotics', '0136 Group and centre-based activities',
        ],
      },
    ],
    funding: ['NDIS', 'NIISQ'],
    related: ['/ndis-eligibility/', '/home-community-support/', '/housing-living-support/', '/allied-health-services/'],
  },

  // ── Aged care ──────────────────────────────────────────────────────────────
  {
    path: '/aged-care-services/',
    navLabel: 'Aged Care Services',
    seoTitle: 'In-Home Aged Care Services | Brisbane, Logan & Ipswich',
    description:
      'Help for older Australians to live safely at home: personal care, community nursing, meals, domestic help, falls prevention physiotherapy and podiatry.',
    badge: 'Home Care Packages · Community nursing · Allied health',
    h1: 'Care that helps you stay at home, safely.',
    intro:
      'Practical in-home support, nursing and therapy for older Australians and the families who care for them. We plan around your routine and adjust as your needs change.',
    img: img('photo-1773227055624-07b515ba87c5'),
    imgAlt: 'Carer helping an older woman with a walking frame at home',
    tint: '#FFF4E0',
    defaultService: 'Aged Care Services',
    serviceType: 'In-home aged care',
    sections: [
      {
        kind: 'cards',
        id: 'support-at-home',
        eyebrow: 'Support at home',
        title: 'Everyday help, from a team you get to know.',
        cards: [
          { title: 'Personal care', body: 'Help with showering, dressing, grooming and toileting, with respect for your privacy and routine.' },
          { title: 'Community nursing', body: 'Registered and enrolled nurses for wound care, continence care, medication support and chronic disease management.' },
          { title: 'Meals & medication', body: 'Meal preparation and help with eating, plus medication reminders and supervision.' },
          { title: 'Domestic assistance', body: 'Cleaning, laundry and shopping, so the house stays the way you like it.' },
          { title: 'Mobility & transfers', body: 'Safe help with walking, wheelchairs and hoist transfers, plus overnight support when needed.' },
          { title: 'Social connection & transport', body: 'Company on outings, help with errands and appointments, and transport in accessible vehicles.' },
        ],
      },
      {
        kind: 'split',
        id: 'therapy',
        eyebrow: 'Stay strong and steady',
        title: 'Allied health for healthy ageing.',
        body: [
          'Our physiotherapists, occupational therapists and podiatrists help you keep moving and stay independent, with visits at home or in one of our clinics.',
        ],
        bullets: [
          'Falls prevention and balance programs',
          'Aged care physiotherapy and home exercise plans',
          'Mobility and equipment assessments',
          'Home modification assessments by occupational therapists',
          'Diabetic foot assessments and general podiatry',
        ],
        img: img('photo-1709880754472-be89c13abc52', 700, 875),
        imgAlt: 'Physiotherapist guiding an older client through a balance exercise',
        tint: '#ddd4f7',
      },
      {
        kind: 'steps',
        id: 'how-it-works',
        eyebrow: 'How it works',
        title: 'Getting care in place.',
        steps: [
          { title: 'Talk to us', body: 'Call 1300 450 334 or send an enquiry. We’ll ask about your needs and your current funding or package.' },
          { title: 'Plan your care', body: 'We agree on the services, times and people that suit you, and explain any costs up front.' },
          { title: 'Care begins', body: 'Your support worker, nurse or therapist visits as planned, and we review regularly with you and your family.' },
        ],
      },
    ],
    funding: ['Home Care Packages', 'My Aged Care', 'DVA', 'Medicare', 'Private'],
    related: ['/home-community-support/', '/maintenance-in-the-home/', '/allied-health-services/physiotherapy/', '/allied-health-services/podiatry/'],
  },

  // ── Early intervention ─────────────────────────────────────────────────────
  {
    path: '/early-intervention/',
    navLabel: 'Early Intervention',
    seoTitle: 'Early Intervention Therapy for Children | NDIS Early Childhood',
    description:
      'Early childhood speech pathology, occupational therapy and physiotherapy for children and families, at home, in clinic, or at kindy and school. NDIS registered.',
    badge: 'NDIS early childhood supports · Speech · OT · Physio',
    h1: 'Early support. Lasting impact.',
    intro:
      'Our paediatric therapists help children build communication, movement and everyday skills, working alongside parents, carers and educators so progress carries into daily life.',
    img: img('photo-1758273241260-f49172d876e3'),
    imgAlt: 'Therapist playing with a young child during a therapy session',
    tint: '#FFF8E8',
    defaultService: 'Early Intervention',
    serviceType: 'Early childhood intervention',
    sections: [
      {
        kind: 'cards',
        id: 'therapies',
        eyebrow: 'Therapies for children',
        title: 'The right support at the right time.',
        cards: [
          { title: 'Speech pathology', body: 'Speech and language assessments, individual therapy programs, and strategies for home, kindy and school.', items: ['Language development', 'Speech clarity', 'School readiness'], to: '/allied-health-services/speech-pathology/', linkLabel: 'Speech pathology' },
          { title: 'Occupational therapy', body: 'Building the skills for play, self-care and learning, including support for children with autism or ADHD.', items: ['Fine motor & handwriting', 'Motor coordination', 'Self-care skills'], to: '/allied-health-services/occupational-therapy/', linkLabel: 'Occupational therapy' },
          { title: 'Physiotherapy', body: 'Paediatric physiotherapy to support movement, strength, balance and developmental milestones.', items: ['Gross motor skills', 'Mobility', 'Strength & balance'], to: '/allied-health-services/physiotherapy/', linkLabel: 'Physiotherapy' },
        ],
      },
      {
        kind: 'checks',
        id: 'families',
        eyebrow: 'Working with families',
        title: 'Therapy that fits your child’s world.',
        intro: 'Children learn best in familiar places, with the people they spend time with.',
        items: [
          'Formal and play-based assessments to understand your child’s strengths',
          'Individual therapy goals that you help set',
          'Practical strategies for parents, carers and educators',
          'Follow-up sessions at home, kindy or school',
          'Workshops for parents and educators on communication-friendly environments',
          'Support with the move to school',
        ],
      },
    ],
    funding: ['NDIS', 'Medicare', 'Private health insurance'],
    related: ['/allied-health-services/speech-pathology/', '/allied-health-services/occupational-therapy/', '/ndis-eligibility/', '/ndis-services/'],
  },

  // ── Housing & living support ───────────────────────────────────────────────
  {
    path: '/housing-living-support/',
    navLabel: 'Supported Accommodation',
    seoTitle: 'NDIS Supported Accommodation: SIL & Respite | Brisbane',
    description:
      'NDIS housing and living support in Brisbane: Supported Independent Living (SIL) and Short-Term Accommodation (respite), with allied health and nursing on hand.',
    badge: 'Supported Independent Living · Short-Term Accommodation',
    h1: 'A place to live. Support to thrive.',
    intro:
      'Everyone deserves a safe, secure home. We provide supported living and short stays for people with disability, with our own allied health and nursing team behind every resident.',
    img: img('photo-1756312177451-aeb00d6e179a'),
    imgAlt: 'Smiling woman in a wheelchair outdoors near her home',
    tint: '#d4e4f7',
    defaultService: 'Supported Accommodation (SIL / STA)',
    serviceType: 'NDIS supported accommodation',
    sections: [
      {
        kind: 'cards',
        id: 'options',
        eyebrow: 'Living options',
        title: 'Find the arrangement that suits you.',
        columns: 2,
        cards: [
          { tag: 'SIL', title: 'Supported Independent Living', body: 'Help or supervision with daily tasks in a shared or individual home, for people with higher support needs. Support can be around the clock, including overnight, while you build skills to live as independently as possible.', to: '/supported-independent-living/', linkLabel: 'More about SIL' },
          { tag: 'STA', title: 'Short-Term Accommodation (respite)', body: 'Support and accommodation away from home for up to 14 days at a time, on your own or with others. Useful when your usual carers need a break, or when you want to try something new.' },
        ],
      },
      {
        kind: 'checks',
        id: 'included',
        eyebrow: 'Included support',
        title: 'Care that comes with your home.',
        items: [
          'Personal care and daily routines',
          'Meal preparation and household tasks',
          'Medication management',
          'Community access and social activities',
          'Allied health and nursing in your home',
          'Help to work toward your own goals',
        ],
      },
      {
        kind: 'steps',
        id: 'process',
        eyebrow: 'How to apply',
        title: 'From enquiry to moving in.',
        steps: [
          { title: 'Ask about vacancies', body: 'Call 1300 450 334 or send an enquiry. We’ll talk about what you’re looking for.' },
          { title: 'Identify your supports', body: 'We work out the daily supports you need so they can be included in your NDIS plan.' },
          { title: 'Agree how support works', body: 'Once funded, we agree together on how and when support is delivered.' },
        ],
      },
    ],
    funding: ['NDIS'],
    related: ['/supported-independent-living/', '/ndis-services/', '/home-community-support/', '/ndis-eligibility/'],
  },
  {
    path: '/supported-independent-living/',
    parent: { label: 'Supported Accommodation', to: '/housing-living-support/' },
    navLabel: 'Supported Independent Living',
    seoTitle: 'Supported Independent Living (SIL) Brisbane | NDIS Provider',
    description:
      'NDIS Supported Independent Living in Brisbane: daily living help, personal care, medication management and skill-building in shared or individual homes.',
    badge: 'NDIS SIL · Shared and individual living',
    h1: 'Supported Independent Living (SIL) in Brisbane.',
    intro:
      'SIL gives you help with daily life in your home, whether you live alone or with other NDIS participants. The aim is a good quality of life, more independence and a stronger connection with your community.',
    img: img('photo-1760992003987-efc5259bcfbf'),
    imgAlt: 'Older woman in a wheelchair outdoors with her support worker',
    tint: '#3820A0',
    defaultService: 'Supported Accommodation (SIL / STA)',
    serviceType: 'Supported Independent Living',
    sections: [
      {
        kind: 'cards',
        id: 'included',
        eyebrow: 'What’s included',
        title: 'Support with the whole of daily life.',
        cards: [
          { title: 'Daily living', body: 'Cleaning, gardening, grocery shopping and other household tasks.' },
          { title: 'Personal care', body: 'Showering, oral hygiene, dressing and toileting.' },
          { title: 'Medication management', body: 'Safe storage and administration of medication.' },
          { title: 'Life skills', body: 'Building confidence with budgeting, cooking and using public transport.' },
          { title: 'Lifestyle & community', body: 'Pursuing hobbies, meeting people and taking part in community life.' },
          { title: 'Personal goals', body: 'Support to work toward the goals in your plan.' },
        ],
      },
      {
        kind: 'split',
        id: 'shared-living',
        eyebrow: 'Shared living',
        title: 'You choose who you live with.',
        body: [
          'You can share a home and supports with people you already know, or move into shared housing set up for people with disability. Our health professionals and experienced support workers provide SIL using best-practice approaches.',
          'SIL best suits people with higher support needs who need significant help through the day and night. If another living option suits you better, we’ll help you explore it.',
        ],
        img: img('photo-1773227059784-c1e36cc8c8c9', 700, 875),
        imgAlt: 'Two women enjoying time together in a living room',
        tint: '#ddd4f7',
      },
    ],
    funding: ['NDIS'],
    related: ['/housing-living-support/', '/home-community-support/', '/ndis-services/'],
  },

  // ── Home & community support ───────────────────────────────────────────────
  {
    path: '/home-community-support/',
    navLabel: 'Home & Community Support',
    seoTitle: 'In-Home & Community Disability Support | South East QLD',
    description:
      'Disability support workers and nurses for personal care, meals, domestic help, overnight care and community access across Brisbane, Logan, Ipswich and more.',
    badge: 'NDIS · NIISQ · Home Care Packages',
    h1: 'Support for everyday life, at home and out and about.',
    intro:
      'From a few hours a week to full-time care, our support workers and nurses help you live safely and independently at home and stay connected with your community, on your terms.',
    img: img('photo-1773227059784-c1e36cc8c8c9'),
    imgAlt: 'Two older women laughing together at home',
    tint: '#ddd4f7',
    defaultService: 'Home & Community Support',
    serviceType: 'In-home and community disability support',
    sections: [
      {
        kind: 'cards',
        id: 'in-home',
        eyebrow: 'In-home support',
        title: 'Help with the things that matter each day.',
        cards: [
          { title: 'Personal care', body: 'Bathing, dressing, grooming and toileting.' },
          { title: 'Meals', body: 'Cooking and help with eating.' },
          { title: 'Medication', body: 'Reminders and supervision.' },
          { title: 'Nursing care', body: 'Wound care, continence care and chronic disease management.' },
          { title: 'Domestic assistance', body: 'Cleaning, laundry and shopping.' },
          { title: 'Mobility & transfers', body: 'Walking, wheelchair use and hoist transfers.' },
          { title: 'Overnight & 24/7 care', body: 'Overnight or around-the-clock support when you need it.' },
        ],
      },
      {
        kind: 'pills',
        id: 'community',
        eyebrow: 'Community access',
        title: 'Stay connected and involved.',
        intro: 'Support to get out, see people and do the things you enjoy, with transport in accessible vehicles.',
        items: ['Community events & recreation', 'Work & education programs', 'Medical appointments', 'Errands & shopping', 'Social outings & companionship', 'Accessible transport'],
      },
      {
        kind: 'checks',
        id: 'why-chc',
        eyebrow: 'Why choose CHC',
        title: 'Local teams who respond quickly.',
        items: [
          'Qualified support workers, enrolled nurses and community care professionals',
          'Services shaped around your goals and preferences',
          'Bilingual and multilingual staff',
          'Local teams across Brisbane, Logan, Ipswich, North Lakes, Caboolture and the Gold Coast',
        ],
      },
    ],
    funding: ['NDIS', 'NIISQ', 'Home Care Packages'],
    related: ['/ndis-services/', '/aged-care-services/', '/housing-living-support/', '/locations/'],
  },

  // ── Maintenance in the home ────────────────────────────────────────────────
  {
    path: '/maintenance-in-the-home/',
    navLabel: 'Maintenance in the Home',
    seoTitle: 'Maintenance in the Home: Care After Hospital Discharge',
    description:
      'Clinically supervised transitional care at home for medically stable patients leaving hospital, while longer-term funding or placement is arranged.',
    badge: 'Transitional care · Hospital discharge',
    h1: 'Supported care at home, on the way to what’s next.',
    intro:
      'Maintenance in the Home is clinically supervised transitional care for medically stable patients leaving hospital. We provide personal care, nursing and medical oversight at home while a Support at Home package, NDIS funding or a residential aged care place is arranged.',
    img: img('photo-1558618666-fcd25c85cd64'),
    imgAlt: 'Comfortable, well-lit living room prepared for care at home',
    tint: '#E8F5E8',
    defaultService: 'Maintenance in the Home',
    primaryCta: 'Make an Enquiry',
    serviceType: 'Transitional care at home',
    sections: [
      {
        kind: 'cards',
        id: 'included',
        eyebrow: 'What’s included',
        title: 'Clinical oversight with everyday support.',
        columns: 4,
        cards: [
          { title: 'Personal care & daily living', body: 'Help with hygiene, dressing, meals and getting around the home.' },
          { title: 'Registered nurse oversight', body: 'A registered nurse oversees the care plan and clinical needs.' },
          { title: 'Medical officer review', body: 'Medical review to keep care safe while you are at home.' },
          { title: 'Placement & funding coordination', body: 'We work on the next step with you: a Support at Home package, NDIS funding or residential aged care.' },
        ],
      },
      {
        kind: 'checks',
        id: 'who-for',
        eyebrow: 'Who it’s for',
        title: 'For patients, families and hospital teams.',
        items: [
          'Patients who are medically stable and ready to leave hospital',
          'People waiting for longer-term funding or a care placement',
          'Families who want their loved one home sooner, with support in place',
          'Hospital discharge planners and social workers looking for a safe transition',
        ],
      },
    ],
    funding: [],
    related: ['/referrals/', '/aged-care-services/', '/home-community-support/'],
  },

  // ── Allied health hub + disciplines ────────────────────────────────────────
  {
    path: '/allied-health-services/',
    navLabel: 'Allied Health & Rehabilitation',
    seoTitle: 'Allied Health & Rehabilitation | Physio, OT, Speech, Podiatry',
    description:
      'Physiotherapy, occupational therapy, speech pathology and podiatry in clinic, at home or by telehealth across South East Queensland. NDIS, WorkCover, CTP and DVA.',
    badge: 'Clinic · Mobile · Telehealth',
    h1: 'Allied health and rehabilitation. Move better, live stronger.',
    intro:
      'Our physiotherapists, occupational therapists, speech pathologists and podiatrists work together on your goals, whether that’s recovering from injury, managing a long-term condition or getting back to work.',
    img: img('photo-1709880754472-be89c13abc52'),
    imgAlt: 'Physiotherapist working with a client during a rehabilitation session',
    tint: '#E8F0FF',
    defaultService: 'Physiotherapy',
    serviceType: 'Allied health',
    sections: [
      {
        kind: 'cards',
        id: 'disciplines',
        eyebrow: 'Our disciplines',
        title: 'Expert clinicians, one connected team.',
        columns: 2,
        cards: [
          { title: 'Physiotherapy', body: 'Assessment and treatment for injuries, pain, surgery recovery, falls prevention and return to sport or work.', items: ['Sports & musculoskeletal', 'Pre & post surgery', 'Hydrotherapy & gym rehab'], to: '/allied-health-services/physiotherapy/', linkLabel: 'Physiotherapy' },
          { title: 'Occupational Therapy', body: 'Getting back to daily life at home, school and work, with assessments, therapy, equipment and home modifications.', items: ['Functional capacity assessments', 'Assistive technology', 'Home modifications'], to: '/allied-health-services/occupational-therapy/', linkLabel: 'Occupational therapy' },
          { title: 'Speech Pathology', body: 'Communication and swallowing support for children and adults, including after stroke or brain injury.', items: ['Language development', 'Adult communication', 'School transition'], to: '/allied-health-services/speech-pathology/', linkLabel: 'Speech pathology' },
          { title: 'Podiatry', body: 'Foot and lower-limb care for all ages, from diabetic foot care to sports injuries and orthotics.', items: ['Diabetic foot care', 'Gait analysis', 'Nail surgery'], to: '/allied-health-services/podiatry/', linkLabel: 'Podiatry' },
        ],
      },
      {
        kind: 'pills',
        id: 'more',
        eyebrow: 'Also available',
        title: 'More health and wellbeing services.',
        intro: 'Ask our team about availability at your nearest clinic.',
        items: ['Exercise physiology', 'Dietetics & nutrition', 'Psychology', 'Counselling', 'Personal training'],
      },
      {
        kind: 'checks',
        id: 'how-we-work',
        eyebrow: 'How we work',
        title: 'Care where it suits you.',
        items: [
          'Appointments in our clinics, with gym-based rehabilitation',
          'Mobile visits at home, school or work',
          'Telehealth for follow-ups and regional clients',
          'Reports and assessments for NDIS, WorkCover and insurers',
        ],
      },
    ],
    funding: ['Medicare (conditions apply)', 'NDIS', 'WorkCover QLD', 'CTP', 'DVA', 'NIISQ', 'Private health insurance'],
    related: ['/allied-health-services/physiotherapy/', '/allied-health-services/occupational-therapy/', '/allied-health-services/speech-pathology/', '/allied-health-services/podiatry/'],
  },
  {
    path: '/allied-health-services/physiotherapy/',
    parent: { label: 'Allied Health', to: '/allied-health-services/' },
    navLabel: 'Physiotherapy',
    seoTitle: 'Physiotherapy | Logan, Ipswich, North Lakes & Brisbane',
    description:
      'Physiotherapy for sports injuries, chronic pain, surgery rehab, falls prevention and return to work. Clinic gym, hydrotherapy and home visits. NDIS, WorkCover, CTP.',
    badge: 'Physiotherapy · Clinic, home & telehealth',
    h1: 'Physiotherapy to get you moving again.',
    intro:
      'Our physiotherapists assess, treat and support you to manage pain, recover faster and get back to sport, work and everyday life. Every program starts with a thorough assessment and is tailored to you.',
    img: img('photo-1709880754472-be89c13abc52'),
    imgAlt: 'Physiotherapist treating a client in clinic',
    tint: '#E8F0FF',
    defaultService: 'Physiotherapy',
    serviceType: 'Physiotherapy',
    sections: [
      {
        kind: 'pills',
        id: 'conditions',
        eyebrow: 'What we treat',
        title: 'Conditions we help with.',
        items: ['Sports & musculoskeletal injuries', 'Chronic pain', 'Pre- & post-surgery rehabilitation', 'Falls prevention', 'Reduced mobility', 'Motor vehicle injuries (CTP)', 'Workplace injuries', 'Paediatric physiotherapy', 'Aged care physiotherapy'],
      },
      {
        kind: 'cards',
        id: 'services',
        eyebrow: 'Services',
        title: 'Treatment and programs.',
        cards: [
          { title: 'Hydrotherapy', body: 'Water-based exercise to build strength and movement with less load on joints.' },
          { title: 'Gym-based rehabilitation', body: 'Supervised programs in our clinic gym, plus conditioning and fitness classes.' },
          { title: 'Home exercise programs', body: 'Clear, therapeutic exercises you can do at home between sessions.' },
          { title: 'Assessments & reports', body: 'Mobility assessments, pre-employment functional assessments, and NDIS functional capacity assessments and reports.' },
          { title: 'Return to work', body: 'Rehabilitation for WorkCover Queensland and CTP claims, plus workplace injury prevention.' },
          { title: 'Events & workplaces', body: 'Physio cover for sporting games, events and carnivals, and onsite drug and alcohol testing.' },
        ],
      },
    ],
    funding: ['NDIS', 'WorkCover QLD', 'CTP', 'DVA', 'Medicare (conditions apply)', 'Private health insurance'],
    related: ['/allied-health-services/occupational-therapy/', '/allied-health-services/podiatry/', '/aged-care-services/', '/funding-schemes/'],
  },
  {
    path: '/allied-health-services/occupational-therapy/',
    parent: { label: 'Allied Health', to: '/allied-health-services/' },
    navLabel: 'Occupational Therapy',
    seoTitle: 'Occupational Therapy | NDIS, Home Modifications & Assessments',
    description:
      'Occupational therapy for children and adults: functional capacity assessments, assistive technology, complex home modifications, handwriting and self-care skills.',
    badge: 'Occupational therapy · All ages',
    h1: 'Occupational therapy for everyday independence.',
    intro:
      'Occupational therapists help you do the things that matter at home, at school, at work and in your free time, using purposeful activities, the right equipment and changes to your environment. We work closely with families and carers.',
    img: img('photo-1764006145420-df3006edf060'),
    imgAlt: 'Occupational therapist supporting a client with an everyday task',
    tint: '#EEE9FF',
    defaultService: 'Occupational Therapy',
    serviceType: 'Occupational therapy',
    sections: [
      {
        kind: 'pills',
        id: 'who',
        eyebrow: 'Who we help',
        title: 'Support for people of all ages.',
        intro: 'Including people living with acquired or lifelong conditions.',
        items: ['Autism spectrum disorder', 'ADHD', 'Stroke (CVA)', 'Brain injury', 'Physical disability', 'Psychosocial disability'],
      },
      {
        kind: 'cards',
        id: 'services',
        eyebrow: 'Services',
        title: 'Assessments, therapy and equipment.',
        cards: [
          { title: 'Functional capacity assessments', body: 'Detailed assessments of daily living for NDIS plans, plus independent assessments and reports for WorkCover and medico-legal matters.' },
          { title: 'Complex home modifications', body: 'Assessment and design by certified OTs, delivered with experienced builders.' },
          { title: 'Assistive technology', body: 'Finding, trialling and setting up the right equipment.' },
          { title: 'Children’s skills', body: 'Handwriting, motor coordination and self-care skills for school and home.' },
          { title: 'Behaviour & environment', body: 'Behaviour support and practical changes to your environment.' },
          { title: 'Work & employment', body: 'Employment support and occupational health consulting.' },
        ],
      },
    ],
    funding: ['NDIS', 'WorkCover QLD', 'CTP', 'Medicare (conditions apply)', 'Private health insurance'],
    related: ['/allied-health-services/physiotherapy/', '/early-intervention/', '/ndis-services/', '/funding-schemes/'],
  },
  {
    path: '/allied-health-services/speech-pathology/',
    parent: { label: 'Allied Health', to: '/allied-health-services/' },
    navLabel: 'Speech Pathology',
    seoTitle: 'Speech Pathology for Children & Adults | Speech Therapy',
    description:
      'Speech therapy for children and adults: language development, school readiness, and communication after stroke or brain injury. Parent and educator workshops.',
    badge: 'Speech pathology · Children & adults',
    h1: 'Speech pathology that builds on your strengths.',
    intro:
      'Our speech pathologists help children and adults develop and strengthen communication, building on the skills you already have and using everyday moments as chances to learn.',
    img: img('photo-1758273241260-f49172d876e3'),
    imgAlt: 'Speech pathologist working with a child using picture cards',
    tint: '#FFF8E8',
    defaultService: 'Speech Pathology',
    serviceType: 'Speech pathology',
    sections: [
      {
        kind: 'cards',
        id: 'who',
        eyebrow: 'Who we help',
        title: 'Communication support at every age.',
        columns: 2,
        cards: [
          { title: 'Children', body: 'Speech and language development, early intervention and support with the move to school.' },
          { title: 'Adults', body: 'Communication support after stroke (CVA) or traumatic brain injury.' },
        ],
      },
      {
        kind: 'checks',
        id: 'services',
        eyebrow: 'Services',
        title: 'What a program can include.',
        items: [
          'Formal and informal speech and language assessments',
          'An individual therapy program with clear goals',
          'Strategies for the adults in a child’s life',
          'Follow-up at home, in early childhood centres or at school',
          'Training and workshops for parents and educators',
          'School preparation and transition support',
        ],
      },
    ],
    funding: ['NDIS', 'Medicare (conditions apply)', 'Private health insurance'],
    related: ['/early-intervention/', '/allied-health-services/occupational-therapy/', '/ndis-services/'],
  },
  {
    path: '/allied-health-services/podiatry/',
    parent: { label: 'Allied Health', to: '/allied-health-services/' },
    navLabel: 'Podiatry',
    seoTitle: 'Podiatry | Diabetic Foot Care, Gait Analysis & Orthotics',
    description:
      'Podiatry for all ages: diabetic foot assessments, sports and paediatric podiatry, gait analysis, nail surgery, orthotic recommendations and dry needling.',
    badge: 'Podiatry · All ages',
    h1: 'Podiatry for healthy, comfortable feet.',
    intro:
      'Our podiatrists treat, manage and relieve foot and lower-leg pain, dysfunction and injury for people of all ages, using current techniques and technology.',
    tint: '#E8F5E8',
    defaultService: 'Podiatry',
    serviceType: 'Podiatry',
    sections: [
      {
        kind: 'pills',
        id: 'areas',
        eyebrow: 'Areas of care',
        title: 'Podiatry for every stage of life.',
        items: ['General podiatry', 'Diabetic foot care', 'Sports podiatry', 'Paediatric podiatry', 'Biomechanical conditions'],
      },
      {
        kind: 'checks',
        id: 'services',
        eyebrow: 'Services',
        title: 'Assessment and treatment.',
        columns: 3,
        items: ['Biomechanical assessment', 'Gait analysis', 'Foot mobilisation', 'Diabetic foot assessment', 'Nail surgery', 'Orthotic recommendations', 'Dry needling'],
      },
    ],
    funding: ['Medicare (conditions apply)', 'NDIS', 'DVA', 'Home Care Packages', 'Private health insurance'],
    related: ['/allied-health-services/physiotherapy/', '/aged-care-services/', '/allied-health-services/'],
  },
]

export const servicesByPath = Object.fromEntries(services.map(s => [s.path, s]))
