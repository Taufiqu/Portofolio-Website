"use client";

import React, { useState, useRef } from 'react';
import { 
  FaFolder, 
  FaFolderOpen, 
  FaChevronDown, 
  FaChevronRight, 
  FaTimes,
  FaFileCode,
  FaTerminal
} from 'react-icons/fa';
import { GoGitBranch } from 'react-icons/go';
import { useTheme } from '../../context/ThemeContext';

const FILES_DATA = {
  "software_engineer.json": {
    "milestone": "Software Engineer",
    "period": "2025 - Present",
    "type": "work",
    "description": "Fokus mengembangkan skill fullstack, berkontribusi di open source, dan membangun produk digital yang scalable.",
    "skills_unlocked": ["React", "Next.js", "System Design"],
    "active": true
  },
  "web_development.json": {
    "milestone": "Deep Dive Web Development",
    "period": "2024 - 2025",
    "type": "work",
    "description": "Belajar fundamental web dev secara mendalam (Laravel, React, PostgreSQL, Docker).",
    "skills_unlocked": ["PHP", "JavaScript", "SQL", "Docker"],
    "completed": true
  },
  "first_steps.json": {
    "milestone": "First Steps in Programming",
    "period": "2022 - 2023",
    "type": "achievement",
    "description": "Mengenal dunia algoritma dan struktur data. Mempelajari logika dasar pemrograman.",
    "skills_unlocked": ["C++", "Logic", "Algorithms"],
    "grade": "A+"
  }
};

