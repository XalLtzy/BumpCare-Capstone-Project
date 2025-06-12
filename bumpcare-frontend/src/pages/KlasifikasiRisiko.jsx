import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import SidebarLayout from '../components/SidebarLayout';
import { motion } from 'framer-motion';
import { submitRiskClassification } from '../presenters/riskPresenter';
import getDeskripsiByLabel from '../utils/labelDeskripsi';
import DeskripsiRisikoCard from '../components/DeskripsiRisikoCard';

const fadeVariant = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

export default function KlasifikasiRisiko() {
  const [formData, setFormData] = useState({
    blood_sugar: '',
    body_temperature: '',
    heart_rate: '',
    previous_complications: '',
    preexisting_diabetes: '',
    gestational_diabetes: '',
    mental_health: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    try {
      const parsed = {
        blood_sugar: parseFloat(formData.blood_sugar),
        body_temperature: parseFloat(formData.body_temperature),
        heart_rate: parseInt(formData.heart_rate, 10),
        previous_complications: parseInt(formData.previous_complications, 10),
        preexisting_diabetes: parseInt(formData.preexisting_diabetes, 10),
        gestational_diabetes: parseInt(formData.gestational_diabetes, 10),
        mental_health: parseInt(formData.mental_health, 10),
      };

      for (const key in parsed) {
        if (isNaN(parsed[key])) throw new Error(`Field ${key} tidak valid.`);
      }

      const response = await submitRiskClassification(parsed);
      setResult(response);
      setSubmitted(true);
    } catch (err) {
      alert(err.message || 'Gagal mengirim data');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarLayout>
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-[#AC1754] mb-3">
          Klasifikasi Risiko Kehamilan
        </h1>
        <p className="text-center text-gray-600 text-sm sm:text-base mb-8">
          Isi data berikut untuk mengevaluasi risiko kehamilan ibu.
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
              { label: 'Kadar Gula Darah (mmol/L)', name: 'blood_sugar' },
              { label: 'Suhu Tubuh (°C)', name: 'body_temperature' },
              { label: 'Detak Jantung (bpm)', name: 'heart_rate' },
              {
                label: 'Riwayat Komplikasi Kesehatan',
                name: 'previous_complications',
                type: 'select',
              },
              {
                label: 'Riwayat Diabetes Sebelum Hamil',
                name: 'preexisting_diabetes',
                type: 'select',
              },
              {
                label: 'Diabetes Saat Hamil',
                name: 'gestational_diabetes',
                type: 'select',
              },
              {
                label: 'Riwayat Kesehatan Mental',
                name: 'mental_health',
                type: 'select',
              },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {label}
                </label>
                {type === 'select' ? (
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-white focus:ring-2 focus:ring-[#AC1754]"
                  >
                    <option value="">Pilih</option>
                    <option value="0">Tidak</option>
                    <option value="1">Ya</option>
                  </select>
                ) : (
                  <input
                    type="number"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-white focus:ring-2 focus:ring-[#AC1754]"
                  />
                )}
              </div>
            ))}
          </div>

          <motion.button
            {...fadeVariant}
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-semibold text-white text-lg transition shadow-md ${
              loading
                ? 'bg-[#E53888] cursor-not-allowed'
                : 'bg-[#AC1754] hover:bg-[#E5408B]'
            }`}
          >
            {loading ? 'Memproses...' : 'Klasifikasikan'}
          </motion.button>
        </motion.form>

        {submitted && result && (
          <motion.div
            className="mt-6 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-1 bg-green-100 text-green-800 px-4 py-3 rounded-xl shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <p className="text-sm font-medium">
                  Prediksi Risiko:{' '}
                  <strong>
                    {result.risk_classification === 'High'
                      ? 'Risiko Tinggi'
                      : 'Risiko Rendah'}
                  </strong>
                </p>
              </div>
              <p className="text-sm text-gray-700 pl-7">
                Tingkat keyakinan model:{' '}
                <strong>{(result.confidence * 100).toFixed(2)}%</strong>
              </p>
            </div>

            <DeskripsiRisikoCard
              status={
                result.risk_classification === 'High'
                  ? 'Risiko Tinggi'
                  : 'Risiko Rendah'
              }
              markdown={getDeskripsiByLabel(
                result.risk_classification === 'High'
                  ? 'Risiko Tinggi'
                  : 'Risiko Rendah'
              )}
            />
          </motion.div>
        )}
      </div>
    </SidebarLayout>
  );
}
