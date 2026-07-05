import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { extractTokenFromSlug, toPublicGuest } from '@/lib/guest';

type RouteParams = { params: Promise<{ token: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { token: slugOrToken } = await params;
  const token = extractTokenFromSlug(slugOrToken);

  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('guest_items')
    .select(
      'first_name, last_name, count, invite_token, rsvp_status, confirmed_count, rsvp_responded_at'
    )
    .eq('invite_token', token)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: 'Unable to load invitation' }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
  }

  return NextResponse.json(toPublicGuest(data));
}
