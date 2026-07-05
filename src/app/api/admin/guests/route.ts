import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { createServerSupabase } from '@/lib/supabase';
import { toAdminGuest, buildInviteUrl } from '@/lib/guest';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('guest_items')
    .select(
      'id, first_name, last_name, side, category, count, invite_token, rsvp_status, confirmed_count, rsvp_responded_at'
    )
    .order('first_name');

  if (error) {
    return NextResponse.json({ error: 'Unable to load guests' }, { status: 500 });
  }

  const guests = (data ?? []).map((row) => {
    const guest = toAdminGuest(row);
    return {
      ...guest,
      inviteUrl: buildInviteUrl(guest.slug),
    };
  });

  return NextResponse.json({ guests });
}
