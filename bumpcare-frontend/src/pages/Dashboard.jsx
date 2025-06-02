import { useEffect, useState } from 'react';
import SidebarLayout from '../components/SidebarLayout';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../presenters/userPresenter';
import { fetchLatestResult } from '../presenters/resultPresenter';
import { motion } from 'framer-motion';
import { fadeVariant, slideUpVariant, fadeInDelayed } from '../animations/variants';

const foodRecommendations = [
  { id: 1, name: 'Salmon Panggang', description: 'Sumber protein dan omega-3 yang baik.', emoji: '🐟' },
  { id: 2, name: 'Sayur Bayam', description: 'Kaya zat besi dan vitamin.', emoji: '🥬' },
  { id: 3, name: 'Oatmeal', description: 'Sumber karbohidrat kompleks dan serat.', emoji: '🥣' },
  { id: 4, name: 'Alpukat', description: 'Lemak sehat dan vitamin E.', emoji: '🥑' },
  { id: 5, name: 'Telur Rebus', description: 'Protein tinggi dan kolin.', emoji: '🥚' },
];

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bmiData, setBmiData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile()
      .then(data => {
        setProfile(data);
        setLoading(false);

        const isComplete = data.age && data.weight && data.height && data.trimester;
        if (isComplete) {
          fetchLatestResult()
            .then(({ data: resultData, error }) => {
              setBmiData(!error ? resultData : null);
            });
        } else {
          setBmiData(null);
        }
      })
      .catch(() => {
        setProfile(null);
        setLoading(false);
      });
  }, []);

  const isProfileComplete = profile &&
    profile.age && profile.weight && profile.height && profile.trimester;

  // CSS class untuk optimasi GPU accelerate animasi
  const animatedClass = "will-change-transform will-change-opacity";

  if (loading) {
    return (
      <SidebarLayout>
        <div className="flex flex-col justify-center items-center min-h-screen bg-[#FFF2EB] text-center px-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#AC1754] border-opacity-50 mb-6"></div>
          <p className="text-lg md:text-xl font-medium text-[#AC1754]">Memuat data, harap tunggu...</p>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      {/* Main container animasi hanya saat loading selesai */}
      <motion.main
        {...fadeVariant}
        className={`px-4 pb-10 ${animatedClass}`}
      >
        {!isProfileComplete ? (
          <motion.section
            {...slideUpVariant}
            className={`max-w-xl mx-auto bg-[#FFDCDC] p-6 md:p-10 rounded-2xl shadow-lg text-center mt-24 md:mt-10 ${animatedClass}`}
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-purple-700">
              Profil Anda belum lengkap
            </h2>
            <p className="mb-6 md:mb-8 text-gray-600 text-sm md:text-base">
              Silakan lengkapi data pribadi Anda terlebih dahulu untuk mulai menggunakan aplikasi.
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="bg-purple-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-base md:text-lg font-medium hover:bg-purple-700 transition"
            >
              Isi Profil Sekarang
            </button>
          </motion.section>
        ) : (
          <section className="max-w-4xl mx-auto space-y-8 md:space-y-10 mt-10">
            {/* Profil User */}
            <motion.div
              {...slideUpVariant}
              className={`bg-[#FFDCDC] rounded-2xl shadow-lg p-4 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 ${animatedClass}`}
            >
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-full bg-pink-200 flex items-center justify-center text-5xl md:text-6xl text-[#AC1754] font-bold select-none">
                {profile.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#AC1754] mb-2">
                  Halo, {profile.name} 👋
                </h1>
                <p className="text-[#E53888] font-semibold text-base md:text-lg">
                  Trimester ke-{profile.trimester} &nbsp;|&nbsp; Usia: {profile.age} tahun
                </p>
                <div className="mt-3 text-sm md:text-base text-gray-700 space-y-1">
                  <p><span className="font-semibold">Berat Badan:</span> {profile.weight} kg</p>
                  <p><span className="font-semibold">Tinggi Badan:</span> {profile.height} cm</p>
                </div>
                <div className="mt-4 text-sm md:text-base text-gray-700 space-y-1">
                  <p><span className="font-semibold">Aktivitas Harian:</span> {profile.activity_level || '-'}</p>
                  <p><span className="font-semibold">Riwayat Medis:</span> {profile.medical_history || '-'}</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/profile')}
                className="self-start md:self-center bg-[#AC1754] text-[#FFDCDC] rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-md hover:bg-pink-800 transition"
                aria-label="Edit Profil"
                title="Edit Profil"
              >
                ✏️
              </button>
            </motion.div>

            {/* Hasil Perhitungan Gizi */}
            <motion.div
              {...fadeInDelayed}
              className={`bg-[#FFDCDC] rounded-2xl shadow-lg p-4 md:p-8 ${animatedClass}`}
            >
              <h2 className="text-xl md:text-2xl font-bold text-[#AC1754] mb-4 md:mb-6">Hasil Perhitungan Gizi</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center text-sm md:text-base">
                {[ 
                  { label: 'BMI', value: bmiData?.bmi || '-', subtitle: bmiData?.bmiStatus || 'Belum dihitung' },
                  { label: 'Kebutuhan Kalori', value: bmiData?.calorieNeed ? `${bmiData.calorieNeed} kkal` : '-' },
                  { label: 'Kebutuhan Protein', value: bmiData?.proteinNeed ? `${bmiData.proteinNeed} g` : '-' },
                  { label: 'Kebutuhan Lemak', value: bmiData?.fatNeed ? `${bmiData.fatNeed} g` : '-' },
                ].map((item, index) => (
                  <div key={index} className="rounded-xl p-4 md:p-6 shadow-inner bg-[#FFF2EB]">
                    <p className="text-3xl md:text-4xl font-extrabold text-[#AC1754]">{item.value}</p>
                    <p className="mt-1 font-semibold text-gray-700">{item.label}</p>
                    {item.subtitle && <p className="text-xs mt-1 text-gray-500">{item.subtitle}</p>}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Rekomendasi Makanan */}
            <motion.div
              {...fadeInDelayed}
              className={`bg-[#FFDCDC] rounded-2xl shadow-lg p-4 md:p-8 ${animatedClass}`}
            >
              <h2 className="text-xl md:text-2xl font-bold text-[#AC1754] mb-4 md:mb-6">Rekomendasi Makanan</h2>
              <p className="mb-4 md:mb-6 text-gray-600 text-sm md:text-base max-w-xl">
                Berdasarkan hasil perhitungan gizi terakhir, berikut beberapa rekomendasi makanan yang dapat membantu Anda menjaga kesehatan dan memenuhi kebutuhan nutrisi.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {foodRecommendations.map(food => (
                  <div
                    key={food.id}
                    className="cursor-pointer rounded-xl p-4 shadow-md transition-transform transform hover:-translate-y-1 bg-[#FFF2EB]"
                    title={food.description}
                  >
                    <div className="text-4xl md:text-5xl mb-2 md:mb-3 select-none">{food.emoji}</div>
                    <h3 className="font-semibold text-base md:text-lg text-[#AC1754] mb-1">{food.name}</h3>
                    <p className="text-xs md:text-sm text-gray-600">{food.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}
      </motion.main>
    </SidebarLayout>
  );
}
