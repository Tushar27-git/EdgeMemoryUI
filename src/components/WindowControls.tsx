import React from 'react';

export const WindowControls: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '2px 0 16px 4px',
      }}
      aria-hidden="true"
    >
      <span
        style={{
          width: '11px',
          height: '11px',
          borderRadius: '50%',
          backgroundColor: '#FF5F56',
          display: 'inline-block',
        }}
      />
      <span
        style={{
          width: '11px',
          height: '11px',
          borderRadius: '50%',
          backgroundColor: '#FFBD2E',
          display: 'inline-block',
        }}
      />
      <span
        style={{
          width: '11px',
          height: '11px',
          borderRadius: '50%',
          backgroundColor: '#27C93F',
          display: 'inline-block',
        }}
      />
    </div>
  );
};
