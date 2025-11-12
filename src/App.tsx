import { useState, useEffect } from 'react';
import { Palette as PaletteIcon, Sparkles } from 'lucide-react';
import { GradientColor} from './types/palette';
import { PaletteGrid } from './components/PaletteGrid';
import { GradientEditor } from './components/GradientEditor';
import { TemplateSelector } from './components/TemplateSelector';
import { ExportPanel } from './components/ExportPanel';
import { Toolbar } from './components/Toolbar';

function App() {
  const [gradients, setGradients] = useState<GradientColor[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [gridSize, setGridSize] = useState(64);
  const [gridCols, setGridCols] = useState(8);

  useEffect(() => {
    initializeGradients(gridSize);
  }, [gridSize]);

  const initializeGradients = (size: number) => {
    const newGradients: GradientColor[] = Array.from({ length: size }, (_, i) => {
      const hue = (i * 360) / size;
      return {
        top: `hsl(${hue}, 70%, 60%)`,
        bottom: `hsl(${hue}, 70%, 30%)`,
      };
    });
    setGradients(newGradients);
    setSelectedIndex(null);
  };

  const handleCellClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleGradientUpdate = (gradient: GradientColor) => {
    if (selectedIndex === null) return;
    const newGradients = [...gradients];
    newGradients[selectedIndex] = gradient;
    setGradients(newGradients);
  };

  const handleSelectTemplate = (
    templateGradients: GradientColor[],
    templateCols: number,
  ) => {
    setGradients(templateGradients);
    setGridCols(templateCols);
    setGridSize(templateGradients.length);

    setSelectedIndex(null);
  };


  const handleGridSizeChange = (size: number) => {
    setGridSize(size);
  };

  const handleGridColsChange = (cols: number) => {
    setGridCols(cols);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <PaletteIcon size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Gradient Palette Generator
              </h1>
              <p className="text-gray-400 flex items-center gap-2">
                <Sparkles size={16} />
                Professional texture grids for 3D modeling
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PaletteGrid
              gradients={gradients}
              gridCols={gridCols}
              selectedIndex={selectedIndex}
              onCellClick={handleCellClick}
            />

            <TemplateSelector onSelectTemplate={handleSelectTemplate} />
          </div>

          <div className="space-y-6">
            <Toolbar
              gridSize={gridSize}
              gridCols={gridCols}
              onGridSizeChange={handleGridSizeChange}
              onGridColsChange={handleGridColsChange}
            />

            <GradientEditor
              gradient={selectedIndex !== null ? gradients[selectedIndex] : null}
              cellIndex={selectedIndex}
              onUpdate={handleGradientUpdate}
            />

            <ExportPanel gradients={gradients} gridCols={gridCols} />

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
