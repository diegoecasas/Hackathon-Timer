import React from 'react';

interface UserInfoProps {
  userEmail: string;
  onLogout: () => void;
  className?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ userEmail, onLogout, className = '' }) => {
  return (
    <div className={`text-right ${className}`}>
      <p className="text-gray-400 text-sm">Sesión iniciada como:</p>
      <p className="text-teal-300 font-semibold truncate max-w-[200px] sm:max-w-xs" title={userEmail}>{userEmail}</p>
      <button onClick={onLogout} className="mt-2 px-3 py-1 text-sm font-semibold rounded-md bg-gray-700 text-white hover:bg-gray-600 transition-colors">
        Cerrar Sesión
      </button>
    </div>
  );
};

export default UserInfo;
