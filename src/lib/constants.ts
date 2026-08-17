export const WEDDING = {
  dateIso: '2026-10-10T15:15:00+05:30',
  dateDisplay: 'Saturday, 10th October 2026',
  dateWeekday: 'Saturday',
  dateMonth: 'October',
  dateDay: '10',
  dateYear: '2026',
  timeDisplay: '3:15 PM',
  timeDisplayShort: '3.15 PM Onwards',
  venue: "St. Sebastian's Church",
  venueAddress: 'Moratuwa, Sri Lanka',
  venueFull: "St. Sebastian's Church, Moratuwa",
  mapsUrl: 'https://maps.google.com/?q=St.+Sebastian%27s+Church,+Moratuwa,+Sri+Lanka',
  rsvpDeadline: '20th September 2026',
  refreshmentsNote: 'Refreshments to follow at church premises',
  brideParents: 'Heshan & Sharmila Perera',
  groomParents: 'Eshan & Shyanika Fernando (Late)',
  verse: {
    text: "I hold you in my heart, for we have shared together God's blessings.",
    reference: 'Philippians 1 : 7',
  },
  contacts: [
    { label: 'Shavin', phone: '+94 77 359 2037', tel: 'tel:+94773592037' },
    { label: 'Amaya', phone: '+94 72 230 7420', tel: 'tel:+94722307420' },
  ],
} as const;

/** WhatsApp-ready invite text copied from the admin "Copy invite" action. */
export function buildInviteShareMessage(guestName: string, inviteUrl: string): string {
  return [
    'On behalf of our parents,',
    `Dear ${guestName}`,
    '',
    "Our journey together wouldn't be complete without the people we treasure most. We would be deeply honored by your presence on our wedding day💍",
    '',
    'Please click on the link to view the invitation and submit your response.',
    inviteUrl,
    '',
    'Kindly favour us with your response by the 20th of September✨',
  ].join('\n');
}

export function googleCalendarUrl(): string {
  const start = '20261010T094500Z'; // 3:15 PM +05:30 = 09:45 UTC
  const end = '20261010T120000Z'; // 5:30 PM +05:30
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Amaya & Shavin — Wedding Ceremony',
    dates: `${start}/${end}`,
    details: "Wedding ceremony at St. Sebastian's Church, Moratuwa. We look forward to celebrating with you!",
    location: "St. Sebastian's Church, Moratuwa, Sri Lanka",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
