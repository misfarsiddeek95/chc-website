// MOCK policy drafts (Nov 2026). The business hasn't supplied approved wording yet
// (question 7), so these are placeholders to show the page design. They must be
// replaced or approved by the business (and ideally checked by a lawyer) before launch.
// The pages stay noindex until then.

export type PolicySection = { h: string; p: string[] }

export const policies: Record<string, { updated: string; sections: PolicySection[] }> = {
  'Privacy Policy': {
    updated: 'November 2026',
    sections: [
      { h: 'Who we are', p: ['Complete Healthcare Connect Pty Ltd (ABN 82 379 817 655) provides allied health, disability support, nursing and in-home care. We are bound by the Privacy Act 1988 (Cth) and the Australian Privacy Principles.'] },
      { h: 'What we collect', p: ['Your name, contact details, date of birth, funding details (such as your NDIS, Medicare, DVA or WorkCover numbers) and the health information we need to provide your care. If someone refers you, we collect the information they give us.'] },
      { h: 'How we use it', p: ['To provide and coordinate your care, communicate with you, claim funding, meet our legal and reporting obligations, and improve our services. We only share your information with others involved in your care, your funding body or where the law requires, and otherwise only with your consent.'] },
      { h: 'How we store it', p: ['Client records are kept in Zanda, our secure practice-management system, and access is limited to staff who need it. We keep records for the periods required by law.'] },
      { h: 'Your rights', p: ['You can ask to see or correct the information we hold about you. You can also make a privacy complaint to us, and if you are not satisfied with our response, to the Office of the Australian Information Commissioner (oaic.gov.au).'] },
    ],
  },
  'Terms and Conditions': {
    updated: 'November 2026',
    sections: [
      { h: 'Using this website', p: ['This website gives general information about our services. It is not a substitute for advice from a qualified health professional about your situation. In an emergency, call 000.'] },
      { h: 'Accuracy', p: ['We work to keep information current, but services, funding rules and availability can change. Please contact us to confirm details before relying on them.'] },
      { h: 'Our services', p: ['Services are provided under a service agreement or the terms of your funding program. Fees, out-of-pocket costs and cancellation terms are explained before your first appointment.'] },
      { h: 'Links and content', p: ['Links to other websites are provided for convenience; we are not responsible for their content. Content on this site belongs to Complete Healthcare Connect unless stated otherwise.'] },
    ],
  },
  'Cancellation Policy': {
    updated: 'November 2026',
    sections: [
      { h: 'Giving notice', p: ['If you need to cancel or reschedule, please call 1300 450 334 or email admin@chcconnect.com.au as early as possible, and at least 24 hours before your appointment, so we can offer the time to someone else.'] },
      { h: 'Late cancellations and missed appointments', p: ['A cancellation fee may apply when less than 24 hours’ notice is given or an appointment is missed without notice.'] },
      { h: 'NDIS participants', p: ['For NDIS supports, a short-notice cancellation may be charged in line with the NDIS Pricing Arrangements and Price Limits current at the time, as set out in your service agreement.'] },
      { h: 'If we need to cancel', p: ['If we have to cancel, we will tell you as early as possible and offer another time. You will not be charged.'] },
    ],
  },
  'Cookie Policy': {
    updated: 'November 2026',
    sections: [
      { h: 'What cookies are', p: ['Cookies are small files a website stores in your browser. Some are needed for the site to work; others help us understand how the site is used.'] },
      { h: 'Cookies we use', p: ['Essential cookies remember choices such as your cookie preference. With your consent, Google Analytics 4 sets cookies that tell us which pages are visited and how people find us, so we can improve the site. We don’t use advertising cookies.', 'Videos on this site play from YouTube’s privacy-enhanced mode, which doesn’t set cookies until you press play.', 'Our Locations page shows embedded Google Maps. Google may set cookies when a map loads; see Google’s privacy policy.'] },
      { h: 'Your choices', p: ['You can accept or decline analytics cookies when you first visit, change your choice at any time, or block cookies in your browser settings. The site still works if you decline.'] },
    ],
  },
}
