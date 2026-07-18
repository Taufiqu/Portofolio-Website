import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter, Geist, JetBrains_Mono } from 'next/font/google';
import ThemeWrapper from '../components/ui/ThemeWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://taufiqu.dev';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Muhammad Hafizh | Software Engineer',
  description: 'Muhammad Hafizh Taufiqurrohman - Software Engineer focusing on scalable systems, code maintainability, and clean UI architecture.',
  keywords: ['Muhammad Hafizh', 'Muhammad Hafizh Taufiqurrohman', 'Software Engineer', 'Systems Architect', 'Indonesia', 'Laravel', 'React', 'Next.js', 'Web Developer'],
  authors: [{ name: 'Muhammad Hafizh', url: 'https://github.com/Taufiqu' }],
  openGraph: {
    title: 'Muhammad Hafizh | Software Engineer',
    description: 'Muhammad Hafizh Taufiqurrohman - Software Engineer focusing on scalable systems, code maintainability, and clean UI architecture.',
    url: 'https://github.com/Taufiqu',
    siteName: 'Muhammad Hafizh Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Muhammad Hafizh Portfolio Banner',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Hafizh | Software Engineer',
    description: 'Muhammad Hafizh Taufiqurrohman - Software Engineer focusing on scalable systems, code maintainability, and clean UI architecture.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'hAYHjJjj3sxwT1wQufSyBrcsWMX8YtvOLibbUDt7-TE',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

