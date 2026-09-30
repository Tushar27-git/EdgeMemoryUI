import React from 'react';
import {
  Home,
  Database,
  Activity,
  Folder,
  User,
  Search,
  Sun,
  Moon,
  ShieldCheck,
} from 'lucide-react';
import { WindowControls } from './WindowControls';
import { Wordmark } from './Wordmark';

export type NavItem = 'home' | 'memory' | 'activity' | 'projects' | 'people' | 'search';

interface SidebarProps {
  currentTab: NavItem;
  onSelectTab: (tab: NavItem) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  openConflictsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  theme,
  onToggleTheme,
  openConflictsCount,
}) => {
  const navItems: Array<{
    id: NavItem;
    label: string;
    icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
    badge?: number;
  }> = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'memory', label: 'Memory', icon: Database, badge: openConflictsCount > 0 ? openConflictsCount : undefined },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'people', label: 'People', icon: User },
    { id: 'search', label: 'Search', icon: Search },
  ];

  return (
    <aside
      style={{
        width: '230px',
        minWidth: '230px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 14px 20px 18px',
        borderRight: '1px solid var(--line)',
        backgroundColor: 'var(--bg)',
        userSelect: 'none',
      }}
    >
      {/* Window Controls */}
      <WindowControls />

      {/* Brand Wordmark */}
      <div style={{ padding: '4px 6px 28px 6px' }}>
        <Wordmark onClick={() => onSelectTab('home')} />
      </div>

      {/* Navigation List */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: 'var(--r-sm)',
                backgroundColor: isActive ? 'var(--surface)' : 'transparent',
                boxShadow: isActive ? 'var(--shadow-clay)' : 'none',
                color: isActive ? 'var(--text)' : 'var(--text-muted)',
                fontWeight: isActive ? 500 : 400,
                fontSize: '15px',
                lineHeight: '20px',
                textAlign: 'left',
                width: '100%',
                position: 'relative',
                transition: 'all var(--dur-micro) var(--ease-standard)',
              }}
            >
              <Icon
                size={19}
                strokeWidth={isActive ? 2 : 1.7}
                color={isActive ? 'var(--text)' : 'var(--text-muted)'}
              />
              <span style={{ flex: 1 }}>{item.label}</span>

              {item.badge !== undefined && (
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    padding: '1px 6px',
                    borderRadius: 'var(--r-pill)',
                    backgroundColor: 'color-mix(in oklch, var(--state-conflict) 20%, var(--surface))',
                    color: 'var(--text)',
                    border: '1px solid color-mix(in oklch, var(--state-conflict) 40%, var(--surface))',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer: Offline & Theme Control */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          paddingTop: '16px',
          borderTop: '1px solid var(--line)',
        }}
      >
        {/* On-device Security note */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 10px',
            borderRadius: 'var(--r-sm)',
            backgroundColor: 'var(--surface)',
            color: 'var(--text-muted)',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <ShieldCheck size={14} color="var(--state-synced)" />
          <span>Qdrant Edge · Local</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderRadius: 'var(--r-sm)',
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
            fontSize: '13px',
            boxShadow: 'var(--shadow-subtle)',
          }}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} mode`}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {theme === 'light' ? (
              <Moon size={15} color="var(--text-muted)" />
            ) : (
              <Sun size={15} color="var(--state-queued)" />
            )}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            {theme}
          </span>
        </button>
      </div>
    </aside>
  );
};
