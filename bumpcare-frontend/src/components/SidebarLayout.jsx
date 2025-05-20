import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function SidebarLayout({ children }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Berhasil logout!');
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">

      {/* Mobile navbar */}
      <div className="flex justify-between items-center bg-white p-4 shadow-md md:hidden">
        <h2 className="text-xl font-bold text-purple-700 font-poppins">BumpCare</h2>
        <button onClick={toggleSidebar} className="text-purple-700 focus:outline-none">
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar mobile & desktop */}
      <aside
        className={`
          bg-white shadow-md p-6 z-20 w-64 md:block
          ${sidebarOpen ? 'block absolute top-16 left-0 h-full' : 'hidden'}
          md:static md:h-auto
        `}
      >
        {/* Sidebar Title (visible only on desktop) */}
        <h2 className="text-xl font-bold text-purple-700 mb-6 font-poppins hidden md:block">BumpCare</h2>

        <nav className="flex flex-col space-y-3 font-poppins">
          <Link to="/dashboard" className="text-gray-700 hover:text-purple-700">🏠 Dashboard</Link>
          <Link to="/calculate" className="text-gray-700 hover:text-purple-700">📝 Kalkulator</Link>
          <Link to="/records" className="text-gray-700 hover:text-purple-700">📋 Riwayat</Link>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 transition text-left mt-4"
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
