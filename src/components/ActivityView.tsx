import React, { useState } from 'react';
import {
  Activity,
  RefreshCw,
  Laptop,
  Server,
  Wifi,
  WifiOff,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { StateMark } from './StateMark';
import { ActivityEvent, OutboxRecord } from '../types';

interface ActivityViewProps {
  activityList: ActivityEvent[];
  outbox: OutboxRecord[];
  isOffline: boolean;
  onToggleOffline: () => void;
  onTriggerSync: () => void;
  isSyncing: boolean;
}

export const ActivityView: React.FC<ActivityViewProps> = ({
  activityList,
  outbox,
  isOffline,
  onToggleOffline,
  onTriggerSync,
  isSyncing,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'claims' | 'sync' | 'conflicts'>('all');

  const filteredEvents = activityList.filter((event) => {
    if (selectedFilter === 'claims') return event.type === 'claim_added';
    if (selectedFilter === 'sync') return event.type === 'sync_started' || event.type === 'snapshot_applied';
    if (selectedFilter === 'conflicts') return event.type === 'conflict_detected' || event.type === 'conflict_resolved';
    return true;
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '0 28px 24px 28px',
        overflowY: 'auto',
      }}
    >
      {/* Page Title */}
      <div style={{ marginBottom: '20px' }}>
        <h1 className="t-h1" style={{ marginBottom: '4px' }}>
          Activity & Synchronization
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Audit trail of memory mutations, device mesh state, and outbox queue
        </p>
      </div>

      {/* Top Grid: Mesh Nodes Status & Outbox Summary */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '16px',
          marginBottom: '22px',
        }}
      >
        {/* Device Sync Status Card */}
        <div
          style={{
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--r-lg)',
            padding: '20px',
            border: '1px solid var(--line)',
            boxShadow: 'var(--shadow-clay)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h2 className="t-h3" style={{ fontSize: '17px' }}>
              Device Mesh Nodes
            </h2>
            <button
              onClick={onToggleOffline}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: 'var(--r-pill)',
                fontSize: '12px',
                fontWeight: 500,
                backgroundColor: isOffline ? 'var(--raised)' : 'color-mix(in oklch, var(--state-synced) 16%, var(--surface))',
                color: isOffline ? 'var(--text-muted)' : 'var(--text)',
                border: '1px solid var(--line)',
              }}
            >
              {isOffline ? <WifiOff size={14} color="var(--state-queued)" /> : <Wifi size={14} color="var(--state-synced)" />}
              <span>{isOffline ? 'Simulate Online' : 'Simulate Offline'}</span>
            </button>
          </div>

          {/* Node Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Daily Laptop (This Node) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: 'var(--r-sm)',
                backgroundColor: 'var(--raised)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Laptop size={16} color="var(--text)" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500 }}>Daily Laptop (dev_tushar_laptop)</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>This node · Full Edge Engine</div>
                </div>
              </div>
              <div className="chip" data-state={isOffline ? 'queued' : 'synced'}>
                <StateMark state={isOffline ? 'queued' : 'synced'} size={8} />
                <span>{isOffline ? 'Offline' : 'Connected'}</span>
              </div>
            </div>

            {/* Teammate Laptop */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: 'var(--r-sm)',
                backgroundColor: 'var(--raised)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Laptop size={16} color="var(--text-muted)" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500 }}>Teammate Laptop (dev_lakshya_laptop)</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Last synced: 14 mins ago</div>
                </div>
              </div>
              <div className="chip" data-state="synced">
                <StateMark state="synced" size={8} />
                <span>Active</span>
              </div>
            </div>

            {/* Home Server Hub */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: 'var(--r-sm)',
                backgroundColor: 'var(--raised)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Server size={16} color="var(--text-muted)" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500 }}>Home Server Hub (Docker Qdrant)</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Persistent Dual-Write Hub</div>
                </div>
              </div>
              <div className="chip" data-state="synced">
                <StateMark state="synced" size={8} />
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Persistent Outbox Card */}
        <div
          style={{
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--r-lg)',
            padding: '20px',
            border: '1px solid var(--line)',
            boxShadow: 'var(--shadow-clay)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h2 className="t-h3" style={{ fontSize: '17px' }}>
                Persistent Outbox Queue
              </h2>
              <span className="t-stat" style={{ fontSize: '26px' }}>
                {outbox.length}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Dual-write SQLite queue. Survives laptop restarts until Hub confirms ingestion.
            </p>

            {/* Outbox Items */}
            {outbox.length === 0 ? (
              <div
                style={{
                  padding: '18px',
                  borderRadius: 'var(--r-sm)',
                  backgroundColor: 'var(--raised)',
                  textAlign: 'center',
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                }}
              >
                <CheckCircle2 size={20} color="var(--state-synced)" style={{ margin: '0 auto 6px auto' }} />
                <div>Outbox is clean. All local mutations synced.</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {outbox.map((op) => (
                  <div
                    key={op.op_id}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--r-sm)',
                      backgroundColor: 'var(--raised)',
                      fontSize: '12px',
                      border: '1px solid var(--line)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <strong style={{ fontFamily: 'var(--font-mono)' }}>{op.op.toUpperCase()}</strong>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        Attempts: {op.attempts}
                      </span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '11px' }}>
                      Target: {op.claim_id}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sync Trigger Action */}
          <button
            onClick={onTriggerSync}
            disabled={isSyncing || outbox.length === 0}
            style={{
              marginTop: '16px',
              padding: '10px 16px',
              borderRadius: 'var(--r-sm)',
              backgroundColor: outbox.length === 0 ? 'var(--raised)' : 'var(--accent)',
              color: outbox.length === 0 ? 'var(--text-muted)' : 'var(--on-accent)',
              fontSize: '13px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: isSyncing ? 0.7 : 1,
            }}
          >
            <RefreshCw size={15} className={isSyncing ? 'animate-breathe' : ''} />
            <span>{isSyncing ? 'Draining Outbox...' : outbox.length === 0 ? 'Hub Up to Date' : 'Sync Outbox to Hub'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Timeline Section */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          borderRadius: 'var(--r-lg)',
          padding: '22px',
          border: '1px solid var(--line)',
          boxShadow: 'var(--shadow-clay)',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Timeline Header & Filter Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} color="var(--text)" />
            <h2 className="t-h3" style={{ fontSize: '18px' }}>
              Activity Timeline
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {(['all', 'claims', 'sync', 'conflicts'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 'var(--r-pill)',
                  fontSize: '12px',
                  backgroundColor: selectedFilter === filter ? 'var(--accent)' : 'transparent',
                  color: selectedFilter === filter ? 'var(--on-accent)' : 'var(--text-muted)',
                  border: '1px solid var(--line)',
                }}
              >
                {filter === 'all' ? 'All events' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Timeline List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px 14px',
                borderRadius: 'var(--r-sm)',
                backgroundColor: 'var(--raised)',
                border: '1px solid var(--line)',
              }}
            >
              <StateMark state={event.state} size={12} showTooltip />

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>
                  {event.title}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {event.subtitle}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                }}
              >
                <Clock size={13} />
                <span>{event.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
