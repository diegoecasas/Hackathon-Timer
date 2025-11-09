import React from 'react';
import { HackathonEventTemplate, Phase } from '../types';
import { workshopTemplates } from '../workshopTemplates';

interface TemplateLibraryProps {
    onSelectTemplate: (template: HackathonEventTemplate) => void;
    onCreateFromScratch: () => void;
    onBack: () => void;
}

const formatTotalDuration = (phases: { duration: number }[]): string => {
  const totalMinutes = phases.reduce((acc, phase) => acc + phase.duration, 0);
  if (totalMinutes === 0) return '0m';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m` : ''}`.trim();
};

const TemplateCard: React.FC<{ template: HackathonEventTemplate; onSelect: () => void; }> = ({ template, onSelect }) => {
  const allPhases = template.daySchedules.flatMap(day => day.phases);
  return (
  <div className="bg-white/10 dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-white/20 flex flex-col justify-between transition-transform hover:scale-105 hover:border-teal-400">
    <div>
      <h3 className="text-2xl font-bold text-teal-300 truncate mb-2">{template.name}</h3>
      <div className="text-gray-400 space-y-1 mb-4">
        <p>{allPhases.length} Fases</p>
        <p>Duración Total: <span className="font-mono">{formatTotalDuration(allPhases)}</span></p>
      </div>
    </div>
    <button onClick={onSelect} className="w-full mt-4 px-4 py-2 text-base font-bold rounded-lg transition-all bg-teal-500 text-white hover:bg-teal-400 focus:ring-4 focus:ring-teal-300">
        Seleccionar Plantilla
    </button>
  </div>
  );
};


const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onSelectTemplate, onCreateFromScratch, onBack }) => {
    return (
        <div className="w-full max-w-5xl mx-auto p-4 sm:p-8">
            <div className="text-center mb-10">
                <h1 className="text-5xl font-extrabold text-teal-300">Crear Nuevo Taller</h1>
                <p className="text-gray-400 mt-3 text-lg">Elige una plantilla de experto o empieza desde cero.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {/* Card para empezar desde cero */}
                <div className="bg-white/5 p-6 rounded-2xl shadow-lg border-2 border-dashed border-gray-600 flex flex-col justify-center items-center text-center transition-colors hover:border-teal-400">
                    <h3 className="text-2xl font-bold text-white mb-2">Crea tu propia metodología</h3>
                    <p className="text-gray-400 mb-4 flex-grow">un consultor experto tiene la facilidad de agrupar diferentes herramientas para crear su propio taller de acuerdo a las necesidades del cliente, selecciona tus herramientas y crea tu propio taller</p>
                    <button onClick={onCreateFromScratch} className="w-full mt-auto px-4 py-2 text-base font-bold rounded-lg transition-all bg-gray-600 text-white hover:bg-gray-500 focus:ring-4 focus:ring-gray-400">
                        Empezar
                    </button>
                </div>

                {workshopTemplates.map((template, index) => (
                    <TemplateCard
                        key={index}
                        template={template}
                        onSelect={() => onSelectTemplate(template)}
                    />
                ))}
            </div>

            <div className="text-center">
                <button onClick={onBack} className="px-6 py-2 font-semibold rounded-lg transition-colors duration-200 text-gray-300 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    &larr; Volver a Mis Talleres
                </button>
            </div>
        </div>
    );
};

export default TemplateLibrary;