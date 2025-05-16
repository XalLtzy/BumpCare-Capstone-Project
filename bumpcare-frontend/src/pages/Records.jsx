import { useEffect, useState } from 'react';
import { fetchRecords } from '../presenters/calculatorPresenter';
import SidebarLayout from '../components/SidebarLayout';

export default function Records() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

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

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-bold text-purple-700 mb-4">Riwayat Prediksi</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {records.length === 0 ? (
        <p className="text-gray-600">Belum ada data prediksi.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {records.map((rec) => (
            <div key={rec.id} className="bg-purple-100 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Tanggal: {new Date(rec.created_at).toLocaleDateString()}</p>
              <p className="text-sm">Usia: {rec.age} • Trimester: {rec.trimester}</p>
              <p className="text-sm">Berat: {rec.weight} kg • Tinggi: {rec.height} cm</p>
              <p className="text-sm font-medium">BMI: {rec.bmi} • Kalori: {rec.calorie_needs} kkal</p>
              <p className="text-sm text-green-700">Status: {rec.status_gizi}</p>
            </div>
          ))}
        </div>
      )}
    </SidebarLayout>
  );
}
