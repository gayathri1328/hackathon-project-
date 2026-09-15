import React from 'react';

interface DoodleProps {
  className?: string;
  strokeColor?: string;
  size?: number;
}

export const StarsDoodle: React.FC<DoodleProps> = ({
  className = "w-8 h-8",
  strokeColor = "#6D1F3A",
  size
}) => {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      {/* 4-point sparkle star */}
      <path
        d="M 40,8 C 41,24 44,27 60,28 C 44,29 41,32 40,48 C 39,32 36,29 20,28 C 36,27 39,24 40,8 Z"
        fill={strokeColor}
      />
      {/* Smaller companion star */}
      <path
        d="M 64,52 C 65,60 66,62 74,63 C 66,64 65,66 64,74 C 63,66 62,64 54,63 C 62,62 63,60 64,52 Z"
        fill={strokeColor}
        opacity="0.8"
      />
      {/* Mini twinkle dots */}
      <circle cx="22" cy="58" r="2.5" fill={strokeColor} />
      <circle cx="56" cy="18" r="1.5" fill={strokeColor} />
    </svg>
  );
};
