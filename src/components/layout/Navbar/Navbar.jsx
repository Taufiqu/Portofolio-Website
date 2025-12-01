// 1. Impor useState dan useEffect
import React, { useState, useEffect } from 'react';

function Navbar() {
  // 2. Buat state untuk melacak tema, default-nya 'dark'
  const [theme, setTheme] = useState('dark');

  // 3. Fungsi untuk mengganti tema
  const toggleTheme = () => {
    // Jika tema adalah 'dark', ganti ke 'light', begitu juga sebaliknya
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // 4. Gunakan useEffect untuk mengubah class di <body>
  useEffect(() => {
    // Hapus class lama
    document.body.classList.remove('dark-mode', 'light-mode');
    
    // Tambahkan class sesuai state
    document.body.classList.add(`${theme}-mode`);
  }, [theme]); // Efek ini akan berjalan setiap kali 'theme' berubah

  const navStyles =
    theme === 'dark'
      ? {
          backgroundColor: 'rgba(26, 26, 26, 0.85)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.35)'
        }
      : {
          backgroundColor: 'rgba(245, 245, 245, 0.85)',
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)'
        };

  return (
    <nav
      className="fixed left-1/2 top-3 z-[1000] flex -translate-x-1/2 items-center gap-5 rounded-full border border-[var(--color-outline)] px-6 py-2 backdrop-blur-lg max-md:top-4 max-md:w-[calc(100%-32px)] max-md:px-5 max-md:py-3"
      style={navStyles}
    >
      <ul className="flex list-none items-center gap-6 text-[0.95rem] font-medium tracking-wide text-[var(--color-text)] max-md:gap-4 max-md:text-[0.9rem]">
        <li>
          <a className="transition hover:text-[var(--color-primary)]" href="#about">
            About
          </a>
        </li>
        <li>
          <a className="transition hover:text-[var(--color-primary)]" href="#skills">
            Skills
          </a>
        </li>
        <li>
          <a className="transition hover:text-[var(--color-primary)]" href="#projects">
            Projects
          </a>
        </li>
        <li>
          <a className="transition hover:text-[var(--color-primary)]" href="#journey">
            Journey
          </a>
        </li>
        <li>
          <a className="transition hover:text-[var(--color-primary)]" href="#contact">
            Contact
          </a>
        </li>
      </ul>

      {/* 5. Tambahkan tombolnya */}
      <button
        type="button"
        onClick={toggleTheme}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-outline)] bg-[var(--color-card-bg)] text-[1.15rem] text-[var(--color-text)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] transition hover:border-[var(--color-primary)] hover:shadow-[0_0_0_4px_rgba(0,255,127,0.15)] max-md:h-10 max-md:w-10 max-md:text-[1rem]"
      >
        {/* Tampilkan emoji yang sesuai dengan tema */}
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </nav>
  );
}

export default Navbar;