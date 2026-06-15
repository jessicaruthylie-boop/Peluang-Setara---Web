import React, { useState, useEffect } from 'react';
import { Job, JobApplication, AccessibilitySettings } from '../types';
import { DISABILITY_CATEGORIES, ALL_ACCOMODATIONS } from '../data/peluang-setara';
import { 
  Briefcase, 
  Layers, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Plus, 
  Users, 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  Trash2, 
  ChevronRight, 
  Sparkles, 
  HeartHandshake, 
  Building2, 
  ArrowUpRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RecruiterDashboardTabProps {
  currentUserEmail: string;
  onNavigateToTab: (tab: 'lowongan' | 'perusahaan' | 'tips' | 'lamaran') => void;
  accessibilitySettings: AccessibilitySettings;
}

export default function RecruiterDashboardTab({ currentUserEmail, onNavigateToTab, accessibilitySettings }: RecruiterDashboardTabProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Local state for company details & custom accommodation score
  const [supportedFacilities, setSupportedFacilities] = useState<string[]>(() => {
    // defaults based on PT Global Sentra Solusi
    if (currentUserEmail === 'recruitment@globalsentra.id') {
      return ["Aplikasi Chat Komunikasi Internal", "Jam Kerja Fleksibel", "Pelatihan Berbahasa Isyarat", "Workspace Ramah Kursi Roda"];
    }
    return ["Jam Kerja Fleksibel", "Pekerjaan Rumah Penuh (WFH)"];
  });

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Fetch all jobs
      const jobsRes = await fetch('/api/jobs');
      const jobsData = await jobsRes.json();
      
      // 2. Fetch all applications
      const appsRes = await fetch('/api/applications');
      const appsData = await appsRes.json();
      
      setJobs(jobsData);
      setApplications(appsData);
    } catch (err) {
      console.error("Error loading recruiter dashboard data:", err);
      setError("Gagal memuat data dari server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUserEmail]);

  // Filter jobs posted by this recruiter
  const myJobs = jobs.filter(job => job.companyEmail.toLowerCase() === currentUserEmail.toLowerCase());
  const myJobIds = new Set(myJobs.map(job => job.id));
  
  // Filter incoming applications for jobs owned by this recruiter
  const incomingApps = applications.filter(app => myJobIds.has(app.jobId));

  // If there are no jobs yet (new recruiter), let's fall back to showing all for general metrics, or show 0 with friendly guides
  const isNewRecruiter = myJobs.length === 0;
  
  const activeJobsCount = isNewRecruiter ? 0 : myJobs.length;
  const totalAppsCount = isNewRecruiter ? 0 : incomingApps.length;
  
  const pendingAppsCount = isNewRecruiter 
    ? 0 
    : incomingApps.filter(app => app.status === 'Pending').length;
  
  const reviewedAppsCount = isNewRecruiter 
    ? 0 
    : incomingApps.filter(app => app.status === 'Reviewing').length;
  
  const acceptedAppsCount = isNewRecruiter 
    ? 0 
    : incomingApps.filter(app => app.status === 'Diterima').length;

  const rejectedAppsCount = isNewRecruiter 
    ? 0 
    : incomingApps.filter(app => app.status === 'Ditolak').length;

  const handleDeleteJob = async (jobId: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus lowongan ini secara permanen?")) {
      return;
    }
    
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        // Refresh
        fetchData();
      } else {
        alert("Gagal menghapus lowongan.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan sistem saat menghapus lowongan.");
    }
  };

  const handleFacilityToggle = (facility: string) => {
    if (supportedFacilities.includes(facility)) {
      setSupportedFacilities(prev => prev.filter(f => f !== facility));
    } else {
      setSupportedFacilities(prev => [...prev, facility]);
    }
  };

  // Calculate Inclusion Rating Index based on accommodations count out of all possible accommodations
  const totalPossibleAccommodations = ALL_ACCOMODATIONS.length;
  const currentInclusionPercentage = Math.round((supportedFacilities.length / totalPossibleAccommodations) * 100);

  const getInclusionBadge = (percentage: number) => {
    if (percentage >= 80) return { label: 'Inklusif Utama (WCAG Gold)', color: 'bg-emerald-500 text-white' };
    if (percentage >= 50) return { label: 'Inklusif Madya (WCAG Silver)', color: 'bg-amber-500 text-slate-900' };
    return { label: 'Mulai Inklusif (WCAG Bronze)', color: 'bg-blue-500 text-white' };
  };

  const inclusionLevel = getInclusionBadge(currentInclusionPercentage);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Welcoming Hero Banner tailored for Recruiters */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-[2.5rem] p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl border border-slate-750">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              HR Portal &bull; Mode Pengelola Rekrutmen
            </span>
            {isNewRecruiter && (
              <span className="px-3.5 py-1.5 rounded-full bg-[#c13a29]/15 border border-[#c13a29]/30 text-[#ee523f] text-[10px] font-black uppercase tracking-widest">
                Akun Baru
              </span>
            )}
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            HALO REKRUTER, <span className="text-[#ee523f]">{currentUserEmail === 'recruitment@globalsentra.id' ? 'GLOBAL SENTRA SOLUSI' : 'MITRA INKLUSIF'}</span>!
          </h1>
          
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
            Selamat datang di Konsol Bisnis Inklusif Anda. Di sini, Anda dapat mengelola lowongan kerja ramah disabilitas, meninjau berkas CV pelamar secara fleksibel, dan memosisikan fasilitas akomodasi ramah aksesibilitas di perusahaan Anda.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateToTab('perusahaan')}
              className="px-6 py-3 bg-[#c13a29] hover:bg-[#a12f21] text-white rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-200 shadow-md flex items-center gap-2 cursor-pointer border border-[#c13a29]"
            >
              <Plus className="w-4 h-4" />
              <span>Pasang Lowongan Baru</span>
            </button>
            <button
              onClick={() => onNavigateToTab('lamaran')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-200 border border-slate-700 flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-slate-400" />
              <span>Kelola Berkas Masuk</span>
            </button>
          </div>
        </div>
        
        {/* Abstract shapes representing diversity connection */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-650/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-50px] right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {isLoading ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/50">
          <div className="w-12 h-12 border-4 border-[#c13a29] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-mono mt-4 font-bold uppercase tracking-widest">Sinkronisasi data rekrutmen...</p>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* 2. Key Metrics Widgets Section with elegant borders */}
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Statistik Perekrutan Anda</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              {/* Stat 1: Lowongan Aktif */}
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex items-center justify-between group hover:border-[#c13a29] transition-colors duration-300">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lowongan Aktif</p>
                  <p className="text-3xl font-black text-slate-900 leading-none">{activeJobsCount}</p>
                  <button 
                    onClick={() => onNavigateToTab('perusahaan')}
                    className="text-[10px] font-bold text-[#c13a29] hover:underline flex items-center gap-0.5 pt-1.5 cursor-pointer"
                  >
                    <span>Pasang loker</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-orange-50 text-orange-600 group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-rose-500 group-hover:text-white transition-all duration-300 shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>

              {/* Stat 2: Total Berkas Masuk */}
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex items-center justify-between group hover:border-slate-900 transition-colors duration-300">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lamaran Masuk</p>
                  <p className="text-3xl font-black text-slate-900 leading-none">{totalAppsCount}</p>
                  <button 
                    onClick={() => onNavigateToTab('lamaran')}
                    className="text-[10px] font-bold text-slate-505 hover:underline flex items-center gap-0.5 pt-1.5 cursor-pointer"
                  >
                    <span>Cek berkas CV</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
              </div>

              {/* Stat 3: Belum Di-review & Proses */}
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex items-center justify-between group hover:border-amber-500 transition-colors duration-300">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Proses & Pending</p>
                  <p className="text-3xl font-black text-slate-900 leading-none">{pendingAppsCount + reviewedAppsCount}</p>
                  <p className="text-[10px] text-amber-600 font-bold flex items-center gap-1 mt-1.5">
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    <span>Menunggu keputusan</span>
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              {/* Stat 4: Pelamar Sukses Diterima */}
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex items-center justify-between group hover:border-emerald-500 transition-colors duration-300">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Diterima Kerja</p>
                  <p className="text-3xl font-black text-slate-900 leading-none">{acceptedAppsCount}</p>
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Inisiasi orientasi</span>
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8">
            
            {/* Left side: List of jobs posted by this recruiter */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Lowongan yang Anda Publikasikan
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">{myJobs.length} Lowongan</span>
              </div>

              {myJobs.length === 0 ? (
                <div className="bg-white border border-dashed border-slate-300 p-12 text-center rounded-3xl space-y-4">
                  <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-black text-slate-700 uppercase">Belum ada lowongan terdaftar</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed font-semibold">
                    Silakan pasang lowongan kerja pertama Anda dengan mencantumkan detail kriteria pendukung disabilitas kerja.
                  </p>
                  <button 
                    onClick={() => onNavigateToTab('perusahaan')}
                    className="px-4.5 py-2.5 bg-[#c13a29] text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    Pasang Loker Pertama Anda
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myJobs.map((job) => (
                    <div 
                      key={job.id} 
                      className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-2 min-w-0">
                        <div className="flex items-center gap-2">
                          <img 
                            src={job.companyLogoUrl || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80"} 
                            alt={job.companyName} 
                            referrerPolicy="no-referrer"
                            className="w-7 h-7 rounded-lg object-contain bg-slate-50 p-1 border border-slate-150 shrink-0" 
                          />
                          <div>
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">{job.companyName}</h4>
                            <p className="text-[10px] text-slate-400 font-semibold">{job.location}</p>
                          </div>
                        </div>

                        <h3 className="text-sm font-black text-slate-900 leading-snug">{job.title}</h3>
                        
                        <div className="flex flex-wrap gap-1.5">
                          {job.disabilityTypes.map(type => {
                            const icon = DISABILITY_CATEGORIES.find(c => c.id === type)?.icon || "♿";
                            return (
                              <span 
                                key={type} 
                                className="px-2 py-1 bg-slate-100 border border-slate-200/40 text-[9px] font-bold rounded-md flex items-center gap-1 text-slate-650"
                              >
                                <span>{icon}</span>
                                <span>{type}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex sm:flex-col justify-between items-end gap-2.5 pt-3.5 sm:pt-0 border-t sm:border-0 border-slate-100">
                        <span className="text-xs font-bold text-emerald-600 font-mono">{job.salaryRange}</span>
                        <div className="flex gap-1.5 w-full sm:w-auto">
                          <button
                            onClick={() => onNavigateToTab('lamaran')}
                            className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl text-[10px] font-black tracking-wider uppercase transition-all cursor-pointer inline-flex items-center gap-1"
                            title="Tinjau pelamar yang mendaftar ke posisi ini"
                          >
                            <span>CV Pelamar</span>
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-200 rounded-xl transition-all cursor-pointer"
                            title="Hapus Lowongan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right side: Dynamic inclusion checker + Recent interactions */}
            <div className="space-y-6">
              
              {/* Inclusion Score Interactive Calculator */}
              <div className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-250 p-6 sm:p-7 rounded-[2rem] shadow-sm space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Akesibilitas & Skor Inklusi</h3>
                  </div>
                  <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                    Centang sediaan fasilitas di korporasi Anda untuk memetakan kepatuhan terhadap kenyamanan tuna-disabilitas.
                  </p>
                </div>

                {/* Score gauge */}
                <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest block leading-none">Inclusion Index:</span>
                    <span className="text-2xl font-black text-slate-900">{currentInclusionPercentage}%</span>
                    <span className={`block text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${inclusionLevel.color} w-fit mt-1`}>
                      {inclusionLevel.label}
                    </span>
                  </div>

                  {/* SVG circular progress */}
                  <div className="relative w-16 h-16 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" className="text-slate-200" strokeWidth="4" fill="transparent" />
                      <circle cx="32" cy="32" r="28" stroke="currentColor" className="text-emerald-500 transition-all duration-500" strokeWidth="4" fill="transparent"
                        strokeDasharray={175}
                        strokeDashoffset={175 - (175 * currentInclusionPercentage) / 100}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">
                      🏅
                    </div>
                  </div>
                </div>

                {/* Interactive checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {ALL_ACCOMODATIONS.map((fac) => {
                    const isChecked = supportedFacilities.includes(fac);
                    return (
                      <button
                        type="button"
                        key={fac}
                        onClick={() => handleFacilityToggle(fac)}
                        className={`p-2.5 border rounded-xl flex items-center gap-2 text-left text-[10px] font-bold transition-all duration-200 cursor-pointer ${
                          isChecked
                            ? 'border-emerald-500 bg-emerald-500/5 text-slate-900'
                            : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] border shrink-0 ${
                          isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-350 bg-white'
                        }`}>
                          {isChecked ? '✓' : ''}
                        </span>
                        <span className="truncate">{fac}</span>
                      </button>
                    );
                  })}
                </div>
                
                <p className="text-[9px] text-slate-400 font-semibold leading-relaxed text-center italic">
                  *Skor kalkulasi inklusi ini akan secara otomatis memperkaya reputasi visual lowongan kerja Anda di mata pelamar Tunadaksa & Rungu.
                </p>
              </div>

              {/* Recent Applications Interaction tracking panel */}
              <div className="bg-white border border-slate-200/80 p-6 sm:p-7 rounded-[2rem] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Interaksi Pelamar Terbaru</h3>
                    <p className="text-[10px] text-slate-400 font-semibold">Tinjau kiriman lamaran teranyar masuk ke bursa kerja Anda.</p>
                  </div>
                </div>

                {incomingApps.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400 font-medium">
                    Belum ada pengiriman berkas dari pelamar.
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {incomingApps.slice(0, 3).map((app) => {
                      const disabilityObj = DISABILITY_CATEGORIES.find(c => c.id === app.applicantDisability);
                      return (
                        <div key={app.id} className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between gap-3">
                          <div className="space-y-1 min-w-0">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block truncate">{app.jobTitle}</span>
                            <h4 className="text-xs font-black text-slate-900 leading-none">{app.applicantName}</h4>
                            <div className="flex items-center gap-1.5 pt-0.5">
                              <span className="text-[9px] text-slate-400 font-mono truncate">{app.applicantEmail}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-320" />
                              <span className="text-[9px] text-slate-500 font-semibold flex items-center gap-0.5">
                                <span>{disabilityObj?.icon || '♿'}</span>
                                <span className="truncate">{disabilityObj?.name || app.applicantDisability}</span>
                              </span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => onNavigateToTab('lamaran')}
                            className="p-1 px-2.5 bg-white border border-slate-200 hover:border-[#c13a29] text-slate-600 hover:text-[#c13a29] text-[9.5px] font-extrabold rounded-lg flex items-center gap-0.5 transition-all shrink-0 cursor-pointer"
                          >
                            <span>Evaluasi</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                    
                    {incomingApps.length > 3 && (
                      <button 
                        onClick={() => onNavigateToTab('lamaran')}
                        className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-[#c13a29] border border-slate-150 rounded-xl text-[10px] font-black tracking-wider uppercase transition-all duration-200 text-center cursor-pointer"
                      >
                        Lihat {incomingApps.length - 3} Lamaran Lainnya &rarr;
                      </button>
                    )}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
