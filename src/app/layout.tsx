import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Flight Search | Transavia',
  description: 'Search available Transavia flights from Amsterdam Schiphol.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}