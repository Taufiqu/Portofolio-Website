import React from 'react';
import Link from 'next/link';
import Navbar from '../../../components/layout/Navbar';
import { PROJECTS_DATA } from '../../../data/projects';

// Generate static params for static site generation
export async function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectCaseStudy({ params }) {
  const { id } = await params;
  const project = PROJECTS_DATA.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0F0F11] text-[#A1A1AA] flex flex-col justify-between font-inter selection:bg-[#2563EB]/25 pt-32 px-6">
        <Navbar />
        <div className="max-w-[1100px] mx-auto text-center py-20 flex flex-col gap-6 items-center">
          <span className="font-mono text-xs text-[#2563EB]">ERROR // 404</span>
          <h1 className="font-geist text-3xl font-bold text-[#FAFAFA]">Case Study Not Found</h1>
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
              href="/#work" 
              className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-[#FAFAFA] interactive-transition"
            >
              <span>←</span> Back to Work
            </Link>
          </div>

          {/* Banner Layout */}
          <div className="border-b border-[#27272A] pb-10 flex flex-col gap-4">
            <h1 className="font-geist text-4xl sm:text-6xl font-extrabold tracking-tighter text-[#FAFAFA] leading-none">
              {project.title}
            </h1>
            <p className="font-inter text-lg text-[#FAFAFA] font-light max-w-[680px] leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Case Study Story (Asymmetric Grid) */}
          <div className="asymmetric-grid">
            {/* Left Column: Metadata Panel */}
            <div className="flex flex-col gap-6 md:border-r md:border-[#27272A] md:pr-8 h-full">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Role</span>
                <span className="text-sm font-medium text-[#FAFAFA]">{project.role}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Period</span>
                <span className="text-sm font-medium text-[#FAFAFA]">{project.year}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Stack</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-[10px] bg-[#18181B] border border-[#27272A] px-2 py-0.5 rounded-sm text-[#FAFAFA]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {project.githubLink && (
                <div className="flex flex-col gap-1 pt-4">
                  <a 
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#2563EB] hover:opacity-80 interactive-transition"
                  >
                    View Repository →
                  </a>
                </div>
              )}
            </div>

            {/* Right Column: Case Study Narrative */}
            <div className="flex flex-col gap-12 items-start w-full">
              {/* Context */}
              {project.context && (
                <div className="flex flex-col gap-3 w-full">
                  <h2 className="font-geist text-lg font-bold text-[#FAFAFA] tracking-tight">Context</h2>
                  <p className="font-inter text-sm leading-relaxed text-[#A1A1AA] max-w-[640px]">
                    {project.context}
                  </p>
                </div>
              )}

              {/* Problem */}
              <div className="flex flex-col gap-3 w-full border-t border-[#27272A] pt-6">
                <h2 className="font-geist text-lg font-bold text-[#FAFAFA] tracking-tight">The Problem</h2>
                <p className="font-inter text-sm leading-relaxed text-[#A1A1AA] max-w-[640px]">
                  {project.problem}
                </p>
              </div>

              {/* Constraints */}
              <div className="flex flex-col gap-3 w-full border-t border-[#27272A] pt-6">
                <h2 className="font-geist text-lg font-bold text-[#FAFAFA] tracking-tight">Constraints</h2>
                <p className="font-inter text-sm leading-relaxed text-[#A1A1AA] max-w-[640px]">
                  {project.constraints}
                </p>
              </div>

              {/* Approach & Architecture */}
              <div className="flex flex-col gap-3 w-full border-t border-[#27272A] pt-6">
                <h2 className="font-geist text-lg font-bold text-[#FAFAFA] tracking-tight">Approach & Architecture</h2>
                <p className="font-inter text-sm leading-relaxed text-[#A1A1AA] max-w-[640px] mb-4">
                  {project.approach}
                </p>
                <div className="bg-[#18181B] border border-[#27272A] p-5 rounded-sm w-full max-w-[640px]">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-2">SYSTEM_ARCH_DESCRIPTOR // SPEC</span>
                  <p className="font-inter text-xs leading-relaxed text-zinc-400">
                    {project.architecture}
                  </p>
                </div>
              </div>

              {/* Outcome */}
              <div className="flex flex-col gap-3 w-full border-t border-[#27272A] pt-6">
                <h2 className="font-geist text-lg font-bold text-[#FAFAFA] tracking-tight">Outcome</h2>
                <p className="font-inter text-sm leading-relaxed text-[#A1A1AA] max-w-[640px]">
                  {project.outcome}
                </p>
              </div>

              {/* Lessons */}
              <div className="flex flex-col gap-3 w-full border-t border-[#27272A] pt-6 pb-8">
                <h2 className="font-geist text-lg font-bold text-[#FAFAFA] tracking-tight">Lessons Learned</h2>
                <p className="font-inter text-sm leading-relaxed text-[#A1A1AA] max-w-[640px]">
                  {project.lessons}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Designed Ending for inner pages */}
        <div className="max-w-[1100px] mx-auto border-t border-[#27272A] pt-12 mt-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
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
