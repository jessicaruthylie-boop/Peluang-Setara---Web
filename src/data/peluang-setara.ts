import { Job, CareerTip } from '../types';

const MANUAL_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Customer Service Chat & Email Representative",
    companyName: "PT Global Sentra Solusi",
    companyLogoUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=150&q=80",
    location: "Jakarta Selatan, DKI Jakarta (WFO/WFH)",
    salaryRange: "Rp 5.500.000 - Rp 7.000.000",
    description: "Kami mencari Customer Service Representative yang berfokus pada layanan pelanggan berbasis tertulis (Chat & Email). Posisi ini sangat cocok untuk pelamar dengan keunikan rungu/tuli atau daksa, karena komunikasi dilakukan sepenuhnya secara digital tanpa panggilan suara.",
    requirements: [
      "Kemampuan mengetik yang cepat dan akurat.",
      "Kemampuan berkomunikasi dengan baik secara tertulis menggunakan bahasa Indonesia yang ramah.",
      "Mampu menggunakan perangkat komputer dengan baik.",
      "Memiliki rasa empati yang tinggi dan sabar menghadapi pertanyaan pelanggan."
    ],
    disabilityTypes: ["Rungu", "Daksa"],
    accommodations: ["Aplikasi Chat Komunikasi Internal", "Jam Kerja Fleksibel", "Pelatihan Berbahasa Isyarat", "Workspace Ramah Kursi Roda"],
    companyEmail: "recruitment@globalsentra.id",
    createdAt: "2026-06-10T09:00:00Z"
  },
  {
    id: "job-2",
    title: "Data Entry & Quality Assurance Specialist",
    companyName: "Teknologi Hijau Nusantara",
    companyLogoUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=150&q=80",
    location: "Sleman, DI Yogyakarta (Full WFH)",
    salaryRange: "Rp 4.200.000 - Rp 5.200.000",
    description: "Melakukan input data hasil sensor pertanian cerdas ke dalam database utama serta memverifikasi kesesuaian data. Posisi ini mendukung penuh aksesibilitas pembaca layar (screen readers) dan memiliki jadwal mandiri, sangat cocok untuk teman-teman dengan keunikan netra (low vision/total blind) atau grahita ringan.",
    requirements: [
      "Menguasai dasar Microsoft Office (Excel) atau Google Sheets.",
      "Mampu mengoperasikan pembaca layar seperti NVDA / JAWS (bagi tunanetra).",
      "Teliti dan menyukai pekerjaan yang bersifat repetitif dan terstruktur.",
      "Memiliki laptop dan koneksi internet yang stabil."
    ],
    disabilityTypes: ["Netra", "Grahita"],
    accommodations: ["Aplikasi Pembaca Layar", "Pendampingan Mentor Khusus", "Pekerjaan Rumah Penuh (WFH)"],
    companyEmail: "karir@teknologihijau.co.id",
    createdAt: "2026-06-09T14:30:00Z"
  },
  {
    id: "job-3",
    title: "Junior Web Developer / UI Designer",
    companyName: "Deco Digital Creative Studio",
    companyLogoUrl: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=150&q=80",
    location: "Bandung, Jawa Barat (Hybrid)",
    salaryRange: "Rp 6.000.000 - Rp 8.500.000",
    description: "Membantu pembuatan website klien menggunakan React, HTML/CSS, dan Figma. Kami menyambut para profesional dengan keunikan daksa atau rungu yang bersemangat di bidang coding dan desain visual digital.",
    requirements: [
      "Memahami HTML, CSS, JavaScript, serta basis React / Tailwind.",
      "Bisa mengoperasikan Figma untuk menyusun kawat sketsa (wireframe).",
      "Terbiasa menggunakan kolaborasi git (GitHub/GitLab).",
      "Senang belajar hal baru tentang teknologi inklusif."
    ],
    disabilityTypes: ["Daksa", "Rungu"],
    accommodations: ["Ramp Kursi Roda & Lift", "Sistem Evaluasi Tertulis", "Meja Ergonomis Dapat Disesuaikan"],
    companyEmail: "hello@decodigital.io",
    createdAt: "2026-06-08T11:15:00Z"
  },
  {
    id: "job-4",
    title: "Staff Administrasi & Pengarsipan Digital",
    companyName: "Karya Mandiri Retail",
    companyLogoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
    location: "Surabaya, Jawa Timur (WFO)",
    salaryRange: "Rp 3.800.000 - Rp 4.500.000",
    description: "Melakukan scan dokumen fisik, mengelompokkannya ke dalam map digital di Google Drive, serta merapikan file korespondensi kantor. Lingkungan kerja kami tenang dan sangat mendukung individu dengan kecemasan (aspek mental) atau spektrum autisme.",
    requirements: [
      "Mampu menggunakan scanner dan printer standar kantoran.",
      "Paham manajemen file di PC maupun cloud storage.",
      "Mendukung fokus tinggi dan kenyamanan kerja dengan headphone peredam bising.",
      "Kerapian administrasi yang baik."
    ],
    disabilityTypes: ["Mental", "Grahita"],
    accommodations: ["Lingkungan Kerja Tenang & Redup", "Headphone Peredam Bising", "Pendampingan Psikologis Mingguan"],
    companyEmail: "hrd@karyamandiri.co.id",
    createdAt: "2026-06-07T08:00:00Z"
  }
];

