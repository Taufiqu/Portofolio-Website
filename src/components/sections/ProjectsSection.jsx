"use client";

import React, { useState, useEffect } from 'react';
import { PROJECTS_DATA } from '../../data/projects';
import { FaTerminal, FaFolderOpen, FaFileCode, FaExternalLinkAlt, FaGithub, FaCog } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

function ProjectsSection() {
  const { theme } = useTheme();
  const isPro = theme === 'pro';
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
      className="bg-[var(--color-background)] py-24 px-4 sm:px-6 lg:px-8 border-t border-[var(--color-outline)] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          {isPro ? (
            <p className="text-xs text-[var(--color-primary)] uppercase tracking-[0.2em] mb-2 font-semibold">
              Mainframe Showcase
            </p>
          ) : (
            <p className="font-mono-code text-xs text-[var(--color-primary)] uppercase tracking-[0.2em] mb-2">
              [ 01. Mainframe Showcase ]
            </p>
          )}
          <h2 className="text-3xl font-extrabold uppercase tracking-wider sm:text-4xl" style={{ color: 'var(--color-text)' }}>
            Featured Systems
          </h2>
          <div className="h-1 w-16 bg-[var(--color-primary)] mt-4 mx-auto md:mx-0" />
        </div>

        {/* Retro Mainframe Split View */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          
          {/* ====================================================
              KOLOM KIRI: DIRECTORY TREE CONSOLE / PROJECT SELECTOR (40%)
             ==================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[var(--color-outline)] bg-[var(--color-card-bg)] p-6 shadow-xl relative overflow-hidden bento-card">
            {/* Top Bar Decoration */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-primary)] to-teal-500" />
            
            <div>
              {/* Fake Terminal Header (DEV only) */}
              {!isPro ? (
                <div className="flex items-center justify-between border-b border-[var(--color-outline)] pb-4 mb-6">
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
              ) : (
                <div className="border-b border-[var(--color-outline)] pb-4 mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Project Directory</span>
                </div>
              )}

              {/* Directory Tree / Selector List */}
              <div className={`text-xs space-y-4 ${isPro ? 'font-sans' : 'font-mono-code'}`}>
                {!isPro && (
                  <div className="flex items-center gap-2 font-bold" style={{ color: 'var(--color-text)' }}>
                    <FaFolderOpen className="text-amber-400" />
                    <span>projects/</span>
                  </div>
                )}

                {/* Sub-files listing */}
                <div className={`space-y-2 ${isPro ? '' : 'pl-6 border-l border-[var(--color-outline)] ml-2.5'}`}>
                  {PROJECTS_DATA.map((project, idx) => {
                    const isSelected = activeIndex === idx;
                    const displayName = isPro ? project.title : `${project.title.toLowerCase().replace(/ /g, '_')}.conf`;

                    return (
                      <button
                        key={project.id}
                        onClick={() => handleSelectProject(idx)}
                        className={`w-full text-left flex items-center gap-2.5 py-2.5 px-3 rounded-lg border transition group ${
                          isSelected 
                            ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20 text-[var(--color-primary)] font-semibold' 
                            : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                      >
                        <FaFileCode className={`mt-0.5 shrink-0 ${isSelected ? 'text-[var(--color-primary)]' : 'text-slate-400 group-hover:text-[var(--color-text)]'}`} />
                        <span className="truncate">{displayName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer metadata of Controller (DEV only) */}
            {!isPro ? (
              <div className="mt-8 border-t border-[var(--color-outline)] pt-4 font-mono-code text-[10px] text-[var(--color-text-muted)] flex justify-between">
                <span>TOTAL_SYS: {PROJECTS_DATA.length.toString().padStart(2, '0')}</span>
                <span>INDEX: {activeIndex.toString().padStart(2, '0')}</span>
                <span>STATE: {isLoading ? 'COMPILING' : 'STABLE'}</span>
              </div>
            ) : (
              <div className="mt-8 border-t border-[var(--color-outline)] pt-4 text-[10px] text-[var(--color-text-muted)] flex justify-between font-medium">
                <span>Total Projects: {PROJECTS_DATA.length}</span>
                <span>Selected: {activeIndex + 1}</span>
              </div>
            )}
          </div>

          {/* ====================================================
              KOLOM KANAN: CRT SYSTEM MONITOR / PREVIEW PANEL (60%)
             ==================================================== */}
          <div className={isPro 
            ? "lg:col-span-7 flex flex-col justify-between rounded-3xl border border-[var(--color-outline)] bg-[var(--color-card-bg)] shadow-xl relative overflow-hidden min-h-[480px] bento-card"
            : "lg:col-span-7 flex flex-col justify-between rounded-3xl border-8 border-slate-700 bg-slate-900 shadow-2xl relative overflow-hidden min-h-[480px]"
          }>
            {/* Screen Glare & CRT Scanline Overlays (DEV only) */}
            {!isPro && (
              <>
                <div className="absolute inset-0 pointer-events-none z-10 opacity-15 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
                <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%]" />
              </>
            )}

            {/* Monitor Header Screen Area */}
            {isPro ? (
              <div className="p-6 bg-black/5 dark:bg-white/5 border-b border-[var(--color-outline)] flex items-center justify-between z-10 text-xs font-semibold text-[var(--color-text)]">
                <div className="flex items-center gap-1.5">
                  <FaCog className={isLoading ? 'animate-spin' : ''} />
                  <span>Showcase Preview // System {activeIndex + 1}</span>
                </div>
              </div>
            ) : (
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
            )}

            {/* Screen Content Area */}
            <div className={`flex-1 p-6 flex flex-col justify-between relative min-h-[380px] ${isPro ? 'bg-[var(--color-card-bg)]' : 'bg-black/80'}`}>
              {isLoading ? (
                isPro ? (
                  <div className="flex flex-col items-center justify-center h-full flex-grow text-[var(--color-text-muted)] gap-3 font-sans">
                    <div className="w-8 h-8 rounded-full border-2 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] animate-spin" />
                    <span className="text-xs font-medium">Loading showcase data...</span>
                  </div>
                ) : (
                  /* Compile Logs Loading Sequence */
                  <div className="font-mono-code text-xs text-[var(--color-primary)] space-y-1.5 flex flex-col justify-end h-full">
                    {logLines.map((line, idx) => (
                      <div key={idx} className="leading-relaxed animate-pulse">
                        {line}
                      </div>
                    ))}
                    <div className="terminal-cursor pt-2">LOADING RUNTIME CONTAINER</div>
                  </div>
                )
              ) : (
                /* Static Project Details Screen */
                <div className="flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    {/* Project Image Frame */}
                    <div className={`relative rounded-xl overflow-hidden h-44 w-full border ${
                      isPro ? 'border-[var(--color-outline)] bg-black/5 dark:bg-white/5' : 'border-slate-800 bg-slate-950/80'
                    }`}>
                      <img 
                        src={activeProject.image?.src || activeProject.image} 
                        alt={activeProject.title} 
                        width={640}
                        height={400}
                        className={`h-full w-full object-cover transition-all duration-300 ${
                          isPro ? '' : 'opacity-85 mix-blend-luminosity hover:mix-blend-normal'
                        }`}
                      />
                      {!isPro && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 text-[10px] font-mono-code text-white bg-black/60 px-2 py-0.5 rounded border border-white/10 uppercase">
                            img_loaded.dat
                          </div>
                        </>
                      )}
                    </div>

                    {/* Glowing System Title */}
                    <div>
                      <h3 className={`text-2xl font-bold tracking-wide ${
                        isPro ? 'font-sans text-[var(--color-text)]' : 'font-mono-code text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]'
                      }`}>
                        {isPro ? activeProject.title : activeProject.title.toUpperCase()}
                      </h3>
                      {isPro ? (
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-500 font-semibold mt-1">
                          Active & Live Show
                        </p>
                      ) : (
                        <p className="font-mono-code text-[11px] text-[var(--color-primary)] mt-1">
                          [ SYSTEM STATUS: ONLINE & DEPLOYED ]
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <p className={`text-xs leading-relaxed text-[var(--color-text-muted)] ${isPro ? 'font-sans' : 'font-mono-code'}`}>
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Tech stack & CTAs */}
                  <div className={`space-y-4 pt-4 border-t ${
                    isPro ? 'border-[var(--color-outline)] font-sans' : 'border-slate-800 font-mono-code'
                  }`}>
                    {/* Tech Stack List */}
                    <div>
                      <span className="text-[10px] text-[var(--color-text-muted)] block mb-2">
                        {isPro ? 'Technologies Used:' : 'SYSTEM_ENGINE_CORE:'}
                      </span>
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
                        className="inline-flex items-center gap-1.5 bg-[var(--color-primary)] px-4 py-2 rounded-lg text-xs font-bold text-white hover:opacity-90 transition shadow-sm"
                        style={{ color: isPro ? '#FFFFFF' : '#0B0F17' }}
                      >
                        <span>{isPro ? 'Live Demo' : 'RUN_SYSTEM()'}</span>
                        <FaExternalLinkAlt className="text-[9px]" />
                      </a>
                      <a 
                        href={activeProject.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-black/5 dark:bg-white/5 border border-[var(--color-outline)] px-4 py-2 rounded-lg text-xs text-[var(--color-text)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition"
                      >
                        <FaGithub />
                        <span>{isPro ? 'Source Code' : 'VIEW_SOURCE()'}</span>
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
