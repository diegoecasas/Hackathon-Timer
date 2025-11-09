import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Phase, HackathonEvent } from '../types';

interface TimerSetupProps {
  onSave: (event: HackathonEvent) => void;
  onCancel: () => void;
  eventToEdit?: Partial<HackathonEvent> | null;
}

const formatTotalDuration = (totalMinutes: number): string => {
  if (isNaN(totalMinutes) || totalMinutes === 0) return '0m';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const hoursString = hours > 0 ? `${hours}h` : '';
  const minutesString = minutes > 0 ? `${minutes}m` : '';
  return `${hoursString} ${minutesString}`.trim();
};


const TimerSetup: React.FC<TimerSetupProps> = ({ onSave, onCancel, eventToEdit }) => {
  const [eventName, setEventName] = useState('');
  const [phases, setPhases] = useState<Phase[]>([]);

  // Refs for drag and drop
  const dragPhaseIndex = useRef<number | null>(null);
  const dragOverPhaseIndex = useRef<number | null>(null);


  useEffect(() => {
    if (eventToEdit) {
      setEventName(eventToEdit.name || '');
      setPhases(eventToEdit.phases || []);
    } else {
      setEventName('Mi Taller de Innovación');
      setPhases([
        { id: crypto.randomUUID(), name: 'Ideación y Planificación', duration: 120 },
        { id: crypto.randomUUID(), name: 'Desarrollo Principal', duration: 960 },
        { id: crypto.randomUUID(), name: 'Toques Finales y Corrección de Errores', duration: 240 },
        { id: crypto.randomUUID(), name: 'Preparación de Pitch', duration: 60 },
        { id: crypto.randomUUID(), name: 'Pitches Finales', duration: 60 },
      ]);
    }
  }, [eventToEdit]);
  
  const totalDuration = useMemo(() => {
    return phases.reduce((acc, phase) => acc + (phase.duration || 0), 0);
  }, [phases]);

  const handlePhaseChange = (id: string, field: keyof Omit<Phase, 'id'>, value: string) => {
    setPhases(currentPhases =>
      currentPhases.map(phase => {
        if (phase.id === id) {
          return { ...phase, [field]: field === 'duration' ? parseInt(value, 10) || 0 : value };
        }
        return phase;
      })
    );
  };

  const addPhase = () => {
    setPhases([...phases, { id: crypto.randomUUID(), name: 'Nueva Fase', duration: 60 }]);
  };

  const removePhase = (id: string) => {
    setPhases(phases.filter(phase => phase.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim()) {
        alert("El nombre del taller no puede estar vacío.");
        return;
    }
    const eventData: HackathonEvent = {
      id: eventToEdit?.id || crypto.randomUUID(),
      name: eventName,
      phases,
    };
    onSave(eventData);
  };

  const handleSort = () => {
    if (dragPhaseIndex.current === null || dragOverPhaseIndex.current === null) {
      return;
    }
    
    // Evita reordenar si se suelta en el mismo lugar
    if (dragPhaseIndex.current === dragOverPhaseIndex.current) {
        return;
    }

    const phasesCopy = [...phases];
    // Guarda la fase que se está moviendo
    const [movedPhase] = phasesCopy.splice(dragPhaseIndex.current, 1);
    // Inserta la fase en la nueva posición
    phasesCopy.splice(dragOverPhaseIndex.current, 0, movedPhase);

    // Limpia los refs
    dragPhaseIndex.current = null;
    dragOverPhaseIndex.current = null;

    // Actualiza el estado
    setPhases(phasesCopy);
  };

  const isEditing = eventToEdit && eventToEdit.id;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 bg-gray-900 text-white rounded-3xl shadow-2xl border-2 border-teal-500/50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-teal-300">
            {isEditing ? 'Editar Taller' : 'Crear Nuevo Taller'}
        </h1>
        <p className="text-gray-400 mt-2">Define el nombre y las etapas de tu taller de innovación.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label htmlFor="eventName" className="block text-lg font-bold text-teal-300 mb-2">Nombre del Taller</label>
            <input
                id="eventName"
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Ej: Taller de Innovación AI"
                className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                required
            />
        </div>

        <div className="space-y-4">
            <h2 className="text-lg font-bold text-teal-300">Fases del Taller</h2>
            {phases.map((phase, index) => (
            <div 
                key={phase.id} 
                className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg border border-gray-700 transition-shadow hover:shadow-lg hover:shadow-teal-500/10"
                draggable
                onDragStart={() => (dragPhaseIndex.current = index)}
                onDragEnter={() => (dragOverPhaseIndex.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                >
                <div className="cursor-move text-gray-500 hover:text-white" aria-label="Arrastrar para reordenar">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                        <circle cx="9" cy="6" r="1.5" fill="currentColor"></circle>
                        <circle cx="15" cy="6" r="1.5" fill="currentColor"></circle>
                        <circle cx="9" cy="12" r="1.5" fill="currentColor"></circle>
                        <circle cx="15" cy="12" r="1.5" fill="currentColor"></circle>
                        <circle cx="9" cy="18" r="1.5" fill="currentColor"></circle>
                        <circle cx="15" cy="18" r="1.5" fill="currentColor"></circle>
                    </svg>
                </div>
                <span className="text-gray-400 font-bold">{index + 1}</span>
                <input
                type="text"
                value={phase.name}
                onChange={(e) => handlePhaseChange(phase.id, 'name', e.target.value)}
                placeholder="Nombre de la Fase"
                className="flex-grow bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                required
                />
                <input
                type="number"
                value={phase.duration}
                onChange={(e) => handlePhaseChange(phase.id, 'duration', e.target.value)}
                placeholder="Mins"
                className="w-24 bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                min="1"
                required
                />
                <button
                type="button"
                onClick={() => removePhase(phase.id)}
                className="text-red-400 hover:text-red-300 p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition"
                aria-label="Eliminar Fase"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                </button>
            </div>
            ))}
        </div>
        
        <div className="pt-6 mt-6 border-t border-gray-700/50 space-y-6">
           <div className="text-center">
            <span className="text-lg font-semibold text-teal-300">Duración Total:</span>
            <span className="ml-2 font-mono text-xl font-bold text-white">{formatTotalDuration(totalDuration)}</span>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={addPhase}
              className="px-6 py-2 font-semibold text-teal-300 border-2 border-teal-400 rounded-lg hover:bg-teal-400/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Añadir Fase
            </button>
            
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 font-semibold rounded-lg transition-colors duration-200 bg-gray-800 text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 border-2 border-transparent"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 font-semibold rounded-lg transition-colors duration-200 bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg shadow-teal-500/20 border-2 border-transparent"
              >
                Guardar Taller
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TimerSetup;