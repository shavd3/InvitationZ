import {
  buildSlug,
  displayName,
  extractTokenFromSlug,
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
});

assert(guest.slug === 'nithila-mendis-4f2k', 'public slug');
assert(guest.invitedCount === 2, 'invited count');

// A count-0 row must still admit its holder for one seat, not dead-end them.
assert(seatsAllowed(0) === 1, 'seatsAllowed floors at 1');
assert(seatsAllowed(1) === 1, 'seatsAllowed passes 1 through');
assert(seatsAllowed(4) === 4, 'seatsAllowed passes counts above 1 through');

console.log('All guest utility tests passed.');
