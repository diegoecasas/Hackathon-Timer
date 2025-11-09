import React, { useState, useEffect, useCallback } from 'react';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import PhaseList from './components/PhaseList';
import CoachCorner from './components/CoachCorner';
import TimerSetup from './components/TimerSetup';
import EventLibrary from './components/EventLibrary';
import TemplateLibrary from './components/TemplateLibrary';
import Login from './components/Login';
import SignUp from './components/SignUp';

import { useTimer } from './hooks/useTimer';
import { useEventStore } from './hooks/useEventStore';
import { useAuth } from './hooks/useAuth';
import { getPhaseTip } from './services/geminiService';
import { HackathonEvent, HackathonEventTemplate, TimerStatus } from './types';

type View = 'AUTH' | 'LIBRARY' | 'TEMPLATES' | 'SETUP' | 'TIMER';
type AuthView = 'LOGIN' | 'SIGNUP';

function App() {
  const { currentUser, login, signup, logout } = useAuth();
  const { events, saveEvent, deleteEvent } = useEventStore(currentUser?.id || null);

  const [view, setView] = useState<View>('LIBRARY');
  const [authView, setAuthView] = useState<AuthView>('LOGIN');
  const [activeEvent, setActiveEvent] = useState<HackathonEvent | null>(null);
  const [eventToEdit, setEventToEdit] = useState<Partial<HackathonEvent> | null>(null);

  const [coachTip, setCoachTip] = useState<string>("¡Prepárate para innovar! El éxito es la suma de pequeños esfuerzos repetidos día tras día.");
  const [isTipLoading, setIsTipLoading] = useState<boolean>(false);

  const fetchTip = useCallback(async (phaseName: string) => {
    setIsTipLoading(true);
    const tip = await getPhaseTip(phaseName);
    setCoachTip(tip);
    setIsTipLoading(false);
  }, []);

  const handlePhaseChange = useCallback((newPhaseIndex: number) => {
    if (activeEvent && activeEvent.phases[newPhaseIndex]) {
      fetchTip(activeEvent.phases[newPhaseIndex].name);
    }
  }, [activeEvent, fetchTip]);

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
    onFinish: () => setCoachTip("¡Taller completado! ¡Felicidades por el increíble trabajo y la dedicación!"),
  });

  useEffect(() => {
    if (!currentUser) {
      setView('AUTH');
      setActiveEvent(null);
    } else {
      setView('LIBRARY');
    }
  }, [currentUser]);

  const handleSelectEvent = (event: HackathonEvent) => {
    setActiveEvent(event);
    setView('TIMER');
    if(event.phases.length > 0) {
      fetchTip(event.phases[0].name);
    }
  };
  
  const handleGoToLibrary = () => {
    setActiveEvent(null);
    setView('LIBRARY');
  };

  const handleCreateNew = () => {
    setView('TEMPLATES');
  };

  const handleSelectTemplate = (template: HackathonEventTemplate) => {
    const newEvent: Partial<HackathonEvent> = {
      ...template,
      phases: template.phases.map(p => ({...p, id: crypto.randomUUID()}))
    };
    setEventToEdit(newEvent);
    setView('SETUP');
  };

  const handleCreateFromScratch = () => {
    setEventToEdit(null);
    setView('SETUP');
  };
  
  const handleEditEvent = (event: HackathonEvent) => {
    setEventToEdit(event);
    setView('SETUP');
  };
  
  const handleSaveEvent = (event: HackathonEvent) => {
    saveEvent(event);
    setView('LIBRARY');
    setEventToEdit(null);
  };
  
  const handleCancelSetup = () => {
    setView('LIBRARY');
    setEventToEdit(null);
  };

  const currentPhase = activeEvent?.phases[currentPhaseIndex];
  const phaseDuration = currentPhase?.duration ? currentPhase.duration * 60 : 0;
  // Representa el tiempo restante, no el transcurrido.
  const phasePercentage = phaseDuration > 0 ? (phaseTimeRemaining / phaseDuration) * 100 : 100;


  // --- Lógica de color dinámico ---
  let bgColorClass = 'bg-[#0a192f]';
  let progressColorClass = 'text-teal-400';
  let trackColorClass = 'text-teal-400/20';
  let isLightBg = false;

  if (view === 'TIMER' && status === TimerStatus.RUNNING && currentPhase) {
      const percentageRemaining = (phaseTimeRemaining / phaseDuration) * 100;
      if (percentageRemaining <= 10) {
          bgColorClass = 'bg-red-500';
          progressColorClass = 'text-red-900';
          trackColorClass = 'text-red-900/30';
          isLightBg = true;
      } else if (percentageRemaining <= 30) {
          bgColorClass = 'bg-yellow-400';
          progressColorClass = 'text-yellow-900';
          trackColorClass = 'text-yellow-900/30';
          isLightBg = true;
      } else {
          bgColorClass = 'bg-teal-500';
          progressColorClass = 'text-teal-900';
          trackColorClass = 'text-teal-900/30';
          isLightBg = true;
      }
  }
  
  if (!currentUser) {
    return (
      <main className="min-h-screen bg-[#0a192f] text-white flex flex-col items-center justify-center p-4">
        {authView === 'LOGIN' ? (
          <Login onLogin={login} onSwitchToSignUp={() => setAuthView('SIGNUP')} />
        ) : (
          <SignUp onSignUp={signup} onSwitchToLogin={() => setAuthView('LOGIN')} />
        )}
      </main>
    );
  }

  const renderContent = () => {
    switch (view) {
      case 'LIBRARY':
        return (
          <EventLibrary
            events={events}
            onSelectEvent={handleSelectEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={deleteEvent}
            onCreateNew={handleCreateNew}
            userEmail={currentUser.email}
            onLogout={logout}
          />
        );
      case 'TEMPLATES':
        return (
            <TemplateLibrary
                onSelectTemplate={handleSelectTemplate}
                onCreateFromScratch={handleCreateFromScratch}
                onBack={handleGoToLibrary}
            />
        );
      case 'SETUP':
        return <TimerSetup onSave={handleSaveEvent} onCancel={handleCancelSetup} eventToEdit={eventToEdit} />;
      case 'TIMER':
        if (!activeEvent) {
          return <p>Error: No hay un taller activo.</p>
        }
        return (
          <>
            <div className="w-full max-w-7xl mx-auto mb-8 text-center">
               <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">{activeEvent.name}</h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto flex-1 min-h-0">
              <div className="flex-grow flex flex-col items-center">
                <TimerDisplay
                  phaseName={currentPhase?.name || 'Taller Terminado'}
                  phaseTimeRemaining={phaseTimeRemaining}
                  totalTimeRemaining={totalTimeRemaining}
                  phasePercentage={phasePercentage}
                  isLightBg={isLightBg}
                  progressColorClass={progressColorClass}
                  trackColorClass={trackColorClass}
                />
                <Controls
                  status={status}
                  onStart={start}
                  onPause={pause}
                  onReset={reset}
                  onGoToLibrary={handleGoToLibrary}
                />
              </div>
              <div className="w-full lg:w-96 flex flex-col gap-8 flex-1 lg:flex-initial min-h-0">
                <CoachCorner tip={coachTip} isLoading={isTipLoading} />
                <PhaseList phases={activeEvent.phases} currentPhaseIndex={currentPhaseIndex} />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main className={`min-h-screen ${bgColorClass} text-white flex flex-col items-center p-4 sm:p-8 transition-colors duration-500`}>
      {renderContent()}
    </main>
  );
}

export default App;