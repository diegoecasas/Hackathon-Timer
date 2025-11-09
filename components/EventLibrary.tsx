import React from 'react';
import { HackathonEvent } from '../types';
import UserInfo from './UserInfo';

interface EventLibraryProps {
  events: HackathonEvent[];
  onSelectEvent: (event: HackathonEvent) => void;
  onEditEvent: (event: HackathonEvent) => void;
  onDeleteEvent: (eventId: string) => void;
  onCreateNew: () => void;
  userEmail: string;
  onLogout: () => void;
}

const formatTotalDuration = (totalMinutes: number): string => {
  if (totalMinutes === 0) return '0m';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m` : ''}`.trim();
};

const EventCard: React.FC<{ event: HackathonEvent; onSelect: () => void; onEdit: () => void; onDelete: () => void; }> = ({ event, onSelect, onEdit, onDelete }) => {
  const totalDuration = event.phases.reduce((acc, phase) => acc + phase.duration, 0);

  return (
    <div className="bg-white/10 dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-white/20 flex flex-col justify-between transition-transform hover:scale-105">
      <div>
        <h3 className="text-2xl font-bold text-teal-300 truncate mb-2" title={event.name}>{event.name}</h3>
        <div className="text-gray-400 space-y-1 mb-4">
          <p>{event.phases.length} Fases</p>
          <p>Duración Total: <span className="font-mono">{formatTotalDuration(totalDuration)}</span></p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button onClick={onSelect} className="flex-1 px-4 py-2 text-base font-bold rounded-lg transition-all bg-teal-500 text-white hover:bg-teal-400 focus:ring-4 focus:ring-teal-300 shadow-lg">
          Iniciar
        </button>
        <button onClick={onEdit} className="flex-1 px-4 py-2 text-base font-bold rounded-lg transition-all bg-blue-600 text-white hover:bg-blue-500 focus:ring-4 focus:ring-blue-400">
          Editar
        </button>
        <button onClick={onDelete} className="flex-1 px-4 py-2 text-base font-bold rounded-lg transition-all bg-red-600 text-white hover:bg-red-500 focus:ring-4 focus:ring-red-400">
          Eliminar
        </button>
      </div>
    </div>
  );
};

const EventLibrary: React.FC<EventLibraryProps> = ({ events, onSelectEvent, onEditEvent, onDeleteEvent, onCreateNew, userEmail, onLogout }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-10 gap-6">
        {/* Left Side: Title and Subtitle */}
        <div>
          <h1 className="text-5xl font-extrabold text-white">Mis Talleres de Innovación</h1>
          <p className="text-gray-400 mt-2 text-lg">Selecciona un taller para comenzar o crea uno nuevo.</p>
        </div>
        
        {/* Right Side: User Info and Create Button */}
        <div className="flex flex-col items-end gap-4 w-full sm:w-auto">
          <UserInfo userEmail={userEmail} onLogout={onLogout} />
          <button onClick={onCreateNew} className="px-6 py-3 font-semibold rounded-lg transition-colors duration-200 bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg shadow-teal-500/20 w-full sm:w-auto">
            + Crear Nuevo Taller
          </button>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-16 bg-white/5 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-300">No tienes talleres guardados</h3>
          <p className="text-gray-400 mt-2">¡Crea tu primer taller para empezar a innovar!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onSelect={() => onSelectEvent(event)}
              onEdit={() => onEditEvent(event)}
              onDelete={() => onDeleteEvent(event.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventLibrary;