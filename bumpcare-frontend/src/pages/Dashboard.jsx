import { useEffect, useState } from 'react';
import SidebarLayout from '../components/SidebarLayout';
import { fetchRecords } from '../presenters/predictPresenter';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecords = async () => {
      const { data, error } = await fetchRecords();
      if (!error && data) {
        setRecords(data.slice(0, 3)); 
      }
      setLoading(false);
    };

    loadRecords();
  }, []);

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-bold text-purple-700 mb-2">Halo, {user.name || 'Ibu Hamil'} 👋</h1>
      <p className="text-gray-600 mb-6">Selamat datang kembali di BumpCare.</p>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Riwayat Prediksi Terbaru</h2>
      </div>

      {loading ? (
        <p>Memuat data...</p>
      ) : records.length === 0 ? (
        <p className="text-gray-600">Belum ada riwayat prediksi.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {records.map((record) => (
            <div key={record.id} className="border rounded-lg p-4 bg-purple-100">
              <p className="text-sm text-gray-600 mb-1">
                Usia: {record.age} • Trimester: {record.trimester}
              </p>
              <p className="text-sm">
                Berat: {record.weight}kg • Tinggi: {record.height}cm
              </p>
              <p className="text-sm mt-2 font-medium">
                BMI: {record.bmi} • Kalori: {record.calorie_needs} kkal
              </p>
              <p className={`text-sm ${record.status_gizi === 'Normal' ? 'text-green-600' : 'text-red-600'}`}>
                Status: {record.status_gizi}
              </p>
            </div>
          ))}
        </div>
      )}
    </SidebarLayout>
  );
}
