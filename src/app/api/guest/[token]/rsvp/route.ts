import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { extractTokenFromSlug, toPublicGuest } from '@/lib/guest';

type RouteParams = { params: Promise<{ token: string }> };

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { token: slugOrToken } = await params;
  const token = extractTokenFromSlug(slugOrToken);

  let body: { status?: string; confirmed_count?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const status = body.status;
  if (status !== 'confirmed' && status !== 'declined') {
    return NextResponse.json({ error: 'Status must be confirmed or declined' }, { status: 400 });
  }

  const supabase = createServerSupabase();
  const { data: existing, error: fetchError } = await supabase
    .from('guest_items')
    .select('count, invite_token, first_name, last_name, rsvp_status, confirmed_count, rsvp_responded_at')
    .eq('invite_token', token)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ error: 'Unable to save RSVP' }, { status: 500 });
  }

  if (!existing) {
    return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
  }

  let confirmedCount: number | null = null;
  if (status === 'confirmed') {
    const requested = body.confirmed_count ?? existing.count;
    if (!Number.isInteger(requested) || requested < 1 || requested > existing.count) {
      return NextResponse.json(
        { error: `Please choose between 1 and ${existing.count} guests` },
        { status: 400 }
      );
    }
    confirmedCount = requested;
  }

  const { data, error } = await supabase
    .from('guest_items')
    .update({
      rsvp_status: status,
      confirmed_count: confirmedCount,
      rsvp_responded_at: new Date().toISOString(),
    })
    .eq('invite_token', token)
    .select(
      'first_name, last_name, count, invite_token, rsvp_status, confirmed_count, rsvp_responded_at'
    )
    .single();

  if (error) {
    return NextResponse.json({ error: 'Unable to save RSVP' }, { status: 500 });
  }

  return NextResponse.json(toPublicGuest(data));
}
