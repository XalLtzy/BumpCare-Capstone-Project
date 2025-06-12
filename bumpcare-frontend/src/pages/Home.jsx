import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaYoutube, FaEnvelope } from "react-icons/fa";
import { fetchAllTestimoni } from '../presenters/testimoniPresenter';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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

  const [testimoni, setTestimoni] = useState([]);

  useEffect(() => {
    const loadTestimoni = async () => {
      try {
        const data = await fetchAllTestimoni();
        console.log("Testimoni dari API:", data);
        if (Array.isArray(data)) {
          setTestimoni(data);
        }
      } catch (err) {
        console.error('Gagal memuat testimoni:', err.message);
      }
    };
    loadTestimoni();
  }, []);

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
    email: 'naufalpratistas@gmail.com'
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, testimoni.length),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, testimoni.length),
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-[#000000]">Welcome to Bumpcare</h2>
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
          <h3 className="text-4xl font-bold mb-12 text-[#AC1754] text-center">Fitur Unggulan</h3>
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
          <h3 className="text-4xl font-bold mb-8 text-[#AC1754]">Apa itu Bumpcare?</h3>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed tracking-wide">
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
          <h3 className="text-4xl font-bold mb-12 text-[#AC1754] text-center">Ulasan Pengguna</h3>
          {testimoni.length === 0 ? (
            <p className="text-center text-gray-600">Belum ada testimoni.</p>
          ) : (
          <Slider {...settings}>
            {testimoni.map((item, i) => (
              <div key={i} className="px-4">
                <div className="bg-[#FFF2EB] border rounded-xl p-6 shadow hover:shadow-md transition h-full">
                  <p className="italic text-lg mb-4">"{item.message}"</p>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, starIndex) => (
                      <span key={starIndex} className={starIndex < item.rating ? "text-yellow-500" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="font-semibold">{item.name}</div>
                </div>
              </div>
            ))}
          </Slider>
          )}
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
        {/* Judul Kontak */}
        <div className="max-w-4xl w-full mb-16 px-6 text-center">
          <h3 className="text-4xl font-bold mb-2 text-[#AC1754]">Kontak Kami</h3>
        </div>

        {/* Ikon Sosial Media */}
        <div className="container max-w-4xl w-full">
          <div className="flex flex-wrap justify-center gap-12 md:gap-12 text-4xl">
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:scale-110 transition-transform text-green-600"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={40} />
              <span className="text-lg font-medium">WhatsApp</span>
      </a>
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 hover:scale-110 transition-transform text-pink-600"
        aria-label="Instagram"
      >
        <FaInstagram size={40} />
        <span className="text-lg font-medium">Instagram</span>
      </a>
      <a
        href={socialLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 hover:scale-110 transition-transform text-blue-700"
        aria-label="Facebook"
      >
        <FaFacebookF size={40} />
        <span className="text-lg font-medium">Facebook</span>
      </a>
      <a
        href={socialLinks.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 hover:scale-110 transition-transform text-red-600"
        aria-label="YouTube"
      >
        <FaYoutube size={40} />
        <span className="text-lg font-medium">YouTube</span>
      </a>
      <a
        href={`mailto:${socialLinks.email}`}
        className="flex items-center gap-3 hover:scale-110 transition-transform text-gray-800"
        aria-label="Email"
      >
        <FaEnvelope size={40} />
        <span className="text-lg font-medium">Email</span>
      </a>
    </div>
  </div>
</motion.section>

      
      {/* Footer */}
      <footer className="bg-[#FFC0CB] py-6 text-center text-gray-800 font-semibold">
        &copy; 2025 BumpCare. All rights reserved.
      </footer>
    </motion.div>
  );
}
