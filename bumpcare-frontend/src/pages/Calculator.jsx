import { useEffect, useState } from 'react';
import SidebarLayout from '../components/SidebarLayout';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../presenters/userPresenter';
import { calculateNutrition } from '../presenters/calculatorPresenter';

export default function Calculator() {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingCalc, setLoadingCalc] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile()
      .then(data => {
        setProfile(data);
        setLoadingProfile(false);
      })
      .catch(() => {
        setProfile(null);
        setLoadingProfile(false);
      });
  }, []);

  const isProfileComplete = profile &&
    profile.age && profile.weight && profile.height && profile.trimester;

  const handleCalculate = async () => {
    setError('');
    setResult(null);
    if (!isProfileComplete) {
      setError('Profil belum lengkap. Silakan lengkapi profil Anda terlebih dahulu.');
      return;
    }
    setLoadingCalc(true);
    const { data, error } = await calculateNutrition({
      age: profile.age,
      weight: profile.weight,
      height: profile.height,
      trimester: profile.trimester,
    });
    setLoadingCalc(false);

    if (error) {
      setError(error);
      setResult(null);
    } else {
      setResult(data);
    }
  };

  if (loadingProfile) {
    return (
      <SidebarLayout>
        <div className="flex flex-col items-center justify-center h-screen px-4 space-y-4">
          <div className="w-14 h-14 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-500">Memuat profil Anda...</p>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <main className="min-h-screen bg-gradient-to-tr from-purple-50 to-purple-100 p-4 sm:p-6 md:p-8 flex flex-col items-center">
        {!isProfileComplete ? (
          <section className="w-full max-w-xl bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-6 text-purple-700">
              Profil Anda belum lengkap
            </h2>
            <p className="mb-8 text-gray-600">
              Silakan lengkapi data pribadi Anda terlebih dahulu untuk menghitung kebutuhan kalori dan BMI.
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-purple-700 transition"
            >
              Isi Profil Sekarang
            </button>
          </section>
        ) : (
          <section className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-10 space-y-8 mx-auto">
            <h1 className="text-3xl font-extrabold text-purple-800 text-center">
              Kalkulator Kebutuhan Kalori & Pemantauan BMI
            </h1>

            <div className="bg-purple-100 rounded-xl p-6 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-purple-700 font-semibold text-base sm:text-lg">
              <p><span className="text-purple-900 font-bold">Usia:</span> {profile.age} tahun</p>
              <p><span className="text-purple-900 font-bold">Berat Badan:</span> {profile.weight} kg</p>
              <p><span className="text-purple-900 font-bold">Tinggi Badan:</span> {profile.height} cm</p>
              <p><span className="text-purple-900 font-bold">Trimester:</span> {profile.trimester}</p>
            </div>

            <div className="bg-white border-l-4 border-purple-600 p-6 rounded-lg shadow-md text-purple-900 space-y-3">
              <h2 className="text-xl font-bold">Mengapa Anda perlu menghitung kalori & BMI?</h2>
              <p className="text-gray-700 leading-relaxed">
                Menghitung kebutuhan kalori dan BMI selama kehamilan membantu Anda menjaga kesehatan ibu dan janin. Dengan data yang tepat, Anda dapat mengatur pola makan agar nutrisi terpenuhi tanpa berlebihan atau kekurangan.
              </p>
            </div>

            <button
              onClick={handleCalculate}
              disabled={loadingCalc}
              className={`w-full py-4 rounded-xl font-semibold text-white text-lg sm:text-xl transition
                ${loadingCalc ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}
              `}
            >
              {loadingCalc ? 'Menghitung...' : 'Hitung Kebutuhan Saya'}
            </button>

            {error && (
              <p className="text-red-600 text-center font-semibold">{error}</p>
            )}

            {result && (
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-inner space-y-6 text-purple-800">
                <h2 className="text-2xl font-bold text-center">Hasil Perhitungan</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                  <div className="bg-white rounded-xl p-6 shadow-md border border-purple-100">
                    <p className="text-sm text-purple-500">BMI</p>
                    <p className="text-3xl font-bold">{result.bmi}</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-purple-100">
                    <p className="text-sm text-purple-500">Status Gizi</p>
                    <p className="text-2xl font-semibold">{result.statusGizi || result.status}</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-purple-100">
                    <p className="text-sm text-purple-500">Kebutuhan Kalori</p>
                    <p className="text-2xl font-bold">{result.calorieNeed} <span className="text-sm font-normal">kkal/hari</span></p>
                  </div>

                  {result.proteinNeed && (
                    <div className="bg-white rounded-xl p-6 shadow-md border border-purple-100">
                      <p className="text-sm text-purple-500">Kebutuhan Protein</p>
                      <p className="text-xl font-semibold">{result.proteinNeed} g/hari</p>
                    </div>
                  )}

                  {result.fatNeed && (
                    <div className="bg-white rounded-xl p-6 shadow-md border border-purple-100">
                      <p className="text-sm text-purple-500">Kebutuhan Lemak</p>
                      <p className="text-xl font-semibold">{result.fatNeed} g/hari</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </SidebarLayout>
  );
}
