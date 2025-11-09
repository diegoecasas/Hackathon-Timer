import React from 'react';
import CircularProgress from './CircularProgress';

interface TimerDisplayProps {
  phaseName: string;
  phaseTimeRemaining: number;
  totalTimeRemaining: number;
  phasePercentage: number;
  isLightBg?: boolean;
  progressColorClass?: string;
  trackColorClass?: string;
}

const formatTime = (seconds: number) => {
  if (seconds < 0) seconds = 0;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const hStr = h.toString().padStart(2, '0');
  const mStr = m.toString().padStart(2, '0');
  const sStr = s.toString().padStart(2, '0');

  if (h > 0) {
    return `${hStr}:${mStr}:${sStr}`;
  }
  return `${mStr}:${sStr}`;
};


const TimerDisplay: React.FC<TimerDisplayProps> = ({
  phaseName,
  phaseTimeRemaining,
  totalTimeRemaining,
  phasePercentage,
  isLightBg = false,
  progressColorClass = 'text-teal-400',
  trackColorClass = 'text-teal-400/20',
}) => {
  const textColorClass = isLightBg ? 'text-black' : 'text-white';
  const accentColorClass = isLightBg ? 'text-gray-900' : 'text-teal-300';
  const mutedColorClass = isLightBg ? 'text-gray-700' : 'text-gray-400';
  const innerBgClass = isLightBg ? 'bg-white/60' : 'bg-[#0a192f]';

  return (
    // Relative container for positioning all concentric circles
    <div className="relative w-80 h-80 sm:w-96 sm:h-96">
      
      {/* 1. Solid background circle in the center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-52 h-52 sm:w-64 sm:h-64 ${innerBgClass} rounded-full shadow-2xl transition-colors duration-500`} />
      </div>

      {/* 2. Inner Decorative Static Ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Mobile */}
        <div className="block sm:hidden">
          <CircularProgress
            percentage={100}
            size={250} // Smaller than outer ring
            strokeWidth={20} // Thicker
            color="text-slate-800"
            trackColor="text-slate-800"
          />
        </div>
        {/* Desktop */}
        <div className="hidden sm:block">
          <CircularProgress
            percentage={100}
            size={300} // Smaller than outer ring
            strokeWidth={24} // Thicker
            color="text-slate-800"
            trackColor="text-slate-800"
          />
        </div>
      </div>
      
      {/* 3. Outer Progress Ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Mobile */}
        <div className="block sm:hidden">
          <CircularProgress
            percentage={phasePercentage}
            size={310} // Largest ring, fits inside the container
            strokeWidth={8} // Thinner
            color={progressColorClass}
            trackColor={trackColorClass}
          />
        </div>
        {/* Desktop */}
        <div className="hidden sm:block">
          <CircularProgress
            percentage={phasePercentage}
            size={370} // Largest ring, fits inside the container
            strokeWidth={10} // Thinner
            color={progressColorClass}
            trackColor={trackColorClass}
          />
        </div>
      </div>
      
      {/* 4. Text content, on top of everything */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <p className={`text-xl sm:text-2xl font-semibold ${accentColorClass} mb-2 px-4 truncate max-w-full transition-colors duration-500`}>{phaseName}</p>
        <h2 className={`text-5xl sm:text-7xl font-bold text-white tracking-tighter font-mono ${textColorClass} transition-colors duration-500`}>
          {formatTime(phaseTimeRemaining)}
        </h2>
        <p className={`text-lg sm:text-xl text-gray-400 mt-2 ${mutedColorClass} transition-colors duration-500`}>
          Total: {formatTime(totalTimeRemaining)}
        </p>
      </div>
    </div>
  );
};

export default TimerDisplay;