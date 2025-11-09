

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

export interface HackathonEvent {
  id: string;
  name:string;
  phases: Phase[];
}

export type HackathonEventTemplate = Omit<HackathonEvent, 'id'>;


export interface User {
  id: string;
  email: string;
  // En una aplicación real, NUNCA almacenes contraseñas en texto plano.
  // Esto sería un hash seguro. Para esta demostración, es texto plano.
  password: string; 
}