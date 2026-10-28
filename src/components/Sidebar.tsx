import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  Activity,
  Menu,
  X,
  HeartPulse
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Data Pasien', path: '/patients' },
    { icon: Calendar, label: 'Jadwal & Janji', path: '/appointments' },
    { icon: FileText, label: 'Rekam Medis', path: '/medical-records' },
    { icon: HeartPulse, label: 'Rekam Dental Hygiene', path: '/dental-hygiene' },
    { icon: ShieldCheck, label: 'Manajemen Admin', path: '/admin' },
    { icon: Activity, label: 'Laporan', path: '/reports' },
    { icon: Settings, label: 'Pengaturan', path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed top-0 left-0 h-full bg-white border-r border-pink-100 z-50 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-0 lg:w-20 overflow-hidden"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-8 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-pink-500/20 rotate-3 group-hover:rotate-0 transition-transform">
              <HeartPulse size={28} />
            </div>
            {isOpen && (
              <div className="flex flex-col">
                <span className="font-black text-2xl text-slate-900 tracking-tighter leading-none">
                  Gigi<span className="text-pink-500">Berseri</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Dental Care</span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                    isActive 
                      ? "bg-pink-500 text-white shadow-lg shadow-pink-200" 
                      : "text-slate-500 hover:bg-pink-50 hover:text-pink-600"
                  )}
                >
                  <item.icon size={22} className={cn(isActive ? "text-white" : "group-hover:text-pink-600")} />
                  {isOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-pink-50">
            <button className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full",
              !isOpen && "justify-center"
            )}>
              <LogOut size={22} />
              {isOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
