import { Link } from 'react-router-dom';
import heroImage from '../assets/images/Bumil.png';

export default function Home() {
  return (
    <div className="font-sans text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center px-6 py-5 border-b shadow-sm">
        <h1 className="text-2xl font-bold">BumpCare</h1>
        <nav className="flex items-center space-x-8 text-lg font-medium">
          <a href="#" className="hover:text-purple-600 transition">Beranda</a>
          <a href="#fitur" className="hover:text-purple-600 transition">Fitur</a>
          <a href="#tentang" className="hover:text-purple-600 transition">Tentang</a>
          <a href="#kontak" className="hover:text-purple-600 transition">Kontak</a>
          <Link
            to="/login"
            className="px-8 py-3 bg-black text-white text-lg font-semibold rounded-lg shadow hover:bg-gray-800 transition"
          >
            Masuk
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pl-28 pr-6 py-16">
        <div className="mb-10 text-left">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Bumpcare</h2>
          <p className="text-xl text-gray-600 mb-10">
            A Smart Pregnancy Companion for Maternal Well-being
          </p>
          <Link
            to="/register"
            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 inline-block text-lg"
          >
            Mulai
          </Link>
        </div>
        <div className="mt-10">
          <img
            src={heroImage}
            alt="Ibu hamil sehat"
            className="rounded-lg shadow-lg w-full max-w-2xl"
          />
        </div>
      </section>

      {/* Fitur */}
      <section id="fitur" className="pl-28 pr-6 py-16 max-w-7xl mx-auto scroll-mt-24">
        <h3 className="text-4xl font-bold mb-12">Fitur Unggulan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Hitung Kebutuhan Gizi',
              desc: 'Ketahui kalori & nutrisi harian berdasarkan trimester kehamilan',
              icon: '🍔',
            },
            {
              title: 'Rekomendasi Makanan',
              desc: 'Daftar makanan sehat sesuai kebutuhan Anda',
              icon: '🥗',
            },
            {
              title: 'Pantau Perkembangan',
              desc: 'Lacak perubahan BMI dan berat badan secara berkala',
              icon: '🫶',
            },
          ].map((fitur, idx) => (
            <div
              key={idx}
              className="border p-8 rounded-2xl shadow hover:shadow-lg transition text-left bg-white"
            >
              <div className="text-5xl mb-4">{fitur.icon}</div>
              <h4 className="text-xl font-semibold mb-2">{fitur.title}</h4>
              <p className="text-base text-gray-600">{fitur.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tentang Kami */}
      <section id="tentang" className="pl-28 pr-6 py-16 max-w-7xl mx-auto scroll-mt-24">
        <div className="max-w-3xl">
          <h3 className="text-4xl font-bold mb-6">Tentang Kami</h3>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            BumpCare adalah aplikasi pendamping kehamilan berbasis web yang
            dikembangkan untuk mendukung kesehatan ibu dan bayi melalui pemantauan
            gizi personal serta fitur-fitur cerdas yang menyesuaikan kebutuhan tiap
            trimester.
          </p>
          <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition rounded-lg text-lg font-medium">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </section>

      {/* Testimoni */}
      <section className="pl-28 pr-6 py-16 max-w-7xl mx-auto scroll-mt-24">
        <h3 className="text-4xl font-bold mb-12">Testimoni</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="bg-white border rounded-2xl p-6 shadow hover:shadow-md transition">
              <p className="italic text-lg mb-4">"A fantastic bit of feedback"</p>
              <div className="text-gray-600 text-sm">Nama • Deskripsi</div>
            </div>
          ))}
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="pl-28 pr-6 py-16 max-w-7xl mx-auto scroll-mt-24">
        <h3 className="text-4xl font-bold mb-12">Kontak</h3>
        <ul className="space-y-2 text-base text-gray-600">
          <li>📷 Instagram</li>
          <li>📺 Youtube</li>
          <li>💼 LinkedIn</li>
          <li>📘 Facebook</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-10 border-t pt-6 text-sm text-gray-600 bg-gray-50">
        <div className="mt-4 text-xs text-gray-500">© 2025 BumpCare. All rights reserved.</div>
      </footer>
    </div>
  );
}
