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
    const [gapSize, setGapSize] = useState(0);

    const handleExport = () => {
        exportTexture(gradients, gridCols, cellSize, gapSize);
    };

    // Calculate dimensions for power of 2 texture
    const rows = Math.ceil(gradients.length / gridCols);

    // Calculate effective cell size (cell content minus gaps)
    const effectiveCellSize = cellSize - gapSize;

    // Calculate power of 2 dimensions
    const calculatePowerOf2 = (size: number) => {
        return Math.pow(2, Math.ceil(Math.log2(size)));
    };

    const outputWidth = calculatePowerOf2(gridCols * cellSize);
    const outputHeight = calculatePowerOf2(rows * cellSize);

    return (
        <div className="p-6 bg-gray-900 rounded-lg border border-gray-700 space-y-4">
            <h3 className="text-lg font-semibold text-gray-200">Export Texture</h3>

            <div className="space-y-4">
                {/* Cell Size Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                        Cell Size (pixels per gradient - power of 2)
                    </label>
                    <div className="flex gap-2 flex-wrap">
                        {[16, 32, 64, 128, 256, 512].map((size) => (
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
                        Gap Between Cells (pixels - will reduce effective gradient area)
                    </label>
                    <div className="flex gap-2 flex-wrap">
                        {[0, 1, 2, 4, 8].map((gap) => (
                            <button
                                key={gap}
                                onClick={() => setGapSize(gap)}
                                disabled={gap >= cellSize}
                                className={`px-3 py-2 rounded transition-colors text-sm ${
                                    gapSize === gap
                                        ? 'bg-blue-600 text-white'
                                        : gap >= cellSize
                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                {gap === 0 ? 'No Gap' : `${gap}px`}
                            </button>
                        ))}
                    </div>
                    {gapSize > 0 && (
                        <p className="text-xs text-yellow-400">
                            Effective gradient area: {cellSize - gapSize}×{cellSize - gapSize}px
                        </p>
                    )}
                </div>

                {/* Output Info */}
                <div className="p-4 bg-gray-800 rounded border border-gray-700">
                    <p className="text-sm text-gray-300 mb-1">
                        <strong>Texture Size:</strong> {outputWidth}px × {outputHeight}px (Power of 2)
                    </p>
                    <p className="text-sm text-gray-300 mb-1">
                        <strong>Grid:</strong> {gridCols} × {rows} cells
                    </p>
                    <p className="text-sm text-gray-400 mb-1">
                        <strong>Each cell:</strong> {cellSize}×{cellSize}px {gapSize > 0 && `with ${gapSize}px gap`}
                    </p>
                    {gapSize > 0 && (
                        <p className="text-sm text-yellow-400">
                            <strong>Gradient area:</strong> {effectiveCellSize}×{effectiveCellSize}px
                        </p>
                    )}
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