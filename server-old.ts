import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Setup database directories
  const DB_DIR = path.join(process.cwd(), "src", "db");
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const JOBS_FILE = path.join(DB_DIR, "jobs.json");
  const APPLICATIONS_FILE = path.join(DB_DIR, "applications.json");
  const USERS_FILE = path.join(DB_DIR, "users.json");

  const INITIAL_USERS = [
    {
      id: "user-1",
      name: "Jessica Ruth Ylie",
      email: "jessicaruthylie@gmail.com",
      password: "password123",
      role: "applicant",
    },
    {
      id: "user-2",
      name: "HR PT Global Sentra Solusi",
      email: "recruitment@globalsentra.id",
      password: "password123",
      role: "recruiter",
    },
  ];

  function readUsers() {
    try {
      if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(
          USERS_FILE,
          JSON.stringify(INITIAL_USERS, null, 2),
          "utf-8",
        );
        return INITIAL_USERS;
      }
      const data = fs.readFileSync(USERS_FILE, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading users file:", err);
      return INITIAL_USERS;
    }
  }

  function writeUsers(users: any) {
    try {
      fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
    } catch (err) {
      console.error("Error writing users file:", err);
    }
  }

  const INITIAL_JOBS = [
    {
      id: "job-1",
      title: "Customer Service Chat & Email Representative",
      companyName: "PT Global Sentra Solusi",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=150&q=80",
      location: "Jakarta Selatan, DKI Jakarta (WFO)",
      salaryRange: "Rp 5.500.000 - Rp 7.000.000",
      description:
        "Kami mencari Customer Service Representative yang berfokus pada layanan pelanggan berbasis tertulis (Chat & Email). Posisi ini sangat cocok untuk pelamar dengan keunikan rungu/tuli atau daksa, karena komunikasi dilakukan sepenuhnya secara digital tanpa panggilan suara.",
      requirements: [
        "Kemampuan mengetik yang cepat dan akurat.",
        "Kemampuan berkomunikasi dengan baik secara tertulis menggunakan bahasa Indonesia yang ramah.",
        "Mampu menggunakan perangkat komputer dengan baik.",
        "Memiliki rasa empati yang tinggi dan sabar menghadapi pertanyaan pelanggan.",
      ],
      disabilityTypes: ["Rungu", "Daksa"],
      accommodations: [
        "Aplikasi Chat Komunikasi Internal",
        "Jam Kerja Fleksibel",
        "Pelatihan Berbahasa Isyarat",
        "Workspace Ramah Kursi Roda",
      ],
      companyEmail: "recruitment@globalsentra.id",
      createdAt: "2026-06-12T09:00:00Z",
    },
    {
      id: "job-2",
      title: "Data Entry & Quality Assurance Specialist",
      companyName: "Teknologi Hijau Nusantara",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=150&q=80",
      location: "Sleman, DI Yogyakarta (WFH)",
      salaryRange: "Rp 4.200.000 - Rp 5.200.000",
      description:
        "Melakukan input data hasil sensor pertanian cerdas ke dalam database utama serta memverifikasi kesesuaian data. Posisi ini mendukung penuh aksesibilitas pembaca layar (screen readers) dan memiliki jadwal mandiri, sangat cocok untuk teman-teman dengan keunikan netra (low vision/total blind) atau grahita ringan.",
      requirements: [
        "Menguasai dasar Microsoft Office (Excel) atau Google Sheets.",
        "Mampu mengoperasikan pembaca layar seperti NVDA / JAWS (bagi tunanetra).",
        "Teliti dan menyukai pekerjaan yang bersifat repetitif dan terstruktur.",
        "Memiliki laptop dan koneksi internet yang stabil.",
      ],
      disabilityTypes: ["Netra", "Grahita"],
      accommodations: [
        "Aplikasi Pembaca Layar",
        "Pendampingan Mentor Khusus",
        "Pekerjaan Rumah Penuh (WFH)",
      ],
      companyEmail: "karir@teknologihijau.co.id",
      createdAt: "2026-06-11T14:30:00Z",
    },
    {
      id: "job-3",
      title: "Junior Web Developer",
      companyName: "Deco Digital Creative Studio",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=150&q=80",
      location: "Bandung, Jawa Barat (WFO)",
      salaryRange: "Rp 6.000.000 - Rp 8.500.000",
      description:
        "Membantu pembuatan website klien menggunakan React, HTML/CSS, dan Figma. Kami menyambut para profesional dengan keunikan daksa atau rungu yang bersemangat di bidang coding dan desain visual digital.",
      requirements: [
        "Memahami HTML, CSS, JavaScript, serta basis React / Tailwind.",
        "Bisa mengoperasikan Figma untuk menyusun kawat sketsa (wireframe).",
        "Terbiasa menggunakan kolaborasi git (GitHub/GitLab).",
        "Senang belajar hal baru tentang teknologi inklusif.",
      ],
      disabilityTypes: ["Daksa", "Rungu"],
      accommodations: [
        "Ramp Kursi Roda & Lift",
        "Sistem Evaluasi Tertulis",
        "Meja Ergonomis Dapat Disesuaikan",
      ],
      companyEmail: "hello@decodigital.io",
      createdAt: "2026-06-10T11:15:00Z",
    },
    {
      id: "job-4",
      title: "Staff Administrasi & Pengarsipan Digital",
      companyName: "Karya Mandiri Retail",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
      location: "Surabaya, Jawa Timur (WFO)",
      salaryRange: "Rp 3.800.000 - Rp 4.500.000",
      description:
        "Melakukan scan dokumen fisik, mengelompokkannya ke dalam map digital di Google Drive, serta merapikan file korespondensi kantor. Lingkungan kerja kami tenang dan sangat mendukung individu dengan kecemasan (aspek mental) atau spektrum autisme.",
      requirements: [
        "Mampu menggunakan scanner dan printer standar kantoran.",
        "Paham manajemen file di PC maupun cloud storage.",
        "Mendukung fokus tinggi dan kenyamanan kerja dengan headphone peredam bising.",
        "Kerapian administrasi yang baik.",
      ],
      disabilityTypes: ["Mental", "Grahita"],
      accommodations: [
        "Lingkungan Kerja Tenang & Redup",
        "Headphone Peredam Bising",
        "Pendampingan Psikologis Mingguan",
      ],
      companyEmail: "hrd@karyamandiri.co.id",
      createdAt: "2026-06-09T08:00:00Z",
    },
    {
      id: "job-5",
      title: "Graphic Designer",
      companyName: "Kreatif Mandiri Jaya",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=150&q=80",
      location: "Denpasar, Bali (WFH)",
      salaryRange: "Rp 4.500.000 - Rp 6.000.000",
      description:
        "Membuat desain promosi sosial media, brosur digital, dan materi pemasaran visual kreatif untuk klien industri pariwisata. Membuka pintu lebar bagi teman-teman daksa tubuh bagian bawah atau rungu/tuli berbakat seni rupa digital.",
      requirements: [
        "Mahir menggunakan Canva, Photoshop, atau CorelDraw.",
        "Memiliki portofolio desain visual yang orisinil.",
        "Responsif terhadap masukan dan revisi desain.",
        "Dapat berkolaborasi dengan tatanan komunikasi visual modern.",
      ],
      disabilityTypes: ["Daksa", "Rungu"],
      accommodations: [
        "Sistem Komunikasi Teks Penuh",
        "Lisensi Software Profesional Dibayari",
        "Bekerja Penuh Online dari Rumah",
      ],
      companyEmail: "recruitment@kreatifmandiri.id",
      createdAt: "2026-06-08T10:00:00Z",
    },
    {
      id: "job-6",
      title: "Content Writer & Copywriter",
      companyName: "Sentra Digital Utama",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=150&q=80",
      location: "Medan, Sumatera Utara (WFO)",
      salaryRange: "Rp 4.000.000 - Rp 5.500.000",
      description:
        "Menulis artikel ulasan produk, materi pemasaran newsletter, serta salinan naskah iklan persuasif yang menarik minat calon pembeli. Posisi ini ramah disabilitas daksa, rungu, maupun mental stabil.",
      requirements: [
        "Gemar menulis dan membaca tren gaya bahasa masa kini.",
        "Paham dasar SEO (Search Engine Optimization) menulis artikel menjadi poin plus.",
        "Mampu menghasilkan 2-3 artikel per hari dengan standar tata bahasa yang baik.",
      ],
      disabilityTypes: ["Daksa", "Rungu", "Mental"],
      accommodations: [
        "Pengaturan Jadwal Fleksibel",
        "Software Pendeteksi Ejaan Otomatis",
        "Kantor Akses Kursi Roda",
      ],
      companyEmail: "karir@sentradigital.co.id",
      createdAt: "2026-06-07T09:00:00Z",
    },
    {
      id: "job-7",
      title: "Data Entry Specialist",
      companyName: "Nusa Bakti Sejahtera",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=150&q=80",
      location: "Banda Aceh, Aceh (WFO)",
      salaryRange: "Rp 3.500.000 - Rp 4.200.000",
      description:
        "Bertanggung jawab memelihara data administrasi penerima manfaat bantuan sosial daerah. Posisi di kantor cabang Aceh ini sangat mendukung pelamar rungu dan daksa kaki.",
      requirements: [
        "Mampu mengetik minimal 45 kata per menit.",
        "Menguasai teknik dasar pencarian data di komputer.",
        "Pendidikan minimal SMA/SMK sederajat.",
      ],
      disabilityTypes: ["Rungu", "Daksa"],
      accommodations: [
        "Ramp Lintasan Kursi Roda",
        "Formulir Pelaporan Sederhana",
        "Interpreter Isyarat Saat Rapat",
      ],
      companyEmail: "sdm@nusabakti.or.id",
      createdAt: "2026-06-06T08:30:00Z",
    },
    {
      id: "job-8",
      title: "Social Media Admin",
      companyName: "Kreatif Mandiri Jaya",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=150&q=80",
      location: "Padang, Sumatera Barat (WFH)",
      salaryRange: "Rp 3.200.000 - Rp 4.000.000",
      description:
        "Mengelola pesan masuk, kolom komentar, dan memposting konten harian di platform Instagram & TikTok klien retail lokal. Komunikasi 100% obrolan teks.",
      requirements: [
        "Memiliki smartphone yang memadai untuk standby.",
        "Memahami tren fitur sosial media terkini.",
        "Ramah dan sabar melayani calon pembeli online.",
      ],
      disabilityTypes: ["Rungu", "Daksa", "Mental"],
      accommodations: [
        "Sistem Kerja WFH",
        "Aplikasi Template Balasan Instan",
        "Bantuan Sesi Asistensi Teknis",
      ],
      companyEmail: "recruitment@kreatifmandiri.id",
      createdAt: "2026-06-05T14:00:00Z",
    },
    {
      id: "job-9",
      title: "Quality Assurance Engineer (Junior)",
      companyName: "Teknologi Hijau Nusantara",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=150&q=80",
      location: "Pekanbaru, Riau (WFO)",
      salaryRange: "Rp 5.000.000 - Rp 6.800.000",
      description:
        "Menguji fungsionalitas sistem software pemantauan kelembaban tanah perkebunan sebelum dirilis ke pengguna umum. Mendukung kenyamanan kerja teman netra dengan piranti pembaca layar.",
      requirements: [
        "Dasar pemrograman komputer / logika software yang cukup kuat.",
        "Biasa melakukan pencatatan bug log secara runtut.",
        "Pendidikan D3/S1 Teknik Informatika/Sistem Informasi.",
      ],
      disabilityTypes: ["Netra", "Daksa"],
      accommodations: [
        "Instalasi Software Pembaca Layar Berlisensi",
        "Suasana Meja Kerja Pojok Mandiri",
        "Sistem Evaluasi Tugas Terjadwal",
      ],
      companyEmail: "karir@teknologihijau.co.id",
      createdAt: "2026-06-04T11:00:00Z",
    },
    {
      id: "job-10",
      title: "Digital Marketing Admin",
      companyName: "PT Inklusi Indonesia Jaya",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
      location: "Batam, Kepulauan Riau (WFH)",
      salaryRange: "Rp 4.500.000 - Rp 5.800.000",
      description:
        "Menyusun skedul kampanye iklan digital, merekap data konversi landing page, serta memantau pengeluaran anggaran harian secara teratur.",
      requirements: [
        "Familiar dengan dasbor iklan dasar (Meta Ads / Google Ads).",
        "Mampu teliti bermain data angka dan persentase di lembar kerja.",
        "Dapat mengorganisasi file digital dengan baik.",
      ],
      disabilityTypes: ["Daksa", "Rungu", "Grahita"],
      accommodations: [
        "Pekerjaan Rumah Penuh (WFH)",
        "Panduan Pengoperasian Video Ber-Subtitle",
        "Jaminan Bebas Diskriminasi Rekrutmen",
      ],
      companyEmail: "karir@inklusiindonesia.com",
      createdAt: "2026-06-03T10:00:00Z",
    },
    {
      id: "job-11",
      title: "Content Digital Proofreader",
      companyName: "Sentra Digital Utama",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=150&q=80",
      location: "Jambi, Jambi (WFO)",
      salaryRange: "Rp 3.100.000 - Rp 3.800.000",
      description:
        "Mengoreksi kesalahan ejaan tanda baca, kesesuaian penulisan dengan KBBI pada draf materi edukasi digital yang disusun para penulis kantor cabang Jambi.",
      requirements: [
        "Memiliki ketelitian sangat tinggi terhadap detail tulisan huruf per huruf.",
        "Mengerti tata bahasa baku Indonesia secara mumpuni.",
        "Komunikatif melalui media koordinasi tertulis.",
      ],
      disabilityTypes: ["Rungu", "Daksa", "Mental"],
      accommodations: [
        "Headphone Peredam Bising",
        "Program Koreksi Ejaan Pendamping",
        "Ruangan Kerja Sejuk & Ergonomis",
      ],
      companyEmail: "karir@sentradigital.co.id",
      createdAt: "2026-06-02T13:00:00Z",
    },
    {
      id: "job-12",
      title: "Spesialis Input Data Inventaris",
      companyName: "Karya Mandiri Retail",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
      location: "Bengkulu, Bengkulu (WFH)",
      salaryRange: "Rp 3.000.000 - Rp 3.700.000",
      description:
        "Melakukan integrasi laporan berkala barang masuk dari gudang pusat ke master spreadsheet digital. Tugas dapat dikerjakan dengan fleksibilitas jam mandiri dari rumah di Bengkulu.",
      requirements: [
        "Familiar dengan Google Sheets secara mendalam.",
        "Memiliki akses PC/Laptop mandiri berspesifikasi standar.",
        "Jujur dan bertanggung jawab terhadap keabsahan laporan.",
      ],
      disabilityTypes: ["Daksa", "Netra", "Grahita"],
      accommodations: [
        "Pembaca Layar Audio & Teks Pendamping",
        "Mentoring Intensif Minggu Pertama",
        "Toleransi Selesai Tugas Longgar",
      ],
      companyEmail: "hrd@karyamandiri.co.id",
      createdAt: "2026-06-01T09:00:00Z",
    },
    {
      id: "job-13",
      title: "Marketing Campaign Evaluator",
      companyName: "PT Global Sentra Solusi",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=150&q=80",
      location: "Palembang, Sumatera Selatan (WFO)",
      salaryRange: "Rp 4.000.000 - Rp 5.000.000",
      description:
        "Menelaah ulasan masukan dari kuesioner program kepuasan pembeli dan mentraslasikannya ke tabulasi analisis tren mingguan.",
      requirements: [
        "Dapat mengolah data persentase sederhana di komputer.",
        "Sabar, teliti, serta sanggup menjaga kerahasiaan berkas data.",
        "Mampu bertukar gagasan melalui email kantor dengan taktis.",
      ],
      disabilityTypes: ["Netra", "Rungu", "Mental"],
      accommodations: [
        "Format Berkas Dokumen Kontras Tinggi",
        "Asisten Pendamping Individu",
        "Jadwal Istirahat Fleksibel",
      ],
      companyEmail: "recruitment@globalsentra.id",
      createdAt: "2026-05-31T11:00:00Z",
    },
    {
      id: "job-14",
      title: "Online Community Moderator",
      companyName: "Deco Digital Creative Studio",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=150&q=80",
      location: "Pangkalpinang, Kepulauan Bangka Belitung (WFH)",
      salaryRange: "Rp 3.500.000 - Rp 4.500.000",
      description:
        "Menjaga ketertiban ruang obrolan komunitas forum kreatif digital, menghapus spam, serta menjawab kendala teknis dasar anggota komunitas secara ramah via chat tertulis.",
      requirements: [
        "Memiliki minat mendalam di dunia digital dan komunitas online.",
        "Mampu menggunakan aplikasi pesan seperti Discord, Telegram, Whatsapp.",
        "Mempunyai tata krama penulisan yang santun dan menjunjung keberagaman.",
      ],
      disabilityTypes: ["Rungu", "Daksa", "Mental"],
      accommodations: [
        "100% Remote Hub",
        "Akses Saluran Bantuan Mental internal",
        "Program Apresiasi Kreatif Tahunan",
      ],
      companyEmail: "hello@decodigital.io",
      createdAt: "2026-05-30T10:30:00Z",
    },
    {
      id: "job-15",
      title: "Staff Pembukuan Keuangan Digital",
      companyName: "PT Inklusi Indonesia Jaya",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
      location: "Bandar Lampung, Lampung (WFO)",
      salaryRange: "Rp 3.800.000 - Rp 4.400.000",
      description:
        "Membantu pelaporan keuangan cabang dengan merekap seluruh nota kuitansi operasional harian ke software akuntansi terintegrasi.",
      requirements: [
        "Lulusan SMK Akuntansi atau memiliki pemahaman dasar debit-kredit.",
        "Kerapian administrasi keuangan yang sangat teruji.",
        "Mampu mengoperasikan kalkulator digital dengan andal.",
      ],
      disabilityTypes: ["Daksa", "Rungu", "Grahita"],
      accommodations: [
        "Kursi Kerja Ortopedi Pendukung",
        "Sistem Evaluasi Tugas Berbasis Checklist",
        "Toilet Aksesibel Kursi Roda",
      ],
      companyEmail: "karir@inklusiindonesia.com",
      createdAt: "2026-05-29T09:00:00Z",
    },
    {
      id: "job-16",
      title: "Administrative Assistant",
      companyName: "Sentra Digital Utama",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=150&q=80",
      location: "Serang, Banten (WFO)",
      salaryRange: "Rp 4.100.000 - Rp 4.900.000",
      description:
        "Mengurus keperluan penjadwalan meeting internal divisi, menyiapkan draf memo keputusan kantor, serta memesan kebutuhan logistik kantor cabang Banten.",
      requirements: [
        "Pandai mengelola Google Calendar dan aplikasi perkantoran awan.",
        "Komunikasi verbal atau non-verbal yang runtut.",
        "Memiliki inisiatif tinggi dalam menata kerapian logistik.",
      ],
      disabilityTypes: ["Daksa", "Rungu", "Mental"],
      accommodations: [
        "Workspace Fleksibel",
        "Sistem Instruksi Tertulis Terpusat",
        "Asuransi Kesehatan inklusif",
      ],
      companyEmail: "karir@sentradigital.co.id",
      createdAt: "2026-05-28T14:00:00Z",
    },
    {
      id: "job-17",
      title: "Web Accessibility Tester",
      companyName: "Deco Digital Creative Studio",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=150&q=80",
      location: "Semarang, Jawa Tengah (WFH)",
      salaryRange: "Rp 5.500.000 - Rp 7.500.000",
      description:
        "Memastikan situs web klon baru kami telah memenuhi standar aksesibilitas WCAG (Web Content Accessibility Guidelines) agar ramah navigasi bagi tunanetra dan penyandang motorik.",
      requirements: [
        "Paham dasar HTML semantik dan atribut ARIA web.",
        "Tergolong pengguna aktif screen reader (NVDA, VoiceOver, dsb) atau kontrol keyboard.",
        "Suka memberikan analisis mendalam berupa laporan revisi teks.",
      ],
      disabilityTypes: ["Netra", "Daksa"],
      accommodations: [
        "Full WFH",
        "Fleksibilitas Jam Evaluasi",
        "Gawai Kerja Pendukung Eksklusif",
      ],
      companyEmail: "hello@decodigital.io",
      createdAt: "2026-05-27T08:00:00Z",
    },
    {
      id: "job-18",
      title: "Translator Bahasa Inggris - Indonesia",
      companyName: "PT Inklusi Indonesia Jaya",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
      location: "Kupang, Nusa Tenggara Timur (WFH)",
      salaryRange: "Rp 4.000.000 - Rp 5.200.000",
      description:
        "Menerjemahkan artikel pengetahuan alam, draf materi ajar sekolah mitra, dan transkrip tulisan dari bahasa Inggris ke Bahasa Indonesia secara akurat dan mudah dipahami.",
      requirements: [
        "Mengantongi sertifikat kemampuan Bahasa Inggris yang setara TOEFL 500+.",
        "Keahlian merangkai kalimat dengan sintaksis bahasa Indonesia yang luwes.",
        "Mengerti pemakaian kamus padanan kata daring dengan cepat.",
      ],
      disabilityTypes: ["Daksa", "Rungu", "Mental"],
      accommodations: [
        "Remote Work Tanpa Mobilitas",
        "Tenggat Waktu Penerjemahan Mandiri Kelompok",
        "Aplikasi Kamus Berlisensi",
      ],
      companyEmail: "karir@inklusiindonesia.com",
      createdAt: "2026-05-26T15:00:00Z",
    },
    {
      id: "job-19",
      title: "Data Validator Pertanian Pintar",
      companyName: "Teknologi Hijau Nusantara",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=150&q=80",
      location: "Kupang, Nusa Tenggara Timur (WFH)",
      salaryRange: "Rp 3.300.000 - Rp 4.100.000",
      description:
        "Memantau dan memvalidasi log masuk suhu, cuaca, serta kelembaban lahan dari sensor terpasang di Indonesia Timur. Semua pekerjaan dialirkan secara digital terintegrasi online.",
      requirements: [
        "Mampu menggunakan Google Sheets dasar secara mandiri.",
        "Menyukai ketuntasan pekerjaan yang runtut berulang.",
        "Mempunyai laptop berfasilitas internet rumah memadai.",
      ],
      disabilityTypes: ["Netra", "Grahita", "Daksa"],
      accommodations: [
        "Screen Reader Friendly Dashboard",
        "Mentor Berbasis Pendampingan Asynchronous",
        "Insentif Kelayakan Kuota",
      ],
      companyEmail: "karir@teknologihijau.co.id",
      createdAt: "2026-05-25T11:00:00Z",
    },
    {
      id: "job-20",
      title: "Digital Inventory Recorder",
      companyName: "Karya Mandiri Retail",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
      location: "Mataram, Nusa Tenggara Barat (WFO)",
      salaryRange: "Rp 3.400.000 - Rp 4.100.000",
      description:
        "Menerima barang masuk di gudang Nusa Tenggara Barat, memindai barcode inventaris, dan mencatatkan kuantitas fisiknya di aplikasi komputer internal stok.",
      requirements: [
        "Memiliki stamina fokus yang prima untuk bekerja di area inventaris.",
        "Keterampilan mengoperasikan keyboard angka secara lincah.",
        "Berusia minimal 18 tahun dan bertempat tinggal di Lombok.",
      ],
      disabilityTypes: ["Rungu", "Grahita", "Mental"],
      accommodations: [
        "Pelindung Telinga Nyaman",
        "Penerangan Gudang Ekstra Terang",
        "Form Checklist Instruksi Gambar Jelas",
      ],
      companyEmail: "hrd@karyamandiri.co.id",
      createdAt: "2026-05-24T10:00:00Z",
    },
    {
      id: "job-21",
      title: "Asisten Database Inventaris Kantor",
      companyName: "Karya Mandiri Retail",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
      location: "Pontianak, Kalimantan Barat (WFO)",
      salaryRange: "Rp 3.350.000 - Rp 3.900.000",
      description:
        "Merapikan label rak barang dagangan serta mencocokkannya dengan buku catatan stok logistik area Kalbar. Sangat mendukung inklusivitas penyandang autisme.",
      requirements: [
        "Teliti, sabar, dan teratur dalam menyusun struktur barang fisik.",
        "Pernah belajar mengoperasikan komputer dasar.",
        "Mampu bekerja dengan arahan terstruktur harian.",
      ],
      disabilityTypes: ["Grahita", "Mental", "Daksa"],
      accommodations: [
        "Pojok Meja Kerja Eksklusif Tenang",
        "Panduan Gambar Penempatan Barang",
        "Sesi Pembinaan Kesejahteraan Mental",
      ],
      companyEmail: "hrd@karyamandiri.co.id",
      createdAt: "2026-05-23T09:00:00Z",
    },
    {
      id: "job-22",
      title: "Moderator Chat Media Pembelajaran",
      companyName: "Nusa Bakti Sejahtera",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=150&q=80",
      location: "Palangka Raya, Kalimantan Tengah (WFH)",
      salaryRange: "Rp 3.200.000 - Rp 3.800.000",
      description:
        "Mendampingi kelompok siswa inklusif yang belajar jarak jauh dengan memoderatori saluran obrolan web seminar agar santun dan kondusif.",
      requirements: [
        "Berpribadi tenang, sabar, dan memiliki pemahaman empati mendalam.",
        "Sanggup mengoperasikan browser Chrome/Firefox dengan lancar.",
        "Mempunyai koneksi internet yang stabil.",
      ],
      disabilityTypes: ["Rungu", "Daksa", "Mental"],
      accommodations: [
        "Sistem Kerja WFH",
        "Komunikasi Berbentuk Tinjauan Teks",
        "Sesi Diskusi Mentor Pasca Sesi",
      ],
      companyEmail: "sdm@nusabakti.or.id",
      createdAt: "2026-05-22T13:00:00Z",
    },
    {
      id: "job-23",
      title: "Online Community Facilitator",
      companyName: "PT Inklusi Indonesia Jaya",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
      location: "Banjarmasin, Kalimantan Selatan (WFO)",
      salaryRange: "Rp 3.600.000 - Rp 4.200.000",
      description:
        "Menghubungkan kelompok wirausaha penyandang disabilitas di Kalsel melalui grup pembinaan teks, menyalurkan rilis artikel, dan menjawab keluhan pendaftaran program.",
      requirements: [
        "Suka berinteraksi sosial secara tertulis.",
        "Memiliki pemahaman ramah tentang etika disabilitas.",
        "Mampu menyusun pesan informasi dwi-mingguan terpadu.",
      ],
      disabilityTypes: ["Daksa", "Rungu", "Mental"],
      accommodations: [
        "Kursi Roda Adaptif Kantor",
        "Interpreter Bahasa Isyarat Sesi Offline",
        "Waktu Mulai Kerja Lebih Lambat",
      ],
      companyEmail: "karir@inklusiindonesia.com",
      createdAt: "2026-05-21T11:00:00Z",
    },
    {
      id: "job-24",
      title: "Sensus Pertanian Digital Operator",
      companyName: "Teknologi Hijau Nusantara",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=150&q=80",
      location: "Samarinda, Kalimantan Timur (WFH)",
      salaryRange: "Rp 4.000.000 - Rp 5.000.000",
      description:
        "Melakukan verifikasi berkas formulir petani binaan yang diunggah secara online ke cloud server. Proses murni menggunakan mata teliti atau pembaca suara.",
      requirements: [
        "Bisa mengevaluasi kejernihan berkas PDF atau gambar pendaftaran.",
        "Tekun dalam berhadapan dengan tumpukan dokumen data bervariasi setiap hari.",
        "Mematuhui kode etik kerahasiaan kepemilikan lahan.",
      ],
      disabilityTypes: ["Netra", "Daksa", "Grahita"],
      accommodations: [
        "Staf Pendamping Kategori Khusus",
        "Opsi Jam Istirahat Sesuai Keinginan",
        "WFH Penuh",
      ],
      companyEmail: "karir@teknologihijau.co.id",
      createdAt: "2026-05-20T10:00:00Z",
    },
    {
      id: "job-25",
      title: "Data Compiler Admin",
      companyName: "Nusa Bakti Sejahtera",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=150&q=80",
      location: "Tanjung Selor, Kalimantan Utara (WFO)",
      salaryRange: "Rp 3.500.000 - Rp 4.100.000",
      description:
        "Menghimpun berkas pendaftaran kegiatan sosialisasi daerah Kaltara ke dalam format arsip yang rapih sesuai ketetapan baku organisasi.",
      requirements: [
        "Pendidikan minimal SMA/SMK pariwisata atau administrasi.",
        "Mampu menggunakan aplikasi Google Suite secara baik.",
        "Memiliki kemauan kuat belajar tata kelola data perkantoran.",
      ],
      disabilityTypes: ["Rungu", "Daksa"],
      accommodations: [
        "Jalur Masuk Lif & Ramp Khusus",
        "Papan Pengumuman Ber-Font Visual Besar",
        "Apresiasi Pencapaian Berkala",
      ],
      companyEmail: "sdm@nusabakti.or.id",
      createdAt: "2026-05-19T09:00:00Z",
    },
    {
      id: "job-26",
      title: "Virtual Office Assistant",
      companyName: "PT Global Sentra Solusi",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=150&q=80",
      location: "Manado, Sulawesi Utara (WFH)",
      salaryRange: "Rp 3.900.000 - Rp 4.600.000",
      description:
        "Membantu penjadwalan janji temu pengacara dan klien di kantor representatif, menyortir surat email masuk, serta mengirimi notifikasi WhatsApp pengingat.",
      requirements: [
        "Paham penggunaan aplikasi pesan terjadwal dan kalender digital.",
        "Karakter penulisan sopan, teliti, dan mengutamakan ketepatan waktu.",
        "Bertempat tinggal di Sulut merupakan keunggulan.",
      ],
      disabilityTypes: ["Netra", "Rungu", "Daksa"],
      accommodations: [
        "Sistem Kerja WFH Mandiri",
        "Sistem Pembaca Email Otomatis",
        "Pemberangkatan Fasilitas Gawai Penunjang",
      ],
      companyEmail: "recruitment@globalsentra.id",
      createdAt: "2026-05-18T14:30:00Z",
    },
    {
      id: "job-27",
      title: "Staff Pelayanan Informasi Chat",
      companyName: "PT Global Sentra Solusi",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=150&q=80",
      location: "Gorontalo, Gorontalo (WFO)",
      salaryRange: "Rp 3.150.000 - Rp 3.700.000",
      description:
        "Menghubungkan warga Gorontalo dengan desk informasi keluhan administrasi pertanahan lewat saluran chat terpusat.",
      requirements: [
        "Lancar berbahasa Indonesia secara tertulis.",
        "Mampu menggunakan perangkat laptop Windows.",
        "Memiliki kedisiplinan kerja yang tinggi.",
      ],
      disabilityTypes: ["Rungu", "Daksa"],
      accommodations: [
        "Layar Kerja Kontrast Tinggi",
        "Mentor Pendamping Isyarat Kepala",
        "Meja Kerja Ergonomis",
      ],
      companyEmail: "recruitment@globalsentra.id",
      createdAt: "2026-05-17T11:00:00Z",
    },
    {
      id: "job-28",
      title: "Content Editor Pendukung Pendidikan",
      companyName: "Deco Digital Creative Studio",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=150&q=80",
      location: "Palu, Sulawesi Tengah (WFH)",
      salaryRange: "Rp 3.400.000 - Rp 4.250.000",
      description:
        "Menyusun skrip tulisan kuis interaktif ramah anak berkebutuhan khusus berlandas materi kurikulum nasional.",
      requirements: [
        "Latar belakang ketertarikan di pengajaran inklusif.",
        "Kreatif mengemas materi formal menjadi kuis yang menyenangkan.",
        "Nyaman berkoordinasi secara asynchronous lewat web manajemen tugas.",
      ],
      disabilityTypes: ["Rungu", "Daksa", "Mental"],
      accommodations: [
        "Pilihan Jam Mulai Kerja Sukarela",
        "Subsidi Kuota Internet",
        "Sensus Evaluatif Tanpa Desakan Psikologis",
      ],
      companyEmail: "hello@decodigital.io",
      createdAt: "2026-05-16T10:00:00Z",
    },
    {
      id: "job-29",
      title: "Arsiparis Data Kependudukan Kantor",
      companyName: "Sentra Digital Utama",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=150&q=80",
      location: "Mamuju, Sulawesi Barat (WFO)",
      salaryRange: "Rp 3.100.000 - Rp 3.650.000",
      description:
        "Menata sistem dokumen rujukan program kesehatan warga Sulawesi Barat ke dalam server folder lokal agar mudah dicari sewaktu-waktu.",
      requirements: [
        "Mampu merapikan file berdasarkan format abjad atau tanggal kronologis.",
        "Memiliki ketahanan bekerja dalam memilah ratusan entitas data per hari.",
        "Mampu mematuhi kebijakan privasi data rumah tangga daerah.",
      ],
      disabilityTypes: ["Grahita", "Daksa", "Rungu"],
      accommodations: [
        "Meja Kerja Rendah Ramah Kursi Roda",
        "Formulir SOP Gambar Rias Sederhana",
        "Rekan Pendamping Berdedikasi",
      ],
      companyEmail: "karir@sentradigital.co.id",
      createdAt: "2026-05-15T09:00:00Z",
    },
    {
      id: "job-30",
      title: "Technical Support Chat Specialist",
      companyName: "PT Global Sentra Solusi",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=150&q=80",
      location: "Makassar, Sulawesi Selatan (WFO)",
      salaryRange: "Rp 4.400.000 - Rp 5.500.000",
      description:
        "Membimbing pelanggan internet kabel area Makassar dalam memulihkan koneksi router wifi berdasarkan panduan troubleshooting teks instruktif.",
      requirements: [
        "Dasar pengetahuan tentang jaringan komputer / modem sederhana.",
        "Kemampuan mengetik instruksi penyelesaian masalah secara jelas dan teratur.",
        "Pendidikan minimal SMK Jurusan Jaringan (TKJ) atau setara.",
      ],
      disabilityTypes: ["Rungu", "Daksa"],
      accommodations: [
        "Aplikasi Sistem Chat Otomatis",
        "Kantor Cabang Inklusif dengan Ramp Lift",
        "Latihan Peningkatan Karir Bebas Hambatan",
      ],
      companyEmail: "recruitment@globalsentra.id",
      createdAt: "2026-05-14T08:00:00Z",
    },
    {
      id: "job-31",
      title: "Digital Database Admin Assistant",
      companyName: "Nusa Bakti Sejahtera",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=150&q=80",
      location: "Kendari, Sulawesi Tenggara (WFH)",
      salaryRange: "Rp 3.250.000 - Rp 3.900.000",
      description:
        "Melakukan perekapan berkas kelulusan pelatihan vokasi disabilitas di Sultra secara berkala. Pekerjaan penuh dari rumah via browser internet.",
      requirements: [
        "Mengetahui dasar-dasar aplikasi penelusuran tabel di spreadsheet.",
        "Kecermatan tinggi dalam pengetikan nama lengkap dan NIK KTP.",
        "Konsisten mengirim laporan rekapan setiap hari Jumat sore.",
      ],
      disabilityTypes: ["Netra", "Daksa", "Grahita"],
      accommodations: [
        "Format File Ramah Tunanetra",
        "Opsi Waktu Kerja Sangat Fleksibel",
        "Mentor Komunikasi Online Suka Membantu",
      ],
      companyEmail: "sdm@nusabakti.or.id",
      createdAt: "2026-05-13T10:30:00Z",
    },
    {
      id: "job-32",
      title: "Social Media Admin Pariwisata Maluku",
      companyName: "Kreatif Mandiri Jaya",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=150&q=80",
      location: "Ambon, Maluku (WFO)",
      salaryRange: "Rp 3.300.000 - Rp 4.000.000",
      description:
        "Membalas pesan reservasi turis domestik ke destinasi wisata Maluku di akun pariwisata mitra kami dengan sapaan khas daerah yang hangat.",
      requirements: [
        "Menyenangi diskusi seputar objek keindahan wisata bahari Maluku.",
        "Memiliki gaya tulisan yang luwes, santun, dan komunikatif.",
        "Aktif berselancar di kanal media sosial populer.",
      ],
      disabilityTypes: ["Rungu", "Daksa", "Mental"],
      accommodations: [
        "Kantor Ramah Kursi Roda di Pusat Ambon",
        "Asisten Pendamping Saat Mengolah Data Tur",
        "Waktu Kerja Tanpa Tekanan Shift Malam",
      ],
      companyEmail: "recruitment@kreatifmandiri.id",
      createdAt: "2026-05-12T11:00:00Z",
    },
    {
      id: "job-33",
      title: "Pencatat Data Logistik Cabang",
      companyName: "Karya Mandiri Retail",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
      location: "Ternate, Maluku Utara (WFH)",
      salaryRange: "Rp 3.200.000 - Rp 3.800.000",
      description:
        "Memantau daftar restock produk sembako dan mencatatkannya ke aplikasi logistik pusat retail Maluku Utara secara mandiri berbasis penugasan online harian.",
      requirements: [
        "Sanggup berkomitmen menyelesaikan perekapan tepat pada waktu malam.",
        "Menyukai ketelitian angka nominal harga barang.",
        "Menggunakan HP Android atau laptop fungsional pribadi.",
      ],
      disabilityTypes: ["Daksa", "Grahita", "Mental"],
      accommodations: [
        "Remoting Penuh",
        "Modul Panduan Bergambar Detail Ringkas",
        "Pojok Curahan Kendala Dua Mingguan",
      ],
      companyEmail: "hrd@karyamandiri.co.id",
      createdAt: "2026-05-11T09:00:00Z",
    },
    {
      id: "job-34",
      title: "Penyusun Dokumen Pelaporan",
      companyName: "Sentra Digital Utama",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=150&q=80",
      location: "Manokwari, Papua Barat (WFO)",
      salaryRange: "Rp 3.600.000 - Rp 4.300.000",
      description:
        "Menggabungkan potongan laporan aktivitas bulanan yayasan cabang Papua Barat menjadi satu dokumen rancangan kerja tahunan berkonten inklusif.",
      requirements: [
        "Familiar dengan penulisan laporan rapi di Microsoft Word / Google Docs.",
        "Memiliki pemahaman tata layang (margin, daftar isi) yang baik.",
        "Bertanggung jawab atas kerapihan penyusunan berkas akhir.",
      ],
      disabilityTypes: ["Rungu", "Daksa", "Mental"],
      accommodations: [
        "Kantor Inovatif dengan Lift & Ramp",
        "Headphone Peredam Kebisingan",
        "Lisensi Software Peningkat Fokus",
      ],
      companyEmail: "karir@sentradigital.co.id",
      createdAt: "2026-05-10T14:00:00Z",
    },
    {
      id: "job-35",
      title: "Asisten Evaluasi Layanan Belajar",
      companyName: "PT Inklusi Indonesia Jaya",
      companyLogoUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
      location: "Jayapura, Papua (WFO)",
      salaryRange: "Rp 3.800.000 - Rp 4.500.000",
      description:
        "Menghimpun masukan tertulis dari guru-guru sekolah inklusif di wilayah Jayapura, mengodekannya ke kategori saran berharga.",
      requirements: [
        "Terampil membaca dan meraba emosi teks masukan pembaca.",
        "Kepatuhan tinggi pada kerapihan pengisian tabel data.",
        "Bersedia mengikuti pelatihan pengenalan inklusivitas di Jayapura.",
      ],
      disabilityTypes: ["Netra", "Daksa", "Rungu"],
      accommodations: [
        "Format Perekapan Modular",
        "Pendampingan Komunitas Isyarat Papua",
        "Tempat Duduk Ramah Sandaran Ortopedi",
      ],
      companyEmail: "karir@inklusiindonesia.com",
      createdAt: "2026-05-09T09:00:00Z",
    },
  ];

  function readJobs() {
    try {
      let loaded = [];
      if (fs.existsSync(JOBS_FILE)) {
        const data = fs.readFileSync(JOBS_FILE, "utf-8");
        loaded = JSON.parse(data);
      }

      if (!loaded || loaded.length < 145) {
        const fullJobsList = [...INITIAL_JOBS];

        const cities = [
          "Surabaya, Jawa Timur",
          "Sleman, DI Yogyakarta",
          "Bandung, Jawa Barat",
          "Jakarta Selatan, DKI Jakarta",
          "Semarang, Jawa Tengah",
          "Medan, Sumatera Utara",
          "Palembang, Sumatera Selatan",
          "Makassar, Sulawesi Selatan",
          "Denpasar, Bali",
          "Balikpapan, Kalimantan Timur",
          "Samarinda, Kalimantan Timur",
          "Pontianak, Kalimantan Barat",
          "Banjarmasin, Kalimantan Selatan",
          "Manado, Sulawesi Utara",
          "Jayapura, Papua",
          "Kupang, Nusa Tenggara Timur",
          "Mataram, Nusa Tenggara Barat",
          "Ambon, Maluku",
          "Pekanbaru, Riau",
          "Batam, Kepulauan Riau",
          "Serang, Banten",
          "Padang, Sumatera Barat",
          "Banda Aceh, Aceh",
          "Jambi, Jambi",
          "Bengkulu, Bengkulu",
          "Pangkalpinang, Babel",
          "Bandar Lampung, Lampung",
          "Ternate, Maluku Utara",
          "Manokwari, Papua Barat",
          "Palu, Sulawesi Tengah",
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
          "E-Commerce Admin",
        ];

        const companies = [
          {
            name: "PT Global Sentra Solusi",
            email: "recruitment@globalsentra.id",
          },
          {
            name: "Teknologi Hijau Nusantara",
            email: "karir@teknologihijau.co.id",
          },
          {
            name: "Deco Digital Creative Studio",
            email: "hello@decodigital.io",
          },
          { name: "Karya Mandiri Retail", email: "hrd@karyamandiri.co.id" },
          {
            name: "PT Inklusi Indonesia Jaya",
            email: "karir@inklusiindonesia.com",
          },
          { name: "Sentra Digital Utama", email: "karir@sentradigital.co.id" },
          { name: "Nusa Bakti Sejahtera", email: "sdm@nusabakti.or.id" },
          {
            name: "Kreatif Mandiri Jaya",
            email: "recruitment@kreatifmandiri.id",
          },
        ];

        const disabilityPool = [
          ["Daksa"],
          ["Netra"],
          ["Rungu"],
          ["Grahita"],
          ["Mental"],
          ["Daksa", "Rungu"],
          ["Rungu", "Mental"],
          ["Netra", "Daksa"],
          ["Grahita", "Mental"],
          ["Daksa", "Netra", "Rungu"],
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
          "Pendampingan Mentor Khusus",
        ];

        const unsplashLogos = [
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=150&q=80",
          "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=150&q=80",
          "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=150&q=80",
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
          "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=150&q=80",
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=150&q=80",
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=150&q=80",
        ];

        const baseCount = fullJobsList.length;
        console.log(
          `readJobs: Starting job generation from job ${baseCount} to 145`,
        );
        for (let i = baseCount; i < 145; i++) {
          if (i % 20 === 0) console.log(`readJobs: Generating job ${i}...`);
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
              "Fokus tinggi dan teliti saat menyelesaikan tugas.",
            ];
          } else if (dis.includes("Netra")) {
            description = `Kami membuka lowongan kerja ${title} yang ramah aksesibilitas pembaca layar (screen reader) di ${company.name}. Pilihan tepat bagi rekan tunanetra yang menguasai jalan pintas keyboard komputer secara mandiri.`;
            requirements = [
              "Sanggup mengoperasikan pembaca layar seperti NVDA atau JAWS.",
              "Ramah, terstruktur, dan tekun dalam mengolah materi data digital.",
              "Memiliki PC/Laptop penunjang yang andal di rumah.",
            ];
          } else if (dis.includes("Daksa")) {
            description = `Posisi ${title} di ${company.name} dirancang ramah bagi penyandang disabilitas fisik/daksa. Lokasi kerja menyediakan infrastruktur ramah kursi roda, kruk, atau opsi kerja penuh jarak jauh (WFH) dari tempat tinggal Anda.`;
            requirements = [
              "Mengerti pengoperasian tools penulisan dokumen standar.",
              "Mampu berkomunikasi dan berkoordinasi secara tangkas dengan tim regional.",
              "Jujur, disiplin, dan bersemangat untuk terus berkembang.",
            ];
          } else {
            description = `Sambut kesempatan karir yang setara sebagai ${title} bersama ${company.name}. Lingkungan kerja yang aman, minim tekanan, serta inklusif mendukung rekan disabilitas grahita ringan atau mental stabil untuk fokus berkarya.`;
            requirements = [
              "Mampu mengikuti instruksi panduan visual/tertulis secara runtut.",
              "Menyukai tipe pekerjaan yang teratur dan sistematis.",
              "Disiplin dalam menjaga kerahasiaan berkas operasional.",
            ];
          }

          const accs: string[] = [];
          if (isWfh) {
            accs.push("Pekerjaan Rumah Penuh (WFH)");
          } else {
            accs.push("Jam Kerja Fleksibel");
          }
          if (dis.includes("Daksa") && !isWfh) {
            accs.push(
              "Ramp Kursi Roda & Lift",
              "Meja Ergonomis Dapat Disesuaikan",
            );
          }
          if (dis.includes("Netra")) {
            accs.push("Aplikasi Pembaca Layar");
          }
          if (dis.includes("Rungu")) {
            accs.push("Penerjemah Bahasa Isyarat");
          }
          if (dis.includes("Mental") || dis.includes("Grahita")) {
            accs.push(
              "Lingkungan Kerja Tenang & Redup",
              "Pendampingan Mentor Khusus",
            );
          }

          // Fill accommodations up to 3 items with safety limit
          let attempts = 0;
          while (accs.length < 3 && attempts < 20) {
            const extra =
              accommodationPool[
                (i + accs.length + attempts) % accommodationPool.length
              ];
            if (!accs.includes(extra)) accs.push(extra);
            attempts++;
          }

          const d = new Date();
          d.setDate(d.getDate() - (i % 45));
          const createdAt = d.toISOString();

          fullJobsList.push({
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
            createdAt,
          });
        }

        fs.writeFileSync(
          JOBS_FILE,
          JSON.stringify(fullJobsList, null, 2),
          "utf-8",
        );
        return fullJobsList;
      }
      return loaded;
    } catch (err) {
      console.error("Error reading jobs file:", err);
      return INITIAL_JOBS;
    }
  }

  function writeJobs(jobs: any) {
    try {
      fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2), "utf-8");
    } catch (err) {
      console.error("Error writing jobs file:", err);
    }
  }

  function readApplications() {
    try {
      if (!fs.existsSync(APPLICATIONS_FILE)) {
        fs.writeFileSync(
          APPLICATIONS_FILE,
          JSON.stringify([], null, 2),
          "utf-8",
        );
        return [];
      }
      const data = fs.readFileSync(APPLICATIONS_FILE, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading applications file:", err);
      return [];
    }
  }

  function writeApplications(apps: any) {
    try {
      fs.writeFileSync(
        APPLICATIONS_FILE,
        JSON.stringify(apps, null, 2),
        "utf-8",
      );
    } catch (err) {
      console.error("Error writing applications file:", err);
    }
  }

  // API Endpoints
  // GET /api/jobs (supports search, location, company, and disabilityType filtering)
  app.get("/api/jobs", (req, res) => {
        try {
          console.log("[API] GET /api/jobs - query:", req.query);
    let jobs = readJobs();
    const query = req.query.search as string;
    const company = req.query.company as string;
    const location = req.query.location as string;
    const disability = req.query.disability as string;

    if (disability && disability !== "all") {
      jobs = jobs.filter((job: any) =>
        job.disabilityTypes.some(
          (d: string) => d.toLowerCase() === disability.toLowerCase(),
        ),
      );
    }

    if (query) {
      const q = query.toLowerCase();
      jobs = jobs.filter(
        (job: any) =>
          job.title.toLowerCase().includes(q) ||
          job.companyName.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q),
      );
    }

    if (company) {
      const c = company.toLowerCase();
      jobs = jobs.filter((job: any) =>
        job.companyName.toLowerCase().includes(c),
      );
    }

    if (location) {
      const loc = location.toLowerCase();
      jobs = jobs.filter((job: any) =>
        job.location.toLowerCase().includes(loc),
      );
    }

    // Sort by newest
    jobs.sort(
    try {
      console.log("[API] GET /api/jobs - query:", req.query);
      let jobs = readJobs();
      const query = req.query.search as string;
      const company = req.query.company as string;
      const location = req.query.location as string;
      const disability = req.query.disability as string;

      if (disability && disability !== "all") {
        jobs = jobs.filter((job: any) =>
          job.disabilityTypes.some(
            (d: string) => d.toLowerCase() === disability.toLowerCase(),
          ),
        );
      }

      if (query) {
        const q = query.toLowerCase();
        jobs = jobs.filter(
          (job: any) =>
            job.title.toLowerCase().includes(q) ||
            job.companyName.toLowerCase().includes(q) ||
            job.description.toLowerCase().includes(q),
        );
      }

      if (company) {
        const c = company.toLowerCase();
        jobs = jobs.filter((job: any) =>
          job.companyName.toLowerCase().includes(c),
        );
      }

      if (location) {
        const loc = location.toLowerCase();
        jobs = jobs.filter((job: any) =>
          job.location.toLowerCase().includes(loc),
        );
      }

      // Sort by newest
      jobs.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      console.log("[API] GET /api/jobs - returning", jobs.length, "jobs");
      res.json(jobs);
    } catch (err) {
      console.error("[API] GET /api/jobs - error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
      location,
      salaryRange,
      description,
      requirements: Array.isArray(requirements)
        ? requirements
        : requirements.split("\n").filter((r: string) => r.trim() !== ""),
      disabilityTypes: Array.isArray(disabilityTypes)
        ? disabilityTypes
        : ["Daksa"],
      accommodations: Array.isArray(accommodations) ? accommodations : [],
      companyEmail,
      createdAt: new Date().toISOString(),
    };

    jobs.push(newJob);
    writeJobs(jobs);
    res.status(201).json(newJob);
  });

  // DELETE /api/jobs/:id
  app.delete("/api/jobs/:id", (req, res) => {
    const jobs = readJobs();
    const initialLength = jobs.length;
    const filtered = jobs.filter((j: any) => j.id !== req.params.id);

    if (filtered.length === initialLength) {
      return res.status(404).json({ error: "Lowongan tidak ditemukan." });
    }

    writeJobs(filtered);
    res.json({ success: true, message: "Lowongan berhasil dihapus." });
  });

  // GET /api/applications (get all applications)
  app.get("/api/applications", (req, res) => {
    const apps = readApplications();
    const email = req.query.email as string;

    let filtered = apps;
    if (email) {
      filtered = apps.filter(
        (app: any) => app.applicantEmail.toLowerCase() === email.toLowerCase(),
      );
    }

    res.json(filtered);
  });

  // POST /api/applications (applicant applies for a job)
  app.post("/api/applications", (req, res) => {
    const {
      jobId,
      jobTitle,
      companyName,
      applicantName,
      applicantEmail,
      applicantPhone,
      applicantDisability,
      coverLetter,
      resumeUrl,
    } = req.body;

    if (
      !jobId ||
      !applicantName ||
      !applicantEmail ||
      !applicantPhone ||
      !applicantDisability ||
      !coverLetter
    ) {
      return res.status(400).json({ error: "Semua form lamaran wajib diisi." });
    }

    const apps = readApplications();
    const newApp = {
      id: "app-" + Date.now(),
      jobId,
      jobTitle,
      companyName,
      applicantName,
      applicantEmail,
      applicantPhone,
      applicantDisability,
      coverLetter,
      resumeUrl: resumeUrl || "",
      status: "Pending",
      appliedAt: new Date().toISOString(),
    };

    apps.push(newApp);
    writeApplications(apps);
    res.status(201).json(newApp);
  });

  // PUT /api/applications/:id (change status)
  app.put("/api/applications/:id", (req, res) => {
    const { status } = req.body;
    const apps = readApplications();
    const idx = apps.findIndex((a: any) => a.id === req.params.id);

    if (idx === -1) {
      return res.status(404).json({ error: "Lamaran tidak ditemukan." });
    }

    apps[idx].status = status || apps[idx].status;
    writeApplications(apps);
    res.json(apps[idx]);
  });

  // POST /api/auth/register (register a new user)
  app.post("/api/auth/register", (req, res) => {
    try {
      const { name, email, password, role } = req.body || {};
      if (!name || !email || !password || !role) {
        return res
          .status(400)
          .json({ error: "Nama, email, password, dan peran wajib diisi." });
      }

      const users = readUsers();
      const existing = users.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (existing) {
        return res.status(400).json({ error: "Email sudah terdaftar." });
      }

      const newUser = {
        id: "user-" + Date.now(),
        name,
        email: email.toLowerCase(),
        password,
        role,
      };

      users.push(newUser);
      writeUsers(users);

      const { password: _, ...userWithoutPassword } = newUser;
      return res.status(201).json(userWithoutPassword);
    } catch (err: any) {
      console.error("Register endpoint error:", err);
      return res.status(500).json({
        error: "Terjadi kesalahan sistem pendaftaran: " + err.message,
      });
    }
  });

  // POST /api/auth/login (login user)
  app.post("/api/auth/login", (req, res) => {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email dan password wajib diisi." });
      }

      const users = readUsers();
      const user = users.find(
        (u: any) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password,
      );
      if (!user) {
        return res.status(401).json({ error: "Email atau password salah." });
      }

      const { password: _, ...userWithoutPassword } = user;
      return res.json(userWithoutPassword);
    } catch (err: any) {
      console.error("Login endpoint error:", err);
      return res
        .status(500)
        .json({ error: "Terjadi kesalahan sistem login: " + err.message });
    }
  });

  // Vite dev server middleware
  if (process.env.NODE_ENV !== "production") {
      console.log("[Vite] Initializing Vite dev server...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
      console.log("[Vite] Vite server initialized successfully");
    });
    app.use(vite.middlewares);
    console.log("[Vite] Vite middlewares registered");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Pre-initialize files on start
  try {
    console.log("Initializing database collections...");
    console.log("Reading users...");
    readUsers();
    console.log("Users loaded successfully.");
    console.log("Reading jobs...");
    readJobs();
    console.log("Jobs loaded successfully.");
    console.log("Reading applications...");
    readApplications();
    console.log("Applications loaded successfully.");
    console.log("Database collections initialized successfully.");
  } catch (err) {
    console.error("Error pre-initializing databases:", err);
    process.exit(1);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
  console.log("[API] GET /api/jobs - returning", jobs.length, "jobs");
    } catch (err) {
      console.error("[API] GET /api/jobs - error:", err);
      res.status(500).json({ error: "Internal server error" });
    }

startServer();
