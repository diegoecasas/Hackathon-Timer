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
