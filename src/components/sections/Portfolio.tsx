'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success) setProjects(data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const categories = ['All', 'Graphic Design', 'System Development'];

  const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-black relative">
      <div className="container mx-auto px-6 xl:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-0"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Works</h2>
            <p className="text-gray-400 text-lg max-w-xl">
              A glimpse into my portfolio combining creative vision with technical precision.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex space-x-2 bg-gray-900 p-1.5 rounded-xl border border-gray-800"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === cat 
                    ? 'bg-gray-800 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-20">Loading portfolio...</div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-gray-600 transition-colors"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white translate-y-4 group-hover:translate-y-0 transition-transform">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded w-fit capitalize font-medium ${
                        project.category === 'Graphic Design' 
                          ? 'bg-purple-500/10 text-purple-400'
                          : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {project.category.split(' ')[0]}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech: string, i: number) => (
                        <span key={i} className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-500">
                No projects found in this category.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
