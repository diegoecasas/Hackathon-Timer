import React, { useState, useEffect, useRef } from 'react';
import { HackathonEvent, DaySchedule, Phase } from '../types';
import ToolLibrary from './ToolLibrary';

// The Tool type from toolLibraryData.ts, defined here for use with drag-and-drop.
interface Tool {
  name: string;
  duration: number;
}

interface TimerSetupProps {
  onSave: (event: HackathonEvent) => void;
  onCancel: () => void;
  eventToEdit: Partial<HackathonEvent> | null;
}

const TimerSetup: React.FC<TimerSetupProps> = ({ onSave, onCancel, eventToEdit }) => {
  const [name, setName] = useState('');
  const [daySchedules, setDaySchedules] = useState<DaySchedule[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Ref for tracking the phase being dragged for reordering
  const dragPhaseRef = useRef<{ dayIndex: number, phaseIndex: number } | null>(null);
  
  // State to manage visual feedback on drop zones
  const [dragOverDayIndex, setDragOverDayIndex] = useState<number | null>(null);

  useEffect(() => {
    if (eventToEdit) {
      setName(eventToEdit.name || '');
      setDaySchedules(eventToEdit.daySchedules && eventToEdit.daySchedules.length > 0
        ? JSON.parse(JSON.stringify(eventToEdit.daySchedules)) // Deep copy to prevent mutation issues
        : [{ startTime: '09:00', endTime: '17:00', phases: [] }]);
    } else {
      setName('');
      setDaySchedules([{ startTime: '09:00', endTime: '17:00', phases: [] }]);
    }
  }, [eventToEdit]);

  const handleDayCountChange = (count: number) => {
    const newCount = Math.max(1, count || 1);
    const currentSchedules = [...daySchedules];
    
    if (newCount > currentSchedules.length) {
      const daysToAdd = newCount - currentSchedules.length;
      for (let i = 0; i < daysToAdd; i++) {
        currentSchedules.push({ startTime: '09:00', endTime: '17:00', phases: [] });
      }
    } else if (newCount < currentSchedules.length) {
      currentSchedules.splice(newCount);
    }
    setDaySchedules(currentSchedules);
  };
  
  const handleTimeChange = (dayIndex: number, field: 'startTime' | 'endTime', value: string) => {
    const newSchedules = [...daySchedules];
    newSchedules[dayIndex] = { ...newSchedules[dayIndex], [field]: value };
    setDaySchedules(newSchedules);
  };
  
  const handlePhaseDurationChange = (dayIndex: number, phaseId: string, newDuration: number) => {
    const newDaySchedules = [...daySchedules];
    const day = newDaySchedules[dayIndex];
    const phaseToUpdate = day.phases.find(p => p.id === phaseId);
    if (phaseToUpdate) {
      phaseToUpdate.duration = isNaN(newDuration) ? 0 : Math.max(0, newDuration);
    }
    setDaySchedules(newDaySchedules);
  };

  const handleDrop = (e: React.DragEvent, targetDayIndex: number, targetPhaseIndex: number) => {
    e.preventDefault();
    setDragOverDayIndex(null);

    // 1. Handle drop from Tool Library
    const toolData = e.dataTransfer.getData('application/json');
    if (toolData) {
      try {
        const tool: Tool = JSON.parse(toolData);
        const newPhase: Phase = {
          id: crypto.randomUUID(),
          name: tool.name,
          duration: tool.duration,
        };
        const newDaySchedules = [...daySchedules];
        newDaySchedules[targetDayIndex].phases.splice(targetPhaseIndex, 0, newPhase);
        setDaySchedules(newDaySchedules);
      } catch (err) {
        console.error("Failed to parse tool data", err);
      }
      return;
    }

    // 2. Handle internal reordering
    if (dragPhaseRef.current) {
      const { dayIndex: sourceDayIndex, phaseIndex: sourcePhaseIndex } = dragPhaseRef.current;
      
      const newDaySchedules = [...daySchedules];
      const draggedItem = newDaySchedules[sourceDayIndex].phases.splice(sourcePhaseIndex, 1)[0];
      newDaySchedules[targetDayIndex].phases.splice(targetPhaseIndex, 0, draggedItem);
      
      setDaySchedules(newDaySchedules);
    }
  };

  const handlePhaseDragStart = (e: React.DragEvent, dayIndex: number, phaseIndex: number) => {
    dragPhaseRef.current = { dayIndex, phaseIndex };
    e.dataTransfer.effectAllowed = 'move';
  };

  const handlePhaseDragEnd = () => {
    dragPhaseRef.current = null;
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRemovePhase = (dayIndex: number, phaseId: string) => {
    const newDaySchedules = [...daySchedules];
    newDaySchedules[dayIndex].phases = newDaySchedules[dayIndex].phases.filter(p => p.id !== phaseId);
    setDaySchedules(newDaySchedules);
  };

  const handleSave = () => {
    setError(null);
    if (!name.trim()) {
      setError("Por favor, dale un nombre a tu taller.");
      return;
    }
    const flattenedPhases = daySchedules.flatMap(day => day.phases);
    if (flattenedPhases.length === 0) {
      setError("Por favor, añade al menos una fase a tu taller.");
      return;
    }
    for (let i = 0; i < daySchedules.length; i++) {
        const day = daySchedules[i];
        if (day.startTime && day.endTime) {
            try {
                const [startHour, startMinute] = day.startTime.split(':').map(Number);
                const [endHour, endMinute] = day.endTime.split(':').map(Number);
                if (isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute)) throw new Error('Invalid time');
                const startTotalMinutes = startHour * 60 + startMinute;
                const endTotalMinutes = endHour * 60 + endMinute;
                if (endTotalMinutes <= startTotalMinutes) {
                    setError(`En el Día ${i + 1}, la hora de finalización debe ser posterior a la hora de inicio.`);
                    return;
                }
                const availableMinutes = endTotalMinutes - startTotalMinutes;
                const scheduledMinutes = day.phases.reduce((acc, phase) => acc + phase.duration, 0);
                if (scheduledMinutes > availableMinutes) {
                    setError(`Error en el Día ${i + 1}: Has programado ${scheduledMinutes} min, pero solo hay ${availableMinutes} min disponibles.`);
                    return;
                }
            } catch (e) {
                setError(`Error en el formato de hora para el Día ${i + 1}. Asegúrate de que esté en formato HH:MM.`);
                return;
            }
        } else {
             setError(`Por favor, define la hora de inicio y fin para el Día ${i + 1}.`);
             return;
        }
    }
    const eventToSave: HackathonEvent = {
      id: eventToEdit?.id || crypto.randomUUID(), name: name.trim(), daySchedules, phases: flattenedPhases,
    };
    onSave(eventToSave);
  };
  
  const DayEditor: React.FC<{day: DaySchedule, dayIndex: number}> = ({ day, dayIndex }) => {
    return (
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 mb-4">
            <h3 className="text-xl font-bold text-teal-300 mb-4">Día {dayIndex + 1}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Time inputs */}
                <div>
                    <label htmlFor={`start-time-${dayIndex}`} className="block text-sm font-medium text-gray-400 mb-1">Hora de Inicio</label>
                    <input type="time" id={`start-time-${dayIndex}`} value={day.startTime} onChange={(e) => handleTimeChange(dayIndex, 'startTime', e.target.value)} className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:ring-1 focus:ring-teal-400 focus:outline-none"/>
                </div>
                <div>
                    <label htmlFor={`end-time-${dayIndex}`} className="block text-sm font-medium text-gray-400 mb-1">Hora de Finalización</label>
                    <input type="time" id={`end-time-${dayIndex}`} value={day.endTime} onChange={(e) => handleTimeChange(dayIndex, 'endTime', e.target.value)} className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:ring-1 focus:ring-teal-400 focus:outline-none"/>
                </div>
            </div>

            <div 
                className={`min-h-[120px] bg-gray-900/50 p-2 rounded-lg border-2 border-dashed space-y-2 transition-all ${dragOverDayIndex === dayIndex ? 'border-teal-400 bg-teal-500/10' : 'border-gray-600'}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, dayIndex, day.phases.length)}
                onDragEnter={() => setDragOverDayIndex(dayIndex)}
                onDragLeave={() => setDragOverDayIndex(null)}
            >
                {day.phases.map((phase, phaseIndex) => (
                    <div 
                        key={phase.id} 
                        draggable
                        onDragStart={(e) => handlePhaseDragStart(e, dayIndex, phaseIndex)}
                        onDragEnd={handlePhaseDragEnd}
                        onDrop={(e) => { e.stopPropagation(); handleDrop(e, dayIndex, phaseIndex); }}
                        onDragOver={handleDragOver}
                        className="bg-gray-700 p-2 rounded-md flex items-center group cursor-move"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/></svg>
                        <span className="text-white truncate flex-1 mr-2" title={phase.name}>{phase.name}</span>
                        <div className="flex items-center gap-2 ml-auto">
                            <input type="number" value={phase.duration} onChange={(e) => handlePhaseDurationChange(dayIndex, phase.id, parseInt(e.target.value))} className="w-16 bg-gray-800 text-white p-1 rounded-md border border-gray-600 text-center font-mono text-sm" min="1" />
                            <span className="font-mono text-sm text-gray-400">min</span>
                            <button onClick={() => handleRemovePhase(dayIndex, phase.id)} className="text-red-500 hover:text-red-400 font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                        </div>
                    </div>
                ))}
                {day.phases.length === 0 && (
                    <div className="text-gray-500 text-center py-10 px-2 flex flex-col items-center justify-center">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                       <span className="font-semibold">Arrastra herramientas aquí</span>
                    </div>
                )}
            </div>
        </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-4 sm:p-6 lg:p-8 h-screen">
        <div className="flex-1 min-w-0 flex flex-col bg-gray-900 p-6 rounded-2xl border border-gray-700">
            <div className="flex-shrink-0">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{eventToEdit ? 'Editar Taller' : 'Crear Nuevo Taller'}</h1>
                <p className="text-gray-400 text-md mb-6">Construye tu taller arrastrando herramientas desde la biblioteca.</p>
                {error && (<div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative mb-6" role="alert"><span className="block sm:inline">{error}</span><button onClick={() => setError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3"><svg className="fill-current h-6 w-6 text-red-400" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Cerrar</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg></button></div>)}
                <div className="mb-4"><label htmlFor="eventName" className="block text-lg font-bold text-teal-300 mb-2">Nombre del Taller</label><input id="eventName" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Taller de Innovación Estratégica" className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none text-lg" required/></div>
                <div className="mb-4"><label htmlFor="dayCount" className="block text-lg font-bold text-teal-300 mb-2">Cantidad de Días</label><input id="dayCount" type="number" min="1" value={daySchedules.length} onChange={(e) => handleDayCountChange(parseInt(e.target.value, 10))} className="w-full sm:w-48 bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none text-lg"/></div>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto pr-2 mt-4">
                {daySchedules.map((day, index) => (<DayEditor key={index} day={day} dayIndex={index} />))}
            </div>
            <div className="flex-shrink-0 mt-6 flex flex-wrap gap-4"><button onClick={handleSave} className="flex-1 sm:flex-none px-8 py-3 text-lg font-bold rounded-full transition-all duration-300 bg-teal-500 text-white hover:bg-teal-400 focus:ring-4 focus:ring-teal-300 shadow-lg hover:shadow-xl">Guardar Taller</button><button onClick={onCancel} className="flex-1 sm:flex-none px-8 py-3 text-lg font-bold rounded-full transition-all duration-300 bg-gray-600 text-white hover:bg-gray-500 focus:ring-4 focus:ring-gray-400">Cancelar</button></div>
        </div>
        <ToolLibrary />
    </div>
  );
};
export default TimerSetup;
