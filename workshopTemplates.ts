import { HackathonEventTemplate } from './types';

export const workshopTemplates: HackathonEventTemplate[] = [
  {
    name: 'Design Sprint (5 Fases)',
    phases: [
      { id: crypto.randomUUID(), name: 'Entender y Mapear', duration: 90 },
      { id: crypto.randomUUID(), name: 'Bocetar Soluciones', duration: 90 },
      { id: crypto.randomUUID(), name: 'Decidir y Storyboard', duration: 90 },
      { id: crypto.randomUUID(), name: 'Prototipar', duration: 180 },
      { id: crypto.randomUUID(), name: 'Validar con Usuarios', duration: 120 },
    ],
  },
  {
    name: 'Taller de Prototipado Rápido',
    phases: [
      { id: crypto.randomUUID(), name: 'Brainstorming de Ideas', duration: 45 },
      { id: crypto.randomUUID(), name: 'Selección de Concepto', duration: 30 },
      { id: crypto.randomUUID(), name: 'Construcción de Prototipo Lo-Fi', duration: 120 },
      { id: crypto.randomUUID(), name: 'Ronda de Feedback Interno', duration: 60 },
      { id: crypto.randomUUID(), name: 'Iteración del Prototipo', duration: 90 },
    ],
  },
  {
    name: 'Maratón de Código (Hackathon)',
    phases: [
      { id: crypto.randomUUID(), name: 'Formación de Equipos e Ideación', duration: 60 },
      { id: crypto.randomUUID(), name: 'Desarrollo Intensivo (Parte 1)', duration: 480 },
      { id: crypto.randomUUID(), name: 'Revisión Intermedia y Mentoría', duration: 90 },
      { id: crypto.randomUUID(), name: 'Desarrollo Intensivo (Parte 2)', duration: 480 },
      { id: crypto.randomUUID(), name: 'Preparación de Demo y Pitch', duration: 120 },
      { id: crypto.randomUUID(), name: 'Presentaciones Finales', duration: 90 },
    ],
  },
   {
    name: 'Taller de Modelo de Negocio',
    phases: [
      { id: crypto.randomUUID(), name: 'Análisis de Segmento de Cliente', duration: 60 },
      { id: crypto.randomUUID(), name: 'Definición de Propuesta de Valor', duration: 75 },
      { id: crypto.randomUUID(), name: 'Diseño de Canales y Relaciones', duration: 60 },
      { id: crypto.randomUUID(), name: 'Estructura de Costos e Ingresos', duration: 90 },
      { id: crypto.randomUUID(), name: 'Pitch de Modelo de Negocio', duration: 45 },
    ],
  },
];
