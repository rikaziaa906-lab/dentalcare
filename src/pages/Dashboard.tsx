import React from 'react';
import { 
  Users, 
  Calendar, 
  Activity, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Search,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jan', dmft: 2.4, ohis: 1.2 },
  { name: 'Feb', dmft: 2.1, ohis: 1.1 },
  { name: 'Mar', dmft: 2.3, ohis: 1.3 },
  { name: 'Apr', dmft: 1.9, ohis: 0.9 },
  { name: 'May', dmft: 1.7, ohis: 0.8 },
  { name: 'Jun', dmft: 1.5, ohis: 0.7 },
];

const statusData = [
  { name: 'Baik', value: 45, color: '#10b981' },
  { name: 'Sedang', value: 35, color: '#f59e0b' },
  { name: 'Buruk', value: 20, color: '#ef4444' },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
        <Icon size={24} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trendValue}%
        </div>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-slate-800 tracking-tight">{value}</p>
  </motion.div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 text-sm">Selamat datang kembali, Dr. Sarah. Berikut ringkasan hari ini.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 flex items-center gap-2">
            <Calendar size={16} />
            {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Pasien" 
          value="1,284" 
          icon={Users} 
          trend="up" 
          trendValue="12" 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Kunjungan Hari Ini" 
          value="24" 
          icon={Calendar} 
          trend="up" 
          trendValue="8" 
          color="bg-pink-500" 
        />
        <StatCard 
          title="Rata-rata DMF-T" 
          value="1.8" 
          icon={Activity} 
          trend="down" 
          trendValue="4" 
          color="bg-emerald-500" 
        />
        <StatCard 
          title="Follow-up Tertunda" 
          value="12" 
          icon={AlertCircle} 
          color="bg-amber-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Tren Kesehatan Gigi</h3>
              <p className="text-slate-500 text-xs">Statistik DMF-T & OHI-S 6 bulan terakhir</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500" />
                <span className="text-xs font-medium text-slate-600">DMF-T</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs font-medium text-slate-600">OHI-S</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorDmft" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOhis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="dmft" 
                  stroke="#ec4899" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorDmft)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="ohis" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorOhis)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Population Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-2">Status Populasi</h3>
          <p className="text-slate-500 text-xs mb-8">Distribusi kesehatan gigi pasien</p>
          <div className="h-[200px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 w-full">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appointments List */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Kunjungan Hari Ini</h3>
            <button className="text-pink-500 text-xs font-bold hover:underline">Lihat Semua</button>
          </div>
          <div className="space-y-4">
            {[
              { time: '09:00', name: 'Budi Santoso', type: 'Scaling', status: 'Selesai' },
              { time: '10:30', name: 'Siti Aminah', type: 'Konsultasi', status: 'Menunggu' },
              { time: '13:00', name: 'Andi Wijaya', type: 'Pencabutan', status: 'Terjadwal' },
              { time: '15:30', name: 'Dewi Lestari', type: 'Edukasi OH', status: 'Terjadwal' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center shadow-sm">
                    <Clock size={14} className="text-slate-400 mb-0.5" />
                    <span className="text-[10px] font-bold text-slate-800">{item.time}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.name}</p>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{item.type}</p>
                  </div>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                  item.status === 'Selesai' ? "bg-emerald-100 text-emerald-600" :
                  item.status === 'Menunggu' ? "bg-amber-100 text-amber-600" :
                  "bg-blue-100 text-blue-600"
                )}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications / Follow-up */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Notifikasi Follow-up</h3>
            <button className="text-pink-500 text-xs font-bold hover:underline">Tandai Dibaca</button>
          </div>
          <div className="space-y-4">
            {[
              { patient: 'Rina Herawati', message: 'Jadwal kontrol rutin 6 bulan', date: 'Besok' },
              { patient: 'Farhan Malik', message: 'Evaluasi pasca scaling 1 minggu', date: '2 Hari lagi' },
              { patient: 'Linda Sari', message: 'Pengingat edukasi diet karies', date: '3 Hari lagi' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-pink-50/50 border border-pink-100">
                <div className="p-2 rounded-lg bg-pink-100 text-pink-600">
                  <Bell size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-slate-800">{item.patient}</p>
                    <span className="text-[10px] font-bold text-pink-500 uppercase">{item.date}</span>
                  </div>
                  <p className="text-xs text-slate-500">{item.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                <TrendingUp size={16} className="text-pink-400" />
                Tips Hari Ini
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Pasien dengan OHI-S buruk meningkat 5% bulan ini. Pertimbangkan untuk meningkatkan intensitas edukasi menyikat gigi pada setiap kunjungan."
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default Dashboard;
