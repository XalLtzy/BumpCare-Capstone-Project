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
    <div className="max-w-6xl mx-auto p-8 min-h-screen flex gap-10 font-poppins text-gray-900">
      {/* Kiri: Info */}
      <motion.div 
        className="w-1/3 bg-purple-50 rounded-xl p-6 flex flex-col justify-center shadow-lg"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-purple-700 mb-4">Profil Ibu Hamil</h2>
        <p className="text-purple-800 mb-4 leading-relaxed">
          Lengkapi data diri Anda agar kami bisa memberikan rekomendasi nutrisi dan
          pantauan kehamilan yang sesuai dengan kondisi Anda.
        </p>
        <ul className="list-disc list-inside text-purple-700 space-y-2">
          <li>Usia</li>
          <li>Berat Badan</li>
          <li>Tinggi Badan</li>
          <li>Trimester Kehamilan</li>
          <li>Tingkat Aktivitas</li>
          <li>Riwayat Medis</li>
        </ul>
      </motion.div>

      {/* Kanan: Form */}
      <motion.form 
        onSubmit={handleSubmit}
        className="w-2/3 bg-white p-8 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Usia */}
        <div className="flex flex-col gap-1">
          <label htmlFor="age" className="font-semibold text-gray-700">Usia (tahun)</label>
          <input
            id="age"
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
            min={14}
            max={50}
          />
        </div>

        {/* Berat Badan */}
        <div className="flex flex-col gap-1">
          <label htmlFor="weight" className="font-semibold text-gray-700">Berat Badan (kg)</label>
          <input
            id="weight"
            type="number"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
            min={30}
            max={200}
            step="0.1"
          />
        </div>

        {/* Tinggi Badan */}
        <div className="flex flex-col gap-1">
          <label htmlFor="height" className="font-semibold text-gray-700">Tinggi Badan (cm)</label>
          <input
            id="height"
            type="number"
            name="height"
            value={form.height}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
            min={100}
            max={220}
            step="0.1"
          />
        </div>

        {/* Trimester */}
        <div className="flex flex-col gap-1">
          <label htmlFor="trimester" className="font-semibold text-gray-700">Trimester Kehamilan</label>
          <select
            id="trimester"
            name="trimester"
            value={form.trimester}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          >
            <option value="">Pilih Trimester</option>
            <option value="1">Trimester 1</option>
            <option value="2">Trimester 2</option>
            <option value="3">Trimester 3</option>
          </select>
        </div>

        {/* Tingkat Aktivitas */}
        <div className="flex flex-col gap-1">
          <label htmlFor="activity_level" className="font-semibold text-gray-700">Aktivitas Harian</label>
          <select
            id="activity_level"
            name="activity_level"
            value={form.activity_level}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          >
            <option value="">Pilih Tingkat Aktivitas</option>
            <option value="Rendah">Rendah</option>
            <option value="Sedang">Sedang</option>
            <option value="Tinggi">Tinggi</option>
          </select>
        </div>

        {/* Riwayat Penyakit */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="medical_history" className="font-semibold text-gray-700">Riwayat Medis</label>
          <textarea
            id="medical_history"
            name="medical_history"
            value={form.medical_history}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
            rows={4}
            placeholder="Tuliskan riwayat medis jika ada"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition font-semibold"
          >
            Simpan Profil
          </button>
        </div>
      </motion.form>
    </div>
  );
}
