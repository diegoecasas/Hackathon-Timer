import React from 'react';

interface CoachCornerProps {
  tip: string;
  isLoading: boolean;
}

const CoachCorner: React.FC<CoachCornerProps> = ({ tip, isLoading }) => {
  return (
    <div className="bg-white/10 dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-white/20">
      <h3 className="text-xl font-bold text-teal-300 mb-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Rincón del Coach AI
      </h3>
      <div className="text-gray-200 min-h-[80px] flex items-center justify-center">
        {isLoading ? (
          <div className="flex items-center space-x-2">
             <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse delay-0"></div>
             <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse delay-200"></div>
             <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse delay-400"></div>
          </div>
        ) : (
          <p className="text-lg italic">"{tip}"</p>
        )}
      </div>
    </div>
  );
};

export default CoachCorner;
