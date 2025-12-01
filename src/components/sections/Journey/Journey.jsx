import React from 'react';
import { useInView } from 'react-intersection-observer';
import { JOURNEY_DATA } from '../../../data/journey';
// Import ikon yang sesuai
import { FaBriefcase, FaGraduationCap, FaTrophy, FaCircle } from 'react-icons/fa';

function Journey() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Fungsi buat milih ikon berdasarkan tipe journey
  const getIcon = (type) => {
    switch (type) {
      case 'work': return <FaBriefcase className="text-sm" />;
      case 'education': return <FaGraduationCap className="text-lg" />;
      case 'achievement': return <FaTrophy className="text-sm" />;
      default: return <FaCircle className="text-[10px]" />;
    }
  };

  return (
    <section
      id="journey"
      className={`relative px-6 py-24 text-[var(--color-text)] transition-all duration-700 sm:px-10 lg:px-12 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      ref={ref}
    >
      {/* Background Glow Effect (Ide lo gw implement di sini) */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]/5 blur-[100px] pointer-events-none" />

      <h2 className="section-title relative z-10">Experience / Journey</h2>

      <div className="relative mx-auto max-w-5xl">
        
        {/* Garis Tengah (Vertical Line) */}
        <div className="absolute left-8 top-0 h-full w-[2px] bg-white/10 md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-12">
          {JOURNEY_DATA.map((item, index) => {
            const isLeft = index % 2 === 0; // Cek ganjil genap buat layout zigzag

            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-center ${
                  isLeft ? 'md:flex-row-reverse' : ''
                }`}
              >
                
                {/* 1. KONTEN KARTU */}
                <div className="ml-20 w-full md:ml-0 md:w-1/2 md:px-10">
                  <div className="group relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-[var(--color-card-bg)]/80 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/50 hover:shadow-[0_10px_30px_rgba(0,255,127,0.1)]">
                    
                    {/* Panah/Connector Kecil (Segitiga) */}
                    <div 
                      className={`absolute top-6 h-4 w-4 rotate-45 border-b border-l border-white/10 bg-[var(--color-card-bg)]/80 transition-colors duration-300 group-hover:border-[var(--color-primary)]/50
                      ${isLeft 
                        ? 'hidden md:block md:-right-2 md:border-b-0 md:border-l-0 md:border-r md:border-t' 
                        : 'hidden md:block md:-left-2'
                      }
                      /* Mobile Arrow (selalu di kiri) */
                      max-md:-left-2 max-md:block
                      `} 
                    />

                    {/* Header: Tahun & Judul */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h3 className="text-xl font-bold text-[var(--color-text)]">
                        {item.title}
                      </h3>
                      <span className="w-fit rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-bold text-[var(--color-primary)] font-['Oswald',sans-serif]">
                        {item.year}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-[var(--color-text)]/70">
                      {item.description}
                    </p>

                    {/* Tags Skills (Opsional, kalau ada di data) */}
                    {item.skills && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.skills.map(skill => (
                          <span key={skill} className="text-[10px] uppercase tracking-wider text-[var(--color-text)]/50 border border-white/5 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. TITIK TENGAH (ICON) */}
                <div className="absolute left-8 top-6 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[var(--color-background)] bg-[var(--color-card-bg)] shadow-[0_0_0_2px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-110 hover:border-[var(--color-primary)] md:left-1/2 text-[var(--color-primary)]">
                  {getIcon(item.type)}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Journey;