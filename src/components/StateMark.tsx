import React from 'react';
import { ClaimStateShape } from '../types';

interface StateMarkProps {
  state: ClaimStateShape;
  size?: number;
  className?: string;
  showTooltip?: boolean;
}

export const StateMark: React.FC<StateMarkProps> = ({
  state,
  size = 10,
  className = '',
  showTooltip = false,
}) => {
  const getTooltipText = () => {
    switch (state) {
      case 'local':
        return 'Device only (private)';
      case 'queued':
        return 'Waiting to sync (outbox)';
      case 'synced':
        return 'Synced to team hub';
      case 'conflict':
        return 'Disputed conflict';
    }
  };

  const renderShape = () => {
    switch (state) {
      case 'local':
        // Hollow ring (Amethyst / lilac)
        return (
          <span
            style={{
              width: size,
              height: size,
              borderRadius: '50%',
              border: `2px solid var(--state-local)`,
              backgroundColor: 'transparent',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
        );
      case 'queued':
        // Half-filled disc (Butter yellow) with subtle breathing animation
        return (
          <span
            className="animate-breathe"
            style={{
              width: size,
              height: size,
              borderRadius: '50%',
              background: `linear-gradient(90deg, var(--state-queued) 50%, transparent 50%)`,
              border: `1.5px solid var(--state-queued)`,
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
        );
      case 'synced':
        // Solid disc (Teal)
        return (
          <span
            style={{
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: 'var(--state-synced)',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
        );
      case 'conflict':
        // Diamond (Coral)
        return (
          <span
            className="animate-conflict"
            style={{
              width: size * 0.85,
              height: size * 0.85,
              transform: 'rotate(45deg)',
              backgroundColor: 'var(--state-conflict)',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
        );
    }
  };

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      title={showTooltip ? getTooltipText() : undefined}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {renderShape()}
    </span>
  );
};
