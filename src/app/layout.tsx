import type { Metadata } from 'next';
import { INVITE_THEME } from '@/components/Floral';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://amayaandshavin.com'
  ),
  title: 'Amaya & Shavin | Wedding Invitation',
  description: 'You are cordially invited to the wedding of Amaya & Shavin — 10th October 2026',
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png', sizes: '1024x1024' }],
    apple: [{ url: '/logo.png', type: 'image/png', sizes: '1024x1024' }],
  },
  openGraph: {
    title: 'Amaya & Shavin | Wedding Invitation',
    description: 'You are cordially invited to the wedding of Amaya & Shavin — 10th October 2026',
    siteName: 'Amaya & Shavin',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 1024,
        alt: 'Amaya & Shavin — Forever & Always',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Amaya & Shavin | Wedding Invitation',
    description: 'You are cordially invited to the wedding of Amaya & Shavin — 10th October 2026',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Theme lives on <html> so the ground is painted on the very first frame, before any
    // JS runs. Anything lower leaves the browser showing the default white underneath —
    // as a flash on load, and under the content when overscrolling.
    <html lang="en" className={`h-full ${INVITE_THEME}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter:wght@400;500;600;700&family=Italianno&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full antialiased">
        {children}
      </body>
    </html>
  );
}