const generateAllJobs = (): Job[] => {
  const jobs: Job[] = [...MANUAL_JOBS];
  const cities = [
    "Surabaya, Jawa Timur", "Sleman, DI Yogyakarta", "Bandung, Jawa Barat", "Jakarta Selatan, DKI Jakarta",
    "Semarang, Jawa Tengah", "Medan, Sumatera Utara", "Palembang, Sumatera Selatan", "Makassar, Sulawesi Selatan",
    "Denpasar, Bali", "Balikpapan, Kalimantan Timur", "Samarinda, Kalimantan Timur", "Pontianak, Kalimantan Barat",
    "Banjarmasin, Kalimantan Selatan", "Manado, Sulawesi Utara", "Jayapura, Papua", "Kupang, Nusa Tenggara Timur",
    "Mataram, Nusa Tenggara Barat", "Ambon, Maluku", "Pekanbaru, Riau", "Batam, Kepulauan Riau", "Serang, Banten",
    "Padang, Sumatera Barat", "Banda Aceh, Aceh", "Jambi, Jambi", "Bengkulu, Bengkulu", "Pangkalpinang, Babel",
    "Bandar Lampung, Lampung", "Ternate, Maluku Utara", "Manokwari, Papua Barat", "Palu, Sulawesi Tengah"
  ];
  
  const jobTitles = [
    "Data Entry Specialist", 
    "Customer Service Chat Representative", 
    "Social Media Admin", 
    "Content Writer & Editor", 
    "Administrative Assistant", 
    "Junior Web Developer",
    "Graphic Designer Assistant",
    "Quality Assurance Tester",
    "Virtual Office Assistant",
    "Digital Marketing Admin",
    "Translator Inggris-Indonesia",
    "Online Forum Moderator",
    "E-Commerce Admin"
  ];
  
  const companies = [
    { name: "PT Global Sentra Solusi", email: "recruitment@globalsentra.id" },
    { name: "Teknologi Hijau Nusantara", email: "karir@teknologihijau.co.id" },
    { name: "Deco Digital Creative Studio", email: "hello@decodigital.io" },
    { name: "Karya Mandiri Retail", email: "hrd@karyamandiri.co.id" },
    { name: "PT Inklusi Indonesia Jaya", email: "karir@inklusiindonesia.com" },
    { name: "Sentra Digital Utama", email: "karir@sentradigital.co.id" },
    { name: "Nusa Bakti Sejahtera", email: "sdm@nusabakti.or.id" },
    { name: "Kreatif Mandiri Jaya", email: "recruitment@kreatifmandiri.id" }
  ];

  const disabilityPool = [
    ["Daksa"], ["Netra"], ["Rungu"], ["Grahita"], ["Mental"],
    ["Daksa", "Rungu"], ["Rungu", "Mental"], ["Netra", "Daksa"], ["Grahita", "Mental"],
    ["Daksa", "Netra", "Rungu"]
  ];

  const accommodationPool = [
    "Ramp Kursi Roda & Lift",
    "Aplikasi Pembaca Layar",
    "Penerjemah Bahasa Isyarat",
    "Meja Ergonomis Dapat Disesuaikan",
    "Jam Kerja Fleksibel",
    "Pekerjaan Rumah Penuh (WFH)",
    "Lingkungan Kerja Tenang & Redup",
    "Headphone Peredam Bising",
    "Pendampingan Mentor Khusus"
  ];

  const unsplashLogos = [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=150&q=80"
  ];

  for (let i = 4; i < 145; i++) {
    const compIdx = i % companies.length;
    const company = companies[compIdx];
    const title = jobTitles[i % jobTitles.length];
    const cityWithProvince = cities[i % cities.length];
    const isWfh = i % 3 === 0;
    const location = `${cityWithProvince} (${isWfh ? "WFH" : "WFO"})`;
    
    const minSalary = 3000000 + (i % 7) * 500000;
    const maxSalary = minSalary + 1000000 + (i % 4) * 500000;
    const salaryRange = `Rp ${minSalary.toLocaleString("id-ID")} - Rp ${maxSalary.toLocaleString("id-ID")}`;
    
    let description = "";
    let requirements: string[] = [];
    const dis = disabilityPool[i % disabilityPool.length];
    
    if (dis.includes("Rungu")) {
      description = `Mengelola operasional harian posisi ${title} yang berlandaskan komunikasi teks digital di ${company.name}. Lowongan ini ramah bagi penyandang disabilitas rungu/tuli karena seluruh interaksi tim dilakukan tertulis tanpa panggilan suara.`;
      requirements = [
        "Memiliki kemampuan komunikasi tertulis yang baik dan sopan.",
        "Mahir mengoperasikan platform pesan internal dan browser internet.",
        "Fokus tinggi dan teliti saat menyelesaikan tugas."
      ];
    } else if (dis.includes("Netra")) {
      description = `Kami membuka lowongan kerja ${title} yang ramah aksesibilitas pembaca layar (screen reader) di ${company.name}. Pilihan tepat bagi rekan tunanetra yang menguasai jalan pintas keyboard komputer secara mandiri.`;
      requirements = [
        "Sanggup mengoperasikan pembaca layar seperti NVDA atau JAWS.",
        "Ramah, terstruktur, dan tekun dalam mengolah materi data digital.",
        "Memiliki PC/Laptop penunjang yang andal di rumah."
      ];
    } else if (dis.includes("Daksa")) {
      description = `Posisi ${title} di ${company.name} dirancang ramah bagi penyandang disabilitas fisik/daksa. Lokasi kerja menyediakan infrastruktur ramah kursi roda, kruk, atau opsi kerja penuh jarak jauh (WFH) dari tempat tinggal Anda.`;
      requirements = [
        "Mengerti pengoperasian tools penulisan dokumen standar.",
        "Mampu berkomunikasi dan berkoordinasi secara tangkas dengan tim regional.",
        "Jujur, disiplin, dan bersemangat untuk terus berkembang."
      ];
    } else {
      description = `Sambut kesempatan karir yang setara sebagai ${title} bersama ${company.name}. Lingkungan kerja yang aman, minim tekanan, serta inklusif mendukung rekan disabilitas grahita ringan atau mental stabil untuk fokus berkarya.`;
      requirements = [
        "Mampu mengikuti instruksi panduan visual/tertulis secara runtut.",
        "Menyukai tipe pekerjaan yang teratur dan sistematis.",
        "Disiplin dalam menjaga kerahasiaan berkas operasional."
      ];
    }

    const accs: string[] = [];
    if (isWfh) {
      accs.push("Pekerjaan Rumah Penuh (WFH)");
    } else {
      accs.push("Jam Kerja Fleksibel");
    }
    if (dis.includes("Daksa") && !isWfh) {
      accs.push("Ramp Kursi Roda & Lift", "Meja Ergonomis Dapat Disesuaikan");
    }
    if (dis.includes("Netra")) {
      accs.push("Aplikasi Pembaca Layar");
    }
    if (dis.includes("Rungu")) {
      accs.push("Penerjemah Bahasa Isyarat");
    }
    if (dis.includes("Mental") || dis.includes("Grahita")) {
      accs.push("Lingkungan Kerja Tenang & Redup", "Pendampingan Mentor Khusus");
    }
    while (accs.length < 3) {
      const extra = accommodationPool[(i + accs.length) % accommodationPool.length];
      if (!accs.includes(extra)) accs.push(extra);
    }

    const d = new Date();
    d.setDate(d.getDate() - (i % 45));
    const createdAt = d.toISOString();

    jobs.push({
      id: `job-${i + 1}`,
      title,
      companyName: company.name,
      companyLogoUrl: unsplashLogos[i % unsplashLogos.length],
      location,
      salaryRange,
      description,
      requirements,
      disabilityTypes: dis,
      accommodations: accs,
      companyEmail: company.email,
      createdAt
    });
  }
  return jobs;
};

