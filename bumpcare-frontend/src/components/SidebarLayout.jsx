import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { Menu, X, Home, ClipboardList, Calculator, LogOut } from 'lucide-react';

export default function SidebarLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Berhasil logout!');
    navigate('/');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Kalkulator', path: '/calculate', icon: <Calculator size={20} /> },
    { name: 'Riwayat', path: '/records', icon: <ClipboardList size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#FFF2EB] relative">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden transition-opacity duration-500 ease-in-out"
        />
      )}

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 w-full flex items-center justify-between p-4 bg-[#FFC0CB] z-30 shadow-md">
        <h2 className="text-xl font-bold text-[#AC1754] font-poppins">BumpCare</h2>
        <button
          onClick={toggleSidebar}
          className="text-[#AC1754] p-2 rounded hover:bg-[#AC1754]/20 active:bg-[#AC1754]/30 transition-colors duration-300 ease-in-out"
        >
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          bg-[#FFC0CB] w-64 p-6 shadow-lg z-20 fixed top-16 left-0 h-full md:h-screen md:sticky md:top-0
          transform transition-transform duration-500 ease-in-out will-change-transform
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static
        `}
      >
        {/* Sidebar title desktop */}
        <h2 className="hidden md:block text-2xl font-bold text-[#AC1754] mb-8 font-poppins select-none">
          BumpCare
        </h2>

        <nav className="flex flex-col space-y-4 font-poppins">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 p-3 rounded-lg transition font-semibold
                ${location.pathname === item.path
                  ? 'bg-[#AC1754] text-white'
                  : 'text-gray-700 hover:bg-[#AC1754]/10 hover:text-[#AC1754]'}
              `}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition font-semibold mt-6"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 pt-20 md:pt-6 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
