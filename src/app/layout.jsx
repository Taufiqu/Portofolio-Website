import './globals.css';

export const metadata = {
  title: 'Taufiqu | Systems Architect & Full-Stack Engineer',
  description: 'Muhammad Hafizh Taufiqurrohman - Computer Science student and Software Engineer focusing on scalable backend engines, server optimizations, and high-performance client-side architectures.',
  keywords: ['Taufiqu', 'Muhammad Hafizh Taufiqurrohman', 'Software Engineer', 'Systems Architect', 'Indonesia', 'Laravel', 'React', 'Next.js', 'Web Developer'],
  authors: [{ name: 'Taufiqu', url: 'https://github.com/Taufiqu' }],
  icons: {
    icon: '/favicon.ico',
  }
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
