import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

function cleanInput(str) {
  if (typeof str !== 'string') return '';
  // Hapus semua HTML tags untuk mencegah XSS
  return str.replace(/<[^>]*>/g, '').trim();
}

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {}
        },
      },
    }
  );

  try {
    const { data, error } = await supabase
      .from('guestbook')
      .select('id, name, message, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Supabase guestbook GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {}
        },
      },
    }
  );

  try {
    const { name, message } = await request.json();
    
    const sanitizedName = cleanInput(name);
    const sanitizedMessage = cleanInput(message);

    if (!sanitizedName) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!sanitizedMessage) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Batasi panjang karakter untuk keamanan
    const finalName = sanitizedName.substring(0, 50);
    const finalMessage = sanitizedMessage.substring(0, 200);

    const { data, error } = await supabase
      .from('guestbook')
      .insert([{ name: finalName, message: finalMessage }])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Supabase guestbook POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
