import SidebarLayout from '../components/SidebarLayout';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-bold text-purple-700 mb-2">Halo, {user.name || 'Ibu Hamil'} 👋</h1>
      <p className="text-gray-600 mb-6">Selamat datang kembali di BumpCare.</p>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Riwayat Terbaru</h2>
      </div>
    </SidebarLayout>
  );
}
