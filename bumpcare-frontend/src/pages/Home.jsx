import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../assets/images/Bumil.png';

const pageVariants = {
  initial: { opacity: 0, y: 40 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -40 },
};

const pageTransition = {
  duration: 0.6,
  ease: 'easeInOut',
};

export default function Home() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="font-sans text-gray-900"
    >
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#FFDCDC] flex justify-between items-center px-6 py-5 border-b shadow-sm">
        <motion.h1 
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          BumpCare
        </motion.h1>
        <nav className="flex items-center space-x-6 text-lg font-medium">
          {['Beranda', 'Fitur', 'Tentang', 'Kontak'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-purple-600 transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeInOut' }}
            >
              {item}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
          >
            <Link
              to="/login"
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Masuk
            </Link>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="beranda" className="pl-28 pr-6 py-16 bg-[#FFF2EB] min-h-screen flex items-center">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Bumpcare</h2>
            <p className="text-xl text-gray-600 mb-6">
              A Smart Pregnancy Companion for Maternal Well-being
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 text-lg transition"
            >
              Mulai
            </Link>
          </motion.div>
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <img
              src={heroImage}
              alt="Ibu hamil sehat"
              className="rounded-xl shadow-xl w-full max-w-md mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Fitur */}
      <motion.section
        id="fitur"
        className="bg-[#FFC0CB] py-20 min-h-screen flex flex-col justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold mb-12 text-center">Fitur Unggulan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Hitung Kebutuhan Gizi', desc: 'Kalori & nutrisi harian berdasarkan trimester', icon: '🍔' },
              { title: 'Rekomendasi Makanan', desc: 'Daftar makanan sehat sesuai kebutuhan', icon: '🥗' },
              { title: 'Pantau Perkembangan', desc: 'Lacak perubahan BMI & berat badan', icon: '🫶' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-left"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, delay: i * 0.2, ease: 'easeInOut' }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Tentang Kami */}
      <motion.section
        id="tentang"
        className="bg-[#FFF2EB] py-20 min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-6">Tentang Kami</h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              BumpCare adalah aplikasi pendamping kehamilan berbasis web untuk mendukung kesehatan ibu dan bayi
              melalui pemantauan gizi personal serta fitur-fitur pintar yang menyesuaikan kebutuhan tiap trimester.
            </p>
            <button className="px-8 py-3 border border-black hover:bg-black hover:text-white rounded-lg text-lg transition">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </motion.section>

      {/* Testimoni */}
      <motion.section
        className="bg-[#FFC0CB] py-20 min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold mb-12 text-center">Testimoni</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border rounded-xl p-6 shadow hover:shadow-md transition"
              >
                <p className="italic text-lg mb-4">"A fantastic bit of feedback"</p>
                <div className="text-gray-600 text-sm">Nama • Deskripsi</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Kontak */}
      <motion.section
        id="kontak"
        className="bg-[#FFF2EB] py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 text-left">
          <h3 className="text-4xl font-bold mb-6">Kontak</h3>
          <ul className="space-y-2 text-lg text-gray-700">
            <li>📷 Instagram</li>
            <li>📺 Youtube</li>
            <li>💼 LinkedIn</li>
            <li>📘 Facebook</li>
          </ul>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#FFDCDC] py-6 border-t">
        <div className="container mx-auto px-6 text-center text-sm text-gray-700">
          © 2025 <span className="font-semibold">BumpCare</span>. All rights reserved.
        </div>
      </footer>
    </motion.div>
  );
}
