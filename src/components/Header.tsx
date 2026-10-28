import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="h-24 bg-white/70 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-30 px-8 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <button 
          onClick={onMenuClick}
          className="p-3 rounded-2xl hover:bg-pink-50 text-slate-600 lg:hidden transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <div className="hidden md:flex items-center gap-3 bg-slate-100/50 px-5 py-3 rounded-2xl border border-slate-200/50 w-96 group focus-within:bg-white focus-within:border-pink-300 transition-all duration-300">
          <Search size={20} className="text-slate-400 group-focus-within:text-pink-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Cari pasien atau rekam medis..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-3 rounded-2xl hover:bg-pink-50 text-slate-500 transition-all duration-300 hover:scale-110">
          <Bell size={24} />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
        
        <div className="h-10 w-px bg-slate-100"></div>
        
        <div className="flex items-center gap-4 pl-2 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-slate-800 leading-none group-hover:text-pink-600 transition-colors">Drg. Anisa Putri</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Dokter Gigi Utama</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 border-2 border-white shadow-lg shadow-pink-500/5 flex items-center justify-center text-pink-600 overflow-hidden group-hover:scale-105 transition-transform">
            <User size={28} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
