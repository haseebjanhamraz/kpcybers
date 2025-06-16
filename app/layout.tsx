import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KP Cybers - Professional Web Development & Digital Solutions in Peshawar',
  description: 'Leading web development, digital marketing, and networking solutions company in Peshawar, Pakistan. Expert mobile app development, CMS solutions, and comprehensive digital services.',
  keywords: 'web development Peshawar, digital marketing, networking solutions, mobile app development, CMS development, KP Cybers',
  authors: [{ name: 'KP Cybers' }],
  creator: 'KP Cybers',
  publisher: 'KP Cybers',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kpcybers.pk',
    title: 'KP Cybers - Professional Digital Solutions',
    description: 'Leading digital solutions provider in Peshawar, Pakistan, offering web development, digital marketing, and networking services.',
    siteName: 'KP Cybers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KP Cybers - Professional Digital Solutions',
    description: 'Leading digital solutions provider in Peshawar, Pakistan, offering web development, digital marketing, and networking services.',
  },
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Header />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}