import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { useEffect } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Calculator from './pages/Calculator';
import Records from './pages/Records';

function PageTransition({ children }) {
  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/calculate" element={<PageTransition><Calculator /></PageTransition>} />
        <Route path="/records" element={<PageTransition><Records /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            zIndex: 9999,
            background: '#1e1b4b',
            color: '#f3f4f6',
            padding: '14px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(30, 27, 75, 0.3)',
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.95rem',
            cursor: 'pointer',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#166534',
            },
          },
          error: {
            iconTheme: {
              primary: '#f87171',
              secondary: '#7f1d1d',
            },
          },
        }}
        toast={(t) => ({
          ...t,
          onClick: () => toast.dismiss(t.id),
        })}
      />
    </BrowserRouter>
  );
}
