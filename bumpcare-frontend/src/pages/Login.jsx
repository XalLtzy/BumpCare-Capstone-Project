import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../presenters/authPresenter'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const user = await loginUser({ email, password });
      navigate('/dashboard')
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Login gagal');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow overflow-hidden">
        {/* Kiri */}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-gray-50 p-8">
          <img src="/src/assets/images/Bumil.png" alt="Ilustrasi" className="w-3/4 mb-6" />
          <h2 className="text-2xl font-bold">BumpCare</h2>
          <p className="text-gray-500 text-center text-sm mt-2">A Smart Pregnancy</p>
          <p className="text-gray-500 text-center text-sm mt-2">Companion for</p>
          <p className="text-gray-500 text-center text-sm mt-2">Maternal Well-being</p>
        </div>

        {/* Kanan */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Masuk</h2>
          {errorMsg && <div className="text-red-500 text-sm text-center mb-4">{errorMsg}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
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
            <button type="submit" className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800">
              Masuk
            </button>
            <p className="text-sm text-center">
              Belum punya akun? <Link to="/register" className="underline">Daftar</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
