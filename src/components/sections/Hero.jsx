"use client";

import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  return (
    <div className="w-full bg-[#0F0F11]">
      {/* 1. Typographic Welcome Banner (Landing Spread) */}
      <div className="max-w-[1100px] mx-auto min-h-[85vh] flex flex-col justify-center px-6">
        <div className="flex flex-col gap-6 items-start">
          <h1 className="font-geist text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-[#FAFAFA] uppercase leading-none select-none">
            Taufiqu
          </h1>
          <p className="font-inter text-lg sm:text-xl text-[#FAFAFA] font-light max-w-[600px] leading-relaxed">
            Software Engineer. Designing software built to evolve.
          </p>
          <div className="flex flex-row items-center gap-4 mt-8">
            <button 
              onClick={() => {
                const el = document.getElementById('overview');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-[#FAFAFA] interactive-transition cursor-pointer select-none"
            >
              Read Overview
              <span className="group-hover:translate-y-0.5 transition-transform duration-150">↓</span>
            </button>
            <span className="text-zinc-700 select-none">/</span>
            <a 
              href="/cv.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-[#FAFAFA] interactive-transition"
            >
              View CV
            </a>
          </div>
        </div>
      </div>

      {/* 2. Overview Details Section (Triggers Active Navigation Scroll Highlight) */}
      <section 
        id="overview" 
        className="w-full py-24 border-t border-b border-[#27272A] section-padding scroll-mt-20"
      >
        <div className="max-w-[1100px] mx-auto asymmetric-grid">
          {/* Left Column: Negative Space numbering and personal metadata */}
          <div className="flex flex-col gap-8 select-none">
            <div className="flex flex-row md:flex-col items-baseline md:items-start gap-2">
              <span className="font-mono text-xs tracking-widest text-[#2563EB]">01.</span>
              <span className="font-geist text-xs font-semibold uppercase tracking-[0.2em] text-[#FAFAFA]">Overview</span>
            </div>

            {/* Personal Context Metadata Grid (Human-oriented) */}
            <div className="hidden md:flex flex-col gap-5 pt-8 border-t border-[#27272A] max-w-[200px]">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Based in</span>
                <span className="text-xs text-[#FAFAFA] font-medium">Lampung, Indonesia</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Focus</span>
                <span className="text-xs text-[#FAFAFA] font-medium">Frontend Architecture</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Working with</span>
                <span className="text-xs text-[#FAFAFA] font-medium">React, Next.js, Laravel</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Availability</span>
                <span className="text-xs text-[#FAFAFA] font-medium">Open for collaboration</span>
              </div>
            </div>
          </div>

          {/* Right Column: Typographic Editorial Bio Block */}
          <div className="flex flex-col gap-6 md:gap-8 items-start w-full">
            <div className="flex flex-col gap-3 md:gap-4 w-full">
              {/* Baris 1: Full Name */}
              <h2 className="font-geist text-2xl sm:text-3xl font-bold tracking-tight text-[#FAFAFA] leading-tight">
                Muhammad Hafizh
              </h2>
              
              {/* Baris 2: Role (Accent Blue) */}
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-[#2563EB] select-none">
                Software Engineer
              </span>
              
              {/* Baris 3: Philosophy Statement */}
              <p className="font-inter text-lg sm:text-xl font-light tracking-tight text-[#FAFAFA] leading-relaxed max-w-[640px]">
                Building software that remains maintainable as it grows.
              </p>
              
              {/* Baris 4: Supporting bio description */}
              <p className="font-inter text-sm sm:text-[15px] leading-relaxed text-[#A1A1AA] max-w-[600px]">
                I design and develop web applications with a focus on frontend architecture, reusable systems, and scalable user experiences.
              </p>
            </div>

            {/* Responsive metadata block for mobile only */}
            <div className="flex md:hidden flex-col gap-4 py-6 border-y border-[#27272A] w-full">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Based in</span>
                  <span className="text-xs text-[#FAFAFA] font-medium">Lampung, Indonesia</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Focus</span>
                  <span className="text-xs text-[#FAFAFA] font-medium">Frontend Architecture</span>
                </div>
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-2">
              <a 
                href="#contact" 
                className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FAFAFA] hover:text-[#2563EB] interactive-transition"
              >
                Contact
                <FiArrowRight className="group-hover:translate-x-1 interactive-transition" />
              </a>
              <a 
                href="https://linkedin.com/in/hafizh-t" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] hover:text-[#FAFAFA] interactive-transition"
              >
                LinkedIn
              </a>
              <a 
                href="https://wa.me/6285789469096" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] hover:text-[#FAFAFA] interactive-transition"
              >
                WhatsApp
              </a>
              <a 
                href="https://github.com/Taufiqu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] hover:text-[#FAFAFA] interactive-transition"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
