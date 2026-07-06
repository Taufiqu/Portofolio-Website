# Taufiqu's Systems Architect Portfolio

Website portofolio pribadi bertema **"High-Performance Systems Architect"** yang interaktif, minimalis, dan berkinerja tinggi. Projek ini dimigrasikan dari React+Vite ke **Next.js 15 (App Router)** & **Tailwind CSS**.

---

## 🚀 Fitur Unggulan

### 1. Retro Mainframe Project Showcase
Showcase proyek anti-mainstream dengan membagi visual halaman menjadi dua panel:
* **Directory Tree Panel:** Pengguna menelusuri proyek melalui virtual file manager (`.conf` files) khas terminal Linux.
* **CRT System Monitor:** Tampilan monitor melengkung dengan efek pemindaian kaca (*scanline*), kedipan lampu, dan simulasi proses *compile/booting logs* real-time (500ms) saat berganti proyek.

### 2. Tech Sandbox Bento Grid
Playground interaktif yang memamerkan keahlian dengan cara yang unik:
* **CLI Console Terminal:** Emulator shell interaktif yang membaca input perintah tamu seperti `help`, `about`, `skills`, `logs`, dan `contact`.
* **Engine Resource Monitor:** Task manager visual yang mensimulasikan penggunaan resource (CPU/RAM load) dari modul stack backend (Laravel), frontend (React/Next), dan database.
* **Spotify Coding Soundtrack:** Pemutar audio mini yang terintegrasi untuk memainkan cuplikan musik pengiring coding (Reality Club - "Am I Bothering You?").
* **Uptime & Latency Telemetry:** Indikator latensi dinamis, durasi waktu aktif, dan jadwal jam kerja.

### 3. Vertical SPA Flow
Navigasi vertikal terstruktur:
1. **Hero Fold:** Judul nama besar **"TAUFIQU"** dengan efek glow border, tagline monospace, dan tombol boot sistem.
2. **Featured Systems:** Retro Mainframe Showcase.
3. **Sandbox Playground:** Bento Grid Console.
4. **Logs Terminal:** Riwayat log karir (timeline) di dalam Bento Grid.
5. **Contact CLI Form:** Formulir kirim email langsung menggunakan **EmailJS**.

---

## 🛠️ Cara Menjalankan Projek Secara Lokal

### Prasyarat
Pastikan Node.js (v18+) sudah terinstal di komputer Anda.

### 1. Instal Dependensi
```bash
npm install
```

### 2. Jalankan Server Dev
```bash
npm run dev
```
Buka browser Anda di `http://localhost:3000`.

### 3. Build untuk Produksi
```bash
npm run build
npm run start
```
Next.js akan mengompilasi rute utama menjadi halaman statis (`○ /`) yang super cepat (17 kB, First Load JS: 119 kB).
