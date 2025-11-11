import React, { useState } from 'react';
import { methodologies, Tool } from '../toolLibraryData';

const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(tool));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-gray-700 p-3 rounded-md cursor-move text-sm text-gray-200 hover:bg-teal-500/20 hover:text-white transition-colors ml-4 border-l-2 border-gray-600 pl-4"
    >
      <p className="font-semibold">{tool.name}</p>
      <p className="font-mono text-xs text-gray-400">{tool.duration} min</p>
    </div>
  );
};

const ChevronIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 transform transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ToolLibrary: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "General": true, // Inicia con la categoría "General" abierta por defecto
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full lg:w-80 xl:w-96 bg-gray-900/50 p-4 rounded-2xl border border-gray-700 flex-shrink-0 flex flex-col">
      <h2 className="text-xl font-bold text-teal-300 mb-4 text-center flex-shrink-0">Biblioteca de Herramientas</h2>
      <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-2">
        {methodologies.map((methodology) => {
          const isMethodologyOpen = !!openSections[methodology.methodologyName];
          return (
            <div key={methodology.methodologyName} className="bg-white/5 rounded-lg">
              <button
                onClick={() => toggleSection(methodology.methodologyName)}
                className="w-full flex items-center justify-between p-3 text-left font-bold text-teal-400 hover:bg-white/10 rounded-lg transition-colors"
              >
                <span>{methodology.methodologyName}</span>
                <ChevronIcon isOpen={isMethodologyOpen} />
              </button>
              <div
                className={`grid transition-all duration-500 ease-in-out ${isMethodologyOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                   <div className="p-2 space-y-1">
                    {methodology.categories.map((category) => {
                      const categoryKey = `${methodology.methodologyName}-${category.categoryName}`;
                      const isCategoryOpen = !!openSections[categoryKey];
                      return (
                        <div key={categoryKey}>
                          <button
                            onClick={() => toggleSection(categoryKey)}
                            className="w-full flex items-center justify-between p-2 text-left text-sm font-semibold text-gray-300 hover:bg-white/10 rounded-md transition-colors"
                          >
                             <span>{category.categoryName}</span>
                             <ChevronIcon isOpen={isCategoryOpen} />
                          </button>
                          <div
                             className={`grid transition-all duration-300 ease-in-out ${isCategoryOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                          >
                            <div className="overflow-hidden">
                                <div className="py-2 space-y-2">
                                {category.tools.map((tool) => (
                                    <ToolCard key={`${category.categoryName}-${tool.name}`} tool={tool} />
                                ))}
                                </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                   </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ToolLibrary;