export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogoUrl?: string;
  location: string;
  salaryRange: string;
  description: string;
  requirements: string[];
  disabilityTypes: string[]; // e.g. "Daksa", "Netra", "Rungu", "Grahita", "Mental"
  accommodations: string[]; // e.g. "Ramp Kursi Roda", "Penerjemah Bahasa Isyarat", "Aplikasi Pembaca Layar", "Jam Kerja Fleksibel"
  companyEmail: string;
  createdAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  applicantDisability: string;
  coverLetter: string;
  resumeUrl?: string;
  status: 'Pending' | 'Reviewing' | 'Diterima' | 'Ditolak';
  appliedAt: string;
}

export interface CareerTip {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  author: string;
  readTime: string;
  imageUrl?: string;
  createdAt: string;
}

export interface AccessibilitySettings {
  contrast: 'normal' | 'high';
  highlightLinks: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  textSpacing: 'normal' | 'wide' | 'extra-wide';
  pauseAnimations: boolean;
  dyslexiaFont: boolean;
  bigCursor: boolean;
  tooltips: boolean;
  lineHeight: 'normal' | 'tall' | 'extra-tall';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'applicant' | 'recruiter';
}
