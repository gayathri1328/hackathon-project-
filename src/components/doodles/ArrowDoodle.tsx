import React from 'react';

interface DoodleProps {
  className?: string;
  strokeColor?: string;
  direction?: 'right' | 'down' | 'curved';
}

export const ArrowDoodle: React.FC<DoodleProps> = ({
  className = "w-8 h-8",
  strokeColor = "#6D1F3A",
  direction = 'right'
}) => {
  if (direction === 'down') {
    return (
      <svg viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path
          d="M 20,6 C 19,22 21,38 20,52 M 8,40 L 20,52 L 32,40"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (direction === 'curved') {
    return (
      <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path
          d="M 8,12 C 16,36 34,42 50,28 M 38,24 L 50,28 L 52,40"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M 6,20 C 20,19 36,21 50,20 M 38,8 L 50,20 L 38,32"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
