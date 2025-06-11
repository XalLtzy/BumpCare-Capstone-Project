
# BumpCare Web Application

BumpCare adalah aplikasi web yang dikembangkan untuk membantu pengguna, khususnya ibu hamil, dalam memantau status gizi, risiko kehamilan, serta mengelola data terkait kesehatan dan nutrisi. Aplikasi ini terdiri dari frontend berbasis React.js dan backend menggunakan Node.js dengan framework Hapi, serta mengikuti arsitektur MVP (Model-View-Presenter).

## ✨ Fitur Utama

### Front-End
- Responsive UI untuk semua ukuran layar (mobile-first design)
- Autentikasi (Login/Register) dengan validasi token
- Kalkulator status gizi & risiko kehamilan
- Halaman dashboard, profil pengguna, dan catatan gizi
- Animasi interaktif dengan Framer Motion
- Notifikasi real-time dengan react-hot-toast
- Navigasi halaman dengan react-router-dom
- Penggunaan MVP (Model-View-Presenter) untuk modularitas kode

### Back-End
- RESTful API menggunakan Hapi.js
- Struktur modular: controller, routes, middleware, validations
- Validasi input dengan Joi
- Otentikasi JWT & enkripsi password dengan bcrypt
- Penyimpanan data menggunakan PostgreSQL
- Middleware otorisasi untuk rute yang dilindungi

## 🧱 Arsitektur Proyek

### Front-End
Struktur proyek frontend menggunakan pendekatan arsitektur MVP (Model-View-Presenter) dengan pembagian folder sebagai berikut:

```
bumpcare-frontend/
├── src/
│   ├── models/         # Berisi logika pengambilan data dari API
│   ├── pages/          # Komponen halaman (Home, Login, Register, Calculator, dsb)
│   ├── presenters/     # Menghubungkan data dengan tampilan (MVP pattern)
│   ├── components/     # (Opsional) Komponen UI reusable
│   └── App.jsx         # Konfigurasi routing utama
├── public/
├── index.html
└── vite.config.js
```

### Back-End
Struktur backend menggunakan pendekatan modular dengan Hapi.js:

```
bumpcare-backend/
├── src/
│   ├── controllers/    # Fungsi utama: authController.js, pregnancyController.js, dsb.
│   ├── routes/         # Rute REST API: authRoutes.js, userRoutes.js, dsb.
│   ├── models/         # Koneksi dan fungsi akses PostgreSQL
│   ├── validations/    # Validasi schema menggunakan Joi
│   ├── middleware/     # Middleware: autentikasi dan error handler
│   └── index.js        # Entry point server dengan konfigurasi Hapi.js
├── .env
├── .env.example
└── package.json
```

## ⚙️ Instalasi

### Front-End
```bash
cd bumpcare-frontend
npm install
npm run dev
```

### Back-End
```bash
cd bumpcare-backend
npm install
node src/index.js
```

## 📁 Environment Variables

Pastikan kamu membuat file `.env` berdasarkan `.env.example` dengan konfigurasi seperti berikut:

```
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name
DB_SSL=true_or_false
JWT_SECRET=your_jwt_secret_key
```

## 📄 Lisensi

Proyek ini dibuat untuk tujuan edukasi dan pengembangan dalam konteks Capstone Project Coding Camp Oleh Tim Kami.