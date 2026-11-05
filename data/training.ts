/**
 * ============================================================================
 *  DATA KONTEN WEBSITE — cukup edit file ini saja.
 * ============================================================================
 *
 *  Semua teks, foto, logo, dan kontak diambil dari file ini. Komponen akan
 *  menyesuaikan otomatis bila Anda menambah/menghapus hari, sesi, atau foto.
 *
 *  FOTO
 *  - Simpan file di folder `public/`, misalnya:
 *      public/images/day1/theory-1.jpg  →  src: "/images/day1/theory-1.jpg"
 *  - Jika `src` dibiarkan kosong (""), akan tampil kotak placeholder
 *    bertuliskan "Foto akan ditambahkan".
 *  - Foto pertama di setiap sesi otomatis tampil lebih besar (featured)
 *    bila sesi tersebut memiliki minimal 3 foto.
 *
 *  LOGO
 *  - Simpan di public/logos/, misalnya public/logos/indi.png
 *    lalu isi: src: "/logos/indi.png"
 *
 *  ID
 *  - `id` hari & sesi dipakai sebagai anchor link (#day-1, dst).
 *    Gunakan huruf kecil, angka, dan tanda "-" saja, dan jangan sampai kembar.
 * ============================================================================
 */

/* ------------------------------------------------------------------ */
/*  Tipe data (tidak perlu diubah)                                     */
/* ------------------------------------------------------------------ */

export type Photo = {
  /** Path foto di folder public, contoh "/images/day1/theory-1.jpg". Kosongkan untuk placeholder. */
  src: string;
  /** Deskripsi singkat isi foto untuk pembaca layar (aksesibilitas). */
  alt: string;
  /** Keterangan yang tampil di bawah foto. */
  caption: string;
};

export type Session = {
  id: string;
  title: string;
  description: string;
  photos: Photo[];
};

export type Day = {
  id: string;
  label: string;
  title: string;
  date: string;
  summary: string;
  sessions: Session[];
};

export type Logo = {
  /** Nama lembaga — tampil sebagai teks placeholder jika `src` kosong. */
  name: string;
  /** Path logo di folder public, contoh "/logos/bnsp.png". */
  src: string;
};

export type Stat = {
  value: string;
  suffix?: string;
  label: string;
  description: string;
  icon: "calendar" | "book" | "users";
};

/* ------------------------------------------------------------------ */
/*  Informasi situs (SEO)                                              */
/* ------------------------------------------------------------------ */

export const site = {
  title: "Training of Trainers – DDT Assessor PetroChina | INDI",
  description:
    "Dokumentasi kegiatan Training of Trainers DDT Assessor PetroChina di Jambi yang diselenggarakan oleh Indonesia Driving Institute (INDI). #safedrivesaveslives",
  /**
   * URL website setelah online (opsional), contoh "https://ddt-petrochina.vercel.app".
   * Dipakai untuk link Open Graph. Di Vercel otomatis terisi bila dikosongkan.
   */
  url: "",
  keywords: [
    "Training of Trainers",
    "DDT",
    "Defensive Driving Training",
    "Assessor",
    "PetroChina",
    "INDI",
    "Indonesia Driving Institute",
    "Jambi",
    "safe driving",
  ],
};

/* ------------------------------------------------------------------ */
/*  Informasi utama kegiatan (Hero)                                    */
/* ------------------------------------------------------------------ */

export const event = {
  eyebrow: "Indonesia Driving Institute mempersembahkan",
  title: "Training of Trainers",
  subtitle: "DDT Assessor PetroChina",
  organizer: "Indonesia Driving Institute (INDI)",
  location: "Jambi",
  /** Contoh: "10 – 12 November 2026" */
  date: "DD – DD Bulan 2026",
  hashtag: "#safedrivesaveslives",
  /** Foto latar hero, contoh "/images/hero.jpg". Kosongkan untuk latar placeholder. */
  heroImage: "",
  heroImageAlt: "Suasana kegiatan Training of Trainers DDT Assessor PetroChina",
  ctaLabel: "Lihat Kegiatan",
};

/* ------------------------------------------------------------------ */
/*  Logo                                                               */
/* ------------------------------------------------------------------ */

