import { useEffect, useState, useRef } from 'react';
import SidebarLayout from '../components/SidebarLayout';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../presenters/userPresenter';
import { calculateNutrition } from '../presenters/calculatorPresenter';
import { motion } from 'framer-motion';
import { fadeVariant, slideUpVariant, fadeInDelayed } from '../animations/variants';
import toast, { Toaster } from 'react-hot-toast';

export default function Calculator() {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingCalc, setLoadingCalc] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [hasCalculatedOnce, setHasCalculatedOnce] = useState(false);

  const navigate = useNavigate();
  const lastClickTime = useRef(0);
  const lastResult = useRef(null);

  const isProfileComplete = (data) =>
    data?.age && data?.weight && data?.height && data?.trimester;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch {
        setProfile(null);
      } finally {
        setLoadingProfile(false);
        setResult(null);
        setError('');
        setHasCalculatedOnce(false);
        lastClickTime.current = 0;
        lastResult.current = null;
      }
    };
    fetchProfile();
  }, []);

  const handleCalculate = async () => {
    setError('');
    const now = Date.now();

    if (!isProfileComplete(profile)) {
      setError('Profil belum lengkap. Silakan lengkapi profil Anda terlebih dahulu.');
      return;
    }

    if (
      hasCalculatedOnce &&
      lastResult.current &&
      now - lastClickTime.current < 1500
    ) {
      toast.success('Ini adalah hasil perhitungan terbaru');
      return;
    }

    lastClickTime.current = now;
    setLoadingCalc(true);

    try {
      const { data, error: calcError } = await calculateNutrition({
        age: profile.age,
        weight: profile.weight,
        height: profile.height,
        trimester: profile.trimester,
      });

      if (calcError) {
        setError(calcError);
        setResult(null);
        lastResult.current = null;
        setHasCalculatedOnce(false);
      } else {
        setResult(data);
        lastResult.current = data;
        setHasCalculatedOnce(true);
      }
    } catch (err) {
      setError('Terjadi kesalahan saat melakukan perhitungan.');
    } finally {
      setLoadingCalc(false);
    }
  };

  const animatedClass = 'will-change-transform will-change-opacity';

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

  const profileComplete = isProfileComplete(profile);

  return (
    <SidebarLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <motion.main {...fadeVariant} className={`px-4 pb-10 ${animatedClass}`}>
        {!profileComplete ? (
          <motion.section
            {...slideUpVariant}
            className={`max-w-xl mx-auto bg-[#FFDCDC] p-6 md:p-10 rounded-2xl shadow-lg text-center ${animatedClass}`}
          >
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
          </motion.section>
        ) : (
          <motion.section
            {...fadeInDelayed}
            className={`w-full max-w-5xl bg-[#FFDCDC] rounded-2xl shadow-lg p-4 sm:p-6 md:p-10 space-y-8 mx-auto ${animatedClass}`}
          >
            <h1 className="text-3xl font-extrabold text-center text-[#AC1754]">
              Kalkulator Kebutuhan Kalori & Pemantauan BMI
            </h1>

            <motion.div
              {...slideUpVariant}
              className="rounded-xl p-4 md:p-6 shadow-inner grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-semibold text-base sm:text-lg bg-[#FFF2EB] text-black"
            >
              <p><span className="font-bold">Usia:</span> {profile.age} tahun</p>
              <p><span className="font-bold">Berat Badan:</span> {profile.weight} kg</p>
              <p><span className="font-bold">Tinggi Badan:</span> {profile.height} cm</p>
              <p><span className="font-bold">Trimester:</span> {profile.trimester}</p>
            </motion.div>

            <motion.div {...fadeInDelayed} className="rounded-xl p-4 md:p-6 shadow-inner space-y-3 bg-[#FFF2EB]">
              <h2 className="text-xl font-bold text-[#AC1754]">
                Mengapa penting menghitung kebutuhan kalori, BMI, protein, dan lemak selama kehamilan?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Selama masa kehamilan, kebutuhan nutrisi Anda berubah untuk mendukung pertumbuhan dan perkembangan janin secara optimal. Dengan menghitung kebutuhan kalori, BMI, protein, dan lemak harian, Anda dapat memastikan asupan nutrisi yang tepat sehingga kesehatan ibu dan bayi terjaga, serta mengurangi risiko komplikasi.
              </p>
            </motion.div>

            <motion.button
              {...fadeVariant}
              onClick={handleCalculate}
              disabled={loadingCalc}
              className={`w-full py-4 rounded-xl font-semibold text-white text-lg sm:text-xl transition
                ${loadingCalc ? 'bg-[#E53888] cursor-not-allowed' : 'bg-[#AC1754] hover:bg-[#E53888]'}
              `}
            >
              {loadingCalc ? 'Menghitung...' : 'Hitung Kebutuhan Saya'}
            </motion.button>

            {error && (
              <motion.p {...fadeInDelayed} className="text-red-600 text-center font-semibold">
                {error}
              </motion.p>
            )}

            {result && (
              <motion.div {...fadeInDelayed} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-inner space-y-6 text-purple-800">
                <h2 className="text-2xl font-bold text-center">Hasil Perhitungan</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                  <InfoCard label="BMI" value={result.bmi} />
                  <InfoCard label="Status BMI" value={result.bmiStatus || result.status} />
                  <InfoCard label="Kebutuhan Kalori" value={`${result.calorieNeed} kkal/hari`} />
                  {result.proteinNeed && <InfoCard label="Kebutuhan Protein" value={`${result.proteinNeed} g/hari`} />}
                  {result.fatNeed && <InfoCard label="Kebutuhan Lemak" value={`${result.fatNeed} g/hari`} />}
                </div>
              </motion.div>
            )}
          </motion.section>
        )}
      </motion.main>
    </SidebarLayout>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-purple-100">
      <p className="text-sm text-purple-500">{label}</p>
      <p className="text-xl sm:text-2xl font-semibold">{value}</p>
    </div>
  );
}