export const INITIAL_JOBS: Job[] = generateAllJobs();

export const INITIAL_TIPS: CareerTip[] = [
  {
    id: "tip-1",
    title: "Panduan Menghadapi Wawancara Kerja bagi Teman Tuli",
    category: "Tips Wawancara",
    summary: "Wawancara kerja seringkali memicu kecemasan ekstra bagi pelamar Tuli. Simak tips mempersiapkan penerjemah, mengomunikasikan akomodasi visual, serta mengesankan pewawancara.",
    content: "Ketika melamar pekerjaan, mintalah akomodasi penyedia kerja seawal mungkin. Sampaikan apakah Anda akan menggunakan bantuan Jasa Penerjemah Bahasa Isyarat (JBI) atau lebih memilih opsi wawancara berbasis obrolan teks / chat tertulis. Berlatihlah menggunakan note digital atau papan tulis kecil untuk membantu komunikasi jika wawancara terpaksa dilakukan tatap muka tanpa pendamping.",
    author: "Irvan Ramadhan (Yayasan Peduli Tuli)",
    readTime: "4 Menit Baca",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=400&q=80",
    createdAt: "2026-06-10T10:00:00Z"
  },
  {
    id: "tip-2",
    title: "Memaksimalkan Fitur NVDA & Pembaca Layar untuk Produktivitas Kerja",
    category: "Teknologi Asistif",
    summary: "Panduan lengkap penggunaan jalan pintas (shortcut keys) populer dan add-ons penting pada NVDA guna bersaing dalam melakukan entri data dan pengolahan dokumen kantor.",
    content: "Pembaca layar (screen reader) adalah jembatan utama produktivitas bagi tunanetra. Pelajari kombinasi tombol Excel seperti CTRL + G untuk navigasi sel cepat, serta atur kecepatan suara (rate) agar Anda bisa memproses tumpukan teks dokumen korporat secara jauh lebih efisien.",
    author: "Zahra Fitriani (Aksesibilitas Digital Ahli)",
    readTime: "6 Menit Baca",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80",
    createdAt: "2026-06-09T08:00:00Z"
  },
  {
    id: "tip-3",
    title: "Hak-hak Pekerja Disabilitas Berdasarkan UU Republik Indonesia",
    category: "Hak Pekerja",
    summary: "Ketahui apa hak-hak Anda mengenai akomodasi yang layak, kuota minimal pekerja disabilitas di instansi pemerintahan maupun swasta, serta perlindungan upah setara.",
    content: "Berdasarkan UU No 8 Tahun 2016 tentang Penyandang Disabilitas, perusahaan swasta wajib mempekerjakan sekurang-kurangnya 1% dari total karyawan mereka, sedang BUMN/BUMD sebesar 2%. Anda juga berhak meminta akomodasi fisik ramah kursi roda atau pemandu pembaca dokumen tanpa adanya pemotongan gaji pokok.",
    author: "Bambang Sukojo, S.H.",
    readTime: "5 Menit Baca",
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=400&q=80",
    createdAt: "2026-06-08T15:00:00Z"
  }
];

