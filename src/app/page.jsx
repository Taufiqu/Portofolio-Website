"use client";

import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import ProjectsSection from '../components/sections/ProjectsSection';
import NotebookSection from '../components/sections/NotebookSection';
import PerspectiveSection from '../components/sections/PerspectiveSection';
import ContactSection from '../components/sections/ContactSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F0F11] text-[#A1A1AA] flex flex-col justify-between font-inter selection:bg-[#2563EB]/25">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProjectsSection />
        <NotebookSection />
        <PerspectiveSection />
        <ContactSection />
      </main>
    </div>
  );
}
