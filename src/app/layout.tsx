import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Amaya & Shavin | Wedding Invitation',
  description: 'You are cordially invited to the wedding of Amaya & Shavin — 10th October 2026',
  icons: { icon: '/logo.png' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full antialiased">
        {children}
        <footer className="text-center py-8 text-warm-gray-light text-sm border-t border-ivory-dark mt-8">
          <p>Amaya & Shavin — Forever & Always</p>
        </footer>
      </body>
    </html>
  );
}
