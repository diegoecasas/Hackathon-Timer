import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Phase, TimerStatus, HackathonEvent } from './types';
import { useTimer } from './hooks/useTimer';
import { useEventStore } from './hooks/useEventStore';
import { useAuth } from './hooks/useAuth';
import { getPhaseTip } from './services/geminiService';
import TimerSetup from './components/TimerSetup';
import TimerDisplay from './components/TimerDisplay';
import PhaseList from './components/PhaseList';
import Controls from './components/Controls';
import CoachCorner from './components/CoachCorner';
import EventLibrary from './components/EventLibrary';
import Login from './components/Login';
import SignUp from './components/SignUp';

const App: React.FC = () => {
  const { currentUser, login, logout, signup } = useAuth();
  const { events, saveEvent, deleteEvent } = useEventStore(currentUser?.id || null);
  
  const [view, setView] = useState<'login' | 'signup' | 'library' | 'setup' | 'timer'>('login');
  const [activeEvent, setActiveEvent] = useState<HackathonEvent | null>(null);
  const [eventToEdit, setEventToEdit] = useState<HackathonEvent | null>(null);

  const [tip, setTip] = useState<string>('¡Todo listo para empezar! Presiona "Iniciar" para comenzar el taller de innovación.');
  const [isTipLoading, setIsTipLoading] = useState<boolean>(false);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  
  useEffect(() => {
    if (currentUser) {
      setView('library');
    } else {
      setView('login');
    }
  }, [currentUser]);

  const playTickSound = useCallback(() => {
    // Sound logic remains the same
    if (!audioContextRef.current) return;
    const context = audioContextRef.current;
    if (context.state === 'suspended') {
      context.resume();
    }
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(880, context.currentTime);
    gainNode.gain.setValueAtTime(0.5, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.1);
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.1);
  }, []);

  useEffect(() => {
    // Alarm logic remains the same
    if (isAlarmPlaying) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const context = audioContextRef.current;
      if (context.state === 'suspended') {
        context.resume();
      }
      oscillatorRef.current = context.createOscillator();
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.setValueAtTime(440, context.currentTime);
      oscillatorRef.current.connect(context.destination);
      oscillatorRef.current.start();
    } else if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
    };
  }, [isAlarmPlaying]);


  const handlePhaseChange = useCallback(async (newPhaseIndex: number) => {
    if (activeEvent) {
      setIsTipLoading(true);
      try {
        const phaseName = activeEvent.phases[newPhaseIndex].name;
        const newTip = await getPhaseTip(phaseName);
        setTip(newTip);
      } finally {
        setIsTipLoading(false);
      }
    }
  }, [activeEvent]);
  
  const handleFinish = useCallback(() => {
      setTip("¡Felicidades! Han completado el taller de innovación. ¡Gran trabajo, equipo!");
      setIsAlarmPlaying(true);
  }, []);

  const {
    status,
    currentPhaseIndex,
    totalTimeRemaining,
    phaseTimeRemaining,
    start,
    pause,
    reset,
  } = useTimer({
    phases: activeEvent?.phases || [],
    onPhaseChange: handlePhaseChange,
    onFinish: handleFinish,
  });

   useEffect(() => {
      if (status === TimerStatus.RUNNING && activeEvent) {
        const phaseDuration = activeEvent.phases[currentPhaseIndex].duration * 60;
        const tenPercentMark = phaseDuration * 0.1;
        if (phaseTimeRemaining > 0 && phaseTimeRemaining <= tenPercentMark) {
          playTickSound();
        }
      }
    }, [phaseTimeRemaining, status, currentPhaseIndex, activeEvent, playTickSound]);

  const stopAlarm = () => setIsAlarmPlaying(false);

  // --- View Navigation and Event Management ---

  const handleStartEvent = (event: HackathonEvent) => {
    setActiveEvent(event);
    setTip('¡Todo listo para empezar! Presiona "Iniciar" para comenzar el taller de innovación.');
    setView('timer');
  };

  const handleCreateNew = () => {
    setEventToEdit(null);
    setView('setup');
  };

  const handleEditEvent = (event: HackathonEvent) => {
    setEventToEdit(event);
    setView('setup');
  };

  const handleSaveEvent = (eventData: HackathonEvent) => {
    saveEvent(eventData);
    setView('library');
  };

  const handleCancelSetup = () => setView('library');
  
  const handleGoToLibrary = () => {
      reset();
      setActiveEvent(null);
      if (currentUser) {
        setView('library');
      }
  };

  const handleStartTimer = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
    }
    start();
  }

  // --- Render Logic ---

  if (!currentUser) {
    const authBg = "min-h-screen bg-gray-900 flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-[#0a192f]";
    if (view === 'signup') {
      return (
        <main className={authBg}>
          <SignUp onSignUp={signup} onSwitchToLogin={() => setView('login')} />
        </main>
      );
    }
    return (
      <main className={authBg}>
        <Login onLogin={login} onSwitchToSignUp={() => setView('signup')} />
      </main>
    );
  }

  if (view === 'library') {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-[#0a192f]">
        <EventLibrary 
          events={events}
          userEmail={currentUser.email}
          onStartEvent={handleStartEvent}
          onCreateNew={handleCreateNew}
          onEditEvent={handleEditEvent}
          onDeleteEvent={deleteEvent}
          onLogout={logout}
        />
      </main>
    );
  }

  if (view === 'setup') {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
        <TimerSetup 
          onSave={handleSaveEvent}
          onCancel={handleCancelSetup}
          eventToEdit={eventToEdit}
        />
      </main>
    );
  }

  if (!activeEvent) {
      return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Error: No se ha seleccionado ningún taller. <button onClick={handleGoToLibrary} className="underline ml-2">Ir a la biblioteca</button></div>;
  }

  const currentPhase = activeEvent.phases[currentPhaseIndex];
  const phaseDuration = currentPhase.duration * 60;
  const phasePercentage = phaseDuration > 0 ? (phaseTimeRemaining / phaseDuration) * 100 : 0;
  
  const getUIColors = (percentage: number): {bg: string, progress: string, track: string} => {
    if (percentage <= 10) return { bg: 'from-red-300 to-red-200', progress: 'text-red-500', track: 'text-red-500/20' };
    if (percentage <= 30) return { bg: 'from-yellow-300 to-yellow-200', progress: 'text-yellow-500', track: 'text-yellow-500/20' };
    return { bg: 'from-teal-400 to-teal-300', progress: 'text-teal-600', track: 'text-teal-600/20' };
  };

  const isLightBg = (status === TimerStatus.RUNNING || status === TimerStatus.PAUSED) && status !== TimerStatus.FINISHED;
  const { bg: backgroundClassFromPercentage, progress: progressColorFromPercentage, track: trackColorFromPercentage } = getUIColors(phasePercentage);
  const backgroundClass = isLightBg ? backgroundClassFromPercentage : 'from-[#0a192f] to-[#112240]';
  const progressColorClass = isLightBg ? progressColorFromPercentage : 'text-teal-400';
  const trackColorClass = isLightBg ? trackColorFromPercentage : 'text-teal-400/20';
  const titleColorClass = isLightBg ? 'text-gray-900' : 'text-teal-300';
  const subtitleColorClass = isLightBg ? 'text-gray-700' : 'text-gray-400';

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 space-y-8 bg-gradient-to-br ${backgroundClass} transition-colors duration-1000 ease-in-out`}>
      {isAlarmPlaying && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl text-center border-2 border-red-500 animate-pulse">
            <h2 className="text-3xl font-bold text-red-400 mb-4">¡Tiempo Terminado!</h2>
            <p className="text-gray-300 mb-6">El tiempo para el taller de innovación ha finalizado.</p>
            <button
              onClick={stopAlarm}
              className="px-8 py-3 text-lg font-bold rounded-full transition-all duration-300 bg-red-600 text-white hover:bg-red-500 focus:ring-4 focus:ring-red-400"
            >
              Apagar Alarma
            </button>
          </div>
        </div>
      )}
       <div className="text-center">
         <h1 className={`text-4xl sm:text-5xl font-extrabold ${titleColorClass} transition-colors duration-500`}>{activeEvent.name}</h1>
         <p className={`${subtitleColorClass} mt-2 transition-colors duration-500`}>Mantente enfocado y energizado. ¡Estás haciendo un gran trabajo!</p>
       </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-8">
            <PhaseList phases={activeEvent.phases} currentPhaseIndex={currentPhaseIndex} />
            <CoachCorner tip={tip} isLoading={isTipLoading} />
        </div>
        <div className="lg:col-span-2 flex flex-col items-center justify-center gap-8">
            <TimerDisplay
              phaseName={currentPhase.name}
              phaseTimeRemaining={phaseTimeRemaining}
              totalTimeRemaining={totalTimeRemaining}
              phasePercentage={phasePercentage}
              isLightBg={isLightBg}
              progressColorClass={progressColorClass}
              trackColorClass={trackColorClass}
            />
            <Controls
                status={status}
                onStart={handleStartTimer}
                onPause={pause}
                onReset={reset}
                onGoToLibrary={handleGoToLibrary}
            />
        </div>
      </div>
    </main>
  );
};

export default App;
