import { useState } from 'react';
import { Save, FolderOpen, Trash2 } from 'lucide-react';
import { Palette, GradientColor } from '../types/palette';

interface SaveLoadPanelProps {
  palettes: Palette[];
  loading: boolean;
  currentPaletteName: string;
  currentGradients: GradientColor[];
  currentGridCols: number;
  onSave: (name: string, description: string) => Promise<void>;
  onLoad: (palette: Palette) => void;
  onDelete: (id: string) => Promise<void>;
  onNameChange: (name: string) => void;
}

export const SaveLoadPanel = ({
  palettes,
  loading,
  currentPaletteName,
  onSave,
  onLoad,
  onDelete,
  onNameChange,
}: SaveLoadPanelProps) => {
  const [description, setDescription] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!currentPaletteName.trim()) {
      alert('Please enter a palette name');
      return;
    }

    setIsSaving(true);
    try {
      await onSave(currentPaletteName, description);
      setShowSaveDialog(false);
      setDescription('');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save palette');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={currentPaletteName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Palette name..."
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setShowSaveDialog(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
        >
          <Save size={18} />
          Save
        </button>
      </div>

      {showSaveDialog && (
        <div className="p-4 bg-gray-800 border border-gray-600 rounded-lg space-y-3">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded transition-colors"
            >
              {isSaving ? 'Saving...' : 'Confirm Save'}
            </button>
            <button
              onClick={() => setShowSaveDialog(false)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
          <FolderOpen size={20} />
          Saved Palettes
        </h3>
        {loading ? (
          <p className="text-gray-400">Loading palettes...</p>
        ) : palettes.length === 0 ? (
          <p className="text-gray-400">No saved palettes yet</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {palettes.map((palette) => (
              <div
                key={palette.id}
                className="p-3 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-between hover:border-blue-500 transition-colors"
              >
                <button
                  onClick={() => onLoad(palette)}
                  className="flex-1 text-left"
                >
                  <h4 className="font-semibold text-gray-200">{palette.name}</h4>
                  {palette.description && (
                    <p className="text-sm text-gray-400">{palette.description}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {palette.grid_size} colors - {palette.grid_cols} columns
                  </p>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete palette "${palette.name}"?`)) {
                      onDelete(palette.id!);
                    }
                  }}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
