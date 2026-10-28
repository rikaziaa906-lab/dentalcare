import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  UserPlus, 
  FileText, 
  Calendar, 
  Phone, 
  MapPin, 
  IdCard,
  Heart,
  Briefcase,
  GraduationCap,
  Users as UsersIcon,
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Patients: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const patients = [
    { id: 'RM001', name: 'Budi Santoso', nik: '3201234567890001', gender: 'Laki-laki', birthDate: '1985-05-12', phone: '081234567890', address: 'Jl. Merdeka No. 10, Jakarta', insurance: 'BPJS' },
    { id: 'RM002', name: 'Siti Aminah', nik: '3201234567890002', gender: 'Perempuan', birthDate: '1992-08-24', phone: '081298765432', address: 'Jl. Mawar No. 5, Bandung', insurance: 'Mandiri Inhealth' },
    { id: 'RM003', name: 'Andi Wijaya', nik: '3201234567890003', gender: 'Laki-laki', birthDate: '1978-11-03', phone: '081345678901', address: 'Jl. Melati No. 22, Surabaya', insurance: 'Umum' },
    { id: 'RM004', name: 'Dewi Lestari', nik: '3201234567890004', gender: 'Perempuan', birthDate: '1995-02-15', phone: '081398765433', address: 'Jl. Anggrek No. 8, Medan', insurance: 'BPJS' },
    { id: 'RM005', name: 'Rina Herawati', nik: '3201234567890005', gender: 'Perempuan', birthDate: '1988-07-20', phone: '081456789012', address: 'Jl. Kamboja No. 15, Semarang', insurance: 'BPJS' },
  ];

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.nik.includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Data Pasien</h1>
          <p className="text-slate-500 text-sm">Kelola data identitas dan rekam medis pasien Anda.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="pink-btn flex items-center gap-2 shadow-lg shadow-pink-200"
        >
          <Plus size={20} />
          Tambah Pasien Baru
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Cari berdasarkan Nama, NIK, atau No. Rekam Medis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-pink-500/20 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Patient List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">No. RM / NIK</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Pasien</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jenis Kelamin</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tgl Lahir</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asuransi</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-pink-600">{patient.id}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{patient.nik}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                        <UserCircle size={24} />
                      </div>
                      <span className="text-sm font-bold text-slate-800">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{patient.gender}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{new Date(patient.birthDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      patient.insurance === 'BPJS' ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"
                    )}>
                      {patient.insurance}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => navigate(`/medical-record/${patient.id}`)}
                        className="p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all"
                        title="Rekam Medis"
                      >
                        <FileText size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPatients.length === 0 && (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Search size={40} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Tidak ada pasien ditemukan</h3>
            <p className="text-slate-500 text-sm">Coba kata kunci lain atau tambah pasien baru.</p>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-200">
                    <UserPlus size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Tambah Pasien Baru</h2>
                    <p className="text-slate-500 text-sm">Lengkapi data identitas dan sosial pasien.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10">
                {/* Identity Section */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 text-pink-600">
                    <IdCard size={20} />
                    <h3 className="font-bold text-lg">Identitas Pasien</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nama Lengkap</label>
                      <input type="text" className="pink-input" placeholder="Contoh: Budi Santoso" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">NIK</label>
                      <input type="text" className="pink-input" placeholder="16 digit NIK" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">No. Rekam Medis</label>
                      <input type="text" className="pink-input" placeholder="Otomatis" disabled />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tanggal Lahir</label>
                      <input type="date" className="pink-input" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Jenis Kelamin</label>
                      <select className="pink-input">
                        <option value="">Pilih</option>
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">No. HP / WhatsApp</label>
                      <input type="text" className="pink-input" placeholder="0812..." />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alamat Lengkap</label>
                      <textarea className="pink-input h-24" placeholder="Alamat sesuai KTP..."></textarea>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Asuransi / Penjamin</label>
                      <select className="pink-input">
                        <option value="umum">Umum (Mandiri)</option>
                        <option value="bpjs">BPJS Kesehatan</option>
                        <option value="asuransi">Asuransi Swasta</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Social Data Section */}
                <section className="space-y-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-blue-600">
                    <UsersIcon size={20} />
                    <h3 className="font-bold text-lg">Data Sosial</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pekerjaan</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" className="pink-input pl-10" placeholder="Contoh: PNS, Karyawan Swasta" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pendidikan Terakhir</label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <select className="pink-input pl-10">
                          <option value="">Pilih Pendidikan</option>
                          <option value="sd">SD</option>
                          <option value="smp">SMP</option>
                          <option value="sma">SMA/SMK</option>
                          <option value="d3">Diploma (D3)</option>
                          <option value="s1">Sarjana (S1)</option>
                          <option value="s2">Magister (S2)</option>
                          <option value="s3">Doktor (S3)</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status Pernikahan</label>
                      <div className="relative">
                        <Heart className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <select className="pink-input pl-10">
                          <option value="">Pilih Status</option>
                          <option value="belum">Belum Menikah</option>
                          <option value="menikah">Menikah</option>
                          <option value="cerai_hidup">Cerai Hidup</option>
                          <option value="cerai_mati">Cerai Mati</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pendapatan Per Bulan</label>
                      <select className="pink-input">
                        <option value="">Pilih Rentang</option>
                        <option value="<2jt">{"< Rp 2.000.000"}</option>
                        <option value="2-5jt">Rp 2.000.000 - Rp 5.000.000</option>
                        <option value="5-10jt">Rp 5.000.000 - Rp 10.000.000</option>
                        <option value=">10jt">{"> Rp 10.000.000"}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aktivitas Rekreasi</label>
                      <input type="text" className="pink-input" placeholder="Contoh: Olahraga, Traveling" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pentingnya Kes. Gigi (1-10)</label>
                      <div className="flex items-center gap-4">
                        <input type="range" min="1" max="10" className="flex-1 accent-pink-500" />
                        <span className="text-sm font-bold text-pink-600 w-6 text-center">5</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4 shrink-0">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-white transition-all"
                >
                  Batal
                </button>
                <button 
                  className="px-8 py-2.5 rounded-xl bg-pink-500 text-white font-bold text-sm shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all flex items-center gap-2"
                >
                  Simpan Pasien
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const UserCircle = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default Patients;
