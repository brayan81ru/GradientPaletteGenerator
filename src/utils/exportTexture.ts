import { GradientColor } from '../types/palette';

// In your utils/exportTexture.ts
export const exportTexture = (
    gradients: GradientColor[],
    gridCols: number,
    cellSize: number,
    gapSize: number = 0 // Add gap parameter with default value 0
) => {
  const rows = Math.ceil(gradients.length / gridCols);

  // Calculate canvas dimensions including gaps
  const canvasWidth = gridCols * cellSize + (gridCols - 1) * gapSize;
  const canvasHeight = rows * cellSize + (rows - 1) * gapSize;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  // Set background to transparent
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  gradients.forEach((gradient, index) => {
    const row = Math.floor(index / gridCols);
    const col = index % gridCols;

    // Calculate position including gaps
    const x = col * (cellSize + gapSize);
    const y = row * (cellSize + gapSize);

    // Create gradient
    const grd = ctx.createLinearGradient(x, y, x, y + cellSize);
    grd.addColorStop(0, gradient.top);
    grd.addColorStop(1, gradient.bottom);

    // Draw cell
    ctx.fillStyle = grd;
    ctx.fillRect(x, y, cellSize, cellSize);
  });

  // Export logic remains the same...
  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gradient-palette-${gridCols}x${rows}-${cellSize}px${gapSize > 0 ? `-gap${gapSize}px` : ''}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  });
};