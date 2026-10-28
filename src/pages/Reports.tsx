import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity, 
  Download, 
  Filter, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  PieChart as PieChartIcon,
  FileText,
  Search
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { motion } from 'framer-motion';

const prevalenceData = [
  { name: 'Karies', value: 45, color: '#ec4899' },
  { name: 'Gingivitis', value: 30, color: '#3b82f6' },
  { name: 'Periodontitis', value: 15, color: '#10b981' },
  { name: 'Halitosis', value: 10, color: '#f59e0b' },
];

const visitData = [
  { name: 'Sen', visits: 12 },
  { name: 'Sel', visits: 18 },
  { name: 'Rab', visits: 15 },
  { name: 'Kam', visits: 22 },
  { name: 'Jum', visits: 20 },
  { name: 'Sab', visits: 10 },
  { name: 'Min', visits: 5 },
];

const dmftTrend = [
  { month: 'Jan', avg: 2.4 },
  { month: 'Feb', avg: 2.1 },
  { month: 'Mar', avg: 2.3 },
  { month: 'Apr', avg: 1.9 },
  { month: 'May', avg: 1.7 },
  { month: 'Jun', avg: 1.5 },
];

const Reports: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Pelaporan & Analitik</h1>
          <p className="text-slate-500 text-sm">Analisis data epidemiologi dan statistik pelayanan kesehatan.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <Filter size={18} />
            Filter Data
          </button>
          <button className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2">
            <Download size={18} />
            Export Laporan
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Rata-rata DMF-T', value: '1.5', trend: 'down', trendValue: '12%', icon: Activity, color: 'bg-pink-500' },
          { title: 'Cakupan Pelayanan', value: '84%', trend: 'up', trendValue: '5%', icon: Users, color: 'bg-blue-500' },
          { title: 'Kepuasan Pasien', value: '4.8/5', trend: 'up', trendValue: '2%', icon: TrendingUp, color: 'bg-emerald-500' },
          { title: 'Total Kunjungan', value: '1,284', trend: 'up', trendValue: '8%', icon: Calendar, color: 'bg-amber-500' },
        ].map((stat, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={idx}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.color} bg-opacity-10 text-${stat.color.split('-')[1]}-600`}>
                <stat.icon size={22} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trendValue}
              </div>
            </div>
            <h3 className="text-slate-500 text-xs font-medium mb-1 uppercase tracking-wider">{stat.title}</h3>
            <p className="text-2xl font-bold text-slate-800 tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Prevalence Chart */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Prevalensi Penyakit</h3>
              <p className="text-slate-500 text-xs">Distribusi diagnosis terbanyak</p>
            </div>
            <PieChartIcon size={20} className="text-slate-400" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={prevalenceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {prevalenceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visit Trends */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Kunjungan Pasien</h3>
              <p className="text-slate-500 text-xs">Statistik kunjungan mingguan</p>
            </div>
            <BarChart3 size={20} className="text-slate-400" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitData}>
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
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="visits" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DMF-T Trend Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Tren DMF-T Rata-rata</h3>
              <p className="text-slate-500 text-xs">Indikator keberhasilan program kesehatan gigi masyarakat</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold flex items-center gap-2">
              <TrendingUp size={16} />
              Target Tercapai
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dmftTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
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
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="avg" 
                  stroke="#ec4899" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#ec4899', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Individual Reports Search */}
      <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Cari Laporan Individu</h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Dapatkan resume medis lengkap pasien untuk keperluan rujukan, klaim asuransi, atau arsip pribadi pasien.
          </p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Masukkan No. Rekam Medis atau Nama Pasien..."
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-pink-500/50 transition-all outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-xl bg-pink-500 text-white font-bold text-sm hover:bg-pink-600 transition-all">
              Cari
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pink-500/10 to-transparent pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-pink-500/20 rounded-full blur-[100px] pointer-events-none" />
      </div>
    </div>
  );
};

export default Reports;
