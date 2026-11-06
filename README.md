# Training of Trainers – DDT Assessor PetroChina

Website one-page dokumentasi/galeri kegiatan **Training of Trainers – DDT Assessor PetroChina** di Jambi, diselenggarakan oleh **Indonesia Driving Institute (INDI)**. #safedrivesaveslives

Dibangun dengan **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, dan **Framer Motion**. Gaya visual modern minimalis mengikuti dokumen INDI: header merah gradien dengan garis halus, panel putih bersih, dan font **Plus Jakarta Sans**.

---

## 1. Instalasi & menjalankan

Syarat: **Node.js 20.9 atau lebih baru** (cek dengan `node -v`).

```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan mode pengembangan → buka http://localhost:3000
npm run dev

# 3. (Opsional) Uji build produksi
npm run build
npm run start

# Cek kualitas kode
npm run lint
```

---

## 2. Struktur folder

```
app/
  layout.tsx            ← font, metadata SEO & Open Graph
  page.tsx              ← susunan halaman (urutan section)
  globals.css           ← warna tema (CSS variables + Tailwind @theme) & utilitas
  opengraph-image.tsx   ← gambar preview saat link dibagikan (dibuat otomatis)
  icon.svg              ← favicon
components/
  Navbar.tsx            ← navbar sticky + scroll-spy + menu hamburger
  Hero.tsx              ← hero full screen + band merah diagonal
  Overview.tsx          ← deskripsi program + kartu statistik
  DayTimeline.tsx       ← timeline samping (desktop) / progress bar (mobile)
  DaySection.tsx        ← section per hari (latar terang/gelap selang-seling)
  SessionGallery.tsx    ← satu sesi: judul, deskripsi, grid foto
  PhotoCard.tsx         ← kartu foto + placeholder "Foto akan ditambahkan"
  Lightbox.tsx          ← foto besar, next/prev, swipe, ESC
  Closing.tsx           ← banner penutup #safedrivesaveslives
  Footer.tsx            ← kontak & copyright
  BackToTop.tsx         ← tombol kembali ke atas
  CurvePattern.tsx, LogoSlot.tsx, Reveal.tsx, MotionProvider.tsx, Icons.tsx  ← komponen bantu
hooks/
  useScrollSpy.ts       ← deteksi section aktif saat scroll
data/
  training.ts           ← ★ SEMUA KONTEN (teks, foto, logo, kontak) ★
public/
  images/day1/ day2/ day3/   ← foto kegiatan
  logos/                     ← logo INDI, PetroChina, partner
```

---

## 3. Mengganti teks & foto (cukup edit `data/training.ts`)

Semua konten ada di **satu file**: `data/training.ts`. Komponen tidak perlu disentuh.

### a. Teks utama
| Bagian | Variabel di `data/training.ts` |
|---|---|
| Judul, tagline, hashtag, foto latar hero, panel info (Pelaksanaan/tanggal, Lokasi, Peserta, Penyelenggara) | `event` (tanggal ada di `event.details`) |
| Logo INDI, PetroChina, partner | `logos` |
| Deskripsi program & 3 kartu statistik | `overview` |
| Hari, sesi, dan foto | `days` |
| Pesan penutup | `closing` |
| Telepon, email, Instagram, alamat | `contact` |
| Profil singkat & copyright | `footer` |
| Judul/deskripsi SEO, URL situs | `site` |

### b. Menambahkan foto
1. Salin file foto ke folder yang sesuai, misalnya `public/images/day1/theory-1.jpg`.
2. Di `data/training.ts`, isi `src` dengan path **tanpa** kata `public`:
   ```ts
   {
     src: "/images/day1/theory-1.jpg",
     alt: "Instruktur INDI membuka sesi teori di ruang kelas", // untuk pembaca layar
     caption: "Pembukaan program dan pengenalan tujuan ToT.",   // tampil di bawah foto
   },
   ```
3. Jika `src` dibiarkan `""`, akan tampil kotak placeholder merah bertuliskan **"Foto akan ditambahkan"**.

Tips foto:
- Format **.jpg / .webp**, lebar ±1600–2000 px sudah cukup (Next.js mengompres otomatis).
- Nama file huruf kecil tanpa spasi, contoh `praktik-a-1.jpg`.
- Foto pertama tiap sesi otomatis tampil **lebih besar** jika sesi itu berisi minimal 3 foto — jadi letakkan foto terbaik di urutan pertama.

### c. Menambah foto, sesi, atau hari baru
Tampilan menyesuaikan otomatis.

- **Foto baru** → salin satu blok `{ src, alt, caption }` di dalam `photos: [...]`.
- **Sesi baru** (mis. *Praktik E*) → salin satu blok sesi di dalam `sessions: [...]`:
  ```ts
  {
    id: "praktik-e",          // unik dalam hari tsb, huruf kecil & tanda "-"
    title: "Praktik E",
    description: "Deskripsi Praktik E.",
    photos: [
      { src: "/images/day2/praktik-e-1.jpg", alt: "…", caption: "…" },
    ],
  },
  ```
  (Contohnya sudah tersedia sebagai komentar di Day 2 — tinggal hapus tanda `//`.)
