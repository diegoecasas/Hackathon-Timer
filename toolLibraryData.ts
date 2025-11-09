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
