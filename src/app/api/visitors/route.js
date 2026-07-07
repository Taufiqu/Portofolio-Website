import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action'); // 'up' or 'get'

  try {
    let url = 'https://api.counterapi.dev/v1/taufiqu/portfolio';
    if (action === 'up') {
      url = 'https://api.counterapi.dev/v1/taufiqu/portfolio/up';
    }

    const res = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`CounterAPI responded with status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({ count: data.count || 0 });
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json({ error: error.message, count: 0 }, { status: 500 });
  }
}
