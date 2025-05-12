import SidebarLayout from '../components/SidebarLayout';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-bold text-purple-700 mb-2">Halo, {user.name || 'Ibu Hamil'} 👋</h1>
      <p className="text-gray-600 mb-6">Selamat datang kembali di BumpCare.</p>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Riwayat Prediksi Terbaru</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 bg-purple-100">
            <p className="text-sm text-gray-600 mb-1">Usia: 27 • Trimester: 2</p>
            <p className="text-sm">Berat: 55kg • Tinggi: 160cm</p>
            <p className="text-sm mt-2 font-medium">BMI: 21.5 • Kalori: 2500 kkal</p>
            <p className="text-sm text-green-600">Status: Normal</p>
          </div>
        ))}
      </div>
    </SidebarLayout>
  );
}
