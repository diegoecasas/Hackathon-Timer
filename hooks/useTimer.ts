
import { useState, useEffect, useCallback, useRef } from 'react';
import { Phase, TimerStatus } from '../types';

interface UseTimerProps {
  phases: Phase[];
  onPhaseChange?: (newPhaseIndex: number) => void;
  onFinish?: () => void;
}

export const useTimer = ({ phases, onPhaseChange, onFinish }: UseTimerProps) => {
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.IDLE);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [totalTimeRemaining, setTotalTimeRemaining] = useState(0);
  const [phaseTimeRemaining, setPhaseTimeRemaining] = useState(0);

  const intervalRef = useRef<number | null>(null);

  const calculateTotalTime = useCallback((startIndex: number, phasesList: Phase[]) => {
    return phasesList.slice(startIndex).reduce((acc, phase) => acc + phase.duration * 60, 0);
  }, []);

  useEffect(() => {
    if (phases.length > 0) {
      const initialTotalTime = calculateTotalTime(0, phases);
      setTotalTimeRemaining(initialTotalTime);
      setPhaseTimeRemaining(phases[0].duration * 60);
      setCurrentPhaseIndex(0);
    }
  }, [phases, calculateTotalTime]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (status !== TimerStatus.RUNNING && phases.length > 0) {
      setStatus(TimerStatus.RUNNING);
      if (currentPhaseIndex === 0 && totalTimeRemaining === calculateTotalTime(0, phases)) {
        onPhaseChange?.(0); // Trigger for the very first phase
      }
    }
  }, [status, phases, totalTimeRemaining, calculateTotalTime, currentPhaseIndex, onPhaseChange]);

  const pause = useCallback(() => {
    if (status === TimerStatus.RUNNING) {
      setStatus(TimerStatus.PAUSED);
      stopTimer();
    }
  }, [status, stopTimer]);

  const reset = useCallback(() => {
    stopTimer();
    setStatus(TimerStatus.IDLE);
    if (phases.length > 0) {
      setCurrentPhaseIndex(0);
      setTotalTimeRemaining(calculateTotalTime(0, phases));
      setPhaseTimeRemaining(phases[0].duration * 60);
    }
  }, [stopTimer, phases, calculateTotalTime]);

  useEffect(() => {
    if (status !== TimerStatus.RUNNING) {
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setPhaseTimeRemaining(prev => {
        if (prev > 1) {
          return prev - 1;
        }

        // Phase finished
        const nextPhaseIndex = currentPhaseIndex + 1;
        if (nextPhaseIndex < phases.length) {
          setCurrentPhaseIndex(nextPhaseIndex);
          onPhaseChange?.(nextPhaseIndex);
          return phases[nextPhaseIndex].duration * 60;
        }

        // Taller finalizado
        stopTimer();
        setStatus(TimerStatus.FINISHED);
        onFinish?.();
        return 0;
      });

      setTotalTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => stopTimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, currentPhaseIndex, phases, stopTimer, onPhaseChange, onFinish]);

  return {
    status,
    currentPhaseIndex,
    totalTimeRemaining,
    phaseTimeRemaining,
    start,
    pause,
    reset,
  };
};