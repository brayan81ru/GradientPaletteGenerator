import { useState } from 'react';
import { Download } from 'lucide-react';
import { GradientColor } from '../types/palette';
import { exportTexture } from '../utils/exportTexture';

interface ExportPanelProps {
  gradients: GradientColor[];
  gridCols: number;
}

export const ExportPanel = ({ gradients, gridCols }: ExportPanelProps) => {
  const [cellSize, setCellSize] = useState(32);

  const handleExport = () => {
    exportTexture(gradients, gridCols, cellSize);
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg border border-gray-700 space-y-4">
      <h3 className="text-lg font-semibold text-gray-200">Export Texture</h3>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Cell Size (pixels per gradient)
        </label>
        <div className="flex gap-2">
          {[16, 32, 64, 128, 256].map((size) => (
            <button
              key={size}
              onClick={() => setCellSize(size)}
              className={`px-4 py-2 rounded transition-colors ${
                cellSize === size
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {size}px
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-gray-800 rounded border border-gray-700">
        <p className="text-sm text-gray-300 mb-2">
          <strong>Output Size:</strong> {gridCols * cellSize}px × {Math.ceil(gradients.length / gridCols) * cellSize}px
        </p>
        <p className="text-sm text-gray-400">
          Each gradient will be {cellSize}×{cellSize} pixels
        </p>
      </div>

      <button
        onClick={handleExport}
        className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
      >
        <Download size={20} />
        Export as PNG
      </button>
    </div>
  );
};
