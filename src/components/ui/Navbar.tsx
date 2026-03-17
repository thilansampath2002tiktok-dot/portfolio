'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#' },
    { name: 'Services', href: '/#services' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 xl:px-12 flex justify-between items-center">
        <Link href="/#" className="flex items-center space-x-2 shrink-0">
          <div className="font-black text-2xl tracking-tighter">
            <span className="text-purple-500">Creative</span>
            <span className="text-blue-500">Syntax</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white font-medium text-sm transition-colors tracking-wide uppercase"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
          >
            Let's Talk
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-gray-900 border-b border-gray-800 shadow-2xl md:hidden flex flex-col items-center py-6 space-y-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white font-medium text-lg uppercase tracking-wide"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium text-lg w-3/4 text-center shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            >
              Let's Talk
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
