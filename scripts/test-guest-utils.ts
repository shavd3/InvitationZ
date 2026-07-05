import {
  buildSlug,
  displayName,
  extractTokenFromSlug,
  slugifyName,
  toPublicGuest,
} from '../src/lib/guest';

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

assert(displayName('Nithila', 'Mendis') === 'Nithila Mendis', 'displayName full');
assert(displayName('Neil Bakery', '') === 'Neil Bakery', 'displayName single');
assert(displayName('', '') === 'Friend', 'displayName empty');

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

console.log('All guest utility tests passed.');
