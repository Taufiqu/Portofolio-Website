"use client";

import React from 'react';

const PRINCIPLES = [
  {
    num: '01',
    title: 'Readable over Clever',
    description: 'Code is read far more often than it is written. I prefer obvious, self-documenting structures that any engineer can confidently edit on day one.'
  },
  {
    num: '02',
    title: 'Measure before Optimize',
    description: 'We do not guess performance boundaries. Telemetry, performance logs, and testing guide our optimization paths, avoiding premature complexity.'
  },
  {
    num: '03',
    title: 'Predictable Boundaries',
    description: 'Building isolated components with strict, well-defined APIs ensures that side effects are eliminated at the boundary and modules can be evolved independently.'
  }
];

export default function PhilosophySection() {
  return (
    <section 
      id="philosophy" 
      className="w-full bg-[#0F0F11] py-24 border-b border-[#27272A] section-padding"
    >
      <div className="max-w-[1100px] mx-auto asymmetric-grid">
        {/* Left Column */}
        <div className="flex flex-row md:flex-col items-baseline md:items-start gap-2 select-none">
          <span className="font-mono text-xs tracking-widest text-[#2563EB]">03.</span>
          <span className="font-geist text-xs font-semibold uppercase tracking-[0.2em] text-[#FAFAFA]">Philosophy</span>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-12 items-start">
          <div className="max-w-[640px]">
            <p className="text-editorial">
              A set of convictions that guide my architectural decisions and day-to-day development practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-[#27272A] pt-8">
            {PRINCIPLES.map((principle) => (
              <div key={principle.num} className="flex flex-col gap-4">
                <span className="font-mono text-[10px] tracking-widest text-[#2563EB]">
                  {principle.num}.
                </span>
                <h3 className="font-geist text-base font-bold text-[#FAFAFA]">
                  {principle.title}
                </h3>
                <p className="font-inter text-[13px] leading-relaxed text-[#A1A1AA]">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
