import { GradientColor } from '../types/palette';
import { ColorPicker } from './ColorPicker';

interface GradientEditorProps {
  gradient: GradientColor | null;
  cellIndex: number | null;
  onUpdate: (gradient: GradientColor) => void;
}

export const GradientEditor = ({ gradient, cellIndex, onUpdate }: GradientEditorProps) => {
  if (!gradient || cellIndex === null) {
    return (
      <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
        <p className="text-gray-400 text-center">Select a cell to edit its gradient</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg border border-gray-700 space-y-4">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">
        Edit Gradient - Cell {cellIndex + 1}
      </h3>

      <ColorPicker
        label="Top Color (Light)"
        value={gradient.top}
        onChange={(color) => onUpdate({ ...gradient, top: color })}
      />

      <ColorPicker
        label="Bottom Color (Dark)"
        value={gradient.bottom}
        onChange={(color) => onUpdate({ ...gradient, bottom: color })}
      />

      <div className="mt-6 pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-400 mb-2">Preview:</p>
        <div
          className="w-full h-32 rounded-lg"
          style={{
            background: `linear-gradient(to bottom, ${gradient.top}, ${gradient.bottom})`
          }}
        />
      </div>
    </div>
  );
};
