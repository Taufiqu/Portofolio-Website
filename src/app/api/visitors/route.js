import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {}
        },
      },
    }
  );

  try {
    // 1. Get total visits count
    const { count: totalCount, error: totalError } = await supabase
      .from('visits')
      .select('*', { count: 'exact', head: true });

    if (totalError) throw totalError;

    // 2. Get live visits count (active in the last 40 seconds)
    const thresholdTime = new Date(Date.now() - 40 * 1000).toISOString();
    const { count: liveCount, error: liveError } = await supabase
      .from('visits')
      .select('*', { count: 'exact', head: true })
      .gt('last_seen', thresholdTime);

    if (liveError) throw liveError;

    return NextResponse.json({
      total: totalCount || 0,
      live: Math.max(1, liveCount || 0) // Minimum 1 since the current client is active
    });
  } catch (error) {
    console.error('Supabase query error:', error);
    return NextResponse.json({ error: error.message, total: 1, live: 1 }, { status: 500 });
  }
}
