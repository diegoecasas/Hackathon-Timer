import React from 'react';
import { HackathonEvent } from '../types';

interface EventLibraryProps {
  events: HackathonEvent[];
  onStartEvent: (event: HackathonEvent) => void;
  onEditEvent: (event: HackathonEvent) => void;
  onDeleteEvent: (eventId: string) => void;
  onCreateNew: () => void;
}

const formatTotalDuration = (phases: HackathonEvent['phases']): string => {
  const totalMinutes = phases.reduce((acc, phase) => acc + phase.duration, 0);
  if (totalMinutes === 0) return '0m';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m` : ''}`.trim();
};

const EventCard: React.FC<{ event: HackathonEvent; onStart: () => void; onEdit: () => void; onDelete: () => void; }> = ({ event, onStart, onEdit, onDelete }) => (
  <div className="bg-white/10 dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-white/20 flex flex-col justify-between transition-transform hover:scale-105">
    <div>
      <h3 className="text-2xl font-bold text-teal-300 truncate mb-2">{event.name}</h3>
      <div className="text-gray-400 space-y-1 mb-4">
        <p>{event.phases.length} Fases</p>
        <p>Duración Total: <span className="font-mono">{formatTotalDuration(event.phases)}</span></p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mt-4">
      <button onClick={onStart} className="flex-1 px-4 py-2 text-base font-bold rounded-lg transition-all bg-teal-500 text-white hover:bg-teal-400 focus:ring-4 focus:ring-teal-300">Iniciar</button>
      <button onClick={onEdit} className="px-3 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 focus:ring-4 focus:ring-gray-400">Editar</button>
      <button onClick={onDelete} className="px-3 py-2 rounded-lg bg-red-800/70 text-white hover:bg-red-700/70 focus:ring-4 focus:ring-red-500">Eliminar</button>
    </div>
  </div>
);

const EventLibrary: React.FC<EventLibraryProps> = ({ events, onStartEvent, onEditEvent, onDeleteEvent, onCreateNew }) => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-8">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-teal-300">Mis Eventos de Hackathon</h1>
        <p className="text-gray-400 mt-3 text-lg">Selecciona un evento para comenzar o crea uno nuevo.</p>
      </div>

      <div className="text-center mb-10">
        <button onClick={onCreateNew} className="px-10 py-4 text-xl font-bold rounded-lg transition-all duration-300 bg-teal-500 text-white hover:bg-teal-400 focus:ring-4 focus:ring-teal-300 shadow-lg hover:shadow-xl">
          + Crear Nuevo Evento
        </button>
      </div>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onStart={() => onStartEvent(event)}
              onEdit={() => onEditEvent(event)}
              onDelete={() => onDeleteEvent(event.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center bg-white/5 p-10 rounded-2xl border border-dashed border-gray-600">
          <h2 className="text-2xl font-semibold text-white">No tienes eventos guardados</h2>
          <p className="text-gray-400 mt-2">¡Comienza por crear tu primer evento de hackathon!</p>
        </div>
      )}
    </div>
  );
};

export default EventLibrary;
