import React from 'react';
import { useInView } from 'react-intersection-observer';

function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section
      id="contact"
      ref={ref}
      className={`px-6 py-20 text-center text-[var(--color-text)] transition-all duration-700 sm:px-10 lg:px-12 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center rounded-[32px] bg-[var(--color-card-bg)]/80 p-10 shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
        <h2 className="section-title mb-6">Contact</h2>
        <p className="mb-10 text-lg leading-relaxed text-[var(--color-text)]/85">
          Saya saat ini sedang mencari peluang baru dan inbox saya selalu terbuka. Baik itu pertanyaan
          atau sekadar ingin menyapa, saya akan berusaha membalasnya!
        </p>
        <a
          href="mailto:emailanda@example.com"
          className="rounded-full bg-[var(--color-primary)] px-10 py-4 font-['Oswald',sans-serif] text-lg font-bold uppercase tracking-wide text-[var(--color-background)] transition hover:-translate-y-1 hover:bg-[var(--color-text)] hover:text-[var(--color-background)] hover:shadow-[0_10px_20px_rgba(0,255,127,0.3)]"
        >
          Let&apos;s Build Something!
        </a>

        <div className="mt-10 flex gap-6 text-base font-medium">
          <a
            className="text-[var(--color-text)] transition hover:text-[var(--color-primary)]"
            href="https://github.com/Taufiqu"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="text-[var(--color-text)] transition hover:text-[var(--color-primary)]"
            href="https://www.linkedin.com/in/muhammad-hafizh-taufiqurrohman-421121290/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
