import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import SidebarLayout from '../components/SidebarLayout';
import { motion } from 'framer-motion';
import { submitRiskClassification } from '../presenters/riskPresenter';

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
  const [result, setResult] = useState(null); // ⬅️ untuk menyimpan hasil klasifikasi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      setResult(response); // ⬅️ simpan hasil dari Flask

    } catch (err) {
      alert(err.message || 'Gagal mengirim data');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarLayout>
      <h1 className="text-4xl font-extrabold text-center text-[#AC1754]">Klasifikasi Risiko Kehamilan</h1>
      <p className="text-gray-700 text-center text-sm sm:text-base mb-6">
        Masukkan data ibu hamil untuk mengevaluasi risiko kehamilan.
      </p>

      <motion.div className="max-w-3xl mx-auto bg-[#FFDCDC] rounded-3xl shadow-xl p-8 space-y-8"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

        <motion.div className="bg-white rounded-2xl shadow-md p-6 space-y-6 border border-[#F2B8B5]"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

          {result && (
            <motion.div className="flex flex-col gap-2 bg-green-100 text-green-800 px-4 py-3 rounded-xl shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <p className="text-sm font-medium">Prediksi Risiko: <strong>{result.risk_classification === 'High' ? 'High Risk' : 'Low Risk'}</strong></p>
              </div>
              <p className="text-xs text-gray-700">Tingkat keyakinan: {(result.confidence * 100).toFixed(2)}%</p>
            </motion.div>
          )}

          <motion.form onSubmit={handleSubmit} className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {[
              { label: 'Kadar Gula Darah (mmol/L)', name: 'blood_sugar' },
              { label: 'Suhu Tubuh (°C)', name: 'body_temperature' },
              { label: 'Detak Jantung (bpm)', name: 'heart_rate' },
              { label: 'Riwayat Komplikasi Kesehatan', name: 'previous_complications', type: 'select' },
              { label: 'Riwayat Diabetes Sebelum Hamil', name: 'preexisting_diabetes', type: 'select' },
              { label: 'Diabetes Saat Hamil', name: 'gestational_diabetes', type: 'select' },
              { label: 'Riwayat Kesehatan Mental', name: 'mental_health', type: 'select' },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                {type === 'select' ? (
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-400 px-4 py-2 bg-white focus:ring-2 focus:ring-[#AC1754]">
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
                    className="w-full rounded-xl border border-gray-400 px-4 py-2 bg-white focus:ring-2 focus:ring-[#AC1754]"
                  />
                )}
              </div>
            ))}

            <motion.button
              {...fadeVariant}
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-semibold text-white text-lg transition shadow-lg
              ${loading ? 'bg-[#E53888] cursor-not-allowed' : 'bg-[#AC1754] hover:bg-[#E5408B]'}`}
            >
              {loading ? 'Memproses...' : 'Cek Risiko'}
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
    </SidebarLayout>
  );
}
