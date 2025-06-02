import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfilePresenter } from '../presenters/userPresenter';
import { toast } from 'react-hot-toast';

export default function ProfileTwoColumn() {
  const [form, setForm] = useState({
    age: '',
    weight: '',
    height: '',
    trimester: '',
    activity_level: '',
    medical_history: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile()
      .then(data => {
        if (data) {
          setForm({
            age: data.age ?? '',
            weight: data.weight ?? '',
            height: data.height ?? '',
            trimester: data.trimester ?? '',
            activity_level: data.activity_level ?? '',
            medical_history: data.medical_history ?? '',
          });
        }
      })
      .catch(() => toast.error('Gagal mengambil profil'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUserProfilePresenter(form);
      toast.success(res.message || 'Profil berhasil disimpan');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch {
      toast.error('Gagal menyimpan data');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 min-h-screen flex flex-col md:flex-row gap-10 font-poppins text-gray-900">
      {/* Kiri: Info */}
      <motion.div
        className="md:w-1/3 bg-[#FFC0CB] rounded-2xl p-6 shadow-xl flex flex-col justify-center"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-[#AC1754] mb-4">Profil Ibu Hamil</h2>
        <p className="text-[#AC1754] mb-4 leading-relaxed">
          Lengkapi data berikut untuk mendapatkan rekomendasi nutrisi dan pemantauan kehamilan yang sesuai dengan kebutuhan Anda.
        </p>
        <ul className="list-disc list-inside text-[#AC1754] space-y-2 text-sm">
          <li>Usia Anda saat ini</li>
          <li>Berat dan tinggi badan</li>
          <li>Trimester kehamilan</li>
          <li>Aktivitas harian</li>
          <li>Riwayat medis</li>
        </ul>
      </motion.div>

      {/* Kanan: Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="md:w-2/3 bg-white p-8 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Input Fields */}
        {[
          { id: 'age', label: 'Usia (tahun)', type: 'number', min: 14, max: 50 },
          { id: 'weight', label: 'Berat Badan (kg)', type: 'number', min: 30, max: 200, step: '0.1' },
          { id: 'height', label: 'Tinggi Badan (cm)', type: 'number', min: 100, max: 220, step: '0.1' },
        ].map(field => (
          <div key={field.id} className="flex flex-col gap-1">
            <label htmlFor={field.id} className="font-medium text-[#AC1754]">{field.label}</label>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              min={field.min}
              max={field.max}
              step={field.step}
              value={form[field.id]}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AC1754] transition"
              required
            />
          </div>
        ))}

        {/* Trimester */}
        <div className="flex flex-col gap-1">
          <label htmlFor="trimester" className="font-medium text-[#AC1754]">Trimester Kehamilan</label>
          <select
            id="trimester"
            name="trimester"
            value={form.trimester}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AC1754] transition"
            required
          >
            <option value="">Pilih Trimester</option>
            <option value="1">Trimester 1</option>
            <option value="2">Trimester 2</option>
            <option value="3">Trimester 3</option>
          </select>
        </div>

        {/* Aktivitas */}
        <div className="flex flex-col gap-1">
          <label htmlFor="activity_level" className="font-medium text-[#AC1754]">Aktivitas Harian</label>
          <select
            id="activity_level"
            name="activity_level"
            value={form.activity_level}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AC1754] transition"
            required
          >
            <option value="">Pilih Aktivitas</option>
            <option value="Rendah">Rendah</option>
            <option value="Sedang">Sedang</option>
            <option value="Tinggi">Tinggi</option>
          </select>
        </div>

        {/* Riwayat Medis */}
        <div className="md:col-span-2 flex flex-col gap-1">
          <label htmlFor="medical_history" className="font-medium text-[#AC1754]">Riwayat Medis</label>
          <textarea
            id="medical_history"
            name="medical_history"
            value={form.medical_history}
            onChange={handleChange}
            rows={4}
            placeholder="Tuliskan jika ada riwayat medis penting..."
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AC1754] transition resize-none"
          />
        </div>

        {/* Tombol Simpan */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-[#AC1754] text-white py-3 rounded-md font-semibold hover:bg-[#911145] transition"
          >
            Simpan Profil
          </button>
        </div>
      </motion.form>
    </div>
  );
}
