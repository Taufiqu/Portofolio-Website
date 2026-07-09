"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaBars, FaTimes } from 'react-icons/fa';

// Nav items: each has DEV label and PRO label
const NAV_ITEMS = [
  { id: 'projects',  dev: '[ 01. WORK ]',      pro: 'Work'      },
  { id: 'sandbox',   dev: '[ 02. SANDBOX ]',    pro: 'Sandbox'   },
  { id: 'journey',   dev: '[ 03. HISTORY ]',    pro: 'History'   },
  { id: 'guestbook', dev: '[ 04. GUESTBOOK ]',  pro: 'Guestbook' },
  { id: 'contact',   dev: '[ 05. CONNECT ]',    pro: 'Connect'   },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, switchTheme, isTransitioning } = useTheme();
  const isPro = theme === 'pro';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      history.replaceState(null, '', window.location.pathname);
    }
    setIsOpen(false); // Close mobile menu if open
  };

  const handleThemeSwitch = () => {
    if (isTransitioning) return;
    switchTheme(isPro ? 'dev' : 'pro');
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'backdrop-blur-md py-4 shadow-lg'
          : 'bg-transparent py-6 border-transparent'
      }`}
      style={scrolled ? {
        backgroundColor: isPro ? 'rgba(248,250,252,0.85)' : 'rgba(11,15,23,0.85)',
        borderBottomColor: isPro ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)',
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleScrollTo(e, 'home')}
          className={`text-sm font-bold tracking-widest hover:text-[var(--color-primary)] transition ${
            isPro ? 'font-sans' : 'font-mono-code'
          }`}
          style={{ color: 'var(--color-text)' }}
        >
          {isPro ? (
            <span>Taufiqu <span style={{ color: 'var(--color-primary)' }}>·</span> Portfolio</span>
          ) : (
            <>TAUFIQU <span style={{ color: 'var(--color-primary)' }}>//</span> ARCH</>
          )}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          {/* Nav items */}
          <ul className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-[11px]"
              style={{ color: 'var(--color-text-muted)', fontFamily: isPro ? 'inherit' : undefined }}
          >
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollTo(e, item.id)}
                  className={`px-2.5 py-1.5 rounded transition-all ${
                    isPro
                      ? 'hover:text-[var(--color-text)] hover:bg-black/5 font-medium text-[12px]'
                      : 'font-mono-code hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isPro ? item.pro : item.dev}
                </a>
              </li>
            ))}
          </ul>

          {/* Theme switcher button */}
          <button
            onClick={handleThemeSwitch}
            disabled={isTransitioning}
            title={isPro ? 'Switch to Dev Mode' : 'Switch to Professional Mode'}
            className="ml-2 flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[10px] font-bold tracking-wider transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            style={isPro ? {
              fontFamily: 'inherit',
              borderColor: 'rgba(0,0,0,0.12)',
              color: 'var(--color-text-muted)',
              backgroundColor: 'transparent',
            } : {
              fontFamily: 'Fira Code, monospace',
              borderColor: 'rgba(0,242,254,0.25)',
              color: 'var(--color-primary)',
              backgroundColor: 'rgba(0,242,254,0.05)',
            }}
          >
            {isPro ? (
              <>
                <span style={{ fontSize: 13 }}>⌨</span>
                <span>Dev</span>
              </>
            ) : (
              <>
                <span>{'>'}</span>
                <span>PRO_MODE</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center p-2 rounded-lg transition-colors border cursor-pointer"
          style={isPro ? {
            color: 'var(--color-text)',
            borderColor: 'rgba(0,0,0,0.12)',
            backgroundColor: 'transparent'
          } : {
            color: 'var(--color-primary)',
            borderColor: 'rgba(0,242,254,0.15)',
            backgroundColor: 'rgba(0,242,254,0.05)'
          }}
          title="Toggle Navigation Menu"
        >
          {isOpen ? <FaTimes className="text-xs" /> : <FaBars className="text-xs" />}
        </button>

        {/* Mobile Dropdown Drawer Menu */}
        {isOpen && (
          <div 
            className="absolute top-[calc(100%+16px)] left-4 right-4 z-40 rounded-2xl border shadow-2xl p-6 transition-all duration-300 animate-slideDown md:hidden flex flex-col gap-4 backdrop-blur-lg"
            style={isPro ? {
              backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(248, 250, 252, 0.95)',
              borderColor: 'rgba(0, 0, 0, 0.08)',
              fontFamily: 'inherit'
            } : {
              backgroundColor: 'rgba(11, 15, 23, 0.95)',
              borderColor: 'var(--color-outline)',
              fontFamily: 'Fira Code, monospace'
            }}
          >
            <ul className="flex flex-col gap-1 text-sm text-[var(--color-text-muted)]">
              {NAV_ITEMS.map(item => (
                <li key={item.id} className="border-b border-[var(--color-outline)] last:border-b-0 py-2">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleScrollTo(e, item.id)}
                    className="block py-1 hover:text-[var(--color-text)] transition-colors w-full"
                    style={{ fontSize: isPro ? '14px' : '12px' }}
                  >
                    {isPro ? item.pro : item.dev}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Theme Switcher Button */}
            <button
              onClick={handleThemeSwitch}
              disabled={isTransitioning}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all active:scale-95 disabled:opacity-50 cursor-pointer border"
              style={isPro ? {
                borderColor: 'rgba(0,0,0,0.12)',
                color: 'var(--color-text-muted)',
                backgroundColor: 'rgba(0,0,0,0.02)',
              } : {
                borderColor: 'rgba(0,242,254,0.25)',
                color: 'var(--color-primary)',
                backgroundColor: 'rgba(0,242,254,0.05)',
              }}
            >
              {isPro ? (
                <>
                  <span style={{ fontSize: 14 }}>⌨</span>
                  <span>Switch to Dev Mode</span>
                </>
              ) : (
                <>
                  <span>{'>'}</span>
                  <span>SWITCH_PRO_MODE()</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
