import React from 'react';

interface DoodleProps {
  className?: string;
  strokeColor?: string;
  size?: number;
}

export const GraduationCapDoodle: React.FC<DoodleProps> = ({
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
      {/* Mortarboard top diamond */}
      <path
        d="M 50,24 L 88,38 L 50,52 L 12,38 Z"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FFF8F3"
      />
      {/* Cap skull base */}
      <path
        d="M 28,44 L 28,62 C 28,72 72,72 72,62 L 72,44"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Tassel cord & knot */}
      <path
        d="M 50,38 L 18,48 L 18,66"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tassel fringe */}
      <path
        d="M 14,66 L 22,66 L 20,74 L 16,74 Z"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill={strokeColor}
      />
      {/* Button center */}
      <circle cx="50" cy="38" r="2.5" fill={strokeColor} />
    </svg>
  );
};
