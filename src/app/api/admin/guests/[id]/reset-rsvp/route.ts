import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { createServerSupabase } from '@/lib/supabase';
import { toAdminGuest, buildInviteUrl } from '@/lib/guest';

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(_request: NextRequest, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('guest_items')
    .update({
      rsvp_status: 'pending',
      confirmed_count: null,
      rsvp_responded_at: null,
    })
    .eq('id', id)
    .select(
      'id, first_name, last_name, side, category, count, invite_token, rsvp_status, confirmed_count, rsvp_responded_at'
    )
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: 'Unable to reset RSVP' }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Guest not found' }, { status: 404 });
  }

  const guest = toAdminGuest(data);
  return NextResponse.json({
    guest: { ...guest, inviteUrl: buildInviteUrl(guest.slug) },
  });
}
