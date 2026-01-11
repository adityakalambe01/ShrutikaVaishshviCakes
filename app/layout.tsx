import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import {ReduxProvider} from "@/store/provider";
import {Toaster} from "sonner";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Cakes & Artistry | Handcrafted Cakes, Paintings & Bouquets',
  description:
      'Cakes & Artistry by Shrutika & Vaishnavi offers handcrafted premium cakes, custom cake designs, artistic portrait paintings, and elegant chocolate bouquets. Crafted with passion for every celebration.',
  keywords: [
    'custom cakes',
    'premium cakes',
    'cake artistry',
    'portrait paintings',
    'chocolate bouquets',
    'custom cake orders',
    'handcrafted cakes',
    'Shrutika',
    'Vaishnavi',
    'cake studio',
  ],
  authors: [
    { name: 'Shrutika & Vaishnavi' },
  ],
  creator: 'Cakes & Artistry',
  metadataBase: new URL('https://cakeartistry.shop'),
  openGraph: {
    title: 'Cakes & Artistry | Handcrafted Cakes & Creative Art',
    description:
        'Discover premium handcrafted cakes, custom designs, portrait paintings, and chocolate bouquets by Shrutika & Vaishnavi. Perfect for birthdays, weddings, and special moments.',
    url: 'https://cakeartistry.shop',
    siteName: 'Cakes & Artistry',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cakes & Artistry – Custom Cakes and Art',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cakes & Artistry | Custom Cakes & Art',
    description:
        'Handcrafted cakes, custom cake designs, portrait paintings, and chocolate bouquets by Shrutika & Vaishnavi.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.png',
        // type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <ReduxProvider>{children}</ReduxProvider>
        <Analytics />
        <Toaster
            position="bottom-right"
            richColors
        />
      </body>
    </html>
  )
}
