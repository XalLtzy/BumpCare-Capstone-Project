import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../presenters/authPresenter';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

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
      toast.success('Registrasi berhasil!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registrasi gagal';
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gray-100 text-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex w-full max-w-4xl bg-[#FFF2EB] rounded-xl shadow overflow-hidden">
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
              <label htmlFor="name" className="block text-sm mb-1">Nama Lengkap</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border !border-gray-400 px-3 py-2 bg-[#FFF2EB] rounded-md outline-[#AC1754]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border !border-gray-400 px-3 py-2 bg-[#FFF2EB] rounded-md outline-[#AC1754]"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm mb-1">Kata Sandi</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border !border-gray-400 px-3 py-2 bg-[#FFF2EB] rounded-md outline-[#AC1754]"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-[#AC1754] text-white py-2 rounded-md hover:bg-[#E53888] "
            >
              Daftar
            </button>
            <p className="text-sm text-center">
              Sudah punya akun? <Link to="/login" className="underline">Masuk</Link>
            </p>
          </form>
        </motion.div>

        {/* Kanan */}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-[#FFDCDC] p-10">
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
