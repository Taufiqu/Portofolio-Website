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
  FaUsers,
  FaSearch,
  FaTimes,
  FaStepForward
} from 'react-icons/fa';
import { 
  SiReact, 
  SiNextdotjs,
  SiTailwindcss, 
  SiJavascript, 
  SiSupabase, 
  SiVercel
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
  const [liveVisitors, setLiveVisitors] = useState(null);
  const [totalVisits, setTotalVisits] = useState(null);
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

  // Music Search States
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [musicSearchQuery, setMusicSearchQuery] = useState('');
  const [musicSearchResults, setMusicSearchResults] = useState([]);
  const [isMusicSearching, setIsMusicSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // GitHub Widget Tab State
  const [githubTab, setGithubTab] = useState('stats');

  // Real Client-Side Performance & Telemetry States
  const [fps, setFps] = useState(60);
  const [edgePing, setEdgePing] = useState(25);
  const [dbPing, setDbPing] = useState(120);

  // Copy Email State
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [isGlitchActive, setIsGlitchActive] = useState(false);
  const [activeTheme, setActiveTheme] = useState('cyan');
  const [cliMode, setCliMode] = useState('normal'); // 'normal', 'guestbook_name', 'guestbook_message'
  const [guestbookTempName, setGuestbookTempName] = useState('');

  const logsContainerRef = useRef(null);
  const isInitialMount = useRef(true);
  const startTimeRef = useRef(Date.now());

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('user-theme') || 'cyan';
      setActiveTheme(savedTheme);
    }
  }, []);

  // Apply theme colors dynamically
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      localStorage.setItem('user-theme', activeTheme);
      
      const themes = {
        cyan: { primary: '#00F2FE', accent: '#00FF7F' },
        green: { primary: '#00FF00', accent: '#39FF14' },
        amber: { primary: '#FFB000', accent: '#FFCC00' },
        magenta: { primary: '#FF007F', accent: '#D800FF' }
      };
      
      const colors = themes[activeTheme] || themes.cyan;
      root.style.setProperty('--color-primary', colors.primary);
      root.style.setProperty('--color-accent-green', colors.accent);
    }
  }, [activeTheme]);

  // Live Client FPS Tracker
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animationId = requestAnimationFrame(calcFps);
    };

    animationId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // System Stats derived from real telemetry & Uptime
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate derived CPU load based on FPS
      const cpuLoad = Math.max(3, Math.round((1 - (fps / 60)) * 100)) + Math.floor(Math.random() * 3);
      // Calculate memory usage percentage
      const memoryUsage = window.performance && window.performance.memory 
        ? Math.round((window.performance.memory.usedJSHeapSize / window.performance.memory.jsHeapSizeLimit) * 100)
        : 41 + Math.floor(Math.random() * 3); // realistic fallback that fluctuates slightly

      setSystemStats(prev => ({
        cpu: Math.min(100, cpuLoad),
        memory: memoryUsage,
        latency: edgePing,
        uptime: formatUptime()
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [fps, edgePing]);

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
        const start = performance.now();
        await fetch('/api/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        });
        const end = performance.now();
        setEdgePing(Math.max(1, Math.round(end - start)));
      } catch (err) {
        console.warn('Heartbeat send failed:', err);
      }
    };

    // Telemetry fetcher logic
    const fetchTelemetry = async () => {
      try {
        const start = performance.now();
        const res = await fetch('/api/visitors');
        const end = performance.now();
        setDbPing(Math.max(1, Math.round(end - start)));
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
        setLiveVisitors(1);
        try {
          const backup = parseInt(localStorage.getItem('taufiqu_real_visits_backup'), 10);
          if (!isNaN(backup)) {
            setTotalVisits(backup);
          } else {
            setTotalVisits(1);
          }
        } catch (e) {
          setTotalVisits(1);
        }
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
    const trimmedInput = cliInput.trim();
    if (!trimmedInput) return;

    // Check for exit/cancel in interactive modes
    if (cliMode !== 'normal' && (trimmedInput.toLowerCase() === 'exit' || trimmedInput.toLowerCase() === 'cancel')) {
      const promptPrefix = cliMode === 'guestbook_name' ? 'name:~$ ' : 'msg:~$ ';
      setCliLogs(prev => [...prev, 
        { type: 'input', text: `${promptPrefix}${cliInput}` },
        { type: 'system', text: '✖ Wizard aborted. Returning to normal terminal mode.' }
      ]);
      setCliMode('normal');
      setGuestbookTempName('');
      setCliInput('');
      return;
    }

    // Interactive Mode: Name Input
    if (cliMode === 'guestbook_name') {
      const sanitized = trimmedInput.replace(/<[^>]*>/g, '').trim().substring(0, 50);
      if (!sanitized) {
        setCliLogs(prev => [...prev, 
          { type: 'input', text: `name:~$ ${cliInput}` },
          { type: 'err', text: 'Name cannot be empty. Please enter your name:' }
        ]);
        setCliInput('');
        return;
      }
      setGuestbookTempName(sanitized);
      setCliLogs(prev => [...prev, 
        { type: 'input', text: `name:~$ ${cliInput}` },
        { type: 'system', text: `Name set to: "${sanitized}"` },
        { type: 'system', text: 'Enter message (max 200 chars, or type "exit" to cancel):' }
      ]);
      setCliMode('guestbook_message');
      setCliInput('');
      return;
    }

    // Interactive Mode: Message Input
    if (cliMode === 'guestbook_message') {
      const sanitized = trimmedInput.replace(/<[^>]*>/g, '').trim().substring(0, 200);
      if (!sanitized) {
        setCliLogs(prev => [...prev, 
          { type: 'input', text: `msg:~$ ${cliInput}` },
          { type: 'err', text: 'Message cannot be empty. Please enter your message:' }
        ]);
        setCliInput('');
        return;
      }

      setCliLogs(prev => [...prev, 
        { type: 'input', text: `msg:~$ ${cliInput}` },
        { type: 'system', text: '📡 Connecting to database...' }
      ]);

      fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: guestbookTempName, message: sanitized })
      })
      .then(res => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then(data => {
        setCliLogs(prev => [...prev, 
          { type: 'system', text: '✔ Message successfully written to Supabase Guestbook!' },
          { type: 'output', text: `[${data.name}]: "${data.message}"` }
        ]);
      })
      .catch(err => {
        console.error('Supabase write failed:', err);
        setCliLogs(prev => [...prev, 
          { type: 'err', text: '✖ Database write failed. Please check table settings.' }
        ]);
      })
      .finally(() => {
        setCliMode('normal');
        setGuestbookTempName('');
      });

      setCliInput('');
      return;
    }

    // Normal Command Mode
    const parts = trimmedInput.split(/\s+/);
    const mainCmd = parts[0].toLowerCase();

    let response = [];
    response.push({ type: 'input', text: `guest@architect-os:~$ ${cliInput}` });

    switch (mainCmd) {
      case 'help':
        response.push({ type: 'output', text: 'Available commands: about | skills | logs | contact | system | guestbook [read|write] | audio [play|pause|next] | cv | clear' });
        break;
      case 'about':
        response.push({ type: 'output', text: 'Muhammad Hafizh - Computer Science Student & Systems Architect. Focuses on full-stack web development and system scale.' });
        break;
      case 'skills':
        response.push({ type: 'output', text: 'Core Stack: React, Next.js, JavaScript, Tailwind CSS, Supabase, Vercel.' });
        break;
      case 'logs':
        JOURNEY_DATA.forEach(j => {
          response.push({ type: 'output', text: `[${j.year}] [${j.type.toUpperCase()}] - ${j.title}` });
        });
        break;
      case 'contact':
        response.push({ type: 'output', text: `Email: ${MY_EMAIL} | GitHub: github.com/Taufiqu` });
        break;
      case 'system':
      case 'neofetch': {
        const uptimeSec = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const h = Math.floor(uptimeSec / 3600).toString().padStart(2, '0');
        const m = Math.floor((uptimeSec % 3600) / 60).toString().padStart(2, '0');
        const s = (uptimeSec % 60).toString().padStart(2, '0');
        
        response.push({ type: 'system', text: '   /\\_/\\     SYSTEM INFORMATION:' });
        response.push({ type: 'system', text: '  ( o.o )    -------------------' });
        response.push({ type: 'system', text: `   > ^ <     OS: ${clientNode.os}` });
        response.push({ type: 'system', text: `             Browser: ${clientNode.browser}` });
        response.push({ type: 'system', text: `             Resolution: ${typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'N/A'}` });
        response.push({ type: 'system', text: `             FPS Render: ${fps} FPS` });
        response.push({ type: 'system', text: `             DB Query: ${dbPing} MS` });
        response.push({ type: 'system', text: `             Edge Ping: ${edgePing} MS` });
        response.push({ type: 'system', text: `             Uptime: ${h}:${m}:${s}` });
        break;
      }
      case 'guestbook': {
        const sub = parts[1] ? parts[1].toLowerCase() : '';
        if (sub === 'read' || sub === 'list' || !sub) {
          response.push({ type: 'system', text: '📡 Fetching entries from Supabase...' });
          fetch('/api/guestbook')
            .then(res => {
              if (!res.ok) throw new Error('API error');
              return res.json();
            })
            .then(data => {
              if (!data || data.length === 0) {
                setCliLogs(prev => [...prev, { type: 'output', text: 'ℹ Guestbook is empty. Be the first to write!' }]);
                return;
              }
              const listLogs = [{ type: 'system', text: '--- SUPABASE GUESTBOOK ENTRIES ---' }];
              data.forEach(item => {
                const dateStr = new Date(item.created_at).toLocaleDateString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit'
                });
                listLogs.push({ type: 'output', text: `[${dateStr}] [${item.name}]: ${item.message}` });
              });
              setCliLogs(prev => [...prev, ...listLogs]);
            })
            .catch(err => {
              console.error('Fetch guestbook failed:', err);
              setCliLogs(prev => [...prev, { type: 'err', text: '✖ Failed to fetch guestbook logs.' }]);
            });
        } else if (sub === 'write') {
          response.push({ type: 'system', text: '--- GUESTBOOK INTERACTIVE WIZARD ---' });
          response.push({ type: 'system', text: 'Enter your name (max 50 chars, or type "exit" to abort):' });
          setCliMode('guestbook_name');
        } else {
          response.push({ type: 'output', text: 'Usage: guestbook [read | write]' });
        }
        break;
      }
      case 'audio': {
        const sub = parts[1] ? parts[1].toLowerCase() : '';
        if (sub === 'play') {
          if (!isPlaying) {
            handlePlaySnippet();
            response.push({ type: 'system', text: '▶ Audio playback initiated.' });
          } else {
            response.push({ type: 'output', text: 'ℹ Audio is already playing.' });
          }
        } else if (sub === 'pause') {
          if (isPlaying) {
            handlePlaySnippet();
            response.push({ type: 'system', text: '⏸ Audio playback paused.' });
          } else {
            response.push({ type: 'output', text: 'ℹ Audio is already paused.' });
          }
        } else if (sub === 'next' || sub === 'skip') {
          handleNextSong();
          response.push({ type: 'system', text: '⏭ Skipping to next track...' });
        } else {
          response.push({ type: 'output', text: 'Usage: audio [play | pause | next]' });
        }
        break;
      }
      case 'cv':
        response.push({ type: 'system', text: '📂 Opening Curriculum Vitae...' });
        if (typeof window !== 'undefined') {
          window.open('/cv.html', '_blank');
        }
        break;
      case 'sudo': {
        const sub = parts[1] ? parts[1].toLowerCase() : '';
        const arg1 = parts[2] ? parts[2].toLowerCase() : '';
        const arg2 = parts[3] ? parts[3].toLowerCase() : '';
        
        if (sub === 'rm' && arg1 === '-rf' && arg2 === '/') {
          response.push({ type: 'err', text: '⚠ WARNING: WIPE RUN LEVEL CORE DETECTED.' });
          response.push({ type: 'err', text: 'SHUTTING DOWN SYSTEM...' });
          setTimeout(() => {
            setIsGlitchActive(true);
          }, 1000);
        } else {
          response.push({ type: 'err', text: 'Error: Permission denied. Sudo powers are locked.' });
        }
        break;
      }
      case 'clear':
        setCliLogs([]);
        setCliInput('');
        return;
      default:
        response.push({ type: 'err', text: `Command not found: "${mainCmd}". Type "help" for valid console queries.` });
    }

    setCliLogs(prev => [...prev, ...response]);
    setCliInput('');
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [cliLogs]);

  // Spotify Audio Actions
  const playSongWithTrack = (track) => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }

    setIsPlaying(false);
    setSongProgress(0);

    setSongInfo({
      title: track.trackName,
      artist: track.artistName,
      cover: track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '300x300bb') : 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop',
      audioUrl: track.previewUrl
    });

    if (audio && track.previewUrl) {
      audio.src = track.previewUrl;
      audio.load();
      audio.volume = 0.4;
      audio.play()
        .then(() => {
          setIsPlaying(true);
          rafRef.current = requestAnimationFrame(updateProgress);
        })
        .catch(err => console.log('Playback failed:', err));
    }
  };

  const handleNextSong = async () => {
    try {
      const { PLAYLIST_DATA } = await import('../../data/playlist');
      const filteredPlaylist = PLAYLIST_DATA.filter(
        item => item.title.toLowerCase() !== songInfo.title.toLowerCase()
      );
      const playlistToUse = filteredPlaylist.length > 0 ? filteredPlaylist : PLAYLIST_DATA;
      const randomItem = playlistToUse[Math.floor(Math.random() * playlistToUse.length)];
      const searchTerm = `${randomItem.title} ${randomItem.artist}`;
      
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&limit=1&media=music`);
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        const track = data.results[0];
        playSongWithTrack(track);
      }
    } catch (err) {
      console.error('Failed to skip to next song:', err);
    }
  };

  const handleMusicSearch = async (e) => {
    if (e) e.preventDefault();
    if (!musicSearchQuery.trim()) return;

    setIsMusicSearching(true);
    setHasSearched(true);
    try {
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(musicSearchQuery)}&limit=5&media=music`);
      const data = await res.json();
      if (data.results) {
        setMusicSearchResults(data.results);
      } else {
        setMusicSearchResults([]);
      }
    } catch (err) {
      console.error('iTunes music search failed:', err);
      setMusicSearchResults([]);
    } finally {
      setIsMusicSearching(false);
    }
  };

  const handleSelectSearchResult = (track) => {
    playSongWithTrack(track);
    setIsSearchActive(false);
    setMusicSearchQuery('');
    setMusicSearchResults([]);
    setHasSearched(false);
  };

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
    <>
      {isGlitchActive && <GlitchOverlay onClose={() => setIsGlitchActive(false)} />}
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
              <div ref={logsContainerRef} className="rounded-xl bg-black/60 p-4 border border-white/5 font-mono-code text-[11px] h-48 overflow-y-auto mb-4 flex flex-col gap-1.5 scrollbar-thin">
                {cliLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {log.type === 'input' && <span className="text-white font-bold">{log.text}</span>}
                    {log.type === 'system' && <span className="text-[var(--color-accent-green)]">{log.text}</span>}
                    {log.type === 'output' && <span className="text-[var(--color-text-muted)]">{log.text}</span>}
                    {log.type === 'err' && <span className="text-red-400">{log.text}</span>}
                  </div>
                ))}
              </div>

              {/* Console Form Input */}
              <form onSubmit={handleCliSubmit} className="flex gap-2">
                <span className="font-mono-code text-xs text-white self-center">
                  {cliMode === 'normal' ? '~$ ' : cliMode === 'guestbook_name' ? 'name:~$ ' : 'msg:~$ '}
                </span>
                <input 
                  type="text" 
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder={
                    cliMode === 'normal' 
                      ? "type 'help'..." 
                      : cliMode === 'guestbook_name' 
                      ? "Enter your name..." 
                      : "Enter your message..."
                  }
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
                  CPU Load: {systemStats.cpu}%
                </span>
              </div>

              {/* Bars list */}
              <div className="space-y-4 font-mono-code text-xs">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-semibold text-white">Frontend Render (FPS Health)</span>
                    <span className="text-[var(--color-primary)]">{fps} FPS</span>
                  </div>
                  <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-300" 
                      style={{ width: `${Math.round((fps / 60) * 100)}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-semibold text-white">Vercel Edge Network (Latency)</span>
                    <span className="text-[var(--color-primary)]">{edgePing} MS</span>
                  </div>
                  <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-300" 
                      style={{ width: `${Math.max(10, Math.min(100, 100 - Math.round(edgePing / 5)))}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-semibold text-white">Supabase DB Query (Response)</span>
                    <span className="text-[var(--color-primary)]">{dbPing} MS</span>
                  </div>
                  <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-300" 
                      style={{ width: `${Math.max(10, Math.min(100, 100 - Math.round(dbPing / 10)))}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Skill tags & Accent Theme Switcher */}
            <div className="mt-6 border-t border-white/5 pt-4 flex flex-col lg:flex-row justify-between gap-6">
              <div className="flex-1">
                <p className="text-[10px] font-mono-code uppercase tracking-wider text-[var(--color-text-muted)] mb-3">Loaded System Modules:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded text-xs text-white border border-white/10">
                    <SiReact className="text-sky-400" />
                    <span>React</span>
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded text-xs text-white border border-white/10">
                    <SiNextdotjs className="text-white" />
                    <span>Next.js</span>
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded text-xs text-white border border-white/10">
                    <SiJavascript className="text-yellow-400" />
                    <span>JS</span>
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded text-xs text-white border border-white/10">
                    <SiTailwindcss className="text-cyan-400" />
                    <span>Tailwind</span>
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded text-xs text-white border border-white/10">
                    <SiSupabase className="text-emerald-500" />
                    <span>Supabase</span>
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded text-xs text-white border border-white/10">
                    <SiVercel className="text-white" />
                    <span>Vercel</span>
                  </span>
                </div>
              </div>

              <div className="lg:border-l lg:border-white/5 lg:pl-6 shrink-0">
                <p className="text-[10px] font-mono-code uppercase tracking-wider text-[var(--color-text-muted)] mb-3">System Accent Theme:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'cyan', label: 'CYAN', color: 'bg-[#00F2FE]' },
                    { id: 'green', label: 'GREEN', color: 'bg-[#00FF00]' },
                    { id: 'amber', label: 'AMBER', color: 'bg-[#FFB000]' },
                    { id: 'magenta', label: 'MAGENTA', color: 'bg-[#FF007F]' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTheme(t.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono-code border transition-all ${
                        activeTheme === t.id
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white font-bold'
                          : 'border-white/10 bg-white/5 text-[var(--color-text-muted)] hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${t.color} inline-block`} />
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================
              ROW 2: SPOTIFY CODING PLAYER, GITHUB ACTIVITY, SYSTEM STATS
             ==================================================== */}

          {/* Card 3: Spotify Player - Spans 4 cols */}
          <div className="bento-card p-6 md:col-span-4 flex flex-col justify-between gap-4 min-h-[220px]">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-mono-code">
              <div className="flex items-center gap-2">
                <FaSpotify className="text-[#1DB954] animate-spin" style={{ animationDuration: '6s' }} />
                <span>Coding Soundtrack</span>
              </div>
              <button 
                onClick={() => {
                  setIsSearchActive(!isSearchActive);
                  setMusicSearchQuery('');
                  setMusicSearchResults([]);
                  setHasSearched(false);
                }} 
                className="text-[var(--color-text-muted)] hover:text-white transition p-1"
                title={isSearchActive ? "Back to Player" : "Search Library"}
              >
                {isSearchActive ? <FaTimes className="text-xs" /> : <FaSearch className="text-xs" />}
              </button>
            </div>

            {isSearchActive ? (
              <div className="flex flex-col gap-2 flex-grow justify-between">
                <form onSubmit={handleMusicSearch} className="flex gap-1">
                  <input
                    type="text"
                    value={musicSearchQuery}
                    onChange={(e) => setMusicSearchQuery(e.target.value)}
                    placeholder="Search song / artist..."
                    className="flex-grow bg-black/30 border border-white/10 rounded-lg px-2 py-1.5 font-mono-code text-[11px] text-white placeholder-white/20 outline-none focus:border-[var(--color-primary)]"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-[#1DB954]/10 text-[#1DB954] border border-[#1DB954]/20 px-2 rounded-lg text-[10px] font-mono-code font-bold hover:bg-[#1DB954] hover:text-[#0B0F17] transition"
                  >
                    FIND
                  </button>
                </form>

                <div className="overflow-y-auto max-h-[100px] flex flex-col gap-1.5 pr-0.5 scrollbar-thin">
                  {isMusicSearching ? (
                    <p className="text-[9px] font-mono-code text-[var(--color-text-muted)] text-center py-2">SEARCHING LIBRARY...</p>
                  ) : musicSearchResults.length > 0 ? (
                    musicSearchResults.map((track) => (
                      <div
                        key={track.trackId}
                        onClick={() => handleSelectSearchResult(track)}
                        className="flex items-center gap-2 p-1 rounded bg-white/5 hover:bg-white/10 cursor-pointer transition border border-white/5 min-w-0"
                      >
                        {track.artworkUrl30 && (
                          <img
                            src={track.artworkUrl30}
                            alt=""
                            className="h-6 w-6 rounded object-cover shrink-0"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-semibold text-white truncate">{track.trackName}</p>
                          <p className="text-[9px] text-[var(--color-text-muted)] truncate">{track.artistName}</p>
                        </div>
                      </div>
                    ))
                  ) : hasSearched ? (
                    <p className="text-[9px] font-mono-code text-red-400 text-center py-2">NO TRACKS FOUND.</p>
                  ) : (
                    <p className="text-[9px] font-mono-code text-[var(--color-text-muted)] text-center py-2">SEARCH 70M+ SONGS ON ITUNES</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 flex-grow my-auto">
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
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold truncate text-white">{songInfo.title}</p>
                    <button 
                      onClick={handleNextSong} 
                      className="text-[var(--color-text-muted)] hover:text-white hover:scale-110 transition p-1 shrink-0"
                      title="Next Song"
                    >
                      <FaStepForward className="text-[10px]" />
                    </button>
                  </div>
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
            )}

            <div className="text-[9px] font-mono-code uppercase tracking-wider text-[var(--color-text-muted)] border-t border-white/5 pt-3">
              Source: iTunes API // YTM Playlist
            </div>
            
            <audio ref={audioRef} src={songInfo.audioUrl || null} preload="auto" />
          </div>

          {/* Card 4: GitHub Stats Dashboard - Spans 4 cols */}
          <div className="bento-card p-4 md:col-span-4 flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-mono-code mb-2 w-full">
              <div className="flex items-center gap-1.5 shrink-0">
                <FaGithub className="text-[var(--color-primary)]" />
                <span className="hidden sm:inline">GitHub Logs</span>
              </div>
              <div className="flex gap-1 text-[8px] sm:text-[9px]">
                <button 
                  onClick={() => setGithubTab('stats')}
                  className={`px-1.5 py-0.5 rounded border transition ${githubTab === 'stats' ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/30 text-[var(--color-primary)] font-bold' : 'border-transparent text-[var(--color-text-muted)] hover:text-white'}`}
                >
                  STATS
                </button>
                <button 
                  onClick={() => setGithubTab('streak')}
                  className={`px-1.5 py-0.5 rounded border transition ${githubTab === 'streak' ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/30 text-[var(--color-primary)] font-bold' : 'border-transparent text-[var(--color-text-muted)] hover:text-white'}`}
                >
                  STREAK
                </button>
                <button 
                  onClick={() => setGithubTab('langs')}
                  className={`px-1.5 py-0.5 rounded border transition ${githubTab === 'langs' ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/30 text-[var(--color-primary)] font-bold' : 'border-transparent text-[var(--color-text-muted)] hover:text-white'}`}
                >
                  LANGS
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center overflow-hidden rounded-lg bg-black/25 p-1 flex-grow min-h-[120px] transition-all duration-300">
              {githubTab === 'stats' && (
                <img 
                  src="https://github-stats-extended.vercel.app/api?username=Taufiqu&show_icons=true&theme=transparent&hide_border=true&icon_color=00FF7F&title_color=00FF7F&text_color=E0E0E0&bg_color=00000000&count_private=true"
                  alt="Github Account Stats"
                  loading="lazy"
                  className="w-full max-h-[140px] object-contain animate-fadeIn"
                />
              )}
              {githubTab === 'streak' && (
                <img 
                  src="https://github-readme-streak-stats.herokuapp.com/?user=Taufiqu&theme=transparent&hide_border=true&stroke=00FF7F&ring=00FF7F&fire=00FF7F&currStreakNum=E0E0E0&sideNums=E0E0E0&currStreakLabel=00FF7F&sideLabels=00FF7F&background=transparent"
                  alt="Github Contribution Streak"
                  loading="lazy"
                  className="w-full max-h-[110px] object-contain animate-fadeIn"
                />
              )}
              {githubTab === 'langs' && (
                <img 
                  src="https://github-stats-extended.vercel.app/api/top-langs/?username=Taufiqu&layout=compact&theme=transparent&hide_border=true&icon_color=00FF7F&title_color=00FF7F&text_color=E0E0E0&bg_color=00000000&count_private=true"
                  alt="Github Top Languages"
                  loading="lazy"
                  className="w-full max-h-[140px] object-contain animate-fadeIn"
                />
              )}
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
                    {liveVisitors !== null ? liveVisitors : '---'} <span className="text-[10px] text-[var(--color-accent-green)]">(Active)</span>
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
                  <span className="text-white font-semibold block">
                    {totalVisits !== null ? totalVisits.toLocaleString() : '---'}
                  </span>
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
    </>
  );
}

export default Dashboard;

// Matrix red glitch overlay component
function GlitchOverlay({ onClose }) {
  const canvasRef = useRef(null);
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationId;
    
    const resizeCanvas = () => {
      if (typeof window !== 'undefined') {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    resizeCanvas();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resizeCanvas);
    }

    const chars = "0101010101010101010101010101010101010101";
    const charArr = chars.split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ff003c"; // Crimson red matrix rain
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resizeCanvas);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center font-mono-code p-4">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="relative z-10 text-center bg-black/80 border-2 border-red-500/30 p-8 max-w-lg rounded shadow-[0_0_50px_rgba(239,68,68,0.2)] select-none">
        <div className="text-red-500 text-4xl sm:text-5xl font-bold animate-pulse mb-4 tracking-wider">
          ⚠ ERROR ⚠
        </div>
        <p className="text-red-400 text-xs sm:text-sm font-semibold mb-6 uppercase tracking-widest leading-relaxed">
          FATAL DIRECTORY OVERWRITE TRIGGERED:<br />
          <span className="text-white bg-red-600 px-2 py-0.5 font-bold">sudo rm -rf /</span>
        </p>
        <div className="w-full h-1.5 bg-white/10 mb-6 overflow-hidden rounded">
          <div className="h-full bg-red-500 transition-all duration-1000 ease-linear" style={{ width: `${(4 - countdown) * 25}%` }} />
        </div>
        <div className="text-[10px] text-red-500/70 mb-4 font-mono-code uppercase tracking-wider">
          System kernel wiped. Executing emergency core recovery...
        </div>
        <div className="text-2xl sm:text-3xl text-white font-mono-code font-bold">
          REBOOTING IN <span className="text-red-500">{countdown}s</span>
        </div>
      </div>
    </div>
  );
}
