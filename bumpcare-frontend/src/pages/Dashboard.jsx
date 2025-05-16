import { useEffect, useState } from 'react';
import SidebarLayout from '../components/SidebarLayout';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../presenters/userPresenter';

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

    const stored = localStorage.getItem('bmiResult');
    if (stored) {
      setBmiData(JSON.parse(stored));
    }
  }, []);

  if (loading) return <SidebarLayout><p className="p-6">Loading...</p></SidebarLayout>;

  const isProfileComplete = profile &&
    profile.age && profile.weight && profile.height && profile.trimester;

  return (
    <SidebarLayout>
      <div className="relative min-h-screen bg-purple-50 p-6">
        {!isProfileComplete ? (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">
              Profil Anda belum lengkap
            </h2>
            <p className="mb-6">
              Silakan lengkapi data pribadi Anda terlebih dahulu untuk mulai menggunakan aplikasi.
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition"
            >
              Isi Profil Sekarang
            </button>
          </div>
        ) : (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Halo, {profile.name} 👋</h2>
            <p className="mb-1">Trimester ke-{profile.trimester}</p>
            <p className="mb-6">Usia: {profile.age} tahun</p>

            <div className="space-y-2">
              <p><strong>Berat Badan:</strong> {profile.weight} kg</p>
              <p><strong>Tinggi Badan:</strong> {profile.height} cm</p>
              <p><strong>BMI:</strong> {bmiData?.bmi || '-'} {bmiData?.status ? `(${bmiData.status})` : '(Belum dihitung)'}</p>
              <p><strong>Kebutuhan Kalori:</strong> {bmiData?.calorieNeed ? `${bmiData.calorieNeed} kkal/hari` : 'Belum dihitung'}</p>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate('/profile')}
          className="fixed bottom-8 right-8 bg-purple-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-purple-800 transition"
          aria-label="Edit Profil"
          title="Edit Profil"
        >
          👤
        </button>
      </div>
    </SidebarLayout>
  );
}
