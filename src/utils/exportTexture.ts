import { GradientColor } from '../types/palette';

export const exportTexture = (
    gradients: GradientColor[],
    gridCols: number,
    cellSize: number,
    gapSize: number = 0
) => {
  const rows = Math.ceil(gradients.length / gridCols);

  // Calculate power of 2 dimensions for the entire texture
  const calculatePowerOf2 = (size: number) => {
    return Math.pow(2, Math.ceil(Math.log2(size)));
  };

  const textureWidth = calculatePowerOf2(gridCols * cellSize);
  const textureHeight = calculatePowerOf2(rows * cellSize);

  const canvas = document.createElement('canvas');
  canvas.width = textureWidth;
  canvas.height = textureHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  // Set background to transparent
  ctx.clearRect(0, 0, textureWidth, textureHeight);

  gradients.forEach((gradient, index) => {
    const row = Math.floor(index / gridCols);
    const col = index % gridCols;

    // Calculate cell position
    const x = col * cellSize;
    const y = row * cellSize;

    if (gapSize > 0) {
      // Draw cell with gap - the gradient occupies only the inner portion
      const gradientX = x + gapSize;
      const gradientY = y + gapSize;
      const gradientWidth = cellSize - gapSize * 2;
      const gradientHeight = cellSize - gapSize * 2;

      // Create gradient for the inner portion
      const grd = ctx.createLinearGradient(
          gradientX,
          gradientY,
          gradientX,
          gradientY + gradientHeight
      );
      grd.addColorStop(0, gradient.top);
      grd.addColorStop(1, gradient.bottom);

      // Draw the gradient
      ctx.fillStyle = grd;
      ctx.fillRect(gradientX, gradientY, gradientWidth, gradientHeight);

    } else {
      // Draw full cell without gap
      const grd = ctx.createLinearGradient(x, y, x, y + cellSize);
      grd.addColorStop(0, gradient.top);
      grd.addColorStop(1, gradient.bottom);

      ctx.fillStyle = grd;
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  });

  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gradient-palette-${textureWidth}x${textureHeight}-${gridCols}x${rows}-${cellSize}px${gapSize > 0 ? `-gap${gapSize}px` : ''}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  });
};