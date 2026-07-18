"use client";

import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  return (
    <section 
      id="overview" 
      className="w-full bg-[#0F0F11] pt-32 pb-24 border-b border-[#27272A] section-padding"
    >
      <div className="max-w-[1100px] mx-auto asymmetric-grid">
        {/* Left Column: Negative Space numbering and info sheet */}
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

        {/* Right Column: Hero Content */}
        <div className="flex flex-col gap-6 md:gap-10 items-start">
          <div className="flex flex-col gap-2">
            <h1 className="font-geist text-4xl sm:text-6xl font-extrabold tracking-tighter text-[#FAFAFA] leading-none">
              Taufiqu
            </h1>
            <p className="font-geist text-lg sm:text-xl text-[#FAFAFA] font-light tracking-tight">
              Software Engineer
            </p>
          </div>

          <p className="font-inter text-editorial text-muted-secondary">
            Building software that remains maintainable as it grows.
          </p>

          {/* Responsive metadata block for mobile only */}
          <div className="flex md:hidden flex-col gap-4 py-6 border-y border-zinc-800 w-full">
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

          <div className="flex flex-row items-center gap-6 mt-4">
            <a 
              href="#contact" 
              className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FAFAFA] hover:text-[#2563EB] interactive-transition"
            >
              Contact
              <FiArrowRight className="group-hover:translate-x-1 interactive-transition" />
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
  );
}
