"use client";

import React, { useEffect, useState } from 'react';
import { FaTerminal } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

function Hero() {
  const { theme } = useTheme();
  const isPro = theme === 'pro';
  const [typedText, setTypedText] = useState('');
  const fullText = "Full-stack Software Engineer based in Lampung, Indonesia.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[var(--color-background)] px-6 text-center text-[var(--color-text)] overflow-hidden transition-colors duration-500"
    >
      {/* Decorative Cyber Grid Background Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div 
          className="absolute inset-0 bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" 
          style={{
            backgroundImage: isPro
              ? 'linear-gradient(to right, rgba(37, 99, 235, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(37, 99, 235, 0.05) 1px, transparent 1px)'
              : 'linear-gradient(to right, rgba(0, 242, 254, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 242, 254, 0.1) 1px, transparent 1px)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Terminal log tag */}
        <div 
          className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs mb-4 ${
            isPro 
              ? 'border-blue-200 bg-blue-50 text-blue-600 font-semibold' 
              : 'border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 font-mono-code text-[var(--color-primary)]'
          }`}
        >
          <FaTerminal className="text-[10px]" />
          <span>{isPro ? 'Status: Active Connection' : 'status: active_connection'}</span>
        </div>

        {/* Branding Name */}
        <h1 
          className={`font-sans text-[clamp(3.5rem,10vw,7rem)] font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${
            isPro
              ? 'from-slate-950 via-slate-800 to-blue-600'
              : 'from-white via-slate-200 to-[var(--color-primary)] drop-shadow-[0_0_35px_rgba(0,242,254,0.15)]'
          }`}
        >
          TAUFIQU
        </h1>

        {/* Technical Sub-Tag */}
        {isPro ? (
          <p className="text-xs sm:text-sm tracking-[0.25em] text-[var(--color-primary)] uppercase font-semibold">
            Systems Architect & Full-Stack Engineer
          </p>
        ) : (
          <p className="font-mono-code text-xs sm:text-sm tracking-[0.25em] text-[var(--color-primary)] uppercase">
            [ Systems Architect & Full-Stack Engineer ]
          </p>
        )}

        {/* Main Pitch */}
        <p className="mt-2 text-base sm:text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          I engineer high-performance backend systems, optimize client-side architectures, and build seamless web platforms.
        </p>

        {/* Terminal typing simulation */}
        <div 
          className={`h-6 text-[11px] rounded-lg px-4 py-1 flex items-center justify-center max-w-full border ${
            isPro 
              ? 'font-sans text-slate-700 bg-slate-100 border-slate-200' 
              : 'font-mono-code text-[var(--color-accent-green)] bg-black/40 border-white/5'
          }`}
        >
          <span>{typedText}</span>
          <span className="terminal-cursor" />
        </div>

        {/* CTA Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {isPro ? (
            <>
              <a 
                href="#projects" 
                onClick={handleScrollToProjects}
                className="rounded-xl bg-[var(--color-primary)] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:opacity-90 hover:shadow-lg active:scale-95 transition w-full sm:w-auto text-center"
              >
                View Projects →
              </a>
              <a 
                href="/cv.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-xl border border-[var(--color-outline)] bg-black/5 dark:bg-white/5 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--color-text)] hover:bg-black/10 dark:hover:bg-white/10 transition active:scale-95 w-full sm:w-auto text-center"
              >
                Download CV
              </a>
            </>
          ) : (
            <>
              <a 
                href="#projects" 
                onClick={handleScrollToProjects}
                className="group relative rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 px-8 py-3.5 font-mono-code text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] transition hover:bg-[var(--color-primary)] hover:text-[#0B0F17] hover:shadow-[0_0_25px_rgba(0,242,254,0.3)] active:scale-95 w-full sm:w-auto text-center"
              >
                EXECUTE_SYS_EXPLORATION()
              </a>
              <a 
                href="/cv.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 font-mono-code text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-[#0B0F17] hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-95 w-full sm:w-auto text-center"
              >
                VIEW_CURRICULUM_VITAE()
              </a>
            </>
          )}
        </div>
      </div>

      {/* Scroll Down mouse animation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-50">
        <span 
          className={`text-[9px] tracking-widest text-[var(--color-text-muted)] ${
            isPro ? 'font-sans font-semibold' : 'font-mono-code uppercase'
          }`}
        >
          {isPro ? 'Scroll Down' : 'SCROLL_DOWN'}
        </span>
        <div className="w-[18px] h-[32px] rounded-full border border-[var(--color-text-muted)] flex justify-center p-1">
          <div className="w-[4px] h-[8px] bg-[var(--color-primary)] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
