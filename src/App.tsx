import React, { useState, useEffect } from "react";
import CariLowonganTab from "./components/CariLowonganTab";
import DaftarPerusahaanTab from "./components/DaftarPerusahaanTab";
import TipsKarirTab from "./components/TipsKarirTab";
import LamaranSayaTab from "./components/LamaranSayaTab";
import RecruiterDashboardTab from "./components/RecruiterDashboardTab";
import ErrorBoundary from "./components/ErrorBoundary";
import AccessibilityMenu from "./components/AccessibilityMenu";
import AuthScreen from "./components/AuthScreen";
import WixLandingPage from "./components/WixLandingPage";
import { AccessibilitySettings, User } from "./types";
import {
  Search,
  BookOpen,
  Briefcase,
  Building2,
  Layers,
  HelpCircle,
  Sparkles,
  Phone,
  Mail,
  UserCheck,
  Globe,
  Settings,
  LogOut,
} from "lucide-react";

export default function App() {
  return (
    <div style={{ padding: "50px", fontSize: "32px" }}>
      Aplikasi Berjalan!
    </div>
  );
}



  const [authView, setAuthView] = useState<"landing" | "login" | "register">(
    "landing",
  );
  const [authRole, setAuthRole] = useState<"applicant" | "recruiter">(
    "applicant",
  );

  // Try to load authenticated user from localStorage
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("peluangsetara_auth_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use default
      }
    }
    return null;
  });

  const [currentUserEmail, setCurrentUserEmail] = useState<string>(
    "jessicaruthylie@gmail.com",
  );
  const [profileName, setProfileName] = useState<string>("Jessica Ruth Ylie");

  useEffect(() => {
    if (currentUser) {
      setCurrentUserEmail(currentUser.email);
      setProfileName(currentUser.name);
      if (
        currentUser.role === "applicant" &&
        (activeTab === "perusahaan" || activeTab === "dashboard")
      ) {
        setActiveTab("lowongan");
      }
    }
  }, [currentUser, activeTab]);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setAuthView("landing");
    localStorage.setItem("peluangsetara_auth_user", JSON.stringify(user));
    if (user.role === "recruiter") {
      setActiveTab("dashboard");
    } else {
      setActiveTab("lowongan");
    }
  };

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    if (!isProfileDropdownOpen) return;
    const clickOutside = () => setIsProfileDropdownOpen(false);
    window.addEventListener("click", clickOutside);
    return () => window.removeEventListener("click", clickOutside);
  }, [isProfileDropdownOpen]);

  const toggleProfileDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleDropdownContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsProfileDropdownOpen(false);
    localStorage.removeItem("peluangsetara_auth_user");
  };

  const getInitials = (nameStr: string) => {
    if (!nameStr) return "G";
    const parts = nameStr.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nameStr.slice(0, 2).toUpperCase();
  };

  // Load accessibility settings from localstorage
  const [accessibilitySettings, setAccessibilitySettings] =
    useState<AccessibilitySettings>(() => {
      const saved = localStorage.getItem("peluangsetara_accessibility");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // use default
        }
      }
      return {
        contrast: "normal",
        highlightLinks: false,
        fontSize: "normal",
        textSpacing: "normal",
        pauseAnimations: false,
        dyslexiaFont: false,
        bigCursor: false,
        tooltips: false,
        lineHeight: "normal",
      };
    });

  // Persist settings whenever changed
  const handleAccessibilityChange = (newSettings: AccessibilitySettings) => {
    setAccessibilitySettings(newSettings);
    localStorage.setItem(
      "peluangsetara_accessibility",
      JSON.stringify(newSettings),
    );
  };

  // Build the corresponding dynamic classes to inject in index wrapper
  const getAccessibilityClasses = () => {
    const classes: string[] = [];

    if (accessibilitySettings.contrast === "high") {
      classes.push("accessibility-contrast-high");
    }
    if (accessibilitySettings.highlightLinks) {
      classes.push("accessibility-highlight-links");
    }
    if (accessibilitySettings.fontSize === "large") {
      classes.push("accessibility-font-large");
    } else if (accessibilitySettings.fontSize === "extra-large") {
      classes.push("accessibility-font-extra-large");
    }
    if (accessibilitySettings.textSpacing === "wide") {
      classes.push("accessibility-spacing-wide");
    } else if (accessibilitySettings.textSpacing === "extra-wide") {
      classes.push("accessibility-spacing-extra-wide");
    }
    if (accessibilitySettings.dyslexiaFont) {
      classes.push("accessibility-dyslexia");
    }
    if (accessibilitySettings.bigCursor) {
      classes.push("accessibility-big-cursor");
    }
    if (accessibilitySettings.lineHeight === "tall") {
      classes.push("accessibility-line-tall");
    } else if (accessibilitySettings.lineHeight === "extra-tall") {
      classes.push("accessibility-line-extra-tall");
    }
    if (accessibilitySettings.pauseAnimations) {
      classes.push("accessibility-pause-animations");
    }

    return classes.join(" ");
  };

  if (!currentUser) {
    return (
      <div
        id="peluang-setara-app-shell"
        className={`min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 transition-all duration-300 relative ${getAccessibilityClasses()}`}
      >
        <ErrorBoundary fallbackTitle="Gagal Memuat Landing Page Portal">
          {authView === "landing" ? (
            <WixLandingPage
              onAuthSuccess={handleAuthSuccess}
              accessibilitySettings={accessibilitySettings}
              onNavigateToAuth={(mode, role) => {
                setAuthView(mode);
                if (role) {
                  setAuthRole(role);
                }
              }}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center p-4 md:py-16 select-none bg-radial-at-t from-orange-50/50 via-white to-slate-50">
              <AuthScreen
                key={`${authView}-${authRole}`}
                initialIsLogin={authView === "login"}
                initialRole={authRole}
                onAuthSuccess={handleAuthSuccess}
                accessibilitySettings={accessibilitySettings}
                onBackToLanding={() => setAuthView("landing")}
              />
            </div>
          )}
        </ErrorBoundary>
        <AccessibilityMenu
          settings={accessibilitySettings}
          onChange={handleAccessibilityChange}
        />
      </div>
    );
  }

  return (
    <div
      id="peluang-setara-app-shell"
      className={`min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 transition-all duration-300 relative ${getAccessibilityClasses()}`}
    >
      {/* Background Mesh Overlay for Modern Aesthetic */}
      <div className="animated-mesh-bg" />

      {/* 1. Header Banner matching modern SaaS designs (with beautiful blur & clean borders) */}
      <header className="sticky top-0 z-40 bg-white/75 backdrop-blur-md border-b border-slate-200/55 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-22">
            {/* Logo area of Peluang Setara with a modern gradient squircle badge */}
            <div
              id="brand-logo-container"
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setActiveTab("lowongan")}
            >
              <div className="bg-gradient-to-tr from-[#9e2a1b] via-[#c13a29] to-[#ee523f] text-white w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-2 shadow-md shadow-red-500/10">
                <span className="text-xl font-bold font-sans select-none leading-none">
                  ♿
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-extrabold text-[#c13a29] text-2xl tracking-normal leading-none bg-gradient-to-r from-[#9e2a1b] to-[#dc4c38] bg-clip-text text-transparent">
                    Peluang Setara
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none block mt-1">
                  Peluang &bull; Setara &bull; Inklusif
                </span>
              </div>
            </div>{" "}
            {/* Desktop Navigation Links - Premium Pill Design */}
            {currentUser && (
              <nav className="hidden lg:flex items-center gap-1 bg-slate-100/65 border border-slate-200/60 p-1 rounded-2xl backdrop-blur-xs">
                {(currentUser.role === "recruiter"
                  ? [
                      {
                        id: "dashboard",
                        label: "Dashboard Utama",
                        icon: Sparkles,
                      },
                      {
                        id: "lowongan",
                        label: "Bursa Lowongan",
                        icon: Briefcase,
                      },
                      {
                        id: "perusahaan",
                        label: "Pasang Lowongan",
                        icon: Building2,
                      },
                      { id: "lamaran", label: "Lamaran Masuk", icon: Layers },
                      { id: "tips", label: "Tips Karir", icon: BookOpen },
                    ]
                  : [
                      {
                        id: "lowongan",
                        label: "Cari Lowongan",
                        icon: Briefcase,
                      },
                      { id: "lamaran", label: "Lamaran Saya", icon: Layers },
                      { id: "tips", label: "Tips Karir", icon: BookOpen },
                    ]
                ).map((item) => {
                  const isSelected = activeTab === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id as any)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-250 cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? "bg-gradient-to-r from-[#9e2a1b] to-[#dc4c38] text-white shadow-md shadow-red-500/10 scale-[1.02]"
                          : "text-slate-600 hover:text-[#c13a29] hover:bg-white/90"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            )}
            {/* Right-most Session Operator & Compact Profile Info */}
            <div className="flex items-center gap-4.5">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-extrabold text-slate-800 tracking-wide leading-tight">
                  {currentUser ? profileName : "Tamu"}
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-bold tracking-tight">
                  {currentUser ? currentUserEmail : "Belum masuk"}
                </span>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleProfileDropdown}
                  className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#9e2a1b]/10 to-[#dc4c38]/10 border border-[#dc4c38]/15 text-[#c13a29] font-black flex justify-center items-center text-sm shadow-xs hover:shadow-md transition-all duration-250 cursor-pointer select-none"
                >
                  {currentUser ? getInitials(profileName) : "TM"}
                </button>
                {/* Switcher details modal on click */}
                {isProfileDropdownOpen &&
                  (currentUser ? (
                    <div
                      onClick={handleDropdownContentClick}
                      className="absolute right-0 top-full pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                      <div className="w-72 bg-white border border-slate-200 shadow-xl p-5 rounded-2xl text-left">
                        <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-slate-100">
                          <span className="text-rose-500">✨</span>
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                            {currentUser.role === "recruiter"
                              ? "Profil Rekruter / HRD"
                              : "Profil Pencari Kerja"}
                          </h4>
                        </div>
                        <div className="space-y-3.5 text-xs">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                              Nama Lengkap
                            </p>
                            <p className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-705">
                              {profileName}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                              Alamat Email
                            </p>
                            <p className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-705">
                              {currentUserEmail}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                              Status Peran
                            </p>
                            <span
                              className={`inline-block px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-md ${
                                currentUser.role === "recruiter"
                                  ? "bg-slate-900 text-white"
                                  : "bg-[#c13a29]/15 text-[#c13a29]"
                              }`}
                            >
                              {currentUser.role === "recruiter"
                                ? "Recruiter / HR"
                                : "Pencari Kerja"}
                            </span>
                          </div>
                          <div className="pt-2.5 border-t border-slate-100 mt-2">
                            <button
                              type="button"
                              onClick={handleLogout}
                              className="w-full py-2.5 bg-red-650 hover:bg-red-700 bg-red-600 text-white font-black uppercase tracking-wider text-[10px] rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md shadow-red-500/10"
                            >
                              <LogOut className="w-3.5 h-3.5" />
                              <span>Keluar (Log Out)</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={handleDropdownContentClick}
                      className="absolute right-0 top-full pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                      <div className="w-64 bg-white border border-slate-200 shadow-xl p-5 rounded-2xl text-center">
                        <p className="text-xs font-bold text-slate-600 mb-2">
                          Silakan masuk untuk mengaktifkan profil Anda.
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation controls */}
        {currentUser && (
          <div className="lg:hidden bg-slate-50/90 backdrop-blur-md border-t border-slate-100 px-3 py-2.5 flex justify-around items-center overflow-x-auto gap-2">
            {(currentUser.role === "recruiter"
              ? [
                  { id: "dashboard", label: "Dashboard", icon: Sparkles },
                  { id: "lowongan", label: "Lowongan", icon: Briefcase },
                  { id: "perusahaan", label: "Pasang Loker", icon: Building2 },
                  { id: "lamaran", label: "Lamaran Masuk", icon: Layers },
                  { id: "tips", label: "Tips", icon: BookOpen },
                ]
              : [
                  { id: "lowongan", label: "Lowongan", icon: Briefcase },
                  { id: "lamaran", label: "Lamaran Saya", icon: Layers },
                  { id: "tips", label: "Tips", icon: BookOpen },
                ]
            ).map((item) => {
              const isSelected = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex flex-col items-center py-1.5 px-3 rounded-lg text-[10px] font-extrabold uppercase shrink-0 transition-colors cursor-pointer ${
                    isSelected
                      ? "text-[#c13a29]"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mb-0.5 ${isSelected ? "text-[#c13a29]" : "text-slate-400"}`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* 2. Main content router viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        {!currentUser ? (
          <AuthScreen
            onAuthSuccess={handleAuthSuccess}
            accessibilitySettings={accessibilitySettings}
          />
        ) : (
          <div className="fade-in">
            <ErrorBoundary fallbackTitle="Gagal Memuat Tab">
              {activeTab === "dashboard" &&
                currentUser?.role === "recruiter" && (
                  <RecruiterDashboardTab
                    currentUserEmail={currentUserEmail}
                    onNavigateToTab={(tab) => {
                      setActiveTab(tab);
                    }}
                    accessibilitySettings={accessibilitySettings}
                  />
                )}

              {activeTab === "lowongan" && (
                <CariLowonganTab
                  currentUserEmail={currentUserEmail}
                  onApplySuccess={() => {
                    // Navigate to submitted applications listing to see status!
                    setActiveTab("lamaran");
                  }}
                  accessibilitySettings={accessibilitySettings}
                />
              )}

              {activeTab === "perusahaan" && (
                <DaftarPerusahaanTab
                  currentUserEmail={currentUserEmail}
                  onJobCreateSuccess={() => {
                    // Go back to recruiter dashboard
                    setActiveTab("dashboard");
                  }}
                />
              )}

              {activeTab === "tips" && <TipsKarirTab />}

              {activeTab === "lamaran" && (
                <LamaranSayaTab
                  currentUserEmail={currentUserEmail}
                  currentUserRole={currentUser.role}
                />
              )}
            </ErrorBoundary>
          </div>
        )}
      </main>

      {/* 3. Floating UserWay-style Accessibility Widget Customizer Tool */}
      <AccessibilityMenu
        settings={accessibilitySettings}
        onChange={handleAccessibilityChange}
      />

      {/* Clean footer info */}
      <footer className="bg-slate-900 border-t border-slate-850 py-10 text-white text-center pb-20 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex justify-center items-center gap-2">
            <span className="text-xl">♿</span>
            <span className="font-extrabold text-[#c13a29] text-lg tracking-tight">
              Peluang Setara
            </span>
          </div>
          <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed">
            Disediakan secara terpadu demi memperluas penyerapan keunikan tenaga
            kerja penyandang disabilitas di seluruh instansi korporasi
            Indonesia.
          </p>
          <div className="text-[10px] text-slate-500 font-mono">
            &copy; {new Date().getFullYear()} Peluang Setara Adaptasi Inklusif.
            Patuh Terhadap Standar Web WCAG 2.1 AA.
          </div>
        </div>
      </footer>
    </div>
  );
}
