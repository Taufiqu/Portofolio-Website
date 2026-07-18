"use client";

import React from 'react';

const PHOTOS = [
  { id: 1, src: '/photography/1.jpg', alt: 'Architectural concrete geometry and parallel lines', ratio: 'aspect-[3/2]' },
  { id: 2, src: '/photography/2.jpg', alt: 'Concrete stairs with diagonal shadows', ratio: 'aspect-[2/3]' },
  { id: 3, src: '/photography/3.jpg', alt: 'Grid alignment facade detail', ratio: 'aspect-[3/2]' }
];

export default function PerspectiveSection() {
  return (
    <section 
      id="observations" 
      className="w-full bg-[#0F0F11] py-24 border-b border-[#27272A] section-padding"
    >
      <div className="max-w-[1100px] mx-auto asymmetric-grid">
        {/* Left Column */}
        <div className="flex flex-row md:flex-col items-baseline md:items-start gap-2 select-none">
          <span className="font-mono text-xs tracking-widest text-[#2563EB]">04.</span>
          <span className="font-geist text-xs font-semibold uppercase tracking-[0.2em] text-[#FAFAFA]">Observations</span>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-8 items-start w-full">
          <div className="max-w-[640px]">
            <p className="text-editorial">
              A quiet log of light, composition, and alignment. How I observe detail in physical spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8 items-start">
            {PHOTOS.map((photo) => (
              <div key={photo.id} className="flex flex-col gap-2">
                <div className={`relative w-full overflow-hidden bg-[#18181B] border border-[#27272A] rounded-sm ${photo.ratio}`}>
                  <img 
                    src={photo.src} 
                    alt={photo.alt}
                    className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:scale-[1.01] interactive-transition duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  Frame // 0{photo.id}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
