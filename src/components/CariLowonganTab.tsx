import React, { useState, useEffect, useRef } from "react";
import { Job } from "../types";
import { DISABILITY_CATEGORIES } from "../data/peluang-setara";
import {
  Search,
  MapPin,
  Briefcase,
  CheckCircle2,
  Sparkles,
  Filter,
  ShieldCheck,
  HeartHandshake,
  AlertCircle,
  X,
  Send,
  Coins,
  Clock,
  Building2,
  Laptop2,
  Palette,
  Accessibility,
  EyeOff,
  EarOff,
  Brain,
  Activity,
  Globe,
  Award,
  Info,
  ChevronDown,
  Check,
  Stars,
  Compass,
  ExternalLink,
  RefreshCw,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CariLowonganTabProps {
  currentUserEmail: string;
  onApplySuccess: () => void;
  accessibilitySettings: any;
}

const SUGGESTED_POSITIONS = [
  { label: "Customer Service Chat & Email", value: "Customer Service" },
  { label: "Web Developer / UI Designer", value: "Web Developer" },
  { label: "Data Entry Specialist", value: "Data Entry" },
  { label: "Staff Administrasi & Pengarsipan", value: "Administrasi" },
  { label: "Graphic Designer / Ilustrator", value: "Graphic Designer" },
  { label: "Social Media Specialist / Admin", value: "Social Media" },
  { label: "Content Writer & Copywriter", value: "Content Writer" },
  { label: "Digital Marketing Specialist", value: "Marketing" },
];

const SUGGESTED_COMPANIES = [
  { label: "PT Global Sentra Solusi", value: "PT Global Sentra Solusi" },
  { label: "Teknologi Hijau Nusantara", value: "Teknologi Hijau Nusantara" },
  { label: "Deco Digital Creative Studio", value: "Deco Digital" },
  { label: "Karya Mandiri Retail", value: "Karya Mandiri Retail" },
  { label: "PT Inklusi Indonesia Jaya", value: "PT Inklusi" },
  { label: "Sentra Digital Utama", value: "Sentra Digital" },
  { label: "Nusa Bakti Sejahtera", value: "Nusa Bakti" },
  { label: "Kreatif Mandiri Jaya", value: "Kreatif Mandiri" },
];

const SUGGESTED_LOCATIONS = [
  { label: "Bekerja dari Rumah (WFH)", value: "WFH" },
  { label: "Bekerja di Kantor (WFO / Onsite)", value: "WFO" },
  { label: "Aceh", value: "Aceh" },
  { label: "Sumatera Utara", value: "Sumatera Utara" },
  { label: "Sumatera Barat", value: "Sumatera Barat" },
  { label: "Riau", value: "Riau" },
  { label: "Kepulauan Riau", value: "Kepulauan Riau" },
  { label: "Jambi", value: "Jambi" },
  { label: "Bengkulu", value: "Bengkulu" },
  { label: "Sumatera Selatan", value: "Sumatera Selatan" },
  { label: "Kepulauan Bangka Belitung", value: "Bangka Belitung" },
  { label: "Lampung", value: "Lampung" },
  { label: "Banten", value: "Banten" },
  { label: "DKI Jakarta", value: "Jakarta" },
  { label: "Jawa Barat", value: "Jawa Barat" },
  { label: "Jawa Tengah", value: "Jawa Tengah" },
  { label: "DI Yogyakarta", value: "Yogyakarta" },
  { label: "Jawa Timur", value: "Jawa Timur" },
  { label: "Bali", value: "Bali" },
  { label: "Nusa Tenggara Barat (NTB)", value: "Nusa Tenggara Barat" },
  { label: "Nusa Tenggara Timur (NTT)", value: "Nusa Tenggara Timur" },
  { label: "Kalimantan Barat", value: "Kalimantan Barat" },
  { label: "Kalimantan Tengah", value: "Kalimantan Tengah" },
  { label: "Kalimantan Selatan", value: "Kalimantan Selatan" },
  { label: "Kalimantan Timur", value: "Kalimantan Timur" },
  { label: "Kalimantan Utara", value: "Kalimantan Utara" },
  { label: "Sulawesi Utara", value: "Sulawesi Utara" },
  { label: "Gorontalo", value: "Gorontalo" },
  { label: "Sulawesi Tengah", value: "Sulawesi Tengah" },
  { label: "Sulawesi Barat", value: "Sulawesi Barat" },
  { label: "Sulawesi Selatan", value: "Sulawesi Selatan" },
  { label: "Sulawesi Tenggara", value: "Sulawesi Tenggara" },
  { label: "Maluku", value: "Maluku" },
  { label: "Maluku Utara", value: "Maluku Utara" },
  { label: "Papua Barat", value: "Papua Barat" },
  { label: "Papua", value: "Papua" },
];

const REGIONAL_GROUPS = [
  {
    name: "Tipe Kerja",
    icon: "💼",
    items: [
      { label: "Bekerja dari Rumah (WFH)", value: "WFH" },
      { label: "Bekerja di Kantor (WFO / Onsite)", value: "WFO" },
    ],
  },
  {
    name: "Sumatera",
    icon: "🌴",
    items: [
      { label: "Aceh", value: "Aceh" },
      { label: "Sumatera Utara", value: "Sumatera Utara" },
      { label: "Sumatera Barat", value: "Sumatera Barat" },
      { label: "Riau", value: "Riau" },
      { label: "Kepulauan Riau", value: "Kepulauan Riau" },
      { label: "Jambi", value: "Jambi" },
      { label: "Bengkulu", value: "Bengkulu" },
      { label: "Sumatera Selatan", value: "Sumatera Selatan" },
      { label: "Bangka Belitung", value: "Bangka Belitung" },
      { label: "Lampung", value: "Lampung" },
    ],
  },
  {
    name: "Jawa",
    icon: "🏙️",
    items: [
      { label: "Banten", value: "Banten" },
      { label: "DKI Jakarta", value: "Jakarta" },
      { label: "Jawa Barat", value: "Jawa Barat" },
      { label: "Jawa Tengah", value: "Jawa Tengah" },
      { label: "DI Yogyakarta", value: "Yogyakarta" },
      { label: "Jawa Timur", value: "Jawa Timur" },
    ],
  },
  {
    name: "Bali & Nusa Tenggara",
    icon: "🏖️",
    items: [
      { label: "Bali", value: "Bali" },
      { label: "Nusa Tenggara Barat (NTB)", value: "Nusa Tenggara Barat" },
      { label: "Nusa Tenggara Timur (NTT)", value: "Nusa Tenggara Timur" },
    ],
  },
  {
    name: "Kalimantan",
    icon: "🌲",
    items: [
      { label: "Kalimantan Barat", value: "Kalimantan Barat" },
      { label: "Kalimantan Tengah", value: "Kalimantan Tengah" },
      { label: "Kalimantan Selatan", value: "Kalimantan Selatan" },
      { label: "Kalimantan Timur", value: "Kalimantan Timur" },
      { label: "Kalimantan Utara", value: "Kalimantan Utara" },
    ],
  },
  {
    name: "Sulawesi",
    icon: "⛰️",
    items: [
      { label: "Sulawesi Utara", value: "Sulawesi Utara" },
      { label: "Gorontalo", value: "Gorontalo" },
      { label: "Sulawesi Tengah", value: "Sulawesi Tengah" },
      { label: "Sulawesi Barat", value: "Sulawesi Barat" },
      { label: "Sulawesi Selatan", value: "Sulawesi Selatan" },
      { label: "Sulawesi Tenggara", value: "Sulawesi Tenggara" },
    ],
  },
  {
    name: "Maluku & Papua",
    icon: "⛵",
    items: [
      { label: "Maluku", value: "Maluku" },
      { label: "Maluku Utara", value: "Maluku Utara" },
      { label: "Papua Barat", value: "Papua Barat" },
      { label: "Papua", value: "Papua" },
    ],
  },
];

const extractProvince = (locationText: string): string => {
  const lowercaseText = locationText.toLowerCase();

  if (lowercaseText.includes("jakarta")) return "Jakarta";
  if (lowercaseText.includes("yogyakarta")) return "Yogyakarta";
  if (lowercaseText.includes("bangka belitung")) return "Bangka Belitung";

  const match = SUGGESTED_LOCATIONS.find(
    (loc) =>
      loc.value !== "WFH" &&
      loc.value !== "WFO" &&
      lowercaseText.includes(loc.value.toLowerCase()),
  );
  return match ? match.value : locationText;
};

const DISABILITY_ICONS: Record<string, React.ReactNode> = {
  daksa: <Accessibility className="w-3.5 h-3.5" />,
  netra: <EyeOff className="w-3.5 h-3.5" />,
  rungu: <EarOff className="w-3.5 h-3.5" />,
  grahita: <Brain className="w-3.5 h-3.5" />,
  mental: <Activity className="w-3.5 h-3.5" />,
  all: <Globe className="w-3.5 h-3.5" />,
};

export default function CariLowonganTab({
  currentUserEmail,
  onApplySuccess,
  accessibilitySettings,
}: CariLowonganTabProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [companyQuery, setCompanyQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedDisability, setSelectedDisability] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const [selectedRegionGroup, setSelectedRegionGroup] = useState<string | null>(
    "Sumatera",
  );
  const [showRegionalFilter, setShowRegionalFilter] = useState(true);

  const fetchIdRef = useRef(0);

  const fetchJobs = async (overrides?: {
    search?: string;
    company?: string;
    location?: string;
    disability?: string;
  }) => {
    setIsLoading(true);
    const fetchId = ++fetchIdRef.current;

    const searchParam =
      overrides && overrides.search !== undefined
        ? overrides.search
        : searchQuery;
    const companyParam =
      overrides && overrides.company !== undefined
        ? overrides.company
        : companyQuery;
    const locationParam =
      overrides && overrides.location !== undefined
        ? overrides.location
        : locationQuery;
    const disabilityParam =
      overrides && overrides.disability !== undefined
        ? overrides.disability
        : selectedDisability;

    try {
      const url = `/api/jobs?search=${encodeURIComponent(searchParam)}&company=${encodeURIComponent(companyParam)}&location=${encodeURIComponent(locationParam)}&disability=${disabilityParam}&_t=${Date.now()}`;
      const res = await fetch(url);
      const data = await res.json();
      if (fetchId === fetchIdRef.current) {
        setJobs(data);
      }
    } catch (err) {
      console.error("Error loading jobs:", err);
    } finally {
      if (fetchId === fetchIdRef.current) {
        setIsLoading(false);
      }
    }
  };

  const selectPosition = (val: string) => {
    setSearchQuery(val);
    setShowSearchSuggestions(false);
    fetchJobs({ search: val });
  };

  const selectCompany = (val: string) => {
    setCompanyQuery(val);
    setShowCompanySuggestions(false);
    fetchJobs({ company: val });
  };

  const selectLocation = (val: string) => {
    setLocationQuery(val);
    setShowLocationSuggestions(false);
    fetchJobs({ location: val });
  };

  const filteredPositions = searchQuery
    ? SUGGESTED_POSITIONS.filter(
        (item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.value.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : SUGGESTED_POSITIONS;

  const filteredCompanies = companyQuery
    ? SUGGESTED_COMPANIES.filter(
        (item) =>
          item.label.toLowerCase().includes(companyQuery.toLowerCase()) ||
          item.value.toLowerCase().includes(companyQuery.toLowerCase()),
      )
    : SUGGESTED_COMPANIES;

  const filteredLocations = locationQuery
    ? SUGGESTED_LOCATIONS.filter(
        (item) =>
          item.label.toLowerCase().includes(locationQuery.toLowerCase()) ||
          item.value.toLowerCase().includes(locationQuery.toLowerCase()),
      )
    : SUGGESTED_LOCATIONS;

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantDisability, setApplicantDisability] = useState("Daksa");
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  // Initial load of jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    fetchJobs({ disability: selectedDisability });
  }, [selectedDisability]);

  const handleOpenApply = (job: Job) => {
    setSelectedJob(job);
    setApplicantName("");
    setApplicantPhone("");
    setApplicantDisability(job.disabilityTypes[0] || "Daksa");
    setCoverLetter(
      `Yth. Tim Rekrutmen ${job.companyName},\n\nSaya sangat tertarik untuk melamar posisi ${job.title} di perusahaan Anda. Saya percaya fasilitas akomodasi yang tersedia sangat mendukung kontribusi optimal saya.`,
    );
    setApplySuccess(false);
    setShowApplyModal(true);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: selectedJob.id,
          jobTitle: selectedJob.title,
          companyName: selectedJob.companyName,
          applicantName,
          applicantEmail: currentUserEmail || "pencarikerja@gmail.com",
          applicantPhone,
          applicantDisability,
          coverLetter,
          resumeUrl: `https://peluangsetara.id/resumes/cv-${applicantName.toLowerCase().replace(/\s+/g, "-")}.pdf`,
        }),
      });
      if (res.ok) {
        setApplySuccess(true);
        setTimeout(() => {
          setShowApplyModal(false);
          onApplySuccess();
        }, 1850);
      } else {
        alert("Gagal melamar. Mohon coba lagi.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* ── HERO BANNER & SLEEK BENTO INTERACTION AREA ── */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-rose-50/40 border border-slate-150 rounded-3xl p-6 md:p-10 shadow-lg shadow-slate-100/30 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center"
      >
        {/* Abstract Deco background glow */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-red-100/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-5 relative z-10">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 text-[11px] font-black text-rose-700 bg-rose-50 border border-rose-200/50 px-4 py-2 rounded-full w-fit uppercase tracking-wider shadow-xs"
          >
            <Award className="w-3.5 h-3.5 text-rose-600" />
            Platform inklusif #1 Indonesia
          </motion.div>

          <h1 className="text-3.5xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Temukan Karir Impian
            <br />
            Sesuai{" "}
            <span className="bg-gradient-to-r from-[#9e2a1b] to-[#dc4c38] bg-clip-text text-transparent font-black relative">
              Keunikanmu
              <span className="absolute left-0 right-0 bottom-1 h-1.5 bg-[#dc4c38]/15 rounded" />
            </span>
          </h1>

          <p className="text-sm sm:text-base font-medium text-slate-650 leading-relaxed max-w-lg">
            Ribuan lowongan kerja dirancang khusus dari perusahaan berkomitmen
            tinggi yang mendukung kemandirian, kesetaraan akses, dan fasilitas
            akomodasi yang lengkap.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-150/70">
            {[
              { num: "2.400+", label: "Lowongan Aktif" },
              { num: "340+", label: "Mitra Korporasi" },
              { num: "18.500+", label: "Talenta Sukses" },
            ].map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex flex-col gap-0.5"
              >
                <span className="text-xl sm:text-2xl font-black text-slate-900">
                  {s.num}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CENTRAL SEARCH BOX (BENTO INTERACTIVE FRAME) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="bg-white/95 border border-slate-155 rounded-2xl p-5 md:p-6 shadow-xl shadow-slate-200/40 flex flex-col gap-4 relative z-10"
        >
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Stars className="w-4 h-4 text-rose-500 fill-rose-100" />
            <span className="text-xs font-black text-slate-700 uppercase tracking-widest">
              Pencarian Pintar
            </span>
          </div>

          {/* 1. Pilih Lowongan / Posisi */}
          <div className="relative">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
              Nama Posisi
            </label>
            <div className="flex items-center justify-between gap-2 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/10 focus-within:bg-white transition-all group">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <Briefcase className="w-4 h-4 text-slate-400 group-focus-within:text-rose-500 shrink-0 transition-colors" />
                <input
                  type="text"
                  placeholder="Contoh: Customer Service, Designer..."
                  value={searchQuery}
                  onFocus={() => setShowSearchSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSearchSuggestions(false), 250)
                  }
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      fetchJobs();
                    }
                  }}
                  className="bg-transparent text-sm text-slate-800 font-semibold placeholder-slate-400 focus:outline-none w-full border-none p-0"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowSearchSuggestions(!showSearchSuggestions)}
                className="p-1 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Suggestions card */}
            <AnimatePresence>
              {showSearchSuggestions && filteredPositions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto z-50 p-1.5"
                >
                  <div className="p-1.5 border-b border-rose-50 bg-rose-50/20 px-3 py-1 flex items-center justify-between">
                    <span className="text-[9px] font-black text-rose-700 uppercase tracking-widest">
                      Saran Posisi
                    </span>
                    {searchQuery && (
                      <button
                        type="button"
                        onMouseDown={() => {
                          setSearchQuery("");
                          fetchJobs({ search: "" });
                        }}
                        className="text-[9px] text-[#c13a29] hover:underline font-extrabold"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <div className="pt-1">
                    {filteredPositions.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onMouseDown={() => selectPosition(item.value)}
                        className="w-full text-left px-3 py-2 hover:bg-rose-50/45 hover:text-rose-700 text-xs font-semibold text-slate-700 rounded-lg transition-colors flex items-center justify-between gap-2 cursor-pointer"
                      >
                        <span className="truncate">{item.label}</span>
                        <Briefcase className="w-3 h-3 text-slate-300 shrink-0" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Pilih Perusahaan */}
          <div className="relative">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
              Nama Perusahaan
            </label>
            <div className="flex items-center justify-between gap-2 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/10 focus-within:bg-white transition-all group">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <Building2 className="w-4 h-4 text-slate-400 group-focus-within:text-rose-500 shrink-0 transition-colors" />
                <input
                  type="text"
                  placeholder="Cari PT atau instansi..."
                  value={companyQuery}
                  onFocus={() => setShowCompanySuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowCompanySuggestions(false), 250)
                  }
                  onChange={(e) => setCompanyQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      fetchJobs();
                    }
                  }}
                  className="bg-transparent text-sm text-slate-800 font-semibold placeholder-slate-400 focus:outline-none w-full border-none p-0"
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setShowCompanySuggestions(!showCompanySuggestions)
                }
                className="p-1 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Suggestions card */}
            <AnimatePresence>
              {showCompanySuggestions && filteredCompanies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto z-50 p-1.5"
                >
                  <div className="p-1.5 border-b border-rose-50 bg-rose-50/20 px-3 py-1 flex items-center justify-between">
                    <span className="text-[9px] font-black text-rose-700 uppercase tracking-widest">
                      Saran Perusahaan
                    </span>
                    {companyQuery && (
                      <button
                        type="button"
                        onMouseDown={() => {
                          setCompanyQuery("");
                          fetchJobs({ company: "" });
                        }}
                        className="text-[9px] text-[#c13a29] hover:underline font-extrabold"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <div className="pt-1">
                    {filteredCompanies.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onMouseDown={() => selectCompany(item.value)}
                        className="w-full text-left px-3 py-2 hover:bg-rose-50/45 hover:text-rose-700 text-xs font-semibold text-slate-700 rounded-lg transition-colors flex items-center justify-between gap-2 cursor-pointer"
                      >
                        <span className="truncate">{item.label}</span>
                        <Building2 className="w-3 h-3 text-slate-300 shrink-0" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Lokasi Select Wrapper */}
          <div className="relative">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
              Lokasi / Tipe Kerja
            </label>
            <div className="flex items-center justify-between gap-2 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/10 focus-within:bg-white transition-all group">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <MapPin className="w-4 h-4 text-slate-400 group-focus-within:text-rose-505 shrink-0 transition-colors" />
                <input
                  type="text"
                  placeholder="Provinsi atau WFH/WFO..."
                  value={locationQuery}
                  onFocus={() => setShowLocationSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowLocationSuggestions(false), 250)
                  }
                  onChange={(e) => setLocationQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      fetchJobs();
                    }
                  }}
                  className="bg-transparent text-sm text-slate-800 font-semibold placeholder-slate-400 focus:outline-none w-full border-none p-0"
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setShowLocationSuggestions(!showLocationSuggestions)
                }
                className="p-1 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Suggestions card */}
            <AnimatePresence>
              {showLocationSuggestions && filteredLocations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto z-50 p-1.5"
                >
                  <div className="p-1.5 border-b border-rose-50 bg-rose-50/20 px-3 py-1 flex items-center justify-between">
                    <span className="text-[9px] font-black text-rose-700 uppercase tracking-widest">
                      Pilih Provinsi / Model
                    </span>
                    {locationQuery && (
                      <button
                        type="button"
                        onMouseDown={() => {
                          setLocationQuery("");
                          fetchJobs({ location: "" });
                        }}
                        className="text-[9px] text-[#c13a29] hover:underline font-extrabold"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <div className="pt-1">
                    {filteredLocations.map((item, idx) => {
                      const isStyle =
                        item.value === "WFH" || item.value === "WFO";
                      return (
                        <button
                          key={idx}
                          type="button"
                          onMouseDown={() => selectLocation(item.value)}
                          className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                            isStyle
                              ? "bg-rose-50/60 text-rose-705 font-bold hover:bg-rose-100"
                              : "hover:bg-rose-50/40 hover:text-rose-700 text-slate-700"
                          }`}
                        >
                          <span className="truncate">{item.label}</span>
                          {isStyle ? (
                            <Sparkles className="w-3.5 h-3.5 text-rose-500 fill-rose-100" />
                          ) : (
                            <MapPin className="w-3.5 h-3.5 text-slate-300" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => fetchJobs()}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#9e2a1b] to-[#dc4c38] hover:shadow-lg hover:shadow-rose-500/20 text-white text-sm font-black py-4 rounded-xl transition-all shadow-md cursor-pointer justify-center"
          >
            <Search className="w-4 h-4 text-white" />
            Cari Lowongan Kerja
          </motion.button>
        </motion.div>
      </motion.div>

      {/* ── INTERACTIVE REGIONAL EXPLORER (34 PROVINCES OF INDONESIA) ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm flex flex-col gap-5"
      >
        <div
          onClick={() => setShowRegionalFilter(!showRegionalFilter)}
          className="flex items-center justify-between gap-3 cursor-pointer select-none group"
        >
          <div className="flex items-center gap-3">
            <div className="bg-rose-50 text-[#c13a29] p-2.5 rounded-2xl border border-rose-200/55 flex items-center justify-center transition-all bg-gradient-to-tr from-rose-50 to-rose-100/50 group-hover:scale-105">
              <Compass className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#c13a29] transition-colors leading-snug">
                Eksplorasi Wilayah Nusantara (34 Provinsi)
              </h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Bantu filter lowongan langsung berdasarkan area geografis
                pilihanmu
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 py-1.5 px-3.5 rounded-xl group-hover:bg-rose-50/50 group-hover:border-rose-200 transition-all">
            <span className="text-[10px] text-slate-500 group-hover:text-[#c13a29] font-black uppercase tracking-wider">
              {showRegionalFilter ? "Sembunyikan" : "Tampilkan Peta"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-300 group-hover:text-[#c13a35] ${showRegionalFilter ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        <AnimatePresence>
          {showRegionalFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 pt-2 overflow-hidden"
            >
              {/* Mainland Navigation Tabs */}
              <div className="flex flex-wrap gap-1.5 bg-slate-50 border border-slate-100 p-1.5 rounded-2xl">
                {REGIONAL_GROUPS.map((group) => {
                  const isActive = selectedRegionGroup === group.name;
                  return (
                    <button
                      key={group.name}
                      type="button"
                      onClick={() => setSelectedRegionGroup(group.name)}
                      className={`px-4 py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? "bg-white text-rose-700 shadow-md shadow-slate-100 border border-slate-150"
                          : "text-slate-600 hover:text-slate-950 hover:bg-white/40"
                      }`}
                    >
                      <span className="text-lg leading-none">{group.icon}</span>
                      <span>{group.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Sub-grid */}
              <div className="bg-slate-50/40 border border-slate-150/70 rounded-2xl p-5">
                {REGIONAL_GROUPS.map((group) => {
                  const isActive = selectedRegionGroup === group.name;
                  if (!isActive) return null;

                  return (
                    <motion.div
                      key={group.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{group.icon}</span>
                        <span className="text-[10px] font-black text-rose-750 uppercase tracking-widest leading-none">
                          Pilih Provinsi di{" "}
                          {group.name === "Tipe Kerja"
                            ? "Opsi Kerja"
                            : `Kepulauan ${group.name}`}
                          :
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
                        {group.items.map((item) => {
                          const isFiltered = locationQuery === item.value;
                          return (
                            <motion.button
                              whileHover={{ scale: 1.02, y: -1 }}
                              whileTap={{ scale: 0.98 }}
                              key={item.value}
                              type="button"
                              onClick={() => selectLocation(item.value)}
                              className={`px-4 py-3 border rounded-xl text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between gap-2 shadow-xs ${
                                isFiltered
                                  ? "border-rose-500 bg-rose-50/70 text-rose-700 font-extrabold ring-2 ring-rose-500/10"
                                  : "border-slate-150 bg-white text-slate-700 hover:border-rose-300 hover:text-rose-700"
                              }`}
                            >
                              <span className="truncate">{item.label}</span>
                              {isFiltered ? (
                                <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                              ) : (
                                <MapPin className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── FILTER CHIPS WITH SUBTLE GLOW/THEMES ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 mb-1">
          <Filter className="w-4.5 h-4.5 text-[#c13a29]" />
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Filter Jenis Disabilitas
          </span>
          <div className="flex-1 h-px bg-slate-150" />
        </div>
        <div className="flex flex-wrap gap-2.5">
          {DISABILITY_CATEGORIES.map((cat) => {
            const active = selectedDisability === cat.id;
            return (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                key={cat.id}
                onClick={() => setSelectedDisability(cat.id)}
                className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full border text-xs font-black transition-all cursor-pointer ${
                  active
                    ? "bg-gradient-to-tr from-[#9e2a1b] to-[#dc4c38] border-none text-white shadow-md shadow-red-500/20 scale-102"
                    : "bg-white border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-700 hover:bg-rose-50/30"
                }`}
              >
                {DISABILITY_ICONS[cat.id.toLowerCase()] || (
                  <Globe className="w-4 h-4" />
                )}
                <span>{cat.name}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* ── LISTINGS ── */}
      <div className="space-y-5">
        <div className="flex items-center justify-between bg-slate-100/50 border border-slate-200/50 p-3.5 rounded-2xl px-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">
              Daftar Lowongan Pekerjaan
            </h2>
          </div>
          <span className="text-xs font-extrabold text-[#c13a29] bg-rose-50 border border-rose-150 px-4 py-1.5 rounded-full">
            {jobs.length} Tersedia
          </span>
        </div>

        {/* Dynamic active filter parameters indicator row */}
        {(searchQuery ||
          companyQuery ||
          locationQuery ||
          selectedDisability !== "all") && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-wrap items-center gap-2 bg-rose-50/50 border border-rose-100 p-4 rounded-2xl"
          >
            <span className="text-[11px] font-black text-[#c13a29] uppercase tracking-wider shrink-0 mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              Filter Aktif:
            </span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-rose-100 text-[#c13a29] text-xs font-bold rounded-xl shadow-xs">
                <span>Posisi: "{searchQuery}"</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    selectPosition("");
                  }}
                  className="p-0.5 hover:bg-rose-50 rounded-lg cursor-pointer leading-none"
                >
                  <X className="w-3 h-3 text-[#c13a29]" />
                </button>
              </span>
            )}
            {companyQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-rose-100 text-[#c13a29] text-xs font-bold rounded-xl shadow-xs">
                <span>Perusahaan: {companyQuery}</span>
                <button
                  type="button"
                  onClick={() => {
                    setCompanyQuery("");
                    selectCompany("");
                  }}
                  className="p-0.5 hover:bg-rose-50 rounded-lg cursor-pointer leading-none"
                >
                  <X className="w-3 h-3 text-[#c13a29]" />
                </button>
              </span>
            )}
            {locationQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#9e2a1b] to-[#dc4c38] text-white text-xs font-bold rounded-xl shadow-xs">
                <span>Lokasi: {locationQuery}</span>
                <button
                  type="button"
                  onClick={() => {
                    setLocationQuery("");
                    selectLocation("");
                  }}
                  className="p-0.5 hover:bg-black/10 rounded-lg cursor-pointer leading-none"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </span>
            )}
            {selectedDisability !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-rose-100 text-[#c13a29] text-xs font-bold rounded-xl shadow-xs">
                <span>
                  Disabilitas:{" "}
                  {DISABILITY_CATEGORIES.find(
                    (c) => c.id === selectedDisability,
                  )?.name || selectedDisability}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedDisability("all")}
                  className="p-0.5 hover:bg-rose-50 rounded-lg cursor-pointer leading-none"
                >
                  <X className="w-3 h-3 text-[#c13a29]" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSelectedDisability("all");
                setSearchQuery("");
                setCompanyQuery("");
                setLocationQuery("");
                fetchJobs({
                  search: "",
                  company: "",
                  location: "",
                  disability: "all",
                });
              }}
              className="text-xs font-bold text-slate-500 hover:text-rose-600 hover:underline cursor-pointer ml-auto shrink-0 transition-colors"
            >
              Bersihkan Semua Filter
            </button>
          </motion.div>
        )}

        {isLoading && (
          <div className="py-24 flex flex-col items-center gap-4">
            <RefreshCw className="w-8 h-8 text-[#c13a29] animate-spin" />
            <p className="text-xs text-slate-400 font-mono font-bold uppercase tracking-widest">
              Menyaring Lowongan...
            </p>
          </div>
        )}

        {!isLoading && jobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border border-dashed border-slate-200 rounded-3xl p-16 text-center space-y-4 shadow-sm"
          >
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <Search className="w-8 h-8" />
            </div>
            <p className="text-base font-black text-slate-800">
              Tidak Ada Lowongan Ditemukan
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-semibold">
              Kriteria filter atau pencarian Anda saat ini belum cocok dengan
              ketersediaan sistem. Coba atur ulang kata pencarian atau wilayah
              Anda.
            </p>
            <button
              onClick={() => {
                setSelectedDisability("all");
                setSearchQuery("");
                setCompanyQuery("");
                setLocationQuery("");
                fetchJobs({
                  search: "",
                  company: "",
                  location: "",
                  disability: "all",
                });
              }}
              className="mt-2 px-6 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-black transition-all cursor-pointer"
            >
              Reset Semua Filter
            </button>
          </motion.div>
        )}

        {!isLoading && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                key={job.id}
                className={`bg-white flex flex-col justify-between gap-6 p-6 rounded-3xl transition-all duration-300 border ${
                  idx === 0
                    ? "border-rose-400/40 shadow-md shadow-pink-50/40 relative overflow-hidden"
                    : "border-slate-150 hover:shadow-lg hover:shadow-slate-100 hover:border-rose-300/65"
                }`}
              >
                {idx === 0 && (
                  <div className="absolute -right-16 -top-16 w-32 h-32 bg-rose-500/5 rounded-full blur-xl pointer-events-none" />
                )}

                <div className="space-y-4.5">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-50 to-slate-100 border border-slate-150 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                      <img
                        src={job.companyLogoUrl}
                        alt={job.companyName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.opacity = "0";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-base font-black text-slate-900 leading-snug truncate hover:whitespace-normal transition-all"
                        title={job.title}
                      >
                        {job.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Building2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span className="text-xs font-extrabold text-[#c13a29] truncate">
                          {job.companyName}
                        </span>
                      </div>
                    </div>
                    {idx === 0 && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full shrink-0 uppercase tracking-wider">
                        <Star className="w-3 h-3 fill-rose-500 text-rose-500" />
                        Unggulan
                      </span>
                    )}
                  </div>

                  {/* Meta badges with neat design */}
                  <div className="flex flex-wrap gap-2">
                    {/* Interactive Clickable Location Tag */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const provinceValue = extractProvince(job.location);
                        selectLocation(provinceValue);
                      }}
                      className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-rose-700 bg-rose-50/60 hover:bg-rose-100 border border-rose-100 px-3 py-1.5 rounded-xl transition-all cursor-pointer group/loc"
                      title={`Klik untuk melihat semua di ${extractProvince(job.location)}`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-rose-600 group-hover/loc:scale-110 transition-transform" />
                      <span>{job.location}</span>
                    </button>

                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-150 px-3 py-1.5 rounded-xl">
                      <Coins className="w-3.5 h-3.5 text-amber-500" />
                      {job.salaryRange}
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-150 px-3 py-1.5 rounded-xl">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      Waktu Penuh
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-3">
                    {job.description}
                  </p>

                  <div className="h-px bg-slate-100" />

                  {/* Disability tags with high visual alignment */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                      <Accessibility className="w-3.5 h-3.5 text-rose-600" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Kategori Disabilitas
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.disabilityTypes.map((dId) => {
                        const cat = DISABILITY_CATEGORIES.find(
                          (c) => c.id === dId,
                        );
                        return (
                          <span
                            key={dId}
                            className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#993C1D] bg-[#FAECE7] border border-[#F5C4B3]/40 px-3 py-1 rounded-full shadow-2xs"
                          >
                            <span className="text-sm">{cat?.icon || "♿"}</span>
                            <span>{cat?.name || dId}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Accommodation tags */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Akomodasi Tersedia
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.accommodations.map((acc, aIdx) => (
                        <span
                          key={aIdx}
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-600 bg-slate-100/30 border border-slate-150 px-2.5 py-1 rounded-lg"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{acc}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2.5 pt-3 border-t border-slate-100">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleOpenApply(job)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#c13a29] hover:bg-[#a12f21] max-w-full text-white text-xs font-black py-3 rounded-xl transition-all cursor-pointer shadow-md shadow-red-500/10"
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                    Lamar Sekarang
                  </motion.button>
                  <button
                    onClick={() =>
                      setExpandedJobId(expandedJobId === job.id ? null : job.id)
                    }
                    className="px-4.5 py-3 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    {expandedJobId === job.id ? "Tutup" : "Detail"}
                  </button>
                </div>

                {/* Expanded requirements with smooth height transition */}
                <AnimatePresence>
                  {expandedJobId === job.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-slate-50/60 border border-slate-200/50 rounded-2xl p-4 flex flex-col gap-4 overflow-hidden"
                    >
                      <div>
                        <p className="text-xs font-black text-rose-800 uppercase tracking-wider mb-2">
                          Tanggung Jawab & Persyaratan:
                        </p>
                        <ul className="list-disc pl-4 space-y-2 text-xs text-slate-600 font-semibold leading-relaxed">
                          {job.requirements.map((req, rIdx) => (
                            <li key={rIdx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white border border-slate-150 rounded-xl p-4 flex gap-3 items-start shadow-2xs">
                        <HeartHandshake className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-black text-slate-800">
                            Proses Seleksi Adil & Setara
                          </p>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-semibold mt-0.5">
                            Proses rekrutmen dilaksanakan secara murni objektif
                            & inklusif tanpa seleksi fisik diskriminatif. Semua
                            data dijamin kerahasiaannya.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── HIGH-FIDELITY MODAL FORM ── */}
      <AnimatePresence>
        {showApplyModal && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-lg border border-slate-155 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] relative"
            >
              <div className="flex items-start justify-between gap-4 p-6.5 border-b border-slate-100">
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10px] font-black text-rose-700 bg-rose-50 border border-rose-100 px-3 py-1 rounded pb-1 rounded-full uppercase tracking-wider mb-2">
                    Form Pendaftaran Kerja
                  </span>
                  <h3
                    className="text-base sm:text-lg font-black text-slate-900 leading-snug truncate"
                    title={selectedJob.title}
                  >
                    {selectedJob.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-[#c13a29] font-extrabold text-xs">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{selectedJob.companyName}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="p-1.5 hover:bg-slate-150 border border-slate-150/50 rounded-xl text-slate-400 hover:text-slate-700 transition-all cursor-pointer inline-flex items-center justify-center shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6.5 overflow-y-auto">
                {applySuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center gap-4 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-50 border-2 border-emerald-200 rounded-full flex items-center justify-center shadow-lg shadow-emerald-100">
                      <Check className="w-10 h-10 text-emerald-600 stroke-[3px]" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">
                      Lamaran Terkirim
                    </h3>
                    <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-semibold">
                      Harap tunggu sejenak! CV dan lamaran digital Anda berhasil
                      diajukan secara aman ke HRD{" "}
                      <strong>{selectedJob.companyName}</strong>.
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider mt-2">
                      Diarahkan kembali...
                    </span>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleApplySubmit}
                    className="flex flex-col gap-5"
                  >
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                        Nama Lengkap Sesuai KTP *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Masukkan nama lengkap Anda..."
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 rounded-xl focus:outline-none focus:bg-white text-xs font-semibold text-slate-800 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-[#c13a29] uppercase tracking-widest mb-1.5 ml-1">
                          Nomor WhatsApp aktif *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: 081234567..."
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 rounded-xl focus:outline-none focus:bg-white text-xs font-semibold text-slate-800 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-[#c13a29] uppercase tracking-widest mb-1.5 ml-1">
                          Kategori Disabilitas *
                        </label>
                        <select
                          value={applicantDisability}
                          onChange={(e) =>
                            setApplicantDisability(e.target.value)
                          }
                          className="w-full px-3 py-3 bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 rounded-xl focus:outline-none focus:bg-white text-xs font-semibold text-slate-850 transition-all"
                        >
                          {selectedJob.disabilityTypes.map((dId) => {
                            const cat = DISABILITY_CATEGORIES.find(
                              (c) => c.id === dId,
                            );
                            return (
                              <option key={dId} value={dId}>
                                {cat?.name || dId}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#c13a29] uppercase tracking-widest mb-1.5 ml-1">
                        Surat Lamaran & Rincian Kebutuhan Akomodasi *
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Perkenalkan dirimu, kelebihanmu, serta jelaskan rincian akomodasi khusus yang sekiranya kamu butuhkan untuk bekerja..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 focus:outline-none focus:bg-white text-xs font-semibold text-slate-800 resize-none transition-all leading-relaxed"
                      />
                    </div>

                    <div className="flex items-start gap-3 bg-rose-50/40 border border-rose-100 p-3.5 rounded-xl">
                      <Info className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-slate-505 leading-relaxed font-semibold">
                        Profil digital Anda dan transkrip CV akan dilampirkan
                        otomatis secara langsung demi mempermudah tim rekruter
                        melakukan verifikasi berkas lamaran.
                      </p>
                    </div>

                    <div className="flex gap-2.5 justify-end pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowApplyModal(false)}
                        className="px-5 py-2.5 border border-slate-200 text-slate-500 hover:text-slate-800 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        Batal
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-1.5 bg-[#c13a29] hover:bg-[#a12f21] disabled:opacity-50 text-white px-5 py-3 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md shadow-red-500/10"
                      >
                        <Send className="w-3.5 h-3.5 text-white" />
                        {isSubmitting ? "Mengirim..." : "Kirim Lamaran Kerja"}
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
