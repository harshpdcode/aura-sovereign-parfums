import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import LuxuryNavbar from '@/components/ui/LuxuryNavbar';
import LuxuryFooter from '@/components/ui/LuxuryFooter';
import CartDrawer from '@/components/ui/CartDrawer';
import SearchOverlay from '@/components/ui/SearchOverlay';
import ScentFinderModal from '@/components/ui/ScentFinderModal';
import Toast from '@/components/ui/Toast';
import CustomCursor from '@/components/animations/CustomCursor';

export const metadata: Metadata = {
  title: 'AURA SOVEREIGN | Haute Parfumerie & Luxury Fragrance Showroom',
  description:
    'Experience the pinnacle of fine fragrance. Handcrafted pure perfume extraits, rare natural essences, and bespoke olfactory compositions by Aura Sovereign Paris.',
  keywords: ['luxury perfume', 'extrait de parfum', 'niche fragrance', 'aura sovereign', 'oud', 'santal', 'haute parfumerie'],
  openGraph: {
    title: 'AURA SOVEREIGN | Haute Parfumerie Paris',
    description: 'Bespoke high-perfumery extraits crafted with the rarest harvests on earth.',
    url: 'https://aurasovereign.com',
    siteName: 'Aura Sovereign Haute Parfumerie',
    images: [
      {
        url: '/Perfume/generated/hero_santal.jpg',
        width: 1200,
        height: 630,
        alt: 'Aura Sovereign Luxury Perfume',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-obsidian text-ivory font-sans antialiased selection:bg-gold selection:text-obsidian min-h-screen flex flex-col justify-between">
        <AppProvider>
          <CustomCursor />
          <LuxuryNavbar />
          <main className="flex-1 w-full">{children}</main>
          <LuxuryFooter />

          {/* Global Drawers & Modals */}
          <CartDrawer />
          <SearchOverlay />
          <ScentFinderModal />
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
