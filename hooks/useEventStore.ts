import { useState, useCallback, useEffect } from 'react';
import { HackathonEvent } from '../types';

const getStorageKey = (userId: string) => `innovacion_talleres_${userId}`;

export const useEventStore = (userId: string | null) => {
  const [events, setEvents] = useState<HackathonEvent[]>([]);

  // Efecto para cargar los talleres cuando el userId cambia (ej: al iniciar sesión)
  useEffect(() => {
    if (!userId) {
      setEvents([]); // Limpiar talleres al cerrar sesión
      return;
    }
    try {
      const storedEvents = localStorage.getItem(getStorageKey(userId));
      setEvents(storedEvents ? JSON.parse(storedEvents) : []);
    } catch (error)
 {
      console.error("Failed to load talleres from local storage", error);
      setEvents([]);
    }
  }, [userId]);


  // Efecto para sincronizar automáticamente los cambios de estado con localStorage
  useEffect(() => {
    if (!userId) return;
    try {
      localStorage.setItem(getStorageKey(userId), JSON.stringify(events));
    } catch (error) {
      console.error("Failed to save talleres to local storage", error);
    }
  }, [events, userId]);

  const saveEvent = useCallback((eventToSave: HackathonEvent) => {
    setEvents(prevEvents => {
      const eventExists = prevEvents.some(event => event.id === eventToSave.id);
      if (eventExists) {
        // Actualizar taller existente
        return prevEvents.map(event =>
          event.id === eventToSave.id ? eventToSave : event
        );
      } else {
        // Añadir nuevo taller
        return [...prevEvents, eventToSave];
      }
    });
  }, []);

  const deleteEvent = useCallback((eventId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este taller?')) {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    }
  }, []);

  return { events, saveEvent, deleteEvent };
};