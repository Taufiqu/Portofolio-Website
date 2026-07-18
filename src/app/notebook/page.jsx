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
              <div className="w-full flex flex-col gap-0 border-t border-[#27272A]">
                {NOTES_DATA.map((note) => {
                  const readingTime = note.id === 'json-dynamic-forms' ? '5 min read' : '4 min read';
                  return (
                    <Link 
                      key={note.id}
                      href={`/notebook/${note.id}`}
                      className="group py-6 border-b border-[#27272A] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full hover:opacity-80 interactive-transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                        <span className="font-mono text-[11px] text-zinc-500 min-w-[90px] select-none">
                          {note.date.replace(/-/g, '.')}
                        </span>
                        <span className="font-geist text-base font-bold text-[#FAFAFA] group-hover:text-[#2563EB] interactive-transition tracking-tight">
                          {note.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 font-mono text-[10px] uppercase text-zinc-500 sm:text-right shrink-0 select-none">
                        <span>{readingTime}</span>
                      </div>
                    </Link>
                  );
                })}
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
            Taufiqu © 2026.
          </span>
        </div>
      </main>
    </div>
  );
}
