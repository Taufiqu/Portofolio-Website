"use client";

import React from 'react';
import Link from 'next/link';
import { NOTES_DATA } from '../../data/notes';

export default function NotebookSection() {
  return (
    <section 
      id="notebook" 
      className="w-full bg-[#0F0F11] py-24 border-b border-[#27272A] section-padding"
    >
      <div className="max-w-[1100px] mx-auto asymmetric-grid">
        {/* Left Column */}
        <div className="flex flex-row md:flex-col items-baseline md:items-start gap-2 select-none">
          <span className="font-mono text-xs tracking-widest text-[#2563EB]">03.</span>
          <span className="font-geist text-xs font-semibold uppercase tracking-[0.2em] text-[#FAFAFA]">Notebook</span>
        </div>

        {/* Right Column: Compact chronological layout */}
        <div className="flex flex-col gap-12 items-start w-full">
          <div className="max-w-[640px]">
            <p className="text-editorial">
              Short observations, engineering logs, and notes on performance, components, and tools.
            </p>
          </div>

          <div className="w-full flex flex-col gap-0 border-t border-[#27272A]">
            {NOTES_DATA.map((note) => {
              const readingTime = note.id === 'json-dynamic-forms' ? '5 min read' : '4 min read';
              return (
                <Link 
                  key={note.id}
                  href={`/notebook/${note.id}`}
                  className="group py-6 border-b border-[#27272A] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full hover:opacity-80 interactive-transition"
                >
                  {/* Left side: Date and Title */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                    <span className="font-mono text-[11px] text-zinc-500 min-w-[90px] select-none">
                      {note.date.replace(/-/g, '.')}
                    </span>
                    <span className="font-geist text-base font-bold text-[#FAFAFA] group-hover:text-[#2563EB] interactive-transition tracking-tight">
                      {note.title}
                    </span>
                  </div>

                  {/* Right side: Reading time */}
                  <div className="flex items-center gap-1 font-mono text-[10px] uppercase text-zinc-500 sm:text-right shrink-0 select-none">
                    <span>{readingTime}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
