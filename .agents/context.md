# Workspace Context: Portofolio-Website

Dokumen ini berfungsi sebagai panduan context kerja untuk melacak struktur repositori, konfigurasi, status, serta detail komponen portofolio.

## 🛠️ Aturan Repositori (`AGENTS.md`)
1. **Co-author Commit**: Selalu tambahkan `Co-authored-by: Antigravity <antigravity-bot@users.noreply.github.com>` di akhir deskripsi commit git.
2. **Anti Data Dummy**: Selalu gunakan data nyata (API, Supabase, Client Telemetry) dibanding hardcoded.
3. **Research First**: Selalu lakukan pencarian web sebelum menulis solusi krusial.

## 📂 Struktur Utama
- `src/app/`
  - `page.jsx` — Halaman utama utama portofolio. Merender layout, Navbar, Hero, Projects, Dashboard, Journey, Guestbook, Contact, dan Footer.
  - `layout.jsx` — Root layout Server Component. Di-wrap oleh `ThemeWrapper`.
  - `globals.css` — Berisi variable tema utama `:root` (DEV) dan `[data-theme="pro"]` (PRO).
- `src/context/`
  - `ThemeContext.jsx` — Menyediakan provider `ThemeProvider` untuk state `theme` ('dev' | 'pro') dan sinkronisasi element class `dark`.
- `src/components/`
  - `ui/`
    - `ThemeTransitionOverlay.jsx` — Layar transisi asimetris (Terminal compile vs Elegant wipe).
    - `ThemeWrapper.jsx` — Client component wrapper.
  - `layout/`
    - `Navbar.jsx` — Navigasi bar adaptif dengan tombol toggle mode.
    - `Footer/Footer.jsx` — Footer minimalis menggunakan CSS variables.
  - `sections/`
    - `Hero.jsx` — Headline + introduction pitch.
    - `ProjectsSection.jsx` — Galeri proyek (featured systems).
    - `Dashboard.jsx` — Bento layout berisi visualizer telemetry, Spotify mini-player, & system stats.
    - `JourneySection.jsx` — Visualizer riwayat karir/edukasi.
    - `GuestbookSection.jsx` — Form tanda tangan buku tamu.
    - `ContactSection.jsx` — Form kontak.

## 🎨 Spesifikasi Dua Tema

### 💻 DEV Mode (Obsidian & Cyan)
- **Background**: `#0B0F17` (obsidian)
- **Aesthetic**: Geeky, terminal, Fira Code font, brackets `[ ]`, index prefix (`01.`), prompt commands, glitch effects.

### 👔 PROFESSIONAL Mode (Slate & Blue)
- **Background**: `#F8FAFC` (off-white)
- **Aesthetic**: Clean, corporate, Plus Jakarta Sans, human-readable labels, no terminal prompts, no index bracket prefixes, expanded layouts, minimal and warm colors.
