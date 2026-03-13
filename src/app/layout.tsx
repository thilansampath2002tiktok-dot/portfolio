import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CreativeSpark & Syntax Solutions',
  description: 'Portfolio combining modern graphic design with robust system development.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased selection:bg-purple-500/30 overflow-x-hidden`}>
        {/* We wrap Navbar in a conditional inside its own structure, but since this is global layout, 
            Navbar should appear on all public routes. For admin routes, we might need a custom layout, 
            but Admin has its own layout which overwrites portions if not nested properly.
            Actually, Next.js 13+ nested layouts in app/ do stack. Let's hide navbar strictly via CSS or 
            better yet, we'll exclude Navbar from the admin group using route groups. 
            Since we didn't use route groups, we can conditionally render it, but we can't use 'use client' here.
            Instead, we rely on the generic layout and AdminLayout will just be nested inside. 
            To prevent Navbar from showing on Admin, we could use a client component wrapper.
        */}
        <div className="flex flex-col min-h-[100dvh]">
          {children}
        </div>
      </body>
    </html>
  );
}
