import { Grid, Palette, Settings } from 'lucide-react';

interface ToolbarProps {
  gridSize: number;
  gridCols: number;
  onGridSizeChange: (size: number) => void;
  onGridColsChange: (cols: number) => void;
}

export const Toolbar = ({
  gridSize,
  gridCols,
  onGridSizeChange,
  onGridColsChange,
}: ToolbarProps) => {
  const gridSizes = [16, 32, 64, 128, 256];
  const columnOptions = [4, 8, 16, 32];

  return (
    <div className="p-4 bg-gray-900 rounded-lg border border-gray-700 space-y-4">
      <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
        <Settings size={20} />
        Grid Settings
      </h3>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
            <Grid size={16} />
            Total Colors
          </label>
          <div className="grid grid-cols-5 gap-2">
            {gridSizes.map((size) => (
              <button
                key={size}
                onClick={() => onGridSizeChange(size)}
                className={`px-3 py-2 rounded transition-colors text-sm ${
                  gridSize === size
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
            <Palette size={16} />
            Columns
          </label>
          <div className="grid grid-cols-4 gap-2">
            {columnOptions.map((cols) => (
              <button
                key={cols}
                onClick={() => onGridColsChange(cols)}
                className={`px-3 py-2 rounded transition-colors text-sm ${
                  gridCols === cols
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {cols}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 text-sm text-gray-400">
          Grid: {gridCols} × {Math.ceil(gridSize / gridCols)}
        </div>
      </div>
    </div>
  );
};
