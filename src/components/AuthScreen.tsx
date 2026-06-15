import React, { useState } from 'react';
import { User, AccessibilitySettings } from '../types';
import { 
  Mail, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  Sparkles, 
  UserCheck, 
  Building, 
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthScreenProps {
  onAuthSuccess: (user: User) => void;
  accessibilitySettings: AccessibilitySettings;
  initialIsLogin?: boolean;
  initialRole?: 'applicant' | 'recruiter';
  onBackToLanding?: () => void;
}

export default function AuthScreen({ onAuthSuccess, accessibilitySettings, initialIsLogin, initialRole, onBackToLanding }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(initialIsLogin !== undefined ? initialIsLogin : true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'applicant' | 'recruiter'>(initialRole || 'applicant');
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickLogin = async (demoEmail: string) => {
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: demoEmail, password: 'password123' })
      });

      let data: any = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const errorText = await response.text();
        throw new Error(errorText || `Error HTTP! Status: ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan sistem.');
      }

      setSuccessMsg('Masuk berhasil! Mengalihkan ke dashboard...');
      setTimeout(() => {
        onAuthSuccess(data);
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Koneksi gagal.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);

    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin 
      ? { email, password } 
      : { name, email, password, role };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      let data: any = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const errorText = await response.text();
        throw new Error(errorText || `Error HTTP! Status: ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan sistem.');
      }

      if (isLogin) {
        setSuccessMsg('Masuk berhasil! Mengalihkan...');
        setTimeout(() => {
          onAuthSuccess(data);
        }, 800);
      } else {
        setSuccessMsg('Pendaftaran berhasil! Mengalihkan ke dashboard...');
        setTimeout(() => {
          onAuthSuccess(data);
        }, 800);
      }
    } catch (err: any) {
      setError(err.message || 'Koneksi gagal atau salah data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="auth-screen-container" className="w-full max-w-md mx-auto relative z-10 py-6">
      {onBackToLanding && (
        <button
          type="button"
          onClick={onBackToLanding}
          className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#c13a29] border border-slate-200 shadow-sm rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
        >
          ← Kembali ke Beranda
        </button>
      )}
      <div className="w-full space-y-5 bg-white p-4 sm:p-5 rounded-2xl relative shadow-xl border border-slate-200/50">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex bg-gradient-to-tr from-[#9e2a1b] via-[#c13a29] to-[#ee523f] text-white w-12 h-12 rounded-2xl items-center justify-center shadow-lg shadow-red-500/10 mb-1 transform hover:rotate-3 transition-transform">
            <span className="text-xl leading-none">♿</span>
          </div>
          
          <div className="space-y-0.5">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              {isLogin ? 'Masuk ke Peluang Setara' : 'Daftar Akun Baru'}
            </h2>
            <p className="text-[10px] font-black text-[#c13a29] uppercase tracking-widest block py-0.5">
              Peluang Setara Inklusif
            </p>
            <p className="text-[11px] text-slate-500 font-semibold max-w-sm mx-auto leading-relaxed">
              {isLogin 
                ? 'Akses lowongan pekerjaan inklusif yang disesuaikan dengan profil akomodasi dan kemampuan Anda.' 
                : 'Buat akun Anda gratis untuk mulai melamar pekerjaan dan mengelola profil rekrutasi Anda.'}
            </p>
          </div>
        </div>

        {/* Elegant Segmented Switcher (Tabs) for Login vs Register */}
        <div id="auth-tab-switcher" className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50">
          <button
            type="button"
            id="auth-tab-login"
            onClick={() => {
              setIsLogin(true);
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-3 text-center rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-250 cursor-pointer ${
              isLogin 
                ? 'bg-white text-slate-900 shadow-md scale-[1.01]' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Masuk (Log In)
          </button>
          <button
            type="button"
            id="auth-tab-[#c13a29]"
            onClick={() => {
              setIsLogin(false);
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-3 text-center rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-250 cursor-pointer ${
              !isLogin 
                ? 'bg-gradient-to-r from-[#9e2a1b] to-[#dc4c38] text-white shadow-md scale-[1.01]' 
                : 'text-slate-500 hover:text-[#c13a29]'
            }`}
          >
            Daftar (Register)
          </button>
        </div>

        {/* Quick Access Demo Accounts Widget */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 space-y-2">
          <div className="flex items-center gap-1.5 justify-center">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              AKSES MASUK CEPAT DEMO:
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('jessicaruthylie@gmail.com')}
              disabled={isLoading}
              className="p-2.5 bg-white hover:bg-red-50/50 border border-slate-200 hover:border-[#c13a29] text-left rounded-xl transition-all duration-200 cursor-pointer group flex items-center gap-2 shadow-sm"
              title="Masuk sebagai Pelamar Kerja (Jessica)"
            >
              <div className="bg-red-100 text-[#c13a29] w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                👤
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-extrabold text-slate-700 leading-none group-hover:text-[#c13a29]">Pelamar Kerja</p>
                <p className="text-[8px] font-mono text-slate-400 leading-none mt-1 truncate">jessicaruthylie@gmail.com</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('recruitment@globalsentra.id')}
              disabled={isLoading}
              className="p-2.5 bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-800 text-left rounded-xl transition-all duration-200 cursor-pointer group flex items-center gap-2 shadow-sm"
              title="Masuk sebagai Recruiter/HRD"
            >
              <div className="bg-slate-100 text-slate-800 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                🏢
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-extrabold text-slate-700 leading-none group-hover:text-slate-800">Recruiter / HRD</p>
                <p className="text-[8px] font-mono text-slate-400 leading-none mt-1 truncate">recruitment@globalsentra.id</p>
              </div>
            </button>
          </div>
          <p className="text-[8px] text-slate-400 text-center font-mono">Kata Sandi: <strong className="text-slate-600">password123</strong></p>
        </div>



        {/* Action Error / Success Display messages */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex gap-2.5 text-red-750 text-xs font-semibold leading-relaxed"
            >
              <AlertCircle className="w-5 h-5 text-red-650 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-3.5 bg-emerald-50 border border-emerald-250 rounded-xl flex gap-2.5 text-emerald-800 text-xs font-semibold leading-relaxed"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 1. Name input (only for Register) */}
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nama Lengkap</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Jessica Ruth"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10.5 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#c13a29] rounded-2xl text-xs outline-none transition-all duration-200"
                />
              </div>
            </div>
          )}

          {/* 2. Email Address */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Alamat Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                placeholder="email@contoh.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10.5 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#c13a29] rounded-2xl text-xs outline-none transition-all duration-200 font-mono"
              />
            </div>
          </div>

          {/* 3. Password */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kata Sandi</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Masukkan kata sandi..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10.5 pr-11 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#c13a29] rounded-2xl text-xs outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 4. Role Selection capsules (only for Register) */}
          {!isLogin && (
            <div className="space-y-1.5 pt-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Mendaftar Sebagai</label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setRole('applicant')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    role === 'applicant'
                      ? 'bg-[#c13a29]/10 border-[#c13a29] text-[#c13a29] font-extrabold'
                      : 'bg-white border-slate-250 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span className="text-xs">Pencari Kerja</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('recruiter')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    role === 'recruiter'
                      ? 'bg-slate-900 border-slate-900 text-white font-extrabold'
                      : 'bg-white border-slate-250 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span className="text-xs">Penyedia Kerja / HRD</span>
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-[#9e2a1b] to-[#dc4c38] text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-200 mt-6 flex items-center justify-center gap-2 shadow-lg shadow-red-500/10 hover:-translate-y-0.5 cursor-pointer ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>{isLogin ? 'Masuk Sekarang' : 'Daftar & Buat Akun'}</span>
            )}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>

        </form>

        {/* Modal Switch link */}
        <div className="text-center pt-2 border-t border-slate-100/80">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setSuccessMsg(null);
            }}
            className="text-xs font-bold text-[#c13a29] hover:underline cursor-pointer"
          >
            {isLogin 
              ? 'Belum punya akun? Registrasi Akun Baru' 
              : 'Sudah memiliki akun? Masuk di sini'}
          </button>
        </div>

        {/* Accessibility support tooltip if enabled */}
        {accessibilitySettings.tooltips && (
          <div className="bg-amber-50 border border-amber-200/50 p-3.5 rounded-xl flex gap-2.5 text-amber-800 text-[10px] leading-relaxed font-semibold animate-in fade-in duration-200">
            <Info className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Bantuan Visual:</strong> Masuk untuk mengakses resume dan riwayat lamaran Anda, atau daftarkan akun baru dengan memilih jenis peran pencari kerja atau penyedia kerja.
            </span>
          </div>
        )}

      </div>

    </div>
  );
}
