import React from 'react';
import Link from 'next/link';
import Navbar from '../../../components/layout/Navbar';
import { NOTES_DATA } from '../../../data/notes';
import TelemetryCounter from '../../../components/layout/TelemetryCounter';

// Generate static params for static site generation
export async function generateStaticParams() {
  return NOTES_DATA.map((note) => ({
    id: note.id,
  }));
}

export default async function NotebookEntry({ params }) {
  const { id } = await params;
  const note = NOTES_DATA.find((n) => n.id === id);

  if (!note) {
    return (
      <div className="min-h-screen bg-[#0F0F11] text-[#A1A1AA] flex flex-col justify-between font-inter selection:bg-[#2563EB]/25 pt-32 px-6">
        <Navbar />
        <div className="max-w-[1100px] mx-auto text-center py-20 flex flex-col gap-6 items-center">
          <span className="font-mono text-xs text-[#2563EB]">ERROR // 404</span>
          <h1 className="font-geist text-3xl font-bold text-[#FAFAFA]">Note Not Found</h1>
          <Link href="/" className="text-xs font-semibold uppercase tracking-wider text-[#FAFAFA] hover:text-[#2563EB] border border-zinc-800 bg-[#18181B] px-5 py-3 rounded-sm">
            ← Return to Overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F11] text-[#A1A1AA] flex flex-col justify-between font-inter selection:bg-[#2563EB]/25">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 section-padding">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-12">
          {/* Back link */}
          <div>
            <Link 
              href="/#notebook" 
              className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-[#FAFAFA] interactive-transition"
            >
              <span>←</span> Back to Notebook
            </Link>
          </div>

          {/* Banner Layout */}
          <div className="border-b border-[#27272A] pb-10 flex flex-col gap-4">
            <h1 className="font-geist text-3xl sm:text-5xl font-extrabold tracking-tighter text-[#FAFAFA] leading-tight max-w-[800px]">
              {note.title}
            </h1>
            <div className="flex gap-4 items-center font-mono text-[10px] uppercase text-zinc-500">
              <span>{note.date}</span>
              <span>//</span>
              <div className="flex gap-2">
                {note.tags.map(t => (
                  <span key={t} className="text-[#2563EB]">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Note Body (Asymmetric Grid) */}
          <div className="asymmetric-grid">
            {/* Left Column */}
            <div className="flex flex-row md:flex-col items-baseline md:items-start gap-2 select-none text-zinc-500">
              <span className="font-mono text-xs tracking-widest text-[#2563EB]">LOG.</span>
              <span className="font-geist text-xs font-semibold uppercase tracking-[0.2em]">{note.id.slice(0, 8)}</span>
            </div>

            {/* Right Column: Markdown-style Reading Flow */}
            <div className="flex flex-col gap-8 items-start w-full prose prose-invert font-inter text-sm leading-relaxed text-[#A1A1AA]">
              {/* Parse double newlines into simple paragraphs */}
              {note.content.split('\n\n').map((block, idx) => {
                // If this is a header
                if (block.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="font-geist text-base font-bold text-[#FAFAFA] pt-4 select-none">
                      {block.replace('### ', '')}
                    </h3>
                  );
                }
                if (block.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="font-geist text-lg font-bold text-[#FAFAFA] pt-6 border-b border-[#27272A] pb-2 w-full select-none">
                      {block.replace('## ', '')}
                    </h2>
                  );
                }
                // If it is a list
                if (block.startsWith('- ')) {
                  return (
                    <ul key={idx} className="list-disc pl-5 flex flex-col gap-1 w-full">
                      {block.split('\n').map((li, lidx) => (
                        <li key={lidx}>{li.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.startsWith('1. ')) {
                  return (
                    <ol key={idx} className="list-decimal pl-5 flex flex-col gap-1 w-full">
                      {block.split('\n').map((li, lidx) => (
                        <li key={lidx}>{li.replace(/^\d+\.\s+/, '')}</li>
                      ))}
                    </ol>
                  );
                }
                // If it is a code block
                if (block.startsWith('```')) {
                  const lines = block.split('\n');
                  const code = lines.slice(1, -1).join('\n');
                  const lang = lines[0].replace('```', '') || 'code';
                  return (
                    <div key={idx} className="bg-[#18181B] border border-[#27272A] p-4 rounded-sm w-full font-mono text-xs overflow-x-auto text-zinc-300">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-2">{lang}</span>
                      <pre><code>{code}</code></pre>
                    </div>
                  );
                }

                // Standard paragraph
                return (
                  <p key={idx} className="max-w-[640px]">
                    {block}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Designed Ending */}
        <div className="max-w-[1100px] mx-auto border-t border-[#27272A] pt-12 mt-24 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#2563EB]">
              Designed for longevity.
            </span>
            <span className="hidden sm:inline text-zinc-800">/</span>
            <TelemetryCounter />
          </div>
          <span className="font-mono text-[10px] text-zinc-500">
            Taufiqu © 2026.
          </span>
        </div>
      </main>
    </div>
  );
}
