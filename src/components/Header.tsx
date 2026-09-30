import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
  onOpenAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onOpenAssistant,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '16px',
        padding: '16px 28px',
        width: '100%',
      }}
    >
      {/* Command / Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: '380px',
          height: '40px',
          padding: '0 12px',
          borderRadius: 'var(--r-md)',
          backgroundColor: 'var(--surface)',
          boxShadow: 'var(--shadow-clay)',
          border: '1px solid var(--line)',
          transition: 'all var(--dur-micro) var(--ease-standard)',
        }}
      >
        <Search size={16} color="var(--text-muted)" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--text)',
            fontSize: '14px',
            fontFamily: 'var(--font-ui)',
          }}
        />

        {/* Keyboard shortcut badges: Ctrl K */}
        <div
          onClick={onOpenAssistant}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            cursor: 'pointer',
          }}
          title="Press Ctrl+K to ask"
        >
          <kbd
            style={{
              padding: '2px 5px',
              borderRadius: '4px',
              backgroundColor: 'var(--raised)',
              border: '1px solid var(--line)',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              lineHeight: 1,
            }}
          >
            Ctrl
          </kbd>
          <kbd
            style={{
              padding: '2px 5px',
              borderRadius: '4px',
              backgroundColor: 'var(--raised)',
              border: '1px solid var(--line)',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              lineHeight: 1,
            }}
          >
            K
          </kbd>
        </div>
      </div>

      {/* User Avatar: Tushar (TS) */}
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: 'var(--r-pill)',
          backgroundColor: 'var(--deco)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--on-accent)',
          fontFamily: 'var(--font-ui)',
          fontWeight: 600,
          fontSize: '14px',
          letterSpacing: '0.02em',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-clay)',
          flexShrink: 0,
        }}
        title="Tushar (Owner) · dev_tushar_laptop"
      >
        TS
      </div>
    </header>
  );
};
