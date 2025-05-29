import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../presenters/authPresenter';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast'; 
import {
  fadeVariant,
  slideUpVariant,
  scaleInVariant,
  fadeInDelayed,
} from '../animations/variants';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await loginUser({ email, password });
      toast.success('Berhasil login!'); 
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login gagal';
      setErrorMsg(msg);
      toast.error(msg); 
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      {...fadeVariant}
    >
      <div className="flex w-full max-w-5xl bg-[#FFF2EB] rounded-xl shadow overflow-hidden">
        {/* Kiri */}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-[#FFDCDC] p-10">
          <motion.img
            src="/src/assets/images/Bumil.png"
            alt="Ilustrasi"
            className="w-3/4 mb-6"
            {...scaleInVariant}
          />
          <motion.h2 className="text-2xl font-bold" {...fadeInDelayed}>
            BumpCare
          </motion.h2>
          <p className="text-gray-500 text-center text-sm mt-2">
            A Smart Pregnancy
          </p>
          <p className="text-gray-500 text-center text-sm mt-2">
            Companion for
          </p>
          <p className="text-gray-500 text-center text-sm mt-2">
            Maternal Well-being
          </p>
        </div>

        {/* Kanan */}
        <motion.div className="w-full md:w-1/2 p-12 md:p-16" {...slideUpVariant}>
          <h2 className="text-3xl font-bold mb-8 text-center">Masuk</h2>
          {errorMsg && (
            <div className="text-red-500 text-sm text-center mb-4">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border !border-gray-400 px-4 py-3 bg-[#FFF2EB] rounded-md outline-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Kata Sandi</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border !border-gray-400 px-4 py-3 bg-[#FFF2EB] rounded-md outline-purple-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 text-lg"
            >
              Masuk
            </button>
            <p className="text-sm text-center">
              Belum punya akun?{' '}
              <Link to="/register" className="underline">
                Daftar
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
