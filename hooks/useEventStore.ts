import { useState, useCallback, useEffect } from 'react';
import { HackathonEvent } from '../types';

const STORAGE_KEY = 'hackathon_events';

export const useEventStore = () => {
  const [events, setEvents] = useState<HackathonEvent[]>([]);

  useEffect(() => {
    try {
      const storedEvents = localStorage.getItem(STORAGE_KEY);
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    } catch (error) {
      console.error("Failed to load events from local storage", error);
      setEvents([]);
    }
  }, []);

  const saveEventsToStorage = useCallback((updatedEvents: HackathonEvent[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Failed to save events to local storage", error);
    }
  }, []);

  const saveEvent = useCallback((eventToSave: HackathonEvent) => {
    const eventExists = events.some(event => event.id === eventToSave.id);
    let updatedEvents;
    if (eventExists) {
       updatedEvents = events.map(event =>
        event.id === eventToSave.id ? eventToSave : event
      );
    } else {
      updatedEvents = [...events, eventToSave];
    }
    saveEventsToStorage(updatedEvents);
  }, [events, saveEventsToStorage]);


  const deleteEvent = useCallback((eventId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      const updatedEvents = events.filter(event => event.id !== eventId);
      saveEventsToStorage(updatedEvents);
    }
  }, [events, saveEventsToStorage]);

  return { events, saveEvent, deleteEvent };
};
