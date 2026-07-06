"use client";

import React from 'react';
import { JOURNEY_DATA } from '../../data/journey';
import { FaGitBranch, FaCode, FaCalendarAlt, FaUser } from 'react-icons/fa';

function JourneySection() {
  // Hardcoded commit hashes to make it feel like real git log history
  const commitHashes = ["9d8f3a1", "4b7e2c9", "1a2b3c4"];
  const branches = ["main", "feature/edu", "main"];

  return (
    <section 
      id="journey" 
      className="bg-[#0B0F17] py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left">
          <p className="font-mono-code text-xs text-[var(--color-accent-green)] uppercase tracking-[0.2em] mb-2">
            [ 03. System History Logs ]
          </p>
          <h2 className="text-3xl font-extrabold uppercase tracking-wider text-white sm:text-4xl">
            Development Path
          </h2>
          <div className="h-1 w-16 bg-[var(--color-accent-green)] mt-4 mx-auto md:mx-0" />
        </div>

        {/* Git Graph Timeline */}
        <div className="space-y-0">
          {JOURNEY_DATA.map((item, idx) => {
            const hash = commitHashes[idx] || "abcdef0";
            const branch = branches[idx] || "main";
            const isLatest = idx === 0;

            // Generate Inline SVG dynamically based on timeline index to draw the Git Tree Graph
            let gitGraphSvg;
            if (idx === 0) {
              // Row 1 (Work): Main branch node. Green branch does not exist yet.
              gitGraphSvg = (
                <svg className="w-20 h-full min-h-[180px]" viewBox="0 0 80 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Main Line running all the way down */}
                  <line x1="25" y1="0" x2="25" y2="180" stroke="#00F2FE" strokeWidth="3" />
                  {/* Commit Node on main */}
                  <circle cx="25" cy="45" r="8" fill="#00F2FE" className="animate-pulse" />
                  <circle cx="25" cy="45" r="4" fill="#0B0F17" />
                </svg>
              );
            } else if (idx === 1) {
              // Row 2 (Education): main branch line goes straight. education branch splits off and has a node.
              gitGraphSvg = (
                <svg className="w-20 h-full min-h-[180px]" viewBox="0 0 80 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Main Line goes straight down */}
                  <line x1="25" y1="0" x2="25" y2="180" stroke="#00F2FE" strokeWidth="3" />
                  {/* Edu branch curves off main and runs down */}
                  <path d="M 25,10 Q 25,45 55,45 T 55,180" fill="none" stroke="#10B981" strokeWidth="2.5" strokeDasharray="5,5" />
                  {/* Commit Node on edu branch */}
                  <circle cx="55" cy="90" r="8" fill="#10B981" />
                  <circle cx="55" cy="90" r="4" fill="#0B0F17" />
                </svg>
              );
            } else {
              // Row 3 (First steps): edu branch merges back into main. main has its initial node and stops.
              gitGraphSvg = (
                <svg className="w-20 h-full min-h-[180px]" viewBox="0 0 80 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Main Line goes down and stops at commit */}
                  <line x1="25" y1="0" x2="25" y2="70" stroke="#00F2FE" strokeWidth="3" />
                  {/* Edu branch merges back into main */}
                  <path d="M 55,0 Q 55,30 25,70" fill="none" stroke="#10B981" strokeWidth="2.5" strokeDasharray="5,5" />
                  {/* Initial Commit Node on main */}
                  <circle cx="25" cy="70" r="8" fill="#00F2FE" />
                  <circle cx="25" cy="70" r="4" fill="#0B0F17" />
                </svg>
              );
            }

            return (
              <div key={item.id} className="flex items-stretch group">
                {/* Left side: SVG Git graph column */}
                <div className="flex-shrink-0 flex justify-center">
                  {gitGraphSvg}
                </div>

                {/* Right side: Commit Terminal Log info */}
                <div className="flex-1 pb-16 pl-2 pr-4 font-mono-code text-xs">
                  <div className="space-y-3 pt-2">
                    
                    {/* Commit Hash Header */}
                    <div className="text-[11px] text-[var(--color-text-muted)] space-y-1">
                      <p className="text-white font-semibold">
                        <span className="text-amber-500">commit {hash}</span>
                        {isLatest && (
                          <span className="text-[var(--color-primary)] font-bold ml-2">
                            (HEAD {"->"} {branch}, origin/{branch})
                          </span>
                        )}
                        {!isLatest && (
                          <span className="text-[var(--color-text-muted)] font-normal ml-2">
                            ({branch})
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 text-[10px]">
                        <FaUser className="text-[10px]" />
                        <span>Author: Taufiqu &lt;taufiqu.dev@gmail.com&gt;</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <FaCalendarAlt className="text-[10px]" />
                        <span>Date:   {item.year}</span>
                      </div>
                    </div>

                    {/* Commit Message (Title) */}
                    <div className="space-y-1.5">
                      <h4 className="text-base font-bold text-white tracking-wide group-hover:text-[var(--color-primary)] transition-colors">
                        [{item.type.toUpperCase()}] - {item.title}
                      </h4>
                      <p className="text-[var(--color-text-muted)] leading-relaxed text-xs pl-4 border-l-2 border-slate-800">
                        {item.description}
                      </p>
                    </div>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-2 pl-4">
                      {item.skills.map(s => (
                        <span 
                          key={s} 
                          className="bg-white/5 border border-white/10 rounded px-2.5 py-0.5 text-[10px] text-slate-400 uppercase font-medium hover:border-[var(--color-primary)] hover:text-white transition duration-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default JourneySection;
