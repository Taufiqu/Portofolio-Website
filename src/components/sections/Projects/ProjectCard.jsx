import React from 'react';

function ProjectCard({ project, className = '' }) {
  const { title, description, tech, demoLink, githubLink, image } = project;

  return (
    // 1. Added 'h-full' to make the card fill the flex container height
    <div
      className={`flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-card-bg)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.45)] ${className}`}
    >
      {/* Image Section */}
      <div className="h-52 w-full overflow-hidden">
        <img className="h-full w-full object-cover object-top" src={image} alt={`${title} screenshot`} />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="font-['Oswald',sans-serif] text-2xl text-[var(--color-primary)] line-clamp-1" title={title}>
          {title}
        </h3>
        
        <p className="text-sm leading-relaxed text-[var(--color-text)]/85 line-clamp-3">
          {description}
        </p>

        {/* 2. Added 'min-h-[3rem]' to reserve space for 2 lines of tags. 
             This keeps the layout stable even if one project has fewer tags. */}
        <div className="flex flex-wrap gap-2 min-h-[3rem] content-start">
          {tech.map(techName => (
            <span
              key={techName}
              className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[var(--color-primary)]"
            >
              {techName}
            </span>
          ))}
        </div>

        {/* 3. 'mt-auto' pushes this button group to the bottom of the card */}
        <div className="mt-auto flex gap-4 text-sm font-semibold pt-2">
          <a
            className="flex items-center gap-2 text-[var(--color-text)] transition hover:text-[var(--color-primary)]"
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </a>
          <a
            className="flex items-center gap-2 text-[var(--color-text)] transition hover:text-[var(--color-primary)]"
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;