import React from 'react';

interface DoodleProps {
  className?: string;
  strokeColor?: string;
  size?: number;
}

export const BooksDoodle: React.FC<DoodleProps> = ({
  className = "w-12 h-12",
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
      {/* Bottom stacked book */}
      <path
        d="M 20,78 L 78,78 C 84,78 88,74 88,70 L 88,62 C 88,58 84,54 78,54 L 20,54"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 20,54 C 15,54 12,58 12,66 C 12,74 15,78 20,78"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line x1="28" y1="66" x2="78" y2="66" stroke={strokeColor} strokeWidth="1.8" strokeDasharray="4 2" />

      {/* Top stacked book angled slightly */}
      <path
        d="M 24,52 L 76,46 C 82,45 86,40 85,34 L 83,26 C 82,20 77,17 71,18 L 22,24"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 22,24 C 17,25 15,30 16,38 C 17,46 20,51 24,52"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Ribbon bookmark hanging down */}
      <path
        d="M 72,46 L 76,64 L 80,59 L 84,63 L 82,45"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#F8EFF2"
      />
      {/* Small doodle star above book */}
      <path
        d="M 40,12 L 42,16 L 46,18 L 42,20 L 40,24 L 38,20 L 34,18 L 38,16 Z"
        fill={strokeColor}
        opacity="0.8"
      />
    </svg>
  );
};
