import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../presenters/authPresenter';
import { motion } from 'framer-motion';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await registerUser({ name, email, password });
      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Registrasi gagal');
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow overflow-hidden">
        {/* Kiri */}
        <motion.div 
          className="w-full md:w-1/2 p-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Daftar</h2>
          {errorMsg && (
            <div className="text-red-500 text-sm text-center mb-4">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded-md outline-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-3 py-2 rounded-md outline-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Kata Sandi</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded-md outline-purple-400"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800"
            >
              Daftar
            </button>
            <p className="text-sm text-center">
              Sudah punya akun? <Link to="/login" className="underline">Masuk</Link>
            </p>
          </form>
        </motion.div>

        {/* Kanan */}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-gray-50 p-8">
          <motion.img
            src="/src/assets/images/Bumil.png"
            alt="Ilustrasi"
            className="w-3/4 mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.h2 
            className="text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            BumpCare
          </motion.h2>
          <p className="text-gray-500 text-center text-sm mt-2">A Smart Pregnancy</p>
          <p className="text-gray-500 text-center text-sm mt-2">Companion for</p>
          <p className="text-gray-500 text-center text-sm mt-2">Maternal Well-being</p>
        </div>
      </div>
    </motion.div>
  );
}