function JourneySection() {
  const { theme } = useTheme();
  const isPro = theme === 'pro';
  const [activeFile, setActiveFile] = useState("software_engineer.json");
  const [isFolderOpen, setIsFolderOpen] = useState(true);
  const editorRef = useRef(null);

  // High-fidelity JSON parser highlighting regex
  const highlightJsonLine = (line) => {
    let html = line;
    // Escape HTML
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // Strings in orange
    html = html.replace(/"([^"]*)"/g, '<span style="color: #ce9178">"$1"</span>');
    // Keys in cyan/blue (overwrite keys that were colored orange)
    html = html.replace(/<span style="color: #ce9178">"([^"]+)"<\/span>(\s*:)/g, '<span style="color: #9cdcfe">"$1"</span>$2');
    // Booleans/numbers in yellow/green
    html = html.replace(/\b(true|false|\d+)\b/g, '<span style="color: #b5cea8">$1</span>');
    return html;
  };

  const renderJsonEditor = (fileName) => {
    const data = FILES_DATA[fileName];
    const jsonString = JSON.stringify(data, null, 2);
    const lines = jsonString.split('\n');

    return (
      <div className="py-4 overflow-x-auto text-[11px] font-mono-code leading-relaxed bg-[#0B0F17]/90 min-h-[220px]">
        {lines.map((line, idx) => {
          const highlightedHtml = highlightJsonLine(line);
          return (
            <div key={idx} className="flex hover:bg-white/5 px-4 transition-colors duration-100 group">
              <span className="w-8 text-right select-none text-white/35 pr-3 font-mono-code border-r border-white/5 group-hover:text-white/50">
                {idx + 1}
              </span>
              <span 
                className="pl-4 font-mono-code"
                dangerouslySetInnerHTML={{ __html: highlightedHtml }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section 
      id="journey" 
      className="bg-[var(--color-background)] py-24 px-4 sm:px-6 lg:px-8 border-t border-[var(--color-outline)] transition-colors duration-500"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 text-center md:text-left">
          {isPro ? (
            <p className="text-xs text-[var(--color-primary)] uppercase tracking-[0.2em] mb-2 font-semibold">
              Professional Journey & Experience
            </p>
          ) : (
            <p className="font-mono-code text-xs text-[var(--color-accent-green)] uppercase tracking-[0.2em] mb-2">
              [ 03. System History Logs ]
            </p>
          )}
          <h2 className={`text-3xl font-extrabold uppercase tracking-wider sm:text-4xl ${isPro ? 'font-sans' : ''}`} style={{ color: 'var(--color-text)' }}>
            {isPro ? 'Career Journey' : 'Development Path'}
          </h2>
          <div className="h-1 w-16 bg-[var(--color-accent-green)] mt-4 mx-auto md:mx-0" />
        </div>

        {isPro ? (
          /* Sleek Vertical Timeline */
          <div className="relative border-l-2 border-[var(--color-outline)] ml-4 md:ml-6 pl-8 space-y-12 py-4">
            {Object.keys(FILES_DATA).map((key) => {
              const item = FILES_DATA[key];
              return (
                <div key={key} className="relative group">
                  {/* Dot */}
                  <div className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full bg-[var(--color-primary)] border-4 border-[var(--color-background)] transition duration-300 group-hover:scale-125 shadow-sm" />
                  
                  {/* Content */}
                  <div className="font-sans">
                    <span className="text-[11px] bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2.5 py-1 rounded-md font-semibold tracking-wide uppercase">
                      {item.period}
                    </span>
                    <h3 className="text-xl font-bold mt-2" style={{ color: 'var(--color-text)' }}>
                      {item.milestone}
                    </h3>
                    <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                      {item.description}
                    </p>
                    
                    {/* Skills unlocked */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {item.skills_unlocked.map(s => (
                        <span key={s} className="bg-black/5 dark:bg-white/5 border border-[var(--color-outline)] text-[11px] px-2.5 py-0.5 rounded-md font-medium text-[var(--color-text-muted)]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* IDE Simulator Container */
          <div className="w-full rounded-xl overflow-hidden border border-[var(--color-outline)] bg-[#0d1117] shadow-2xl flex flex-col font-mono-code">
            
            {/* 1. IDE Top Title Bar */}
            <div className="bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-[var(--color-outline)] select-none text-[11px] text-[var(--color-text-muted)]">
              {/* Red / Yellow / Green Window dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              
              {/* Title path */}
              <span className="truncate max-w-[280px] md:max-w-none text-white/55">
                taufiqu-journey - VS Code // src/data/{activeFile}
              </span>
              
              <div className="w-12" /> {/* Spacer */}
            </div>

            {/* 2. IDE Columns Layout */}
            <div className="grid grid-cols-12 items-stretch min-h-[300px]">
              
              {/* LEFT PANEL: FILE EXPLORER (Hidden on mobile to save space) */}
              <div className="hidden md:block md:col-span-4 bg-[#0d1117] border-r border-[var(--color-outline)] p-4 select-none text-xs text-white/70">
                <p className="text-[10px] uppercase font-bold tracking-wider text-white/30 mb-4">
                  Explorer: src
                </p>

                {/* Folder Node */}
                <div className="space-y-1">
                  <div 
                    onClick={() => setIsFolderOpen(!isFolderOpen)}
                    className="flex items-center gap-2 hover:text-white cursor-pointer py-1 transition-colors"
                  >
                    {isFolderOpen ? <FaChevronDown className="text-[9px]" /> : <FaChevronRight className="text-[9px]" />}
                    {isFolderOpen ? <FaFolderOpen className="text-amber-500 text-xs" /> : <FaFolder className="text-amber-500 text-xs" />}
                    <span className="font-semibold text-white/90">journey</span>
                  </div>

                  {/* File Nodes inside folder */}
                  {isFolderOpen && (
                    <div className="pl-6 space-y-1 border-l border-[var(--color-outline)] ml-2.5">
                      {Object.keys(FILES_DATA).map((fileName) => {
                        const isActive = activeFile === fileName;
                        return (
                          <div 
                            key={fileName}
                            onClick={() => setActiveFile(fileName)}
                            className={`flex items-center gap-2 hover:bg-white/5 hover:text-white cursor-pointer px-2 py-1 rounded transition-all duration-100 ${isActive ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold border-l-2 border-[var(--color-primary)]' : ''}`}
                          >
                            <FaFileCode className={`text-xs ${isActive ? 'text-[var(--color-primary)]' : 'text-slate-400'}`} />
                            <span>{fileName}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT PANEL: EDITOR VIEW */}
              <div className="col-span-12 md:col-span-8 bg-[#090d16]/95 flex flex-col justify-between">
                
                {/* File Tabs Row */}
                <div className="flex bg-[#0d1117] border-b border-[var(--color-outline)] text-[10px] overflow-x-auto select-none">
                  {Object.keys(FILES_DATA).map((fileName) => {
                    const isActive = activeFile === fileName;
                    return (
                      <div
                        key={fileName}
                        onClick={() => setActiveFile(fileName)}
                        className={`flex items-center gap-2 px-4 py-2 border-r border-[var(--color-outline)] cursor-pointer transition-all duration-100 ${isActive ? 'bg-[#090d16] text-[var(--color-primary)] border-t-2 border-t-[var(--color-primary)] font-bold' : 'text-white/40 hover:bg-white/5 hover:text-white/70'}`}
                      >
                        <FaFileCode className={`text-[10px] ${isActive ? 'text-[var(--color-primary)]' : 'text-slate-500'}`} />
                        <span>{fileName}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Code Editor body */}
                <div ref={editorRef} className="flex-grow">
                  {renderJsonEditor(activeFile)}
                </div>

              </div>
            </div>

            {/* 3. IDE Bottom Status Bar */}
            <div className="bg-[#161b22] px-4 py-1.5 flex items-center justify-between border-t border-[var(--color-outline)] text-[10px] text-white/50 select-none">
              {/* Left side: Branch indicator */}
              <div className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
                <GoGitBranch className="text-xs" />
                <span>master*</span>
              </div>
              
              {/* Right side: Editor stats */}
              <div className="flex items-center gap-4">
                <span>Ln 1, Col 1</span>
                <span>UTF-8</span>
                <span className="text-[var(--color-primary)] font-bold">JSON</span>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}

export default JourneySection;
