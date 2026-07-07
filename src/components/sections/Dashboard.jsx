"use client";

import React, { useState, useEffect, useRef } from 'react';
import { JOURNEY_DATA } from '../../data/journey';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaTerminal, 
  FaServer, 
  FaDatabase, 
  FaExternalLinkAlt, 
  FaCopy, 
  FaCheck,
  FaPlay,
  FaPause,
  FaSpotify,
  FaMicrochip,
  FaEye,
  FaUsers
} from 'react-icons/fa';
import { 
  SiReact, 
  SiLaravel, 
  SiTailwindcss, 
  SiMongodb, 
  SiNodedotjs, 
  SiTypescript 
} from 'react-icons/si';
import { MdLocationOn, MdSchedule, MdDevices } from 'react-icons/md';

const MY_EMAIL = "taufiqu.dev@gmail.com";

function Dashboard() {
  // CLI States
  const [cliInput, setCliInput] = useState('');
  const [cliLogs, setCliLogs] = useState([
    { type: 'system', text: 'Welcome to Architect-OS v1.0.0' },
    { type: 'system', text: 'Type "help" for a list of available commands.' }
  ]);

  // System Stats State
  const [systemStats, setSystemStats] = useState({
    cpu: 15,
    memory: 44,
    latency: 22,
    uptime: '00:00:00'
  });

  // Visitor and Network Telemetry States
  const [liveVisitors, setLiveVisitors] = useState(1);
  const [totalVisits, setTotalVisits] = useState(0);
  const [dataTransfer, setDataTransfer] = useState(4.2);
  const [clientNode, setClientNode] = useState({ os: 'Loading...', browser: 'Detecting...' });

  // Spotify Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [songInfo, setSongInfo] = useState({
    title: 'Loading...',
    artist: 'Booting Audio Node',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop',
    audioUrl: null
  });
  const audioRef = useRef(null);
  const rafRef = useRef(null);

  // Copy Email State
  const [showCopyToast, setShowCopyToast] = useState(false);

  const cliEndRef = useRef(null);
  const isInitialMount = useRef(true);
  const startTimeRef = useRef(Date.now());

  // System Stats Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        cpu: Math.floor(Math.random() * 20) + 8,
        memory: Math.floor(Math.random() * 4) + 41,
        latency: Math.floor(Math.random() * 12) + 18,
        uptime: formatUptime()
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Real-time Supabase Visitor Tracking & Heartbeat
  useEffect(() => {
    // Generate or retrieve session ID (persists across reloads on the same browser)
    let sessionId = '';
    try {
      sessionId = localStorage.getItem('taufiqu_session_id');
      if (!sessionId) {
        sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
        localStorage.setItem('taufiqu_session_id', sessionId);
      }
    } catch (e) {
      sessionId = 'sess_temp_' + Math.random().toString(36).substring(2, 15);
    }

    // Clean up old dummy storage keys if present
    try {
      localStorage.removeItem('taufiqu_visits');
      localStorage.removeItem('taufiqu_visits_backup');
    } catch (e) {}

    // Heartbeat logic
    const sendHeartbeat = async () => {
      try {
        await fetch('/api/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        });
      } catch (err) {
        console.warn('Heartbeat send failed:', err);
      }
    };

    // Telemetry fetcher logic
    const fetchTelemetry = async () => {
      try {
        const res = await fetch('/api/visitors');
        if (res.ok) {
          const data = await res.json();
          if (data.total !== undefined) {
            setTotalVisits(data.total);
            try {
              localStorage.setItem('taufiqu_real_visits_backup', data.total.toString());
            } catch (e) {}
          }
          if (data.live !== undefined) {
            setLiveVisitors(data.live);
          }
        }
      } catch (err) {
        console.warn('Telemetry fetch failed, using fallback:', err);
        try {
          const backup = parseInt(localStorage.getItem('taufiqu_real_visits_backup'), 10);
          if (!isNaN(backup)) setTotalVisits(backup);
        } catch (e) {}
      }
    };

    // Execute immediately
    sendHeartbeat().then(() => {
      fetchTelemetry();
    });

    // Intervals
    const heartbeatInterval = setInterval(sendHeartbeat, 25000); // Heartbeat every 25s
    const telemetryInterval = setInterval(fetchTelemetry, 30000); // Refresh counts every 30s

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(telemetryInterval);
    };
  }, []);

  // Network Traffic Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate network traffic fluctuating between 2.1 and 18.5 KB/s
      setDataTransfer(parseFloat((Math.random() * 16 + 2.5).toFixed(1)));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Client Device Info
  useEffect(() => {
    if (typeof window !== 'undefined' && window.navigator) {
      const ua = window.navigator.userAgent;
      let os = 'Unknown OS';
      let browser = 'Unknown Browser';

      // Simple OS detection
      if (ua.indexOf('Win') !== -1) os = 'Windows';
      else if (ua.indexOf('Mac') !== -1) os = 'macOS';
      else if (ua.indexOf('X11') !== -1) os = 'Linux';
      else if (ua.indexOf('Linux') !== -1) os = 'Linux';
      else if (/Android/.test(ua)) os = 'Android';
      else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';

      // Simple Browser detection
      if (ua.indexOf('Chrome') !== -1 && ua.indexOf('Edg') === -1) browser = 'Chrome';
      else if (ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1) browser = 'Safari';
      else if (ua.indexOf('Firefox') !== -1) browser = 'Firefox';
      else if (ua.indexOf('Edg') !== -1) browser = 'Edge';
      else if (ua.indexOf('OPR') !== -1 || ua.indexOf('Opera') !== -1) browser = 'Opera';

      setClientNode({ os, browser });
    }
  }, []);

  // Fetch Random Coding Music on Mount
  useEffect(() => {
    let active = true;

    const fetchSong = async () => {
      try {
        const { PLAYLIST_DATA } = await import('../../data/playlist');
        const randomItem = PLAYLIST_DATA[Math.floor(Math.random() * PLAYLIST_DATA.length)];
        const searchTerm = `${randomItem.title} ${randomItem.artist}`;
        
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&limit=1&media=music`);
        const data = await res.json();
        
        if (data.results && data.results.length > 0 && active) {
          const track = data.results[0];
          setSongInfo({
            title: track.trackName,
            artist: track.artistName,
            cover: track.artworkUrl100.replace('100x100bb', '300x300bb'),
            audioUrl: track.previewUrl
          });
        } else if (active) {
          // Fallback to Reality Club if search fails
          setSongInfo({
            title: 'Am I Bothering You?',
            artist: 'Reality Club',
            cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/bf/f4/1e/bff41e24-912b-31e2-b130-4e2b027d14d2/cover.jpg/300x300bb.jpg',
            audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/0f/c9/2c/0fc92c81-80a2-2309-8800-244c0c16922d/mzaf_16409890494436531980.plus.aac.p.m4a'
          });
        }
      } catch (err) {
        console.error('iTunes fetch failed:', err);
        if (active) {
          setSongInfo({
            title: 'Am I Bothering You?',
            artist: 'Reality Club',
            cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/bf/f4/1e/bff41e24-912b-31e2-b130-4e2b027d14d2/cover.jpg/300x300bb.jpg',
            audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/0f/c9/2c/0fc92c81-80a2-2309-8800-244c0c16922d/mzaf_16409890494436531980.plus.aac.p.m4a'
          });
        }
      }
    };

    fetchSong();

    return () => {
      active = false;
    };
  }, []);

  const formatUptime = () => {
    const diff = Date.now() - startTimeRef.current;
    const secs = Math.floor((diff / 1000) % 60);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
    return [
      hrs.toString().padStart(2, '0'),
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };

  // CLI Command Handler
  const handleCliSubmit = (e) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    let response = [];
    response.push({ type: 'input', text: `guest@architect-os:~$ ${cliInput}` });

    switch (cmd) {
      case 'help':
        response.push({ type: 'output', text: 'Available commands: about | skills | logs | contact | clear' });
        break;
      case 'about':
        response.push({ type: 'output', text: 'Muhammad Hafizh - Computer Science Student & Systems Architect. Focuses on full-stack web development and system scale.' });
        break;
      case 'skills':
        response.push({ type: 'output', text: 'Core Stack: Laravel, React, Node.js, Python, MongoDB, MySQL, Tailwind CSS, TypeScript.' });
        break;
      case 'logs':
        JOURNEY_DATA.forEach(j => {
          response.push({ type: 'output', text: `[${j.year}] [${j.type.toUpperCase()}] - ${j.title}` });
        });
        break;
      case 'contact':
        response.push({ type: 'output', text: `Email: ${MY_EMAIL} | GitHub: github.com/Taufiqu` });
        break;
      case 'clear':
        setCliLogs([]);
        setCliInput('');
        return;
      default:
        response.push({ type: 'err', text: `Command not found: "${cmd}". Type "help" for valid console queries.` });
    }

    setCliLogs(prev => [...prev, ...response]);
    setCliInput('');
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (cliEndRef.current) {
      cliEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [cliLogs]);

  // Spotify Audio Actions
  const handlePlaySnippet = () => {
    const audio = audioRef.current;
    if (!audio || !songInfo.audioUrl) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    } else {
      audio.volume = 0.4;
      audio.play()
        .then(() => {
          setIsPlaying(true);
          rafRef.current = requestAnimationFrame(updateProgress);
        })
        .catch(err => console.log('Playback failed:', err));
    }
  };

  const updateProgress = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const progressPercent = (audio.currentTime / audio.duration) * 100 || 0;

    if (audio.ended) {
      setIsPlaying(false);
      setSongProgress(0);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    } else {
      setSongProgress(progressPercent);
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Copy Clipboard Action
  const handleCopyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(MY_EMAIL);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 2000);
    }
  };

  return (
    <section 
      id="sandbox" 
      className="bg-[#0B0F17] py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <p className="font-mono-code text-xs text-[var(--color-primary)] uppercase tracking-[0.2em] mb-2">
            [ 02. Interactive Tech Playground ]
          </p>
          <h2 className="text-3xl font-extrabold uppercase tracking-wider text-white sm:text-4xl">
            Tech Space & Sandbox
          </h2>
          <div className="h-1 w-16 bg-[var(--color-primary)] mt-4 mx-auto md:mx-0" />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 items-stretch">
          
          {/* ====================================================
              ROW 1: CLI CONSOLE & RESOURCE MONITOR
             ==================================================== */}
          
          {/* Card 1: CLI Console - Spans 6 cols */}
          <div className="bento-card p-6 md:col-span-6 flex flex-col justify-between min-h-[340px]">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaTerminal className="text-[var(--color-primary)] animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] font-mono-code">CLI Console Terminal</span>
              </div>

              {/* Console logs box */}
              <div className="rounded-xl bg-black/60 p-4 border border-white/5 font-mono-code text-[11px] h-48 overflow-y-auto mb-4 flex flex-col gap-1.5 scrollbar-thin">
                {cliLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {log.type === 'input' && <span className="text-white font-bold">{log.text}</span>}
                    {log.type === 'system' && <span className="text-[var(--color-accent-green)]">{log.text}</span>}
                    {log.type === 'output' && <span className="text-[var(--color-text-muted)]">{log.text}</span>}
                    {log.type === 'err' && <span className="text-red-400">{log.text}</span>}
                  </div>
                ))}
                <div ref={cliEndRef} />
              </div>

              {/* Console Form Input */}
              <form onSubmit={handleCliSubmit} className="flex gap-2">
                <span className="font-mono-code text-xs text-white self-center">~$</span>
                <input 
                  type="text" 
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="type 'help'..." 
                  className="flex-1 bg-black/30 border border-white/10 rounded-lg p-2 font-mono-code text-xs text-white placeholder-white/20 outline-none focus:border-[var(--color-primary)]"
                />
                <button 
                  type="submit" 
                  className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 px-4 rounded-lg text-xs font-mono-code font-bold hover:bg-[var(--color-primary)] hover:text-[#0B0F17] transition"
                >
                  EXEC
                </button>
              </form>
            </div>
          </div>

          {/* Card 2: Resource Monitor - Spans 6 cols */}
          <div className="bento-card p-6 md:col-span-6 flex flex-col justify-between min-h-[340px]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FaServer className="text-[var(--color-primary)]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] font-mono-code">Engine Resource Monitor</span>
                </div>
                <span className="font-mono-code text-[10px] text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-1.5 py-0.5 rounded border border-[var(--color-primary)]/20">
                  CPU: {systemStats.cpu}%
                </span>
              </div>

              {/* Bars list */}
              <div className="space-y-4 font-mono-code text-xs">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-semibold text-white">Backend (Laravel Engine)</span>
                    <span className="text-[var(--color-primary)]">90%</span>
                  </div>
                  <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500" style={{ width: '90%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-semibold text-white">Frontend (React / Next.js)</span>
                    <span className="text-[var(--color-primary)]">85%</span>
                  </div>
                  <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500" style={{ width: '85%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-semibold text-white">Database Engine (SQL & Mongo)</span>
                    <span className="text-[var(--color-primary)]">80%</span>
                  </div>
                  <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500" style={{ width: '80%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Skill tags */}
            <div className="mt-6 border-t border-white/5 pt-4">
              <p className="text-[10px] font-mono-code uppercase tracking-wider text-[var(--color-text-muted)] mb-3">Loaded System Modules:</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded text-xs text-white border border-white/10">
                  <SiLaravel className="text-rose-500" />
                  <span>Laravel</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded text-xs text-white border border-white/10">
                  <SiReact className="text-sky-400" />
                  <span>React</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded text-xs text-white border border-white/10">
                  <SiMongodb className="text-emerald-500" />
                  <span>MongoDB</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded text-xs text-white border border-white/10">
                  <SiNodedotjs className="text-green-500" />
                  <span>Node.js</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded text-xs text-white border border-white/10">
                  <SiTypescript className="text-blue-500" />
                  <span>TS</span>
                </span>
              </div>
            </div>
          </div>

          {/* ====================================================
              ROW 2: SPOTIFY CODING PLAYER, GITHUB ACTIVITY, SYSTEM STATS
             ==================================================== */}

          {/* Card 3: Spotify Player - Spans 4 cols */}
          <div className="bento-card p-6 md:col-span-4 flex flex-col justify-between gap-5 min-h-[220px]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-mono-code">
              <FaSpotify className="text-[#1DB954] animate-spin" style={{ animationDuration: '6s' }} />
              <span>Coding Soundtrack</span>
            </div>

            <div className="flex items-center gap-4">
              <div 
                className="relative group cursor-pointer h-14 w-14 shrink-0 rounded-xl overflow-hidden border border-white/10"
                onClick={handlePlaySnippet}
              >
                {songInfo.cover && (
                  <img 
                    src={songInfo.cover} 
                    alt="Album cover" 
                    className={`h-full w-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-60' : 'group-hover:opacity-60'}`}
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-black/60 border border-white/20 backdrop-blur-sm transition-all duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {isPlaying ? <FaPause className="text-white text-xs" /> : <FaPlay className="text-white text-xs ml-0.5" />}
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate text-white">{songInfo.title}</p>
                <p className="text-xs truncate text-[var(--color-text-muted)] mb-2">{songInfo.artist}</p>
                
                {/* Custom Audio Progress bar */}
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#1DB954] rounded-full transition-all duration-100" 
                    style={{ width: `${songProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-[9px] font-mono-code uppercase tracking-wider text-[var(--color-text-muted)] border-t border-white/5 pt-3">
              Source: iTunes API // YTM Playlist
            </div>
            
            <audio ref={audioRef} src={songInfo.audioUrl || ''} preload="auto" />
          </div>

          {/* Card 4: GitHub Stats Streaks - Spans 4 cols */}
          <div className="bento-card p-4 md:col-span-4 flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-mono-code mb-2">
              <FaGithub className="text-[var(--color-primary)]" />
              <span>GitHub streak stats</span>
            </div>

            <div className="flex items-center justify-center overflow-hidden rounded-lg bg-black/25 p-1 flex-grow">
              <img 
                src="https://github-readme-streak-stats.herokuapp.com/?user=Taufiqu&theme=transparent&hide_border=true&stroke=00FF7F&ring=00FF7F&fire=00FF7F&currStreakNum=E0E0E0&sideNums=E0E0E0&currStreakLabel=00FF7F&sideLabels=00FF7F&background=transparent"
                alt="Github Activity Stats"
                loading="lazy"
                className="w-full max-h-24 object-contain"
              />
            </div>

            <div className="flex justify-between text-[9px] font-mono-code uppercase tracking-wider text-[var(--color-text-muted)] border-t border-white/5 pt-3">
              <span>Account: Taufiqu</span>
              <a href="https://github.com/Taufiqu" target="_blank" rel="noreferrer" className="text-[var(--color-primary)] hover:underline">
                profile_sys ↗
              </a>
            </div>
          </div>

          {/* Card 5: System Telemetry - Spans 4 cols */}
          <div className="bento-card p-6 md:col-span-4 flex flex-col justify-between min-h-[260px]">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-mono-code mb-4">
              <span>System Telemetry</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-[var(--color-accent-green)] font-bold animate-pulse font-mono-code">ONLINE</span>
                <span className="flex h-2 w-2 rounded-full bg-[var(--color-accent-green)] blink-dot" />
              </div>
            </div>

            {/* Telemetry Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 my-2 font-mono-code text-xs border-b border-white/5 pb-4">
              {/* Node Location */}
              <div className="flex items-start gap-2">
                <MdLocationOn className="text-base text-[var(--color-primary)] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-[9px] uppercase text-[var(--color-text-muted)]">NODE_LOC</span>
                  <span className="text-white font-semibold block truncate">Lampung, ID</span>
                </div>
              </div>

              {/* Live Nodes */}
              <div className="flex items-start gap-2">
                <FaUsers className="text-base text-[var(--color-accent-green)] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-[9px] uppercase text-[var(--color-text-muted)]">LIVE_NODES</span>
                  <span className="text-white font-semibold block">
                    {liveVisitors} <span className="text-[10px] text-[var(--color-accent-green)]">(Active)</span>
                  </span>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-2">
                <MdSchedule className="text-base text-[var(--color-primary)] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-[9px] uppercase text-[var(--color-text-muted)]">WORK_HOURS</span>
                  <span className="text-white font-semibold block truncate">UTC+7 · Evenings</span>
                </div>
              </div>

              {/* Total Request Load */}
              <div className="flex items-start gap-2">
                <FaEye className="text-base text-[var(--color-primary)] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-[9px] uppercase text-[var(--color-text-muted)]">SYS_REQS</span>
                  <span className="text-white font-semibold block">{totalVisits.toLocaleString()}</span>
                </div>
              </div>

              {/* Client device node */}
              <div className="flex items-start gap-2">
                <MdDevices className="text-base text-[var(--color-primary)] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-[9px] uppercase text-[var(--color-text-muted)]">CLIENT_NODE</span>
                  <span className="text-white font-semibold block truncate">{clientNode.os} · {clientNode.browser}</span>
                </div>
              </div>

              {/* Network data transfer */}
              <div className="flex items-start gap-2">
                <FaServer className="text-base text-[var(--color-primary)] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-[9px] uppercase text-[var(--color-text-muted)]">DATA_XFER</span>
                  <span className="text-white font-semibold block">{dataTransfer} KB/s</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between text-[9px] font-mono-code uppercase tracking-wider text-[var(--color-text-muted)] pt-2">
              <span>Uptime: {systemStats.uptime}</span>
              <span>PING: {systemStats.latency}MS</span>
            </div>
          </div>
          </div>


        {/* Copy notification popup */}
        <div 
          className={`fixed bottom-10 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-xl border border-[var(--color-primary)]/30 bg-[#161F30]/95 px-6 py-3.5 text-xs font-mono-code text-white shadow-[0_10px_30px_rgba(0,242,254,0.15)] backdrop-blur-md transition-all duration-500 ${
            showCopyToast 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0 pointer-events-none'
          }`}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[#0B0F17] font-bold text-[10px]">
            ✓
          </span>
          SYS_MSG: Email copied to clipboard!
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
