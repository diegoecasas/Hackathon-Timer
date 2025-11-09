import { useState, useCallback, useEffect } from 'react';
import { HackathonEvent } from '../types';

const STORAGE_KEY = 'innovacion_talleres';

export const useEventStore = () => {
  const [events, setEvents] = useState<HackathonEvent[]>(() => {
    // Lazy initializer to read from localStorage only once on component mount
    try {
      const storedEvents = localStorage.getItem(STORAGE_KEY);
      return storedEvents ? JSON.parse(storedEvents) : [];
    } catch (error) {
      console.error("Failed to load talleres from local storage", error);
      return [];
    }
  });

  // Effect to automatically sync state changes back to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error("Failed to save talleres to local storage", error);
    }
  }, [events]);

  const saveEvent = useCallback((eventToSave: HackathonEvent) => {
    setEvents(currentEvents => {
      const eventExists = currentEvents.some(event => event.id === eventToSave.id);
      if (eventExists) {
        // Update existing event
        return currentEvents.map(event =>
          event.id === eventToSave.id ? eventToSave : event
        );
      } else {
        // Add new event
        return [...currentEvents, eventToSave];
      }
    });
  }, []);

  const deleteEvent = useCallback((eventId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este taller?')) {
      setEvents(currentEvents => currentEvents.filter(event => event.id !== eventId));
    }
  }, []);

  return { events, saveEvent, deleteEvent };
};
