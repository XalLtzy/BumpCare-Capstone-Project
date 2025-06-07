import { useEffect, useState, useRef } from 'react';
import SidebarLayout from '../components/SidebarLayout';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../presenters/userPresenter';
import { calculateNutrition } from '../presenters/calculatorPresenter';
import { motion } from 'framer-motion';
import { fadeVariant, slideUpVariant, fadeInDelayed } from '../animations/variants';
import toast, { Toaster } from 'react-hot-toast';
import { HiUser, HiScale, HiClock, HiOutlineFire, HiOutlineBeaker, HiOutlineHeart } from 'react-icons/hi';
import ProfileInfo from '../components/ProfileInfo';
import InfoCard from '../components/InfoCard';

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
        prePregnancyWeight: profile.pre_pregnancy_weight,
        weight: profile.weight,
        height: profile.height,
        trimester: profile.trimester,
        activity_level: profile.activity_level,
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
          <div className="w-14 h-14 border-4 border-[#AC1754] rounded-full animate-spin"></div>
          <p className="text-lg text-[#AC1754] font-semibold">Memuat Data Anda...</p>
        </div>
      </SidebarLayout>
    );
  }

  const profileComplete = isProfileComplete(profile);

  return (
    <SidebarLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <motion.main {...fadeVariant} className={`px-4 pb-10 ${animatedClass} max-w-full`}>
        {!profileComplete ? (
          <motion.section
            {...slideUpVariant}
            className={`max-w-xl mx-auto bg-[#FFE5E8] p-6 sm:p-8 rounded-3xl shadow-lg text-center ${animatedClass}`}
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-[#AC1754]">
              Profil Anda belum lengkap
            </h2>
            <p className="mb-8 sm:mb-10 text-[#7B4B57] text-base sm:text-lg">
              Silakan lengkapi data pribadi Anda terlebih dahulu untuk menghitung kebutuhan Gizi.
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="inline-block bg-gradient-to-r from-[#AC1754] to-[#E53888] hover:from-[#E53888] hover:to-[#AC1754] text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-xl font-semibold transition shadow-lg"
            >
              Isi Profil Sekarang
            </button>
          </motion.section>
        ) : (
          <motion.section
            {...fadeInDelayed}
            className={`w-full max-w-6xl bg-[#FFE5E8] rounded-3xl shadow-xl p-6 sm:p-8 space-y-10 mx-auto ${animatedClass}`}
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-[#AC1754] tracking-wide">
              Kalkulator Kebutuhan Kalori & Pemantauan BMI
            </h1>

            <motion.div
              {...slideUpVariant}
              className="rounded-2xl p-4 sm:p-6 shadow-inner grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 bg-[#FFF2EB] text-[#7B4B57] font-semibold text-base sm:text-lg"
            >
              <ProfileInfo icon={<HiUser className="w-5 h-5 sm:w-6 sm:h-6 text-[#AC1754]" />} label="Usia" value={`${profile.age} tahun`} />
              <ProfileInfo icon={<HiScale className="w-5 h-5 sm:w-6 sm:h-6 text-[#AC1754]" />} label="Berat Badan Sebelum Kehamilan" value={`${profile.pre_pregnancy_weight} kg`} />
              <ProfileInfo icon={<HiScale className="w-5 h-5 sm:w-6 sm:h-6 text-[#AC1754]" />} label="Berat Badan Sekarang" value={`${profile.weight} kg`} />
              <ProfileInfo icon={<HiClock className="w-5 h-5 sm:w-6 sm:h-6 text-[#AC1754]" />} label="Tinggi Badan" value={`${profile.height} cm`} />
              <ProfileInfo icon={<HiOutlineFire className="w-5 h-5 sm:w-6 sm:h-6 text-[#AC1754]" />} label="Trimester" value={profile.trimester} />
              <ProfileInfo icon={<HiOutlineHeart className="w-5 h-5 sm:w-6 sm:h-6 text-[#AC1754]" />} label="Aktivitas Harian" value={profile.activity_level} />
            </motion.div>

            <motion.div {...fadeInDelayed} className="rounded-2xl p-4 sm:p-6 shadow-inner bg-[#FFF2EB] text-[#AC1754] space-y-4 text-sm sm:text-base leading-relaxed">
              <h2 className="text-xl sm:text-2xl font-bold">Mengapa penting menghitung kebutuhan kalori, BMI, protein, dan lemak selama kehamilan?</h2>
              <p className='black'>
                Selama masa kehamilan, kebutuhan nutrisi Anda berubah untuk mendukung pertumbuhan dan perkembangan janin secara optimal. Dengan menghitung kebutuhan kalori, BMI, protein, dan lemak harian, Anda dapat memastikan asupan nutrisi yang tepat sehingga kesehatan ibu dan bayi terjaga, serta mengurangi risiko komplikasi.
              </p>
            </motion.div>

            <motion.button
              {...fadeVariant}
              onClick={handleCalculate}
              disabled={loadingCalc}
              className={`w-full py-4 sm:py-5 rounded-2xl font-semibold text-white text-lg sm:text-xl transition shadow-lg
                ${loadingCalc ? 'bg-[#E53888] cursor-not-allowed' : 'bg-gradient-to-r from-[#AC1754] to-[#E53888] hover:from-[#E53888] hover:to-[#AC1754]'}
              `}
            >
              {loadingCalc ? 'Menghitung...' : 'Hitung Kebutuhan Saya'}
            </motion.button>

            {error && (
              <motion.p {...fadeInDelayed} className="text-red-600 text-center font-semibold text-base sm:text-lg">
                {error}
              </motion.p>
            )}

            {result && (
              <motion.div {...fadeInDelayed} className="p-6 sm:p-8 space-y-6 text-[#AC1754] bg-[#FFF2EB] rounded-2xl shadow-lg max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-center tracking-wide">Hasil Perhitungan</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-center">
                  <InfoCard label="BMI" value={result.bmi} icon={<HiScale className="w-7 h-7 mx-auto mb-1" />} />
                  <InfoCard label="Status BMI" value={result.bmiStatus || result.status} icon={<HiUser className="w-7 h-7 mx-auto mb-1" />} />
                  <InfoCard label="Kebutuhan Kalori" value={`${result.calorieNeed} kkal/hari`} icon={<HiOutlineFire className="w-7 h-7 mx-auto mb-1" />} />
                  {result.proteinNeed && <InfoCard label="Kebutuhan Protein" value={`${result.proteinNeed} g/hari`} icon={<HiOutlineBeaker className="w-7 h-7 mx-auto mb-1" />} />}
                  {result.fatNeed && <InfoCard label="Kebutuhan Lemak" value={`${result.fatNeed} g/hari`} icon={<HiOutlineHeart className="w-7 h-7 mx-auto mb-1" />} />}
                </div>
              </motion.div>
            )}
          </motion.section>
        )}
      </motion.main>
    </SidebarLayout>
  );
}
