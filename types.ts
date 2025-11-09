
export interface Phase {
  id: string;
  name: string;
  duration: number; // in minutes
}

export enum TimerStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED',
}

export interface DaySchedule {
  id: string;
  startTime: string;
  endTime: string;
  phases: Phase[];
}

export interface HackathonEvent {
  id: string;
  name:string;
  phases: Phase[]; // This will be a flattened array of all phases from all days for the timer
  daySchedules: DaySchedule[];
}

export type HackathonEventTemplate = {
  name: string;
  daySchedules: {
    startTime: string;
    endTime: string;
    phases: Omit<Phase, 'id'>[];
  }[];
};


export interface User {
  id: string;
  email: string;
  // En una aplicación real, NUNCA almacenes contraseñas en texto plano.
  // Esto sería un hash seguro. Para esta demostración, es texto plano.
  password: string; 
}