import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import AuthScreen from "./AuthScreen";
import { User, AccessibilitySettings } from "../types";
import { DISABILITY_CATEGORIES, INITIAL_JOBS } from "../data/peluang-setara";
import {
  ArrowRight,
  Sparkles,
  Building2,
  CheckCircle2,
  Briefcase,
  ShieldCheck,
  Users,
  Award,
  Activity,
  Play,
  X,
  MessageSquare,
  ChevronDown,
  Star,
  Layers,
  Search,
  BookOpen,
  Volume2,
} from "lucide-react";

interface WixLandingPageProps {
  onAuthSuccess: (user: User) => void;
  accessibilitySettings: AccessibilitySettings;
  onNavigateToAuth?: (
    mode: "login" | "register",
    role?: "applicant" | "recruiter",
  ) => void;
}

export default function WixLandingPage({
  onAuthSuccess,
  accessibilitySettings,
  onNavigateToAuth,
}: WixLandingPageProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authHeading, setAuthHeading] = useState("Masuk Ke Akun Anda");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Stats Counters state with animated entry effects
  const [stats, setStats] = useState({
    companies: 120,
    jobs: 4200,
    success: 85,
  });

  useEffect(() => {
    // Tick stats slightly to mimic real-time activity on a busy server
    const interval = setInterval(() => {
      setStats((prev) => ({
        companies: prev.companies + (Math.random() > 0.8 ? 1 : 0),
        jobs: prev.jobs + (Math.random() > 0.7 ? 2 : 0),
        success: prev.success,
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [intendedRole, setIntendedRole] = useState<"applicant" | "recruiter">(
    "applicant",
  );

  const handleOpenAuth = (
    mode: "login" | "register" = "login",
    role: "applicant" | "recruiter" = "applicant",
  ) => {
    if (onNavigateToAuth) {
      onNavigateToAuth(mode, role);
    } else {
      setAuthMode(mode);
      setIntendedRole(role);
      setAuthHeading(
        mode === "register" ? "Registrasi Akun Baru" : "Masuk Ke Akun Anda",
      );
      setShowAuthModal(true);
    }
  };

  // Filter jobs dynamically on the landing page for interactive showcase!
  const dispCategory = DISABILITY_CATEGORIES.find(
    (c) => c.id === activeCategory,
  );
  const filteredJobs =
    activeCategory === "all"
      ? INITIAL_JOBS
      : INITIAL_JOBS.filter((job) =>
          job.disabilityTypes.some(
            (type) => type.toLowerCase() === activeCategory.toLowerCase(),
          ),
        );

  const faqs = [
    {
      q: "Bagaimana cara kerja penyesuaian akomodasi di Peluang Setara?",
      a: "Setiap rekruter yang memasang lowongan wajib menyertakan tipe disabilitas yang dapat diakomodasi serta fasilitas pendukung yang disediakan secara fisik maupun sistemik (misalnya software pembaca layar, interpreter bahasa isyarat, atau ramp kursi roda). Pelamar dapat menyaring lowongan berdasarkan akomodasi ini agar sesuai dengan kebutuhan specifisikasinya.",
    },
    {
      q: "Apakah seluruh layanan ini gratis untuk para penyandang disabilitas?",
      a: "Sangat benar! Peluang Setara berkomitmen memberikan akses gratis tanpa batas untuk seluruh rekan tunadaksa, tunarungu, tunanetra, grahita, maupun mental di Indonesia untuk melamar pekerjaan, melacak berkas CV, serta membaca modul tips karir adaptif.",
    },
    {
      q: "Bagaimana perusahaan mengukur tingkat kepatuhan akomodasi mereka?",
      a: "Tim HRD perusahaan dapat menggunakan fitur Instan Kalkulator Skor Inklusi kami untuk menghitung persentase adaptasi lingkungan mereka secara interaktif. Berdasarkan skor dari pilihan fasilitas pendukung, sistem secara otomatis memberikan lencana kepatuhan digital (Bronze, Silver, Gold Web Standards).",
    },
    {
      q: "Apakah sistem ini mematuhi standar aksesibilitas web internasional?",
      a: "Ya. Aplikasi Peluang Setara dirancang khusus agar kompatibel dengan pembaca layar (screen reader NVDA / JAWS), navigasi keyboard penuh, kontras tinggi (high contrast mode), penyesuaian ukuran teks, peredaman animasi bagi vestibular disorder, serta font khusus disleksia (dyslexia font).",
    },
  ];

  return (
    <div className="w-full bg-slate-50 text-slate-800 font-sans relative overflow-x-hidden min-h-screen flex flex-col">
      {/* 1. TOP Wix-style Header / Navigation bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm px-6 py-4.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Branding */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3 shadow-md shadow-slate-900/10">
              <span className="text-lg">♿</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold text-slate-900 text-xl tracking-tight leading-none">
                  Peluang Setara
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ee523f] animate-ping" />
              </div>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none block mt-1">
                WIX PARTNER FOR EQUALITY
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-650">
            <a
              href="#fitur"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-all"
            >
              Eksplor Loker
            </a>
            <a
              href="#pilar"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-all"
            >
              Pilar Utama
            </a>
            <a
              href="#testimonials"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-all"
            >
              Kisah Sukses
            </a>
            <a
              href="#faq"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-all"
            >
              Tanya Jawab
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleOpenAuth("login", "applicant")}
              className="text-xs font-black text-slate-800 hover:text-red-650 px-3 py-1.5 transition-all cursor-pointer"
            >
              Log In
            </button>
            <button
              onClick={() => handleOpenAuth("register", "applicant")}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-black tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:-translate-y-0.5"
            >
              Mulai Sekarang
            </button>
          </div>
        </div>
      </header>

      {/* 2. Wix HERO Section with Massive Typography and Clean Gradients */}
      <section className="relative py-20 lg:py-28 px-6 bg-radial-at-t from-orange-50/70 via-white to-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-left md:pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ee523f]/10 text-[#c13a29] rounded-full border border-[#ee523f]/15">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                AKSESIBILITAS WEB AA &bull; WCAG 2.1 COMPLIANT
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05] font-sans">
              Bangun{" "}
              <span className="bg-gradient-to-r from-slate-900 via-[#c13a29] to-[#ee523f] bg-clip-text text-transparent">
                Karir Impian
              </span>{" "}
              Anda, Tanpa Hambatan.
            </h1>

            <p className="text-slate-600 text-sm sm:text-lg leading-relaxed max-w-2xl font-medium">
              Satu-satunya platform rekrutmen inklusif terstandarisasi di
              Indonesia yang mempertemukan talenta disabilitas luar biasa dengan
              korporasi nasional ramah aksesibilitas fisik, sensorik, dan
              digital.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => handleOpenAuth("register", "applicant")}
                className="px-8 py-4 bg-slate-900 hover:bg-[#c13a29] text-white font-black tracking-wide rounded-full text-xs sm:text-sm uppercase transition-all duration-300 shadow-xl cursor-pointer flex items-center gap-2 group-hover:gap-3"
              >
                <span>Temukan Lowongan Kerja</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => handleOpenAuth("register", "recruiter")}
                className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-slate-800 font-black tracking-wide rounded-full text-xs sm:text-sm uppercase transition-all duration-300 cursor-pointer"
              >
                Registrasi Mitra HRD (Pemberi Kerja)
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-slate-200 max-w-xl">
              <div>
                <p className="text-xl sm:text-3xl font-black text-slate-900">
                  {stats.companies}+
                </p>
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Korporasi Inklusif
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-black text-slate-900">
                  {stats.jobs}+
                </p>
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Loker Sukses Terbit
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-black text-[#ee523f]">
                  {stats.success}%
                </p>
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Nilai Kepuasan
                </p>
              </div>
            </div>
          </div>

          {/* Right Floating Dashboard Mockup Columns (Highly Interactive UI elements mimic screenshots) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            {/* Visual Decorative Blur Orbs */}
            <div className="absolute top-10 right-10 w-72 h-72 bg-[#c13a29]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-sm sm:max-w-md bg-white border border-slate-200/80 rounded-[2rem] p-6 shadow-2xl relative space-y-5 flex flex-col justify-between">
              {/* Fake Dashboard Title */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-600" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="px-3 py-1 bg-slate-100 rounded-lg text-[9px] font-mono text-slate-500 font-bold uppercase">
                  peluang-setara-live-preview
                </div>
              </div>

              {/* Float Widget 1: Job Match Badge */}
              <div
                className="p-3 bg-indigo-50 border border-indigo-150 rounded-2xl flex items-center gap-3 animate-bounce shadow-sm"
                style={{ animationDuration: "3.5s" }}
              >
                <span className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">
                  💼
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[11px] font-black text-indigo-900 uppercase">
                    Automated Fit Match
                  </h4>
                  <p className="text-[10px] text-indigo-700 font-medium truncate">
                    Akomodasi Sensorik Rungu terverifikasi ✓
                  </p>
                </div>
              </div>

              {/* Float Widget 2: Live Accessibility Checklist */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2 text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                  Fitur Kenyamanan Khusus
                </p>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <span className="text-emerald-500">✓</span>
                    <span>Modul Baca Bersuara (Screen Reader Compatible)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <span className="text-emerald-500">✓</span>
                    <span>Menu Kontras Tinggi & Ukuran Font Dinamis</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <span className="text-emerald-500">✓</span>
                    <span>Tipe Font Ramah Rekan Pengidap Disleksia</span>
                  </div>
                </div>
              </div>

              {/* Float Widget 3: Live Inclusion Score */}
              <div className="bg-[#c13a29]/5 border border-[#c13a29]/15 p-4 rounded-2xl flex items-center justify-between text-left">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Inclusion Rating Score
                  </p>
                  <p className="text-xs font-black text-slate-800">
                    PT Global Sentra Solusi
                  </p>
                  <span className="inline-block px-1.5 py-0.5 bg-emerald-500 text-white font-extrabold text-[8px] rounded uppercase">
                    GOLD RATING
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center font-black text-xs text-slate-800">
                  92%
                </div>
              </div>

              <p className="text-[9px] text-slate-400 text-center font-mono leading-relaxed mt-2 uppercase tracking-wide">
                Gunakan menu asistif melingkar di pojok layar untuk mencoba
                asistensi aksesibilitas saat ini juga!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trusted Partners scrolling strip */}
      <section className="bg-slate-100 py-10 px-6 border-y border-slate-200 overflow-hidden relative">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest text-center">
            DIKEMBANGKAN BERSAMA & DIPERCAYA OLEH KORPORASI INKLUSIF PREMIER
            INDONESIA
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all">
            <span className="text-xs sm:text-sm font-black tracking-widest text-[#c13a29]">
              PT GLOBAL SENTRA SOLUSI
            </span>
            <span className="text-xs sm:text-sm font-black tracking-widest text-slate-800">
              BANK CENTRAL ASIA
            </span>
            <span className="text-xs sm:text-sm font-black tracking-widest text-slate-800">
              TEKNOLOGI HIJAU
            </span>
            <span className="text-xs sm:text-sm font-black tracking-widest text-slate-800">
              ASTRA INTERNATIONAL
            </span>
            <span className="text-xs sm:text-sm font-black tracking-widest text-slate-800">
              TELKOM INDONESIA
            </span>
          </div>
        </div>
      </section>

      {/* 4. Interactive Feature Showcase Area (Disability Filter Demonstration) */}
      <section
        id="fitur"
        className="py-20 px-6 bg-white border-b border-slate-150"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-black text-[#c13a29] uppercase tracking-widest block">
              EKOSISTEM ADAPTIF
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Satu Jaringan, Berbagai Kebutuhan Terpenuhi.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Saring peluang kerja profesional secara real-time berdasarkan
              sediaan kriteria kenyamanan dan adaptasi kerja di bawah ini.
            </p>
          </div>

          {/* Interactive tabs for categories like Wix */}
          <div className="flex flex-wrap justify-center gap-2">
            {DISABILITY_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-slate-100 hover:bg-slate-200/80 text-slate-600"
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Display grid of the mock preview jobs matching the chosen category */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredJobs.slice(0, 3).map((job) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={job.id}
                  className="bg-slate-50 border border-slate-200/80 hover:border-[#c13a29] transition-all duration-300 p-6 rounded-2xl flex flex-col justify-between gap-5 text-left hover:shadow-lg hover:-translate-y-0.5 group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div className="px-3 py-1 bg-[#c13a29]/10 text-[#c13a29] rounded-md text-[9px] font-black uppercase tracking-wider font-mono">
                        {job.salaryRange}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">
                        1d ago
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-slate-900 group-hover:text-[#c13a29] leading-snug transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold line-clamp-3 leading-relaxed">
                      {job.description}
                    </p>

                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        Sediaan Akomodasi:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {job.accommodations.map((acc) => (
                          <span
                            key={acc}
                            className="px-2 py-0.5 bg-white border border-slate-200 text-[8.5px] font-bold rounded-md text-slate-600"
                          >
                            {acc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={job.companyLogoUrl}
                        alt={job.companyName}
                        className="w-6 h-6 rounded object-cover"
                      />
                      <span className="text-[10px] font-black text-slate-700 uppercase">
                        {job.companyName}
                      </span>
                    </div>
                    <button
                      onClick={() => handleOpenAuth("login", "applicant")}
                      className="text-[10px] font-extrabold text-[#c13a29] hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Lamar loker</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => handleOpenAuth("login", "applicant")}
              className="px-6 py-3 bg-slate-900 hover:bg-[#c13a29] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-sm"
            >
              <span>Eksplor Dan Lamar lowongan Lainnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Wix Bento Grid Pillars - Showcase of App Features */}
      <section
        id="pilar"
        className="py-20 px-6 bg-white border-b border-slate-150"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-black text-[#c13a29] uppercase tracking-widest block font-bold">
              WIRED FOR EQUAL OPPORTUNITY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pilar Teknologi Aksesibilitas Peluang Setara
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
              Teknologi inklusif modern yang memecah batas keterbatasan akses
              fisik maupun digital bagi sumber daya manusia terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Bento Grid Item 1 (6 cols) */}
            <div className="md:col-span-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-8 rounded-[2rem] shadow-md relative overflow-hidden flex flex-col justify-between gap-8 text-left border border-slate-800">
              <div className="space-y-3 z-10">
                <span className="px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-md inline-block">
                  Akomodasi Fleksibel
                </span>
                <h3 className="text-xl font-extrabold text-white leading-snug">
                  Modul Filter Keragaman Kemampuan Kerja
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold max-w-sm">
                  Dukungan penyaringan spesifik untuk tuna-netra (mendukung
                  screen reader), tuna-rungu (komunikasi visual tertulis),
                  tuna-daksa (akses ramp & lift), grahita, dan mental.
                </p>
              </div>
              <div className="z-10 flex gap-2">
                <span className="px-2.5 py-1 bg-white/10 text-white rounded-md text-[10px] font-extrabold">
                  ♿ Daksa
                </span>
                <span className="px-2.5 py-1 bg-white/10 text-white rounded-md text-[10px] font-extrabold">
                  🧏 Rungu
                </span>
                <span className="px-2.5 py-1 bg-white/10 text-white rounded-md text-[10px] font-extrabold">
                  👁️ Netra
                </span>
              </div>
              {/* background vector decorative circle */}
              <div className="absolute right-[-40px] bottom-[-40px] w-48 h-48 rounded-full bg-[#c13a29]/15 blur-3xl pointer-events-none" />
            </div>

            {/* Bento Grid Item 2 (6 cols) */}
            <div className="md:col-span-6 bg-slate-50 border border-slate-200/80 p-8 rounded-[2rem] shadow-sm flex flex-col justify-between gap-8 text-left">
              <div className="space-y-3">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-600 border border-blue-500/20 text-[9px] font-black uppercase tracking-widest rounded-md inline-block">
                  Kepatuhan Standar
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                  Instan Hasil Akreditasi HRD
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Sistem pemeringkatan digital kami memberikan jaminan
                  kredibilitas lingkungan kerja perusahaan dengan metrika WCAG
                  2.1 AA terintegrasi secara instan dan tanpa biaya
                  administrasi.
                </p>
              </div>
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏆</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">
                    WCAG GOLD CERTIFIED
                  </span>
                </div>
                <span className="text-xs text-emerald-600 font-black">
                  ACTIVE
                </span>
              </div>
            </div>

            {/* Bento Grid Item 3 (4 cols) */}
            <div className="md:col-span-4 bg-slate-50 border border-slate-200/80 p-8 rounded-[2rem] shadow-sm flex flex-col justify-between gap-6 text-left">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                  💡
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Tips Karir & Edukasi
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Kumpulan modul, pembelajaran, dan bimbingan karir khusus yang
                  membahas penyesuaian fungsional di lingkungan kerja nyata.
                </p>
              </div>
              <button
                onClick={() => handleOpenAuth("login", "applicant")}
                className="text-xs font-extrabold text-[#c13a29] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Baca Modul Karir</span>
                <ChevronDown className="w-4 h-4 transform -rotate-90" />
              </button>
            </div>

            {/* Bento Grid Item 4 (4 cols) */}
            <div className="md:col-span-4 bg-slate-50 border border-slate-200/80 p-8 rounded-[2rem] shadow-sm flex flex-col justify-between gap-6 text-left">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                  📁
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  CV Adaptif & Transparan
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Kirim CV digital Anda ke rekruter dengan transparansi riwayat
                  evaluasi status lamaran secara terpusat dan real-time.
                </p>
              </div>
              <button
                onClick={() => handleOpenAuth("login", "applicant")}
                className="text-xs font-extrabold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Kelola Berkas Saya</span>
                <ChevronDown className="w-4 h-4 transform -rotate-90" />
              </button>
            </div>

            {/* Bento Grid Item 5 (4 cols) */}
            <div className="md:col-span-4 bg-slate-50 border border-slate-200/80 p-8 rounded-[2rem] shadow-sm flex flex-col justify-between gap-6 text-left">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg">
                  ⚙️
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Menu Aksesibilitas Khusus
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Tinjau dengan widget penyesuai visual untuk mengatasi hambatan
                  navigasi, pembacaan kontras dsb secara mandiri.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-400 font-mono">
                STAND-BY 🟢
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Client Testimonial Stories */}
      <section
        id="testimonials"
        className="py-20 px-6 bg-slate-50 border-b border-slate-150"
      >
        <div className="max-w-7xl mx-auto space-y-12 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] font-black text-[#c13a29] uppercase tracking-widest block font-bold">
                TESTIMONI REKAN & MITRA
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Kami Bangga Menepis Batas Kemampuan Bersama.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-550 font-medium max-w-md">
              Kisah nyata bagaimana standardisasi fasilitas akomodasi digital
              dan fisik berhasil melahirkan lingkungan karir baru bagi talenta
              hebat di Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Story 1 */}
            <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-2xl flex flex-col justify-between gap-6 shadow-xs">
              <div className="space-y-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed italic">
                  &ldquo;Aplikasi ini membantu saya menyaring pekerjaan Customer
                  Service Chat yang sangat ideal bagi kondisi rungu wicara saya.
                  Pihak PT Global Sentra Solusi menyediakan komunikasi internal
                  berbasis teks penuh yang bebas hambatan.&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                  JR
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">
                    Jessica Ruth Ylie
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono font-bold">
                    Pelamar &bull; Customer Service Chat
                  </p>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-2xl flex flex-col justify-between gap-6 shadow-xs">
              <div className="space-y-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed italic">
                  &ldquo;Indeks Kalkulator Kepatuhan Aksesibilitas milik Peluang
                  Setara memandu divisi HRD kami menyiapkan sarana ramp kursi
                  roda, headphone noise peredam bising, dsb, guna menciptakan
                  ruang kerja yang ramah bagi seluruh karyawan
                  disabilitas.&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                  HR
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">
                    Budi Setiawan, M.Psi.
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono font-bold">
                    Recruiter &bull; HR Manager Global Sentra
                  </p>
                </div>
              </div>
            </div>

            {/* Story 3 */}
            <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-2xl flex flex-col justify-between gap-6 shadow-xs">
              <div className="space-y-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed italic">
                  &ldquo;Bekerja penuh secara jarak jauh dari Yogyakarta dalam
                  bidang entri data pertanian digital merupakan anugerah besar.
                  Integrasi software pembaca layar (NVDA/JAWS) di perusahaan ini
                  dijamin lancar dan didukung mentor pendamping!&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                  AF
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">
                    Aris Fitrianto
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono font-bold">
                    Pelamar &bull; Data Entry Specialist (WFH)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Wix-style Interactive FAQ Section with Collapsible items */}
      <section
        id="faq"
        className="py-20 px-6 bg-white border-b border-slate-150"
      >
        <div className="max-w-4xl mx-auto space-y-12 text-left">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-black text-[#c13a29] uppercase tracking-widest block font-bold">
              UNTUK PEMAHAMAN LEBIH DALAM
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
              Mempunyai pertanyaan lebih lanjut seputar platform rekrutmen kami?
              Temukan jawaban tepat di bawah ini.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200/90 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 bg-slate-50 hover:bg-slate-100/70 flex justify-between items-center text-left text-xs sm:text-sm font-black text-slate-800 tracking-tight gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`transition-transform duration-250 shrink-0 ${isOpen ? "rotate-185 text-[#c13a29]" : "text-slate-400"}`}
                    >
                      ▼
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-white border-t border-slate-150"
                      >
                        <div className="p-5 sm:p-6 text-xs sm:text-[13px] text-slate-500 leading-relaxed font-semibold">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Final Bottom CTA Banner in deep charcoal colors */}
      <section className="bg-slate-900 py-16 sm:py-24 px-6 text-white text-center relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c13a29]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-[#ee523f]/15 border border-[#ee523f]/30 text-[#ee523f] text-[10px] font-black uppercase tracking-widest inline-block animate-pulse">
            SIAP MEWUJUDKAN LINGKUNGAN INKLUSIF BERKREASI?
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">
            Mulai Ambil Peran Nyata Anda Hari Ini Secara Gratis
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-semibold">
            Bergabunglah bersama ribuan talenta hebat tunadaksa, tunarungu,
            low-vision, grahita, maupun mental di Indonesia. Bersama mitra
            korporasi terpercaya membangun Indonesia yang setara.
          </p>

          <div className="pt-4 flex justify-center flex-wrap gap-4">
            <button
              onClick={() => handleOpenAuth("register", "applicant")}
              className="px-8 py-3.5 bg-[#c13a29] hover:bg-[#a12f21] text-white rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-200 shadow-lg cursor-pointer"
            >
              Mulai Petualangan Kerja Anda
            </button>
            <button
              onClick={() => handleOpenAuth("register", "recruiter")}
              className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-150 border border-slate-700 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-200 cursor-pointer"
            >
              Pasang Lowongan Pertama (HRD)
            </button>
          </div>
        </div>
      </section>

      {/* 10. Clean minimalist footer info */}
      <footer className="bg-slate-950 text-white py-12 px-6 border-t border-slate-800 text-center pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex justify-center items-center gap-2">
            <span className="text-xl">♿</span>
            <span className="font-extrabold text-white text-lg tracking-tight">
              Peluang Setara
            </span>
          </div>
          <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
            Mitra resmi integrasi kesempatan setara bagi penyandang disabilitas
            di seluruh lingkup industri korporasi Indonesia. Patuh Terhadap Web
            Standardisasi WCAG 2.1 AA.
          </p>
          <div className="text-[10px] text-slate-600 font-mono">
            &copy; {new Date().getFullYear()} Peluang Setara Wix-Style Portal.
            Diproteksi oleh sistem enkripsi data lokal.
          </div>
        </div>
      </footer>

      {/* 11. Custom Pop-up glass backdrop modal rendering default AuthScreen */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 relative"
          >
            {/* Click backdrop to exit */}
            <div
              className="absolute inset-0"
              onClick={() => setShowAuthModal(false)}
            />

            {/* Inner responsive Modal frame */}
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg z-10 bg-white/95 border border-slate-200 p-2 sm:p-5 rounded-3xl shadow-2xl relative"
            >
              {/* Close Button on Top Right */}
              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 p-2 bg-slate-150 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-all cursor-pointer"
                title="Tutup dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Render our default credentials form AuthScreen */}
              <div className="scale-95 origin-top sm:scale-100">
                <AuthScreen
                  key={`${authMode}-${intendedRole}`}
                  initialIsLogin={authMode === "login"}
                  initialRole={intendedRole}
                  onAuthSuccess={(user) => {
                    // Trigger successfully signed/logged in state!
                    setShowAuthModal(false);
                    onAuthSuccess(user);
                  }}
                  accessibilitySettings={accessibilitySettings}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
