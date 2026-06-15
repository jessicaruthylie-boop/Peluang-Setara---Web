import React, { useState, useEffect } from 'react';
import { JobApplication } from '../types';
import { DISABILITY_CATEGORIES } from '../data/peluang-setara';
import { Mail, Phone, Clock, ClipboardCheck, Trash2, ShieldAlert, Heart, Building, SwitchCamera, CheckSquare, XCircle, ChevronDown, CheckCircle, HelpCircle } from 'lucide-react';

interface LamaranSayaTabProps {
  currentUserEmail: string;
  currentUserRole?: string;
}

export default function LamaranSayaTab({ currentUserEmail, currentUserRole }: LamaranSayaTabProps) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'applicant' | 'recruiter'>(() => {
    return currentUserRole === 'recruiter' ? 'recruiter' : 'applicant';
  });
  const [selectedAppDetail, setSelectedAppDetail] = useState<JobApplication | null>(null);

  useEffect(() => {
    setViewMode(currentUserRole === 'recruiter' ? 'recruiter' : 'applicant');
  }, [currentUserRole]);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      // If recruiter, get all. If applicant, filter by email.
      const url = viewMode === 'applicant' 
        ? `/api/applications?email=${encodeURIComponent(currentUserEmail || 'pencarikerja@gmail.com')}`
        : '/api/applications';
      
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setApplications(data);
        } else {
          console.error("Applications data from server is not an array:", data);
          setApplications([]);
        }
      } else {
        console.error("Failed to load applications from API:", res.status, res.statusText);
        setApplications([]);
      }
    } catch (err) {
      console.error("Error loading applications:", err);
      setApplications([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [viewMode, currentUserEmail]);

  // Handle auto-selection of the first item to avoid empty spaces
  useEffect(() => {
    if (Array.isArray(applications) && applications.length > 0) {
      const match = applications.find(a => a && a.id === selectedAppDetail?.id);
      if (match) {
        setSelectedAppDetail(match || null);
      } else {
        setSelectedAppDetail(applications[0] || null);
      }
    } else {
      setSelectedAppDetail(null);
    }
  }, [applications]);

  const handleUpdateStatus = async (appId: string, status: 'Diterima' | 'Ditolak' | 'Reviewing') => {
    try {
      const res = await fetch(`/api/applications/${appId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchApplications();
      } else {
        alert("Gagal mengupdate status lamaran.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Diterima':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-[9px] tracking-widest px-3 py-1.5 rounded-full uppercase">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Diterima
          </span>
        );
      case 'Ditolak':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 font-extrabold text-[9px] tracking-widest px-3 py-1.5 rounded-full uppercase">
            <XCircle className="w-3 h-3 text-rose-600" />
            Ditolak
          </span>
        );
      case 'Reviewing':
        return (
          <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 font-extrabold text-[9px] tracking-widest px-3 py-1.5 rounded-full uppercase">
            <Clock className="w-3 h-3 text-indigo-600 animate-pulse" />
            Direview
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 font-extrabold text-[9px] tracking-widest px-3 py-1.5 rounded-full uppercase">
            <HelpCircle className="w-3 h-3 text-amber-600" />
            Diproses
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      
      {/* Visual Header introduction with clean typography */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight leading-none">
          Portal Pelacakan Dokumen Lamaran
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold max-w-2xl">
          Pantau status lamaran Anda secara real-time atau tinjau kiriman berkas CV talenta disabilitas melalui console hrd di bawah ini.
        </p>
      </div>

      {/* View Switcher Controls header - Custom capsule slider design */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-100/80 border border-slate-200/50 p-3 rounded-2xl backdrop-blur-xs">
        <div className="px-2">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1.5">
            {currentUserRole === 'recruiter' ? 'Konsol Administrasi HRD / Rekruter' : 'Fitur Pelacakan Berkas'}
          </p>
          <h3 className="text-sm font-extrabold text-slate-800">
            {viewMode === 'applicant' ? 'Dashboard Pelacakan Lamaran Saya' : 'Panel Manajemen Berkas Masuk'}
          </h3>
        </div>
        
        {currentUserRole === 'recruiter' && (
          <div className="flex bg-slate-200/60 p-1 rounded-xl w-full sm:w-auto gap-1">
            <button
              onClick={() => setViewMode('applicant')}
              className={`flex-1 sm:flex-none px-4.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                viewMode === 'applicant' 
                  ? 'bg-gradient-to-r from-[#9e2a1b] to-[#dc4c38] text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-850 hover:bg-white/40'
              }`}
            >
              Ubah ke Simulasi Pelamar
            </button>
            <button
              onClick={() => setViewMode('recruiter')}
              className={`flex-1 sm:flex-none px-4.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                viewMode === 'recruiter' 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-850 hover:bg-white/40'
              }`}
            >
              Mode Kelola Berkas Masuk
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8">
        
        {/* Render applications list inside */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
              {viewMode === 'applicant' ? 'Daftar Lamaran Anda' : 'Semua Lamaran Calon Karyawan'}
            </span>
            {!isLoading && (
              <span className="text-xs font-bold text-slate-400 font-mono">{applications.length} Dokumen</span>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-20 bg-white/50 rounded-[2rem] border border-slate-200">
              <div className="w-10 h-10 border-4 border-[#c13a29] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-[10px] text-slate-400 font-mono mt-3.5 font-bold uppercase tracking-widest">Memuat berkas lamaran...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-md rounded-[2rem] border border-dashed border-slate-300 p-16 text-center space-y-4 shadow-2xs">
              <span className="text-5xl block animate-pulse">📎</span>
              <h5 className="text-sm font-black text-slate-700 uppercase">Belum ada berkas lamaran</h5>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed font-semibold">
                {viewMode === 'applicant' 
                  ? 'Anda belum pernah mengirim lamaran pekerjaan ke perusahaan mana pun. Silakan jelajahi lowongan aktif!' 
                  : 'Belum ada calon karyawan dengan disabilitas yang mendaftar ke lowongan Anda.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {applications.map((app) => {
                const isSelected = selectedAppDetail?.id === app.id;
                return (
                  <div 
                    key={app.id}
                    onClick={() => setSelectedAppDetail(app)}
                    className={`p-5 rounded-2xl border text-left transition-all duration-250 h-auto cursor-pointer flex flex-col gap-3 scale-val hover:scale-[1.01] ${
                      isSelected 
                        ? 'border-[#c13a29] bg-gradient-to-br from-white to-red-50/15 shadow-md shadow-red-500/5 ring-1 ring-[#c13a29]/30' 
                        : 'border-slate-150 bg-white/70 hover:border-slate-300 hover:bg-white shadow-[0_2px_12px_-5px_rgba(0,0,0,0.01)]'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="space-y-1 min-w-0">
                        <h5 className="text-sm font-extrabold text-slate-900 leading-snug truncate">
                          {app.jobTitle}
                        </h5>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{app.companyName}</span>
                      </div>
                      <div className="shrink-0">
                        {getStatusBadge(app.status)}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2.5 border-t border-slate-100/60 font-mono font-bold">
                      <span className="text-slate-650 font-sans font-bold">Pelamar: <strong className="text-slate-800">{app.applicantName}</strong></span>
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[9px] font-sans">
                        {DISABILITY_CATEGORIES.find(c => c.id === app.applicantDisability)?.icon || '♿'} 
                        <span>{DISABILITY_CATEGORIES.find(c => c.id === app.applicantDisability)?.name || app.applicantDisability}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Render selection detail panel */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-[2rem] p-6 sm:p-8 space-y-6 shadow-sm h-fit sticky top-28 self-start">
          {selectedAppDetail ? (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              <div className="space-y-2">
                <span className="inline-block bg-gradient-to-r from-[#9e2a1b] to-[#dc4c38] text-white font-black text-[9px] tracking-widest px-3 py-1 rounded-md uppercase">
                  Detail Berkas Lamaran
                </span>
                
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                  {selectedAppDetail.jobTitle}
                </h3>
                <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-[#c13a29]" />
                  <span className="text-slate-700">{selectedAppDetail.companyName}</span>
                </p>
              </div>

              {/* Status and Recruiter Quick Action controls */}
              <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-150 space-y-4">
                <div className="flex justify-between items-center bg-white/70 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Berkas Saat Ini:</span>
                  <div>{getStatusBadge(selectedAppDetail.status)}</div>
                </div>

                {viewMode === 'recruiter' && (
                  <div className="space-y-3 pt-1">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Otoritas Keputusan HRD:</p>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => handleUpdateStatus(selectedAppDetail.id, 'Diterima')}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-655/10 hover:-translate-y-0.5"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedAppDetail.id, 'Ditolak')}
                        className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-rose-655/10 hover:-translate-y-0.5"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedAppDetail.id, 'Reviewing')}
                        className="px-4 py-2.5 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all duration-200 cursor-pointer"
                        title="Set to Reviewing"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cover letter document display content */}
              <div className="space-y-2.5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Pernyataan Lamaran & Surat Pengantar:</h4>
                <div className="bg-slate-50/60 p-4.5 rounded-2xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                  {selectedAppDetail.coverLetter}
                </div>
              </div>

              {/* Contact metadata info and call lists */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Detail Kontak Calon Pegawai:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-[11px] text-slate-650 font-bold font-mono">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 min-w-0">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate font-sans font-semibold text-slate-750" title={selectedAppDetail.applicantEmail}>{selectedAppDetail.applicantEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-sans font-semibold text-slate-755">{selectedAppDetail.applicantPhone}</span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="py-28 text-center space-y-4">
              <span className="text-5xl block animate-pulse">📄</span>
              <h4 className="text-sm font-black text-slate-700 uppercase">Pilihlah salah satu lamaran</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed font-semibold">
                Ketuk di antara daftar lamaran di sebelah kiri untuk me-review dokumen cover letter, profil kontak, serta memicu keputusan rekrutasi HRD.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
