import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import SidebarLayout from '../components/SidebarLayout';
import { motion } from 'framer-motion';

const fadeVariant = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

export default function KlasifikasiGizi() {
  const [formData, setFormData] = useState({
    umur: '',
    beratSebelum: '',
    beratSekarang: '',
    tinggi: '',
    lila: '',
    hb: '',
    sistolik: '',
    diastolik: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const bmi =
    formData.beratSekarang && formData.tinggi
      ? (formData.beratSekarang / ((formData.tinggi / 100) ** 2)).toFixed(2)
      : '';

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log('Data Gizi:', { ...formData, bmi });
      setSubmitted(true);
      setLoading(false);

      setTimeout(() => setSubmitted(false), 3000);
    }, 1200);
  };

  return (
    <SidebarLayout>
      <h1 className="text-4xl font-extrabold text-center text-[#AC1754]">
        Klasifikasi Gizi
      </h1>
      <p className="text-gray-700 text-center text-sm sm:text-base mb-6">
        Silakan masukkan data untuk mengevaluasi status gizi ibu hamil.
      </p>

      <motion.div
        className="max-w-3xl mx-auto bg-[#FFDCDC] rounded-3xl shadow-xl p-8 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 space-y-6 border border-[#F2B8B5]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {submitted && (
            <motion.div
              className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-3 rounded-xl mb-6 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm font-medium">Data berhasil disubmit!</p>
            </motion.div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[
              { label: 'Umur Ibu (tahun)', name: 'umur', type: 'number' },
              { label: 'Berat Badan Sebelum Hamil (kg)', name: 'beratSebelum', type: 'number' },
              { label: 'Berat Badan Saat Ini (kg)', name: 'beratSekarang', type: 'number' },
              { label: 'Tinggi Badan (cm)', name: 'tinggi', type: 'number' },
              { label: 'Lingkar Lengan Atas (LILA) (cm)', name: 'lila', type: 'number' },
              { label: 'Hemoglobin (Hb) (g/dL)', name: 'hb', type: 'number' },
              { label: 'Tekanan Darah Sistolik (mmHg)', name: 'sistolik', type: 'number' },
              { label: 'Tekanan Darah Diastolik (mmHg)', name: 'diastolik', type: 'number' },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-400 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#AC1754] transition"
                  required
                />
              </div>
            ))}

            {bmi && (
              <div className="text-sm font-medium text-gray-700">
                BMI (Body Mass Index): <span className="font-bold">{bmi}</span>
              </div>
            )}

            <motion.button
              {...fadeVariant}
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-semibold text-white text-lg transition shadow-lg
                ${loading
                  ? 'bg-[#E53888] cursor-not-allowed'
                  : 'bg-[#AC1754] hover:bg-[#E5408B]'}`}
            >
              {loading ? 'Memproses...' : 'Klasifikasikan'}
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
    </SidebarLayout>
  );
}
