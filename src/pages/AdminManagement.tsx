import React, { useState } from 'react';
import { User, Shield, Check, X, Plus, Search } from 'lucide-react';

const AdminManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'Petugas Administrasi' });
  const [admins, setAdmins] = useState([
    { id: '1', name: 'Dr. Ahmad Fauzi', role: 'Admin Utama', email: 'ahmad@dentacare.com', status: 'Aktif' },
    { id: '2', name: 'Siti Aminah', role: 'Petugas Administrasi', email: 'siti@dentacare.com', status: 'Aktif' },
    { id: '3', name: 'Budi Santoso', role: 'Terapis Gigi', email: 'budi@dentacare.com', status: 'Non-Aktif' },
  ]);

  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setAdmins(admins.map(admin => 
      admin.id === id ? { ...admin, status: admin.status === 'Aktif' ? 'Non-Aktif' : 'Aktif' } : admin
    ));
  };

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (admins.length + 1).toString();
    setAdmins([...admins, { ...newAdmin, id, status: 'Aktif' }]);
    setIsModalOpen(false);
    setNewAdmin({ name: '', email: '', role: 'Petugas Administrasi' });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Hak Akses</h1>
          <p className="text-slate-500 mt-1">Kelola siapa saja yang dapat mengakses sistem GigiBerseri.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="pink-btn flex items-center gap-2 shadow-lg shadow-pink-200"
        >
          <Plus size={20} />
          Tambah Admin Baru
        </button>
      </div>

      <div className="pink-card overflow-hidden">
        <div className="p-4 border-b border-pink-50 flex flex-col md:flex-row gap-4 items-center justify-between bg-pink-50/30">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama atau email..." 
              className="pink-input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pink-50/50 text-pink-600 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Nama Pengguna</th>
                <th className="px-6 py-4">Role / Jabatan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-pink-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-bold">
                        {admin.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{admin.name}</p>
                        <p className="text-xs text-slate-500">{admin.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-pink-400" />
                      <span className="text-sm text-slate-600 font-medium">{admin.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      admin.status === 'Aktif' ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"
                    )}>
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => toggleStatus(admin.id)}
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          admin.status === 'Aktif' ? "hover:bg-rose-50 text-rose-500" : "hover:bg-emerald-50 text-emerald-500"
                        )} 
                        title={admin.status === 'Aktif' ? "Non-aktifkan" : "Aktifkan"}
                      >
                        {admin.status === 'Aktif' ? <X size={18} /> : <Check size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Admin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-lg">Tambah Admin Baru</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddAdmin} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
                <input 
                  type="text" 
                  className="pink-input" 
                  required 
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email</label>
                <input 
                  type="email" 
                  className="pink-input" 
                  required 
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Role / Jabatan</label>
                <select 
                  className="pink-input"
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                >
                  <option>Admin Utama</option>
                  <option>Dokter Gigi</option>
                  <option>Terapis Gigi</option>
                  <option>Petugas Administrasi</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-1 pink-btn py-3 text-sm"
                >
                  Simpan Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import { cn } from '../lib/utils';
export default AdminManagement;
