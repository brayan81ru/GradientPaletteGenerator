import { GradientColor } from '../types/palette';

export const exportTexture = (
  gradients: GradientColor[],
  gridCols: number,
  cellSize: number = 32
): void => {
  const gridRows = Math.ceil(gradients.length / gridCols);
  const canvas = document.createElement('canvas');
  canvas.width = gridCols * cellSize;
  canvas.height = gridRows * cellSize;
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  gradients.forEach((gradient, index) => {
    const col = index % gridCols;
    const row = Math.floor(index / gridCols);
    const x = col * cellSize;
    const y = row * cellSize;

    const grad = ctx.createLinearGradient(x, y, x, y + cellSize);
    grad.addColorStop(0, gradient.top);
    grad.addColorStop(1, gradient.bottom);

    ctx.fillStyle = grad;
    ctx.fillRect(x, y, cellSize, cellSize);
  });

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gradient-palette-${Date.now()}.png`;
    a.click();
    URL.revokeObjectURL(url);
  });
};
