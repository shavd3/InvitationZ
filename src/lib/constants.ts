export const WEDDING = {
  dateIso: '2026-10-10T15:00:00+05:30',
  dateDisplay: 'Saturday, 10th October 2026',
  dateWeekday: 'Saturday',
  dateMonth: 'October',
  dateDay: '10',
  dateYear: '2026',
  timeDisplay: '3:00 PM',
  timeDisplayShort: '3 PM Onwards',
  venue: "St. Sebastian's Church",
  venueAddress: 'Moratuwa, Sri Lanka',
  venueFull: "St. Sebastian's Church, Moratuwa",
  mapsUrl: 'https://maps.google.com/?q=St.+Sebastian%27s+Church,+Moratuwa,+Sri+Lanka',
  rsvpDeadline: '20th September 2026',
  refreshmentsNote: 'Refreshments to follow at church premises',
  brideParents: 'Heshan & Sharmila Perera',
  groomParents: 'Eshan & Shyanika Fernando (Late)',
  contacts: [
    { label: 'Heshan', phone: '+94 77 267 2644', tel: 'tel:+94772672644' },
    { label: 'Eshan', phone: '+94 77 323 3602', tel: 'tel:+94773233602' },
  ],
} as const;

export function googleCalendarUrl(): string {
  const start = '20261010T093000Z'; // 3:00 PM +05:30 = 09:30 UTC
  const end = '20261010T120000Z';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Amaya & Shavin — Wedding Ceremony',
    dates: `${start}/${end}`,
    details: "Wedding ceremony at St. Sebastian's Church, Moratuwa. We look forward to celebrating with you!",
    location: "St. Sebastian's Church, Moratuwa, Sri Lanka",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
