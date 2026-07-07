"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dev'); // 'dev' | 'pro'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState(null); // 'dev-to-pro' | 'pro-to-dev'
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingTheme, setPendingTheme] = useState(null);

  // Read theme from localStorage on mount (before first paint)
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'pro' || saved === 'dev') {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
      if (saved === 'dev') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Default is dev (dark theme)
      document.documentElement.classList.add('dark');
    }
  }, []);

  const switchTheme = useCallback((target) => {
    if (isTransitioning || target === theme) return;
    setPendingTheme(target);
    setShowConfirmModal(true);
  }, [theme, isTransitioning]);

  const confirmThemeSwitch = useCallback(() => {
    if (!pendingTheme) return;
    const direction = theme === 'dev' ? 'dev-to-pro' : 'pro-to-dev';
    setTransitionDirection(direction);
    setIsTransitioning(true);
    setShowConfirmModal(false);
  }, [theme, pendingTheme]);

  const cancelThemeSwitch = useCallback(() => {
    setShowConfirmModal(false);
    setPendingTheme(null);
  }, []);

  const applyTheme = useCallback((target) => {
    setTheme(target);
    localStorage.setItem('portfolio-theme', target);
    document.documentElement.setAttribute('data-theme', target);
    if (target === 'dev') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const onTransitionComplete = useCallback(() => {
    const target = theme === 'dev' ? 'pro' : 'dev';
    applyTheme(target);
    setIsTransitioning(false);
    setTransitionDirection(null);
    setPendingTheme(null);
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      switchTheme, 
      isTransitioning, 
      transitionDirection, 
      onTransitionComplete,
      showConfirmModal,
      pendingTheme,
      confirmThemeSwitch,
      cancelThemeSwitch
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
