import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';
import { id } from 'date-fns/locale';

const Appointments: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const appointments = [
    { id: 1, time: '09:00', patient: 'Budi Santoso', type: 'Scaling', status: 'Selesai', phone: '081234567890' },
    { id: 2, time: '10:30', patient: 'Siti Aminah', type: 'Konsultasi', status: 'Menunggu', phone: '081298765432' },
    { id: 3, time: '13:00', patient: 'Andi Wijaya', type: 'Pencabutan', status: 'Terjadwal', phone: '081345678901' },
    { id: 4, time: '14:30', patient: 'Dewi Lestari', type: 'Edukasi OH', status: 'Terjadwal', phone: '081398765433' },
    { id: 5, time: '16:00', patient: 'Rina Herawati', type: 'Kontrol Rutin', status: 'Terjadwal', phone: '081456789012' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Jadwal & Janji Temu</h1>
          <p className="text-slate-500 text-sm">Kelola antrian dan jadwal kunjungan pasien Anda.</p>
        </div>
        <button className="pink-btn flex items-center gap-2 shadow-lg shadow-pink-200">
          <Plus size={20} />
          Buat Janji Temu
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800">{format(currentDate, 'MMMM yyyy', { locale: id })}</h3>
              <div className="flex gap-1">
                <button 
                  onClick={() => setCurrentDate(subWeeks(currentDate, 1))}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setCurrentDate(addWeeks(currentDate, 1))}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((day, idx) => (
                <div key={idx} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "aspect-square rounded-xl flex flex-col items-center justify-center transition-all",
                    isSameDay(day, selectedDate) 
                      ? "bg-pink-500 text-white shadow-lg shadow-pink-200 font-bold" 
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <span className="text-sm">{format(day, 'd')}</span>
                  {isSameDay(day, new Date()) && !isSameDay(day, selectedDate) && (
                    <div className="w-1 h-1 rounded-full bg-pink-500 mt-0.5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-[32px] shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Statistik Hari Ini</h3>
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Total Pasien</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Selesai</span>
                  <span className="font-bold text-emerald-400">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Menunggu</span>
                  <span className="font-bold text-amber-400">6</span>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Cari jadwal pasien..."
                className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-pink-500/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-50 text-pink-600 text-sm font-bold">
              <CalendarIcon size={18} />
              {format(selectedDate, 'd MMMM yyyy', { locale: id })}
            </div>
          </div>

          <div className="space-y-4">
            {appointments.map((apt) => (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={apt.id}
                className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shadow-sm shrink-0">
                      <Clock size={16} className="text-slate-400 mb-1" />
                      <span className="text-sm font-bold text-slate-800">{apt.time}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-bold text-slate-800 leading-none">{apt.patient}</h4>
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          apt.status === 'Selesai' ? "bg-emerald-100 text-emerald-600" :
                          apt.status === 'Menunggu' ? "bg-amber-100 text-amber-600" :
                          "bg-blue-100 text-blue-600"
                        )}>
                          {apt.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Activity size={14} className="text-pink-500" />
                          {apt.type}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="flex items-center gap-1.5">
                          <Phone size={14} className="text-blue-500" />
                          {apt.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 border-t sm:border-t-0 pt-4 sm:pt-0">
                    <button className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-all">
                      Reschedule
                    </button>
                    <button className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-pink-500 text-white font-bold text-xs shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all">
                      Check-in
                    </button>
                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default Appointments;
