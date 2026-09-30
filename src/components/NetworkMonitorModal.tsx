import React from 'react';
import { X, ShieldCheck, Wifi, WifiOff } from 'lucide-react';

interface NetworkMonitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  bytesIn: number;
  bytesOut: number;
}

export const NetworkMonitorModal: React.FC<NetworkMonitorModalProps> = ({
  isOpen,
  onClose,
  isOffline,
  onToggleOffline,
  bytesIn,
  bytesOut,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '460px',
          backgroundColor: 'var(--surface)',
          borderRadius: 'var(--r-lg)',
          padding: '24px',
          boxShadow: 'var(--shadow-clay)',
          border: '1px solid var(--line)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} color="var(--state-synced)" />
            <h2 className="t-h3" style={{ fontSize: '18px' }}>
              Network Isolation Monitor
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--r-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Big Live Monospace Counters (Proof of Offline on camera!) */}
        <div
          style={{
            padding: '20px',
            borderRadius: 'var(--r-md)',
            backgroundColor: 'var(--raised)',
            border: '1px solid var(--line)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            textAlign: 'center',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '36px',
                fontWeight: 600,
                color: bytesIn > 0 ? 'var(--state-synced)' : 'var(--text)',
                lineHeight: 1.1,
              }}
            >
              {bytesIn} <span style={{ fontSize: '16px', fontWeight: 400 }}>B/s</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Inbound Traffic
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '36px',
                fontWeight: 600,
                color: bytesOut > 0 ? 'var(--state-queued)' : 'var(--text)',
                lineHeight: 1.1,
              }}
            >
              {bytesOut} <span style={{ fontSize: '16px', fontWeight: 400 }}>B/s</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Outbound Traffic
            </div>
          </div>
        </div>

        {/* Verification explanation */}
        <div style={{ fontSize: '13px', lineHeight: '20px', color: 'var(--text)' }}>
          <p style={{ marginBottom: '8px' }}>
            <strong>Provable Zero-Leak Guarantee:</strong> All vector queries (FastEmbed on-device) and SQLite claim traversals execute completely within the laptop's process boundaries.
          </p>
          <p style={{ color: 'var(--text-muted)' }}>
            No telemetry, no external font requests, and no cloud LLM API calls occur during reasoning.
          </p>
        </div>

        {/* Toggle switch */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px',
            borderTop: '1px solid var(--line)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isOffline ? <WifiOff size={16} color="var(--state-queued)" /> : <Wifi size={16} color="var(--state-synced)" />}
            <span style={{ fontSize: '13px', fontWeight: 500 }}>
              Physical Network Mode: {isOffline ? 'Severed (Offline)' : 'Online Mesh'}
            </span>
          </div>

          <button
            onClick={onToggleOffline}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--r-sm)',
              backgroundColor: 'var(--accent)',
              color: 'var(--on-accent)',
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            {isOffline ? 'Connect' : 'Go Offline'}
          </button>
        </div>
      </div>
    </div>
  );
};
