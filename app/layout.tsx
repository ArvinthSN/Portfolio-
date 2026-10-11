import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Arvinth SN — Intelligent Systems',
  description: 'Software Engineer building intelligent systems.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
