export type GuestPublic = {
  displayName: string;
  slug: string;
  invitedCount: number;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  confirmedCount: number | null;
  respondedAt: string | null;
};

export type GuestSearchResult = {
  displayName: string;
  slug: string;
};

export type GuestAdmin = GuestPublic & {
  id: string;
  firstName: string;
  lastName: string;
  side: 'bride' | 'groom';
  category: string;
};

type GuestRow = {
  id: string;
  first_name: string;
  last_name: string;
  side: 'bride' | 'groom';
  category: string;
  count: number;
  invite_token: string;
  rsvp_status: 'pending' | 'confirmed' | 'declined';
  confirmed_count: number | null;
  rsvp_responded_at: string | null;
};

type GuestRowPublic = Pick<
  GuestRow,
  | 'first_name'
  | 'last_name'
  | 'count'
  | 'invite_token'
  | 'rsvp_status'
  | 'confirmed_count'
  | 'rsvp_responded_at'
>;

export function displayName(firstName: string, lastName: string): string {
  const first = firstName.trim();
  const last = lastName.trim();
  if (!first && !last) return 'Friend';
  return [first, last].filter(Boolean).join(' ');
}

export function slugifyName(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'guest'
  );
}

export function buildSlug(firstName: string, lastName: string, token: string): string {
  return `${slugifyName(displayName(firstName, lastName))}-${token}`;
}

export function extractTokenFromSlug(slug: string): string {
  const parts = slug.split('-');
  return parts[parts.length - 1] ?? slug;
}

export function toPublicGuest(row: GuestRowPublic): GuestPublic {
  return {
    displayName: displayName(row.first_name, row.last_name),
    slug: buildSlug(row.first_name, row.last_name, row.invite_token),
    invitedCount: row.count,
    rsvpStatus: row.rsvp_status,
    confirmedCount: row.confirmed_count,
    respondedAt: row.rsvp_responded_at,
  };
}

export function toAdminGuest(row: GuestRow): GuestAdmin {
  return {
    ...toPublicGuest(row),
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    side: row.side,
    category: row.category,
  };
}

export function buildInviteUrl(slug: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || '';
  return `${base}/${slug}`;
}
