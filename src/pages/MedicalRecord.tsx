import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  PenTool, 
  Plus, 
  Trash2, 
  Info, 
  CheckCircle2, 
  AlertCircle,
  Stethoscope,
  Activity,
  ClipboardCheck,
  FileText,
  Image as ImageIcon,
  History,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Search,
  FileSignature
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DENTAL_HYGIENE_DIAGNOSIS_GUIDELINES } from '../constants/diagnosisData';

// --- Components ---

const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-6 py-4 border-b-2 transition-all duration-200 whitespace-nowrap",
      active 
        ? "border-pink-500 text-pink-600 bg-pink-50/30 font-bold" 
        : "border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50 font-medium"
    )}
  >
    <Icon size={18} />
    <span className="text-sm">{label}</span>
  </button>
);

const SectionHeader = ({ title, subtitle, icon: Icon }: any) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-200">
      <Icon size={24} />
    </div>
    <div>
      <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
      <p className="text-slate-500 text-sm">{subtitle}</p>
    </div>
  </div>
);

import { generateDHDiagnosisAnalysis, generateInterventionPlan } from '../services/geminiService';

// --- Components ---

const VerificationModal = ({ isOpen, onClose, onConfirm, data }: any) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl p-8 overflow-hidden"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Verifikasi Data RME</h3>
              <p className="text-slate-500 text-sm">Pastikan semua data sudah benar sebelum finalisasi.</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Ringkasan Diagnosis</p>
              <p className="text-sm text-slate-700 font-medium">{data.diagnosisCount} Diagnosis teridentifikasi</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tindakan</p>
              <p className="text-sm text-slate-700 font-medium">Tindakan klinis telah dicatat</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all"
            >
              Periksa Kembali
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-3 rounded-xl bg-pink-500 text-white font-bold text-sm shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all"
            >
              Ya, Simpan RME
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const MedicalRecord: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('anamnesis');
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [odontogramData, setOdontogramData] = useState<Record<number, string>>({});
  const [diagnosisData, setDiagnosisData] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [signature, setSignature] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [interventionData, setInterventionData] = useState({
    needs: '',
    plan: '',
    goals: '',
    nextVisit: ''
  });
  const sigCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleAIAnalysis = async (idx: number) => {
    setIsAnalyzing(true);
    try {
      const diag = diagnosisData[idx];
      const analysis = await generateDHDiagnosisAnalysis(diag.unmetNeed, diag.selectedCauses, diag.selectedSigns);
      const newDiagnosisData = [...diagnosisData];
      newDiagnosisData[idx].customNotes = analysis;
      setDiagnosisData(newDiagnosisData);
    } catch (error) {
      console.error("AI Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateIntervention = async () => {
    setIsAnalyzing(true);
    try {
      const mainDiagnosis = diagnosisData[0]?.unmetNeed || "Kesehatan gigi umum";
      const plan = await generateInterventionPlan(mainDiagnosis);
      setInterventionData({
        ...interventionData,
        plan: plan,
        needs: "Scaling, Edukasi OH, Fluoride Topical" // Example static for now or can be generated too
      });
    } catch (error) {
      console.error("AI Intervention generation failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFinalSave = () => {
    setIsVerifying(false);
    // Logic to save to DB
    alert("Rekam Medis Berhasil Difinalisasi!");
    navigate('/patients');
  };

  const tabs = [
    { id: 'anamnesis', label: 'Anamnesis', icon: History },
    { id: 'examination', label: 'Pemeriksaan', icon: Stethoscope },
    { id: 'odontogram', label: 'Odontogram', icon: Activity },
    { id: 'indices', label: 'Indeks', icon: BarChart3 },
    { id: 'diagnosis', label: 'Diagnosis', icon: ClipboardCheck },
    { id: 'treatment', label: 'Rencana & Tindakan', icon: PenTool },
    { id: 'education', label: 'Edukasi', icon: Info },
    { id: 'files', label: 'Files & RME', icon: ShieldCheck },
  ];

  const handleToothClick = (num: number) => {
    setSelectedTooth(num);
  };

  const updateToothStatus = (status: string) => {
    if (selectedTooth) {
      setOdontogramData({ ...odontogramData, [selectedTooth]: status });
      setSelectedTooth(null);
    }
  };

  const addDiagnosis = (guidelineId: string) => {
    const guideline = DENTAL_HYGIENE_DIAGNOSIS_GUIDELINES.find(g => g.id === guidelineId);
    if (guideline) {
      setDiagnosisData([...diagnosisData, { 
        ...guideline, 
        selectedCauses: [], 
        selectedSigns: [],
        customNotes: ''
      }]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <VerificationModal 
        isOpen={isVerifying} 
        onClose={() => setIsVerifying(false)} 
        onConfirm={handleFinalSave}
        data={{ diagnosisCount: diagnosisData.length }}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/patients')}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Rekam Medis Elektronik</h1>
              <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-[10px] font-bold uppercase tracking-widest">Aktif</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="font-bold text-slate-700">{id}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>Budi Santoso</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>38 Tahun</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <FileText size={18} />
            Cetak Resume
          </button>
          <button 
            onClick={() => setIsVerifying(true)}
            className="px-6 py-2.5 rounded-xl bg-pink-500 text-white font-bold text-sm shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all flex items-center gap-2"
          >
            <Save size={18} />
            Simpan Perubahan
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-hide border-b border-slate-100">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              {...tab}
            />
          ))}
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'anamnesis' && (
                <div className="space-y-10">
                  <SectionHeader 
                    title="Anamnesis" 
                    subtitle="Pengumpulan data riwayat kesehatan pasien melalui wawancara."
                    icon={History}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-slate-700">Keluhan Utama (Chief Complaint)</label>
                      <textarea 
                        className="pink-input h-32" 
                        placeholder="Apa yang dirasakan pasien saat ini?"
                      ></textarea>
                    </div>
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-slate-700">Riwayat Penyakit Sekarang</label>
                      <textarea 
                        className="pink-input h-32" 
                        placeholder="Detail keluhan utama, durasi, lokasi, dll."
                      ></textarea>
                    </div>
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-slate-700">Riwayat Penyakit Dahulu & Sistemik</label>
                      <div className="grid grid-cols-2 gap-4">
                        {['Diabetes', 'Hipertensi', 'Jantung', 'Hepatitis', 'HIV/AIDS', 'Gastritis'].map(item => (
                          <label key={item} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-all">
                            <input type="checkbox" className="w-4 h-4 rounded text-pink-500 focus:ring-pink-500" />
                            <span className="text-sm text-slate-600">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-slate-700">Riwayat Alergi & Obat</label>
                      <div className="space-y-4">
                        <input type="text" className="pink-input" placeholder="Alergi makanan/obat..." />
                        <input type="text" className="pink-input" placeholder="Obat yang sedang dikonsumsi..." />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'examination' && (
                <div className="space-y-12">
                  <SectionHeader 
                    title="Pemeriksaan Klinis" 
                    subtitle="Pemeriksaan fisik ekstra oral dan intra oral secara menyeluruh."
                    icon={Stethoscope}
                  />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Extra Oral */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <div className="w-2 h-6 bg-pink-500 rounded-full" />
                        Pemeriksaan Ekstra Oral
                      </h3>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Kelenjar Limfe</label>
                            <select className="pink-input">
                              <option>Normal</option>
                              <option>Teraba / Bengkak</option>
                              <option>Nyeri Tekan</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">TMJ</label>
                            <select className="pink-input">
                              <option>Normal</option>
                              <option>Clicking</option>
                              <option>Crepitasi</option>
                              <option>Trismus</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Wajah (Simetri)</label>
                          <select className="pink-input">
                            <option>Simetris</option>
                            <option>Asimetris</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Catatan Ekstra Oral</label>
                          <textarea className="pink-input h-24" placeholder="Tambahkan catatan jika ada kelainan..."></textarea>
                        </div>
                      </div>
                    </div>

                    {/* Intra Oral */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <div className="w-2 h-6 bg-blue-500 rounded-full" />
                        Pemeriksaan Intra Oral
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gingiva</label>
                          <select className="pink-input">
                            <option>Normal</option>
                            <option>Radang (Gingivitis)</option>
                            <option>Resesi</option>
                            <option>Hiperplasia</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mukosa</label>
                          <select className="pink-input">
                            <option>Normal</option>
                            <option>Stomatitis</option>
                            <option>Leukoplakia</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lidah</label>
                          <select className="pink-input">
                            <option>Normal</option>
                            <option>Coated Tongue</option>
                            <option>Geographic Tongue</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Palatum</label>
                          <select className="pink-input">
                            <option>Normal</option>
                            <option>Torus Palatinus</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Kebersihan Mulut (Plak & Kalkulus)</label>
                        <div className="grid grid-cols-2 gap-4">
                          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-all">
                            <input type="checkbox" className="w-4 h-4 rounded text-pink-500 focus:ring-pink-500" />
                            <span className="text-sm text-slate-600">Ada Plak</span>
                          </label>
                          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-all">
                            <input type="checkbox" className="w-4 h-4 rounded text-pink-500 focus:ring-pink-500" />
                            <span className="text-sm text-slate-600">Ada Kalkulus</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'odontogram' && (
                <div className="space-y-10">
                  <SectionHeader 
                    title="Odontogram Interaktif" 
                    subtitle="Pemetaan status kesehatan gigi geligi pasien secara visual."
                    icon={Activity}
                  />
                  
                  <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-200 flex flex-col items-center gap-12 overflow-x-auto">
                    {/* Upper Teeth */}
                    <div className="flex gap-2">
                      {[18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28].map(num => (
                        <ToothIcon 
                          key={num} 
                          number={num} 
                          status={odontogramData[num]} 
                          onClick={() => handleToothClick(num)}
                          selected={selectedTooth === num}
                        />
                      ))}
                    </div>
                    {/* Lower Teeth */}
                    <div className="flex gap-2">
                      {[48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38].map(num => (
                        <ToothIcon 
                          key={num} 
                          number={num} 
                          status={odontogramData[num]} 
                          onClick={() => handleToothClick(num)}
                          selected={selectedTooth === num}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Legend & Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                      <h4 className="text-sm font-bold text-slate-800 mb-4">Keterangan Status</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'sound', label: 'Sehat (Sound)', color: 'bg-emerald-500' },
                          { id: 'caries', label: 'Karies (Caries)', color: 'bg-rose-500' },
                          { id: 'filled', label: 'Tambalan (Filled)', color: 'bg-blue-500' },
                          { id: 'missing', label: 'Hilang (Missing)', color: 'bg-slate-300' },
                          { id: 'impacted', label: 'Impaksi (Impacted)', color: 'bg-amber-500' },
                          { id: 'bridge', label: 'Jembatan (Bridge)', color: 'bg-indigo-500' },
                        ].map(item => (
                          <button 
                            key={item.id}
                            onClick={() => updateToothStatus(item.id)}
                            disabled={!selectedTooth}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-xl border border-slate-50 transition-all text-left",
                              selectedTooth ? "hover:bg-slate-50 cursor-pointer" : "opacity-50 cursor-not-allowed"
                            )}
                          >
                            <div className={`w-4 h-4 rounded-full ${item.color}`} />
                            <span className="text-xs font-medium text-slate-600">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-pink-50/50 p-6 rounded-3xl border border-pink-100 flex flex-col items-center justify-center text-center">
                      {selectedTooth ? (
                        <>
                          <div className="w-16 h-16 rounded-2xl bg-pink-500 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg shadow-pink-200">
                            {selectedTooth}
                          </div>
                          <p className="text-sm font-bold text-slate-800 mb-1">Gigi Terpilih: {selectedTooth}</p>
                          <p className="text-xs text-slate-500">Pilih status kesehatan di sebelah kiri untuk memperbarui.</p>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center mb-4">
                            <Activity size={32} />
                          </div>
                          <p className="text-sm font-bold text-slate-400">Belum ada gigi terpilih</p>
                          <p className="text-xs text-slate-400">Klik pada salah satu gigi di odontogram.</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'indices' && (
                <div className="space-y-12">
                  <SectionHeader 
                    title="Indeks Kesehatan Gigi" 
                    subtitle="Pengukuran tingkat kesehatan gigi dan mulut menggunakan standar WHO."
                    icon={BarChart3}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* DMF-T */}
                    <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-800">Indeks DMF-T</h3>
                        <div className="px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-[10px] font-bold uppercase tracking-widest">WHO Standard</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Decay (D)</label>
                          <input type="number" className="pink-input" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Missing (M)</label>
                          <input type="number" className="pink-input" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Filled (F)</label>
                          <input type="number" className="pink-input" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total DMF-T</label>
                          <input type="number" className="pink-input bg-slate-50 font-bold text-pink-600" disabled value="0" />
                        </div>
                      </div>
                    </div>

                    {/* OHI-S */}
                    <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-800">Indeks OHI-S</h3>
                        <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest">Oral Hygiene</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Debris Index (DI)</label>
                          <input type="number" className="pink-input" placeholder="0.0" step="0.1" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Calculus Index (CI)</label>
                          <input type="number" className="pink-input" placeholder="0.0" step="0.1" />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total OHI-S</label>
                          <div className="flex items-center gap-4">
                            <input type="number" className="pink-input bg-slate-50 font-bold text-blue-600 flex-1" disabled value="0.0" />
                            <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-600 text-xs font-bold uppercase">Baik</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'diagnosis' && (
                <div className="space-y-10">
                  <SectionHeader 
                    title="Diagnosis Dental Hygiene" 
                    subtitle="Identifikasi masalah berdasarkan kebutuhan pasien yang tidak terpenuhi."
                    icon={ClipboardCheck}
                  />
                  
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Diagnosis List */}
                    <div className="flex-1 space-y-6">
                      {diagnosisData.length === 0 ? (
                        <div className="p-20 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 shadow-sm">
                            <ClipboardCheck size={40} />
                          </div>
                          <h3 className="text-lg font-bold text-slate-800">Belum ada diagnosis</h3>
                          <p className="text-slate-500 text-sm mb-6">Pilih pedoman diagnosis dari panel sebelah kanan.</p>
                        </div>
                      ) : (
                        diagnosisData.map((diag, idx) => (
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={idx} 
                            className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group"
                          >
                            <div className="absolute top-0 left-0 w-2 h-full bg-pink-500" />
                            <div className="absolute top-6 right-6 flex items-center gap-2">
                              <button 
                                onClick={() => handleAIAnalysis(idx)}
                                disabled={isAnalyzing}
                                className="p-2 text-pink-500 hover:bg-pink-50 rounded-xl transition-all flex items-center gap-2 text-xs font-bold"
                              >
                                {isAnalyzing ? <Activity size={14} className="animate-spin" /> : <Sparkles size={14} />}
                                Analisis AI
                              </button>
                              <button 
                                onClick={() => setDiagnosisData(diagnosisData.filter((_, i) => i !== idx))}
                                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                            
                            <div className="space-y-6">
                              <div>
                                <span className="text-[10px] font-bold text-pink-500 uppercase tracking-widest mb-1 block">Masalah / Unmet Need</span>
                                <h4 className="text-lg font-bold text-slate-800 leading-tight">{diag.unmetNeed}</h4>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Penyebab (Etiology)</span>
                                  <div className="space-y-2">
                                    {diag.causes.map((cause: string, cIdx: number) => (
                                      <label key={cIdx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-all">
                                        <input type="checkbox" className="mt-1 w-4 h-4 rounded text-pink-500 focus:ring-pink-500" />
                                        <span className="text-xs text-slate-600 leading-relaxed">{cause}</span>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Tanda & Gejala (Signs/Symptoms)</span>
                                  <div className="space-y-2">
                                    {diag.signs.map((sign: string, sIdx: number) => (
                                      <label key={sIdx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-all">
                                        <input type="checkbox" className="mt-1 w-4 h-4 rounded text-blue-500 focus:ring-blue-500" />
                                        <span className="text-xs text-slate-600 leading-relaxed">{sign}</span>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="pt-6 border-t border-slate-100">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Catatan Tambahan / Analisis AI (Dapat Diedit)</label>
                                <textarea 
                                  className="pink-input h-32 text-sm leading-relaxed" 
                                  value={diag.customNotes}
                                  onChange={(e) => {
                                    const newData = [...diagnosisData];
                                    newData[idx].customNotes = e.target.value;
                                    setDiagnosisData(newData);
                                  }}
                                  placeholder="Tambahkan detail spesifik atau hasil analisis AI..."
                                ></textarea>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>

                    {/* Guidelines Panel */}
                    <div className="w-full lg:w-96 space-y-6">
                      <div className="bg-slate-900 text-white p-6 rounded-[32px] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-pink-500">
                              <Sparkles size={20} />
                            </div>
                            <h3 className="font-bold">Pedoman Diagnosis</h3>
                          </div>
                          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                            Pilih kategori kebutuhan yang tidak terpenuhi untuk ditambahkan ke rekam medis pasien.
                          </p>
                          <div className="space-y-2">
                            {DENTAL_HYGIENE_DIAGNOSIS_GUIDELINES.map(g => (
                              <button 
                                key={g.id}
                                onClick={() => addDiagnosis(g.id)}
                                className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium text-slate-200 leading-tight pr-4">{g.unmetNeed}</span>
                                  <Plus size={16} className="text-pink-400 group-hover:scale-125 transition-transform" />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'treatment' && (
                <div className="space-y-12">
                  <div className="flex items-center justify-between">
                    <SectionHeader 
                      title="Rencana & Catatan Tindakan" 
                      subtitle="Penyusunan intervensi dan pencatatan tindakan klinis yang dilakukan."
                      icon={PenTool}
                    />
                    <button 
                      onClick={handleGenerateIntervention}
                      disabled={isAnalyzing || diagnosisData.length === 0}
                      className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm shadow-xl hover:bg-slate-800 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? <Activity size={18} className="animate-spin" /> : <Sparkles size={18} className="text-pink-400" />}
                      Generate AI Plan
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Treatment Plan */}
                    <div className="lg:col-span-2 space-y-8">
                      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
                        <h3 className="text-lg font-bold text-slate-800">Rencana Perawatan (Treatment Plan)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Kebutuhan Perawatan (Treatment Needs)</label>
                            <textarea 
                              className="pink-input h-24" 
                              value={interventionData.needs}
                              onChange={(e) => setInterventionData({...interventionData, needs: e.target.value})}
                              placeholder="Contoh: Scaling, Fluoride, dll."
                            ></textarea>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rencana Intervensi TGM</label>
                            <textarea 
                              className="pink-input h-24" 
                              value={interventionData.plan}
                              onChange={(e) => setInterventionData({...interventionData, plan: e.target.value})}
                              placeholder="Langkah-langkah intervensi..."
                            ></textarea>
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tujuan (Client-Centered Goals)</label>
                            <textarea 
                              className="pink-input h-24" 
                              value={interventionData.goals}
                              onChange={(e) => setInterventionData({...interventionData, goals: e.target.value})}
                              placeholder="Apa hasil yang diharapkan dari perawatan ini?"
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-slate-800">Catatan Tindakan Klinis</h3>
                          <button className="text-pink-500 text-xs font-bold flex items-center gap-1 hover:underline">
                            <Plus size={14} /> Tambah Tindakan
                          </button>
                        </div>
                        <div className="space-y-4">
                          {[
                            { date: '2026-04-04', action: 'Scaling Full Mouth', operator: 'Dr. Sarah', notes: 'Kalkulus supragingiva dibersihkan, perdarahan minimal.' },
                          ].map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 relative group">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-xs font-bold text-slate-400">{item.date}</span>
                                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                                  <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">{item.operator}</span>
                                </div>
                                <button className="p-1.5 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <h4 className="font-bold text-slate-800 mb-1">{item.action}</h4>
                              <p className="text-sm text-slate-500 leading-relaxed">{item.notes}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Side Info */}
                    <div className="space-y-6">
                      <div className="bg-blue-600 text-white p-8 rounded-[32px] shadow-xl">
                        <h3 className="font-bold text-lg mb-4">Ringkasan Biaya</h3>
                        <div className="space-y-4 mb-6">
                          <div className="flex justify-between text-sm opacity-80">
                            <span>Scaling Full Mouth</span>
                            <span>Rp 350.000</span>
                          </div>
                          <div className="flex justify-between text-sm opacity-80">
                            <span>Konsultasi</span>
                            <span>Rp 50.000</span>
                          </div>
                          <div className="pt-4 border-t border-white/20 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>Rp 400.000</span>
                          </div>
                        </div>
                        <button className="w-full py-3 rounded-xl bg-white text-blue-600 font-bold text-sm shadow-lg hover:bg-blue-50 transition-all">
                          Proses Pembayaran
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-10">
                  <SectionHeader 
                    title="Edukasi & Promosi Kesehatan" 
                    subtitle="Pemberian instruksi dan konseling untuk pemeliharaan kesehatan mandiri."
                    icon={Info}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      { title: 'Instruksi Menyikat Gigi', desc: 'Teknik Bass modifikasi, frekuensi 2x sehari.', icon: CheckCircle2, color: 'text-emerald-500' },
                      { title: 'Diet Counseling', desc: 'Kurangi konsumsi gula dan makanan lengket.', icon: Activity, color: 'text-amber-500' },
                      { title: 'Leaflet Digital', desc: 'Kirim panduan perawatan pasca scaling via WA.', icon: FileText, color: 'text-blue-500' },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                        <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${item.color}`}>
                          <item.icon size={24} />
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-6">{item.desc}</p>
                        <button className="text-xs font-bold text-pink-500 flex items-center gap-2 hover:underline">
                          Berikan Edukasi <ChevronRight size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'files' && (
                <div className="space-y-12">
                  <SectionHeader 
                    title="Files & Rekam Medis Elektronik" 
                    subtitle="Penyimpanan dokumen digital, rontgen, dan tanda tangan digital."
                    icon={ShieldCheck}
                  />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* File Upload */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-800">Dokumen & Foto</h3>
                        <button className="text-pink-500 text-xs font-bold flex items-center gap-1 hover:underline">
                          <Upload size={14} /> Upload Baru
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { name: 'Rontgen Panoramik', date: '2026-04-01', type: 'X-Ray' },
                          { name: 'Foto Intra Oral - Depan', date: '2026-04-04', type: 'Photo' },
                        ].map((file, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm group relative overflow-hidden">
                            <div className="aspect-video bg-slate-100 rounded-xl mb-3 flex items-center justify-center text-slate-400">
                              <ImageIcon size={32} />
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 truncate">{file.name}</h4>
                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{file.type} • {file.date}</p>
                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                              <button className="p-2 bg-white rounded-lg text-slate-800 hover:text-pink-600 transition-colors">
                                <Search size={18} />
                              </button>
                              <button className="p-2 bg-white rounded-lg text-slate-800 hover:text-red-600 transition-colors">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button className="aspect-video rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-pink-300 hover:text-pink-500 transition-all bg-slate-50/50">
                          <Plus size={24} />
                          <span className="text-xs font-bold">Tambah File</span>
                        </button>
                      </div>
                    </div>

                    {/* Digital Signature */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-slate-800">Tanda Tangan Digital</h3>
                      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
                        <div className="aspect-[4/3] bg-slate-50 rounded-2xl border-2 border-slate-100 relative overflow-hidden">
                          <canvas 
                            ref={sigCanvasRef}
                            className="w-full h-full cursor-crosshair"
                          />
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
                            Area Tanda Tangan
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all"
                            onClick={() => {
                              const canvas = sigCanvasRef.current;
                              if (canvas) {
                                const ctx = canvas.getContext('2d');
                                ctx?.clearRect(0, 0, canvas.width, canvas.height);
                              }
                            }}
                          >
                            Bersihkan
                          </button>
                          <button className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                            <FileSignature size={18} />
                            Simpan TTD
                          </button>
                        </div>
                        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-700 leading-relaxed">
                            Tanda tangan digital ini akan digunakan untuk memvalidasi keaslian rekam medis sesuai regulasi Kemenkes RI.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const ToothIcon = ({ number, status, onClick, selected }: any) => {
  const getStatusColor = () => {
    switch (status) {
      case 'caries': return 'fill-rose-500 stroke-rose-600';
      case 'filled': return 'fill-blue-500 stroke-blue-600';
      case 'missing': return 'fill-slate-200 stroke-slate-300';
      case 'impacted': return 'fill-amber-500 stroke-amber-600';
      case 'bridge': return 'fill-indigo-500 stroke-indigo-600';
      default: return 'fill-white stroke-slate-300';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 cursor-pointer transition-all",
        selected ? "scale-110" : "hover:scale-105"
      )}
    >
      <span className={cn(
        "text-[10px] font-bold",
        selected ? "text-pink-500" : "text-slate-400"
      )}>{number}</span>
      <svg width="32" height="40" viewBox="0 0 32 40" className={cn("transition-colors", getStatusColor())}>
        <path 
          d="M16 2C10 2 6 6 6 12C6 18 10 24 16 38C22 24 26 18 26 12C26 6 22 2 16 2Z" 
          strokeWidth="2"
          className={cn(selected && "stroke-pink-500 stroke-[3px]")}
        />
        {status === 'caries' && <circle cx="16" cy="12" r="4" fill="white" fillOpacity="0.3" />}
      </svg>
    </div>
  );
};

const BarChart3 = ({ size, className }: { size: number, className?: string }) => (
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
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </svg>
);

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default MedicalRecord;
