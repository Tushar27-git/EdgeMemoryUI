import React from 'react';
import {
  BarChart2,
  Folder,
  AlertTriangle,
  Laptop,
  FileText,
  Mic,
  Calendar,
  ArrowRight,
  Maximize2,
} from 'lucide-react';
import { StateMark } from './StateMark';
import { PointCloud3D } from './PointCloud3D';
import { StatusStrip } from './StatusStrip';
import { ActivityEvent, ClaimRecord } from '../types';

interface HomeViewProps {
  stats: {
    claimsRemembered: number;
    activeProjects: number;
    openConflicts: number;
    devicesSynced: number;
  };
  recentActivity: ActivityEvent[];
  claims: ClaimRecord[];
  isOffline: boolean;
  queuedCount: number;
  onNavigate: (tab: 'home' | 'memory' | 'activity' | 'projects' | 'people' | 'search') => void;
  onOpenConflictCentre: () => void;
  onOpenNetworkMonitor: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  stats,
  recentActivity,
  claims,
  isOffline,
  queuedCount,
  onNavigate,
  onOpenConflictCentre,
  onOpenNetworkMonitor,
}) => {
  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'file':
        return <FileText size={18} color="var(--text-muted)" />;
      case 'mic':
        return <Mic size={18} color="var(--text-muted)" />;
      case 'calendar':
        return <Calendar size={18} color="var(--text-muted)" />;
      default:
        return <FileText size={18} color="var(--text-muted)" />;
    }
  };

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
      {/* Hero Headline & Subline */}
      <section style={{ marginBottom: '22px' }}>
        <h1
          className="t-display"
          style={{
            marginBottom: '6px',
            maxWidth: '460px',
            lineHeight: '52px',
          }}
        >
          You can come back to this.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '15px',
            lineHeight: '24px',
            color: 'var(--text-muted)',
            fontWeight: 400,
          }}
        >
          I keep your projects, sources, and changes close at hand.
        </p>
      </section>

      {/* Summary Stat Tiles (Row of 4) */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1.25fr 1fr 1fr 1fr',
          gap: '14px',
          marginBottom: '20px',
        }}
      >
        {/* Stat 1: Claims Remembered (Hero Focal Element) */}
        <div
          onClick={() => onNavigate('memory')}
          style={{
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--r-md)',
            padding: '16px 20px',
            boxShadow: 'var(--shadow-clay)',
            border: '1px solid var(--line)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '94px',
            cursor: 'pointer',
            transition: 'transform var(--dur-micro) var(--ease-out-expo)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="t-stat" style={{ fontSize: '38px', lineHeight: 1 }}>
              {stats.claimsRemembered.toLocaleString()}
            </span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--r-sm)',
                backgroundColor: 'var(--tint)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BarChart2 size={18} color="var(--text-muted)" />
            </div>
          </div>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 450 }}>
            claims remembered
          </span>
        </div>

        {/* Stat 2: Active Projects */}
        <div
          onClick={() => onNavigate('projects')}
          style={{
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--r-md)',
            padding: '16px 20px',
            boxShadow: 'var(--shadow-clay)',
            border: '1px solid var(--line)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '94px',
            cursor: 'pointer',
            transition: 'transform var(--dur-micro) var(--ease-out-expo)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="t-stat" style={{ fontSize: '34px', lineHeight: 1 }}>
              {stats.activeProjects}
            </span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--r-sm)',
                backgroundColor: 'var(--tint)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Folder size={18} color="var(--text-muted)" />
            </div>
          </div>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 450 }}>
            active projects
          </span>
        </div>

        {/* Stat 3: Open Conflicts (Coral Diamond indicator) */}
        <div
          onClick={onOpenConflictCentre}
          style={{
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--r-md)',
            padding: '16px 20px',
            boxShadow: 'var(--shadow-clay)',
            border: '1px solid var(--line)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '94px',
            cursor: 'pointer',
            transition: 'transform var(--dur-micro) var(--ease-out-expo)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span
              className="t-stat"
              style={{
                fontSize: '34px',
                lineHeight: 1,
                color: stats.openConflicts > 0 ? 'var(--state-conflict)' : 'var(--heading)',
              }}
            >
              {stats.openConflicts}
            </span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--r-sm)',
                backgroundColor: 'color-mix(in oklch, var(--state-conflict) 16%, var(--surface))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={18} color="var(--state-conflict)" />
            </div>
          </div>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 450 }}>
            open conflicts
          </span>
        </div>

        {/* Stat 4: Devices Synced */}
        <div
          onClick={() => onNavigate('activity')}
          style={{
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--r-md)',
            padding: '16px 20px',
            boxShadow: 'var(--shadow-clay)',
            border: '1px solid var(--line)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '94px',
            cursor: 'pointer',
            transition: 'transform var(--dur-micro) var(--ease-out-expo)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="t-stat" style={{ fontSize: '34px', lineHeight: 1 }}>
              {stats.devicesSynced}
            </span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--r-sm)',
                backgroundColor: 'var(--tint)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Laptop size={18} color="var(--text-muted)" />
            </div>
          </div>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 450 }}>
            devices synced
          </span>
        </div>
      </section>

      {/* Main Content: Left Recent Activity + Right Point Cloud */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '360px 1fr',
          gap: '16px',
          flex: 1,
          minHeight: '360px',
        }}
      >
        {/* Left Card: Recent Activity */}
        <div
          style={{
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--r-lg)',
            padding: '20px 22px',
            boxShadow: 'var(--shadow-clay)',
            border: '1px solid var(--line)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <h2 className="t-h3" style={{ fontSize: '18px', fontWeight: 600 }}>
              Recent activity
            </h2>
            <button
              onClick={() => onNavigate('activity')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '13px',
                color: 'var(--text-muted)',
                fontWeight: 500,
              }}
            >
              <span>See all</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Activity Item List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {recentActivity.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('activity')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 10px',
                  borderRadius: 'var(--r-sm)',
                  cursor: 'pointer',
                  transition: 'background-color var(--dur-micro) var(--ease-standard)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--raised)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {/* Icon Tile */}
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--r-sm)',
                    backgroundColor: 'var(--tint)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {getActivityIcon(item.icon)}
                </div>

                {/* Text Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--text)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.subtitle}
                  </div>
                </div>

                {/* Timestamp (Geist Mono) */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    marginRight: '6px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.timestamp}
                </div>

                {/* State Shape Mark */}
                <StateMark state={item.state} size={9} showTooltip />
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Point Cloud Preview */}
        <div
          style={{
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--r-lg)',
            boxShadow: 'var(--shadow-clay)',
            border: '1px solid var(--line)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Top Right Fullscreen Button */}
          <button
            onClick={() => onNavigate('memory')}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 10,
              width: '32px',
              height: '32px',
              borderRadius: 'var(--r-sm)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              boxShadow: 'var(--shadow-subtle)',
            }}
            title="Expand Memory Point Cloud"
          >
            <Maximize2 size={15} />
          </button>

          {/* Interactive Three.js Canvas */}
          <div style={{ flex: 1, minHeight: '260px', position: 'relative' }}>
            <PointCloud3D
              claims={claims}
              onPointClick={(claim) => {
                if (claim) onNavigate('memory');
              }}
            />
          </div>

          {/* Bottom Status Strip */}
          <StatusStrip
            isOffline={isOffline}
            queuedChangesCount={queuedCount}
            bytesIn={0}
            bytesOut={0}
            onOpenNetworkMonitor={onOpenNetworkMonitor}
          />
        </div>
      </section>
    </div>
  );
};
