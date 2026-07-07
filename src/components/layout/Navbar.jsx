"use client";

import React, { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clear hash dari URL saat pertama load supaya refresh tidak auto-scroll
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Bersihkan hash dari URL supaya refresh tidak auto-scroll ke section
      history.replaceState(null, '', window.location.pathname);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
      scrolled 
        ? 'bg-[#0B0F17]/85 backdrop-blur-md py-4 border-white/5 shadow-lg' 
        : 'bg-transparent py-6 border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo/Branding */}
        <a 
          href="#home" 
          onClick={(e) => handleScrollTo(e, 'home')}
          className="font-mono-code text-sm font-bold tracking-widest text-white hover:text-[var(--color-primary)] transition"
        >
          TAUFIQU <span className="text-[var(--color-primary)]">//</span> ARCH
        </a>

        {/* Nav items */}
        <ul className="flex items-center gap-2 sm:gap-4 font-mono-code text-[10px] sm:text-[11px] text-[var(--color-text-muted)]">
          <li>
            <a 
              href="#projects" 
              onClick={(e) => handleScrollTo(e, 'projects')}
              className="px-2.5 py-1.5 rounded hover:text-white hover:bg-white/5 transition"
            >
              [ 01. WORK ]
            </a>
          </li>
          <li>
            <a 
              href="#sandbox" 
              onClick={(e) => handleScrollTo(e, 'sandbox')}
              className="px-2.5 py-1.5 rounded hover:text-white hover:bg-white/5 transition"
            >
              [ 02. SANDBOX ]
            </a>
          </li>
          <li>
            <a 
              href="#journey" 
              onClick={(e) => handleScrollTo(e, 'journey')}
              className="px-2.5 py-1.5 rounded hover:text-white hover:bg-white/5 transition"
            >
              [ 03. HISTORY ]
            </a>
          </li>
          <li>
            <a 
              href="#guestbook" 
              onClick={(e) => handleScrollTo(e, 'guestbook')}
              className="px-2.5 py-1.5 rounded hover:text-white hover:bg-white/5 transition"
            >
              [ 04. GUESTBOOK ]
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              onClick={(e) => handleScrollTo(e, 'contact')}
              className="px-2.5 py-1.5 rounded hover:text-white hover:bg-white/5 transition"
            >
              [ 05. CONNECT ]
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
