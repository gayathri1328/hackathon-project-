import React from 'react';

interface DoodleProps {
  className?: string;
  strokeColor?: string;
  size?: number;
}

export const CodeBracketsDoodle: React.FC<DoodleProps> = ({
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
      {/* Left bracket < */}
      <path
        d="M 36,28 L 18,50 L 36,72"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Slash / */}
      <path
        d="M 58,22 L 42,78"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Right bracket > */}
      <path
        d="M 64,28 L 82,50 L 64,72"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Small doodle star */}
      <circle cx="84" cy="22" r="2.5" fill={strokeColor} />
      <circle cx="16" cy="76" r="2" fill={strokeColor} />
    </svg>
  );
};
