import { GradientColor } from '../types/palette';
import { GradientCell } from './GradientCell';

interface PaletteGridProps {
  gradients: GradientColor[];
  gridCols: number;
  selectedIndex: number | null;
  onCellClick: (index: number) => void;
  cellSize?: 'sm' | 'md' | 'lg';
}

export const PaletteGrid = ({
  gradients,
  gridCols,
  selectedIndex,
  onCellClick,
  cellSize = 'md'
}: PaletteGridProps) => {
  return (
    <div
      className="grid gap-1 p-4 bg-gray-900 rounded-lg border border-gray-700"
      style={{
        gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`
      }}
    >
      {gradients.map((gradient, index) => (
        <GradientCell
          key={index}
          gradient={gradient}
          isSelected={selectedIndex === index}
          onClick={() => onCellClick(index)}
          size={cellSize}
        />
      ))}
    </div>
  );
};
