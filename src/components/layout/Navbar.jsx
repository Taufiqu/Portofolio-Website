"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

const NAV_ITEMS = [
  { label: 'Overview', href: '/#overview' },
  { label: 'Work', href: '/#work' },
  { label: 'Notebook', href: '/#notebook' },
  { label: 'Observations', href: '/#observations' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-150 border-b border-transparent ${
        scrolled
          ? 'bg-[#0F0F11]/90 backdrop-blur-md py-4 border-[#27272A]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6 flex justify-between items-center relative">
        {/* Brand */}
        <Link
          href="/"
          className="text-xs font-semibold tracking-[0.2em] text-[#FAFAFA] uppercase hover:opacity-80 interactive-transition"
        >
          Taufiqu - Portofolio
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-xs font-medium text-[#A1A1AA] hover:text-[#FAFAFA] interactive-transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center p-2 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors border border-zinc-800 rounded cursor-pointer"
          title="Toggle Navigation Menu"
        >
          {isOpen ? <FaTimes className="text-xs" /> : <FaBars className="text-xs" />}
        </button>

        {/* Mobile Dropdown Drawer Menu */}
        {isOpen && (
          <div className="absolute top-[calc(100%+12px)] left-6 right-6 z-40 rounded-lg border border-[#27272A] bg-[#18181B]/95 backdrop-blur-lg p-6 shadow-2xl md:hidden flex flex-col gap-4">
            <ul className="flex flex-col gap-3 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="border-b border-[#27272A] last:border-b-0 pb-2 last:pb-0">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-xs font-medium text-[#A1A1AA] hover:text-[#FAFAFA] interactive-transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
