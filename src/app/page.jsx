import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import ProjectsSection from '../components/sections/ProjectsSection';
import Dashboard from '../components/sections/Dashboard';
import JourneySection from '../components/sections/JourneySection';
import GuestbookSection from '../components/sections/GuestbookSection';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/layout/Footer/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProjectsSection />
        <Dashboard />
        <JourneySection />
        <GuestbookSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
