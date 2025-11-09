import React from 'react';
import { Phase } from '../types';

interface PhaseListProps {
  phases: Phase[];
  currentPhaseIndex: number;
}

const PhaseList: React.FC<PhaseListProps> = ({ phases, currentPhaseIndex }) => {
  return (
    <div className="bg-white/10 dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-white/20 flex flex-col flex-1 min-h-0">
      <h3 className="text-xl font-bold text-teal-300 mb-4 flex-shrink-0">Cronograma del Taller de Innovación</h3>
      <ul className="space-y-3 overflow-y-auto pr-2 flex-1">
        {phases.map((phase, index) => (
          <li
            key={phase.id}
            className={`flex justify-between items-center p-3 rounded-lg transition-all duration-300 ${
              index === currentPhaseIndex
                ? 'bg-teal-500/30 text-white scale-105 shadow-md'
                : 'bg-gray-700/50 text-gray-300'
            }`}
          >
            <div className="flex items-center">
              <span className={`font-bold mr-3 ${index === currentPhaseIndex ? 'text-teal-300' : 'text-gray-400'}`}>
                {index + 1}
              </span>
              <span className="truncate">{phase.name}</span>
            </div>
            <span className="font-mono text-sm flex-shrink-0 ml-2">{phase.duration} min</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhaseList;