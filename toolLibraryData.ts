import { Phase } from './types';

export interface Tool {
  name: string;
  duration: number; // in minutes
}

export interface ToolCategory {
  categoryName: string;
  tools: Tool[];
}

export const toolCategories: ToolCategory[] = [
  {
    categoryName: "FASE ADMINISTRATIVA",
    tools: [
      { name: "Registro y bienvenida", duration: 15 },
      { name: "Presentación de participantes", duration: 20 },
      { name: "Icebreaker", duration: 15 },
      { name: "Explicación de agenda y objetivos", duration: 10 },
      { name: "Reglas y normas del taller", duration: 10 },
      { name: "Formación de equipos", duration: 15 },
      { name: "Asignación de roles", duration: 10 },
      { name: "Configuración de espacios de trabajo", duration: 15 },
      { name: "Break corto", duration: 10 },
      { name: "Break", duration: 15 },
      { name: "Break largo", duration: 20 },
      { name: "Almuerzo", duration: 60 },
      { name: "Snack break", duration: 10 },
      { name: "Energizer", duration: 5 },
      { name: "Cambio de actividad", duration: 5 },
      { name: "Rotación de equipos", duration: 10 },
      { name: "Preparación de materiales", duration: 10 },
      { name: "Limpieza de espacio", duration: 5 },
      { name: "Montaje para siguiente actividad", duration: 10 },
      { name: "Recap del día", duration: 15 },
      { name: "Reflexión individual", duration: 10 },
      { name: "Compartir aprendizajes", duration: 20 },
      { name: "Feedback del taller", duration: 15 },
      { name: "Foto grupal", duration: 5 },
      { name: "Evaluación", duration: 10 },
      { name: "Próximos pasos", duration: 15 },
      { name: "Cierre y agradecimientos", duration: 10 },
      { name: "Networking", duration: 20 },
      { name: "Toma de notas", duration: 10 },
      { name: "Fotografía de resultados", duration: 10 },
      { name: "Digitalización de contenido", duration: 15 },
      { name: "Preparación de entregables", duration: 20 },
    ]
  },
  {
    categoryName: "DESIGN THINKING - FASE 1: EMPATIZAR",
    tools: [
      { name: "Observación de usuarios", duration: 60 },
      { name: "Entrevistas en profundidad", duration: 45 },
      { name: "Shadowing", duration: 90 },
      { name: "Diario de usuario", duration: 120 },
      { name: "Fotografía etnográfica", duration: 60 },
      { name: "Analogías", duration: 30 },
      { name: "Customer safari", duration: 90 },
      { name: "Entrevista extrema", duration: 45 },
      { name: "Beginners mind", duration: 30 },
    ]
  },
  {
    categoryName: "DESIGN THINKING - FASE 2: DEFINIR",
    tools: [
      { name: "Mapa de empatía", duration: 40 },
      { name: "Personas", duration: 60 },
      { name: "Customer journey map", duration: 75 },
      { name: "Point of view (POV)", duration: 30 },
      { name: "Síntesis de insights", duration: 45 },
      { name: "Affinity diagram", duration: 50 },
      { name: "User stories", duration: 40 },
      { name: "Problem statement", duration: 25 },
      { name: "How might we", duration: 30 },
      { name: "Diagrama de afinidad", duration: 45 },
    ]
  },
  {
    categoryName: "DESIGN THINKING - FASE 3: IDEAR",
    tools: [
      { name: "Brainstorming", duration: 60 },
      { name: "Braindumping", duration: 30 },
      { name: "Brainwriting", duration: 45 },
      { name: "SCAMPER", duration: 45 },
      { name: "Worst possible idea", duration: 30 },
      { name: "Mapa mental", duration: 40 },
      { name: "Analogías forzadas", duration: 35 },
      { name: "Six thinking hats", duration: 45 },
      { name: "Crazy 8's", duration: 15 },
      { name: "Bodystorming", duration: 60 },
      { name: "Co-creation workshop", duration: 90 },
      { name: "Storyboard", duration: 60 },
      { name: "Matriz de selección", duration: 30 },
      { name: "Dot voting", duration: 15 },
    ]
  },
  {
    categoryName: "DESIGN THINKING - FASE 4: PROTOTIPAR",
    tools: [
      { name: "Paper prototyping", duration: 45 },
      { name: "Wireframes", duration: 60 },
      { name: "Maquetas físicas", duration: 90 },
      { name: "Role playing", duration: 40 },
      { name: "Storyboard interactivo", duration: 60 },
      { name: "Prototipo de baja fidelidad", duration: 75 },
      { name: "Prototipo de alta fidelidad", duration: 120 },
      { name: "Wizard of Oz", duration: 60 },
      { name: "Mock-ups", duration: 90 },
      { name: "Service blueprint", duration: 75 },
      { name: "Video prototipo", duration: 90 },
    ]
  },
  {
    categoryName: "DESIGN THINKING - FASE 5: TESTEAR",
    tools: [
      { name: "Entrevistas de testing", duration: 45 },
      { name: "Observación de uso", duration: 60 },
      { name: "A/B testing", duration: 90 },
      { name: "Usability testing", duration: 75 },
      { name: "Test de concepto", duration: 40 },
      { name: "Feedback capture grid", duration: 30 },
      { name: "I like, I wish, What if", duration: 25 },
      { name: "Test con usuarios extremos", duration: 60 },
      { name: "Pilot", duration: 180 },
      { name: "Iteración rápida", duration: 45 },
    ]
  },
  {
    categoryName: "FASE 1: DEFINE (Definir la Oportunidad)",
    tools: [
      { name: "Jobs to be Done (JTBD)", duration: 45 },
      { name: "Job Mapping", duration: 60 },
      { name: "Outcome Expectations", duration: 40 },
      { name: "Value Quotient", duration: 30 },
      { name: "Ethnography", duration: 90 },
      { name: "Scenario Planning", duration: 60 },
      { name: "Heuristic Redefinition", duration: 45 },
      { name: "Nine Windows", duration: 40 },
      { name: "Job Scoping", duration: 30 },
      { name: "Stakeholder Management", duration: 45 },
      { name: "Cognitive Style", duration: 30 },
      { name: "Project Charter", duration: 45 },
      { name: "Innovation Financial Management", duration: 60 },
    ]
  },
  {
    categoryName: "FASE 2: DISCOVER (Descubrir las Ideas)",
    tools: [
      { name: "Brainstorming", duration: 60 },
      { name: "Six Thinking Hats", duration: 45 },
      { name: "Random Stimulus", duration: 40 },
      { name: "Idea Harvesting and Treatment", duration: 60 },
      { name: "SCAMPER", duration: 45 },
      { name: "Biomimicry", duration: 75 },
      { name: "Seventy-six Standard Solutions (TRIZ)", duration: 90 },
    ]
  },
  {
    categoryName: "FASE 3: DEVELOP (Desarrollar los Diseños)",
    tools: [
      { name: "Pugh Matrix", duration: 45 },
      { name: "Conjoint Analysis", duration: 90 },
      { name: "Paired Comparison Analysis", duration: 30 },
      { name: "Design FMEA", duration: 75 },
      { name: "Axiomatic Design", duration: 60 },
      { name: "Design of Experiments (DOE)", duration: 120 },
      { name: "Rapid Prototyping", duration: 90 },
      { name: "Simulation", duration: 120 },
      { name: "Cause & Effect Diagram", duration: 40 },
    ]
  },
  {
    categoryName: "FASE 4: DEMONSTRATE (Demostrar la Innovación)",
    tools: [
        { name: "Measurement Systems Analysis", duration: 60 },
        { name: "Process Capability", duration: 45 },
        { name: "Process Behavior Charts", duration: 40 },
        { name: "SIPOC", duration: 30 },
        { name: "Pilot Testing", duration: 180 },
    ]
  }
];
