import React from 'react';
import { useInView } from 'react-intersection-observer';
import { JOURNEY_DATA } from '../../../data/journey';
import { FaBriefcase, FaGraduationCap, FaTrophy, FaCircle } from 'react-icons/fa';
import journeyBg from '../../../assets/journey_bg.webp'; // Ganti nama file sesuai punya lo

function Journey() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

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
      className="relative px-6 py-24 text-[var(--color-text)] overflow-hidden"
      ref={ref}
    >
      {/* === 1. REAL ABSTRACT BACKGROUND (PARALLAX STYLE) === */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Layer Gambar */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity" // Opacity rendah biar ga nabrak teks
          style={{ 
            backgroundImage: `url(${journeyBg})`,
            backgroundAttachment: 'fixed' // KUNCI PARALLAX: Gambar diem pas scroll
          }}
        />
        
        {/* Layer Gradient Overlay (Atas & Bawah) biar smooth transisinya */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-transparent to-[var(--color-background)]" />
      </div>

      {/* Header dengan Gradient Text */}
      <div className={`relative z-10 transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <h2 className="section-title bg-gradient-to-r from-[var(--color-primary)] to-teal-400 bg-clip-text text-transparent">
          Experience / Journey
        </h2>
      </div>

      <div className="relative mx-auto max-w-5xl mt-16">
        
        {/* Fading Line */}
        <div 
          className="absolute left-8 top-0 h-full w-[2px] bg-white/10 md:left-1/2 md:-translate-x-1/2" 
          style={{ 
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
          }}
        />

        <div className="space-y-16 pb-12">
          {JOURNEY_DATA.map((item, index) => {
            const isLeft = index % 2 === 0;
            const delayStyle = { transitionDelay: `${index * 200}ms` };

            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-center transition-all duration-700 ${
                  inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                } ${isLeft ? 'md:flex-row-reverse' : ''}`}
                style={delayStyle}
              >
                
                {/* KARTU */}
                <div className="ml-20 w-full md:ml-0 md:w-1/2 md:px-12">
                  <div className="group relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-[var(--color-card-bg)]/60 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-card-bg)]/80 hover:shadow-[0_10px_40px_rgba(0,255,127,0.15)]">
                    
                    {/* Connector */}
                    <div 
                      className={`absolute top-6 h-4 w-4 rotate-45 border-b border-l border-white/10 bg-[var(--color-card-bg)]/60 backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--color-primary)]/40 group-hover:bg-[var(--color-card-bg)]/80
                      ${isLeft 
                        ? 'hidden md:block md:-right-2.5 md:border-b-0 md:border-l-0 md:border-r md:border-t' 
                        : 'hidden md:block md:-left-2.5'
                      }
                      max-md:-left-2.5 max-md:block
                      `} 
                    />

                    {/* Header Card */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h3 className="text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                        {item.title}
                      </h3>
                      <span className="w-fit rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 px-3 py-1 text-xs font-bold text-[var(--color-primary)] font-['Oswald',sans-serif] tracking-wider">
                        {item.year}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-[var(--color-text)]/70 group-hover:text-[var(--color-text)]/90 transition-colors">
                      {item.description}
                    </p>

                    {item.skills && (
                      <div className="flex flex-wrap gap-2 mt-2 pt-3 border-t border-white/5">
                        {item.skills.map(skill => (
                          <span key={skill} className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-text)]/60 bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition-colors cursor-default">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* ICON TENGAH */}
                <div 
                  className="absolute left-8 top-6 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[var(--color-background)] bg-[var(--color-card-bg)] shadow-[0_0_0_2px_rgba(255,255,255,0.05)] transition-all duration-500 hover:scale-125 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:shadow-[0_0_15px_rgba(0,255,127,0.4)] md:left-1/2 z-20"
                >
                  <div className="text-[var(--color-text)]/80 transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                     {getIcon(item.type)}
                  </div>
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