import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, password: string) => { success: boolean, message: string };
  onSwitchToSignUp: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = onLogin(email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-gray-900 text-white rounded-3xl shadow-2xl border-2 border-teal-500/50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-teal-300">Iniciar Sesión</h1>
        <p className="text-gray-400 mt-2">Accede a tu biblioteca de talleres.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-400 bg-red-500/20 p-3 rounded-md text-center">{error}</p>}
        <div>
          <label htmlFor="email" className="block text-lg font-bold text-teal-300 mb-2">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-lg font-bold text-teal-300 mb-2">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            required
          />
        </div>
        <button type="submit" className="w-full px-6 py-3 font-semibold rounded-lg transition-colors duration-200 bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg shadow-teal-500/20">
          Entrar
        </button>
      </form>
      <p className="text-center text-gray-400 mt-6">
        ¿No tienes una cuenta?{' '}
        <button onClick={onSwitchToSignUp} className="font-semibold text-teal-300 hover:underline">
          Regístrate
        </button>
      </p>
    </div>
  );
};

export default Login;
