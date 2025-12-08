import React, { useState, useRef, useEffect } from 'react'; // 1. Tambah useState & useRef
import { useInView } from 'react-intersection-observer'; // ✅ Pakai kurung kurawal
import { SKILLS_DATA } from '../../../data/skills';
import { SiReact, SiLaravel, SiFigma } from 'react-icons/si';
import { TbBrandTailwind } from 'react-icons/tb';
import { FaGithub, FaLinkedin, FaInstagram, FaSpotify, FaPlay, FaPause} from 'react-icons/fa';
import { MdLocationOn, MdSchedule } from 'react-icons/md';
import profilePhoto from '../../../assets/pp.webp';
import facePhoto from '../../../assets/fp.webp';
import projectPreview from '../../../assets/projects/4.webp';
import realityClub from '../../../assets/reality-club.webp'
import songFile from '../../../assets/audio/reality-club.mp3';

const cardBase =
  'relative flex h-full flex-col gap-4 rounded-[28px] border border-white/10 bg-[var(--color-card-bg)]/90 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Taufiqu', icon: <FaGithub /> },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhammad-hafizh-taufiqurrohman-421121290/',
    icon: <FaLinkedin />
  },
  { label: 'Instagram', href: 'https://www.instagram.com/hafizh_tr', icon: <FaInstagram /> }
];

const SONG_CONFIG = {
  start: 52,      // Detik ke-65 (1:05)
  duration: 10,   // Main selama 10 detik
  volume: 0.5     // Volume 50%
};

const MY_EMAIL = "taufiqu.dev@gmail.com";

const GITHUB_USERNAME = "Taufiqu";

