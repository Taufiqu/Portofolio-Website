import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter, Fira_Code, Plus_Jakarta_Sans } from 'next/font/google';
import ThemeWrapper from '../components/ui/ThemeWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'optional',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'optional',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'optional',
});

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://taufiqu.dev';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Taufiqu | Systems Architect & Full-Stack Engineer',
  description: 'Muhammad Hafizh Taufiqurrohman - Computer Science student and Software Engineer focusing on scalable backend engines, server optimizations, and high-performance client-side architectures.',
  keywords: ['Taufiqu', 'Muhammad Hafizh Taufiqurrohman', 'Software Engineer', 'Systems Architect', 'Indonesia', 'Laravel', 'React', 'Next.js', 'Web Developer'],
  authors: [{ name: 'Taufiqu', url: 'https://github.com/Taufiqu' }],
  openGraph: {
    title: 'Taufiqu | Systems Architect & Full-Stack Engineer',
    description: 'Muhammad Hafizh Taufiqurrohman - Computer Science student and Software Engineer focusing on scalable backend engines and high-performance architectures.',
    url: 'https://github.com/Taufiqu',
    siteName: 'Taufiqu Systems Architect Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Taufiqu Systems Architect Portfolio Banner',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taufiqu | Systems Architect & Full-Stack Engineer',
    description: 'Muhammad Hafizh Taufiqurrohman - Computer Science student and Software Engineer focusing on scalable backend engines and high-performance architectures.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'hAYHjJjj3sxwT1wQufSyBrcsWMX8YtvOLibbUDt7-TE',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable} ${plusJakartaSans.variable}`}>
      <head>
        {/* Anti-flash: apply saved theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme')||'dev';document.documentElement.setAttribute('data-theme',t);if(t==='dev')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})();`,
          }}
        />
      </head>
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
