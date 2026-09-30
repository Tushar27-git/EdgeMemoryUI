import React from 'react';

interface WordmarkProps {
  size?: 'normal' | 'large';
  onClick?: () => void;
}

export const Wordmark: React.FC<WordmarkProps> = ({ size = 'normal', onClick }) => {
  const edgeSize = size === 'large' ? '32px' : '26px';
  const memorySize = size === 'large' ? '24px' : '20px';

  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '0.25em',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: edgeSize,
          lineHeight: 1,
          color: 'var(--heading)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
        }}
      >
        edge
      </span>
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: memorySize,
          lineHeight: 1,
          color: 'var(--text-muted)',
          fontWeight: 400,
          letterSpacing: '-0.01em',
        }}
      >
        memory
      </span>
    </div>
  );
};
