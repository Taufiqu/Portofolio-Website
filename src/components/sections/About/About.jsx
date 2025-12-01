import React from 'react';
import { useInView } from 'react-intersection-observer';
import profileImg from '../../../assets/pp.webp';

function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section
      id="about"
      className={`px-6 py-20 text-[var(--color-text)] transition-all duration-700 sm:px-10 lg:px-12 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      ref={ref}
    >
      <h2 className="section-title">About Me</h2>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 rounded-[32px] bg-[var(--color-card-bg)]/80 p-8 shadow-[0_15px_40px_rgba(0,0,0,0.35)] lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-6 text-lg leading-relaxed text-[var(--color-text)]/90">
          <p>
            Hello! I&apos;m Taufiqu, a passionate computer science student with a strong interest in
            web development. I love building things for the web, from simple landing pages to complex
            applications.
          </p>
          <p>
            My journey into tech started... (lanjutkan ceritamu di sini). When I&apos;m not coding,
            you can find me... (tambahkan hobi/minat).
          </p>
        </div>
        <div className="flex justify-center">
          <div className="h-64 w-64 overflow-hidden rounded-full border-4 border-[var(--color-primary)] sm:h-72 sm:w-72">
            <img
              className="h-full w-full object-cover"
              src={profileImg}
              alt="Taufiqu"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;