function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const rafRef = useRef(null);
  const timeoutRef = useRef(null);

  const handlePlaySnippet = () => {
    const audio = audioRef.current;
    
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const playAudio = () => {
    const audio = audioRef.current;
    
    // Set posisi awal
    audio.currentTime = SONG_CONFIG.start;
    audio.volume = SONG_CONFIG.volume;
    audio.play();
    setIsPlaying(true);

    // Mulai animasi progress bar
    rafRef.current = requestAnimationFrame(updateProgress);
  };

  const pauseAudio = () => {
    const audio = audioRef.current;
    audio.pause();
    setIsPlaying(false);
    
    // Stop animasi
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    // Reset progress ke 0 (opsional, biar rapi)
    setProgress(0);
  };

  const updateProgress = () => {
    const audio = audioRef.current;
    
    // Hitung berapa detik yang sudah berjalan sejak start point
    const currentPlayTime = audio.currentTime - SONG_CONFIG.start;
    
    // Hitung persentase (0 sampai 100)
    const progressPercent = (currentPlayTime / SONG_CONFIG.duration) * 100;

    if (progressPercent >= 100) {
      // Kalau sudah 100% atau lebih, stop.
      pauseAudio();
    } else {
      // Update state progress
      setProgress(progressPercent);
      // Lanjut ke frame berikutnya
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  };

  // Cleanup: Stop lagu kalau user pindah halaman/component di-unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const [showCopyToast, setShowCopyToast] = useState(false);
  const handleCopyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(MY_EMAIL);
      setShowCopyToast(true);
      
      // Hilangkan notif setelah 2 detik
      setTimeout(() => {
        setShowCopyToast(false);
      }, 2000);
    }
  };

  return (
    <section
      id="skills"
      className={`px-6 py-20 text-[var(--color-text)] transition-all duration-700 sm:px-10 lg:px-12 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        '--muted-color': 'color-mix(in srgb, var(--color-text) 80%, transparent)'
      }}
      ref={ref}
    >
      <h2 className="section-title">My Dev Space</h2>

      <div className="mx-auto grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-12">
        {/* Intro */}
        <div className={`${cardBase} justify-between sm:col-span-2 lg:col-span-7`}>
          <div className="flex flex-col gap-4">
            <p className="text-xl uppercase tracking-[0.2em]" style={{ color: 'var(--muted-color)' }}>
              Hi, I&apos;m
            </p>
            <h3 className="font-['Oswald',sans-serif] text-3xl sm:text-4xl">
              Your next full‑stack collaborator.
            </h3>
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted-color)' }}>
              Fullstack developer who loves mixing clean UI, reliable backend, and a bit of everyday
              life into the work.
            </p>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-4 py-2 text-xs font-semibold text-[var(--color-primary)]">
              Open to work · Remote friendly
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {[{ icon: <SiReact />, tone: 'text-sky-300' }, { icon: <SiLaravel />, tone: 'text-rose-400' }, { icon: <TbBrandTailwind />, tone: 'text-sky-400' }, { icon: <SiFigma />, tone: 'text-amber-300' }].map(({ icon, tone }, index) => (
              <span
                key={tone}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl ${tone}`}
              >
                {icon}
              </span>
            ))}
          </div>
        </div>

        <div className={`${cardBase} overflow-hidden p-0 sm:col-span-1 lg:col-span-3`}>
          <img
            src={facePhoto}
            alt="Portrait"
            className="w-full max-w-full object-cover aspect-square rounded-[28px]"
          />
          <div className="flex flex-col gap-3 pl-6 pr-6">
            <p className="text-sm" style={{ color: 'var(--muted-color)' }}>
              When I&apos;m not coding, I&apos;m probably traveling.
            </p>
            <a
              href="#journey"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
            >
              View my journey
            </a>
          </div>
        </div>

        <div className={`${cardBase} gap-5 sm:col-span-1 lg:col-span-2`}>
          <p className="text-xl uppercase tracking-[0.2em]" style={{ color: 'var(--muted-color)' }}>
            Around the internet
          </p>
          <div className="flex flex-col gap-3">
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-full border border-white/10 px-3 py-2 text-sm text-[var(--color-text)] transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Row 2 - Current focus + Featured project */}
        <div className={`${cardBase} sm:col-span-1 lg:col-span-4`}>
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--muted-color)' }}>
            Currently exploring
          </p>
          <h3 className="font-['Oswald',sans-serif] text-2xl">Next.js & TypeScript</h3>
          <p className="text-base leading-relaxed" style={{ color: 'var(--muted-color)' }}>
            Diving deeper into type-safe React apps and server-side rendering. Building more
            performant, scalable frontends.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['Learning', 'Experimenting'].map(label => (
              <span
                key={label}
                className="rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-primary)]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`${cardBase} grid gap-6 sm:col-span-2 lg:col-span-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]`}
        >
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--muted-color)' }}>
              Featured Project
            </span>
            <div className="relative flex items-end overflow-hidden rounded-2xl aspect-[4/3] w-full">
              <img
                src={projectPreview}
                alt="Portfolio dashboard preview"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="relative z-10 w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent px-4 py-3 text-sm font-medium text-white">
                Dashboard preview
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--muted-color)' }}>
              Recent work
            </p>
            <h3 className="font-['Oswald',sans-serif] text-3xl">Personal portfolio platform</h3>
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted-color)' }}>
              A fast, content-driven portfolio built with React and Laravel API, tuned for smooth
              animation and SEO.
            </p>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[rgba(15,23,42,0.9)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
            >
              View all projects <span className="text-lg">↗</span>
            </a>
          </div>
        </div>

        {/* Row 3 - Spotify, tools grid, location/time */}
        {/* === CARD GABUNGAN: SPOTIFY + GITHUB STATS === */}
        <div className={`${cardBase} sm:col-span-1 lg:col-span-4 flex flex-col gap-6`}> 
          {/* Perubahan 1: Ganti 'justify-between' jadi 'gap-6' biar jaraknya konsisten dan ga maksa jauh */}

          {/* --- BAGIAN 1: MUSIC PLAYER --- */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--muted-color)' }}>
              <FaSpotify className="text-[#22c55e]" />
              <span>On repeat while I code</span>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="relative group cursor-pointer h-14 w-14 shrink-0" onClick={handlePlaySnippet}>
                <img
                  src={realityClub}
                  alt="Reality Club"
                  className={`h-full w-full rounded-xl object-cover transition-all duration-300 ${isPlaying ? 'scale-95 opacity-60' : 'group-hover:opacity-60'}`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {isPlaying ? <FaPause className="text-white text-xs" /> : <FaPlay className="text-white text-xs ml-0.5" />}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium truncate">Reality Club</p>
                <p className="text-sm truncate" style={{ color: 'var(--muted-color)' }}>Am I Bothering You?</p>
                <div className="mt-2 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-[#22c55e]"
                    style={{ width: `${progress}%`, transition: 'width 0.1s linear' }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- PEMBATAS HALUS --- */}
          <div className="h-px w-full bg-white/10" /> 
          {/* Perubahan 2: Pake h-px biasa, marginnya diatur sama parent gap */}

          {/* --- BAGIAN 2: GITHUB STATS --- */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--muted-color)' }}>
              <FaGithub className="text-[var(--color-primary)] text-lg" />
              <span>Coding Activity</span>
            </div>

            <div className="flex items-center justify-center overflow-hidden rounded-lg bg-black/20 p-2">
              <img 
                src="https://github-readme-streak-stats.herokuapp.com/?user=Taufiqu&theme=transparent&hide_border=true&stroke=00FF7F&ring=00FF7F&fire=00FF7F&currStreakNum=E0E0E0&sideNums=E0E0E0&currStreakLabel=00FF7F&sideLabels=00FF7F&background=transparent"
                alt="Github Streak"
                loading="lazy"
                className="w-full object-contain hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
            
            <div className="flex justify-between text-[10px] uppercase tracking-wider font-medium pt-1">
              <span style={{ color: 'var(--muted-color)' }}>2024 Summary</span>
              <a 
                href="https://github.com/Taufiqu" 
                target="_blank" 
                rel="noreferrer"
                className="text-[var(--color-primary)] hover:underline"
              >
                View Profile ↗
              </a>
            </div>
          </div>

          <audio ref={audioRef} src={songFile} preload="auto" />
        </div>

        <div className={`${cardBase} sm:col-span-2 lg:col-span-5`}>
          <p className="text-xl uppercase tracking-[0.2em]" style={{ color: 'var(--muted-color)' }}>
            Other tools I trust
          </p>
          <div className="flex flex-col gap-4">
            {SKILLS_DATA.map(category => {
              const excluded = ['React', 'Laravel', 'Tailwind CSS'];
              const filteredItems = category.items.filter(item => !excluded.includes(item)).slice(0, 4);

              if (filteredItems.length === 0) return null;

              return (
                <div key={category.category} className="flex flex-col gap-2">
                  <p className="text-sm font-semibold" style={{ color: 'var(--muted-color)' }}>
                    {category.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {filteredItems.map(item => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 px-3 py-1 text-sm"
                        style={{ color: 'var(--muted-color)' }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${cardBase} gap-6 sm:col-span-1 lg:col-span-3`}>
          <div className="flex items-start gap-3">
            <MdLocationOn className="text-2xl text-[var(--color-primary)]" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--muted-color)' }}>
                Based in
              </p>
              <p className="text-lg font-semibold">Lampung, Indonesia</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MdSchedule className="text-2xl text-[var(--color-primary)]" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--muted-color)' }}>
                Preferred working hours
              </p>
              <p className="text-lg font-semibold">Evenings · UTC+7</p>
            </div>
          </div>
        </div>

        {/* Row 4 - CTA */}
        <div
          className={`${cardBase} gap-4 sm:col-span-2 lg:col-span-12 lg:flex-row lg:items-center lg:justify-between`}
        >
          <div className="flex flex-col gap-3">
            <p className="text-xl uppercase tracking-[0.2em]" style={{ color: 'var(--muted-color)' }}>
              Let&apos;s build something
            </p>
            <h3 className="font-['Oswald',sans-serif] text-3xl">
              Got an idea you want to ship?
            </h3>
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted-color)' }}>
              Tell me about your product, and I&apos;ll help you turn it into a clear, shippable
              roadmap — from first commit to deploy.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-full bg-[var(--color-primary)] px-6 py-2 text-sm font-semibold text-[var(--color-background)] transition hover:opacity-90"
            >
              Email me
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="group relative rounded-full border border-white/15 px-6 py-2 text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 active:scale-95"
            >
              {/* Teks Button berubah dikit pas dicopy biar interaktif */}
              <span className={showCopyToast ? "text-[var(--color-primary)]" : ""}>
                {showCopyToast ? "Copied! ✨" : "Copy email"}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`fixed bottom-10 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-[var(--color-primary)]/50 bg-black/80 px-6 py-3 text-sm font-medium text-[var(--color-text)] shadow-[0_0_30px_rgba(0,255,127,0.3)] backdrop-blur-md transition-all duration-500 ${
          showCopyToast 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-black text-xs">
          ✓
        </span>
        Email copied to clipboard!
      </div>

    </section>
  );
}

export default Skills;

