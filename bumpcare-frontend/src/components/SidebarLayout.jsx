import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import {
  Menu,
  X,
  Home,
  ClipboardList,
  Calculator,
  LogOut,
  MessageCircle,
} from 'lucide-react';

export default function SidebarLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Berhasil logout!');
    navigate('/');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    {
      name: 'Kalkulator',
      icon: <Calculator size={20} />,
      children: [
        { name: 'Kalkulator Kehamilan', path: '/calculate' },
        { name: 'Klasifikasi Gizi', path: '/klasifikasi-gizi' },
        { name: 'Klasifikasi Risiko Kehamilan', path: '/klasifikasi-resiko' },
      ],
    },
    { name: 'Riwayat', path: '/records', icon: <ClipboardList size={20} /> },
    { name: 'Testimoni', path: '/testimoni', icon: <MessageCircle size={20} /> },
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
        <h2 className="hidden md:block text-2xl font-bold text-[#AC1754] mb-8 font-poppins select-none">
          BumpCare
        </h2>

        <nav className="flex flex-col space-y-4 font-poppins">
          {navItems.map((item) => (
            <div key={item.name} className="relative">
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === item.name ? null : item.name)
                    }
                    className={`flex items-center justify-between w-full gap-3 p-3 rounded-lg transition font-semibold
                      ${openMenu === item.name || item.children.some(child => location.pathname === child.path)
                        ? 'bg-[#AC1754] text-white'
                        : 'text-gray-700 hover:bg-[#AC1754]/10 hover:text-[#AC1754]'}`}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      {item.name}
                    </span>
                    <span>{openMenu === item.name ? '▲' : '▼'}</span>
                  </button>

                  <div className={`ml-6 mt-2 space-y-1 transition-all duration-200 ease-in-out ${openMenu === item.name ? 'block' : 'hidden'}`}>
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`flex items-start px-3 py-2 rounded-md text-sm font-medium font-poppins transition-all duration-200
                          before:content-['•'] before:mr-2 before:text-[#AC1754]
                          ${location.pathname === subItem.path
                            ? 'bg-[#AC1754]/80 text-white'
                            : 'text-gray-700 hover:bg-[#AC1754]/10 hover:text-[#AC1754]'}`}
                        onClick={() => {
                          setSidebarOpen(false);
                          setOpenMenu(null);
                        }}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition font-semibold
                    ${location.pathname === item.path
                      ? 'bg-[#AC1754] text-white'
                      : 'text-gray-700 hover:bg-[#AC1754]/10 hover:text-[#AC1754]'}`}
                  onClick={() => {
                    setSidebarOpen(false);
                    setOpenMenu(null);
                  }}
                >
                  {item.icon}
                  {item.name}
                </Link>
              )}
            </div>
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
