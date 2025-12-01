import React, { useRef } from 'react';
import ProjectCard from './ProjectCard';
import { PROJECTS_DATA } from '../../../data/projects';
import { useInView } from 'react-intersection-observer';

function Projects() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const carouselRef = useRef(null);
  const VISIBLE_COUNT = 3;
  const hasCarousel = PROJECTS_DATA.length > VISIBLE_COUNT;

  const handleScroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.offsetWidth * 0.8;
    carouselRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
  };

  const listClasses = hasCarousel
    ? 'flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 items-stretch [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
    : 'grid gap-6 sm:grid-cols-2 xl:grid-cols-3';

  return (
    <section
      id="projects"
      className={`px-6 py-20 text-[var(--color-text)] transition-all duration-700 sm:px-10 lg:px-12 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      ref={ref}
    >
      <h2 className="section-title">Featured Projects</h2>

      <div
        className={`relative mx-auto max-w-6xl rounded-[32px] bg-[var(--color-card-bg)]/80 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.35)] ${
          hasCarousel ? 'px-12 md:px-16' : ''
        }`}
      >
        {hasCarousel && (
          <button
            type="button"
            className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-2xl text-[var(--color-primary)] shadow-lg transition hover:bg-black/80 md:flex z-10"
            aria-label="Show previous project"
            onClick={() => handleScroll(-1)}
          >
            ‹
          </button>
        )}

        <div className={listClasses} ref={hasCarousel ? carouselRef : null}>
          {PROJECTS_DATA.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              className={
                hasCarousel
                  ? 'snap-center w-[calc((100%-2rem)/3)] min-w-[220px] sm:min-w-[240px] max-w-[280px] h-full flex-shrink-0'
                  : 'h-full'
              }
            />
          ))}
        </div>

        {hasCarousel && (
          <button
            type="button"
            className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-2xl text-[var(--color-primary)] shadow-lg transition hover:bg-black/80 md:flex z-10"
            aria-label="Show next project"
            onClick={() => handleScroll(1)}
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
}

export default Projects;