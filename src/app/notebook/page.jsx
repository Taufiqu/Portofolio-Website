import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';
import { NOTES_DATA } from '../../data/notes';

export default function NotebookIndex() {
  return (
    <div className="min-h-screen bg-[#0F0F11] text-[#A1A1AA] flex flex-col justify-between font-inter selection:bg-[#2563EB]/25">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 section-padding">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-12">
          {/* Back link */}
          <div>
            <Link 
              href="/" 
              className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-[#FAFAFA] interactive-transition"
            >
              <span>←</span> Back to Overview
            </Link>
          </div>

          {/* Header */}
          <div className="border-b border-[#27272A] pb-10 flex flex-col gap-4">
            <h1 className="font-geist text-4xl sm:text-6xl font-extrabold tracking-tighter text-[#FAFAFA] leading-none">
              Notebook
            </h1>
            <p className="font-inter text-lg text-[#FAFAFA] font-light max-w-[680px] leading-relaxed">
              Short observations, engineering logs, and notes on performance, components, and tools.
            </p>
          </div>

          {/* Index List (Asymmetric Grid) */}
          <div className="asymmetric-grid">
            {/* Left Column */}
            <div className="flex flex-row md:flex-col items-baseline md:items-start gap-2 select-none">
              <span className="font-mono text-xs tracking-widest text-[#2563EB]">INDEX.</span>
              <span className="font-geist text-xs font-semibold uppercase tracking-[0.2em] text-[#FAFAFA]">Entries</span>
            </div>

            {/* Right Column: Listing */}
            <div className="flex flex-col gap-8 w-full">
              <div className="w-full border-t border-[#27272A]">
                {NOTES_DATA.map((note) => (
                  <div 
                    key={note.id} 
                    className="py-10 border-b border-[#27272A] flex flex-col md:flex-row md:justify-between md:items-start gap-6 w-full"
                  >
                    <div className="flex flex-col gap-2 md:max-w-[60%]">
                      <h3 className="font-geist text-lg font-bold text-[#FAFAFA] tracking-tight">
                        {note.title}
                      </h3>
                      <div className="flex gap-3 items-center font-mono text-[10px] uppercase text-zinc-500 mt-1">
                        <span>{note.date}</span>
                        <span>//</span>
                        <span>{note.tags[0]}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 md:max-w-[35%] items-start md:items-end w-full">
                      <p className="font-inter text-xs leading-relaxed text-zinc-500">
                        {note.summary}
                      </p>
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
        </div>

        {/* Designed Ending */}
        <div className="max-w-[1100px] mx-auto border-t border-[#27272A] pt-12 mt-24 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#2563EB]">
            Designed for longevity.
          </span>
          <span className="font-mono text-[10px] text-zinc-500">
            Muhammad Hafizh © 2026.
          </span>
        </div>
      </main>
    </div>
  );
}
