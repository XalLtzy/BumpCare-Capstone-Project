import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../assets/images/Bumil.png';

export default function Home() {
  return (
    <div className="font-sans text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center px-6 py-5 border-b shadow-sm">
        <motion.h1 
          className="text-2xl font-bold" 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          BumpCare
        </motion.h1>
        <nav className="flex items-center space-x-8 text-lg font-medium">
          <motion.a 
            href="#" 
            className="hover:text-purple-600 transition"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Beranda
          </motion.a>
          <motion.a 
            href="#fitur" 
            className="hover:text-purple-600 transition"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Fitur
          </motion.a>
          <motion.a 
            href="#tentang" 
            className="hover:text-purple-600 transition"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Tentang
          </motion.a>
          <motion.a 
            href="#kontak" 
            className="hover:text-purple-600 transition"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Kontak
          </motion.a>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link
              to="/login"
              className="px-8 py-3 bg-black text-white text-lg font-semibold rounded-lg shadow hover:bg-gray-800 transition"
            >
              Masuk
            </Link>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pl-28 pr-6 py-16">
        <motion.div 
          className="mb-10 text-left"
          initial={{ opacity: 0, x: -100 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }}
        >
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
        </motion.div>
        <motion.div 
          className="mt-10"
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1 }}
        >
          <img
            src={heroImage}
            alt="Ibu hamil sehat"
            className="rounded-lg shadow-lg w-full max-w-2xl"
          />
        </motion.div>
      </section>

      {/* Fitur */}
      <section id="fitur" className="pl-28 pr-6 py-16 max-w-7xl mx-auto scroll-mt-24">
        <motion.h3
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        >
          Fitur Unggulan
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{ title: 'Hitung Kebutuhan Gizi', desc: 'Ketahui kalori & nutrisi harian berdasarkan trimester kehamilan', icon: '🍔' },
            { title: 'Rekomendasi Makanan', desc: 'Daftar makanan sehat sesuai kebutuhan Anda', icon: '🥗' },
            { title: 'Pantau Perkembangan', desc: 'Lacak perubahan BMI dan berat badan secara berkala', icon: '🫶' }]
            .map((fitur, idx) => (
              <motion.div
                key={idx}
                className="border p-8 rounded-2xl shadow hover:shadow-lg transition text-left bg-white"
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.2 * (idx + 1) }}
              >
                <div className="text-5xl mb-4">{fitur.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{fitur.title}</h4>
                <p className="text-base text-gray-600">{fitur.desc}</p>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Tentang Kami */}
      <section id="tentang" className="pl-28 pr-6 py-16 max-w-7xl mx-auto scroll-mt-24">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, x: 100 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }}
        >
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
        </motion.div>
      </section>

      {/* Testimoni */}
      <section className="pl-28 pr-6 py-16 max-w-7xl mx-auto scroll-mt-24">
        <motion.h3
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        >
          Testimoni
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, i) => (
            <motion.div 
              key={i}
              className="bg-white border rounded-2xl p-6 shadow hover:shadow-md transition"
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 * (i + 1) }}
            >
              <p className="italic text-lg mb-4">"A fantastic bit of feedback"</p>
              <div className="text-gray-600 text-sm">Nama • Deskripsi</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="pl-28 pr-6 py-16 max-w-7xl mx-auto scroll-mt-24">
        <motion.h3
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        >
          Kontak
        </motion.h3>
        <ul className="space-y-2 text-base text-gray-600">
          <li>📷 Instagram</li>
          <li>📺 Youtube</li>
          <li>💼 LinkedIn</li>
          <li>📘 Facebook</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-10 border-t pt-6 bg-gray-50">
       <div className="w-full text-center text-sm text-gray-700 mt-4">
         © 2025 <span className="font-semibold">BumpCare</span>. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
