// Service page content. Facts come from the business's page content (Oct 2026),
// the current website and the homepage design. Items needing a business check are
// listed in docs/CONTENT-NOTES.md › Outstanding items.
import { serviceRegions } from '@/content/site'

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
  /** One or more hero paragraphs. */
  intro: string | string[]
  img?: string
  imgAlt?: string
  tint?: string
  primaryCta?: string
  defaultService?: string
  sections: ServiceSection[]
  funding: string[]
  related: string[]
  serviceType?: string
  /** Closing enquiry section; defaults to "Questions about …?". */
  enquiry?: { title: string; body: string[]; submitLabel?: string }
  /** "Common questions" shown above the funding band; also output as FAQPage structured data. Answers restate facts on the page. */
  faqs?: { q: string; a: string }[]
  /** Eligibility or availability disclaimer shown under the enquiry section. */
  note?: string
}

const img = (id: string, w = 800, h = 600) => `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`

/** "Our service locations" section, shared by service pages. */
function regionsSection(note: string): ServiceSection {
  return {
    kind: 'cards',
    id: 'locations',
    eyebrow: 'Our service locations',
    title: 'Services across Australia.',
    intro: `We welcome enquiries and referrals from these areas. ${note}`,
    cards: serviceRegions.map(r => ({ title: r.state, body: r.areas })),
  }
}

