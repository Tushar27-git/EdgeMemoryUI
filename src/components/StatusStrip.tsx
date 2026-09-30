import React from 'react';
import { StateMark } from './StateMark';

interface StatusStripProps {
  isOffline?: boolean;
  queuedChangesCount?: number;
  bytesIn?: number;
  bytesOut?: number;
  onOpenNetworkMonitor?: () => void;
}

export const StatusStrip: React.FC<StatusStripProps> = ({
  isOffline = true,
  queuedChangesCount = 1,
  bytesIn = 0,
  bytesOut = 0,
  onOpenNetworkMonitor,
}) => {
  return (
    <div
      onClick={onOpenNetworkMonitor}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 18px',
        borderTop: '1px solid var(--line)',
        backgroundColor: 'var(--surface)',
        borderBottomLeftRadius: 'var(--r-lg)',
        borderBottomRightRadius: 'var(--r-lg)',
        fontSize: '13px',
        color: 'var(--text)',
        cursor: onOpenNetworkMonitor ? 'pointer' : 'default',
        userSelect: 'none',
      }}
      title="Click to view network traffic inspector"
    >
      {/* Left: State shape + offline message */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <StateMark state={queuedChangesCount > 0 ? 'queued' : 'synced'} size={12} />
        <span style={{ color: 'var(--text)', fontWeight: 450 }}>
          {isOffline ? 'Working offline' : 'Connected to Hub'}
          {queuedChangesCount > 0 ? ` - ${queuedChangesCount} change waiting to sync` : ' - Up to date'}
        </span>
      </div>

      {/* Right: Live bytes in/out in Geist Mono */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: 'var(--text-muted)',
        }}
      >
        <span>
          <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{bytesIn} B/s</strong> in
        </span>
        <span>
          <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{bytesOut} B/s</strong> out
        </span>
      </div>
    </div>
  );
};
