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

        {/* Right Column */}
        <div className="flex flex-col gap-12 items-start w-full">
          <div className="max-w-[640px]">
            <p className="text-editorial">
              Short observations, engineering logs, and notes on performance, components, and tools.
            </p>
          </div>

          <div className="w-full border-t border-[#27272A]">
            {NOTES_DATA.map((note) => (
              <div 
                key={note.id} 
                className="py-8 border-b border-[#27272A] flex flex-col md:flex-row md:justify-between md:items-baseline gap-4 w-full"
              >
                {/* Title and date */}
                <div className="flex flex-col gap-1 md:max-w-[60%]">
                  <h3 className="font-geist text-base font-bold text-[#FAFAFA] tracking-tight">
                    {note.title}
                  </h3>
                  <div className="flex gap-3 items-center font-mono text-[10px] uppercase text-zinc-500 mt-1">
                    <span>{note.date}</span>
                    <span>//</span>
                    <span>{note.tags[0]}</span>
                  </div>
                </div>

                {/* Summary and read link */}
                <div className="flex flex-col gap-2 md:max-w-[35%] items-start md:items-end w-full">
                  <Link 
                    href={`/notebook/${note.id}`}
                    className="group inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#FAFAFA] hover:text-[#2563EB] interactive-transition"
                  >
                    Open
                    <span className="group-hover:translate-x-0.5 interactive-transition">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
