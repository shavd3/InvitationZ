import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { displayName, buildSlug } from '@/lib/guest';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim() ?? '';

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  if (q.length > 50) {
    return NextResponse.json({ error: 'Search query too long' }, { status: 400 });
  }

  const escaped = q.replace(/[%_\\,().]/g, '');
  const pattern = `%${escaped}%`;

  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('guest_items')
    .select('first_name, last_name, invite_token')
    .or(`first_name.ilike.${pattern},last_name.ilike.${pattern}`)
    .limit(8);

  if (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }

  const results = (data ?? []).map((row) => ({
    displayName: displayName(row.first_name, row.last_name),
    slug: buildSlug(row.first_name, row.last_name, row.invite_token),
  }));

  return NextResponse.json({ results });
}
