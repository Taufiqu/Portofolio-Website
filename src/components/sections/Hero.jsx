"use client";

import React, { useEffect, useState } from 'react';
import { FaTerminal } from 'react-icons/fa';

function Hero() {
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
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#0B0F17] px-6 text-center text-white overflow-hidden"
    >
      {/* Decorative Cyber Grid Background Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00F2FE_1px,transparent_1px),linear-gradient(to_bottom,#00F2FE_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Terminal log tag */}
        <div className="flex items-center gap-2 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 px-3 py-1 font-mono-code text-xs text-[var(--color-primary)] mb-4">
          <FaTerminal className="text-[10px]" />
          <span>status: active_connection</span>
        </div>

        {/* Branding Name */}
        <h1 className="font-sans text-[clamp(3.5rem,10vw,7rem)] font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[var(--color-primary)] drop-shadow-[0_0_35px_rgba(0,242,254,0.15)]">
          TAUFIQU
        </h1>

        {/* Technical Sub-Tag */}
        <p className="font-mono-code text-xs sm:text-sm tracking-[0.25em] text-[var(--color-primary)] uppercase">
          [ Systems Architect & Full-Stack Engineer ]
        </p>

        {/* Main Pitch */}
        <p className="mt-2 text-base sm:text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          I engineer high-performance backend systems, optimize client-side architectures, and build seamless web platforms.
        </p>

        {/* Terminal typing simulation */}
        <div className="h-6 font-mono-code text-[11px] text-[var(--color-accent-green)] bg-black/40 border border-white/5 rounded-lg px-4 py-1 flex items-center justify-center max-w-full">
          <span>{typedText}</span>
          <span className="terminal-cursor" />
        </div>

        {/* CTA Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
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
        </div>
      </div>

      {/* Scroll Down mouse animation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-50">
        <span className="font-mono-code text-[9px] tracking-widest text-[var(--color-text-muted)] uppercase">SCROLL_DOWN</span>
        <div className="w-[18px] h-[32px] rounded-full border border-[var(--color-text-muted)] flex justify-center p-1">
          <div className="w-[4px] h-[8px] bg-[var(--color-primary)] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
