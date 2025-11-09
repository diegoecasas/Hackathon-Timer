import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Phase, HackathonEvent, DaySchedule } from '../types';
import ToolLibrary from './ToolLibrary';
import { Tool } from '../toolLibraryData';

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
  const [daySchedules, setDaySchedules] = useState<DaySchedule[]>([]);

  // Refs para drag and drop para reordenar
  const dragPhaseRef = useRef<{ dayIndex: number; phaseIndex: number } | null>(null);
  const dragOverPhaseRef = useRef<{ dayIndex: number; phaseIndex: number } | null>(null);

  useEffect(() => {
    if (eventToEdit) {
      setEventName(eventToEdit.name || '');
      // Para retrocompatibilidad: si un evento antiguo solo tiene 'phases', lo convierte a la nueva estructura de un solo día
      if (eventToEdit.phases && (!eventToEdit.daySchedules || eventToEdit.daySchedules.length === 0)) {
        setDaySchedules([{ startTime: '', endTime: '', phases: eventToEdit.phases }]);
      } else {
        setDaySchedules(eventToEdit.daySchedules || [{ startTime: '', endTime: '', phases: [] }]);
      }
    } else {
      // Valor por defecto para un taller nuevo
      setEventName('Mi Nuevo Taller');
      setDaySchedules([{ startTime: '', endTime: '', phases: [] }]);
    }
  }, [eventToEdit]);

  const handleNumberOfDaysChange = (days: number) => {
    const newDaySchedules = [...daySchedules];
    while (newDaySchedules.length < days) {
      newDaySchedules.push({ startTime: '', endTime: '', phases: [] });
    }
    setDaySchedules(newDaySchedules.slice(0, days));
  };
  
  const handleDayScheduleChange = (index: number, field: keyof Omit<DaySchedule, 'phases'>, value: string) => {
    const newSchedules = [...daySchedules];
    newSchedules[index] = { ...newSchedules[index], [field]: value };
    setDaySchedules(newSchedules);
  };

  const totalDuration = useMemo(() => {
    return daySchedules.reduce((total, day) => 
        total + day.phases.reduce((dayTotal, phase) => dayTotal + (phase.duration || 0), 0), 
    0);
  }, [daySchedules]);

  const handlePhaseChange = (dayIndex: number, phaseId: string, field: keyof Omit<Phase, 'id'>, value: string) => {
    const newSchedules = [...daySchedules];
    const day = newSchedules[dayIndex];
    const newPhases = day.phases.map(phase => {
      if (phase.id === phaseId) {
        return { ...phase, [field]: field === 'duration' ? parseInt(value, 10) || 0 : value };
      }
      return phase;
    });
    newSchedules[dayIndex] = { ...day, phases: newPhases };
    setDaySchedules(newSchedules);
  };

  const addPhase = (dayIndex: number) => {
    const newSchedules = [...daySchedules];
    const day = newSchedules[dayIndex];
    const newPhases = [...day.phases, { id: crypto.randomUUID(), name: 'Nueva Fase', duration: 60 }];
    newSchedules[dayIndex] = { ...day, phases: newPhases };
    setDaySchedules(newSchedules);
  };

  const removePhase = (dayIndex: number, phaseId: string) => {
    const newSchedules = [...daySchedules];
    const day = newSchedules[dayIndex];
    const newPhases = day.phases.filter(phase => phase.id !== phaseId);
    newSchedules[dayIndex] = { ...day, phases: newPhases };
    setDaySchedules(newSchedules);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim()) {
        alert("El nombre del taller no puede estar vacío.");
        return;
    }
    const flattenedPhases = daySchedules.flatMap(day => day.phases);
    const eventData: HackathonEvent = {
      id: eventToEdit?.id || crypto.randomUUID(),
      name: eventName,
      daySchedules,
      phases: flattenedPhases,
    };
    onSave(eventData);
  };

  const handleSort = () => {
    if (!dragPhaseRef.current || !dragOverPhaseRef.current) return;
    
    const { dayIndex: dragDay, phaseIndex: dragPhase } = dragPhaseRef.current;
    const { dayIndex: overDay, phaseIndex: overPhase } = dragOverPhaseRef.current;

    const newSchedules = [...daySchedules];
    const dragDayPhases = [...newSchedules[dragDay].phases];
    
    const [movedPhase] = dragDayPhases.splice(dragPhase, 1);

    if (dragDay === overDay) {
      dragDayPhases.splice(overPhase, 0, movedPhase);
      newSchedules[dragDay] = { ...newSchedules[dragDay], phases: dragDayPhases };
    } else {
      const overDayPhases = [...newSchedules[overDay].phases];
      overDayPhases.splice(overPhase, 0, movedPhase);
      newSchedules[dragDay] = { ...newSchedules[dragDay], phases: dragDayPhases };
      newSchedules[overDay] = { ...newSchedules[overDay], phases: overDayPhases };
    }

    dragPhaseRef.current = null;
    dragOverPhaseRef.current = null;
    setDaySchedules(newSchedules);
  };

  const handleDropFromLibrary = (e: React.DragEvent, dayIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    try {
        const toolDataString = e.dataTransfer.getData('application/json');
        const isInternalDrag = e.dataTransfer.types.includes('internal/phase-drag');
        
        if (toolDataString && !isInternalDrag) {
            const tool: Tool = JSON.parse(toolDataString);
            const newPhase: Phase = { id: crypto.randomUUID(), name: tool.name, duration: tool.duration };
            
            const newSchedules = [...daySchedules];
            const day = newSchedules[dayIndex];
            const newPhases = [...day.phases, newPhase];
            newSchedules[dayIndex] = { ...day, phases: newPhases };
            setDaySchedules(newSchedules);
        }
    } catch (error) {
        console.error("Error handling drop from library:", error);
    }
  };

  const isEditing = eventToEdit && eventToEdit.id;

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto w-full">
      <div className="flex-grow w-full bg-gray-900 text-white rounded-3xl shadow-2xl border-2 border-teal-500/50 p-4 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-teal-300">
              {isEditing ? 'Editar Taller' : 'Crear Nuevo Taller'}
          </h1>
          <p className="text-gray-400 mt-2">Define los días, horarios y fases de tu taller.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
                <label htmlFor="eventName" className="block text-lg font-bold text-teal-300 mb-2">Nombre del Taller</label>
                <input id="eventName" type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Ej: Taller de Innovación AI" className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="numberOfDays" className="block text-lg font-bold text-teal-300 mb-2">Cantidad de Días</label>
              <input id="numberOfDays" type="number" value={daySchedules.length} onChange={(e) => handleNumberOfDaysChange(Math.max(1, parseInt(e.target.value, 10) || 1))} className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none" min="1" />
            </div>
          </div>

          <div className="space-y-6">
          {daySchedules.map((schedule, dayIndex) => (
            <div key={dayIndex} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDropFromLibrary(e, dayIndex)}>
              <h3 className="text-xl font-bold text-teal-300 mb-3">Día {dayIndex + 1}</h3>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label htmlFor={`startTime-${dayIndex}`} className="block text-sm font-semibold text-gray-400 mb-2">Hora de Inicio</label>
                  <input id={`startTime-${dayIndex}`} type="time" value={schedule.startTime} onChange={(e) => handleDayScheduleChange(dayIndex, 'startTime', e.target.value)} className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
                </div>
                <div className="flex-1">
                  <label htmlFor={`endTime-${dayIndex}`} className="block text-sm font-semibold text-gray-400 mb-2">Hora de Finalización</label>
                  <input id={`endTime-${dayIndex}`} type="time" value={schedule.endTime} onChange={(e) => handleDayScheduleChange(dayIndex, 'endTime', e.target.value)} className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
                </div>
              </div>

              <div className="space-y-4 p-2 border-dashed border-2 border-gray-600/50 rounded-md min-h-[80px]">
                <h4 className="text-md font-semibold text-gray-400 text-center py-1">Fases del Día {dayIndex + 1} (Arrastra herramientas aquí)</h4>
                {schedule.phases.map((phase, phaseIndex) => (
                  <div key={phase.id} className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg border border-gray-700 transition-shadow hover:shadow-lg hover:shadow-teal-500/10" draggable
                    onDragStart={(e) => { dragPhaseRef.current = { dayIndex, phaseIndex }; e.dataTransfer.setData('internal/phase-drag', 'true'); }}
                    onDragEnter={() => { dragOverPhaseRef.current = { dayIndex, phaseIndex }; }}
                    onDragEnd={handleSort} onDragOver={(e) => e.preventDefault()}>
                    <div className="cursor-move text-gray-500 hover:text-white" aria-label="Arrastrar para reordenar">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"><circle cx="9" cy="6" r="1.5" fill="currentColor"></circle><circle cx="15" cy="6" r="1.5" fill="currentColor"></circle><circle cx="9" cy="12" r="1.5" fill="currentColor"></circle><circle cx="15" cy="12" r="1.5" fill="currentColor"></circle><circle cx="9" cy="18" r="1.5" fill="currentColor"></circle><circle cx="15" cy="18" r="1.5" fill="currentColor"></circle></svg>
                    </div>
                    <span className="text-gray-400 font-bold">{phaseIndex + 1}</span>
                    <input type="text" value={phase.name} onChange={(e) => handlePhaseChange(dayIndex, phase.id, 'name', e.target.value)} placeholder="Nombre de la Fase" className="flex-grow bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-teal-400 focus:outline-none" required />
                    <input type="number" value={phase.duration} onChange={(e) => handlePhaseChange(dayIndex, phase.id, 'duration', e.target.value)} placeholder="Mins" className="w-24 bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-teal-400 focus:outline-none" min="1" required />
                    <button type="button" onClick={() => removePhase(dayIndex, phase.id)} className="text-red-400 hover:text-red-300 p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition" aria-label="Eliminar Fase">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                    </button>
                  </div>
                ))}
                 {schedule.phases.length === 0 && <p className="text-center text-gray-500 italic">Arrastra una herramienta o añade una fase</p>}
              </div>
               <button type="button" onClick={() => addPhase(dayIndex)} className="mt-4 w-full px-4 py-2 text-sm font-semibold text-teal-300 border-2 border-dashed border-gray-600 rounded-lg hover:bg-teal-400/10 hover:border-teal-400 transition-colors duration-200">
                + Añadir Fase a Día {dayIndex + 1}
              </button>
            </div>
          ))}
          </div>
          
          <div className="pt-6 mt-6 border-t border-gray-700/50 space-y-6">
            <div className="text-center">
              <span className="text-lg font-semibold text-teal-300">Duración Total:</span>
              <span className="ml-2 font-mono text-xl font-bold text-white">{formatTotalDuration(totalDuration)}</span>
            </div>
            <div className="flex items-center justify-end gap-4">
              <button type="button" onClick={onCancel} className="px-6 py-2 font-semibold rounded-lg transition-colors duration-200 bg-gray-800 text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 border-2 border-transparent">
                Cancelar
              </button>
              <button type="submit" className="px-6 py-2 font-semibold rounded-lg transition-colors duration-200 bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg shadow-teal-500/20 border-2 border-transparent">
                Guardar Taller
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToolLibrary />
    </div>
  );
};

export default TimerSetup;