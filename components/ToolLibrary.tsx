import React from 'react';
import { toolCategories, Tool } from '../toolLibraryData';

const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => {
  const handleDragStart = (e: React.DragEvent) => {
    // Usamos JSON para pasar los datos completos de la herramienta
    e.dataTransfer.setData('application/json', JSON.stringify(tool));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-gray-700 p-3 rounded-md cursor-move text-sm text-gray-200 hover:bg-teal-500/20 hover:text-white transition-colors"
    >
      <p className="font-semibold">{tool.name}</p>
      <p className="font-mono text-xs text-gray-400">{tool.duration} min</p>
    </div>
  );
};

const ToolLibrary: React.FC = () => {
  return (
    <div className="w-full lg:w-80 xl:w-96 bg-gray-900/50 p-4 rounded-2xl border border-gray-700 flex-shrink-0">
      <h2 className="text-xl font-bold text-teal-300 mb-4 text-center">Biblioteca de Herramientas</h2>
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
        {toolCategories.map((category) => (
          <div key={category.categoryName}>
            <h3 className="text-md font-semibold text-gray-400 mb-3 sticky top-0 bg-gray-900/80 backdrop-blur-sm py-1">{category.categoryName}</h3>
            <div className="space-y-2">
              {category.tools.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolLibrary;
