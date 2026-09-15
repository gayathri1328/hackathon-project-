import React from 'react';

interface DoodleProps {
  className?: string;
  strokeColor?: string;
  size?: number;
}

export const BrainDoodle: React.FC<DoodleProps> = ({
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
      {/* Hand-drawn organic brain hemispheres with neural nodes */}
      <path
        d="M 50,22 C 42,16 30,18 24,26 C 16,34 16,48 22,56 C 18,64 20,74 28,80 C 36,86 46,82 50,78"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 50,22 C 58,16 70,18 76,26 C 84,34 84,48 78,56 C 82,64 80,74 72,80 C 64,86 54,82 50,78"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Central neural fissure */}
      <path
        d="M 50,22 C 48,34 52,48 49,60 C 51,68 50,78 50,78"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="2 1"
      />
      {/* Hand-drawn convolutions */}
      <path
        d="M 32,34 C 40,36 42,46 36,50 C 30,54 28,66 38,66"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 68,34 C 60,36 58,46 64,50 C 70,54 72,66 62,66"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Synaptic spark dots */}
      <circle cx="28" cy="42" r="2.5" fill={strokeColor} />
      <circle cx="72" cy="42" r="2.5" fill={strokeColor} />
      <circle cx="50" cy="36" r="2" fill={strokeColor} opacity="0.7" />
      {/* Idea burst accent */}
      <path d="M 50,14 L 50,8" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      <path d="M 38,15 L 34,10" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      <path d="M 62,15 L 66,10" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
