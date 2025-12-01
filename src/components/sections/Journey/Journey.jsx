import React from 'react';
import { useInView } from 'react-intersection-observer';
import { JOURNEY_DATA } from '../../../data/journey';

function Journey() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section
      id="journey"
      className={`px-6 py-20 text-[var(--color-text)] transition-all duration-700 sm:px-10 lg:px-12 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      ref={ref}
    >
      <h2 className="section-title">Experience / Journey</h2>

      <div className="relative mx-auto max-w-5xl rounded-[32px] bg-[var(--color-card-bg)]/80 p-8 shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
        <span className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-[var(--color-primary)] md:block" />
        <div className="space-y-8">
          {JOURNEY_DATA.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                <div
                  className={`md:w-1/2 ${isLeft ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'}`}
                >
                  <div className="rounded-2xl border border-white/10 bg-[var(--color-card-bg)] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                    <div className="font-['Oswald',sans-serif] text-xl text-[var(--color-primary)]">
                      {item.year}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-text)]/85">
                      {item.description}
                    </p>
                  </div>
                </div>
                <span className="pointer-events-none absolute left-1/2 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[var(--color-background)] bg-[var(--color-primary)] md:block" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Journey;