- **Hari baru** → salin satu blok hari di `days: [...]` dengan `id: "day-4"`, `label: "DAY 4"`. Menu navbar, timeline, dan warna latar selang-seling ikut bertambah otomatis.

### d. Logo
Simpan file di `public/logos/` (disarankan **.png transparan** atau **.svg**), lalu isi `src`:
```ts
organizer: { name: "INDI", src: "/logos/indi.png" },
client: { name: "PetroChina", src: "/logos/petrochina.png" },
partners: [
  { name: "BNSP", src: "/logos/bnsp.png" },
  { name: "PDA – Performance Driving Australia", src: "/logos/pda.png" },
],
```
Selama `src` kosong, tampil kotak placeholder bertuliskan nama lembaga.

### e. Foto latar hero
Simpan misalnya `public/images/hero.jpg`, lalu isi `event.heroImage: "/images/hero.jpg"`.

### f. Hashtag besar di penutup
`closing.headline: "#safedrive|saveslives"` — tanda `|` adalah titik pindah baris di layar kecil (tidak ikut tampil).

---

## 4. Warna tema (konfigurasi Tailwind)

Proyek ini memakai **Tailwind CSS v4**, sehingga konfigurasi tema ada di `app/globals.css` (bukan `tailwind.config.js`):

```css
:root {
  --brand-red: #c8102e;      /* Merah utama */
  --brand-dark: #8b0a14;     /* Merah gelap */
  --brand-bright: #e31e24;   /* Merah terang (hover, awal gradien) */
  --brand-maroon: #4a1418;   /* Merah kecokelatan (kartu bertingkat) */
  --brand-gold: #ffc20e;     /* Kuning emas (aksen kecil) */
  --brand-charcoal: #111418; /* Charcoal */
  --brand-white: #ffffff;
  --brand-light: #f4f4f5;    /* Abu muda */
}

@theme inline {
  --color-brand-red: var(--brand-red);
  /* …dst */
}
```

Warna bisa dipakai sebagai kelas Tailwind: `bg-brand-red`, `text-brand-dark`, `border-brand-charcoal/20`, dll. Ubah nilai hex di `:root` untuk mengganti warna seluruh situs. Utilitas khas tema juga ada di file yang sama: `bg-brand-gradient` (gradien merah header), `heading-display` (judul tebal, tracking rapat), dan `eyebrow` (label kecil kapital).

Font: **Plus Jakarta Sans** (200–800) untuk judul dan isi, dimuat lewat `next/font/google` di `app/layout.tsx`. Untuk mengganti font, ubah import `Plus_Jakarta_Sans` di file tersebut.

---

## 5. Deploy ke Vercel

### Cara A — lewat GitHub (disarankan)
1. Push repositori ini ke GitHub.
2. Buka <https://vercel.com/new>, login, lalu **Import** repositori tersebut.
3. Vercel otomatis mendeteksi **Next.js** — biarkan pengaturan default (Build Command `next build`, Output otomatis).
4. Klik **Deploy**. Dalam 1–2 menit situs online di `https://nama-proyek.vercel.app`.
5. Setiap kali Anda push perubahan (mis. menambah foto di `data/training.ts`), Vercel otomatis deploy ulang.

### Cara B — lewat Vercel CLI
```bash
npm i -g vercel
vercel          # deploy preview (ikuti pertanyaan pertama kali)
vercel --prod   # deploy ke produksi
```

### Domain & Open Graph
- Domain sendiri: Vercel → Project → **Settings → Domains**.
- URL untuk preview link (Open Graph) diambil otomatis dari domain produksi Vercel. Jika memakai domain sendiri, isi `site.url` di `data/training.ts` (mis. `"https://dokumentasi.indi.co.id"`) atau set environment variable `NEXT_PUBLIC_SITE_URL`.

---

## 6. Fitur

- One-page dengan smooth scroll, navbar sticky (transparan → solid) dan **scroll-spy**.
- Timeline Day 1–Day N: vertikal di samping (desktop ≥1280px), progress bar di atas (mobile/tablet).
- Galeri responsif 1/2/3 kolom dengan foto unggulan, **lightbox** (next/prev, panah keyboard, swipe, ESC, klik di luar foto).
- Animasi fade-in/slide-up halus (Framer Motion) yang menghormati pengaturan *reduce motion*.
- Tombol kembali ke atas, menu hamburger di mobile.
- SEO: metadata, Open Graph & Twitter card, gambar OG otomatis, `lang="id"`.
- Aksesibilitas: alt text, skip link, fokus keyboard terlihat, focus trap di lightbox, kontras warna sesuai WCAG.
