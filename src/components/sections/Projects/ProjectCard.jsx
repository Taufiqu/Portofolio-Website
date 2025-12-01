import React from 'react';

function ProjectCard({ project, className = '' }) {
  const { title, description, tech, demoLink, githubLink, image } = project;

  return (
    <div
      className={`flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-card-bg)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="w-full overflow-hidden">
        <img className="w-full object-contain" src={image} alt={`${title} screenshot`} />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="font-['Oswald',sans-serif] text-2xl text-[var(--color-primary)]">{title}</h3>
        <p className="text-sm leading-relaxed text-[var(--color-text)]/85">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map(techName => (
            <span
              key={techName}
              className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[var(--color-primary)]"
            >
              {techName}
            </span>
          ))}
        </div>
        <div className="mt-auto flex gap-4 text-sm font-semibold">
          <a
            className="text-[var(--color-text)] transition hover:text-[var(--color-primary)]"
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </a>
          <a
            className="text-[var(--color-text)] transition hover:text-[var(--color-primary)]"
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