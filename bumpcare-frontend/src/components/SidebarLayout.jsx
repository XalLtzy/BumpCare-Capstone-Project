import { Link, useNavigate } from 'react-router-dom';

export default function SidebarLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold text-purple-700 mb-6">BumpCare</h2>
        <nav className="flex flex-col space-y-3">
          <Link to="/dashboard" className="text-gray-700 hover:text-purple-700">🏠 Dashboard</Link>
          <Link to="/predict" className="text-gray-700 hover:text-purple-700">📝 Prediksi Baru</Link>
          <Link to="/records" className="text-gray-700 hover:text-purple-700">📋 Riwayat</Link>
          <button onClick={handleLogout} className="text-red-500 hover:underline text-left mt-4">🚪 Logout</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}