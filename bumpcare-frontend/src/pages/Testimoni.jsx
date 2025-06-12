import { useState, useEffect } from 'react';
import { CheckCircle, Star } from 'lucide-react';
import SidebarLayout from '../components/SidebarLayout';
import { motion } from 'framer-motion';
import { submitTestimoni } from '../presenters/testimoniPresenter';

const fadeVariant = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

export default function Testimoni() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setName(data?.data?.name || '');
      } catch (err) {
        console.error('Gagal memuat profil:', err);
      }
    };
    fetchUserName();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitTestimoni({ message, rating });
      setSubmitted(true);
      setMessage('');
      setRating(0);
      window.alert('✅ Ulasan berhasil dikirim!');
    } catch (error) {
      console.error(error);
      window.alert(`❌ ${error.message}`);
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <SidebarLayout>
      <h1 className="text-4xl font-extrabold text-center text-[#AC1754]">
        Kirim Ulasan Anda
      </h1>
      <p className="text-gray-700 text-center text-sm sm:text-base mb-6">
        Ulasan Anda sangat membantu kami untuk mengembangkan aplikasi ini menjadi lebih baik.
      </p>

      <motion.div
        className="w-full max-w-3xl mx-auto bg-[#FFDCDC] rounded-3xl shadow-xl px-4 sm:px-6 md:px-8 py-8 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col space-y-6 border border-[#F2B8B5]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-3 rounded-xl shadow-sm"
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
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1">Ulasan</label>
              <textarea
                className="w-full rounded-xl border border-gray-400 px-4 py-2 h-32 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#AC1754] transition text-sm sm:text-base"
                placeholder="Tulis ulasan Anda di sini..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Rating</label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="relative group transition"
                  >
                    <Star
                      fill={rating >= star ? '#FBBF24' : 'none'}
                      className="w-7 h-7 sm:w-8 sm:h-8 stroke-1 text-yellow-500 transition"
                    />
                    <span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs text-white bg-black px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition z-10 whitespace-nowrap">
                      {star} Bintang
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              {...fadeVariant}
              type="submit"
              disabled={loading}
              className={`w-full py-3 sm:py-4 rounded-2xl font-semibold text-white text-base sm:text-lg transition shadow-lg
                ${loading
                  ? 'bg-[#E53888] cursor-not-allowed'
                  : 'bg-[#AC1754] hover:bg-[#E5408B] flex items-center justify-center space-x-2'}
              `}
            >
              {loading ? 'Mengirim...' : 'Kirim Ulasan'}
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
    </SidebarLayout>
  );
}
