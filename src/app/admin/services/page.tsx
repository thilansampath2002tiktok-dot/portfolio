'use client';

import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import Modal from '@/components/ui/Modal';

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Graphic Design',
    imageUrl: ''
  });

  const fetchServices = async () => {
    const res = await fetch('/api/services');
    const data = await res.json();
    if (data.success) {
      setServices(data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editingId;
    const url = isEdit ? `/api/services/${editingId}` : '/api/services';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      setIsModalOpen(false);
      fetchServices();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchServices();
    }
  };

  const openModal = (service?: any) => {
    if (service) {
      setEditingId(service.id);
      setFormData({ title: service.title, description: service.description, category: service.category, imageUrl: service.imageUrl || '' });
    } else {
      setEditingId(null);
      setFormData({ title: '', description: '', category: 'Graphic Design', imageUrl: '' });
    }
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Services</h1>
          <p className="text-gray-400 mt-1">Manage what you offer to clients.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No services found. Add one to get started.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 border-b border-gray-700">
                <th className="p-4 font-semibold text-gray-300 w-16">Image</th>
                <th className="p-4 font-semibold text-gray-300">Title</th>
                <th className="p-4 font-semibold text-gray-300">Category</th>
                <th className="p-4 font-semibold text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="p-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden flex items-center justify-center border border-gray-700">
                      {service.imageUrl ? (
                        <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-500 text-xs text-center px-1 border border-dashed border-gray-600 rounded p-1">No<br/>Img</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-white font-medium">{service.title}</td>
                  <td className="p-4 text-gray-400">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      service.category === 'Graphic Design' 
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {service.category}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end space-x-2">
                    <button onClick={() => openModal(service)} title="Edit service" aria-label="Edit service" className="p-2 text-gray-400 hover:text-blue-400 transition-colors bg-gray-800 rounded-lg shrink-0">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(service.id)} title="Delete service" aria-label="Delete service" className="p-2 text-gray-400 hover:text-red-400 transition-colors bg-gray-800 rounded-lg shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Service' : 'Add New Service'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="service-title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input id="service-title" title="Service title" placeholder="Enter service title" aria-label="Service title" required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="service-desc" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea id="service-desc" title="Service description" placeholder="Enter service description" aria-label="Service description" required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
          </div>
          <div>
            <label htmlFor="service-img" className="block text-sm font-medium text-gray-300 mb-1">Service Image (Optional, Max 5MB)</label>
            <div className="flex items-center space-x-4">
              {formData.imageUrl && (
                <div className="w-16 h-16 rounded-lg bg-gray-800 overflow-hidden shrink-0 border border-gray-700">
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <input id="service-img" title="Service image upload" aria-label="Image upload" type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700" />
            </div>
          </div>
          <div>
            <label htmlFor="service-cat" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
            <select id="service-cat" title="Service category" aria-label="Service category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Graphic Design">Graphic Design (CreativeSpark)</option>
              <option value="System Development">System Development (Syntax Solutions)</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-300 hover:text-white transition-colors">Cancel</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
