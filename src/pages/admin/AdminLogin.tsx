import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Leaf } from 'lucide-react';
import { adminLogin } from '../../lib/adminAuth';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (adminLogin(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Mot de passe incorrect.');
      setPassword('');
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-stone-900 flex items-center justify-center mx-auto mb-4">
            <Leaf size={24} className="text-nude-400" />
          </div>
          <h1 className="font-serif text-2xl text-stone-800 font-light">Soléana</h1>
          <p className="text-stone-500 text-sm mt-1">Espace administration</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nude-300 focus:border-transparent"
                placeholder="••••••••"
                autoFocus
              />
            </div>
            {error && <p className="mt-2 text-red-500 text-xs">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            Accéder à l'admin
          </button>
        </form>
      </div>
    </div>
  );
}
