"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Footer from '../components/layout/Footer/Footer';
import LazySection from '../components/ui/LazySection';

const ProjectsSection = dynamic(() => import('../components/sections/ProjectsSection'));
const Dashboard = dynamic(() => import('../components/sections/Dashboard'));
const JourneySection = dynamic(() => import('../components/sections/JourneySection'));
const GuestbookSection = dynamic(() => import('../components/sections/GuestbookSection'));
const ContactSection = dynamic(() => import('../components/sections/ContactSection'));

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <LazySection height="500px">
          <ProjectsSection />
        </LazySection>
        <LazySection height="700px">
          <Dashboard />
        </LazySection>
        <LazySection height="600px">
          <JourneySection />
        </LazySection>
        <LazySection height="500px">
          <GuestbookSection />
        </LazySection>
        <LazySection height="500px">
          <ContactSection />
        </LazySection>
      </main>
      <Footer />
    </div>
  );
}
