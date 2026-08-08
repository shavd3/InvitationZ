export type GuestPublic = {
  displayName: string;
  slug: string;
  invitedCount: number;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  confirmedCount: number | null;
  respondedAt: string | null;
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
  // Capitalise each word and leave the rest of it alone. Lowercasing the tail would turn
  // "Ajith & Family" into "Ajith & family" — the names in the planner are already cased the
  // way the couple wants them, so the only job here is a leading capital.
  const format = (part: string) =>
    part
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  const first = format(firstName);
  const last = format(lastName);
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

/**
 * Seats a guest may confirm. The planner keeps some rows at count 0 (relatives abroad who are
 * listed but not being sent anything). If such a link is ever handed out, the holder is invited
 * for at least themselves — never dead-end someone who opened a personal invitation.
 */
export function seatsAllowed(invitedCount: number): number {
  return Math.max(1, invitedCount);
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
