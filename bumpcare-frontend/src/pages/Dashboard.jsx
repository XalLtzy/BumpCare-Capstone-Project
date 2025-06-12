import { useEffect, useState } from 'react';
import SidebarLayout from '../components/SidebarLayout';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../presenters/userPresenter';
import { fetchLatestResult } from '../presenters/resultPresenter';
import { fetchLatestNutritionInput } from '../presenters/nutritionPresenter';
import { fetchLatestRiskInput } from '../presenters/riskPresenter';
import { motion } from 'framer-motion';
import {
  HiOutlineUser,
  HiOutlineScale,
  HiOutlineClock,
  HiOutlineFire,
  HiOutlineBeaker,
  HiOutlineHeart,
  HiOutlinePencilAlt
} from 'react-icons/hi';
import { fadeVariant, slideUpVariant, fadeInDelayed } from '../animations/variants';

const foodRecommendations = [
  { id: 1, name: 'Salmon Panggang', description: 'Sumber protein dan omega-3 yang baik.', emoji: '🐟' },
  { id: 2, name: 'Sayur Bayam', description: 'Kaya zat besi dan vitamin.', emoji: '🥬' },
  { id: 3, name: 'Oatmeal', description: 'Sumber karbohidrat kompleks dan serat.', emoji: '🥣' },
  { id: 4, name: 'Alpukat', description: 'Lemak sehat dan vitamin E.', emoji: '🥑' },
  { id: 5, name: 'Telur Rebus', description: 'Protein tinggi dan kolin.', emoji: '🥚' },
  { id: 6, name: 'Hati Sapi', description: 'Kaya vitamin B12, A, zat besi.', emoji: '🥩' },
];

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bmiData, setBmiData] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [riskData, setRiskData] = useState(null);
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

          fetchLatestNutritionInput()
            .then(({ data }) => setNutritionData(data))
            .catch(() => setNutritionData(null));

          fetchLatestRiskInput()
            .then(({ data }) => setRiskData(data))
            .catch(() => setRiskData(null));
        } else {
          setBmiData(null);
          setNutritionData(null);
          setRiskData(null);
        }
      })
      .catch(() => {
        setProfile(null);
        setLoading(false);
      });
  }, []);

  const isProfileComplete = profile &&
    profile.age && profile.weight && profile.height && profile.trimester;

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
      <motion.main {...fadeVariant} className={`px-4 pb-10 ${animatedClass}`}>
        {!isProfileComplete ? (
          <motion.section
            {...slideUpVariant}
            className="max-w-xl mx-auto bg-[#FFDCDC] p-6 md:p-10 rounded-2xl shadow-lg text-center mt-24 md:mt-10"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-[#AC1754]">
              Profil Anda belum lengkap
            </h2>
            <p className="mb-6 md:mb-8 text-gray-600 text-sm md:text-base">
              Silakan lengkapi data pribadi Anda terlebih dahulu untuk mulai menggunakan aplikasi.
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="inline-block bg-[#AC1754] hover:bg-[#E53888] text-white px-8 py-3 rounded-full text-lg font-medium transition"
            >
              Isi Profil Sekarang
            </button>
          </motion.section>
        ) : (
          <section className="max-w-4xl mx-auto space-y-8 md:space-y-10 mt-10">
            {/* Profil Pengguna */}
            <motion.div {...slideUpVariant} className="bg-[#FFDCDC] rounded-2xl shadow-lg p-4 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-full bg-pink-200 flex items-center justify-center text-5xl md:text-6xl text-[#AC1754] font-bold">
                {profile.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#AC1754] mb-2">
                  Halo, {profile.name} 👋
                </h1>
                <p className="text-[#E53888] font-semibold text-base md:text-lg">
                  <HiOutlineClock className="inline-block mr-1" /> Trimester ke-{profile.trimester} &nbsp;|&nbsp; Usia Bunda: {profile.age} tahun
                </p>
                <div className="mt-3 text-sm md:text-base text-gray-700 space-y-1">
                  <p><HiOutlineScale className="inline-block mr-2" /> <strong>BB Sebelum Kehamilan:</strong> {profile.pre_pregnancy_weight ?? '-'} kg</p>
                  <p><HiOutlineScale className="inline-block mr-2" /> <strong>BB Sekarang:</strong> {profile.weight} kg</p>
                  <p><HiOutlineUser className="inline-block mr-2" /> <strong>Tinggi Badan:</strong> {profile.height} cm</p>
                </div>
                <div className="mt-4 text-sm md:text-base text-gray-700">
                  <p><HiOutlineClock className="inline-block mr-2" /> <strong>Aktivitas Harian:</strong> {profile.activity_level || '-'}</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/profile')}
                className="self-start md:self-center bg-[#AC1754] text-[#FFDCDC] rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-md hover:bg-pink-800 transition"
                title="Edit Profil"
              >
                <HiOutlinePencilAlt className="w-6 h-6" />
              </button>
            </motion.div>

            {/* Hasil Perhitungan Gizi */}
            <motion.div {...fadeInDelayed} className="bg-[#FFDCDC] rounded-2xl shadow-lg p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#AC1754] mb-4 md:mb-6">Hasil Perhitungan Gizi</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center text-sm md:text-base">
                {[
                  { label: 'BMI', value: bmiData?.bmi || '-', subtitle: bmiData?.bmiStatus || 'Belum dihitung', icon: <HiOutlineScale className="w-6 h-6 mx-auto text-[#AC1754]" /> },
                  { label: 'Kalori', value: bmiData?.calorieNeed ? `${bmiData.calorieNeed} kcal` : '-', icon: <HiOutlineFire className="w-6 h-6 mx-auto text-[#AC1754]" /> },
                  { label: 'Protein', value: bmiData?.proteinNeed ? `${bmiData.proteinNeed} g` : '-', icon: <HiOutlineBeaker className="w-6 h-6 mx-auto text-[#AC1754]" /> },
                  { label: 'Lemak', value: bmiData?.fatNeed ? `${bmiData.fatNeed} g` : '-', icon: <HiOutlineHeart className="w-6 h-6 mx-auto text-[#AC1754]" /> },
                ].map((item, index) => (
                  <div key={index} className="rounded-xl p-4 md:p-6 shadow-inner bg-[#FFF2EB]">
                    {item.icon}
                    <p className="text-2xl md:text-3xl font-extrabold text-[#AC1754] mt-2">{item.value}</p>
                    <p className="font-semibold text-gray-700">{item.label}</p>
                    {item.subtitle && <p className="text-xs mt-1 text-gray-500">{item.subtitle}</p>}
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Hasil Klasifikasi Gizi dan Risiko */}
            <motion.div {...fadeInDelayed} className="bg-[#FFDCDC] rounded-2xl shadow-lg p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#AC1754] mb-4 md:mb-6">Hasil Klasifikasi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center text-sm md:text-base">
                {[
                  {
                    title: 'Status Gizi',
                    value: nutritionData?.nutrition_status || 'Belum tersedia',
                    icon: <HiOutlineBeaker className="w-6 h-6 mx-auto text-[#AC1754]" />
                  },
                  {
                    title: 'Risiko Kehamilan',
                    value: riskData?.risk_classification || 'Belum tersedia',
                    icon: <HiOutlineHeart className="w-6 h-6 mx-auto text-[#AC1754]" />
                  }
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl p-4 md:p-6 shadow-inner bg-[#FFF2EB]">
                    {item.icon}
                    <p className="text-2xl md:text-3xl font-extrabold text-[#AC1754] mt-2">{item.value}</p>
                    <p className="font-semibold text-gray-700">{item.title}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Rekomendasi Makanan */}
            <motion.div {...fadeInDelayed} className="bg-[#FFDCDC] rounded-2xl shadow-lg p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#AC1754] mb-4 md:mb-6">Rekomendasi Makanan</h2>
              <p className="mb-4 md:mb-6 text-gray-600 text-sm md:text-base max-w-xl">
                Berikut beberapa rekomendasi makanan untuk menjaga kesehatan dan nutrisi Anda.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {foodRecommendations.map(food => (
                  <div
                    key={food.id}
                    onClick={() => navigate(`/food/${food.id}`)}
                    className="cursor-pointer rounded-xl p-4 shadow-md transition-transform transform hover:-translate-y-1 bg-[#FFF2EB]"
                    title={food.description}
                  >
                    <div className="text-4xl md:text-5xl mb-2 md:mb-3">{food.emoji}</div>
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
