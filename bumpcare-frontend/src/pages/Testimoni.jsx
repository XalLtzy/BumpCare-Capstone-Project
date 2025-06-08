import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import SidebarLayout from '../components/SidebarLayout';
import { motion } from 'framer-motion';

const fadeVariant = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
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
        <h1 className="text-4xl font-extrabold text-center text-[#AC1754]">
        Kirim Ulasan Anda
        </h1>
          <p className="text-gray-700 text-center text-sm sm:text-base mb-6">
            Ulasan Anda sangat membantu kami untuk mengembangkan aplikasi ini menjadi lebih baik.
          </p>
        {/* Kontainer Luar */}
        <motion.div
          className="max-w-3xl mx-auto bg-[#FFDCDC] rounded-3xl shadow-xl p-8 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          

        {/* Kontainer Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col space-y-4 border border-[#F2B8B5] mt-6 "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-3 rounded-xl mb-6 shadow-sm"
            >
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm font-medium">Terima kasih atas ulasan Anda!</p>
            </motion.div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 text-justify mb-1">Nama</label>
              <input
                type="text"
                className="w-full rounded-xl border border-gray-400 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#AC1754] transition"
                placeholder="Masukkan nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 text-justify mb-1">Pesan</label>
              <textarea
                className="w-full rounded-xl border border-gray-400 px-4 py-2 h-32 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#AC1754] transition"
                placeholder="Tulis pesan ulasan Anda di sini..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <motion.button
              {...fadeVariant}
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-semibold text-white text-lg transition shadow-lg
                ${loading
                  ? 'bg-[#E53888] cursor-not-allowed' : 'bg-[#AC1754] hover:bg-[#E5408B] flex items-center justify-center space-x-2'}
              `}
            >
              {loading ? 'Mengirim...' : 'Kirim Testimoni'}
            </motion.button>
          </motion.form>
        </motion.div>
        </motion.div>
    </SidebarLayout>
  );
}
