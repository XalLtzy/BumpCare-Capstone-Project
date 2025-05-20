import { useEffect, useState } from 'react';
import SidebarLayout from '../components/SidebarLayout';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../presenters/userPresenter';
import { fetchLatestResult } from '../presenters/resultPresenter';

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
      })
      .catch(() => {
        setProfile(null);
        setLoading(false);
      });

    fetchLatestResult()
      .then(({ data, error }) => {
        if (!error) {
          setBmiData(data);
        } else {
          console.error('Gagal mengambil hasil terbaru:', error);
          setBmiData(null);
        }
      });
  }, []);

  if (loading) {
    return (
      <SidebarLayout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      </SidebarLayout>
    );
  }

  const isProfileComplete = profile &&
    profile.age && profile.weight && profile.height && profile.trimester;

  return (
    <SidebarLayout>
      <main className="min-h-screen bg-gradient-to-tr from-purple-50 to-purple-100 p-4 md:p-8">
        {!isProfileComplete ? (
          <section className="max-w-xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-lg text-center">
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
          </section>
        ) : (
          <section className="max-w-4xl mx-auto space-y-8 md:space-y-10">
            {/* Profil User */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-full bg-purple-200 flex items-center justify-center text-5xl md:text-6xl text-purple-700 font-bold select-none">
                {profile.name?.[0].toUpperCase() || 'U'}
              </div>
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-extrabold text-purple-800 mb-2">
                  Halo, {profile.name} 👋
                </h1>
                <p className="text-purple-600 font-semibold text-base md:text-lg">
                  Trimester ke-{profile.trimester} &nbsp;|&nbsp; Usia: {profile.age} tahun
                </p>
                <div className="mt-3 text-sm md:text-base text-gray-700 space-y-1">
                  <p><span className="font-semibold">Berat Badan:</span> {profile.weight} kg</p>
                  <p><span className="font-semibold">Tinggi Badan:</span> {profile.height} cm</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/profile')}
                className="self-start md:self-center bg-purple-700 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-md hover:bg-purple-800 transition"
                aria-label="Edit Profil"
                title="Edit Profil"
              >
                👤
              </button>
            </div>

            {/* Hasil Perhitungan Gizi */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-purple-700 mb-4 md:mb-6">Hasil Perhitungan Gizi</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center text-sm md:text-base">
                <div className="bg-purple-50 rounded-xl p-4 md:p-6 shadow-inner">
                  <p className="text-3xl md:text-4xl font-extrabold text-purple-600">{bmiData?.bmi || '-'}</p>
                  <p className="mt-1 font-semibold text-gray-700">BMI</p>
                  <p className="text-xs mt-1 text-gray-500">{bmiData?.status || 'Belum dihitung'}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 md:p-6 shadow-inner">
                  <p className="text-3xl md:text-4xl font-extrabold text-purple-600">
                    {bmiData?.calorieNeed ? `${bmiData.calorieNeed} kkal` : '-'}
                  </p>
                  <p className="mt-1 font-semibold text-gray-700">Kebutuhan Kalori</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 md:p-6 shadow-inner">
                  <p className="text-3xl md:text-4xl font-extrabold text-purple-600">
                    {bmiData?.proteinNeed ? `${bmiData.proteinNeed} g` : '-'}
                  </p>
                  <p className="mt-1 font-semibold text-gray-700">Kebutuhan Protein</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 md:p-6 shadow-inner">
                  <p className="text-3xl md:text-4xl font-extrabold text-purple-600">
                    {bmiData?.fatNeed ? `${bmiData.fatNeed} g` : '-'}
                  </p>
                  <p className="mt-1 font-semibold text-gray-700">Kebutuhan Lemak</p>
                </div>
              </div>
            </div>

            {/* Rekomendasi Makanan */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-purple-700 mb-4 md:mb-6">Rekomendasi Makanan</h2>
              <p className="mb-4 md:mb-6 text-gray-600 text-sm md:text-base max-w-xl">
                Berdasarkan hasil perhitungan gizi terakhir, berikut beberapa rekomendasi makanan yang dapat membantu Anda menjaga kesehatan dan memenuhi kebutuhan nutrisi.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {foodRecommendations.map(food => (
                  <div
                    key={food.id}
                    className="bg-purple-50 hover:bg-purple-100 cursor-pointer rounded-xl p-4 shadow-md transition-transform transform hover:-translate-y-1"
                    title={food.description}
                  >
                    <div className="text-4xl md:text-5xl mb-2 md:mb-3 select-none">{food.emoji}</div>
                    <h3 className="font-semibold text-base md:text-lg text-purple-700 mb-1">{food.name}</h3>
                    <p className="text-xs md:text-sm text-gray-600">{food.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </SidebarLayout>
  );
}
