import {
  buildSlug,
  displayName,
  extractTokenFromSlug,
  NEW_LINK_RSVP_DEADLINE,
  rsvpDeadlineCopy,
  seatsAllowed,
  slugifyName,
  toPublicGuest,
} from '../src/lib/guest.ts';

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

assert(displayName('Nithila', 'Mendis') === 'Nithila Mendis', 'displayName full');
assert(displayName('Neil Bakery', '') === 'Neil Bakery', 'displayName single');
assert(displayName('', '') === 'Friend', 'displayName empty');

// Multi-word fields keep every word capitalised — "Ajith & Family", not "Ajith & family".
assert(displayName('Ajith & Family', '') === 'Ajith & Family', 'displayName multi-word');
assert(displayName('Mr & Mrs Heshan', 'Perera') === 'Mr & Mrs Heshan Perera', 'displayName titles');
assert(displayName('dr bindu', 'de silva') === 'Dr Bindu De Silva', 'displayName lowercase input');
assert(displayName('  spaced   out  ', '') === 'Spaced Out', 'displayName collapses whitespace');

assert(slugifyName('Nithila Mendis') === 'nithila-mendis', 'slugify');
assert(buildSlug('Nithila', 'Mendis', '4f2k') === 'nithila-mendis-4f2k', 'buildSlug');
assert(extractTokenFromSlug('nithila-mendis-4f2k') === '4f2k', 'extractToken');

const guest = toPublicGuest({
  first_name: 'Nithila',
  last_name: 'Mendis',
  count: 2,
  invite_token: '4f2k',
  rsvp_status: 'pending',
  confirmed_count: null,
  rsvp_responded_at: null,
  rsvp_deadline: null,
});

assert(guest.slug === 'nithila-mendis-4f2k', 'public slug');
assert(guest.invitedCount === 2, 'invited count');
assert(guest.rsvpDeadline === null, 'existing link keeps a null deadline');
assert(rsvpDeadlineCopy(guest.rsvpDeadline).card === '20th September 2026', 'existing card date');
assert(rsvpDeadlineCopy(null).share === '20th of September', 'existing share phrase');
assert(
  rsvpDeadlineCopy(NEW_LINK_RSVP_DEADLINE).card === '1st October 2026',
  'new link card date',
);
assert(rsvpDeadlineCopy(NEW_LINK_RSVP_DEADLINE).share === '1st of October', 'new link share phrase');

const laterGuest = toPublicGuest({
  first_name: 'New',
  last_name: 'Guest',
  count: 1,
  invite_token: 'abc123',
  rsvp_status: 'pending',
  confirmed_count: null,
  rsvp_responded_at: null,
  rsvp_deadline: NEW_LINK_RSVP_DEADLINE,
});
assert(laterGuest.rsvpDeadline === NEW_LINK_RSVP_DEADLINE, 'new link stores 1 October');

// A count-0 row must still admit its holder for one seat, not dead-end them.
assert(seatsAllowed(0) === 1, 'seatsAllowed floors at 1');
assert(seatsAllowed(1) === 1, 'seatsAllowed passes 1 through');
assert(seatsAllowed(4) === 4, 'seatsAllowed passes counts above 1 through');

console.log('All guest utility tests passed.');
