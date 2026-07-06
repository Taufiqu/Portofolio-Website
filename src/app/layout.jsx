import './globals.css';

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
  icons: {
    icon: '/favicon.ico',
  },
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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
