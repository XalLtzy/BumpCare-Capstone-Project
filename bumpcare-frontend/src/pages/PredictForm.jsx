import { useState } from 'react';
import { predictHealth } from '../presenters/predictPresenter';
import SidebarLayout from '../components/SidebarLayout';

export default function PredictForm() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [trimester, setTrimester] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setResult(null);

  const { data, error } = await predictHealth({
  age: Number(age),
  weight: Number(weight),
  height: Number(height),
  trimester: Number(trimester),
});


  if (error) {
    setError(error);
  } else {
    setResult(data);
  }
};

  return (
    <SidebarLayout>
    <div className="min-h-screen bg-purple-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">Formulir Prediksi Kesehatan Ibu Hamil</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Usia (tahun)</label>
            <input
              type="number"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border px-3 py-2 rounded-md outline-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Berat Badan (kg)</label>
            <input
              type="number"
              required
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border px-3 py-2 rounded-md outline-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tinggi Badan (cm)</label>
            <input
              type="number"
              required
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full border px-3 py-2 rounded-md outline-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Trimester</label>
            <select
              required
              value={trimester}
              onChange={(e) => setTrimester(e.target.value)}
              className="w-full border px-3 py-2 rounded-md outline-purple-400"
            >
              <option value="">Pilih Trimester</option>
              <option value="1">Trimester 1</option>
              <option value="2">Trimester 2</option>
              <option value="3">Trimester 3</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Prediksi Sekarang
            </button>
          </div>
        </form>

        {error && (
          <div className="text-red-500 text-sm text-center mt-4">{error}</div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-purple-100 rounded-lg text-center space-y-2">
            <p><strong>BMI:</strong> {result.bmi}</p>
            <p><strong>Kebutuhan Kalori:</strong> {result.calorieNeed} kkal/hari</p>
            <p><strong>Status Gizi:</strong> {result.statusGizi}</p>
          </div>
        )}
      </div>
    </div>
    </SidebarLayout>
  );
}