export const logos = {
  /** Logo penyelenggara — tampil di navbar & footer. */
  organizer: { name: "INDI", src: "" } satisfies Logo,
  /** Logo klien — tampil besar di hero. */
  client: { name: "PetroChina", src: "" } satisfies Logo,
  /** Baris logo partner di bagian atas hero. Tambah/hapus sesuai kebutuhan. */
  partners: [
    { name: "INDI", src: "" },
    { name: "BNSP", src: "" },
    { name: "PDA – Performance Driving Australia", src: "" },
  ] satisfies Logo[],
};

/* ------------------------------------------------------------------ */
/*  Overview program                                                   */
/* ------------------------------------------------------------------ */

export const overview = {
  eyebrow: "Tentang Program",
  heading: "Mencetak Trainer & Assessor Defensive Driving yang Kompeten",
  paragraphs: [
    "Training of Trainers (ToT) DDT Assessor PetroChina adalah program pembekalan bagi calon trainer dan assessor Defensive Driving Training di lingkungan PetroChina. Teks ini merupakan contoh — silakan ganti dengan deskripsi program yang sebenarnya.",
    "Selama beberapa hari di Jambi, peserta mempelajari teori keselamatan berkendara, teknik penyampaian materi, hingga metode penilaian kompetensi. Setiap materi teori langsung dipraktikkan di lapangan bersama instruktur Indonesia Driving Institute (INDI).",
  ],
  stats: [
    {
      value: "3",
      suffix: "Hari",
      label: "Durasi Pelatihan",
      description: "Rangkaian kegiatan intensif dari pagi hingga sore.",
      icon: "calendar",
    },
    {
      value: "Teori & Praktik",
      label: "Metode Pembelajaran",
      description: "Materi kelas dipadukan dengan latihan langsung di lapangan.",
      icon: "book",
    },
    {
      value: "00",
      suffix: "Peserta",
      label: "Calon Trainer & Assessor",
      description: "Ganti angka ini dengan jumlah peserta yang sebenarnya.",
      icon: "users",
    },
  ] satisfies Stat[],
};

/* ------------------------------------------------------------------ */
/*  Rangkaian kegiatan per hari                                        */
/*  - Tambah hari baru: salin satu blok { id: "day-4", ... }           */
/*  - Tambah sesi baru: salin satu blok { id: "praktik-e", ... }       */
/*  - Tambah foto baru: salin satu baris { src, alt, caption }         */
/* ------------------------------------------------------------------ */

