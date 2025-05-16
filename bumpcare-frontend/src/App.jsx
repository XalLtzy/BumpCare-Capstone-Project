import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
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
      <AnimatedRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
            color: '#f9fafb',
            padding: '16px 24px',
            borderRadius: '14px',
            boxShadow: '0 8px 24px rgba(124, 58, 237, 0.3)',
            fontWeight: '700',
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: '0.02em',
          },
          success: {
            iconTheme: {
              primary: '#d1fae5',
              secondary: '#065f46',
            },
          },
          error: {
            iconTheme: {
              primary: '#fecaca',
              secondary: '#7f1d1d',
            },
          },
        }}
      />
    </BrowserRouter>
  );
}
