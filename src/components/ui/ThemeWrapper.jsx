"use client";

import { ThemeProvider } from '../../context/ThemeContext';
import ThemeTransitionOverlay from './ThemeTransitionOverlay';
import ThemeConfirmModal from './ThemeConfirmModal';

export default function ThemeWrapper({ children }) {
  return (
    <ThemeProvider>
      <ThemeTransitionOverlay />
      <ThemeConfirmModal />
      {children}
    </ThemeProvider>
  );
}
