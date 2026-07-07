import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import ProjectsSection from '../components/sections/ProjectsSection';
import Dashboard from '../components/sections/Dashboard';
import JourneySection from '../components/sections/JourneySection';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/layout/Footer/Footer';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

async function getInitialTelemetry() {
  try {
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

    // 1. Get total visits count
    const { count: totalCount } = await supabase
      .from('visits')
      .select('*', { count: 'exact', head: true });

    // 2. Get live visits count (active in the last 40 seconds)
    const thresholdTime = new Date(Date.now() - 40 * 1000).toISOString();
    const { count: liveCount } = await supabase
      .from('visits')
      .select('*', { count: 'exact', head: true })
      .gt('last_seen', thresholdTime);

    return {
      total: totalCount || 0,
      live: Math.max(1, liveCount || 0)
    };
  } catch (e) {
    console.error('Failed to fetch initial telemetry on server:', e);
    return { total: 0, live: 1 };
  }
}

export default async function Home() {
  const initialTelemetry = await getInitialTelemetry();

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProjectsSection />
        <Dashboard initialTelemetry={initialTelemetry} />
        <JourneySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