export const DISABILITY_CATEGORIES = [
  { id: "all", name: "Semua Kategori", icon: "🌐", desc: "Tampilkan seluruh lowongan kerja yang tersedia bagi semua disabilitas." },
  { id: "Daksa", name: "Daksa", icon: "♿", desc: "Hambatan fisik, mobilitas, menggunakan kursi roda, kruk, atau memiliki perbedaan fungsi gerak." },
  { id: "Netra", name: "Netra", icon: "👁️", desc: "Hambatan penglihatan (Low Vision maupun Buta Total) dengan dukungan Screen Reader / huruf Braille." },
  { id: "Rungu", name: "Rungu", icon: "🧏", desc: "Hambatan pendengaran (Tuli / Hard of Hearing), berkomunikasi via bahasa isyarat (Bisindo) atau tulisan." },
  { id: "Grahita", name: "Grahita", icon: "🧠", desc: "Hambatan kecerdasan, kesulitan memproses informasi kompleks, memerlukan instruksi sederhana." },
  { id: "Mental", name: "Mental", icon: "🧘", desc: "Hambatan psikososial atau neurologis (Autisme, ADHD, gangguan kecemasan, bipolar)." }
];

export const ALL_ACCOMODATIONS = [
  "Ramp Kursi Roda & Lift",
  "Aplikasi Pembaca Layar",
  "Penerjemah Bahasa Isyarat",
  "Meja Ergonomis Dapat Disesuaikan",
  "Jam Kerja Fleksibel",
  "Pekerjaan Rumah Penuh (WFH)",
  "Lingkungan Kerja Tenang & Redup",
  "Headphone Peredam Bising",
  "Pendampingan Mentor Khusus"
];