export const days: Day[] = [
  /* ============================== DAY 1 ============================== */
  {
    id: "day-1",
    label: "DAY 1",
    title: "Theory & Praktik",
    date: "Hari ke-1 · DD Bulan 2026",
    summary:
      "Hari pertama dibuka dengan pengenalan program, penyamaan persepsi standar DDT, dan materi teori dasar keselamatan berkendara, kemudian dilanjutkan praktik awal di lapangan.",
    sessions: [
      {
        id: "theory",
        title: "Theory",
        description:
          "Sesi kelas membahas konsep dasar defensive driving, faktor penyebab kecelakaan, serta peran trainer dan assessor dalam membangun budaya keselamatan. Teks ini adalah contoh.",
        photos: [
          {
            src: "", // contoh: "/images/day1/theory-1.jpg"
            alt: "Instruktur INDI membuka sesi teori di ruang kelas",
            caption: "Pembukaan program dan pengenalan tujuan Training of Trainers.",
          },
          {
            src: "",
            alt: "Peserta menyimak materi teori defensive driving",
            caption: "Peserta menyimak materi dasar defensive driving.",
          },
          {
            src: "",
            alt: "Diskusi kelompok peserta di kelas",
            caption: "Diskusi kelompok mengenai faktor penyebab kecelakaan.",
          },
          {
            src: "",
            alt: "Presentasi peserta di depan kelas",
            caption: "Peserta mempresentasikan hasil diskusi kelompok.",
          },
        ],
      },
      {
        id: "praktik",
        title: "Praktik",
        description:
          "Peserta turun ke lapangan untuk mempraktikkan pemeriksaan kendaraan sebelum berkendara (pre-trip inspection) dan posisi mengemudi yang benar. Teks ini adalah contoh.",
        photos: [
          {
            src: "", // contoh: "/images/day1/praktik-1.jpg"
            alt: "Peserta melakukan pemeriksaan kendaraan sebelum berkendara",
            caption: "Pre-trip inspection: pemeriksaan kondisi kendaraan.",
          },
          {
            src: "",
            alt: "Instruktur memberi arahan di area praktik",
            caption: "Instruktur memberikan arahan sebelum praktik dimulai.",
          },
          {
            src: "",
            alt: "Peserta mengatur posisi duduk mengemudi",
            caption: "Pengaturan posisi duduk, spion, dan sabuk keselamatan.",
          },
          {
            src: "",
            alt: "Kendaraan latihan di area praktik",
            caption: "Persiapan kendaraan latihan di area praktik.",
          },
          {
            src: "",
            alt: "Evaluasi praktik hari pertama",
            caption: "Evaluasi singkat di akhir sesi praktik hari pertama.",
          },
        ],
      },
    ],
  },

  /* ============================== DAY 2 ============================== */
  {
    id: "day-2",
    label: "DAY 2",
    title: "Praktik",
    date: "Hari ke-2 · DD Bulan 2026",
    summary:
      "Hari kedua sepenuhnya diisi praktik lapangan yang dibagi ke beberapa pos latihan. Peserta bergiliran sebagai pengemudi, pengamat, dan calon assessor.",
    sessions: [
      {
        id: "praktik-a",
        title: "Praktik A",
        description:
          "Deskripsi singkat Praktik A. Jelaskan tujuan latihan, teknik yang dipraktikkan, dan poin penting yang dinilai assessor. Teks ini adalah contoh.",
        photos: [
          {
            src: "", // contoh: "/images/day2/praktik-a-1.jpg"
            alt: "Peserta mengikuti Praktik A",
            caption: "Keterangan foto Praktik A — kegiatan pertama.",
          },
          {
            src: "",
            alt: "Instruktur mendampingi peserta Praktik A",
            caption: "Instruktur mendampingi peserta selama latihan.",
          },
          {
            src: "",
            alt: "Peserta mencatat hasil pengamatan",
            caption: "Peserta lain mengamati dan mencatat hasil latihan.",
          },
          {
            src: "",
            alt: "Briefing sebelum Praktik A",
            caption: "Briefing keselamatan sebelum latihan dimulai.",
          },
        ],
      },
      {
        id: "praktik-b",
        title: "Praktik B",
        description:
          "Deskripsi singkat Praktik B. Jelaskan skenario latihan dan kompetensi yang ingin dicapai peserta. Teks ini adalah contoh.",
        photos: [
          {
            src: "", // contoh: "/images/day2/praktik-b-1.jpg"
            alt: "Peserta mengikuti Praktik B",
            caption: "Keterangan foto Praktik B — kegiatan pertama.",
          },
          {
            src: "",
            alt: "Kendaraan melintasi lintasan latihan",
            caption: "Kendaraan melintasi lintasan latihan yang disiapkan.",
          },
          {
            src: "",
            alt: "Diskusi hasil Praktik B",
            caption: "Diskusi dan umpan balik dari instruktur.",
          },
        ],
      },
      {
        id: "praktik-c",
        title: "Praktik C",
        description:
          "Deskripsi singkat Praktik C. Jelaskan alur kegiatan, pembagian peran peserta, dan hasil yang diperoleh. Teks ini adalah contoh.",
        photos: [
          {
            src: "", // contoh: "/images/day2/praktik-c-1.jpg"
            alt: "Peserta mengikuti Praktik C",
            caption: "Keterangan foto Praktik C — kegiatan pertama.",
          },
          {
            src: "",
            alt: "Peserta berperan sebagai assessor",
            caption: "Peserta berlatih menjadi assessor menggunakan lembar penilaian.",
          },
          {
            src: "",
            alt: "Instruktur memperagakan teknik",
            caption: "Instruktur memperagakan teknik yang benar.",
          },
          {
            src: "",
            alt: "Peserta mengulang latihan",
            caption: "Peserta mengulang latihan hingga sesuai standar.",
          },
          {
            src: "",
            alt: "Foto bersama setelah Praktik C",
            caption: "Foto bersama setelah sesi Praktik C.",
          },
        ],
      },
      {
        id: "praktik-d",
        title: "Praktik D",
        description:
          "Deskripsi singkat Praktik D. Jelaskan tujuan latihan dan catatan penting dari instruktur. Teks ini adalah contoh.",
        photos: [
          {
            src: "", // contoh: "/images/day2/praktik-d-1.jpg"
            alt: "Peserta mengikuti Praktik D",
            caption: "Keterangan foto Praktik D — kegiatan pertama.",
          },
          {
            src: "",
            alt: "Pengamatan dari luar kendaraan",
            caption: "Pengamatan dari luar kendaraan oleh calon assessor.",
          },
          {
            src: "",
            alt: "Umpan balik instruktur kepada peserta",
            caption: "Umpan balik langsung dari instruktur INDI.",
          },
          {
            src: "",
            alt: "Rekap hasil Praktik D",
            caption: "Rekap hasil latihan di akhir hari kedua.",
          },
        ],
      },
      // Contoh menambah sesi baru — hapus tanda komentar (//) untuk mengaktifkan:
      // {
      //   id: "praktik-e",
      //   title: "Praktik E",
      //   description: "Deskripsi Praktik E.",
      //   photos: [
      //     { src: "/images/day2/praktik-e-1.jpg", alt: "…", caption: "…" },
      //   ],
      // },
    ],
  },

  /* ============================== DAY 3 ============================== */
  {
    id: "day-3",
    label: "DAY 3",
    title: "Theory & Praktik",
    date: "Hari ke-3 · DD Bulan 2026",
    summary:
      "Hari terakhir berfokus pada metode asesmen, simulasi penilaian oleh peserta, dan praktik akhir sebagai bentuk uji kompetensi sebelum penutupan program.",
    sessions: [
      {
        id: "theory",
        title: "Theory",
        description:
          "Materi kelas tentang teknik asesmen, pengisian lembar penilaian, dan cara memberikan umpan balik yang efektif kepada peserta pelatihan. Teks ini adalah contoh.",
        photos: [
          {
            src: "", // contoh: "/images/day3/theory-1.jpg"
            alt: "Sesi teori metode asesmen",
            caption: "Pemaparan metode asesmen kompetensi pengemudi.",
          },
          {
            src: "",
            alt: "Peserta mempelajari lembar penilaian",
            caption: "Peserta mempelajari format lembar penilaian.",
          },
          {
            src: "",
            alt: "Tanya jawab di kelas",
            caption: "Sesi tanya jawab bersama instruktur.",
          },
        ],
      },
      {
        id: "praktik",
        title: "Praktik",
        description:
          "Simulasi asesmen di lapangan: peserta menilai rekan sesama peserta menggunakan standar DDT, dilanjutkan evaluasi akhir dan penutupan. Teks ini adalah contoh.",
        photos: [
          {
            src: "", // contoh: "/images/day3/praktik-1.jpg"
            alt: "Simulasi asesmen di lapangan",
            caption: "Simulasi asesmen: peserta menilai rekan sesama peserta.",
          },
          {
            src: "",
            alt: "Peserta mengisi lembar penilaian di lapangan",
            caption: "Pengisian lembar penilaian secara langsung.",
          },
          {
            src: "",
            alt: "Instruktur meninjau hasil penilaian",
            caption: "Instruktur meninjau hasil penilaian peserta.",
          },
          {
            src: "",
            alt: "Evaluasi akhir program",
            caption: "Evaluasi akhir seluruh rangkaian program.",
          },
          {
            src: "",
            alt: "Penyerahan sertifikat",
            caption: "Penyerahan sertifikat kepada peserta.",
          },
          {
            src: "",
            alt: "Foto bersama penutupan program",
            caption: "Foto bersama seluruh peserta dan instruktur.",
          },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Penutup                                                            */
/* ------------------------------------------------------------------ */

export const closing = {
  eyebrow: "Terima kasih",
  /**
   * Hashtag besar di banner penutup. Tanda "|" = titik pindah baris bila
   * layar tidak cukup lebar (tidak ikut ditampilkan).
   */
  headline: "#safedrive|saveslives",
  message:
    "Terima kasih kepada PetroChina dan seluruh peserta yang telah mengikuti Training of Trainers DDT Assessor dengan penuh semangat. Mari terus menjadi teladan keselamatan berkendara di tempat kerja maupun di jalan raya.",
};

/* ------------------------------------------------------------------ */
/*  Kontak & footer                                                    */
/* ------------------------------------------------------------------ */

export const contact = {
  /** Tulis bebas, contoh "+62 812-3456-7890". Link telepon dibuat otomatis. */
  phone: "+62 8xx-xxxx-xxxx",
  email: "info@example.com",
  /** Tanpa atau dengan "@", contoh "indonesiadrivinginstitute". */
  instagram: "@akun_instagram",
  address: "Alamat kantor INDI (isi di data/training.ts)",
};

export const footer = {
  about:
    "Indonesia Driving Institute (INDI) adalah lembaga pelatihan keselamatan berkendara. Ganti teks ini dengan profil singkat INDI.",
  copyrightName: "Indonesia Driving Institute (INDI)",
  copyrightYear: "2026",
};
