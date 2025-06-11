import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import SidebarLayout from '../components/SidebarLayout';
import { motion } from 'framer-motion';
import { submitNutritionClassification } from '../presenters/nutritionPresenter';
import { getUserProfile } from '../presenters/userPresenter';
import getDeskripsiByLabel from '../utils/labelDeskripsi';
import DeskripsiGiziCard from '../components/DeskripsiGiziCard';

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
  const [statusGizi, setStatusGizi] = useState('');
  const [deskripsiGizi, setDeskripsiGizi] = useState('');

  const bmi =
    formData.beratSekarang && formData.tinggi
      ? (formData.beratSekarang / ((formData.tinggi / 100) ** 2)).toFixed(2)
      : '';

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const user = await getUserProfile();
        if (!user) return;

        setFormData((prev) => ({
          ...prev,
          umur: user.age || '',
          beratSebelum: user.pre_pregnancy_weight || '',
          beratSekarang: user.weight || '',
          tinggi: user.height || '',
        }));
      } catch (err) {
        console.warn('Gagal memuat data:', err.message);
      }
    };
    loadInitialData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        lila: parseFloat(formData.lila),
        hemoglobin: parseFloat(formData.hb),
        systolic: parseFloat(formData.sistolik),
        diastolic: parseFloat(formData.diastolik),
      };

      const result = await submitNutritionClassification(payload);
      if (result.error) throw new Error(result.error);

      const status = result.nutritionStatus || 'Tidak Diketahui';
      setStatusGizi(status);
      setDeskripsiGizi(getDeskripsiByLabel(status));
      setSubmitted(true);
    } catch (err) {
      alert(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarLayout>
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-[#AC1754] mb-3">
          Klasifikasi Gizi Ibu Hamil
        </h1>
        <p className="text-center text-gray-600 text-sm sm:text-base mb-8">
          Isi data berikut untuk mengevaluasi status gizi ibu hamil.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'Umur Ibu (tahun)', name: 'umur', readOnly: true },
              { label: 'Berat Badan Sebelum Hamil (kg)', name: 'beratSebelum', readOnly: true },
              { label: 'Berat Badan Saat Ini (kg)', name: 'beratSekarang', readOnly: true },
              { label: 'Tinggi Badan (cm)', name: 'tinggi', readOnly: true },
              { label: 'Lingkar Lengan Atas (LILA) (cm)', name: 'lila' },
              { label: 'Hemoglobin (Hb) (g/dL)', name: 'hb' },
              { label: 'Tekanan Darah Sistolik (mmHg)', name: 'sistolik' },
              { label: 'Tekanan Darah Diastolik (mmHg)', name: 'diastolik' },
            ].map(({ label, name, readOnly }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type="number"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  readOnly={readOnly}
                  disabled={readOnly}
                        className={`w-full rounded-xl border px-4 py-2 shadow-sm transition ${
                  readOnly
                    ? 'bg-gray-100 cursor-not-allowed text-gray-500'
                    : 'bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AC1754]'
                  }`}
                  required
                />
              </div>
            ))}
          </div>

          {bmi && (
            <p className="text-sm font-medium text-gray-700">
              BMI (Body Mass Index): <span className="font-bold">{bmi}</span>
            </p>
          )}

          <motion.button
            {...fadeVariant}
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-semibold text-white text-lg transition shadow-md ${
              loading ? 'bg-[#E53888] cursor-not-allowed' : 'bg-[#AC1754] hover:bg-[#E5408B]'
            }`}
          >
            {loading ? 'Memproses...' : 'Klasifikasikan'}
          </motion.button>
        </motion.form>

        {submitted && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-3 rounded-xl shadow-sm mb-4">
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm font-medium">
                Status Gizi: <strong>{statusGizi}</strong>
              </p>
            </div>

            <DeskripsiGiziCard
              status={statusGizi}
              markdown={deskripsiGizi}
            />
          </motion.div>
        )}
      </div>
    </SidebarLayout>
  );
}
