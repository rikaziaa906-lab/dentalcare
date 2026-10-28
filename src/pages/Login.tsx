import React, { useState } from 'react';
import { 
  ClipboardList, 
  Lock, 
  User, 
  ChevronRight, 
  ShieldCheck, 
  Stethoscope, 
  Users, 
  Settings 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const roles = [
    { id: 'admin', label: 'Admin', icon: Settings, color: 'bg-slate-500' },
    { id: 'dentist', label: 'Dokter Gigi', icon: Stethoscope, color: 'bg-blue-500' },
    { id: 'tgm', label: 'Terapis Gigi', icon: ShieldCheck, color: 'bg-pink-500' },
    { id: 'staff', label: 'Staf Admin', icon: Users, color: 'bg-amber-500' },
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-200">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-pink-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
                <ClipboardList size={28} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl leading-tight tracking-tight">DentalCare</span>
                <span className="text-xs uppercase tracking-[0.2em] text-pink-500 font-bold">RME System</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-6 tracking-tight">
              Sistem Asuhan Kesehatan Gigi & Mulut Individu
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Platform rekam medis elektronik terintegrasi untuk pelayanan kesehatan gigi yang lebih akurat, aman, dan efisien.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400">
                <ShieldCheck size={20} />
              </div>
              <p className="text-sm text-slate-300">Sesuai standar Kemenkes RI & WHO</p>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <Lock size={20} />
              </div>
              <p className="text-sm text-slate-300">Enkripsi data & Keamanan berlapis</p>
            </div>
          </div>

          {/* Background Decorations */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-pink-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px]" />
        </div>

        {/* Right Side - Form */}
        <div className="p-8 sm:p-16 flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">Selamat Datang</h2>
                  <p className="text-slate-500">Pilih peran Anda untuk melanjutkan akses sistem.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className="group p-6 rounded-3xl border-2 border-slate-100 hover:border-pink-500 hover:bg-pink-50/30 transition-all text-left flex flex-col gap-4"
                    >
                      <div className={`w-12 h-12 rounded-2xl ${role.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <role.icon size={24} />
                      </div>
                      <span className="font-bold text-slate-700 group-hover:text-pink-600 transition-colors">{role.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <button 
                  onClick={() => setStep(1)}
                  className="text-slate-400 hover:text-pink-500 text-sm font-bold flex items-center gap-2 mb-4 group"
                >
                  <ChevronRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Kembali ke Pilih Peran
                </button>

                <div>
                  <h2 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">Login {roles.find(r => r.id === selectedRole)?.label}</h2>
                  <p className="text-slate-500">Masukkan kredensial Anda untuk masuk ke dashboard.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email / Username</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all outline-none"
                        placeholder="Masukkan email atau username..."
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="password" 
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all outline-none"
                        placeholder="Masukkan password..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-slate-200 text-pink-500 focus:ring-pink-500 transition-all" />
                    <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors">Ingat saya</span>
                  </label>
                  <button className="text-sm font-bold text-pink-500 hover:underline">Lupa Password?</button>
                </div>

                <button 
                  onClick={() => window.location.href = '/'}
                  className="w-full py-4 rounded-2xl bg-pink-500 text-white font-bold text-lg shadow-xl shadow-pink-500/20 hover:bg-pink-600 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  Masuk ke Dashboard
                  <ChevronRight size={22} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 text-xs w-full text-center">
            &copy; 2026 DentalCare RME. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
