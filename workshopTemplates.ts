import { HackathonEventTemplate } from './types';

// La nueva estructura requiere que las fases estén anidadas dentro de los días.
// Nota: El array 'phases' a nivel raíz se generará dinámicamente al guardar.
export const workshopTemplates: HackathonEventTemplate[] = [
  {
    name: "Design Sprint 5 días",
    daySchedules: [
      { // Día 1
        startTime: '', endTime: '', phases: [
          { name: 'Bienvenida y contexto', duration: 30 },
          { name: 'Establecer meta a largo plazo', duration: 60 },
          { name: 'Break', duration: 15 },
          { name: 'Mapeo del problema', duration: 75 },
          { name: 'Preguntas sprint', duration: 30 },
          { name: 'Almuerzo', duration: 60 },
          { name: 'Entrevistas con expertos', duration: 90 },
          { name: 'Break', duration: 15 },
          { name: 'Definir el objetivo', duration: 75 },
          { name: 'Tarea para casa', duration: 30 },
        ]
      },
      { // Día 2
        startTime: '', endTime: '', phases: [
          { name: 'Compartir inspiraciones', duration: 30 },
          { name: 'Demos relámpago', duration: 30 },
          { name: 'Dividir o agrupar', duration: 15 },
          { name: 'Break', duration: 15 },
          { name: 'Tomar notas', duration: 15 },
          { name: 'Crazy 8\'s', duration: 105 },
          { name: 'Almuerzo', duration: 60 },
          { name: 'Solution Sketch', duration: 150 },
          { name: 'Break', duration: 15 },
          { name: 'Preparación para mañana', duration: 45 },
        ]
      },
      { // Día 3
        startTime: '', endTime: '', phases: [
            { name: 'Museo de arte', duration: 90 },
            { name: 'Break', duration: 15 },
            { name: 'Crítica rápida', duration: 75 },
            { name: 'Votación estructurada', duration: 30 },
            { name: 'Almuerzo', duration: 60 },
            { name: 'Decidir el ganador', duration: 30 },
            { name: 'Batalla o fusión', duration: 30 },
            { name: 'Break y preparación', duration: 30 },
            { name: 'Crear storyboard', duration: 120 },
            { name: 'Planear prototipo', duration: 30 },
        ]
      },
      { // Día 4
        startTime: '', endTime: '', phases: [
            { name: 'Dividir y conquistar', duration: 30 },
            { name: 'Prototipar sesión 1', duration: 180 },
            { name: 'Almuerzo', duration: 60 },
            { name: 'Prototipar sesión 2', duration: 150 },
            { name: 'Ensayo', duration: 45 },
            { name: 'Ajustes finales', duration: 45 },
        ]
      },
      { // Día 5
        startTime: '', endTime: '', phases: [
            { name: 'Preparación', duration: 30 },
            { name: 'Entrevista 1', duration: 60 },
            { name: 'Debrief rápido', duration: 15 },
            { name: 'Entrevista 2', duration: 60 },
            { name: 'Debrief rápido', duration: 15 },
            { name: 'Almuerzo', duration: 60 },
            { name: 'Entrevista 3', duration: 60 },
            { name: 'Debrief rápido', duration: 15 },
            { name: 'Entrevista 4', duration: 60 },
            { name: 'Break', duration: 15 },
            { name: 'Entrevista 5', duration: 60 },
            { name: 'Síntesis final', duration: 60 },
            { name: 'Próximos pasos', duration: 30 },
        ]
      }
    ]
  },
  {
    name: "Design Sprint (4 días)",
    daySchedules: [
      { // Día 1
        startTime: '', endTime: '', phases: [
          { name: 'Bienvenida y contexto', duration: 30 },
          { name: 'Establecer meta a largo plazo', duration: 45 },
          { name: 'Mapeo del problema', duration: 60 },
          { name: 'Break', duration: 15 },
          { name: 'Preguntas sprint', duration: 30 },
          { name: 'Definir el objetivo', duration: 45 },
          { name: 'Almuerzo', duration: 60 },
          { name: 'Entrevistas con expertos', duration: 90 },
          { name: 'Break', duration: 15 },
          { name: 'Compartir inspiraciones', duration: 30 },
          { name: 'Tomar notas (How Might We)', duration: 30 },
          { name: 'Crazy 8\'s', duration: 30 },
          { name: 'Solution Sketch', duration: 60 },
        ]
      },
      { // Día 2
        startTime: '', endTime: '', phases: [
          { name: 'Museo de arte', duration: 60 },
          { name: 'Break', duration: 15 },
          { name: 'Crítica rápida', duration: 90 },
          { name: 'Votación estructurada', duration: 30 },
          { name: 'Almuerzo', duration: 60 },
          { name: 'Decidir el ganador', duration: 30 },
          { name: 'Batalla o fusión', duration: 30 },
          { name: 'Break', duration: 15 },
          { name: 'Crear storyboard', duration: 120 },
          { name: 'Planear prototipo', duration: 30 },
        ]
      },
      { // Día 3
        startTime: '', endTime: '', phases: [
          { name: 'Dividir y conquistar', duration: 30 },
          { name: 'Prototipar sesión 1', duration: 180 },
          { name: 'Almuerzo', duration: 60 },
          { name: 'Prototipar sesión 2', duration: 150 },
          { name: 'Break', duration: 15 },
          { name: 'Ensayo', duration: 45 },
          { name: 'Ajustes finales', duration: 45 },
        ]
      },
      { // Día 4
        startTime: '', endTime: '', phases: [
          { name: 'Preparación', duration: 30 },
          { name: 'Entrevista 1', duration: 60 },
          { name: 'Debrief rápido', duration: 15 },
          { name: 'Entrevista 2', duration: 60 },
          { name: 'Debrief rápido', duration: 15 },
          { name: 'Almuerzo', duration: 60 },
          { name: 'Entrevista 3', duration: 60 },
          { name: 'Debrief rápido', duration: 15 },
          { name: 'Entrevista 4', duration: 60 },
          { name: 'Break', duration: 15 },
          { name: 'Entrevista 5', duration: 60 },
          { name: 'Síntesis final', duration: 60 },
          { name: 'Próximos pasos', duration: 30 },
        ]
      }
    ]
  },
  {
    name: "Human-Centered Design (1 día)",
    daySchedules: [{
      startTime: '', endTime: '', phases: [
        { name: 'INSPIRACIÓN: Bienvenida e introducción a HCD', duration: 20 },
        { name: 'INSPIRACIÓN: Definición del desafío', duration: 30 },
        { name: 'INSPIRACIÓN: Preparación para salir al campo', duration: 20 },
        { name: 'INSPIRACIÓN: Investigación de campo', duration: 90 },
        { name: 'INSPIRACIÓN: Break', duration: 15 },
        { name: 'INSPIRACIÓN: Entrevistas con usuarios', duration: 60 },
        { name: 'INSPIRACIÓN: Almuerzo', duration: 60 },
        { name: 'IDEACIÓN: Compartir historias', duration: 30 },
        { name: 'IDEACIÓN: Identificar patrones y insights', duration: 45 },
        { name: 'IDEACIÓN: Definir oportunidades', duration: 30 },
        { name: 'IDEACIÓN: Break', duration: 15 },
        { name: 'IDEACIÓN: Brainstorming', duration: 60 },
        { name: 'IDEACIÓN: Selección de ideas', duration: 20 },
        { name: 'IMPLEMENTACIÓN: Prototipado rápido', duration: 90 },
        { name: 'IMPLEMENTACIÓN: Break', duration: 15 },
        { name: 'IMPLEMENTACIÓN: Feedback de prototipos', duration: 45 },
        { name: 'IMPLEMENTACIÓN: Iteración', duration: 30 },
        { name: 'IMPLEMENTACIÓN: Plan de acción', duration: 30 },
        { name: 'IMPLEMENTACIÓN: Presentación final', duration: 30 },
        { name: 'IMPLEMENTACIÓN: Cierre y reflexiones', duration: 20 },
      ]
    }]
  },
  {
    name: "Design Thinking (1 día)",
    daySchedules: [{
      startTime: '', endTime: '', phases: [
        { name: 'EMPATIZAR: Bienvenida e introducción a Design Thinking', duration: 20 },
        { name: 'EMPATIZAR: Definición del problema', duration: 25 },
        { name: 'EMPATIZAR: Mapa de empatía', duration: 40 },
        { name: 'EMPATIZAR: Break', duration: 15 },
        { name: 'EMPATIZAR: Entrevistas y observación', duration: 60 },
        { name: 'DEFINIR: Síntesis de hallazgos', duration: 30 },
        { name: 'DEFINIR: Point of View', duration: 25 },
        { name: 'DEFINIR: Almuerzo', duration: 60 },
        { name: 'DEFINIR: How Might We', duration: 30 },
        { name: 'IDEAR: Warm up creativo', duration: 15 },
        { name: 'IDEAR: Brainstorming', duration: 50 },
        { name: 'IDEAR: Break', duration: 15 },
        { name: 'IDEAR: Selección de ideas', duration: 30 },
        { name: 'PROTOTIPAR: Introducción al prototipado', duration: 15 },
        { name: 'PROTOTIPAR: Construcción de prototipos', duration: 75 },
        { name: 'PROTOTIPAR: Break', duration: 15 },
        { name: 'PROTOTIPAR: Refinamiento', duration: 30 },
        { name: 'TESTEAR: Testing con usuarios', duration: 45 },
        { name: 'TESTEAR: Feedback y aprendizajes', duration: 30 },
        { name: 'TESTEAR: Iteración rápida', duration: 30 },
        { name: 'TESTEAR: Plan de siguiente pasos', duration: 20 },
        { name: 'TESTEAR: Cierre y reflexiones', duration: 15 },
      ]
    }]
  },
  {
    name: "Lean Startup (1 día)",
    daySchedules: [{
      startTime: '', endTime: '', phases: [
        { name: 'BUILD: Bienvenida e introducción a Lean Startup', duration: 20 },
        { name: 'BUILD: Identificar el problema', duration: 30 },
        { name: 'BUILD: Definir hipótesis clave', duration: 40 },
        { name: 'BUILD: Break', duration: 15 },
        { name: 'BUILD: Lean Canvas', duration: 60 },
        { name: 'BUILD: Definir MVP', duration: 45 },
        { name: 'BUILD: Almuerzo', duration: 60 },
        { name: 'MEASURE: Identificar métricas clave', duration: 30 },
        { name: 'MEASURE: Definir experimentos', duration: 40 },
        { name: 'MEASURE: Break', duration: 15 },
        { name: 'MEASURE: Crear prototipo de MVP', duration: 90 },
        { name: 'LEARN: Testing con clientes potenciales', duration: 60 },
        { name: 'LEARN: Break', duration: 15 },
        { name: 'LEARN: Análisis de resultados', duration: 40 },
        { name: 'LEARN: Validar o invalidar hipótesis', duration: 30 },
        { name: 'LEARN: Pivotar o perseverar', duration: 30 },
        { name: 'LEARN: Plan de acción', duration: 30 },
        { name: 'LEARN: Cierre y próximos pasos', duration: 20 },
      ]
    }]
  },
  {
    name: "This is Service Design (1 día)",
    daySchedules: [{
      startTime: '', endTime: '', phases: [
        { name: 'INVESTIGACIÓN: Bienvenida e introducción a Service Design', duration: 20 },
        { name: 'INVESTIGACIÓN: Definir el servicio a diseñar', duration: 30 },
        { name: 'INVESTIGACIÓN: Identificar stakeholders', duration: 25 },
        { name: 'INVESTIGACIÓN: Break', duration: 15 },
        { name: 'INVESTIGACIÓN: Investigación con usuarios', duration: 60 },
        { name: 'INVESTIGACIÓN: Shadowing y observación', duration: 45 },
        { name: 'ANÁLISIS: Almuerzo', duration: 60 },
        { name: 'ANÁLISIS: Customer Journey Map', duration: 50 },
        { name: 'ANÁLISIS: Service Blueprint', duration: 50 },
        { name: 'ANÁLISIS: Break', duration: 15 },
        { name: 'ANÁLISIS: Identificar pain points', duration: 30 },
        { name: 'ANÁLISIS: Definir oportunidades', duration: 25 },
        { name: 'IDEACIÓN: Brainstorming de mejoras', duration: 45 },
        { name: 'IDEACIÓN: Break', duration: 15 },
        { name: 'IDEACIÓN: Diseño de touchpoints', duration: 40 },
        { name: 'IDEACIÓN: Selección de conceptos', duration: 20 },
        { name: 'PROTOTIPADO: Service Prototyping', duration: 60 },
        { name: 'PROTOTIPADO: Storyboard de experiencia', duration: 30 },
        { name: 'PROTOTIPADO: Break', duration: 15 },
        { name: 'PROTOTIPADO: Role-playing del servicio', duration: 45 },
        { name: 'TESTING: Testing con usuarios', duration: 40 },
        { name: 'TESTING: Feedback y aprendizajes', duration: 30 },
        { name: 'TESTING: Iteración del servicio', duration: 25 },
        { name: 'TESTING: Plan de implementación', duration: 20 },
        { name: 'TESTING: Cierre y próximos pasos', duration: 15 },
      ]
    }]
  },
];