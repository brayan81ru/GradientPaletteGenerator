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
    const [gapSize, setGapSize] = useState(0); // New state for gap size

    const handleExport = () => {
        exportTexture(gradients, gridCols, cellSize, gapSize); // Pass gapSize to export function
    };

    // Calculate output dimensions with gaps
    const rows = Math.ceil(gradients.length / gridCols);
    const outputWidth = gridCols * cellSize + (gridCols - 1) * gapSize;
    const outputHeight = rows * cellSize + (rows - 1) * gapSize;

    return (
        <div className="p-6 bg-gray-900 rounded-lg border border-gray-700 space-y-4">
            <h3 className="text-lg font-semibold text-gray-200">Export Texture</h3>

            <div className="space-y-4">
                {/* Cell Size Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                        Cell Size (pixels per gradient)
                    </label>
                    <div className="flex gap-2 flex-wrap">
                        {[16, 32, 64, 128, 256].map((size) => (
                            <button
                                key={size}
                                onClick={() => setCellSize(size)}
                                className={`px-3 py-2 rounded transition-colors text-sm ${
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

                {/* Gap Size Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                        Gap Between Cells (pixels)
                    </label>
                    <div className="flex gap-2 flex-wrap">
                        {[0, 1, 2, 4, 8].map((gap) => (
                            <button
                                key={gap}
                                onClick={() => setGapSize(gap)}
                                className={`px-3 py-2 rounded transition-colors text-sm ${
                                    gapSize === gap
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                {gap === 0 ? 'No Gap' : `${gap}px`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Output Info */}
                <div className="p-4 bg-gray-800 rounded border border-gray-700">
                    <p className="text-sm text-gray-300 mb-1">
                        <strong>Output Size:</strong> {outputWidth}px × {outputHeight}px
                    </p>
                    <p className="text-sm text-gray-300 mb-1">
                        <strong>Grid:</strong> {gridCols} × {rows} cells
                    </p>
                    <p className="text-sm text-gray-400">
                        Each gradient: {cellSize}×{cellSize}px {gapSize > 0 && `+ ${gapSize}px gap`}
                    </p>
                </div>
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