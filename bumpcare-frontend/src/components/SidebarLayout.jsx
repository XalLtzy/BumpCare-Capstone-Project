import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function SidebarLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Berhasil logout!');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold text-purple-700 mb-6 font-poppins">BumpCare</h2>
        <nav className="flex flex-col space-y-3 font-poppins">
          <Link to="/dashboard" className="text-gray-700 hover:text-purple-700">🏠 Dashboard</Link>
          <Link to="/calculate" className="text-gray-700 hover:text-purple-700">📝 Kalkulator</Link>
          <Link to="/records" className="text-gray-700 hover:text-purple-700">📋 Riwayat</Link>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 transition text-left mt-4 font-poppins"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
