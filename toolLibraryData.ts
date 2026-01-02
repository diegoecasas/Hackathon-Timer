import { Phase } from './types';

export interface Tool {
  name: string;
  duration: number; // in minutes
}

export interface ToolCategory {
  categoryName: string;
  tools: Tool[];
}

export interface Methodology {
  methodologyName: string;
  categories: ToolCategory[];
}


export const methodologies: Methodology[] = [
  {
    methodologyName: "General",
    categories: [{
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
    }]
  },
  {
    methodologyName: "Mobius Loop",
    categories: [
      {
        categoryName: "1. FOUNDATION",
        tools: [
          { name: "Check-ins", duration: 10 },
          { name: "1-2-4-All", duration: 30 },
          { name: "Working Agreements", duration: 60 },
          { name: "Architectural Decision Records (ADR)", duration: 60 },
          { name: "Affinity Mapping", duration: 90 },
          { name: "15/5 Report", duration: 20 },
          { name: "Celebrating Failure", duration: 30 },
          { name: "Team Canvas", duration: 90 },
          { name: "Burndown Chart (setup y revisión)", duration: 30 },
          { name: "Behavior-Driven Development – Discovery Session", duration: 120 },
        ]
      },
      {
        categoryName: "2. DISCOVER",
        tools: [
          { name: "User Interviews", duration: 60 },
          { name: "Jobs To Be Done Interview", duration: 90 },
          { name: "Empathy Mapping", duration: 60 },
          { name: "Service Blueprint (Discovery)", duration: 120 },
          { name: "Problem Framing", duration: 60 },
          { name: "Assumption Mapping", duration: 60 },
          { name: "Experiment Canvas", duration: 45 },
          { name: "Cognitive Loadometer", duration: 15 },
          { name: "Context Mapping", duration: 90 },
          { name: "Discovery Kick-off Workshop", duration: 180 },
        ]
      },
      {
        categoryName: "3. DECIDE",
        tools: [
          { name: "Dot Voting", duration: 15 },
          { name: "Impact vs Effort Matrix", duration: 45 },
          { name: "How-Now-Wow Matrix", duration: 45 },
          { name: "Eisenhower Matrix", duration: 30 },
          { name: "Prioritization Workshop", duration: 120 },
          { name: "MVP Definition", duration: 90 },
          { name: "Hypothesis Prioritization", duration: 60 },
          { name: "Option Pivot", duration: 45 },
          { name: "Decision Review", duration: 30 },
        ]
      },
      {
        categoryName: "4. DELIVER",
        tools: [
          { name: "Daily Stand-up", duration: 15 },
          { name: "Sprint Planning", duration: 120 },
          { name: "Sprint Review", duration: 60 },
          { name: "4Ls Retrospective", duration: 60 },
          { name: "Agile Health Check", duration: 30 },
          { name: "Blameless Postmortem", duration: 90 },
          { name: "Burn-up Chart Review", duration: 30 },
          { name: "Experiment Review", duration: 60 },
          { name: "Continuous Delivery Pipeline Review", duration: 60 },
        ]
      }
    ]
  },
  {
    methodologyName: "Innovator's ToolKit",
    categories: [
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
    ]
  },
  {
    methodologyName: "Design Thinking",
    categories: [
      {
        categoryName: "FASE 1: EMPATIZAR",
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
        categoryName: "FASE 2: DEFINIR",
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
        categoryName: "FASE 3: IDEAR",
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
        categoryName: "FASE 4: PROTOTIPAR",
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
        categoryName: "FASE 5: TESTEAR",
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
    ]
  },
  {
    methodologyName: "Human Centered Design",
    categories: [
      {
        categoryName: "FASE 1: HEAR (INSPIRACIÓN)",
        tools: [
          { name: "Definir el desafío de diseño", duration: 30 },
          { name: "Identify people to speak with", duration: 25 },
          { name: "Choose research methods", duration: 20 },
          { name: "Develop interview approach", duration: 30 },
          { name: "Develop your mindset", duration: 20 },
          { name: "Interview preparation", duration: 25 },
          { name: "Individual interviews", duration: 45 },
          { name: "Group interviews", duration: 60 },
          { name: "Immersion", duration: 120 },
          { name: "Self-documentation", duration: 90 },
          { name: "Analogous inspiration", duration: 60 },
          { name: "Card sort", duration: 40 },
          { name: "Cognitive walkthrough", duration: 50 },
          { name: "Contextual inquiry", duration: 75 },
          { name: "Draw it", duration: 30 },
          { name: "Fly on the wall", duration: 90 },
          { name: "Guided tour", duration: 60 },
          { name: "Peer observation", duration: 60 },
          { name: "Photo journal", duration: 90 },
          { name: "Rapid ethnography", duration: 120 },
          { name: "Resource flow", duration: 45 },
          { name: "Sacrifice judgment", duration: 20 },
          { name: "Secondary research", duration: 60 },
          { name: "Seek stories", duration: 45 },
          { name: "Shadowing", duration: 90 },
        ]
      },
      {
        categoryName: "FASE 2: CREATE (IDEACIÓN)",
        tools: [
          { name: "Downloads", duration: 40 },
          { name: "Share inspiring stories", duration: 45 },
          { name: "Top five", duration: 30 },
          { name: "Find themes", duration: 60 },
          { name: "Create frameworks", duration: 50 },
          { name: "Explore your hunch", duration: 35 },
          { name: "Create insight statements", duration: 40 },
          { name: "How might we", duration: 30 },
          { name: "Brainstorm new solutions", duration: 60 },
          { name: "Bundle ideas", duration: 40 },
          { name: "Create a concept", duration: 45 },
          { name: "Make a pitch", duration: 30 },
          { name: "Get feedback", duration: 45 },
          { name: "Integrate feedback and iterate", duration: 40 },
          { name: "Build a prototype", duration: 90 },
          { name: "Paper prototype", duration: 45 },
          { name: "Role play", duration: 40 },
          { name: "Storyboard", duration: 60 },
          { name: "Determine what to prototype", duration: 35 },
          { name: "Identify what to learn", duration: 25 },
          { name: "Build with users", duration: 90 },
          { name: "Co-design", duration: 75 },
          { name: "Collage", duration: 45 },
          { name: "Gut check", duration: 20 },
          { name: "Quick and dirty prototype", duration: 60 },
        ]
      },
      {
        categoryName: "FASE 3: DELIVER (IMPLEMENTACIÓN)",
        tools: [
          { name: "Live prototyping", duration: 90 },
          { name: "Get feedback from users", duration: 60 },
          { name: "Incorporate feedback", duration: 45 },
          { name: "Iterate", duration: 60 },
          { name: "Track learnings", duration: 35 },
          { name: "Move forward", duration: 30 },
          { name: "Understand feasibility", duration: 45 },
          { name: "Create a pipeline", duration: 50 },
          { name: "Build partnerships", duration: 60 },
          { name: "Plan a pipeline", duration: 40 },
          { name: "Pilot", duration: 180 },
          { name: "Iterate based on feedback", duration: 75 },
          { name: "Capabilities needed", duration: 40 },
          { name: "Create a roadmap", duration: 60 },
          { name: "Plan for iteration", duration: 45 },
          { name: "Measures of success", duration: 35 },
          { name: "Develop revenue model", duration: 60 },
          { name: "Keep iterating", duration: 45 },
          { name: "Create a pitch", duration: 60 },
          { name: "Build support team", duration: 30 },
          { name: "Funding strategy", duration: 50 },
          { name: "Business model canvas", duration: 60 },
          { name: "Communicate the story", duration: 45 },
          { name: "Storytelling", duration: 40 },
          { name: "Mini pilots", duration: 120 },
          { name: "Staff your project", duration: 35 },
          { name: "Monitor and evaluate", duration: 90 },
          { name: "Build feedback loops", duration: 40 },
          { name: "Keep getting inspired", duration: 30 },
        ]
      },
      {
        categoryName: "HERRAMIENTAS TRANSVERSALES",
        tools: [
          { name: "Design principles", duration: 30 },
          { name: "Analogous models", duration: 45 },
          { name: "Download your learnings", duration: 40 },
          { name: "Share learnings", duration: 30 },
          { name: "Bundle ideas into themes", duration: 45 },
          { name: "Create insight statements", duration: 35 },
          { name: "Generate area of opportunity", duration: 30 },
          { name: "Design principles creation", duration: 40 },
          { name: "Brainstorm", duration: 60 },
          { name: "Select promising solutions", duration: 30 },
          { name: "Stay grounded", duration: 20 },
          { name: "Focus on human values", duration: 5 },
        ]
      },
    ]
  },
    {
    methodologyName: "Design Sprint",
    categories: [
      {
        categoryName: "DÍA 1: MAPEO",
        tools: [
          { name: "Bienvenida y presentaciones", duration: 30 },
          { name: "Sprint challenge", duration: 20 },
          { name: "Long-term goal", duration: 40 },
          { name: "Sprint questions", duration: 30 },
          { name: "Map making", duration: 75 },
          { name: "Ask the experts", duration: 90 },
          { name: "Target selection", duration: 45 },
          { name: "How might we notes", duration: 30 },
          { name: "Reorganize HMW", duration: 20 },
          { name: "Vote on HMW", duration: 15 },
          { name: "Pick a target", duration: 30 },
        ]
      },
      {
        categoryName: "DÍA 2: SKETCH",
        tools: [
          { name: "Lightning demos", duration: 60 },
          { name: "Divide or swarm", duration: 15 },
          { name: "Take notes", duration: 20 },
          { name: "Ideas generation", duration: 30 },
          { name: "Crazy 8's", duration: 8 },
          { name: "Solution sketch", duration: 120 },
          { name: "Art museum", duration: 30 },
          { name: "Heat map voting", duration: 15 },
          { name: "Speed critique", duration: 90 },
          { name: "Straw poll", duration: 20 },
          { name: "Supervote", duration: 15 },
          { name: "Divide winners", duration: 30 },
          { name: "Rumble or all-in-one", duration: 20 },
          { name: "Fake brand names", duration: 15 },
          { name: "Note-and-vote", duration: 20 },
        ]
      },
      {
        categoryName: "DÍA 3: DECIDIR",
        tools: [
          { name: "Sticky decision", duration: 90 },
          { name: "Whiteboard the winner", duration: 60 },
          { name: "Art museum (revisit)", duration: 20 },
          { name: "Supervote (final)", duration: 15 },
          { name: "Storyboard creation", duration: 120 },
          { name: "Opening scene", duration: 30 },
          { name: "Fill in the storyboard", duration: 90 },
          { name: "Check for gaps", duration: 20 },
          { name: "User test flow", duration: 30 },
          { name: "Prototype planning", duration: 30 },
          { name: "Asset collection", duration: 40 },
          { name: "Assign roles", duration: 20 },
        ]
      },
      {
        categoryName: "DÍA 4: PROTOTIPAR",
        tools: [
          { name: "Prototype mindset", duration: 20 },
          { name: "Divide and conquer", duration: 30 },
          { name: "Stitching", duration: 180 },
          { name: "Trial run", duration: 45 },
          { name: "Finalize prototype", duration: 60 },
          { name: "Prepare interview script", duration: 45 },
          { name: "Goldilocks quality", duration: 20 },
          { name: "Done is better than perfect", duration: 15 },
          { name: "Collect assets", duration: 60 },
          { name: "Write copy", duration: 45 },
          { name: "Create components", duration: 120 },
          { name: "Combine components", duration: 90 },
          { name: "Final review", duration: 30 },
        ]
      },
      {
        categoryName: "DÍA 5: VALIDAR",
        tools: [
          { name: "Interview preparation", duration: 30 },
          { name: "Five-act interview", duration: 60 },
          { name: "Interview 1", duration: 60 },
          { name: "Quick debrief", duration: 15 },
          { name: "Interview 2", duration: 60 },
          { name: "Quick debrief", duration: 15 },
          { name: "Interview 3", duration: 60 },
          { name: "Quick debrief", duration: 15 },
          { name: "Interview 4", duration: 60 },
          { name: "Quick debrief", duration: 15 },
          { name: "Interview 5", duration: 60 },
          { name: "Pattern identification", duration: 60 },
          { name: "Learning synthesis", duration: 45 },
          { name: "Decide next steps", duration: 30 },
          { name: "Sprint report", duration: 45 },
          { name: "Celebrate", duration: 15 },
        ]
      },
      {
        categoryName: "HERRAMIENTAS TRANSVERSALES",
        tools: [
          { name: "Timeboxing", duration: 5 },
          { name: "Dot voting", duration: 15 },
          { name: "Decider vote", duration: 10 },
          { name: "Silent working", duration: 30 },
          { name: "Note-taking", duration: 5 },
          { name: "Documentation", duration: 5 },
          { name: "Energy checks", duration: 5 },
          { name: "Facilitator prompts", duration: 10 },
        ]
      },
    ]
  },
  {
    methodologyName: "Systems Thinking",
    categories: [
      {
        categoryName: "FASE 1: IDENTIFICAR EL SISTEMA",
        tools: [
            { name: "Definición de límites del sistema", duration: 30 },
            { name: "Identificación de stakeholders", duration: 40 },
            { name: "Mapeo de contexto", duration: 45 },
            { name: "Análisis de entorno", duration: 50 },
            { name: "Iceberg model", duration: 40 },
            { name: "Timeline histórico", duration: 35 },
            { name: "Behavior over time graphs", duration: 45 },
            { name: "Variables clave del sistema", duration: 30 },
        ]
      },
      {
        categoryName: "FASE 2: MAPEAR ESTRUCTURA",
        tools: [
            { name: "Causal loop diagram", duration: 90 },
            { name: "Stock and flow diagram", duration: 120 },
            { name: "System archetypes", duration: 60 },
            { name: "Connection circles", duration: 45 },
            { name: "Feedback loops", duration: 60 },
            { name: "Reinforcing loops", duration: 45 },
            { name: "Balancing loops", duration: 45 },
            { name: "Delays identification", duration: 30 },
            { name: "Leverage points mapping", duration: 50 },
        ]
      },
      {
        categoryName: "FASE 3: ANALIZAR DINÁMICAS",
        tools: [
            { name: "Simulación de escenarios", duration: 90 },
            { name: "Análisis de retroalimentación", duration: 60 },
            { name: "Identificar patrones", duration: 45 },
            { name: "Mental models", duration: 50 },
            { name: "Behavior patterns", duration: 40 },
            { name: "System dynamics", duration: 75 },
            { name: "Unintended consequences", duration: 45 },
            { name: "Ripple effect analysis", duration: 50 },
        ]
      },
      {
        categoryName: "FASE 4: IDENTIFICAR PALANCAS",
        tools: [
            { name: "Leverage points analysis", duration: 60 },
            { name: "Intervention points", duration: 45 },
            { name: "High leverage actions", duration: 40 },
            { name: "System boundaries redefinition", duration: 35 },
            { name: "Policy resistance analysis", duration: 50 },
            { name: "Fixes that fail", duration: 40 },
            { name: "Shifting the burden", duration: 45 },
            { name: "Success to the successful", duration: 40 },
        ]
      },
      {
        categoryName: "FASE 5: DISEÑAR INTERVENCIONES",
        tools: [
            { name: "Theory of change", duration: 60 },
            { name: "Intervention design", duration: 75 },
            { name: "Scenario planning", duration: 90 },
            { name: "Prototyping interventions", duration: 90 },
            { name: "Policy design", duration: 60 },
            { name: "Systems innovation", duration: 75 },
            { name: "Transition pathways", duration: 60 },
        ]
      },
      {
        categoryName: "FASE 6: IMPLEMENTAR Y MONITOREAR",
        tools: [
            { name: "Systems monitoring", duration: 45 },
            { name: "Feedback mechanisms", duration: 40 },
            { name: "Adaptive management", duration: 60 },
            { name: "Learning loops", duration: 45 },
            { name: "Systems evaluation", duration: 75 },
            { name: "Iteration cycles", duration: 60 },
            { name: "Long-term tracking", duration: 90 },
        ]
      },
    ]
  },
  {
    methodologyName: "Lean Startup",
    categories: [
      {
        categoryName: "FASE 1: BUILD (Construir)",
        tools: [
          { name: "Lean Canvas", duration: 60 },
          { name: "Business Model Canvas", duration: 75 },
          { name: "Problem identification", duration: 30 },
          { name: "Customer segments definition", duration: 40 },
          { name: "Value proposition", duration: 45 },
          { name: "Unique value proposition", duration: 30 },
          { name: "Solution hypothesis", duration: 35 },
          { name: "MVP definition", duration: 60 },
          { name: "MVP scope", duration: 45 },
          { name: "Feature prioritization", duration: 40 },
          { name: "Minimum features set", duration: 30 },
          { name: "Build-Measure-Learn loop", duration: 40 },
          { name: "Hypothesis statement", duration: 25 },
        ]
      },
      {
        categoryName: "FASE 2: MEASURE (Medir)",
        tools: [
          { name: "Key metrics definition", duration: 45 },
          { name: "Pirate metrics (AARRR)", duration: 50 },
          { name: "North Star metric", duration: 30 },
          { name: "Vanity vs actionable metrics", duration: 35 },
          { name: "Cohort analysis", duration: 60 },
          { name: "Funnel analysis", duration: 55 },
          { name: "Customer interviews", duration: 45 },
          { name: "Landing page testing", duration: 90 },
          { name: "Smoke test", duration: 75 },
          { name: "Concierge MVP", duration: 120 },
          { name: "Wizard of Oz MVP", duration: 90 },
          { name: "Split testing", duration: 60 },
          { name: "Customer development interviews", duration: 50 },
        ]
      },
      {
        categoryName: "FASE 3: LEARN (Aprender)",
        tools: [
          { name: "Data analysis", duration: 60 },
          { name: "Customer feedback synthesis", duration: 45 },
          { name: "Validated learning", duration: 40 },
          { name: "Innovation accounting", duration: 55 },
          { name: "Learning milestones", duration: 35 },
          { name: "Actionable metrics review", duration: 45 },
          { name: "Build-Measure-Learn feedback", duration: 30 },
        ]
      },
      {
        categoryName: "FASE 4: PIVOT OR PERSEVERE",
        tools: [
          { name: "Pivot decision framework", duration: 45 },
          { name: "Zoom-in pivot", duration: 40 },
          { name: "Zoom-out pivot", duration: 40 },
          { name: "Customer segment pivot", duration: 45 },
          { name: "Customer need pivot", duration: 40 },
          { name: "Platform pivot", duration: 50 },
          { name: "Business architecture pivot", duration: 45 },
          { name: "Value capture pivot", duration: 40 },
          { name: "Engine of growth pivot", duration: 45 },
          { name: "Channel pivot", duration: 40 },
          { name: "Technology pivot", duration: 50 },
          { name: "Persevere validation", duration: 35 },
        ]
      },
      {
        categoryName: "FASE 5: SCALE (Escalar)",
        tools: [
          { name: "Growth hypothesis", duration: 45 },
          { name: "Viral growth engine", duration: 60 },
          { name: "Sticky growth engine", duration: 55 },
          { name: "Paid growth engine", duration: 55 },
          { name: "Continuous deployment", duration: 90 },
          { name: "A/B testing at scale", duration: 75 },
          { name: "Product-market fit validation", duration: 60 },
          { name: "Growth hacking strategies", duration: 75 },
          { name: "Customer acquisition cost (CAC)", duration: 40 },
          { name: "Lifetime value (LTV)", duration: 45 },
          { name: "Unit economics", duration: 50 },
        ]
      },
    ]
  },
  {
    methodologyName: "Running Lean",
    categories: [
      {
        categoryName: "FASE 1: DOCUMENTAR TU PLAN A",
        tools: [
          { name: "Lean Canvas completo", duration: 75 },
          { name: "Identificar clientes", duration: 30 },
          { name: "Definir problema", duration: 35 },
          { name: "Definir solución existente", duration: 25 },
          { name: "Propuesta de valor única", duration: 40 },
          { name: "Ventaja especial", duration: 30 },
          { name: "Canales", duration: 35 },
          { name: "Segmentos de clientes", duration: 40 },
          { name: "Estructura de costes", duration: 45 },
          { name: "Fuentes de ingresos", duration: 45 },
          { name: "Métricas clave", duration: 40 },
        ]
      },
      {
        categoryName: "FASE 2: IDENTIFICAR RIESGOS",
        tools: [
          { name: "Product risk assessment", duration: 40 },
          { name: "Customer risk assessment", duration: 35 },
          { name: "Market risk assessment", duration: 40 },
          { name: "Priorización de riesgos", duration: 30 },
          { name: "Riskiest assumption", duration: 25 },
          { name: "Ranking de supuestos", duration: 35 },
          { name: "Hypothesis prioritization", duration: 30 },
        ]
      },
      {
        categoryName: "FASE 3: TESTEAR PROBLEMA",
        tools: [
          { name: "Problem interview script", duration: 40 },
          { name: "Customer discovery interviews", duration: 60 },
          { name: "Problem validation", duration: 50 },
          { name: "Early adopter identification", duration: 45 },
          { name: "Customer worldview", duration: 35 },
          { name: "Existing alternatives analysis", duration: 40 },
          { name: "Problem ranking", duration: 30 },
          { name: "Story testing", duration: 45 },
          { name: "Demo creation", duration: 75 },
        ]
      },
      {
        categoryName: "FASE 4: TESTEAR SOLUCIÓN",
        tools: [
          { name: "Solution interview script", duration: 45 },
          { name: "Solution demo", duration: 60 },
          { name: "MVP prototype", duration: 90 },
          { name: "Pricing test", duration: 40 },
          { name: "Customer commitment test", duration: 45 },
          { name: "Solution validation", duration: 55 },
          { name: "Feature prioritization", duration: 40 },
          { name: "Unique value proposition test", duration: 35 },
        ]
      },
      {
        categoryName: "FASE 5: VERIFICAR QUALITATIVE",
        tools: [
          { name: "Activation metrics", duration: 35 },
          { name: "Retention metrics", duration: 40 },
          { name: "Revenue metrics", duration: 40 },
          { name: "Referral metrics", duration: 35 },
          { name: "Customer lifecycle", duration: 50 },
          { name: "Funnel metrics", duration: 45 },
          { name: "Cohort analysis", duration: 60 },
          { name: "Problem/solution fit validation", duration: 45 },
        ]
      },
      {
        categoryName: "FASE 6: VERIFICAR QUANTITATIVE",
        tools: [
          { name: "Smoke test", duration: 90 },
          { name: "Landing page test", duration: 75 },
          { name: "Explainer video", duration: 120 },
          { name: "Pre-order campaign", duration: 90 },
          { name: "Concierge test", duration: 120 },
          { name: "Wizard of Oz test", duration: 90 },
          { name: "Customer acquisition", duration: 60 },
          { name: "Conversion optimization", duration: 75 },
        ]
      },
      {
        categoryName: "FASE 7: ITERAR O PIVOTAR",
        tools: [
          { name: "Learning review", duration: 45 },
          { name: "Pivot decision", duration: 40 },
          { name: "Persevere validation", duration: 35 },
          { name: "Plan update", duration: 30 },
          { name: "Next iteration planning", duration: 45 },
          { name: "Roadmap adjustment", duration: 40 },
        ]
      },
    ]
  },
  {
    methodologyName: "Business Model Generation",
    categories: [
      {
        categoryName: "FASE 1: MOVILIZAR",
        tools: [
          { name: "Kick-off meeting", duration: 30 },
          { name: "Definir alcance del proyecto", duration: 25 },
          { name: "Identificar stakeholders", duration: 30 },
          { name: "Formar equipo de diseño", duration: 20 },
          { name: "Establecer objetivos", duration: 25 },
          { name: "Preparar materiales", duration: 15 },
        ]
      },
      {
        categoryName: "FASE 2: COMPRENDER",
        tools: [
          { name: "Business Model Canvas actual", duration: 60 },
          { name: "Análisis de segmentos de clientes", duration: 45 },
          { name: "Customer jobs analysis", duration: 40 },
          { name: "Mapeo de propuestas de valor", duration: 50 },
          { name: "Análisis de canales", duration: 40 },
          { name: "Análisis de relaciones con clientes", duration: 40 },
          { name: "Análisis de fuentes de ingresos", duration: 45 },
          { name: "Análisis de recursos clave", duration: 40 },
          { name: "Análisis de actividades clave", duration: 45 },
          { name: "Análisis de alianzas clave", duration: 40 },
          { name: "Análisis de estructura de costos", duration: 45 },
          { name: "SWOT del modelo actual", duration: 50 },
          { name: "Benchmarking", duration: 60 },
          { name: "Análisis competitivo", duration: 55 },
        ]
      },
      {
        categoryName: "FASE 3: DISEÑAR",
        tools: [
          { name: "Ideation workshop", duration: 90 },
          { name: "Brainstorming de modelos", duration: 75 },
          { name: "Epic meaning brainstorming", duration: 45 },
          { name: "What-if questions", duration: 40 },
          { name: "Analogías de otros sectores", duration: 50 },
          { name: "Business model patterns", duration: 60 },
          { name: "Recombinación de elementos", duration: 45 },
          { name: "Zoom-in", duration: 30 },
          { name: "Zoom-out", duration: 30 },
          { name: "Multi-stakeholder maps", duration: 60 },
          { name: "Business model portfolio", duration: 75 },
          { name: "Prototipar modelos", duration: 90 },
          { name: "Visual thinking", duration: 60 },
          { name: "Storytelling del modelo", duration: 45 },
        ]
      },
      {
        categoryName: "FASE 4: EVALUAR",
        tools: [
          { name: "Criterios de evaluación", duration: 30 },
          { name: "SWOT de nuevos modelos", duration: 50 },
          { name: "Business case", duration: 75 },
          { name: "Análisis financiero", duration: 90 },
          { name: "Risk assessment", duration: 45 },
          { name: "Feasibility analysis", duration: 60 },
          { name: "Desirability testing", duration: 55 },
          { name: "Viability testing", duration: 60 },
          { name: "Comparación de modelos", duration: 40 },
          { name: "Selección de modelo", duration: 35 },
          { name: "Pre-mortem", duration: 40 },
        ]
      },
      {
        categoryName: "FASE 5: IMPLEMENTAR",
        tools: [
          { name: "Roadmap de implementación", duration: 60 },
          { name: "Action plan", duration: 45 },
          { name: "Quick wins identification", duration: 30 },
          { name: "Pilot planning", duration: 75 },
          { name: "Resource allocation", duration: 45 },
          { name: "Timeline creation", duration: 40 },
          { name: "Milestone definition", duration: 35 },
          { name: "Governance structure", duration: 40 },
          { name: "Change management plan", duration: 60 },
          { name: "Communication plan", duration: 45 },
          { name: "Training plan", duration: 50 },
        ]
      },
      {
        categoryName: "FASE 6: GESTIONAR",
        tools: [
          { name: "Performance dashboard", duration: 60 },
          { name: "KPI tracking", duration: 45 },
          { name: "Business model monitoring", duration: 50 },
          { name: "Adaptation triggers", duration: 30 },
          { name: "Continuous improvement", duration: 45 },
          { name: "Portfolio management", duration: 55 },
          { name: "Innovation pipeline", duration: 50 },
          { name: "Business model evolution", duration: 60 },
          { name: "Pivot or persevere review", duration: 40 },
          { name: "Learning review", duration: 35 },
          { name: "Update cycles", duration: 30 },
        ]
      },
    ]
  },
  {
    methodologyName: "Value Proposition Design",
    categories: [
      {
        categoryName: "FASE 1: CANVAS",
        tools: [
          { name: "Value Proposition Canvas", duration: 60 },
          { name: "Customer profile", duration: 45 },
          { name: "Customer jobs", duration: 40 },
          { name: "Customer pains", duration: 40 },
          { name: "Customer gains", duration: 40 },
          { name: "Value map", duration: 45 },
          { name: "Products & services", duration: 35 },
          { name: "Pain relievers", duration: 40 },
          { name: "Gain creators", duration: 40 },
          { name: "Fit assessment", duration: 30 },
        ]
      },
      {
        categoryName: "FASE 2: DISEÑAR",
        tools: [
          { name: "Idea generation", duration: 60 },
          { name: "Alternative value propositions", duration: 75 },
          { name: "Brainstorming de propuestas", duration: 60 },
          { name: "Job mapping", duration: 50 },
          { name: "Pain brainstorming", duration: 45 },
          { name: "Gain brainstorming", duration: 45 },
          { name: "Pain reliever ideas", duration: 50 },
          { name: "Gain creator ideas", duration: 50 },
          { name: "Feature prioritization", duration: 40 },
          { name: "Value proposition options", duration: 55 },
          { name: "Prototyping value propositions", duration: 90 },
          { name: "Storyboarding", duration: 60 },
          { name: "Napkin pitch", duration: 20 },
        ]
      },
      {
        categoryName: "FASE 3: TESTEAR",
        tools: [
          { name: "Customer interviews", duration: 60 },
          { name: "Problem interview", duration: 50 },
          { name: "Solution interview", duration: 55 },
          { name: "Test cards", duration: 30 },
          { name: "Learning cards", duration: 25 },
          { name: "Assumption mapping", duration: 45 },
          { name: "Hypothesis formulation", duration: 35 },
          { name: "Test design", duration: 40 },
          { name: "Field testing", duration: 90 },
          { name: "Landing page test", duration: 75 },
          { name: "Explainer video", duration: 120 },
          { name: "Prototype testing", duration: 90 },
          { name: "A/B testing", duration: 75 },
          { name: "Concierge test", duration: 120 },
          { name: "Wizard of Oz test", duration: 90 },
        ]
      },
      {
        categoryName: "FASE 4: EVALUAR",
        tools: [
          { name: "Evidence collection", duration: 40 },
          { name: "Data synthesis", duration: 45 },
          { name: "Learning synthesis", duration: 40 },
          { name: "Pattern identification", duration: 35 },
          { name: "Insight generation", duration: 40 },
          { name: "Fit validation", duration: 35 },
          { name: "Progress assessment", duration: 30 },
          { name: "Decision making", duration: 25 },
          { name: "Pivot or persevere", duration: 40 },
        ]
      },
      {
        categoryName: "FASE 5: ITERAR",
        tools: [
          { name: "Iteration planning", duration: 30 },
          { name: "Canvas update", duration: 40 },
          { name: "Hypothesis refinement", duration: 35 },
          { name: "Test refinement", duration: 40 },
          { name: "Prototype iteration", duration: 75 },
          { name: "Feature adjustment", duration: 45 },
          { name: "Value proposition evolution", duration: 50 },
          { name: "Customer segment pivot", duration: 40 },
          { name: "Job focus pivot", duration: 35 },
          { name: "Pain/gain pivot", duration: 40 },
          { name: "Continuous improvement", duration: 45 },
        ]
      },
      {
        categoryName: "FASE 6: IMPLEMENTAR",
        tools: [
          { name: "Go-to-market strategy", duration: 60 },
          { name: "Messaging development", duration: 50 },
          { name: "Positioning statement", duration: 40 },
          { name: "Sales enablement", duration: 55 },
          { name: "Marketing materials", duration: 90 },
          { name: "Launch plan", duration: 60 },
          { name: "Channel strategy", duration: 50 },
          { name: "Pricing strategy", duration: 55 },
          { name: "Customer onboarding", duration: 60 },
          { name: "Success metrics", duration: 40 },
          { name: "Monitoring plan", duration: 35 },
        ]
      },
    ]
  },
];
