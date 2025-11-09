import React, { useState } from 'react';

interface SignUpProps {
  onSignUp: (email: string, password: string) => { success: boolean, message: string };
  onSwitchToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setError('');
    const result = onSignUp(email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-gray-900 text-white rounded-3xl shadow-2xl border-2 border-teal-500/50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-teal-300">Crear Cuenta</h1>
        <p className="text-gray-400 mt-2">Crea tu biblioteca de talleres personalizada.</p>
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
            minLength={6}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-lg font-bold text-teal-300 mb-2">Confirmar Contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            required
          />
        </div>
        <button type="submit" className="w-full px-6 py-3 font-semibold rounded-lg transition-colors duration-200 bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg shadow-teal-500/20">
          Registrarse
        </button>
      </form>
      <p className="text-center text-gray-400 mt-6">
        ¿Ya tienes una cuenta?{' '}
        <button onClick={onSwitchToLogin} className="font-semibold text-teal-300 hover:underline">
          Inicia sesión
        </button>
      </p>
    </div>
  );
};

export default SignUp;
