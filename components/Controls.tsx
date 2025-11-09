import React from 'react';
import { TimerStatus } from '../types';

interface ControlsProps {
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onGoToLibrary: () => void;
}

const Button: React.FC<{ onClick: () => void; className: string; children: React.ReactNode }> = ({ onClick, className, children }) => (
  <button onClick={onClick} className={`px-8 py-3 text-lg font-bold rounded-full transition-all duration-300 focus:outline-none focus:ring-4 ${className}`}>
    {children}
  </button>
);

const Controls: React.FC<ControlsProps> = ({ status, onStart, onPause, onReset, onGoToLibrary }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
      {(status === TimerStatus.IDLE || status === TimerStatus.PAUSED) && (
        <Button onClick={onStart} className="bg-teal-500 text-white hover:bg-teal-400 focus:ring-teal-300 shadow-lg hover:shadow-xl">
          {status === TimerStatus.IDLE ? 'Iniciar' : 'Reanudar'}
        </Button>
      )}
      {status === TimerStatus.RUNNING && (
        <Button onClick={onPause} className="bg-yellow-500 text-white hover:bg-yellow-400 focus:ring-yellow-300 shadow-lg hover:shadow-xl">
          Pausar
        </Button>
      )}
      <Button onClick={onReset} className="bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400">
        Reiniciar Fase
      </Button>
       <Button onClick={onGoToLibrary} className="bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-400">
        Ver Talleres
      </Button>
    </div>
  );
};

export default Controls;