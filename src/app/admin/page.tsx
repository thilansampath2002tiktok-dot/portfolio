'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FormInput, Briefcase, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ services: 0, projects: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [servicesRes, projectsRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/projects')
        ]);
        
        const servicesData = await servicesRes.json();
        const projectsData = await projectsRes.json();
        
        setStats({
          services: servicesData.data?.length || 0,
          projects: projectsData.data?.length || 0
        });
      } catch (e) {
        console.error('Failed to load stats', e);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-1">Welcome back. Here is the current status of your portfolio data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Services Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <FormInput className="w-24 h-24 text-blue-500" />
          </div>
          <div className="relative z-10 flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mr-4">
              <FormInput className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-white">Services</h2>
          </div>
          <div className="relative z-10 flex items-end justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Active</p>
              {loading ? (
                <div className="h-10 w-16 bg-gray-800 animate-pulse rounded"></div>
              ) : (
                <p className="text-5xl font-bold text-white">{stats.services}</p>
              )}
            </div>
            <Link href="/admin/services" className="flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Manage <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Projects Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Briefcase className="w-24 h-24 text-purple-500" />
          </div>
          <div className="relative z-10 flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mr-4">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-white">Projects</h2>
          </div>
          <div className="relative z-10 flex items-end justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Published</p>
              {loading ? (
                <div className="h-10 w-16 bg-gray-800 animate-pulse rounded"></div>
              ) : (
                <p className="text-5xl font-bold text-white">{stats.projects}</p>
              )}
            </div>
            <Link href="/admin/projects" className="flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Manage <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
