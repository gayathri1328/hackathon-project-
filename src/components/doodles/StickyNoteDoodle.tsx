import React from 'react';

interface DoodleProps {
  className?: string;
  strokeColor?: string;
  size?: number;
}

export const StickyNoteDoodle: React.FC<DoodleProps> = ({
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
      {/* Note paper with folded bottom corner */}
      <path
        d="M 18,18 L 82,18 L 82,62 L 62,82 L 18,82 Z"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FFF8F3"
      />
      {/* Dog-ear fold */}
      <path
        d="M 82,62 L 62,62 L 62,82"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#F8EFF2"
      />
      {/* Hand-drawn note lines */}
      <line x1="28" y1="32" x2="72" y2="32" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="44" x2="68" y2="44" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="56" x2="52" y2="56" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      {/* Pin/tape at top */}
      <rect x="42" y="12" width="16" height="8" rx="2" fill="#E8CCD6" stroke={strokeColor} strokeWidth="1.5" />
    </svg>
  );
};
