import React, { useState } from 'react';
import { Job } from '../types';
import { DISABILITY_CATEGORIES, ALL_ACCOMODATIONS } from '../data/peluang-setara';
import { HeartHandshake, Plus, Mail, CheckCircle, MapPin, Building, Sparkles, PlusCircle } from 'lucide-react';

interface DaftarPerusahaanTabProps {
  currentUserEmail: string;
  onJobCreateSuccess: () => void;
}

export default function DaftarPerusahaanTab({ currentUserEmail, onJobCreateSuccess }: DaftarPerusahaanTabProps) {
  // Job Post state
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [location, setLocation] = useState('Jakarta');
  const [salaryMin, setSalaryMin] = useState('4.500.000');
  const [salaryMax, setSalaryMax] = useState('7.000.000');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [selectedDisabilities, setSelectedDisabilities] = useState<string[]>([]);
  const [selectedAccommodations, setSelectedAccommodations] = useState<string[]>([]);
  const [companyEmail, setCompanyEmail] = useState(currentUserEmail || 'recruitment@company.id');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const locationsList = [
    "Jakarta Selatan, DKI Jakarta",
    "Bandung, Jawa Barat",
    "Surabaya, Jawa Timur",
    "Sleman, DI Yogyakarta",
    "Medan, Sumatera Utara",
    "Makassar, Sulawesi Selatan",
    "Semarang, Jawa Tengah",
    "Remote / Full Kerja dari Rumah"
  ];

  const handleDisabilityCheckChanged = (id: string) => {
    if (selectedDisabilities.includes(id)) {
      setSelectedDisabilities(prev => prev.filter(item => item !== id));
    } else {
      setSelectedDisabilities(prev => [...prev, id]);
    }
  };

  const handleAccommodationCheckChanged = (facility: string) => {
    if (selectedAccommodations.includes(facility)) {
      setSelectedAccommodations(prev => prev.filter(item => item !== facility));
    } else {
      setSelectedAccommodations(prev => [...prev, facility]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDisabilities.length === 0) {
      alert("Mohon pilih setidaknya satu jenis disabilitas yang didukung.");
      return;
    }
    
    setIsSubmitting(true);

    const packedJob = {
      title,
      companyName,
      companyLogoUrl: logoUrl || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
      location,
      salaryRange: `Rp ${salaryMin} - Rp ${salaryMax}`,
      description,
      requirements,
      disabilityTypes: selectedDisabilities,
      accommodations: selectedAccommodations,
      companyEmail
    };

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packedJob)
      });

      if (res.ok) {
        setShowSuccess(true);
        // Reset states
        setTitle('');
        setCompanyName('');
        setLogoUrl('');
        setDescription('');
        setRequirements('');
        setSelectedDisabilities([]);
        setSelectedAccommodations([]);
        setTimeout(() => {
          setShowSuccess(false);
          onJobCreateSuccess();
        }, 1500);
      } else {
        alert("Eror mempublikasikan lowongan inklusi.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3.5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Visual Welcome Ribbon info - Rich gradient modern layout */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 rounded-[2rem] p-8 sm:p-10 text-white relative overflow-hidden shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
            Portal Rekanan Perusahaan
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            DAFTARKAN LOWONGAN KERJA INKLUSIF PERUSAHAAN ANDA
          </h2>
          <p className="text-slate-350 text-xs sm:text-sm leading-relaxed font-medium">
            Dukung gerakan kesetaraan kesempatan kerja! Daftarkan lowongan di platform <strong className="text-white">Peluang Setara</strong> dan paparkan sarana kemudahan kerja fisik atau teknologi pendamping yang perusahaan Anda miliki.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-650/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#c13a29]/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Main submission form - clean card styles */}
      <div className="bg-white/80 backdrop-blur-md rounded-[2rem] border border-slate-200/80 p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        
        {showSuccess ? (
          <div className="py-20 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
              <CheckCircle className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Lowongan Sukses Dirilis!</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-semibold">
              Lowongan inklusi Anda telah berhasil dipublikasikan secara instan dan dapat langsung dicari oleh seluruh talenta disabilitas se-Indonesia.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Nama Posisi Pekerjaan *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Digital Marketing / Admin Sosial Media"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#c13a29] focus:bg-white text-xs font-semibold text-slate-800 transition-all duration-200 placeholder-slate-400/80"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Nama Perusahaan / Organisasi *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PT Kreatif Mandiri Nusantara"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#c13a29] focus:bg-white text-xs font-semibold text-slate-800 transition-all duration-200 placeholder-slate-400/80"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Kota / Lokasi Kerja *</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#c13a29] focus:bg-white text-xs font-semibold text-slate-800 transition-all duration-200"
                >
                  {locationsList.map((loc, idx) => (
                    <option key={idx} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Email Kontak Lamaran *</label>
                <input
                  type="email"
                  required
                  placeholder="recruitment@nama-perusahaan.co.id"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#c13a29] focus:bg-white text-xs font-mono font-semibold text-slate-800 transition-all duration-200 placeholder-slate-400/80"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Gaji Minimal (Bulanan - Rp) *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 4.500.000"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#c13a29] focus:bg-white text-xs font-semibold text-slate-800 transition-all duration-200 placeholder-slate-400/80"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Gaji Maksimal (Bulanan - Rp) *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 7.000.000"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#c13a29] focus:bg-white text-xs font-semibold text-slate-800 transition-all duration-200 placeholder-slate-400/80"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Tautan Foto / Logo Perusahaan (Opsional)</label>
              <input
                type="text"
                placeholder="https://link-gambar.com/logo-perusahaan.png (Opsional)"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#c13a29] focus:bg-white text-xs font-semibold text-slate-800 transition-all duration-200 placeholder-slate-400/80"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Uraian / Deskripsi Singkat Pekerjaan *</label>
              <textarea
                required
                rows={3}
                placeholder="Tuliskan secara ramah, ringkas dan inklusif tugas-tugas harian pekerjaan..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-4 py-3.5 bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#c13a29] focus:bg-white text-xs font-medium text-slate-850 transition-all duration-200 placeholder-slate-400/80 resize-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Kualifikasi & Persyaratan Khusus (Tiap Baris) *</label>
              <textarea
                required
                rows={3}
                placeholder="Tuliskan satu persyaratan per baris. Contoh:&#10;Mampu mengoperasikan browser Google Chrome&#10;Bisa membaca instruksi kerja tertulis&#10;Memiliki motivasi kerja tim yang solid"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="mt-1 block w-full px-4 py-3.5 bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#c13a29] focus:bg-white text-xs font-mono font-medium text-slate-850 transition-all duration-200 placeholder-slate-400/80 resize-none leading-relaxed"
              />
            </div>

            {/* Disability options checks */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pilihlah Kategori Disabilitas yang Didukung *</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {DISABILITY_CATEGORIES.filter(c => c.id !== 'all').map((cat) => {
                  const isChecked = selectedDisabilities.includes(cat.id);
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => handleDisabilityCheckChanged(cat.id)}
                      className={`px-4 py-3 border rounded-xl flex items-center gap-3 text-left transition-all duration-200 cursor-pointer ${
                        isChecked 
                          ? 'border-[#c13a29] bg-gradient-to-r from-[#9e2a1b]/5 to-[#dc4c38]/5 text-[#c13a29] font-black ring-2 ring-[#c13a29]/10' 
                          : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <span className="text-xl leading-none">{cat.icon}</span>
                      <span className="text-xs font-bold leading-tight">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Specific Accommodations checks list */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Akomodasi & Fasilitas Aksesibilitas yang Disediakan *</span>
              <p className="text-[11px] text-slate-400 leading-normal mb-2 font-semibold">Pilih fasilitas yang memang sudah terinstalasi / siap dikondisikan di lingkungan kerja Anda.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ALL_ACCOMODATIONS.map((fac) => {
                  const isChecked = selectedAccommodations.includes(fac);
                  return (
                    <label 
                      key={fac} 
                      className={`p-3.5 border rounded-xl flex items-center gap-3 cursor-pointer text-xs transition-all duration-200 ${
                        isChecked 
                          ? 'border-emerald-500 bg-emerald-500/5 text-slate-900 font-extrabold ring-2 ring-emerald-500/10' 
                          : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleAccommodationCheckChanged(fac)}
                        className="rounded accent-emerald-600 w-4 h-4"
                      />
                      <span className="font-bold">{fac}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Warn Notice section */}
            <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200/60 flex items-start gap-3.5 shadow-2xs">
              <PlusCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-black text-amber-800 uppercase tracking-wide">Penerapan Nilai Non-Diskriminasi:</span>
                <p className="text-[11px] text-amber-700 leading-relaxed font-semibold">
                  Dengan mengklik submit lowongan, Anda menyetujui bahwa tim perekrut Anda bersedia melayani wawancara / chat tertulis serta tidak memberlakukan seleksi fisik yang menolak talenta berdasarkan rintangan disabilitasnya.
                </p>
              </div>
            </div>

            {/* Actions CTA */}
            <div className="flex gap-3 justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#c13a29] hover:bg-[#a12f21] disabled:opacity-50 text-white rounded-xl text-xs font-black tracking-widest transition-all shadow-md hover:shadow-lg text-center cursor-pointer uppercase"
              >
                {isSubmitting ? 'MENYIMPAN LOWONGAN...' : 'RILIS LOWONGAN INKLUSIF'}
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
}
