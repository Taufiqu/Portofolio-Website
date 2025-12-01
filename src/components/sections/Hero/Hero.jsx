import React from 'react';

function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen w-full flex-col items-center justify-center px-6 text-center text-[var(--color-text)]"
    >
      <div className="mx-auto max-w-4xl">
        <h1 className="font-['Oswald',sans-serif] text-[clamp(3.5rem,10vw,6rem)] font-bold uppercase tracking-wide">
          Taufiqu
        </h1>
        <p className="mt-4 text-lg text-[var(--color-primary)]">
          Software Engineer based in Indonesia
        </p>
      </div>
    </section>
  );
}

export default Hero;