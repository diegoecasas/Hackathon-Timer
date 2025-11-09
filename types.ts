
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
