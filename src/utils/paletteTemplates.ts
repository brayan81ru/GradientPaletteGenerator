import { PaletteTemplate } from '../types/palette';

export const paletteTemplates: PaletteTemplate[] = [
  {
    name: 'Nintendo Classic',
    description: '64 colors inspired by classic Nintendo console palettes',
    grid_size: 64,
    grid_cols: 8,
    gradient_data: [
      { top: '#FFB3BA', bottom: '#8B0000' },
      { top: '#FFDFBA', bottom: '#CC5500' },
      { top: '#FFFFBA', bottom: '#997700' },
      { top: '#BAFFC9', bottom: '#006400' },
      { top: '#BAE1FF', bottom: '#00008B' },
      { top: '#E0BBE4', bottom: '#4B0082' },
      { top: '#FFDFD3', bottom: '#8B4513' },
      { top: '#E6E6FA', bottom: '#483D8B' },

      { top: '#FF6B9D', bottom: '#C41E3A' },
      { top: '#FFA07A', bottom: '#FF4500' },
      { top: '#FFE66D', bottom: '#FFD700' },
      { top: '#06FFA5', bottom: '#228B22' },
      { top: '#4ECDC4', bottom: '#1E90FF' },
      { top: '#D4A5A5', bottom: '#8B008B' },
      { top: '#C9ADA7', bottom: '#A0522D' },
      { top: '#9D84B7', bottom: '#6A0DAD' },

      { top: '#FF4D6D', bottom: '#DC143C' },
      { top: '#FF8C42', bottom: '#FF6347' },
      { top: '#FFF07C', bottom: '#FFB90F' },
      { top: '#52B788', bottom: '#2E8B57' },
      { top: '#3D5A80', bottom: '#191970' },
      { top: '#B388EB', bottom: '#9370DB' },
      { top: '#F4A259', bottom: '#D2691E' },
      { top: '#8E7DBE', bottom: '#7B68EE' },

      { top: '#F72585', bottom: '#B21F66' },
      { top: '#FF9E00', bottom: '#FF8C00' },
      { top: '#FAD02E', bottom: '#FADA5E' },
      { top: '#99D98C', bottom: '#66CDAA' },
      { top: '#62B6CB', bottom: '#4682B4' },
      { top: '#C77DFF', bottom: '#9932CC' },
      { top: '#E09F7D', bottom: '#CD853F' },
      { top: '#B8B8D1', bottom: '#9FB4B8' },

      { top: '#E63946', bottom: '#A52A2A' },
      { top: '#F77F00', bottom: '#FF7F50' },
      { top: '#FCBF49', bottom: '#F4A460' },
      { top: '#06D6A0', bottom: '#20B2AA' },
      { top: '#118AB2', bottom: '#5F9EA0' },
      { top: '#A663CC', bottom: '#8B4789' },
      { top: '#EDB88B', bottom: '#D2B48C' },
      { top: '#CDB4DB', bottom: '#B0A8B9' },

      { top: '#D00000', bottom: '#8B0000' },
      { top: '#E85D04', bottom: '#B22222' },
      { top: '#F48C06', bottom: '#DAA520' },
      { top: '#00B4D8', bottom: '#008B8B' },
      { top: '#0077B6', bottom: '#000080' },
      { top: '#9C89B8', bottom: '#6A5ACD' },
      { top: '#BC6C25', bottom: '#8B4513' },
      { top: '#AFB3F7', bottom: '#7B8CDE' },

      { top: '#9B2226', bottom: '#800000' },
      { top: '#CA6702', bottom: '#FF4500' },
      { top: '#EE9B00', bottom: '#FFA500' },
      { top: '#0096C7', bottom: '#4169E1' },
      { top: '#023E8A', bottom: '#00008B' },
      { top: '#7209B7', bottom: '#4B0082' },
      { top: '#936639', bottom: '#654321' },
      { top: '#8D99AE', bottom: '#6C757D' },

      { top: '#800F2F', bottom: '#5C0029' },
      { top: '#BB3E03', bottom: '#8B2500' },
      { top: '#AE2012', bottom: '#7F1734' },
      { top: '#005F73', bottom: '#003153' },
      { top: '#001219', bottom: '#000000' },
      { top: '#560BAD', bottom: '#2E0854' },
      { top: '#6F4518', bottom: '#4A2511' },
      { top: '#4A5859', bottom: '#2F3537' },
    ],
  },
  {
    name: 'Vibrant Spectrum',
    description: '64 bright and saturated gradients',
    grid_size: 64,
    grid_cols: 8,
    gradient_data: Array.from({ length: 64 }, (_, i) => {
      const hue = (i * 360) / 64;
      const topColor = `hsl(${hue}, 90%, 70%)`;
      const bottomColor = `hsl(${hue}, 90%, 30%)`;
      return { top: topColor, bottom: bottomColor };
    }),
  },
  {
    name: 'Earth Tones',
    description: '64 natural and earthy gradients',
    grid_size: 64,
    grid_cols: 8,
    gradient_data: [
      ...Array.from({ length: 16 }, (_, i) => ({
        top: `hsl(${30 + i * 5}, 60%, ${60 + i}%)`,
        bottom: `hsl(${30 + i * 5}, 60%, ${20 + i}%)`,
      })),
      ...Array.from({ length: 16 }, (_, i) => ({
        top: `hsl(${90 + i * 5}, 50%, ${55 + i}%)`,
        bottom: `hsl(${90 + i * 5}, 50%, ${15 + i}%)`,
      })),
      ...Array.from({ length: 16 }, (_, i) => ({
        top: `hsl(${20 + i * 3}, 70%, ${50 + i}%)`,
        bottom: `hsl(${20 + i * 3}, 70%, ${10 + i}%)`,
      })),
      ...Array.from({ length: 16 }, (_, i) => ({
        top: `hsl(${0 + i * 2}, 30%, ${60 + i}%)`,
        bottom: `hsl(${0 + i * 2}, 30%, ${20 + i}%)`,
      })),
    ],
  },
  {
    name: 'Ocean Depths',
    description: '64 blue and aqua gradients',
    grid_size: 64,
    grid_cols: 8,
    gradient_data: Array.from({ length: 64 }, (_, i) => {
      const hue = 180 + (i * 60) / 64;
      const lightness = 70 - (i * 40) / 64;
      const topColor = `hsl(${hue}, 80%, ${lightness}%)`;
      const bottomColor = `hsl(${hue}, 80%, ${lightness - 40}%)`;
      return { top: topColor, bottom: bottomColor };
    }),
  },
  {
    name: 'Fire & Flame',
    description: '64 warm red, orange, and yellow gradients',
    grid_size: 64,
    grid_cols: 8,
    gradient_data: Array.from({ length: 64 }, (_, i) => {
      const hue = 0 + (i * 60) / 64;
      const saturation = 90 - (i * 30) / 64;
      const topColor = `hsl(${hue}, ${saturation}%, 70%)`;
      const bottomColor = `hsl(${hue}, ${saturation}%, 25%)`;
      return { top: topColor, bottom: bottomColor };
    }),
  },
  {
    name: 'Monochrome Gray',
    description: '64 grayscale gradients from white to black',
    grid_size: 64,
    grid_cols: 8,
    gradient_data: Array.from({ length: 64 }, (_, i) => {
      const lightness = 95 - (i * 90) / 64;
      const topColor = `hsl(0, 0%, ${lightness}%)`;
      const bottomColor = `hsl(0, 0%, ${lightness - 40}%)`;
      return { top: topColor, bottom: bottomColor };
    }),
  },
  {
    name: 'Pastel Dreams',
    description: '64 soft pastel gradients',
    grid_size: 64,
    grid_cols: 8,
    gradient_data: Array.from({ length: 64 }, (_, i) => {
      const hue = (i * 360) / 64;
      const topColor = `hsl(${hue}, 50%, 85%)`;
      const bottomColor = `hsl(${hue}, 50%, 60%)`;
      return { top: topColor, bottom: bottomColor };
    }),
  },
  {
    name: 'Neon Glow',
    description: '64 bright neon gradients',
    grid_size: 64,
    grid_cols: 8,
    gradient_data: Array.from({ length: 64 }, (_, i) => {
      const hue = (i * 360) / 64;
      const topColor = `hsl(${hue}, 100%, 75%)`;
      const bottomColor = `hsl(${hue}, 100%, 40%)`;
      return { top: topColor, bottom: bottomColor };
    }),
  },
];
