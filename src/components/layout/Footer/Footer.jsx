import React from 'react';

function Footer() {
  return (
    <footer className="border-t border-[var(--color-outline)] bg-[var(--color-background)] px-[10%] py-10 text-center text-sm text-[color:var(--color-text)]/70">
      <div className="mb-5 flex items-center justify-center gap-6 text-base text-[var(--color-text)]">
        <a
          className="font-medium transition hover:text-[var(--color-primary)]"
          href="https://github.com/Taufiqu"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="font-medium transition hover:text-[var(--color-primary)]"
          href="https://www.linkedin.com/in/muhammad-hafizh-taufiqurrohman-421121290/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
      <div className="space-y-1 text-[var(--color-text)]/70">
        <p>Built with React &amp; Vite.</p>
        <p>© {new Date().getFullYear()} Taufiqu. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;