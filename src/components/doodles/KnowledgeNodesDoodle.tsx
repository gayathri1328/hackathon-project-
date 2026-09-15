import React from 'react';

interface DoodleProps {
  className?: string;
  strokeColor?: string;
  size?: number;
}

export const KnowledgeNodesDoodle: React.FC<DoodleProps> = ({
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
      {/* Node connecting lines */}
      <path
        d="M 28,30 L 50,52 L 74,32 M 50,52 L 50,78 M 28,30 L 22,68 L 50,78 M 74,32 L 80,68 L 50,78"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 1"
      />
      {/* Central Knowledge Node */}
      <circle cx="50" cy="52" r="8" fill="#FFF8F3" stroke={strokeColor} strokeWidth="2.5" />
      <circle cx="50" cy="52" r="3" fill={strokeColor} />

      {/* Orbiting Satellite Nodes */}
      <circle cx="28" cy="30" r="6" fill="#F8EFF2" stroke={strokeColor} strokeWidth="2.2" />
      <circle cx="74" cy="32" r="6" fill="#F8EFF2" stroke={strokeColor} strokeWidth="2.2" />
      <circle cx="22" cy="68" r="5" fill="#FFF8F3" stroke={strokeColor} strokeWidth="2" />
      <circle cx="80" cy="68" r="5" fill="#FFF8F3" stroke={strokeColor} strokeWidth="2" />
      <circle cx="50" cy="78" r="6" fill="#F8EFF2" stroke={strokeColor} strokeWidth="2.2" />

      {/* Hand-drawn pulse ring */}
      <path
        d="M 40,46 C 44,40 56,40 60,46"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
