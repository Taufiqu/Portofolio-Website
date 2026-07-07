"use client";

import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaTerminal, FaExclamationTriangle } from 'react-icons/fa';

export default function ThemeConfirmModal() {
  const { 
    showConfirmModal, 
    pendingTheme, 
    confirmThemeSwitch, 
    cancelThemeSwitch 
  } = useTheme();

  if (!showConfirmModal) return null;

  const isTargetPro = pendingTheme === 'pro';

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {isTargetPro ? (
        /* ====================================================
           DEV TO PRO CONFIRMATION: Retro Geeky Style
           ==================================================== */
        <div 
          className="w-full max-w-md bg-[#0B0F17] border-2 border-[var(--color-primary)] rounded-xl shadow-[0_0_30px_rgba(0,242,254,0.25)] relative overflow-hidden p-6 font-mono-code text-xs text-[var(--color-text)]"
        >
          {/* Top Bar window indicators */}
          <div className="flex justify-between items-center border-b border-[var(--color-outline)] pb-3 mb-4">
            <div className="flex items-center gap-1.5">
              <FaTerminal className="text-[var(--color-primary)] text-xs" />
              <span className="text-[10px] text-[var(--color-text-muted)] font-mono-code uppercase tracking-wider">
                CONFIRM_SYSTEM_OVERRIDE.SH
              </span>
            </div>
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
          </div>

          {/* Main Warning message */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
              <FaExclamationTriangle className="animate-bounce" />
              <span>[WARNING] DEV ENVIRONMENT EXIT SIGNALED</span>
            </div>

            <div className="bg-black/35 border border-[var(--color-outline)] p-3 rounded-lg leading-relaxed text-[var(--color-text-muted)]">
              <p className="text-[var(--color-text)] font-semibold mb-1">
                SYSTEM PROTOCOL OVERRIDE DETECTED.
              </p>
              <p>
                - Target State: <span className="text-[var(--color-primary)] font-bold">PROFESSIONAL_MODE</span><br />
                - Impact: Terminal CLI, scanline grids, and retro compiler simulators will be replaced with clean corporate layouts.
              </p>
            </div>

            <p className="text-center font-bold text-[11px] text-[var(--color-primary)] mt-2">
              INITIATE SYSTEM REBUILD? (Y/N)
            </p>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={confirmThemeSwitch}
                className="flex-1 bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)] hover:text-[#0B0F17] text-[var(--color-primary)] font-bold py-2.5 rounded-lg transition active:scale-95 text-center cursor-pointer"
              >
                [ CONFIRM_OVERRIDE() ]
              </button>
              <button
                onClick={cancelThemeSwitch}
                className="flex-1 bg-red-950/20 border border-red-500/30 hover:bg-red-500 hover:text-white text-red-400 font-bold py-2.5 rounded-lg transition active:scale-95 text-center cursor-pointer"
              >
                [ ABORT_PROCESS() ]
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ====================================================
           PRO TO DEV CONFIRMATION: Clean Corporate Style
           ==================================================== */
        <div 
          className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 font-sans relative overflow-hidden text-slate-800 dark:text-slate-200"
        >
          {/* Header */}
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center shrink-0">
              <FaExclamationTriangle className="text-blue-600 dark:text-blue-400 text-lg" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">Switch Workspace</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Workspace Reconfiguration</p>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to return to the developer workspace? This will load the geeky developer theme, featuring terminal emulators, interactive CLIs, and compiler log monitors.
            </p>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={confirmThemeSwitch}
                className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-2.5 rounded-2xl transition shadow-md shadow-blue-500/10 text-sm text-center cursor-pointer"
              >
                Switch Workspace
              </button>
              <button
                onClick={cancelThemeSwitch}
                className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 text-slate-600 dark:text-slate-300 font-semibold py-2.5 rounded-2xl transition text-sm text-center cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
