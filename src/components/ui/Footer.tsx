import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-12 border-t border-gray-900">
      <div className="container mx-auto px-6 xl:px-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        <div>
          <Link href="/#" className="inline-block font-black text-2xl tracking-tighter mb-2">
            <span className="text-purple-500">Creative</span>
            <span className="text-blue-500">Syntax</span>
          </Link>
          <p className="text-gray-500 text-sm">
            Fusing Graphic Design with Setup Mastery.
          </p>
        </div>

        <div className="flex space-x-6 text-sm font-medium text-gray-400">
          <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
          <Link href="/#portfolio" className="hover:text-white transition-colors">Portfolio</Link>
          <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        <p className="text-gray-600 text-sm">
          &copy; {currentYear} CreativeSpark & Syntax Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
