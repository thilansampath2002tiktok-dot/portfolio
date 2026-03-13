'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Layers } from 'lucide-react';

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/services');
        const data = await res.json();
        if (data.success) setServices(data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-24 bg-gray-950 relative">
      <div className="container mx-auto px-6 xl:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Expertise</h2>
          <p className="text-gray-400 text-lg">
            Delivering end-to-end solutions, from pixel-perfect designs to fully functional systems.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading services...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const isDesign = service.category === 'Graphic Design';
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:bg-gray-800/80 transition-colors group relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full -mr-10 -mt-10 transition-opacity opacity-20 group-hover:opacity-40 pointer-events-none ${isDesign ? 'bg-purple-500' : 'bg-blue-500'}`} />
                  
                  {service.imageUrl ? (
                    <div className="w-16 h-16 rounded-xl overflow-hidden mb-6 shadow-lg border border-gray-800">
                      <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg ${isDesign ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {isDesign ? <LayoutGrid className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
