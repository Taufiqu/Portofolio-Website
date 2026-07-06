"use client";

import React, { useState, useEffect } from 'react';
import { PROJECTS_DATA } from '../../data/projects';
import { FaTerminal, FaFolderOpen, FaFileCode, FaExternalLinkAlt, FaGithub, FaCog } from 'react-icons/fa';

function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [logLines, setLogLines] = useState([]);

  const activeProject = PROJECTS_DATA[activeIndex];

  // Compile sequence simulation
  useEffect(() => {
    if (!isLoading) return;

    const logs = [
      `[SYS] MOUNTING DRIVE: /dev/sda1_projects... SUCCESS`,
      `[SYS] ESTABLISHING DESCRIPTOR FOR: ${activeProject.title.toUpperCase().replace(/ /g, '_')}...`,
      `[SYS] READING BINARIES FROM STATIC_MEDIA_ASSETS...`,
      `[SYS] LOADED PATH: ${activeProject.image?.src ? activeProject.image.src.slice(0, 30) + '...' : 'static_asset'}`,
      `[SYS] ENGINES DETECTED: [${activeProject.tech.join(', ')}]`,
      `[SYS] COMPILING CONTAINER DESCRIPTOR MODULES...`,
      `[SYS] RUNTIME INITIALIZATION COMPLETE. STATUS: OK`
    ];

    setLogLines([]);
    let currentLine = 0;

    const interval = setInterval(() => {
      if (currentLine < logs.length) {
        setLogLines(prev => [...prev, logs[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [isLoading, activeIndex]);

  const handleSelectProject = (index) => {
    if (index === activeIndex && !isLoading) return;
    setActiveIndex(index);
    setIsLoading(true);
  };

  return (
    <section 
      id="projects" 
      className="bg-[#0B0F17] py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <p className="font-mono-code text-xs text-[var(--color-primary)] uppercase tracking-[0.2em] mb-2">
            [ 01. Mainframe Showcase ]
          </p>
          <h2 className="text-3xl font-extrabold uppercase tracking-wider text-white sm:text-4xl">
            Featured Systems
          </h2>
          <div className="h-1 w-16 bg-[var(--color-primary)] mt-4 mx-auto md:mx-0" />
        </div>

        {/* Retro Mainframe Split View */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          
          {/* ====================================================
              KOLOM KIRI: DIRECTORY TREE CONSOLE (40%)
             ==================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#161F30] p-6 shadow-xl relative overflow-hidden">
            {/* Top Bar Decoration */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-primary)] to-teal-500" />
            
            <div>
              {/* Fake Terminal Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <FaTerminal className="text-xs text-[var(--color-primary)]" />
                  <span className="font-mono-code text-[11px] text-[var(--color-text-muted)]">guest@architect-os: /sys/projects</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
              </div>

              {/* Directory Tree Structure */}
              <div className="font-mono-code text-xs space-y-4">
                <div className="flex items-center gap-2 text-white font-bold">
                  <FaFolderOpen className="text-amber-400" />
                  <span>projects/</span>
                </div>

                {/* Sub-files listing */}
                <div className="pl-6 space-y-2 border-l border-white/5 ml-2.5">
                  {PROJECTS_DATA.map((project, idx) => {
                    const isSelected = activeIndex === idx;
                    const fileName = `${project.title.toLowerCase().replace(/ /g, '_')}.conf`;

                    return (
                      <button
                        key={project.id}
                        onClick={() => handleSelectProject(idx)}
                        className={`w-full text-left flex items-start gap-2.5 py-2 px-3 rounded-lg border transition group ${
                          isSelected 
                            ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20 text-[var(--color-primary)] font-bold' 
                            : 'border-transparent text-[var(--color-text-muted)] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <FaFileCode className={`mt-0.5 shrink-0 ${isSelected ? 'text-[var(--color-primary)]' : 'text-slate-400 group-hover:text-white'}`} />
                        <span className="truncate">{fileName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer metadata of Controller */}
            <div className="mt-8 border-t border-white/5 pt-4 font-mono-code text-[10px] text-[var(--color-text-muted)] flex justify-between">
              <span>TOTAL_SYS: {PROJECTS_DATA.length.toString().padStart(2, '0')}</span>
              <span>INDEX: {activeIndex.toString().padStart(2, '0')}</span>
              <span>STATE: {isLoading ? 'COMPILING' : 'STABLE'}</span>
            </div>
          </div>

          {/* ====================================================
              KOLOM KANAN: CRT SYSTEM MONITOR (60%)
             ==================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border-8 border-slate-700 bg-slate-900 shadow-2xl relative overflow-hidden min-h-[480px]">
            {/* Screen Glare & CRT Scanline Overlays */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-15 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
            <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%]" />

            {/* Monitor Header Screen Area */}
            <div className="p-6 bg-black/50 border-b border-slate-800 flex items-center justify-between z-10 font-mono-code text-[10px] text-[var(--color-primary)]">
              <div className="flex items-center gap-1.5">
                <FaCog className={isLoading ? 'animate-spin' : ''} />
                <span>MONITOR_STREAM // CH: {activeIndex.toString().padStart(2, '0')}</span>
              </div>
              <div className="flex gap-4">
                <span>V_FREQ: 60HZ</span>
                <span>BAUD: 9600</span>
              </div>
            </div>

            {/* Screen Content Area */}
            <div className="flex-1 p-6 flex flex-col justify-between bg-black/80 relative min-h-[380px]">
              {isLoading ? (
                /* Compile Logs Loading Sequence */
                <div className="font-mono-code text-xs text-[var(--color-primary)] space-y-1.5 flex flex-col justify-end h-full">
                  {logLines.map((line, idx) => (
                    <div key={idx} className="leading-relaxed animate-pulse">
                      {line}
                    </div>
                  ))}
                  <div className="terminal-cursor pt-2">LOADING RUNTIME CONTAINER</div>
                </div>
              ) : (
                /* Static Project Details Screen */
                <div className="flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    {/* Project Image Frame */}
                    <div className="relative rounded-xl overflow-hidden h-44 w-full border border-slate-800 bg-slate-950/80">
                      <img 
                        src={activeProject.image?.src || activeProject.image} 
                        alt={activeProject.title} 
                        className="h-full w-full object-cover opacity-85 mix-blend-luminosity hover:mix-blend-normal transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 text-[10px] font-mono-code text-white bg-black/60 px-2 py-0.5 rounded border border-white/10 uppercase">
                        img_loaded.dat
                      </div>
                    </div>

                    {/* Glowing System Title */}
                    <div>
                      <h3 className="text-2xl font-bold font-mono-code tracking-wide text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                        {activeProject.title.toUpperCase()}
                      </h3>
                      <p className="font-mono-code text-[11px] text-[var(--color-primary)] mt-1">
                        [ SYSTEM STATUS: ONLINE & DEPLOYED ]
                      </p>
                    </div>

                    {/* Description styled as green phosphor screen text */}
                    <p className="text-xs leading-relaxed text-[var(--color-text-muted)] font-mono-code">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Tech stack & CTAs */}
                  <div className="space-y-4 pt-4 border-t border-slate-800 font-mono-code">
                    {/* Tech Stack List */}
                    <div>
                      <span className="text-[10px] text-[var(--color-text-muted)] block mb-2">SYSTEM_ENGINE_CORE:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProject.tech.map(t => (
                          <span key={t} className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 px-2 py-0.5 rounded text-[10px] font-bold">
                            {t.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTAs styled as execution commands */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <a 
                        href={activeProject.demoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/30 px-4 py-2 rounded text-xs text-[var(--color-primary)] font-bold hover:bg-[var(--color-primary)] hover:text-[#0B0F17] transition"
                      >
                        <span>RUN_SYSTEM()</span>
                        <FaExternalLinkAlt className="text-[9px]" />
                      </a>
                      <a 
                        href={activeProject.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-4 py-2 rounded text-xs text-white hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition"
                      >
                        <FaGithub />
                        <span>VIEW_SOURCE()</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
