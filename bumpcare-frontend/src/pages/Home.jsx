import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X } from 'lucide-react';

import heroImage from '../assets/images/Bumil.png';
import logo from '../assets/images/Logo.png';
import tentangLogo from '../assets/images/Logo2.png';

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
  const [isOpen, setIsOpen] = useState(false);

  const headerOffsetDesktop = -20;
  const headerOffsetMobile = -250;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const socialLinks = {
    whatsapp: 'https://wa.me/6289513149721', 
    instagram: 'https://instagram.com/bumpcare',
    youtube: 'https://youtube.com/bumpcare',
    facebook: 'https://facebook.com/bumpcare',
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="font-sans text-gray-900 scroll-smooth"
    >
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#FFC0CB] px-6 py-5 border-b shadow-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <img src={logo} alt="Logo BumpCare" className="w-10 h-10 rounded-full object-cover" />
            <h1 className="text-2xl font-bold">BumpCare</h1>
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6 text-lg font-medium">
            {["beranda", "fitur", "tentang", "kontak"].map((id, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeInOut' }}
              >
                <ScrollLink
                  to={id}
                  smooth={true}
                  duration={600}
                  offset={isMobile ? headerOffsetMobile : headerOffsetDesktop}
                  className="cursor-pointer hover:text-[#AC1754] transition"
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </ScrollLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
            >
              <Link to="/login" className="px-6 py-2 bg-black text-[#FFC0CB] rounded-md hover:bg-gray-800 transition">
                Masuk
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            {isOpen ? (
              <X onClick={() => setIsOpen(false)} className="w-7 h-7 cursor-pointer" />
            ) : (
              <Menu onClick={() => setIsOpen(true)} className="w-7 h-7 cursor-pointer" />
            )}
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-3 text-lg font-medium">
            {["beranda", "fitur", "tentang", "kontak"].map((id) => (
              <ScrollLink
                key={id}
                to={id}
                smooth={true}
                duration={600}
                offset={isMobile ? headerOffsetMobile : headerOffsetDesktop}
                className="block cursor-pointer hover:text-purple-600 transition"
                onClick={() => setIsOpen(false)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </ScrollLink>
            ))}
            <Link
              to="/login"
              className="inline-block w-full text-center px-6 py-2 bg-black text-[#FFC0CB] rounded-md hover:bg-gray-800 transition"
              onClick={() => setIsOpen(false)}
            >
              Masuk
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="beranda"
        className="pl-6 md:pl-28 pr-6 py-16 bg-[#FFF2EB] min-h-screen flex items-center justify-center"
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10 justify-center">
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
            <img src={heroImage} alt="Ibu hamil sehat" className="rounded-xl shadow-xl w-full max-w-md mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Fitur Section */}
      <motion.section
        id="fitur"
        className="bg-[#FFDCDC] py-20 min-h-screen flex flex-col justify-center"
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
                className="bg-[#FFF2EB] p-6 rounded-xl shadow-md hover:shadow-xl transition text-left"
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

      {/* Tentang Kami Section */}
      <motion.section
        id="tentang"
        className="bg-[#FFF2EB] py-20 min-h-screen flex items-center justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
>
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center md:items-start gap-12 max-w-5xl">
        {/* Left Image */}
        <div className="md:w-1/2 flex justify-center md:justify-start">
           <img
              src={tentangLogo} 
              alt="Logo Bumpcare"
              className="w-64 md:w-full max-w-sm rounded-lg shadow-lg"
           />
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h3 className="text-5xl font-extrabold text mb-6 drop-shadow-md">Apa itu Bumpcare?</h3>
            <p className="text-xl text-gray-800 mb-8 leading-relaxed tracking-wide">
               BumpCare adalah aplikasi pendamping kehamilan berbasis web yang dirancang khusus untuk mendukung kesehatan ibu dan bayi.  
               Dengan pemantauan gizi personal dan fitur-fitur pintar yang disesuaikan dengan kebutuhan tiap trimester, kami membantu perjalanan kehamilan Anda menjadi lebih aman dan nyaman.
            </p>
        </div>
       </div>
      </motion.section>

      {/* Testimoni Section */}
      <motion.section
        className="bg-[#FFDCDC] py-20 min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold mb-12 text-center">Ulasan Pengguna</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#FFF2EB] border rounded-xl p-6 shadow hover:shadow-md transition">
                <p className="italic text-lg mb-4">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus."
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://randomuser.me/api/portraits/women/${i * 10}.jpg`}
                    alt="User Testimoni"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="font-semibold">Pengguna {i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Kontak Section */}
      <motion.section
        id="kontak"
        className="bg-[#FFF2EB] py-20 min-h-screen flex flex-col items-center justify-center px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container max-w-lg w-full">
        <h3 className="text-4xl font-bold mb-6 text-center">Kontak Kami</h3>
        <form className="space-y-6 bg-[#FFDCDC] p-8 rounded-xl shadow-lg">
          <input
            type="text"
            placeholder="Nama"
            className="w-full px-4 py-3 border !border-gray-400 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#AC1754]"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border !border-gray-400 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#AC1754]"
          />
          <textarea
            placeholder="Pesan"
            rows={4}
            className="w-full px-4 py-3 border !border-gray-400 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#AC1754]"
          />
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#AC1754] hover:bg-[#E53888] text-white font-semibold rounded-md transition"
          >
            Kirim Pesan
          </button>
        </form>


          {/* Sosial Media */}
          <div className="mt-12 flex justify-center gap-8">
            {/* WhatsApp */}
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-green-600 hover:text-green-800 transition text-4xl"
            >
              <i className="ri-whatsapp-fill"></i>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.5 3.5c-1.3-1.3-3-2-4.7-2-3.7 0-6.9 3-6.9 6.7 0 1.2.4 2.4 1.1 3.4l-1.2 4.4 4.5-1.2c1 .7 2.2 1.1 3.4 1.1 3.7 0 6.7-3 6.7-6.7 0-1.7-.7-3.4-2-4.7zm-4.4 12.8c-1.4 0-2.7-.6-3.7-1.7l-2.5.7.7-2.5c-1-1-1.6-2.3-1.6-3.7 0-3 2.5-5.5 5.5-5.5 1.4 0 2.8.6 3.7 1.6 1 1 1.6 2.3 1.6 3.7 0 3-2.5 5.5-5.5 5.5z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-pink-600 hover:text-pink-800 transition text-4xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.5 2C4.5 2 2 4.5 2 7.5v9C2 19.5 4.5 22 7.5 22h9c3 0 5.5-2.5 5.5-5.5v-9c0-3-2.5-5.5-5.5-5.5h-9zM12 7a5 5 0 110 10 5 5 0 010-10zm6 1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-red-600 hover:text-red-800 transition text-4xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.8 7.5c-.2-.7-.8-1.2-1.6-1.4C16.6 6 12 6 12 6s-4.6 0-6.2.1c-.8.2-1.4.7-1.6 1.4-.2.7-.2 2.1-.2 2.1s0 1.4.2 2.1c.2.7.8 1.2 1.6 1.4 1.6.1 6.2.1 6.2.1s4.6 0 6.2-.1c.8-.2 1.4-.7 1.6-1.4.2-.7.2-2.1.2-2.1s0-1.4-.2-2.1zM10 14.7V9.3l4.8 2.7-4.8 2.7z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-blue-700 hover:text-blue-900 transition text-4xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 8h3V5h-3c-1.7 0-3 1.3-3 3v2H9v4h3v7h4v-7h3l1-4h-4V8z" />
              </svg>
            </a>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#FFC0CB] py-6 text-center text-gray-800 font-semibold">
        &copy; 2024 BumpCare. All rights reserved.
      </footer>
    </motion.div>
  );
}
