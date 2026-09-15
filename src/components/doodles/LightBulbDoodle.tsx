import React from 'react';

interface DoodleProps {
  className?: string;
  strokeColor?: string;
  size?: number;
}

export const LightBulbDoodle: React.FC<DoodleProps> = ({
  className = "w-10 h-10",
  strokeColor = "#6D1F3A",
  size
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      {/* Bulb body outline */}
      <path
        d="M 32,54 C 24,46 22,34 28,24 C 36,12 64,12 72,24 C 78,34 76,46 68,54 C 64,59 63,65 62,70 L 38,70 C 37,65 36,59 32,54 Z"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Filament */}
      <path
        d="M 44,70 L 44,48 C 44,42 48,40 50,44 C 52,40 56,42 56,48 L 56,70"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Screw base */}
      <path d="M 40,76 L 60,76" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 42,82 L 58,82" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 46,88 L 54,88" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
      {/* Idea glow rays */}
      <line x1="50" y1="6" x2="50" y2="2" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="18" x2="15" y2="14" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="80" y1="18" x2="85" y2="14" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="38" x2="6" y2="38" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="88" y1="38" x2="94" y2="38" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};
