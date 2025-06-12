import { useEffect, useState } from 'react';
import { fetchRecords, deleteRecordById } from '../presenters/calculatorPresenter';
import SidebarLayout from '../components/SidebarLayout';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { HiOutlineTrash, HiOutlineCalendar, HiOutlineUser, HiOutlineScale } from 'react-icons/hi';

const fadeVariant = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};
  
export default function Records() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');
  const [loadingId, setLoadingId] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    fetchRecords()
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setRecords(response.data);
        }
      })
      .catch(() => setError('Gagal memuat riwayat'));
  }, []);

  async function handleDeleteById(id) {
    setLoadingId(id);
    setError('');
    setDeleteTargetId(null);
    try {
      const result = await deleteRecordById(id);
      if (result.success) {
        setRecords((prev) => prev.filter((item) => item.id !== id));
        toast.success('Data berhasil dihapus');
      } else {
        setError('Gagal menghapus data');
      }
    } catch {
      setError('Gagal menghapus data');
    }
    setLoadingId(null);
  }

  return (
    <SidebarLayout>
      <h1 className="text-4xl font-extrabold text-center text-[#AC1754] mb-8">
        Riwayat Perhitungan Gizi
      </h1>

      <motion.div
        className="max-w-7xl mx-auto bg-[#FFDCDC] rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {error && (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        )}

        {records.length === 0 ? (
          <p className="text-center text-gray-700 text-lg font-medium">
            Belum ada data perhitungan gizi.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {records.map((rec, index) => (
              <motion.div
                key={rec.id}
                className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col space-y-4 border border-[#F2B8B5]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                {/* Tanggal */}
                <div className="flex items-center space-x-3 text-[#AC1754] font-semibold text-sm">
                  <HiOutlineCalendar size={18} />
                  <span>
                    {new Date(rec.created_at).toLocaleString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false,
                    })}
                  </span>
                </div>

                {/* Data Dasar */}
                <div className="text-gray-700 space-y-1 text-base font-semibold">
                  <p>
                    <HiOutlineUser className="inline mr-1 mb-1" />
                    Usia: {rec.age} • Trimester: {rec.trimester}
                  </p>
                  <p>Berat Sebelum Hamil: <span className="font-normal">{rec.pre_pregnancy_weight} kg</span></p>
                </div>

                <div className="text-gray-600 space-y-1 text-sm">
                  <p>Berat Sekarang: <span className="font-semibold">{rec.weight} kg</span></p>
                  <p>Tinggi: <span className="font-semibold">{rec.height} cm</span></p>
                </div>

                {/* Hasil Perhitungan */}
                <div className="text-[#AC1754] font-semibold text-sm space-y-1 border-t border-[#AC1754] pt-3">
                  <p><HiOutlineScale className="inline mr-1 mb-1" /> BMI: {rec.bmi}</p>
                  <p>Kalori: {rec.calorie_needs} kkal/hari</p>
                  <p>Protein: {rec.protein_needs} g/hari</p>
                  <p>Lemak: {rec.fat_needs} g/hari</p>
                </div>

                {/* Data Klasifikasi Gizi */}
                {(rec.lila || rec.hemoglobin || rec.systolic || rec.diastolic || rec.nutrition_status) && (
                  <div className="text-sm text-gray-700 space-y-1 border-t border-dashed border-[#AC1754] pt-3">
                    {rec.lila && <p>Lingkar Lengan Atas (LILA) : <span className="font-semibold"> {rec.lila} cm</span></p>}
                    {rec.hemoglobin && <p>Hemoglobin : <span className="font-semibold">{rec.hemoglobin} g/dL</span></p>}
                    {(rec.systolic && rec.diastolic) && (
                      <p>Tekanan Darah Sistolik/Diastolik : <span className="font-semibold"> {rec.systolic}/{rec.diastolic} mmHg</span></p>
                    )}
                    {rec.nutrition_status && (
                      <p><strong>Status Gizi:</strong> <span className="text-[#AC1754] font-semibold">{rec.nutrition_status}</span></p>
                    )}
                  </div>
                )}

                {/* Data Risiko Kehamilan */}
                {(
                  rec.blood_sugar ||
                  rec.heart_rate ||
                  rec.body_temperature_f ||
                  rec.previous_complications !== null ||
                  rec.preexisting_diabetes !== null ||
                  rec.gestational_diabetes !== null ||
                  rec.mental_health !== null ||
                  rec.risk_classification
                ) && (
                  <div className="text-sm text-gray-700 space-y-1 border-t border-dashed border-[#AC1754] pt-3">
                    {rec.blood_sugar && (
                      <p>Gula Darah: <span className="font-semibold">{rec.blood_sugar} mg/dL</span></p>
                    )}
                    {rec.heart_rate && (
                      <p>Denyut Jantung: <span className="font-semibold">{rec.heart_rate} bpm</span></p>
                    )}
                    {rec.body_temperature_f && (
                      <p>Suhu Tubuh: <span className="font-semibold">
                        {((parseFloat(rec.body_temperature_f) - 32) * 5 / 9).toFixed(1)} °C
                      </span></p>
                    )}
                    {rec.previous_complications !== null && (
                      <p>Komplikasi Sebelumnya: <span className="font-semibold">{rec.previous_complications ? 'Ya' : 'Tidak'}</span></p>
                    )}
                      {rec.preexisting_diabetes !== null && (
                      <p>Riwayat Diabetes: <span className="font-semibold">{rec.preexisting_diabetes ? 'Ya' : 'Tidak'}</span></p>
                    )}
                    {rec.gestational_diabetes !== null && (
                      <p>Diabetes Gestasional: <span className="font-semibold">{rec.gestational_diabetes ? 'Ya' : 'Tidak'}</span></p>
                    )}
                    {rec.mental_health !== null && (
                      <p>Kesehatan Mental: <span className="font-semibold">{rec.mental_health ? 'Ya' : 'Tidak'}</span></p>
                    )}
                    {rec.risk_classification && (
                      <>
                        <p className={`rounded-xl px-3 py-1 inline-block font-semibold ${
                          rec.risk_classification.toLowerCase().includes('high') ? 'text-red-600 bg-red-100'
                          : rec.risk_classification.toLowerCase().includes('low') ? 'text-green-600 bg-green-100'
                          : 'text-yellow-600 bg-yellow-100'
                        }`}>
                          {rec.risk_classification.toLowerCase().includes('high') ? '⚠️ Risiko Tinggi'
                          : rec.risk_classification.toLowerCase().includes('low') ? '✅ Risiko Rendah'
                          : `ℹ️ ${rec.risk_classification}`}
                        </p>

                        {rec.risk_classification.toLowerCase().includes('high') && (
                          <p className="text-xs text-red-700 italic mt-1">
                            Ditemukan faktor-faktor yang meningkatkan risiko kehamilan. Disarankan segera konsultasi dengan tenaga medis.
                          </p>
                        )}

                        {rec.risk_classification.toLowerCase().includes('low') && (
                          <p className="text-xs text-green-700 italic mt-1">
                            Kondisi kehamilan terpantau normal. Tetap jaga kesehatan dan lakukan pemeriksaan rutin.
                          </p>
                        )}

                        {!['high', 'low'].some(k => rec.risk_classification.toLowerCase().includes(k)) && (
                          <p className="text-xs text-yellow-700 italic mt-1">
                            Hasil tidak dapat diklasifikasikan secara pasti. Mohon konsultasi lebih lanjut ke tenaga medis.
                          </p>
                        )}

                        <p className="text-xs text-gray-500 italic mt-1">
                          Hasil ini bukan diagnosis medis. Gunakan sebagai panduan awal dan konsultasikan lebih lanjut ke dokter atau bidan.
                        </p>
                      </>
                    )}
                  </div>
                )}  

                {/* Tombol Hapus */}
                <motion.button
                  {...fadeVariant}
                  onClick={() => setDeleteTargetId(rec.id)}
                  disabled={loadingId === rec.id}
                  className={`mt-auto py-3 rounded-xl font-semibold text-white text-base transition
                    ${loadingId === rec.id
                      ? 'bg-[#E53888] cursor-not-allowed'
                      : 'bg-[#AC1754] hover:bg-[#E5408B] flex items-center justify-center space-x-2'}
                  `}
                >
                  <HiOutlineTrash size={20} />
                  <span>{loadingId === rec.id ? 'Menghapus...' : 'Hapus Data Ini'}</span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal Konfirmasi */}
        {deleteTargetId !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border-2 border-[#AC1754]">
              <h2 className="text-2xl font-bold mb-6 text-center text-[#AC1754]">
                Konfirmasi Hapus
              </h2>
              <p className="mb-8 text-center text-gray-700 text-lg">
                Apakah Anda yakin ingin menghapus data ini?
              </p>
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => handleDeleteById(deleteTargetId)}
                  className="bg-[#AC1754] hover:bg-[#E5408B] text-white py-3 px-8 rounded-2xl font-semibold shadow-lg transition duration-300"
                  disabled={loadingId === deleteTargetId}
                >
                  {loadingId === deleteTargetId ? 'Menghapus...' : 'Ya, Hapus'}
                </button>
                <button
                  onClick={() => setDeleteTargetId(null)}
                  className="bg-gray-200 hover:bg-gray-300 py-3 px-8 rounded-2xl font-semibold transition duration-300"
                  disabled={loadingId === deleteTargetId}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </SidebarLayout>
  );
}
