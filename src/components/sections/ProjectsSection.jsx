"use client";

import React from 'react';
import Link from 'next/link';
import { PROJECTS_DATA } from '../../data/projects';

export default function ProjectsSection() {
  return (
    <section 
      id="work" 
      className="w-full bg-[#0F0F11] py-24 border-b border-[#27272A] section-padding"
    >
      <div className="max-w-[1100px] mx-auto asymmetric-grid">
        {/* Left Column: Numbering / Label */}
        <div className="flex flex-row md:flex-col items-baseline md:items-start gap-2 select-none">
          <span className="font-mono text-xs tracking-widest text-[#2563EB]">02.</span>
          <span className="font-geist text-xs font-semibold uppercase tracking-[0.2em] text-[#FAFAFA]">Work</span>
        </div>

        {/* Right Column: Narrative List */}
        <div className="flex flex-col gap-12 items-start w-full">
          <div className="max-w-[640px]">
            <p className="text-editorial">
              A selection of projects that represent how I approach system design, modularity, and codebase health.
            </p>
          </div>

          {/* Project list separated by horizontal rules */}
          <div className="w-full border-t border-[#27272A]">
            {PROJECTS_DATA.map((project) => (
              <div 
                key={project.id} 
                className="py-10 border-b border-[#27272A] flex flex-col md:flex-row md:justify-between md:items-start gap-6 w-full"
              >
                {/* Left side of item: title & metadata */}
                <div className="flex flex-col gap-2 md:max-w-[40%]">
                  <h3 className="font-geist text-xl font-bold text-[#FAFAFA] tracking-tight">
                    {project.title}
                  </h3>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#2563EB] flex flex-wrap gap-2 items-center">
                    <span>{project.year}</span>
                    <span className="text-zinc-700">//</span>
                    <span className="text-zinc-400">{project.role}</span>
                  </div>
                </div>

                {/* Right side of item: summary & CTA */}
                <div className="flex flex-col gap-4 md:max-w-[55%] items-start">
                  <p className="font-inter text-[14px] leading-relaxed text-[#A1A1AA]">
                    {project.summary}
                  </p>
                  <Link 
                    href={`/work/${project.id}`}
                    className="group inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#FAFAFA] hover:text-[#2563EB] interactive-transition"
                  >
                    Read
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
