'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[80vh] relative z-10">
        
        {/* CreativeSpark Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center items-center md:items-end text-center md:text-right pr-0 md:pr-12 md:border-r border-gray-800/50 py-12 md:py-0"
        >
          <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
            <Palette className="w-8 h-8 text-purple-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-600">
              CreativeSpark
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-sm mb-8 leading-relaxed">
            Elevating brands through stunning visual identity, UI/UX design, and creative mastery.
          </p>
          <a 
            href="#portfolio"
            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors group"
          >
            <span>View Design Portfolio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Syntax Solutions Side */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col justify-center items-center md:items-start text-center md:text-left pl-0 md:pl-12 py-12 md:py-0"
        >
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
            <Code className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600">
              Syntax Solutions
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-sm mb-8 leading-relaxed">
            Building robust, scalable system architecture and flawless web experiences.
          </p>
          <a 
            href="#portfolio"
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors group"
          >
            <span>View Tech Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
