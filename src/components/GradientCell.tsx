import { GradientColor } from '../types/palette';

interface GradientCellProps {
  gradient: GradientColor;
  isSelected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const GradientCell = ({
  gradient,
  isSelected,
  onClick,
  size = 'md'
}: GradientCellProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} rounded border-2 transition-all hover:scale-105 ${
        isSelected ? 'border-blue-400 shadow-lg shadow-blue-500/50' : 'border-gray-700'
      }`}
      style={{
        background: `linear-gradient(to bottom, ${gradient.top}, ${gradient.bottom})`
      }}
      title={`Top: ${gradient.top}\nBottom: ${gradient.bottom}`}
    />
  );
};
