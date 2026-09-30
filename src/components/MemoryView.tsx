import React, { useState } from 'react';
import {
  Database,
  GitCommit,
  AlertTriangle,
  Send,
  Check,
  Filter,
  Search,
} from 'lucide-react';
import { StateMark } from './StateMark';
import { PointCloud3D } from './PointCloud3D';
import { ClaimRecord, ConflictRecord, SyncTier } from '../types';

interface MemoryViewProps {
  claims: ClaimRecord[];
  conflicts: ConflictRecord[];
  onUpdateClaimTier: (claimId: string, newTier: SyncTier) => void;
  onResolveConflict: (conflictId: string, winningClaimId: string) => void;
  initialSubTab?: 'cloud' | 'inspector' | 'conflicts';
}

export const MemoryView: React.FC<MemoryViewProps> = ({
  claims,
  conflicts,
  onUpdateClaimTier,
  onResolveConflict,
  initialSubTab = 'cloud',
}) => {
  const [subTab, setSubTab] = useState<'cloud' | 'inspector' | 'conflicts'>(initialSubTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | SyncTier>('all');
  const [copiedDraftId, setCopiedDraftId] = useState<string | null>(null);

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.entity_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.attribute.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.source.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = tierFilter === 'all' || claim.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const handleCopyDraft = (conflictId: string, draftText: string) => {
    navigator.clipboard.writeText(draftText);
    setCopiedDraftId(conflictId);
    setTimeout(() => setCopiedDraftId(null), 2500);
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
      {/* View Header with Sub-tab Navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <div>
          <h1 className="t-h1" style={{ marginBottom: '4px' }}>
            Memory Layer
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Offline-first knowledge graph & Qdrant Edge vector space
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            padding: '4px',
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--r-md)',
            border: '1px solid var(--line)',
            boxShadow: 'var(--shadow-clay)',
          }}
        >
          <button
            onClick={() => setSubTab('cloud')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--r-sm)',
              backgroundColor: subTab === 'cloud' ? 'var(--raised)' : 'transparent',
              color: subTab === 'cloud' ? 'var(--text)' : 'var(--text-muted)',
              fontWeight: subTab === 'cloud' ? 500 : 400,
              fontSize: '13px',
              boxShadow: subTab === 'cloud' ? 'var(--shadow-subtle)' : 'none',
            }}
          >
            <Database size={15} />
            <span>3D Point Cloud</span>
          </button>

          <button
            onClick={() => setSubTab('inspector')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--r-sm)',
              backgroundColor: subTab === 'inspector' ? 'var(--raised)' : 'transparent',
              color: subTab === 'inspector' ? 'var(--text)' : 'var(--text-muted)',
              fontWeight: subTab === 'inspector' ? 500 : 400,
              fontSize: '13px',
              boxShadow: subTab === 'inspector' ? 'var(--shadow-subtle)' : 'none',
            }}
          >
            <GitCommit size={15} />
            <span>Memory Inspector</span>
          </button>

          <button
            onClick={() => setSubTab('conflicts')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--r-sm)',
              backgroundColor: subTab === 'conflicts' ? 'var(--raised)' : 'transparent',
              color: subTab === 'conflicts' ? 'var(--text)' : 'var(--text-muted)',
              fontWeight: subTab === 'conflicts' ? 500 : 400,
              fontSize: '13px',
              boxShadow: subTab === 'conflicts' ? 'var(--shadow-subtle)' : 'none',
            }}
          >
            <AlertTriangle size={15} color={conflicts.filter(c => c.status === 'open').length > 0 ? 'var(--state-conflict)' : 'currentColor'} />
            <span>Conflict Centre</span>
            {conflicts.filter(c => c.status === 'open').length > 0 && (
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  padding: '1px 5px',
                  borderRadius: 'var(--r-pill)',
                  backgroundColor: 'color-mix(in oklch, var(--state-conflict) 24%, var(--surface))',
                  color: 'var(--text)',
                }}
              >
                {conflicts.filter(c => c.status === 'open').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content depending on subTab */}
      {subTab === 'cloud' && (
        <div
          style={{
            flex: 1,
            minHeight: '520px',
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--r-lg)',
            border: '1px solid var(--line)',
            boxShadow: 'var(--shadow-clay)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Legend Strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 20px',
              borderBottom: '1px solid var(--line)',
              fontSize: '12px',
              color: 'var(--text-muted)',
            }}
          >
            <span style={{ fontWeight: 500, color: 'var(--text)' }}>
              UMAP 3D Projection · 1,284 Indexed Claims
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <StateMark state="local" size={9} />
                <span>Device Only</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <StateMark state="queued" size={9} />
                <span>Queued Outbox</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <StateMark state="synced" size={9} />
                <span>Synced Hub</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <StateMark state="conflict" size={9} />
                <span>Disputed</span>
              </div>
            </div>
          </div>

          {/* 3D Canvas */}
          <div style={{ flex: 1, position: 'relative' }}>
            <PointCloud3D claims={claims} isExpanded />
          </div>
        </div>
      )}

      {subTab === 'inspector' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            flex: 1,
          }}
        >
          {/* Controls: Search and Tier Filter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '320px',
                padding: '8px 12px',
                backgroundColor: 'var(--surface)',
                borderRadius: 'var(--r-sm)',
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <Search size={16} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Filter by entity, attribute, source..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  color: 'var(--text)',
                  fontSize: '13px',
                  width: '100%',
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={15} color="var(--text-muted)" />
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Sync Tier:</span>
              {(['all', 'device', 'my_devices', 'team'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setTierFilter(tier)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--r-pill)',
                    fontSize: '12px',
                    backgroundColor: tierFilter === tier ? 'var(--accent)' : 'var(--surface)',
                    color: tierFilter === tier ? 'var(--on-accent)' : 'var(--text-muted)',
                    border: '1px solid var(--line)',
                  }}
                >
                  {tier === 'all' ? 'All' : tier === 'device' ? 'Device only' : tier === 'my_devices' ? 'My devices' : 'Team'}
                </button>
              ))}
            </div>
          </div>

          {/* Table of Claims */}
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: 'var(--r-lg)',
              border: '1px solid var(--line)',
              boxShadow: 'var(--shadow-clay)',
              overflow: 'hidden',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '13px',
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: 'var(--raised)',
                    borderBottom: '1px solid var(--line)',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                  }}
                >
                  <th style={{ padding: '10px 16px' }}>Claim ID</th>
                  <th style={{ padding: '10px 16px' }}>Entity & Attribute</th>
                  <th style={{ padding: '10px 16px' }}>Value</th>
                  <th style={{ padding: '10px 16px' }}>Source Ref</th>
                  <th style={{ padding: '10px 16px' }}>Tier (Editable)</th>
                  <th style={{ padding: '10px 16px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredClaims.map((claim) => (
                  <tr
                    key={claim.claim_id}
                    style={{
                      borderBottom: '1px solid var(--line)',
                      transition: 'background-color var(--dur-micro) var(--ease-standard)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--raised)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                      {claim.claim_id.substring(0, 14)}...
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 500, color: 'var(--text)' }}>{claim.entity_id}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{claim.attribute}</div>
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 500, color: 'var(--text)' }}>
                      {claim.value}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          {claim.source.author} ({claim.source.kind})
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {claim.source.ref}
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <select
                        value={claim.tier}
                        onChange={(e) => onUpdateClaimTier(claim.claim_id, e.target.value as SyncTier)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 'var(--r-sm)',
                          backgroundColor: 'var(--surface)',
                          border: '1px solid var(--line)',
                          color: 'var(--text)',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="device">Device only</option>
                        <option value="my_devices">My devices</option>
                        <option value="team">BKA team</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div
                        className="chip"
                        data-state={claim.status === 'disputed' ? 'conflict' : claim.tier === 'device' ? 'local' : 'synced'}
                      >
                        <StateMark
                          state={claim.status === 'disputed' ? 'conflict' : claim.tier === 'device' ? 'local' : 'synced'}
                          size={8}
                        />
                        <span>{claim.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === 'conflicts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Note Banner */}
          <div
            style={{
              padding: '14px 18px',
              borderRadius: 'var(--r-md)',
              backgroundColor: 'color-mix(in oklch, var(--state-conflict) 10%, var(--surface))',
              border: '1px solid color-mix(in oklch, var(--state-conflict) 30%, var(--surface))',
              fontSize: '14px',
              lineHeight: '22px',
              color: 'var(--text)',
            }}
          >
            <strong>Conflict Resolution Contract:</strong> Nothing wins by default. A flagged dispute stays open until the task's owner settles it. In the meantime, the assistant admits what it does not know and reports both sources.
          </div>

          {/* Conflict List */}
          {conflicts.map((conflict) => (
            <div
              key={conflict.conflict_id}
              style={{
                backgroundColor: 'var(--surface)',
                borderRadius: 'var(--r-lg)',
                padding: '22px',
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadow-clay)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Conflict Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <StateMark state="conflict" size={14} />
                  <div>
                    <h3 className="t-h3" style={{ fontSize: '18px', fontWeight: 600 }}>
                      Dispute on: {conflict.entity_id} · <span style={{ color: 'var(--text-muted)' }}>{conflict.attribute}</span>
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Owner: <strong>{conflict.owner}</strong> · Detected on {conflict.detected_at.substring(0, 10)}
                    </div>
                  </div>
                </div>

                <div
                  className="chip"
                  data-state={conflict.status === 'open' ? 'conflict' : 'synced'}
                >
                  <StateMark state={conflict.status === 'open' ? 'conflict' : 'synced'} size={8} />
                  <span>{conflict.status.toUpperCase()}</span>
                </div>
              </div>

              {/* Side by side comparison cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}
              >
                {/* Version A */}
                <div
                  style={{
                    backgroundColor: 'var(--raised)',
                    borderRadius: 'var(--r-md)',
                    padding: '16px',
                    border: '1px solid var(--line)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '130px',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Source: {conflict.claim_a.source.author} ({conflict.claim_a.source.kind})
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>
                      {conflict.claim_a.value}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                      Ref: {conflict.claim_a.source.ref}
                    </div>
                  </div>

                  {conflict.status === 'open' && (
                    <button
                      onClick={() => onResolveConflict(conflict.conflict_id, conflict.claim_a.claim_id)}
                      style={{
                        marginTop: '14px',
                        padding: '8px 14px',
                        borderRadius: 'var(--r-sm)',
                        backgroundColor: 'var(--accent)',
                        color: 'var(--on-accent)',
                        fontSize: '13px',
                        fontWeight: 500,
                        alignSelf: 'flex-start',
                      }}
                    >
                      Resolve with this value
                    </button>
                  )}
                </div>

                {/* Version B */}
                <div
                  style={{
                    backgroundColor: 'var(--raised)',
                    borderRadius: 'var(--r-md)',
                    padding: '16px',
                    border: '1px solid var(--line)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '130px',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Source: {conflict.claim_b.source.author} ({conflict.claim_b.source.kind})
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>
                      {conflict.claim_b.value}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                      Ref: {conflict.claim_b.source.ref}
                    </div>
                  </div>

                  {conflict.status === 'open' && (
                    <button
                      onClick={() => onResolveConflict(conflict.conflict_id, conflict.claim_b.claim_id)}
                      style={{
                        marginTop: '14px',
                        padding: '8px 14px',
                        borderRadius: 'var(--r-sm)',
                        backgroundColor: 'var(--accent)',
                        color: 'var(--on-accent)',
                        fontSize: '13px',
                        fontWeight: 500,
                        alignSelf: 'flex-start',
                      }}
                    >
                      Resolve with this value
                    </button>
                  )}
                </div>
              </div>

              {/* Draft Message for Teammate */}
              {conflict.status === 'open' && (
                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--r-md)',
                    backgroundColor: 'var(--tint)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)' }}>
                      Assistant draft message for clarification:
                    </span>
                    <button
                      onClick={() => handleCopyDraft(conflict.conflict_id, conflict.draft_message)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px',
                        color: 'var(--accent)',
                        fontWeight: 500,
                      }}
                    >
                      {copiedDraftId === conflict.conflict_id ? (
                        <>
                          <Check size={14} color="var(--state-synced)" />
                          <span>Copied to clipboard</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Copy draft to WhatsApp</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div
                    style={{
                      fontStyle: 'italic',
                      fontSize: '13px',
                      lineHeight: '20px',
                      color: 'var(--text)',
                      backgroundColor: 'var(--surface)',
                      padding: '10px 14px',
                      borderRadius: 'var(--r-sm)',
                      border: '1px solid var(--line)',
                    }}
                  >
                    "{conflict.draft_message}"
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
