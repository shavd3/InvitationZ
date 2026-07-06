export const WEDDING = {
  dateIso: '2026-10-10T15:00:00+05:30',
  dateDisplay: 'Saturday, 10th October 2026',
  timeDisplay: '3:00 PM',
  timeDisplayShort: '3 PM Onwards',
  venue: 'St. Sebastians Church',
  venueAddress: 'Moratuwa, Sri Lanka',
  venueFull: 'St. Sebastians Church, Moratuwa',
  mapsUrl: 'https://maps.google.com/?q=St.+Sebastians+Church,+Moratuwa,+Sri+Lanka',
  rsvpDeadline: '10th September 2026',
  refreshmentsNote: 'Refreshments to follow at church premises',
  brideParents: 'Heshan & Sharmila Perera',
  groomParents: 'Eshan & Shyanika Fernando (Late)',
  contacts: [
    { label: 'Groom (Shavin)', phone: '+94 77 359 2037', tel: 'tel:+94773592037' },
    { label: 'Bride (Amaya)', phone: '+94 72 230 7420', tel: 'tel:+94722307420' },
  ],
} as const;

export function googleCalendarUrl(): string {
  const start = '20261010T093000Z'; // 3:00 PM +05:30 = 09:30 UTC
  const end = '20261010T120000Z';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Amaya & Shavin — Wedding Ceremony',
    dates: `${start}/${end}`,
    details: 'Wedding ceremony at St. Sebastians Church, Moratuwa. We look forward to celebrating with you!',
    location: 'St. Sebastians Church, Moratuwa, Sri Lanka',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
