/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Override Tailwind's default font-sans to use our custom Google Font.
        // This ensures `font-sans` in pro mode renders Plus Jakarta Sans (not system-ui).
        sans: ['var(--font-plus-jakarta-sans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        // Explicit utilities for direct access to each loaded font
        inter:  ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        fira:   ['var(--font-fira-code)', 'Courier New', 'monospace'],
      },
    }
  },
  plugins: []
};

