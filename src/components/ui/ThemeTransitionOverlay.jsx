"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

import userLogo from '../../assets/logo.webp';

// ─── DEV → PRO: Terminal compile sequence ─────────────────────────────────────
const TERMINAL_LINES = [
  { delay: 0,    text: '> sudo apply --mode=PROFESSIONAL', type: 'cmd' },
  { delay: 400,  text: '  checking environment variables...', type: 'info' },
  { delay: 800,  text: '  flushing dev_environment...', type: 'info' },
  { delay: 1300, text: '  compiling clean_ui.bundle...', type: 'info' },
  { delay: 1900, text: '  applying typography overrides...', type: 'info' },
  { delay: 2300, text: '  restarting renderer process...', type: 'info' },
  { delay: 2700, text: '> DONE. Professional mode active.', type: 'success' },
];

function DevToProOverlay({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Reveal terminal lines one by one
    TERMINAL_LINES.forEach(({ delay, text, type }) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, { text, type }]);
      }, delay);
    });

    // Progress bar
    const start = Date.now();
    const duration = 2700;
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) clearInterval(tick);
    }, 30);

    // Trigger exit animation then call onComplete
    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 500);
    }, 3300);

    return () => {
      clearInterval(tick);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: '#0B0F17',
        opacity: exiting ? 0 : 1,
        transition: exiting ? 'opacity 0.5s ease' : 'none',
      }}
    >
      {/* Scan lines overlay for retro feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
        }}
      />

      <div className="relative w-full max-w-xl px-6">
        {/* Window bar */}
        <div
          className="flex items-center gap-1.5 mb-0 px-4 py-3 rounded-t-xl"
          style={{ background: '#161F30', border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none' }}
        >
          <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F56' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#27C93F' }} />
          <span className="ml-3 text-xs" style={{ fontFamily: 'Fira Code, monospace', color: '#94A3B8' }}>
            theme_switcher.sh
          </span>
        </div>

        {/* Terminal body */}
        <div
          className="px-5 py-5 rounded-b-xl min-h-[220px]"
          style={{
            background: '#090D14',
            border: '1px solid rgba(255,255,255,0.08)',
            fontFamily: 'Fira Code, Courier New, monospace',
            fontSize: '13px',
            lineHeight: '1.8',
          }}
        >
          {visibleLines.map((line, i) => (
            <div key={i} style={{
              color: line.type === 'success' ? '#00F2FE'
                   : line.type === 'cmd'     ? '#E2E8F0'
                   :                           '#64748B',
              fontWeight: line.type === 'success' ? 600 : 400,
              marginBottom: '2px',
            }}>
              {line.text}
              {i === visibleLines.length - 1 && (
                <span style={{ animation: 'blink 1s step-start infinite', color: '#00F2FE', marginLeft: 4 }}>▋</span>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between mb-1.5" style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#94A3B8' }}>
            <span>progress</span>
            <span style={{ color: '#00F2FE' }}>{progress}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #00F2FE, #10B981)',
                transition: 'width 0.1s linear',
                boxShadow: '0 0 8px rgba(0,242,254,0.4)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PRO → DEV: Clean minimal wipe with Floating Logo & Loading Bar ─────────
function ProToDevOverlay({ onComplete }) {
  const [phase, setPhase] = useState('enter'); // 'enter' | 'hold' | 'exit'

  useEffect(() => {
    // Phase: enter (fade in white overlay)
    const holdTimer = setTimeout(() => setPhase('hold'), 400);

    // Phase: trigger theme switch midway, then exit
    const completeTimer = setTimeout(() => {
      onComplete();         // flip the theme
    }, 600);

    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 700);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(completeTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0B0F17] transition-all duration-300"
      style={{
        opacity: phase === 'enter' ? 0 : phase === 'hold' ? 1 : 0,
        transition: phase === 'enter' ? 'opacity 0.4s ease'
                  : phase === 'exit'  ? 'opacity 0.5s ease 0.1s'
                  :                     'none',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      {/* Floating avatar box logo */}
      <div className="mb-6 flex flex-col items-center animate-float">
        <img 
          src={userLogo.src || userLogo} 
          alt="Avatar Logo" 
          className="w-16 h-16 rounded-full object-cover shadow-lg border border-slate-200/50"
        />
      </div>

      {/* Clean minimal loading bar */}
      <div style={{ width: '180px' }}>
        <div
          className="h-[2.5px] rounded-full"
          style={{
            background: 'rgba(0,0,0,0.06)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: '999px',
              background: '#2563EB',
              animation: 'proLoadBar 0.6s cubic-bezier(0.4,0,0.2,1) forwards',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes proLoadBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// ─── Main Overlay Router ───────────────────────────────────────────────────────
export default function ThemeTransitionOverlay() {
  const { isTransitioning, transitionDirection, onTransitionComplete } = useTheme();
  const [visible, setVisible] = useState(false);
  const [activeDirection, setActiveDirection] = useState(null);
  const prevTransitioning = useRef(false);

  useEffect(() => {
    if (isTransitioning && !prevTransitioning.current) {
      setVisible(true);
      setActiveDirection(transitionDirection);
    }
    prevTransitioning.current = isTransitioning;
  }, [isTransitioning, transitionDirection]);

  const handleComplete = () => {
    onTransitionComplete();
    setTimeout(() => {
      setVisible(false);
      setActiveDirection(null);
    }, 600);
  };

  if (!visible) return null;

  if (activeDirection === 'dev-to-pro') {
    return <DevToProOverlay onComplete={handleComplete} />;
  }

  if (activeDirection === 'pro-to-dev') {
    return <ProToDevOverlay onComplete={handleComplete} />;
  }

  return null;
}
