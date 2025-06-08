// src/pages/Testimoni.jsx
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import SidebarLayout from '../components/SidebarLayout';
import { motion } from 'framer-motion';

const fadeVariant = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export default function Testimoni() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log('Testimoni:', { name, message });
      setSubmitted(true);
      setName('');
      setMessage('');
      setLoading(false);

      setTimeout(() => setSubmitted(false), 3000);
    }, 1200);
  };

  return (
    <SidebarLayout>
      <div className="p-6 sm:p-10">
        <div className="bg-[#FFDCDC] shadow-md rounded-2xl p-6 sm:p-10 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl text-center font-bold text-[#AC1754] mb-6">
            Kirim Ulasan Anda
          </h1>

          {submitted && (
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-3 rounded-xl mb-5 shadow-sm transition-all">
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm font-medium">Terima kasih atas ulasan Anda!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nama</label>
              <input
                type="text"
                className="w-full rounded-xl border border-gray-400 px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#AC1754] transition"
                placeholder="Masukkan nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Pesan</label>
              <textarea
                className="w-full rounded-xl border border-gray-400 px-4 py-2 h-32 bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-[#AC1754] transition"
                placeholder="Tulis pesan Ulasan Anda di sini..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <motion.button
              {...fadeVariant}
              type="submit"
              disabled={loading}
              className={`w-full py-4 sm:py-5 rounded-2xl font-semibold text-white text-lg sm:text-xl transition shadow-lg
                ${loading
                  ? 'bg-[#E53888] cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#AC1754] to-[#E53888] hover:from-[#E53888] hover:to-[#AC1754]'}
              `}
            >
              {loading ? 'Mengirim...' : 'Kirim Testimoni'}
            </motion.button>
          </form>
        </div>
      </div>
    </SidebarLayout>
  );
}
