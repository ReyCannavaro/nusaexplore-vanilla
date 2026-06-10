<div align="center">

<img src="Logo.png" alt="NusaExplore Logo" width="180"/>

# NusaExplore
### 🌏 Platform Edukasi Budaya Indonesia — Jelajahi Warisan Nusantara

[![Status](https://img.shields.io/badge/status-aktif-brightgreen?style=flat-square)](https://github.com)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

**NusaExplore** adalah aplikasi web edukasi berbasis Vanilla JavaScript yang mengajak pengguna menjelajahi kekayaan budaya 38 provinsi Indonesia melalui peta interaktif, kuis budaya, dan puzzle gambar — tanpa framework, tanpa build tool, tanpa ketergantungan eksternal.

[🚀 Mulai Jelajah](#-cara-menjalankan-di-lokal) · [📖 Dokumentasi](#-struktur-proyek) · [🎮 Fitur Games](#-modul-games--minigames) · [🗺️ Peta Interaktif](#-modul-peta-interaktif)

</div>

---

## 📋 Daftar Isi

- [Gambaran Umum](#-gambaran-umum)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Struktur Proyek](#-struktur-proyek)
- [Cara Menjalankan di Lokal](#-cara-menjalankan-di-lokal)
- [Struktur Folder Gambar](#-struktur-folder-gambar-wajib)
- [Arsitektur Aplikasi](#-arsitektur-aplikasi)
- [Sistem Routing (Hash-based SPA)](#-sistem-routing-hash-based-spa)
- [Modul: Beranda (Home)](#-modul-beranda-home)
- [Modul: Peta Interaktif](#-modul-peta-interaktif)
- [Modul: Games & Minigames](#-modul-games--minigames)
- [Modul: Detail Provinsi](#-modul-detail-provinsi)
- [Sistem Gamifikasi & Ekonomi Kunci](#-sistem-gamifikasi--ekonomi-kunci)
- [Manajemen Data & State](#-manajemen-data--state)
- [Tema & Design System](#-tema--design-system)
- [Data & Konten](#-data--konten)
- [Deploy ke Vercel](#-deploy-ke-vercel)
- [Deploy ke Platform Lain](#-deploy-ke-platform-lain)
- [Kustomisasi & Pengembangan Lanjutan](#-kustomisasi--pengembangan-lanjutan)
- [Referensi Fungsi](#-referensi-fungsi-lengkap)
- [FAQ & Troubleshooting](#-faq--troubleshooting)
- [Kontribusi](#-kontribusi)

---

## 🌺 Gambaran Umum

NusaExplore lahir dari semangat untuk membuat edukasi budaya Indonesia yang **menyenangkan, interaktif, dan mudah diakses**. Platform ini dibangun menggunakan **Vanilla HTML/CSS/JavaScript murni** — tidak ada React, tidak ada Vue, tidak ada Angular — menjadikannya sangat ringan, cepat, dan dapat di-deploy ke mana saja tanpa proses build.

### Apa yang bisa dilakukan NusaExplore?

| Fitur | Deskripsi |
|-------|-----------|
| 🗺️ **Peta SVG Interaktif** | Klik provinsi di peta Indonesia, lihat detail budaya, wisata & kuliner |
| 🎓 **Quiz Budaya** | 160+ soal dari 38 provinsi, timer 30 detik per soal |
| 🧩 **Puzzle Nusantara** | Susun 9 kepingan gambar budaya dengan mekanisme klik-tukar |
| 🔓 **Sistem Kunci** | Kunci provinsi dengan "kunci" yang didapat dari menyelesaikan game |
| 🌙 **Dark/Light Mode** | Toggle tema dengan simpan preferensi di localStorage |
| 📱 **Responsif** | Mendukung mobile, tablet, dan desktop |
| ✨ **Animasi Halus** | Transisi halaman, scroll reveal, unlock burst animation |

---

## ✨ Fitur Utama

### 🗺️ Peta Indonesia SVG Interaktif
- Peta SVG vektor resolusi tinggi dengan **38 path provinsi** individual
- Hover tooltip menampilkan nama provinsi
- Warna berbeda untuk provinsi yang sudah/belum di-unlock
- Progress bar menunjukkan berapa persen Indonesia sudah dijelajahi
- Animasi "unlock burst" dengan efek SVG khusus saat membuka provinsi baru

### 🎮 Minigames Edukatif
- **Quiz Budaya**: 5 soal acak per sesi, timer countdown 30 detik, skor 0-100
- **Puzzle Nusantara**: Grid 3×3, klik dua tile untuk menukar, 3 gambar tersedia per provinsi

### 🏆 Sistem Gamifikasi
- **Kunci** sebagai mata uang dalam game
- Tiga level kesulitan provinsi: Mudah (1 kunci), Sedang (2 kunci), Susah (3 kunci)
- Reward setelah menyelesaikan kedua game di satu provinsi
- Progress tersimpan di `localStorage` — tidak hilang saat refresh

### 📚 Konten Budaya Kaya
- **5 budaya unggulan** di halaman beranda dengan modal detail
- **38 halaman detail provinsi** dengan informasi ibu kota, populasi, luas wilayah, bahasa daerah
- Galeri budaya, wisata, dan kuliner per provinsi
- Fakta-fakta unik tersusun dalam kartu interaktif

### 🎨 Design System Premium
- Palet warna emas (`--gold: #C9A84C`) sebagai aksen utama
- Font **Playfair Display** (serif elegan) + **Plus Jakarta Sans** (modern sans)
- Marquee animasi nama budaya Indonesia
- Komponen toast notification untuk feedback aksi pengguna

---

## 🛠️ Tech Stack

```
┌─────────────────────────────────────────────────────┐
│                   NusaExplore Stack                 │
├─────────────────────┬───────────────────────────────┤
│  Bahasa             │  HTML5, CSS3, Vanilla JS (ES5) │
│  Rendering          │  DOM manipulation langsung    │
│  Routing            │  Hash-based (#/path)          │
│  State Management   │  localStorage + JS variables  │
│  Peta               │  SVG inline (tanpa library)   │
│  Build Tool         │  ❌ Tidak ada                 │
│  Package Manager    │  ❌ Tidak ada                 │
│  Framework          │  ❌ Tidak ada                 │
│  Hosting            │  Vercel (statis)              │
│  Font               │  Google Fonts                 │
└─────────────────────┴───────────────────────────────┘
```

> **Mengapa Vanilla JS?** Kode ini portabel 100% — bisa dibuka dari file system lokal (`file://`), di-host di GitHub Pages, Netlify, Vercel, atau server statis manapun tanpa instalasi apapun.

---

## 📁 Struktur Proyek

```
nusaexplore-vanilla-main/
│
├── index.html                  # Entry point tunggal aplikasi
├── vercel.json                 # Konfigurasi deploy Vercel
├── Logo.png                    # Logo utama NusaExplore
├── README-IMAGES.md            # Panduan struktur folder gambar
│
├── css/
│   └── style.css               # Semua styling (788 baris)
│                               # Mencakup: design tokens, komponen,
│                               # animasi, responsive, dark/light mode
│
├── js/
│   ├── app.js                  # 🧠 Core: Router, Navbar, Footer, Theme
│   ├── data.js                 # 💾 Storage, Game helpers, Difficulty config
│   ├── home.js                 # 🏠 Render halaman beranda
│   ├── map.js                  # 🗺️ Render & interaksi peta SVG
│   ├── province.js             # 📋 Render halaman detail provinsi
│   ├── games.js                # 🎮 Quiz + Puzzle game engine
│   ├── regions.js              # 📍 Data SVG path 38 provinsi (108KB)
│   ├── quizData.js             # ❓ 160+ soal kuis per provinsi
│   ├── provinceDetailData.js   # 📚 Data lengkap 38 provinsi (105KB)
│   └── data.js                 # 🗂️ Data budaya, marquee, puzzle map
│
└── images/                     # ⚠️ PERLU DITAMBAHKAN MANUAL
    ├── assets/                 # Gambar hero beranda (batik, wayang, dst)
    ├── provinces/              # Hero image tiap provinsi
    ├── culture/                # Foto budaya per provinsi
    ├── tourism/                # Foto wisata per provinsi
    └── culinary/               # Foto kuliner per provinsi
```

---

## 🚀 Cara Menjalankan di Lokal

### Prasyarat

Tidak ada instalasi Node.js atau dependency yang wajib. Namun untuk menjalankan di browser dengan benar (menghindari CORS pada `file://`), gunakan salah satu dari:

- **VS Code** dengan ekstensi [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- **Node.js** (versi 14+) untuk `npx serve`
- **Python** (versi 3.x) untuk server bawaan

---

### Metode 1: VS Code Live Server (Paling Mudah)

```bash
# 1. Clone atau download repository
git clone https://github.com/username/nusaexplore-vanilla.git
cd nusaexplore-vanilla-main

# 2. Buka dengan VS Code
code .

# 3. Install ekstensi Live Server jika belum ada
#    Pergi ke Extensions (Ctrl+Shift+X)
#    Cari "Live Server" oleh Ritwick Dey
#    Klik Install

# 4. Klik kanan index.html di Explorer
#    Pilih "Open with Live Server"
#    Browser akan terbuka di http://127.0.0.1:5500
```

---

### Metode 2: Node.js dengan `npx serve`

```bash
# Tidak perlu install apapun, langsung jalankan:
npx serve .

# Output:
#   ┌──────────────────────────────────────────┐
#   │                                          │
#   │   Serving!                               │
#   │                                          │
#   │   - Local:    http://localhost:3000      │
#   │   - Network:  http://192.168.x.x:3000   │
#   │                                          │
#   └──────────────────────────────────────────┘
```

---

### Metode 3: Python HTTP Server

```bash
# Python 3
python3 -m http.server 8080

# Python 2 (legacy)
python -m SimpleHTTPServer 8080

# Buka: http://localhost:8080
```

---

### Metode 4: PHP Built-in Server

```bash
php -S localhost:8080

# Buka: http://localhost:8080
```

---

### ⚠️ Catatan Penting: Folder Gambar

Setelah pertama kali membuka aplikasi, gambar-gambar **belum akan muncul** karena folder `images/` tidak disertakan di repository utama (ukurannya besar). Lihat bagian [Struktur Folder Gambar](#-struktur-folder-gambar-wajib) untuk panduan menambahkannya.

Aplikasi tetap **berfungsi penuh** tanpa gambar — elemen `<img>` memiliki `onerror` fallback yang mengganti background menjadi gradient warna.

---

## 🖼️ Struktur Folder Gambar (Wajib)

Buat folder `images/` di root proyek dengan struktur berikut:

```
images/
│
├── assets/                     # Gambar hero halaman beranda
│   ├── batik.jpg               # Gambar batik untuk hero section
│   ├── wayang.jpg              # Gambar wayang kulit
│   ├── candi.jpg               # Gambar candi
│   ├── kecak.jpg               # Tari kecak (culture card)
│   ├── kecak2.jpg              # Tari kecak (modal popup)
│   ├── rendang.jpg             # Rendang (culture card)
│   ├── rendang2.jpg            # Rendang (modal popup)
│   ├── gamelan.jpg             # Gamelan (culture card)
│   ├── gamelan2.jpg            # Gamelan (modal popup)
│   ├── wayang2.jpg             # Wayang (culture card)
│   └── wayang3.jpg             # Wayang (modal popup)
│
├── provinces/                  # Hero image per provinsi (38 file)
│   ├── aceh-hero.jpg
│   ├── sumut-hero.jpg
│   ├── sumbar-hero.jpg
│   ├── kepri-hero.jpg
│   ├── jambi-hero.jpg
│   ├── sumsel-hero.jpg
│   ├── babel-hero.jpg
│   ├── bengkulu-hero.jpg
│   ├── lampung-hero.jpg
│   ├── jakarta-hero.jpg
│   ├── jabar-hero.jpg
│   ├── banten-hero.jpg
│   ├── jateng-hero.jpg
│   ├── jogja-hero.jpg
│   ├── jatim-hero.jpg
│   ├── bali-hero.jpg
│   ├── ntb-hero.jpg
│   ├── ntt-hero.jpg
│   ├── kalbar-hero.jpg
│   ├── kalteng-hero.jpg
│   ├── kalsel-hero.jpg
│   ├── kaltim-hero.jpg
│   ├── kaltara-hero.jpg
│   ├── sulut-hero.jpg
│   ├── gorontalo-hero.jpg
│   ├── sulteng-hero.jpg
│   ├── sulbar-hero.jpg
│   ├── sulsel-hero.jpg
│   ├── sultra-hero.jpg
│   ├── maluku-hero.jpg
│   ├── malut-hero.jpg
│   ├── papbar-hero.jpg
│   └── papua-hero.jpg
│
├── culture/                    # Foto budaya per provinsi
│   ├── Aceh/
│   │   ├── aceh-1.jpg          # Masjid Raya Baiturrahman
│   │   ├── aceh-2.jpg          # Tari Saman
│   │   ├── aceh-3.jpg          # Rencong
│   │   ├── aceh-4.jpg          # Didong
│   │   ├── aceh-5.jpg          # Rumoh Aceh
│   │   └── aceh-6.jpg          # Pinto Aceh
│   ├── Sumatra_Utara/
│   │   ├── sumut-1.jpg
│   │   └── sumut-2.jpg
│   ├── Sumatra_Barat/
│   │   ├── sumbar-1.jpg
│   │   └── sumbar-2.jpg
│   ├── Kepulauan_Riau/
│   ├── Jambi/
│   ├── Sumatera_Selatan/
│   ├── Bangka_Belitung/
│   ├── Bengkulu/
│   ├── Lampung/
│   ├── Jakarta/
│   │   ├── jkt-1.jpg
│   │   └── jkt-2.jpg
│   ├── Jawa_Barat/
│   ├── Banten/
│   ├── Jawa_Tengah/
│   ├── Jogja/
│   ├── Jawa_Timur/
│   ├── Bali/
│   ├── Nusa_Tenggara_Barat/
│   ├── Nusa_Tenggara_Timur/
│   ├── Kalimantan_Barat/
│   ├── Kalimantan_Tengah/
│   ├── Kalimantan_Selatan/
│   ├── Kalimantan_Timur/
│   ├── Kalimantan_Utara/
│   ├── Sulawesi_Utara/
│   ├── Gorontalo/
│   ├── Sulawesi_Tengah/
│   ├── Sulawesi_Barat/
│   ├── Sulawesi_Selatan/
│   ├── Sulawesi_Tenggara/
│   ├── Maluku/
│   ├── Maluku_Utara/
│   ├── Papua_Barat/
│   └── Papua/
│
├── tourism/                    # Foto destinasi wisata (struktur sama dengan culture/)
│   └── ...
│
└── culinary/                   # Foto kuliner khas (struktur sama dengan culture/)
    └── ...
```

> **Tips:** Nama folder harus **persis sama** (case-sensitive) dengan yang tertera di `provinceDetailData.js` dan `data.js`. Gunakan gambar berformat `.jpg` atau `.webp` dengan resolusi minimal 800×600px untuk hasil terbaik.

---

## 🏗️ Arsitektur Aplikasi

NusaExplore menggunakan pola **Single Page Application (SPA) sederhana** tanpa framework. Seluruh UI di-render ke dalam satu elemen `<div id="app">`.

```
index.html
    │
    ├── <div id="app">              ← Target render semua halaman
    │
    └── <script> (urutan penting!)
        ├── regions.js              ← Dimuat pertama (data SVG)
        ├── quizData.js             ← Data kuis
        ├── provinceDetailData.js   ← Data detail provinsi
        ├── data.js                 ← Storage helpers + game data
        ├── app.js                  ← Router + utility (dimuat setelah data)
        ├── home.js                 ← Page renderer
        ├── map.js                  ← Page renderer
        ├── province.js             ← Page renderer
        └── games.js                ← Page renderer + game engine
```

### Alur Render Halaman

```
URL berubah (hashchange / load)
        │
        ▼
   _getHash()         → Ambil path dari location.hash
        │
        ▼
   render(path)       → Dispatch ke renderer yang tepat
        │
   ┌────┴──────────────────────────────────┐
   │  path === '/'        → renderHome()   │
   │  path === '/map'     → renderMap()    │
   │  path === '/games'   → renderGames()  │
   │  path starts '/province/' → renderProvince(slug) │
   │  path starts '/quiz/'     → renderQuiz(slug)     │
   │  path starts '/puzzle/'   → renderPuzzle(slug)   │
   └───────────────────────────────────────┘
        │
        ▼
   setPage(html)      → Animasi fade-out → inject HTML → fade-in
        │
        ▼
   initReveal()       → Aktifkan IntersectionObserver untuk animasi scroll
```

---

## 🧭 Sistem Routing (Hash-based SPA)

Routing dikelola sepenuhnya oleh `app.js` menggunakan `location.hash`:

| URL Hash | Halaman | Fungsi Renderer |
|----------|---------|-----------------|
| `#/` atau `#` | Beranda | `renderHome()` |
| `#/map` | Peta Interaktif | `renderMap()` |
| `#/games` | Pilihan Game | `renderGames()` |
| `#/province/aceh` | Detail Provinsi Aceh | `renderProvince('aceh')` |
| `#/province/bali` | Detail Provinsi Bali | `renderProvince('bali')` |
| `#/quiz/jawa-timur` | Quiz Jawa Timur | `renderQuiz('jawa-timur')` |
| `#/puzzle/sulawesi-selatan` | Puzzle Sulawesi Selatan | `renderPuzzle('sulawesi-selatan')` |

### Fungsi Navigasi

```javascript
// Navigasi programatik ke path tertentu
navigate('/map');              // Pergi ke peta
navigate('/province/bali');    // Pergi ke detail Bali
navigate('/quiz/aceh');        // Mulai quiz Aceh
navigate('/puzzle/papua');     // Mulai puzzle Papua
```

### Animasi Transisi Halaman

Setiap pergantian halaman memiliki animasi transisi yang dikelola `setPage()`:

```
1. Fade out  → opacity: 0, translateY: 10px  (160ms)
2. Ganti HTML di #app
3. Reset ke posisi bawah: translateY: 18px
4. Fade in   → opacity: 1, translateY: 0     (450ms, cubic-bezier spring)
5. initReveal() dipanggil setelah 80ms untuk animasi scroll
```

---

## 🏠 Modul: Beranda (Home)

**File:** `js/home.js`

Halaman beranda terdiri dari beberapa seksi yang di-render secara dinamis:

### Seksi-seksi Beranda

#### 1. Navbar
```
Logo "NusaExplore" | Beranda | Peta | Games | [Mulai Jelajah] | [Toggle Tema]
```
- Hamburger menu untuk mobile
- Scroll effect: navbar menjadi semi-transparan saat di-scroll
- Tombol tema dengan ikon SVG matahari/bulan inline

#### 2. Hero Section
```
┌─────────────────────────────┬──────────────────────┐
│ Platform Edukasi Budaya     │   [Hero Image Batik]  │
│                             │                       │
│ Jelajahi                    │  [Wayang] [Candi]     │
│  Warisan                    │                       │
│  Nusantara                  │                       │
│                             │                       │
│ [Mulai Eksplorasi] [Games]  │                       │
│                             │                       │
│ 1,340+ | 746 | 38           │                       │
│ Suku    Bahasa  Provinsi    │                       │
└─────────────────────────────┴──────────────────────┘
```

#### 3. Marquee Animasi
Teks berjalan otomatis berisi nama-nama budaya Indonesia:
```
Batik Nusantara • Wayang Kulit • Gamelan Jawa • Tari Kecak • Rumah Adat • ...
```

#### 4. Culture Cards Grid
5 kartu budaya unggulan yang bisa diklik untuk membuka modal detail:

| ID | Budaya | Tag |
|----|--------|-----|
| 1 | Batik | Seni Kain · UNESCO 2009 |
| 2 | Tari Kecak | Tari Tradisional · UNESCO 2015 |
| 3 | Rendang | Kuliner · UNESCO 2023 |
| 4 | Gamelan | Seni Musik · UNESCO 2021 |
| 5 | Wayang Kulit | Seni Pertunjukan · UNESCO 2008 |

#### 5. Features Grid
3 kartu fitur yang clickable:
- **Peta Interaktif** → navigate ke `/map`
- **Quiz Budaya** → navigate ke `/games`
- **Puzzle Nusantara** → navigate ke `/games`

#### 6. Quote Section
> *"Bangsa yang besar adalah bangsa yang mengenal dan menghargai budaya leluhurnya"*
> — Ir. Soekarno

#### 7. CTA Section + Footer

### Modal Budaya

Saat culture card diklik, `openCultureModal(id)` dipanggil:

```javascript
// Komponen modal menampilkan:
// - Hero image dengan gradient overlay
// - Badge tag kategori
// - Judul lengkap
// - Meta: Asal Daerah + Periode (dengan ikon SVG inline)
// - Deskripsi multi-paragraf
// - Fakta menarik dalam chip/badge

// Tutup modal:
closeCultureModal()           // via tombol ×
closeCultureModalOverlay(e)  // klik di luar modal
```

---

## 🗺️ Modul: Peta Interaktif

**File:** `js/map.js`, data dari `js/regions.js`

### Komponen Peta

```
┌─────────────────────────────────────────────────────────┐
│  MAP GAME                          [X/38 Provinsi]      │
│  Jelajahi Indonesia        [Progress Bar] [🔑 N Kunci]  │
│  Level: ●Mudah-1🔑  ●Sedang-2🔑  ●Susah-3🔑            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   [           SVG PETA INDONESIA INTERAKTIF           ] │
│                                                         │
│   Hover → tooltip nama provinsi                        │
│   Klik  → popup info / unlock dialog                   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [Cara Bermain Panel — toggle]                          │
└─────────────────────────────────────────────────────────┘
```

### State Peta

```javascript
var mapState = {
  selectedId: null,   // ID provinsi yang sedang dipilih
  isSelected: false,  // Apakah ada provinsi terpilih
  showingHow: false   // Apakah panel cara bermain terbuka
};
```

### Alur Interaksi Peta

```
User hover provinsi
        │
        ▼
  _showTooltip(name, id, unlocked)
  → Tampilkan tooltip nama + status (🔒/✓)
        │
User klik provinsi
        │
        ▼
  ┌─────────────────────────────────────┐
  │ Provinsi SUDAH di-unlock?           │
  │   Ya → showRegionPopup(id, name)    │
  │   Tidak → showUnlockPopup(id, name) │
  └─────────────────────────────────────┘
```

### Popup Provinsi (Sudah Unlock)

```
┌──────────────────────────────────┐
│  [NAMA PROVINSI]                 │
│  Level: Mudah/Sedang/Susah       │
├──────────────────────────────────┤
│  🎮 Quiz Budaya    [Status]      │
│  🧩 Puzzle         [Status]      │
├──────────────────────────────────┤
│  [Jelajahi Detail]               │
│  [Mulai Quiz] [Mulai Puzzle]     │
│                    [Klaim Reward]│
└──────────────────────────────────┘
```

### Popup Unlock Provinsi

```
┌──────────────────────────────────┐
│  🔒 [NAMA PROVINSI]              │
│                                  │
│  Diperlukan: X 🔑 Kunci          │
│  Kamu punya: Y 🔑 Kunci          │
│                                  │
│  [Batal]    [Buka Provinsi]      │
└──────────────────────────────────┘
```

### Animasi Unlock

Ketika provinsi berhasil di-unlock, fungsi `_playUnlockAnim(id, onDone)` memainkan animasi SVG:

1. **Burst effect**: Provinsi scale up → scale down → normal
2. **Ripple**: Lingkaran SVG yang mengembang dan memudar
3. **Shine**: Kilatan cahaya di atas provinsi
4. CSS class `just-unlocked` ditambahkan untuk animasi CSS
5. Setelah animasi selesai, `showToast()` ditampilkan

### Panel Cara Bermain

Toggle dengan `toggleHowToPlay()`, menampilkan:
- Step 1: Klik provinsi di peta
- Step 2: Bayar kunci untuk membuka
- Step 3: Mainkan quiz & puzzle
- Step 4: Klaim reward kunci

---

## 🎮 Modul: Games & Minigames

**File:** `js/games.js`

### Halaman Pilihan Game

```
┌─────────────────────┬─────────────────────┐
│   🎓 Quiz Budaya    │  🧩 Puzzle Nusantara │
│                     │                     │
│  5 Soal Per Sesi    │  3×3 Grid           │
│  ⏱ 30 Detik/Soal   │  Klik & Tukar       │
│  Skor 0–100         │  3 Gambar/Provinsi  │
│                     │                     │
│  [Pilih Provinsi →] │  [Pilih Provinsi →] │
└─────────────────────┴─────────────────────┘
```

### Province Selector Modal

Setelah memilih tipe game, modal pemilih provinsi muncul:
- Daftar semua 38 provinsi dengan badge level kesulitan
- Search bar real-time untuk filter provinsi
- Klik provinsi → navigate ke game yang dipilih

```javascript
// Fungsi selector
showProvinceSelector('quiz')   // Buka selector untuk quiz
showProvinceSelector('puzzle') // Buka selector untuk puzzle
filterProvinces()              // Filter real-time berdasarkan input search
closeProvinceSelector()        // Tutup modal selector
```

---

### 🎓 Quiz Budaya

**URL:** `#/quiz/{slug-provinsi}`

#### Konfigurasi Quiz

```javascript
var _quiz = {
  slug: 'bali',           // Slug provinsi
  pName: 'Bali',          // Nama tampilan
  questions: [...],       // 5 soal acak (dari provinsi + general)
  current: 0,             // Indeks soal saat ini
  score: 0,               // Skor akumulasi
  answered: false,        // Apakah soal ini sudah dijawab
  timer: null,            // Reference setInterval
  timeLeft: 30            // Sisa waktu (detik)
};
```

#### Alur Quiz

```
renderQuiz(slug)
      │
      ▼
getQuizForProvince(slug)
→ Ambil soal spesifik provinsi + general
→ Shuffle → Ambil 5 soal
      │
      ▼
_renderQuizHeader()   → Progress bar + timer display
_renderQuizQuestion() → Tampilkan soal + 4 opsi
_startQuizTimer()     → Mulai countdown 30 detik
      │
User menjawab (answerQuiz(idx))
      │
      ▼
  Jawaban benar? → Highlight hijau, +20 poin
  Jawaban salah? → Highlight merah, tunjukkan jawaban benar
      │
      ▼
Soal berikutnya atau...
      │
  Soal terakhir? → _renderQuizResult()
```

#### Sistem Penilaian Quiz

| Kondisi | Poin |
|---------|------|
| Jawab benar | +20 poin |
| Jawab salah | +0 poin |
| Timeout (tidak jawab) | +0 poin |
| **Skor Maksimum** | **100 poin** |

#### Tampilan Hasil Quiz

```
┌──────────────────────────────────┐
│  Quiz Selesai! 🎉                │
│                                  │
│  Skor kamu: 80/100               │
│  [Progress Bar Visual]           │
│                                  │
│  ✅ Jawaban Benar: 4             │
│  📍 Provinsi: Bali               │
│                                  │
│  [Main Lagi]  [Coba Puzzle]      │
│  [Kembali ke Games]              │
└──────────────────────────────────┘
```

---

### 🧩 Puzzle Nusantara

**URL:** `#/puzzle/{slug-provinsi}`

#### Cara Kerja Puzzle

1. Pilih satu dari 3 gambar yang tersedia untuk provinsi
2. Gambar dipecah menjadi **9 tile** (grid 3×3)
3. Tile diacak posisinya
4. User klik dua tile untuk **menukarnya**
5. Puzzle selesai jika semua tile di posisi yang benar

```javascript
// State puzzle
var _puzzle = {
  slug: 'bali',
  pName: 'Bali',
  images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
  selectedImg: 'img1.jpg',
  tiles: [0,1,2,3,4,5,6,7,8],  // Current positions (shuffled)
  firstSelected: null,           // Index tile pertama yang diklik
  moves: 0,                      // Jumlah gerakan
  solved: false
};
```

#### Logika Tile

```
Gambar asli 300×300px
        │
        ▼
Dibagi menjadi 9 tile 100×100px
Tile ke-N menampilkan bagian:
  - background-position: -(col*100)px -(row*100)px
  - col = N % 3
  - row = Math.floor(N / 3)

Tile dalam array: [posisi_tile_0, posisi_tile_1, ..., posisi_tile_8]
Jika tiles[i] === i untuk semua i → SOLVED
```

---

## 📋 Modul: Detail Provinsi

**File:** `js/province.js`, data dari `js/provinceDetailData.js`

### Struktur Halaman Provinsi

```
┌──────────────────────────────────────────────────────────┐
│  NAVBAR                                                  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [HERO IMAGE PROVINSI — full width]                      │
│                                                          │
│  NAMA PROVINSI                                           │
│  Tagline / Deskripsi singkat                             │
│  Badge level kesulitan                                   │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  Quick Info Cards:                                       │
│  🏛️ Ibu Kota | 👥 Populasi | 📐 Luas | 💬 Bahasa       │
├──────────────────────────────────────────────────────────┤
│  Budaya & Tradisi — Warisan Budaya                       │
│  [Media Card Grid — 6 item per provinsi]                 │
├──────────────────────────────────────────────────────────┤
│  Wisata — Destinasi Unggulan                             │
│  [Media Card Grid]                                       │
├──────────────────────────────────────────────────────────┤
│  Kuliner — Cita Rasa Khas                                │
│  [Media Card Grid]                                       │
├──────────────────────────────────────────────────────────┤
│  Fakta Unik — Tahukah Kamu?                              │
│  [Fact Cards dengan nomor]                               │
├──────────────────────────────────────────────────────────┤
│  [Klaim Reward] atau [Main Quiz] [Main Puzzle]           │
└──────────────────────────────────────────────────────────┘
```

### Data Provinsi (per entri di `provinceDetailData.js`)

```javascript
{
  slug: 'bali',                     // URL identifier
  name: 'Bali',                     // Nama tampilan
  region: 'Bali & Nusa Tenggara',   // Wilayah
  tagline: 'Pulau Dewata — ...',    // Slogan
  capital: 'Denpasar',              // Ibu kota
  population: '4,3 Juta Jiwa',      // Populasi
  area: '5.780 km²',                // Luas wilayah
  language: 'Bali, Indonesia',       // Bahasa daerah
  heroImage: 'images/provinces/bali-hero.jpg',
  description: '...',               // Deskripsi singkat
  culture: [                        // Array budaya (6 item)
    { image: '...', title: '...', description: '...' },
    ...
  ],
  tourism: [                        // Array wisata
    { image: '...', name: '...', location: '...', description: '...' },
    ...
  ],
  culinary: [                       // Array kuliner
    { image: '...', name: '...', description: '...' },
    ...
  ],
  facts: [                          // Array fakta unik (5-7 item)
    'Fakta 1...',
    'Fakta 2...',
    ...
  ]
}
```

### Claim Reward

Setelah menyelesaikan **Quiz** DAN **Puzzle** di suatu provinsi, tombol "Klaim Reward" muncul:

```javascript
// Cek apakah bisa klaim
canClaimReward(slug)
  → completedGames[slug].includes('quiz') &&
    completedGames[slug].includes('puzzle') &&
    !claimedRewards.includes(slug)

// Eksekusi klaim
claimProvinceRewardUI(slug, keyReward)
  → claimProvinceReward(slug, keyReward)
  → Tampilkan animasi + toast "+N Kunci!"
  → Update tampilan halaman
```

---

## 🏆 Sistem Gamifikasi & Ekonomi Kunci

### Mata Uang: Kunci 🔑

Pengguna mulai dengan **3 kunci**. Kunci digunakan untuk membuka provinsi dan didapat dari reward game.

### Level Kesulitan Provinsi

| Level | Biaya Buka | Reward Selesai | Warna | Provinsi |
|-------|-----------|----------------|-------|----------|
| **Mudah** | 1 🔑 | 2 🔑 | `#40916C` (hijau) | Aceh, Sumut, DKI Jakarta, Jabar, Jatim, Bali, Jogja, Jateng |
| **Sedang** | 2 🔑 | 3 🔑 | `#C9A84C` (emas) | Sumbar, Sumsel, Bengkulu, Lampung, Jambi, Banten, Babel, Kepri, NTB, NTT, Kalbar, Kalsel, Sulut, ... |
| **Susah** | 3 🔑 | 5 🔑 | `#e74c3c` (merah) | Kaltara, Sulteng, Sulbar, Gorontalo, Maluku, Malut, Papua Barat, Papua, ... |

### Siklus Ekonomi

```
Mulai: 3 🔑
    │
    ▼
Buka provinsi Mudah (-1 🔑) → Mainkan Quiz + Puzzle → Klaim (+2 🔑) → NET: +1
Buka provinsi Sedang (-2 🔑) → Mainkan + Klaim (+3 🔑) → NET: +1
Buka provinsi Susah (-3 🔑) → Mainkan + Klaim (+5 🔑) → NET: +2
```

### Data User (localStorage)

```javascript
// Key: 'nusaexplore_user_data'
{
  keys: 3,                        // Jumlah kunci saat ini
  unlockedRegions: ['aceh', ...], // Provinsi yang sudah dibuka
  completedGames: {               // Game yang sudah diselesaikan
    'bali': ['quiz', 'puzzle'],
    'aceh': ['quiz'],
    ...
  },
  claimedRewards: ['bali', ...],  // Provinsi yang sudah diklaim rewardnya
  quizScores: { 'bali': 80, ... },// Skor quiz per provinsi
  puzzleScores: { 'bali': 1, ...},// Status puzzle per provinsi
  totalScore: 0,                  // Total skor akumulasi
  gamesPlayed: 5                  // Total game yang dimainkan
}

// Key: 'nusaexplore_theme'
// Value: 'dark' | 'light'
```

---

## 💾 Manajemen Data & State

**File:** `js/data.js`

### Fungsi Storage

```javascript
getUserData()         // Ambil data user dari localStorage (dengan merge DEFAULT_DATA)
saveUserData(d)       // Simpan data user ke localStorage
getTheme()            // Ambil preferensi tema ('dark'/'light')
saveTheme(t)          // Simpan preferensi tema
```

### Fungsi Game Helpers

```javascript
markGameCompleted(provinceId, gameType)
// Tandai 'quiz' atau 'puzzle' selesai untuk provinsi, increment gamesPlayed

canClaimReward(provinceId)
// Return true jika quiz + puzzle sudah selesai DAN belum diklaim

hasClaimedReward(provinceId)
// Return true jika reward provinsi sudah diklaim

claimProvinceReward(provinceId, keyReward)
// Tambah kunci, tandai sudah diklaim, simpan data

saveQuizScore(regionId, score)
// Simpan skor quiz untuk provinsi tertentu

getQuizForProvince(slug)
// Return array 5 soal acak (campuran soal provinsi + general)

getPuzzleImages(slug)
// Return array 3 URL gambar untuk puzzle provinsi tertentu
```

### Fungsi Difficulty

```javascript
getDifficultyInfo(regionId)
// Return: { unlockCost, keyReward, label, color }
// Berdasarkan konfigurasi di regionDifficulty dan DIFFICULTY_CONFIG
```

---

## 🎨 Tema & Design System

**File:** `css/style.css`

### CSS Custom Properties (Design Tokens)

```css
:root {
  /* Warna emas — aksen utama */
  --gold: #C9A84C;
  --gold-light: #E8C96A;
  --gold-dim: rgba(201,168,76,0.12);
}

[data-theme="dark"] {
  --bg: #0C0C14;        /* Background utama */
  --bg2: #13131E;       /* Background sekunder */
  --bg3: #1C1C2A;       /* Background tersier */
  --bg4: #252535;       /* Background hover */
  --text: #F0EAD6;      /* Teks utama */
  --text2: #A09070;     /* Teks sekunder */
  --text3: #6A5A40;     /* Teks tersier */
  --border: ...;        /* Warna border */
}

[data-theme="light"] {
  --bg: #FDFAF4;
  --bg2: #F5EFE4;
  --bg3: #EDE4D3;
  --bg4: #E2D5C0;
  --text: #1A1408;
  --text2: #6B5A3A;
  --text3: #9A8A6A;
  /* dll */
}
```

### Tipografi

| Font | Penggunaan | Source |
|------|-----------|--------|
| **Playfair Display** | Heading, angka statistik, judul besar | Google Fonts |
| **Plus Jakarta Sans** | Body text, UI elements, tombol | Google Fonts |

### Animasi CSS

| Nama | Deskripsi |
|------|-----------|
| `fadeUp` | Elemen muncul dari bawah ke atas |
| `navSlideIn` | Navbar slide masuk dari atas |
| `slideInRight` | Slide masuk dari kanan |
| `slideOutRight` | Slide keluar ke kanan |
| `pulseDot` | Titik animasi pulse |
| `pillAppear` | Badge/pill muncul dengan scale |
| `marquee` | Teks berjalan horizontal (-50%) |
| `unlockPop` | Popup muncul dengan bounce |
| `popIn` | Elemen muncul dengan spring |
| `spin` | Rotasi 360° (loading spinner) |
| `unlockBurst` | Efek scale saat provinsi dibuka |
| `unlockRipple` | Efek ripple SVG circular |
| `unlockShine` | Efek kilatan cahaya |

### Scroll Reveal

Elemen dengan class `.reveal` dianimasikan saat masuk viewport:

```javascript
// Di app.js, dipanggil setelah setiap setPage()
function initReveal() {
  var items = document.querySelectorAll('.reveal');
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.07 });
  items.forEach(function(el) { obs.observe(el); });
}
```

### Toast Notification

```javascript
showToast(message, color)
// Muncul di kanan bawah layar selama 3.5 detik
// color default: '#2D6A4F' (hijau)
// Digunakan untuk: konfirmasi unlock, klaim reward, game selesai
```

---

## 📊 Data & Konten

### `regions.js` — Data SVG Peta (108KB)
- 38 object `{ id, name, d }` 
- `id`: slug provinsi (misal `'bali'`, `'dki-jakarta'`)
- `name`: Nama tampilan (misal `'Bali'`, `'DKI Jakarta'`)
- `d`: Path data SVG untuk shape provinsi di peta

### `quizData.js` — Bank Soal Quiz (31KB)
- 160+ soal tipe multiple choice
- Setiap soal: `{ province, q, opts: [4 pilihan], ans: index }`
- Provinsi `'general'` untuk soal umum (bisa muncul di semua provinsi)
- Mencakup: sejarah, budaya, kuliner, wisata, geografi tiap provinsi

### `provinceDetailData.js` — Data Provinsi Lengkap (105KB)
- 34 provinsi dengan data lengkap
- Per provinsi: kultur (6 item), wisata, kuliner, fakta
- Data statistik: ibu kota, populasi, luas, bahasa daerah

### `data.js` — Konfigurasi & Data Pendukung
- `culturesData[]`: 5 budaya unggulan untuk beranda
- `PROVINCE_PUZZLES{}`: Mapping slug → array 3 gambar puzzle
- `MARQUEE_ITEMS[]`: 12 teks untuk marquee animasi
- `regionDifficulty{}`: Mapping slug → level ('mudah'/'sedang'/'susah')
- `DIFFICULTY_CONFIG{}`: Konfigurasi biaya & reward per level

---

## 🚀 Deploy ke Vercel

### Konfigurasi `vercel.json`

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/js/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/css/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/images/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

**Penjelasan konfigurasi:**
- **Rewrites**: Semua URL diarahkan ke `index.html` (penting untuk SPA routing)
- **Cache-Control**: JS, CSS, dan gambar di-cache browser selama 1 tahun (`immutable` = tidak pernah berubah jika nama file sama)

### Langkah Deploy ke Vercel

```bash
# Metode 1: Via Vercel CLI
npm install -g vercel
vercel login
cd nusaexplore-vanilla-main
vercel --prod

# Metode 2: Via GitHub
# 1. Push ke GitHub repository
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/nusaexplore.git
git push -u origin main

# 2. Buka vercel.com
# 3. Import repository dari GitHub
# 4. Klik Deploy (tidak perlu konfigurasi tambahan)
```

---

## 🌐 Deploy ke Platform Lain

### GitHub Pages

```bash
# Tambahkan file 404.html (sama dengan index.html) untuk handle routing
cp index.html 404.html

# Push ke branch gh-pages
git subtree push --prefix . origin gh-pages

# Atau via GitHub Actions (.github/workflows/deploy.yml):
```

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### Netlify

```bash
# Buat file _redirects di root:
echo "/* /index.html 200" > _redirects

# Deploy via Netlify CLI:
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir .
```

### Apache Server

Tambahkan `.htaccess` di root:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

### Nginx

```nginx
server {
    listen 80;
    root /var/www/nusaexplore;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 🔧 Kustomisasi & Pengembangan Lanjutan

### Menambah Provinsi Baru

1. Tambah SVG path di `regions.js`:
```javascript
{ id: 'provinsi-baru', name: 'Provinsi Baru', d: 'M... Z' }
```

2. Tambah data detail di `provinceDetailData.js`:
```javascript
{
  slug: 'provinsi-baru',
  name: 'Provinsi Baru',
  capital: '...', population: '...', area: '...', language: '...',
  heroImage: 'images/provinces/baru-hero.jpg',
  culture: [...], tourism: [...], culinary: [...], facts: [...]
}
```

3. Tambah soal quiz di `quizData.js`:
```javascript
{ province: 'provinsi-baru', q: 'Pertanyaan?', opts: ['A','B','C','D'], ans: 0 }
```

4. Tambah puzzle images di `data.js`:
```javascript
'provinsi-baru': ['images/provinces/baru-hero.jpg', ...]
```

5. Set difficulty di `data.js`:
```javascript
'provinsi-baru': 'mudah' // atau 'sedang' / 'susah'
```

### Mengubah Warna Tema

Edit variabel CSS di `style.css`:
```css
:root {
  --gold: #your-accent-color;  /* Ganti warna aksen */
}
[data-theme="dark"] {
  --bg: #your-dark-bg;         /* Ganti background gelap */
}
```

### Menambah Tipe Game Baru

1. Tambah route di `app.js`:
```javascript
if (path.startsWith('/newgame/')) { renderNewGame(path.replace('/newgame/','')); return; }
```

2. Buat fungsi render di file baru `js/newgame.js`
3. Tambah `<script>` di `index.html`
4. Tambah pilihan di `games.js`

### Mengubah Jumlah Kunci Awal

```javascript
// Di data.js
var DEFAULT_DATA = {
  keys: 5,  // Ganti dari 3 ke jumlah yang diinginkan
  ...
};
```

### Mengubah Durasi Timer Quiz

```javascript
// Di games.js, dalam renderQuiz()
_quiz.timeLeft = 60;  // Ganti dari 30 ke 60 detik

// Dan di _startQuizTimer()
_quiz.timeLeft = 60;  // Sesuaikan
```

---

## 📚 Referensi Fungsi Lengkap

### `app.js`
| Fungsi | Parameter | Deskripsi |
|--------|-----------|-----------|
| `navigate(path)` | `string` | Navigasi ke path hash |
| `render(path)` | `string` | Dispatch render berdasarkan path |
| `setPage(html)` | `string` | Inject HTML ke #app dengan animasi |
| `navbarHTML(active)` | `string` | Generate HTML navbar |
| `initNavbar()` | — | Init hamburger menu & scroll effect |
| `initReveal()` | — | Init IntersectionObserver untuk .reveal |
| `footerHTML()` | — | Generate HTML footer |
| `showToast(msg, color)` | `string, string` | Tampilkan notifikasi toast |
| `applyTheme(t)` | `'dark'|'light'` | Terapkan tema dan simpan |
| `toggleTheme()` | — | Toggle dark/light mode |

### `data.js`
| Fungsi | Parameter | Return | Deskripsi |
|--------|-----------|--------|-----------|
| `getUserData()` | — | `Object` | Ambil data user dari localStorage |
| `saveUserData(d)` | `Object` | `boolean` | Simpan data user |
| `getTheme()` | — | `string` | Ambil preferensi tema |
| `saveTheme(t)` | `string` | — | Simpan preferensi tema |
| `markGameCompleted(pId, gType)` | `string, string` | — | Tandai game selesai |
| `canClaimReward(pId)` | `string` | `boolean` | Cek bisa klaim reward |
| `hasClaimedReward(pId)` | `string` | `boolean` | Cek sudah klaim reward |
| `claimProvinceReward(pId, keyReward)` | `string, number` | `boolean` | Eksekusi klaim reward |
| `saveQuizScore(rId, score)` | `string, number` | — | Simpan skor quiz |
| `getQuizForProvince(slug)` | `string` | `Array` | Ambil 5 soal quiz acak |
| `getPuzzleImages(slug)` | `string` | `Array` | Ambil 3 URL gambar puzzle |
| `getDifficultyInfo(rId)` | `string` | `Object` | Ambil info kesulitan provinsi |

### `map.js`
| Fungsi | Parameter | Deskripsi |
|--------|-----------|-----------|
| `renderMap()` | — | Render halaman peta |
| `initMapEvents()` | — | Init event listener peta SVG |
| `showUnlockPopup(id, name)` | `string, string` | Tampilkan popup unlock provinsi |
| `confirmUnlock(id, name)` | `string, string` | Eksekusi unlock provinsi |
| `showRegionPopup(id, name)` | `string, string` | Tampilkan popup info provinsi |
| `_playUnlockAnim(id, onDone)` | `string, Function` | Mainkan animasi unlock |
| `toggleHowToPlay()` | — | Toggle panel cara bermain |
| `isProvinceUnlocked(id)` | `string` | `boolean` — cek status unlock |
| `unlockProvince(id)` | `string` | `boolean` — eksekusi unlock |

### `games.js`
| Fungsi | Parameter | Deskripsi |
|--------|-----------|-----------|
| `renderGames()` | — | Render halaman pilihan game |
| `showProvinceSelector(gType)` | `'quiz'|'puzzle'` | Buka modal selector provinsi |
| `filterProvinces()` | — | Filter real-time list provinsi |
| `renderQuiz(slug)` | `string` | Render halaman quiz |
| `answerQuiz(idx)` | `number` | Proses jawaban quiz (-1 = timeout) |
| `renderPuzzle(slug)` | `string` | Render halaman puzzle |
| `clickPuzzleTile(idx)` | `number` | Proses klik tile puzzle |

---

## ❓ FAQ & Troubleshooting

### ❌ Gambar tidak muncul

**Penyebab:** Folder `images/` belum ditambahkan.

**Solusi:** Tambahkan folder `images/` dengan struktur seperti di bagian [Struktur Folder Gambar](#-struktur-folder-gambar-wajib). Aplikasi tetap berfungsi tanpa gambar (ada fallback gradient).

---

### ❌ Routing tidak bekerja (`/map` redirect ke 404)

**Penyebab:** Server tidak dikonfigurasi untuk SPA routing.

**Solusi:** Pastikan server mengarahkan semua request ke `index.html`. Lihat bagian konfigurasi [Nginx](#nginx) / [Apache](#apache-server) / [Netlify](#netlify).

---

### ❌ Progress/kunci hilang setelah buka browser baru

**Penyebab:** Data tersimpan di `localStorage` yang bisa di-clear.

**Solusi:** Ini behavior yang diharapkan — localStorage tidak permanen. Untuk persist, pertimbangkan implementasi backend atau IndexedDB.

---

### ❌ Peta tidak bisa diklik di mobile

**Penyebab:** Touch event tidak terhandle dengan baik pada beberapa browser.

**Solusi:** Pastikan menggunakan browser terkini. Tambahkan `touch-action: manipulation` pada element SVG jika diperlukan.

---

### ❌ Font tidak muncul (offline)

**Penyebab:** Google Fonts memerlukan koneksi internet. Aplikasi tidak menyertakan font lokal.

**Solusi:** Download font dan host secara lokal:
```html
<!-- Ganti di index.html dengan: -->
<link rel="preload" href="fonts/playfair.woff2" as="font" crossorigin>
```

---

### ❌ Aplikasi lambat saat pertama load

**Penyebab:** File `regions.js` (108KB) dan `provinceDetailData.js` (105KB) cukup besar.

**Solusi:** Ini adalah trade-off dari zero-dependency approach. Untuk produksi, pertimbangkan:
- Menambahkan loading spinner (sudah ada di map.js saat navigasi ke provinsi)
- Lazy load data provinsi via `fetch()` jika dipindah ke JSON

---

### ❌ Soal quiz selalu sama

**Penyebab:** Mungkin terjadi jika slug provinsi tidak cocok dengan `quizData.js`.

**Solusi:** Pastikan slug yang dipass ke `renderQuiz()` cocok dengan `province` di `quizData.js`.

---

## 🤝 Kontribusi

Kontribusi sangat disambut! Berikut cara berkontribusi:

### 1. Fork & Clone

```bash
git clone https://github.com/username/nusaexplore-vanilla.git
cd nusaexplore-vanilla-main
```

### 2. Buat Branch

```bash
git checkout -b feature/tambah-provinsi-papua-selatan
# atau
git checkout -b fix/puzzle-mobile-touch
```

### 3. Commit dengan Pesan Deskriptif

```bash
git commit -m "feat: tambah data provinsi Papua Selatan dengan 5 soal quiz"
git commit -m "fix: perbaiki touch event puzzle di iOS Safari"
git commit -m "docs: update README dengan panduan deploy Nginx"
```

### 4. Push & Pull Request

```bash
git push origin feature/tambah-provinsi-papua-selatan
# Buka Pull Request di GitHub
```

### Area Kontribusi yang Dibutuhkan

- 📸 **Gambar**: Foto budaya, wisata, kuliner berkualitas tinggi (CC0/bebas royalti)
- ❓ **Soal Quiz**: Tambah soal untuk provinsi yang kurang (lihat `quizData.js`)
- 📝 **Data Provinsi**: Lengkapi data provinsi di `provinceDetailData.js`
- 🐛 **Bug Fix**: Cek Issues di GitHub
- 🌐 **Aksesibilitas**: Tambahkan ARIA labels, keyboard navigation
- 📱 **Mobile UX**: Perbaikan untuk perangkat mobile

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License** — bebas digunakan, dimodifikasi, dan didistribusikan untuk keperluan apapun.

Data budaya bersumber dari informasi publik dan domain publik. Konten edukasi dimaksudkan untuk mempromosikan pengetahuan budaya Indonesia.

---

<div align="center">

Dibuat dengan ❤️ untuk Indonesia

**NusaExplore** — *Bangga Budaya Indonesia*

© 2025 NusaExplore · [Tentang](#) · [Kontak](#) · [Kebijakan](#)

</div>