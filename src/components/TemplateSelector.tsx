import { paletteTemplates } from '../utils/paletteTemplates';
import { GradientColor } from '../types/palette';

interface TemplateSelectorProps {
  onSelectTemplate: (gradients: GradientColor[], gridCols: number, name: string) => void;
}

export const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-200">Load Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {paletteTemplates.map((template) => (
          <button
            key={template.name}
            onClick={() =>
              onSelectTemplate(template.gradient_data, template.grid_cols, template.name)
            }
            className="p-4 bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-blue-500 rounded-lg text-left transition-all group"
          >
            <h4 className="font-semibold text-gray-200 group-hover:text-blue-400 mb-1">
              {template.name}
            </h4>
            <p className="text-sm text-gray-400 mb-2">{template.description}</p>
            <div className="flex gap-1 flex-wrap">
              {template.gradient_data.slice(0, 8).map((grad, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded"
                  style={{
                    background: `linear-gradient(to bottom, ${grad.top}, ${grad.bottom})`
                  }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