export const services: ServiceContent[] = [
  // ── Disability, rehabilitation & community nursing (NDIS / NIISQ / DVA) ────
  {
    path: '/ndis-services/',
    navLabel: 'Disability Services (NDIS)',
    seoTitle: 'NDIS Disability Support, NIISQ & DVA Community Nursing',
    description:
      'Registered NDIS and NIISQ provider: disability support, injury rehabilitation, community nursing and complex care, plus DVA Community Nursing for veterans.',
    badge: 'Registered NDIS & NIISQ provider · DVA Community Nursing',
    h1: 'Personalised care. Greater independence. Better quality of life.',
    intro: [
      'We provide disability support, rehabilitation and community nursing to help people live safely, independently and confidently.',
      'As a registered NDIS and NIISQ provider, we support people with disabilities, neurological injuries and complex healthcare needs. We also provide DVA Community Nursing for eligible Australian veterans.',
    ],
    img: img('photo-1764006145420-df3006edf060'),
    imgAlt: 'Support worker walking beside a young man in a wheelchair outdoors',
    tint: '#EEE9FF',
    primaryCta: 'Enquire About Services',
    defaultService: 'NDIS Disability Services',
    serviceType: 'NDIS disability support, NIISQ rehabilitation and community nursing',
    sections: [
      {
        kind: 'cards',
        id: 'our-services',
        eyebrow: 'Our services',
        title: 'Disability, rehabilitation and community nursing.',
        intro: 'Our multidisciplinary team delivers personalised, coordinated care across Queensland and other Australian states, subject to service availability.',
        cards: [
          {
            tag: 'NDIS disability support',
            title: 'Empowering independence and community participation',
            body: 'Individualised services for people with physical, intellectual, neurological and psychosocial disabilities.',
            items: ['Personal care, daily living & community participation', 'Community nursing & complex clinical support', 'Physiotherapy, OT, speech pathology & podiatry', 'SIL & Individualised Living Options (ILO)', 'Short-term supports & respite, subject to funding'],
            to: '/ndis-eligibility/',
            linkLabel: 'Check NDIS eligibility',
          },
          {
            tag: 'NIISQ injury rehabilitation',
            title: 'Specialised support following serious injury',
            body: 'As a registered NIISQ provider, we support eligible people with acquired brain injuries, spinal cord injuries and other serious injuries from motor vehicle accidents.',
            items: ['Community nursing & complex care', 'Personal care & daily living', 'Neurological rehabilitation & allied health', 'Mobility, assistive technology & community participation', 'Hospital-to-home transition support'],
            to: '/funding-schemes/',
            linkLabel: 'About NIISQ funding',
          },
          {
            tag: 'DVA Community Nursing',
            title: 'Dedicated healthcare for Australian veterans',
            body: 'Professional in-home nursing for eligible veterans, war widows and widowers. Services are subject to DVA eligibility and referral requirements.',
            items: ['Nursing assessments & care planning', 'Wound care & medication management', 'Chronic disease & diabetes management', 'Continence, catheter & stoma care', 'Post-hospital & palliative nursing'],
          },
        ],
      },
      {
        kind: 'split',
        id: 'complex-care',
        eyebrow: 'Specialist nursing',
        title: 'Specialist nursing and complex care.',
        body: [
          'Our nursing team supports people with complex healthcare needs, including brain and spinal cord injuries, complex wounds, enteral feeding, continence care, respiratory support and chronic disease management.',
          'Services are tailored to individual clinical needs and delivered by appropriately qualified professionals.',
        ],
        img: img('photo-1760992003987-efc5259bcfbf', 700, 875),
        imgAlt: 'Older woman in a wheelchair outdoors with her support worker',
        tint: '#ddd4f7',
      },
      {
        kind: 'cards',
        id: 'where',
        eyebrow: 'Where we help',
        title: 'Flexible care, wherever you need it.',
        cards: [
          { title: 'Home & community', body: 'Nursing, personal care, rehabilitation and community participation.' },
          { title: 'Clinics', body: 'Allied health services at Logan Central, North Lakes and Booval.', to: '/locations/', linkLabel: 'Clinic locations' },
          { title: 'Telehealth', body: 'Occupational therapy, speech pathology and medical consultations for clients outside our local areas.' },
        ],
      },
      regionsSection('Our clinics are in South East Queensland. Elsewhere we provide in-home support and telehealth.'),
      {
        kind: 'checks',
        id: 'why-chc',
        eyebrow: 'Why choose CHC',
        title: 'Experienced, person-centred care.',
        items: [
          'Registered NDIS and NIISQ provider',
          'DVA Community Nursing services',
          'Experienced nurses, allied health professionals and support workers',
          'Expertise in neurological rehabilitation and complex care',
          'Flexible, person-centred healthcare',
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
    enquiry: {
      title: 'We’re here to support you.',
      body: [
        'Whether you need NDIS disability support, NIISQ rehabilitation or DVA Community Nursing, our team is ready to discuss your needs.',
        'We welcome referrals from participants, veterans, families, support coordinators, GPs and hospitals.',
      ],
    },
    note: 'Services are subject to eligibility, funding arrangements, clinical assessment and availability.',
    faqs: [
      { q: 'Are you a registered NDIS provider?', a: 'Yes. Complete Healthcare Connect is a registered NDIS provider (registration ID 4-FZ38IK2), approved to deliver supports across 24 registration groups. We are also a registered NIISQ provider.' },
      { q: 'What NDIS disability supports do you provide?', a: 'Personal care, daily living and community participation; community nursing and complex clinical support; physiotherapy, occupational therapy, speech pathology and podiatry; Supported Independent Living and Individualised Living Options; and short-term supports and respite, subject to funding.' },
      { q: 'Do you provide DVA Community Nursing?', a: 'Yes. We provide in-home nursing for eligible veterans, war widows and widowers, including wound care, medication management, chronic disease and continence care. Services are subject to DVA eligibility and referral requirements.' },
      { q: 'Who can make a referral?', a: 'Participants, veterans, families, support coordinators, GPs and hospitals can all refer. Call 1300 450 334 or send a referral online.' },
    ],
    funding: ['NDIS', 'NIISQ', 'DVA'],
    related: ['/ndis-eligibility/', '/housing-living-support/', '/home-community-support/', '/referrals/'],
  },

  // ── Aged care ──────────────────────────────────────────────────────────────
  {
    path: '/aged-care-services/',
    navLabel: 'Aged Care Services',
    seoTitle: 'Aged Care & Support at Home | CHSP, Respite & DVA',
    description:
      'Aged care, community nursing and allied health at home: Support at Home, CHSP, Transition Care, respite, restorative care and DVA Community Nursing.',
    badge: 'Support at Home · CHSP · Restorative care · Respite',
    h1: 'Regain confidence. Restore independence. Stay in the home you love.',
    intro: [
      'Personalised aged care, community nursing, allied health and rehabilitation to help older Australians stay healthy, independent and comfortable at home.',
      'We support older Australians through the Support at Home Program, CHSP, the Transition Care Program, respite arrangements and DVA Community Nursing, subject to eligibility and approved service arrangements.',
    ],
    img: img('photo-1773227055624-07b515ba87c5'),
    imgAlt: 'Carer helping an older woman with a walking frame at home',
    tint: '#FFF4E0',
    primaryCta: 'Explore Aged Care Services',
    defaultService: 'Aged Care Services',
    serviceType: 'Aged care, Support at Home and restorative care',
    sections: [
      {
        kind: 'cards',
        id: 'our-services',
        eyebrow: 'Our aged care services',
        title: 'Compassionate, coordinated, person-centred care.',
        cards: [
          { tag: 'Helping you live independently', title: 'Support at Home Program', body: 'Services through eligible Support at Home arrangements.', items: ['Personal care & domestic assistance', 'Community nursing & medication management', 'Physiotherapy, OT & podiatry', 'Falls prevention & rehabilitation', 'Assistive technology, transport & community participation'] },
          { tag: 'Practical support for everyday living', title: 'Commonwealth Home Support Programme (CHSP)', body: 'Entry-level home care services, including personal care, domestic assistance, nursing, allied health and community support, through appropriate provider arrangements.' },
          { tag: 'Rebuild strength. Restore independence.', title: 'Restorative care & rehabilitation', body: 'Physiotherapy, occupational therapy, falls prevention, neurological rehabilitation and personalised reablement programs to support recovery after illness, injury or surgery.' },
          { tag: 'Supporting recovery after hospital', title: 'Transition Care Program (TCP)', body: 'Nursing, rehabilitation and daily living assistance through appropriate transition care arrangements, to help eligible older Australians recover safely at home.', to: '/maintenance-in-the-home/', linkLabel: 'Maintenance in the Home' },
          { tag: 'Flexible support for older people and carers', title: 'Respite & short-term care', body: 'In-home respite, personal care, nursing and short-term support, with help exploring residential respite through approved providers.' },
          { tag: 'Dedicated healthcare for veterans', title: 'DVA Community Nursing', body: 'In-home nursing for eligible veterans, including wound care, medication management, chronic disease support, continence care and palliative nursing.' },
        ],
      },
      {
        kind: 'checks',
        id: 'team',
        eyebrow: 'Specialist nursing & allied health',
        title: 'A multidisciplinary team for healthy ageing.',
        items: [
          'Registered & Enrolled Nurses: wound care, medication and chronic disease management',
          'Physiotherapists: mobility, strength, balance and rehabilitation',
          'Occupational Therapists: functional assessments, home safety and assistive technology',
          'Podiatrists: foot health and diabetic foot care',
          'Speech Pathologists: communication and swallowing support',
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
          'Home safety assessments by occupational therapists',
          'Diabetic foot assessments and general podiatry',
        ],
        img: img('photo-1709880754472-be89c13abc52', 700, 875),
        imgAlt: 'Physiotherapist guiding an older client through a balance exercise',
        tint: '#ddd4f7',
      },
      {
        kind: 'cards',
        id: 'where',
        eyebrow: 'Where we help',
        title: 'Flexible care where you need it.',
        columns: 4,
        cards: [
          { title: 'At home', body: 'Nursing, personal care, allied health and rehabilitation.' },
          { title: 'In our clinics', body: 'Allied health services at Logan Central, North Lakes and Booval.' },
          { title: 'Community & residential aged care', body: 'Services through suitable provider arrangements.' },
          { title: 'Regional & interstate', body: 'In-home support, plus telehealth for occupational therapy, speech pathology and medical consultations.' },
        ],
      },
      regionsSection('Our clinics are in South East Queensland. Elsewhere we provide in-home support and telehealth.'),
      {
        kind: 'checks',
        id: 'why-chc',
        eyebrow: 'Why choose CHC',
        title: 'Age well, live independently.',
        items: [
          'Experienced nursing and allied health professionals',
          'Integrated aged care, home support and rehabilitation',
          'Specialised restorative care and falls prevention',
          'Flexible home, clinic and community services',
          'Compassionate, culturally responsive and person-centred care',
        ],
      },
    ],
    enquiry: {
      title: 'Your comfort. Your independence. Our commitment.',
      body: [
        'Whether you need Support at Home, restorative rehabilitation, nursing or post-hospital care, CHC is here to help.',
        'We welcome referrals from older Australians, families, GPs, hospitals and aged care providers.',
      ],
    },
    note: 'Services are subject to eligibility, funding, referral requirements and availability. Government-funded services may be delivered through approved provider partnerships.',
    faqs: [
      { q: 'Which aged care programs do you deliver?', a: 'We support older Australians through the Support at Home Program, the Commonwealth Home Support Programme (CHSP), the Transition Care Program, respite arrangements and DVA Community Nursing, subject to eligibility and approved service arrangements.' },
      { q: 'Can I have physiotherapy or podiatry at home?', a: 'Yes. Our physiotherapists, occupational therapists and podiatrists visit you at home or see you in one of our clinics, for falls prevention, balance programs, home safety assessments and diabetic foot care.' },
      { q: 'Who can refer to your aged care services?', a: 'We welcome referrals from older Australians, families, GPs, hospitals and aged care providers.' },
    ],
    funding: ['Support at Home', 'CHSP', 'Transition Care Program', 'DVA', 'Medicare', 'Private'],
    related: ['/maintenance-in-the-home/', '/home-community-support/', '/allied-health-services/physiotherapy/', '/allied-health-services/podiatry/'],
  },

  // ── Paediatric early intervention & neurodevelopmental services ────────────
  {
    path: '/early-intervention/',
    navLabel: 'Paediatric & Early Intervention',
    seoTitle: 'Paediatric Early Intervention | Autism, ADHD & Delays',
    description:
      'Paediatric OT, speech pathology and physiotherapy for autism, ADHD, developmental delay and cerebral palsy, in clinic, at home, at school or by telehealth.',
    badge: 'Paediatric allied health · Early intervention · Neurodevelopmental',
    h1: 'Supporting every child to learn, grow and thrive.',
    intro: [
      'Specialised paediatric allied health for children and adolescents with neurodevelopmental conditions, developmental delays, physical disabilities and communication difficulties.',
      'Our occupational therapists, speech pathologists and physiotherapists work closely with children, families, educators and health professionals on individualised, evidence-based therapy programs.',
    ],
    img: img('photo-1758273241260-f49172d876e3'),
    imgAlt: 'Therapist playing with a young child during a therapy session',
    tint: '#FFF8E8',
    primaryCta: 'Book an Assessment',
    defaultService: 'Early Intervention',
    serviceType: 'Paediatric allied health and early childhood intervention',
    sections: [
      {
        kind: 'cards',
        id: 'conditions',
        eyebrow: 'Neurodevelopmental conditions we support',
        title: 'Specialised care for different developmental needs.',
        intro: 'Our clinicians provide assessment, early intervention and ongoing therapy for children with a range of developmental and neurological conditions. A formal diagnosis is not always required to begin an allied health assessment; funding eligibility may vary.',
        columns: 4,
        cards: [
          { title: 'Autism Spectrum Disorder (ASD)', body: 'Communication, sensory processing, emotional regulation, social participation, play, daily living skills and independence, through neurodiversity-affirming therapy.' },
          { title: 'ADHD', body: 'Attention, organisation, executive functioning, emotional regulation, classroom participation and everyday routines.' },
          { title: 'Global Developmental Delay (GDD)', body: 'Early intervention for delays in communication, movement, learning, play, social interaction and daily living skills.' },
          { title: 'Intellectual disability', body: 'Functional communication, adaptive skills, motor development, self-care and community participation.' },
          { title: 'Cerebral palsy & neurological conditions', body: 'Mobility, posture, balance, coordination, functional movement, communication and independence, including assistive technology where appropriate.' },
          { title: 'Speech, language & communication', body: 'Speech delays, language disorders, childhood apraxia of speech, stuttering, social communication differences and complex communication needs.' },
          { title: 'Sensory processing & motor coordination', body: 'Managing sensory challenges, fine and gross motor skills, handwriting and confident participation in everyday activities.' },
          { title: 'Genetic & complex developmental conditions', body: 'Down syndrome, Fragile X syndrome, spina bifida, acquired brain injuries and other developmental or physical disabilities.' },
        ],
      },
      {
        kind: 'cards',
        id: 'therapies',
        eyebrow: 'Our paediatric allied health services',
        title: 'Three disciplines, one team around your child.',
        cards: [
          { title: 'Occupational therapy', body: 'Helping children develop independence and take part in everyday activities.', items: ['Sensory processing & emotional regulation', 'Fine motor, handwriting & school readiness', 'Dressing, toileting, feeding & self-care', 'Attention, executive functioning & routines', 'Functional Capacity Assessments & assistive technology'], to: '/allied-health-services/occupational-therapy/', linkLabel: 'Occupational therapy' },
          { title: 'Speech pathology', body: 'Supporting children to communicate, understand and connect with others.', items: ['Speech & language development', 'Social & functional communication', 'Autism-related communication support', 'Augmentative & Alternative Communication (AAC)', 'Speech sounds, stuttering & language difficulties', 'Feeding & swallowing where clinically appropriate'], to: '/allied-health-services/speech-pathology/', linkLabel: 'Speech pathology' },
          { title: 'Physiotherapy', body: 'Helping children improve movement, mobility and physical participation.', items: ['Gross motor development & coordination', 'Balance, strength & mobility', 'Cerebral palsy & neurological rehabilitation', 'Posture, walking & movement difficulties', 'Mobility equipment & physical independence'], to: '/allied-health-services/physiotherapy/', linkLabel: 'Physiotherapy' },
        ],
      },
      {
        kind: 'cards',
        id: 'where',
        eyebrow: 'Therapy wherever your child needs it',
        title: 'Clinic, home, school and telehealth.',
        columns: 4,
        cards: [
          { title: 'Clinic-based therapy', body: 'Individual assessments and therapy in our Logan Central, North Lakes and Booval (Ipswich) clinics, with structured environments for developmental support and rehabilitation.' },
          { title: 'Home-based therapy', body: 'Support in familiar surroundings, focusing on routines, self-care, communication, sensory regulation, mobility and practical strategies for parents and caregivers.' },
          { title: 'School & childcare', body: 'Working with educators on classroom participation, communication, handwriting, attention, sensory regulation, social interaction and school readiness. We also deliver coordinated programs and school-based therapy hubs.' },
          { title: 'Regional & remote telehealth', body: 'Occupational therapy and speech pathology by telehealth, including assessments, communication therapy and parent coaching. Suitability is assessed individually, with in-person assessment where clinically necessary.' },
        ],
      },
      {
        kind: 'steps',
        id: 'early-intervention',
        eyebrow: 'Early intervention makes a difference',
        title: 'Support at every stage of childhood.',
        intro: 'Early identification and the right intervention help children build skills, take part more confidently and grow in independence. Our therapists work together so care is coordinated, practical and tailored to each child’s goals.',
        steps: [
          { title: 'Early childhood', body: 'Communication, movement, play and developmental milestones.' },
          { title: 'Preschool & school readiness', body: 'Social interaction, emotional regulation, independence and learning participation.' },
          { title: 'School-aged children', body: 'Communication, handwriting, attention, coordination and classroom participation.' },
          { title: 'Adolescents', body: 'Independence, life skills, mobility and community participation.' },
        ],
      },
      {
        kind: 'cards',
        id: 'funding-referrals',
        eyebrow: 'Funding & referrals',
        title: 'Simple referral and funding pathways.',
        intro: 'We welcome referrals from parents, GPs, paediatricians, schools, NDIS support coordinators and other health professionals, and we’ll help you understand the right pathway.',
        columns: 4,
        cards: [
          { title: 'NDIS', body: 'For eligible children with appropriate funding.', to: '/ndis-eligibility/', linkLabel: 'Check NDIS eligibility' },
          { title: 'Medicare', body: 'Through eligible GP or specialist referral pathways.' },
          { title: 'Private health insurance', body: 'Subject to individual policy coverage.' },
          { title: 'Private funding', body: 'For families wishing to access assessments or therapy directly.' },
        ],
      },
      {
        kind: 'checks',
        id: 'why-chc',
        eyebrow: 'Why choose CHC',
        title: 'Family-centred, evidence-informed therapy.',
        items: [
          'Experienced multidisciplinary allied health team',
          'Specialised support for neurodevelopmental conditions',
          'Individualised, family-centred and evidence-informed therapy',
          'Clinic, home, school and telehealth appointments',
          'Collaboration with parents, educators and health professionals',
          'Services across Greater Brisbane, Logan, Ipswich and suitable regional and remote locations',
        ],
      },
    ],
    enquiry: {
      title: 'Helping your child reach their potential.',
      body: [
        'Whether your child has a diagnosed neurodevelopmental condition, is experiencing developmental delays or needs extra support, our team is here to help. Early support can make a meaningful difference.',
      ],
      submitLabel: 'Book a Paediatric Assessment',
    },
    faqs: [
      { q: 'Does my child need a diagnosis to start therapy?', a: 'Not always. A formal diagnosis is not always required to begin an allied health assessment, although funding eligibility may vary.' },
      { q: 'Where does my child’s therapy take place?', a: 'In our Logan Central, North Lakes and Booval (Ipswich) clinics, at home, at school or childcare, or by telehealth for occupational therapy and speech pathology. Telehealth suitability is assessed individually.' },
      { q: 'How can paediatric therapy be funded?', a: 'Through the NDIS for eligible children, Medicare through eligible GP or specialist referral pathways, private health insurance (subject to your policy) or private funding.' },
      { q: 'Who can refer a child?', a: 'Parents, GPs, paediatricians, schools, NDIS support coordinators and other health professionals. We’ll help you understand the right pathway.' },
    ],
    funding: ['NDIS', 'Medicare', 'Private health insurance', 'Private funding'],
    related: ['/allied-health-services/speech-pathology/', '/allied-health-services/occupational-therapy/', '/ndis-eligibility/', '/referrals/'],
  },

  // ── Disability accommodation & supported living ────────────────────────────
  {
    path: '/housing-living-support/',
    navLabel: 'Supported Accommodation',
    seoTitle: 'Disability Accommodation: SIL, SDA & ILO in Logan',
    description:
      'Disability accommodation and supported living: SIL in Logan, SDA in Marsden, specialised accommodation in Waterford West and Individualised Living Options.',
    badge: 'SIL · ILO · SDA · Highly specialised accommodation',
    h1: 'Your home. Your choice. Your independence.',
    intro: [
      'Safe, comfortable and supportive disability accommodation and flexible living arrangements, tailored to individual needs.',
      'From Supported Independent Living (SIL) and Individualised Living Options (ILO) to Specialist Disability Accommodation (SDA) and highly specialised accommodation, we focus on independence, dignity, choice and quality of life.',
    ],
    img: img('photo-1756312177451-aeb00d6e179a'),
    imgAlt: 'Smiling woman in a wheelchair outdoors near her home',
    tint: '#d4e4f7',
    primaryCta: 'Enquire About Vacancies',
    defaultService: 'Supported Accommodation (SIL / SDA / ILO)',
    serviceType: 'NDIS disability accommodation and supported living',
    sections: [
      {
        kind: 'cards',
        id: 'options',
        eyebrow: 'Our accommodation & living options',
        title: 'Find the arrangement that suits you.',
        intro: 'Our disability support workers, nurses and allied health professionals work together to deliver person-centred support.',
        columns: 2,
        cards: [
          { tag: 'SIL · Logan Reserve', title: 'Supported Independent Living', body: 'A welcoming home in Logan Reserve for NDIS participants who need help with everyday activities.', items: ['Personal care & daily routines', 'Meals & household activities', 'Medication assistance & health support', 'Community access & social participation', 'Independent living skills', '24/7 support where required and funded'], to: '/supported-independent-living/', linkLabel: 'More about SIL in Logan' },
          { tag: 'ILO', title: 'Individualised Living Options', body: 'Flexible living arrangements built around you. We work with you, your family and support network on a personalised arrangement that reflects your preferences, goals and support needs. ILO funds the supports, not the accommodation itself.', items: ['Living independently with tailored support', 'Living with a host or supportive household', 'Living with housemates or chosen companions', 'Daily routines & community participation', 'Keeping informal support networks', 'Support that adapts as needs change'] },
          { tag: 'SDA · Marsden', title: 'Specialist Disability Accommodation', body: 'Accessible housing for eligible NDIS participants with significant functional impairment or very high support needs.', items: ['Accessible living spaces', 'Mobility & assistive technology support', 'Individualised daily living assistance', 'Access to nursing & allied health', 'Support tailored to individual needs'] },
          // MOCK (question 16 unanswered): short- and medium-term accommodation, as on the current site.
          { tag: 'STA · Respite', title: 'Short-term accommodation', body: 'Short stays of up to 14 days at a time, giving participants a change of routine and carers a break, with support around the clock.', items: ['Planned or emergency respite', 'Personal care & daily living support', 'Activities & community outings', 'Funded through NDIS core supports'] },
          { tag: 'MTA', title: 'Medium-term accommodation', body: 'Somewhere to live for up to 90 days while you wait for your long-term home to be ready, such as after leaving hospital.', items: ['Transition from hospital or another setting', 'While SDA or home modifications are completed', 'Supports delivered alongside your SIL', 'Funded through NDIS capacity-building supports'] },
          { tag: 'Waterford West', title: 'Highly specialised accommodation', body: 'Tailored living environments and intensive support for people with complex physical, neurological or healthcare needs.', items: ['Complex personal care & high-intensity supports', 'Registered nursing & clinical oversight', 'Neurological & physical disability support', 'Mobility, transfers & specialised equipment', 'Medication management & health monitoring', '24-hour support where required and funded'] },
        ],
      },
      {
        kind: 'checks',
        id: 'integrated',
        eyebrow: 'Integrated healthcare & disability support',
        title: 'A multidisciplinary team behind every home.',
        intro: 'We work with participants, families, support coordinators and health professionals to develop suitable living and care arrangements.',
        items: [
          'Registered Nurses: clinical and complex nursing care',
          'Occupational Therapists: functional assessments, assistive technology and independence',
          'Physiotherapists: mobility and rehabilitation',
          'Speech Pathologists: communication and swallowing support',
          'Disability Support Workers: daily living assistance and community participation',
        ],
      },
      {
        kind: 'steps',
        id: 'process',
        eyebrow: 'How to apply',
        title: 'From enquiry to moving in.',
        steps: [
          { title: 'Ask about vacancies', body: 'Call 1300 450 334 or send an enquiry. We can also arrange a property viewing.' },
          { title: 'Identify your supports', body: 'We work out the daily supports you need so they can be included in your NDIS plan.' },
          { title: 'Agree how support works', body: 'Once funded, we agree together on how and when support is delivered.' },
        ],
      },
    ],
    enquiry: {
      title: 'Find the right living arrangement with CHC.',
      body: [
        'Whether you’re looking for SIL in Logan, flexible ILO supports, accessible SDA housing in Marsden or highly specialised accommodation in Waterford West, we’re here to help.',
        'We welcome enquiries from NDIS participants, families, guardians, support coordinators and hospital discharge teams.',
      ],
      submitLabel: 'Enquire About Vacancies',
    },
    note: 'Accommodation suitability, availability and NDIS funding eligibility are assessed individually. ILO funds eligible living supports rather than rent or housing costs. Highly specialised accommodation is a service description, not a separate NDIS funding category.',
    faqs: [
      { q: 'What is the difference between SIL, ILO and SDA?', a: 'Supported Independent Living (SIL) is help with everyday activities in your home. Individualised Living Options (ILO) are flexible living arrangements built around you, and fund supports rather than the accommodation itself. Specialist Disability Accommodation (SDA) is accessible housing for eligible NDIS participants with significant functional impairment or very high support needs.' },
      { q: 'Where are your homes?', a: 'We offer Supported Independent Living in Logan Reserve, Specialist Disability Accommodation in Marsden and highly specialised accommodation in Waterford West. To protect residents’ privacy we show suburbs only, and share the address when you arrange a viewing.' },
      { q: 'How do I apply for a vacancy?', a: 'Call 1300 450 334 or send an enquiry, and we can arrange a property viewing. We then work out the daily supports you need for your NDIS plan and, once funded, agree together how support is delivered.' },
    ],
    funding: ['NDIS'],
    related: ['/supported-independent-living/', '/ndis-services/', '/home-community-support/', '/referrals/'],
  },
  {
    path: '/supported-independent-living/',
    parent: { label: 'Supported Accommodation', to: '/housing-living-support/' },
    navLabel: 'Supported Independent Living',
    seoTitle: 'Supported Independent Living (SIL) in Logan | NDIS',
    description:
      'NDIS Supported Independent Living in Logan: daily living help, personal care, medication management and skill-building, with 24/7 support where required.',
    badge: 'NDIS SIL · Logan Reserve',
    h1: 'Supported Independent Living (SIL) in Logan.',
    intro:
      'SIL gives you help with daily life in your home, whether you live alone or with other NDIS participants. The aim is a good quality of life, more independence and a stronger connection with your community.',
    img: img('photo-1760992003987-efc5259bcfbf'),
    imgAlt: 'Older woman in a wheelchair outdoors with her support worker',
    tint: '#3820A0',
    defaultService: 'Supported Accommodation (SIL / SDA / ILO)',
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
          { title: 'Medication & health', body: 'Medication assistance, safe storage and health support.' },
          { title: 'Life skills', body: 'Building confidence with budgeting, cooking and using public transport.' },
          { title: 'Lifestyle & community', body: 'Pursuing hobbies, meeting people and taking part in community life.' },
          { title: '24/7 support', body: 'Around-the-clock support where required and funded.' },
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
    faqs: [
      { q: 'Who is Supported Independent Living for?', a: 'SIL best suits NDIS participants with higher support needs who need significant help through the day and night. If another living option suits you better, we’ll help you explore it.' },
      { q: 'Can I choose who I live with?', a: 'Yes. You can share a home and supports with people you already know, or move into shared housing set up for people with disability.' },
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
    badge: 'NDIS · NIISQ · Support at Home',
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
          'Local teams across Brisbane, Logan, Ipswich, North Lakes, Caboolture, the Redlands and the Gold Coast',
        ],
      },
    ],
    faqs: [
      { q: 'What can a support worker help with at home?', a: 'Personal care, meals, medication reminders, domestic assistance, mobility and transfers, and overnight or 24/7 care. Our nurses also provide wound care, continence care and chronic disease management.' },
      { q: 'Which areas do your support workers cover?', a: 'Our local teams work across Brisbane, Logan, Ipswich, North Lakes, Caboolture, the Redlands and the Gold Coast.' },
      { q: 'How can home and community support be funded?', a: 'Through the NDIS, NIISQ or Support at Home, depending on your eligibility.' },
    ],
    funding: ['NDIS', 'NIISQ', 'Support at Home'],
    related: ['/ndis-services/', '/aged-care-services/', '/housing-living-support/', '/locations/'],
  },

  // ── Maintenance in the home ────────────────────────────────────────────────
  {
    path: '/maintenance-in-the-home/',
    navLabel: 'Maintenance in the Home',
    seoTitle: 'Maintenance in the Home: Hospital to Home Care Brisbane',
    description:
      'Medically supervised care at home after hospital across Greater Brisbane: medical oversight, nursing, physiotherapy, OT, personal care and transport.',
    badge: 'Maintenance in the Home · Hospital discharge · Transitional care',
    h1: 'Leaving hospital. Recovering at home. Supported every step.',
    intro: [
      'Medically supervised care, personalised support and the comfort of home. Our Maintenance in the Home Program provides coordinated medical, nursing, allied health and personal care for medically stable patients moving from hospital to home.',
      'Available across Greater Brisbane, we help patients recover safely and stay independent while longer-term arrangements are made, including Support at Home, NDIS funding or residential aged care placement.',
    ],
    img: img('photo-1765896387387-0538bc9f997e'),
    imgAlt: 'Healthcare worker smiling warmly with an older patient',
    tint: '#E8F5E8',
    defaultService: 'Maintenance in the Home',
    primaryCta: 'Request a Quote',
    serviceType: 'Transitional care at home after hospital discharge',
    sections: [
      {
        kind: 'cards',
        id: 'included',
        eyebrow: 'Our services',
        title: 'Coordinated care from hospital to home.',
        cards: [
          { title: 'Medical care & clinical oversight', body: 'Medical assessments, ongoing clinical monitoring, medication oversight and coordinated care planning by CHC’s own doctors.' },
          { title: 'Community nursing', body: 'Registered and enrolled nurses for wound care, medication administration, chronic disease monitoring, continence care and ongoing clinical support.' },
          { title: 'Physiotherapy & rehabilitation', body: 'Personalised physiotherapy to regain strength, improve mobility, restore balance and rebuild confidence after hospital, surgery or illness.' },
          { title: 'Occupational therapy & home modifications', body: 'OT assessments, home safety evaluations, assistive technology and home modification advice to improve access, reduce falls risk and support independent living.' },
          { title: 'Personal care & daily living', body: 'Help with showering, dressing, toileting, meal preparation, mobility, transfers and other activities of daily living.' },
          { title: 'Transport & care coordination', body: 'Transport to essential medical appointments, liaison with hospital discharge teams and help moving to longer-term care arrangements.' },
        ],
      },
      {
        kind: 'checks',
        id: 'why-chc',
        eyebrow: 'Why choose CHC',
        title: 'One team. Coordinated care. Better recovery.',
        items: [
          'Experienced medical, nursing, allied health and support teams',
          'Individualised care plans tailored to your recovery',
          'Coordinated hospital-to-home transitions',
          'Support to regain independence and reduce avoidable hospital readmissions',
          'Services delivered in the comfort of your own home',
        ],
      },
      {
        kind: 'pills',
        id: 'areas',
        eyebrow: 'Greater Brisbane',
        title: 'Supporting patients across Greater Brisbane.',
        intro: 'Subject to service availability and referral arrangements.',
        items: ['Brisbane North', 'Brisbane South', 'Logan', 'Moreton Bay', 'Surrounding communities'],
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
    enquiry: {
      title: 'Need support at home? Contact us for a quote.',
      body: [
        'Whether you’re preparing to leave hospital, recovering from illness or surgery, or arranging care for a loved one, our team is here to help.',
        'If you or someone you care for could benefit from medical, nursing, rehabilitation or personal care at home, tell us about your needs and we’ll prepare a personalised quote.',
      ],
      submitLabel: 'Request a Quote',
    },
    faqs: [
      { q: 'Who is the Maintenance in the Home Program for?', a: 'Medically stable patients who are ready to leave hospital, including people waiting for longer-term funding or a care placement, such as Support at Home, NDIS funding or residential aged care.' },
      { q: 'Which areas do you cover?', a: 'Greater Brisbane, including Brisbane North, Brisbane South, Logan, Moreton Bay and surrounding communities, subject to service availability and referral arrangements.' },
      { q: 'How is the program funded?', a: 'We deliver Maintenance in the Home under a contract with a local health region. Hospital teams can refer eligible patients directly.' },
      { q: 'Who provides the medical care?', a: 'CHC’s own doctors, working with our registered nurses, allied health clinicians and support workers.' },
      { q: 'How much does it cost?', a: 'Costs depend on the care you need. Tell us about your needs and we’ll prepare a personalised quote.' },
    ],
    funding: ['Local health region contract'],
    related: ['/referrals/', '/aged-care-services/', '/home-community-support/'],
  },

  // ── Allied health hub + disciplines ────────────────────────────────────────
  {
    path: '/allied-health-services/',
    navLabel: 'Allied Health & Rehabilitation',
    seoTitle: 'Allied Health & Rehab in Logan, Ipswich & North Lakes',
    description:
      'Physiotherapy, occupational therapy, speech pathology and podiatry in Logan, North Lakes and Ipswich, at home or by telehealth. WorkCover, CTP, NDIS and DVA.',
    badge: 'Physiotherapy · OT · Speech pathology · Podiatry',
    h1: 'Move better. Recover stronger. Live healthier.',
    intro: [
      'Expert physiotherapy, occupational therapy, speech pathology and podiatry across Brisbane, Logan, North Lakes and Ipswich, to help you recover from injury, manage chronic conditions, improve mobility and regain independence.',
      'Whether it’s a sports injury, workplace injury, motor vehicle accident, whiplash, surgery or a neurological condition, our team works together to get you back to work, sport and everyday life. Appointments in clinic, at home, at school or by telehealth.',
    ],
    img: img('photo-1709880754472-be89c13abc52'),
    imgAlt: 'Physiotherapist working with a client during a rehabilitation session',
    tint: '#E8F0FF',
    defaultService: 'Physiotherapy',
    serviceType: 'Allied health and rehabilitation',
    sections: [
      {
        kind: 'cards',
        id: 'disciplines',
        eyebrow: 'Our allied health services',
        title: 'Expert clinicians, one connected team.',
        columns: 2,
        cards: [
          { tag: 'Restore movement. Rebuild strength.', title: 'Physiotherapy', body: 'Evidence-based assessment, treatment and rehabilitation to reduce pain, restore mobility and improve physical function.', items: ['Sports injuries, sprains & strains', 'Back pain, neck pain & whiplash', 'WorkCover Queensland rehabilitation', 'Motor vehicle accident & CTP injuries', 'Pre- & post-operative rehabilitation', 'Neurological rehab, including stroke', 'Falls prevention, balance & mobility', 'Chronic pain & musculoskeletal conditions', 'Exercise rehab & return to sport'], to: '/allied-health-services/physiotherapy/', linkLabel: 'Explore physiotherapy services' },
          { tag: 'Independence in everyday life.', title: 'Occupational Therapy', body: 'Helping children and adults develop, regain or maintain the skills to take part safely and independently in everyday activities.', items: ['Functional Capacity Assessments (FCA)', 'Daily living (ADL) assessments & rehab', 'Home safety assessments & modifications', 'Assistive technology & equipment', 'Workplace assessments & return to work', 'Paediatric OT & developmental support', 'Neurological rehab & cognitive support', 'Falls prevention & independent living'], to: '/allied-health-services/occupational-therapy/', linkLabel: 'Explore occupational therapy services' },
          { tag: 'Communicate with confidence.', title: 'Speech Pathology', body: 'Assessment and therapy for children and adults with communication, speech, language or swallowing difficulties.', items: ['Speech & language development in children', 'Autism (ASD), ADHD & developmental delays', 'Complex neurodevelopmental conditions', 'Rehabilitation after stroke or brain injury', 'Swallowing & feeding assessments', 'Social communication & literacy', 'Augmentative & Alternative Communication (AAC)', 'School readiness & communication support'], to: '/allied-health-services/speech-pathology/', linkLabel: 'Explore speech pathology services' },
          { tag: 'Healthy feet. Better mobility.', title: 'Podiatry', body: 'Assessment and management of foot, ankle and lower-limb conditions to improve comfort, mobility and overall wellbeing.', items: ['Diabetic foot assessments & care', 'Foot & ankle pain management', 'Sports-related foot injuries', 'Biomechanical assessment & gait analysis', 'Orthotics & footwear advice', 'Ingrown toenails & nail procedures', 'Routine foot & nail care', 'Falls prevention & mobility support'], to: '/allied-health-services/podiatry/', linkLabel: 'Explore podiatry services' },
        ],
      },
      {
        kind: 'cards',
        id: 'rehabilitation',
        eyebrow: 'Injury rehabilitation & return to work',
        title: 'Recover safely. Return confidently.',
        intro: 'We support people recovering from workplace injuries, sporting injuries, motor vehicle accidents and surgery, working with you, your treating doctors, employers, insurers and rehabilitation coordinators on a personalised recovery and return-to-work plan.',
        cards: [
          { title: 'WorkCover Queensland', body: 'Physiotherapy, occupational therapy and workplace injury rehabilitation.' },
          { title: 'Motor vehicle accidents & CTP', body: 'Rehabilitation for whiplash, soft tissue injuries, fractures and functional limitations.' },
          { title: 'Sports injury rehabilitation', body: 'Treatment, strengthening and a graded return to sport.' },
          { title: 'Return-to-work programs', body: 'Functional assessments, workplace rehabilitation and graded return-to-work planning.' },
          { title: 'Pre-employment screening', body: 'Functional and physical capacity assessments to support workplace suitability.' },
          { title: 'Post-surgical rehabilitation', body: 'Recovery after orthopaedic and other surgical procedures.' },
        ],
      },
      {
        kind: 'split',
        id: 'neurological',
        eyebrow: 'Neurological rehabilitation & complex conditions',
        title: 'Personalised therapy for long-term recovery.',
        body: [
          'Our multidisciplinary team provides rehabilitation and functional support for people living with neurological conditions, acquired injuries and complex disabilities.',
          'We focus on improving movement, communication, functional independence and quality of life through coordinated, goal-focused therapy.',
        ],
        bullets: [
          'Stroke and acquired brain injury',
          'Spinal cord injuries',
          'Multiple sclerosis and Parkinson’s disease',
          'Cerebral palsy',
          'Autism Spectrum Disorder and ADHD',
          'Developmental delays and complex neurodevelopmental conditions',
          'Chronic neurological and mobility conditions',
        ],
        img: img('photo-1764006145420-df3006edf060', 700, 875),
        imgAlt: 'Clinician supporting a client in a wheelchair',
        tint: '#ddd4f7',
      },
      {
        kind: 'cards',
        id: 'therapy-options',
        eyebrow: 'Flexible therapy options',
        title: 'Therapy options to suit your needs.',
        columns: 4,
        cards: [
          { title: 'Clinic appointments', body: 'Visit our allied health clinics in Logan Central, North Lakes and Booval (Ipswich).', to: '/locations/', linkLabel: 'Clinic locations' },
          { title: 'Home visits', body: 'Physiotherapy, occupational therapy, speech pathology or podiatry at home, subject to availability.' },
          { title: 'School & community visits', body: 'Supporting children and adults in their everyday environments for practical, meaningful outcomes.' },
          { title: 'Telehealth appointments', body: 'Occupational therapy and speech pathology online for clients across Australia. Podiatry needs an in-person visit.' },
        ],
      },
      {
        kind: 'cards',
        id: 'funding-options',
        eyebrow: 'Funding & payment options',
        title: 'Many ways to fund your care.',
        intro: 'Service access, funding approval and out-of-pocket costs depend on individual eligibility and program requirements.',
        columns: 4,
        cards: [
          { title: 'NDIS', body: 'Therapy and functional support for eligible participants.' },
          { title: 'NIISQ', body: 'Rehabilitation and allied health for eligible participants.' },
          { title: 'WorkCover Queensland', body: 'Approved workplace injury treatment and rehabilitation.' },
          { title: 'CTP insurance', body: 'Rehabilitation after eligible motor vehicle accidents.' },
          { title: 'Medicare', body: 'Eligible allied health services with an appropriate GP referral.' },
          { title: 'DVA', body: 'Allied health for eligible veterans and DVA cardholders.' },
          { title: 'Support at Home', body: 'Allied health through applicable aged care funding.' },
          { title: 'Private & self-funded', body: 'Private appointments and eligible health fund rebates.' },
        ],
      },
      {
        kind: 'cards',
        id: 'why-chc',
        eyebrow: 'Why choose CHC',
        title: 'Expert clinicians. Connected care. Better outcomes.',
        cards: [
          { title: 'Multidisciplinary team', body: 'Physiotherapists, occupational therapists, speech pathologists and podiatrists working together.' },
          { title: 'Personalised rehabilitation', body: 'Treatment plans based on your goals and circumstances.' },
          { title: 'Convenient locations', body: 'Clinics across Logan, North Lakes and Ipswich.' },
          { title: 'Flexible service delivery', body: 'Clinic appointments, home visits, school visits and telehealth.' },
          { title: 'Broad funding options', body: 'NDIS, NIISQ, Medicare, DVA, WorkCover Queensland and private clients.' },
          { title: 'Continuity of care', body: 'Coordinated treatment, progress reviews and ongoing rehabilitation support.' },
        ],
      },
    ],
    enquiry: {
      title: 'Book your allied health appointment today.',
      body: [
        'Take the first step towards better movement, greater independence and a healthier life. Whether you need physiotherapy for an injury, occupational therapy for everyday independence, speech pathology for communication or podiatry for foot health, our team is here to help.',
        'Clinics in Logan Central, North Lakes and Booval (Ipswich).',
      ],
    },
    faqs: [
      { q: 'Do I need a referral for allied health?', a: 'You don’t need a referral to book most appointments privately. Some funding schemes, such as Medicare, WorkCover, CTP and DVA, have their own referral or approval requirements, and our team will let you know what you need.' },
      { q: 'Where can I have my appointment?', a: 'At our allied health clinics in Logan Central, North Lakes and Booval (Ipswich), at home (subject to availability), at school or in the community, or by telehealth for occupational therapy and speech pathology. Podiatry is in person only.' },
      { q: 'How can allied health be funded?', a: 'Through the NDIS, NIISQ, WorkCover Queensland, CTP insurance, Medicare (eligible services with an appropriate GP referral), DVA, Support at Home, or privately with eligible health fund rebates.' },
    ],
    funding: ['NDIS', 'NIISQ', 'WorkCover QLD', 'CTP', 'Medicare (conditions apply)', 'DVA', 'Support at Home', 'Private health insurance'],
    related: ['/allied-health-services/physiotherapy/', '/allied-health-services/occupational-therapy/', '/allied-health-services/speech-pathology/', '/allied-health-services/podiatry/'],
  },
  {
    path: '/allied-health-services/physiotherapy/',
    parent: { label: 'Allied Health', to: '/allied-health-services/' },
    navLabel: 'Physiotherapy',
    seoTitle: 'Physiotherapy | Logan, Ipswich, North Lakes & Brisbane',
    description:
      'Physiotherapy for sports injuries, chronic pain, surgery rehab, falls prevention and return to work, with a rehab gym, hydrotherapy and home visits.',
    badge: 'Physiotherapy · Clinic & home visits',
    h1: 'Physiotherapy. Restore movement, rebuild strength.',
    intro:
      'Our physiotherapists provide evidence-based assessment, treatment and rehabilitation to reduce pain, restore mobility and improve physical function, so you can get back to sport, work and everyday life. Every program starts with a thorough assessment and is tailored to you.',
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
        items: ['Sports injuries, sprains & muscle strains', 'Back pain, neck pain & whiplash', 'Work-related injuries & WorkCover Queensland rehabilitation', 'Motor vehicle accident & CTP injuries', 'Pre- & post-operative rehabilitation', 'Neurological rehabilitation, including stroke', 'Falls prevention, balance & mobility', 'Chronic pain & musculoskeletal conditions', 'Exercise rehabilitation & return to sport', 'Paediatric physiotherapy', 'Aged care physiotherapy'],
      },
      {
        kind: 'cards',
        id: 'services',
        eyebrow: 'Services',
        title: 'Treatment and programs.',
        cards: [
          { title: 'Hydrotherapy', body: 'Water-based exercise to build strength and movement with less load on joints, at a hydrotherapy pool near your nearest CHC clinic.' },
          { title: 'Gym-based rehabilitation', body: 'Supervised programs in the rehab gym at our Logan Central clinic, plus conditioning classes.' },
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
    seoTitle: 'Occupational Therapy in Logan, Ipswich & North Lakes',
    description:
      'Occupational therapy for children and adults: NDIS functional capacity assessments, assistive technology, home modifications, handwriting and self-care skills.',
    badge: 'Occupational therapy · All ages',
    h1: 'Occupational therapy. Independence in everyday life.',
    intro:
      'Our occupational therapists help children and adults develop, regain or maintain the skills to take part safely and independently in everyday activities at home, at school, at work and in the community. We work closely with families and carers.',
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
        kind: 'checks',
        id: 'what-we-offer',
        eyebrow: 'Our occupational therapy services',
        title: 'What we offer.',
        columns: 2,
        items: [
          'Functional Capacity Assessments (FCA)',
          'Activities of daily living (ADL) assessments and rehabilitation',
          'Home safety assessments and home modifications',
          'Assistive technology and equipment prescriptions',
          'Workplace assessments and return-to-work rehabilitation',
          'Paediatric occupational therapy and developmental support',
          'Neurological rehabilitation and cognitive support',
          'Falls prevention and independent living assessments',
        ],
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
    seoTitle: 'Speech Pathology in Logan, Ipswich & North Lakes',
    description:
      'Speech therapy for children and adults: language development, school readiness, and communication after stroke or brain injury. Parent and educator workshops.',
    badge: 'Speech pathology · Children & adults',
    h1: 'Speech pathology. Communicate with confidence.',
    intro:
      'Our speech pathologists provide assessment and therapy for children and adults with communication, speech, language or swallowing difficulties, building on the skills you already have.',
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
        kind: 'pills',
        id: 'what-we-offer',
        eyebrow: 'Our speech pathology services',
        title: 'What we help with.',
        items: ['Speech & language development in children', 'Autism (ASD), ADHD & developmental delays', 'Complex neurodevelopmental conditions', 'Communication rehabilitation after stroke or brain injury', 'Swallowing & feeding assessments', 'Social communication & literacy', 'Augmentative & Alternative Communication (AAC)', 'School readiness & communication support'],
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
    seoTitle: 'Podiatry & Diabetic Foot Care | Logan & Ipswich',
    description:
      'Podiatry for all ages: diabetic foot assessments, sports and paediatric podiatry, gait analysis, nail surgery, orthotic recommendations and dry needling.',
    badge: 'Podiatry · All ages',
    h1: 'Podiatry. Healthy feet, better mobility.',
    intro:
      'Our podiatrists assess and manage foot, ankle and lower-limb conditions for people of all ages, to improve comfort, mobility and overall wellbeing.',
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
        items: ['Diabetic foot assessments & ongoing care', 'Foot & ankle pain management', 'Sports-related foot injuries', 'Biomechanical assessment & gait analysis', 'Orthotics & footwear recommendations', 'Ingrown toenails & nail procedures', 'Routine foot & nail care', 'Falls prevention & mobility support', 'Foot mobilisation', 'Dry needling'],
      },
    ],
    funding: ['Medicare (conditions apply)', 'NDIS', 'DVA', 'Support at Home', 'Private health insurance'],
    related: ['/allied-health-services/physiotherapy/', '/aged-care-services/', '/allied-health-services/'],
  },
]

export const servicesByPath = Object.fromEntries(services.map(s => [s.path, s]))
