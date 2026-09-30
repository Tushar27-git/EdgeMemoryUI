import React, { useState, useEffect } from 'react';
import { Sidebar, NavItem } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { MemoryView } from './components/MemoryView';
import { ActivityView } from './components/ActivityView';
import { ProjectsView } from './components/ProjectsView';
import { PeopleView } from './components/PeopleView';
import { AssistantView } from './components/AssistantView';
import { NetworkMonitorModal } from './components/NetworkMonitorModal';

import {
  INITIAL_SUMMARY_STATS,
  INITIAL_RECENT_ACTIVITY,
  INITIAL_CLAIMS,
  INITIAL_CONFLICTS,
  INITIAL_OUTBOX,
  INITIAL_PROJECTS,
  INITIAL_PEOPLE,
  INITIAL_ASSISTANT_MESSAGES,
} from './mockData';
import { ClaimRecord, ConflictRecord, OutboxRecord, ActivityEvent, SyncTier, AssistantMessage } from './types';

export const App: React.FC = () => {
  // Navigation & Theme
  const [currentTab, setCurrentTab] = useState<NavItem>('home');
  const [memorySubTab, setMemorySubTab] = useState<'cloud' | 'inspector' | 'conflicts'>('cloud');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // App Data State
  const [stats, setStats] = useState(INITIAL_SUMMARY_STATS);
  const [recentActivity, setRecentActivity] = useState<ActivityEvent[]>(INITIAL_RECENT_ACTIVITY);
  const [claims, setClaims] = useState<ClaimRecord[]>(INITIAL_CLAIMS);
  const [conflicts, setConflicts] = useState<ConflictRecord[]>(INITIAL_CONFLICTS);
  const [outbox, setOutbox] = useState<OutboxRecord[]>(INITIAL_OUTBOX);
  const [messages, setMessages] = useState<AssistantMessage[]>(INITIAL_ASSISTANT_MESSAGES);

  // Network & Sync State
  const [isOffline, setIsOffline] = useState(true);
  const [bytesIn, setBytesIn] = useState(0);
  const [bytesOut, setBytesOut] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);

  // Apply theme attribute to html root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Global Keyboard Shortcuts (e.g. Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCurrentTab('search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleOpenConflictCentre = () => {
    setMemorySubTab('conflicts');
    setCurrentTab('memory');
  };

  // Conflict Resolution Action
  const handleResolveConflict = (conflictId: string, winningClaimId: string) => {
    setConflicts((prev) =>
      prev.map((c) => {
        if (c.conflict_id === conflictId) {
          return { ...c, status: 'resolved', resolved_claim_id: winningClaimId };
        }
        return c;
      })
    );

    setClaims((prev) =>
      prev.map((claim) => {
        if (claim.claim_id === winningClaimId) {
          return { ...claim, status: 'active', conflict_id: null };
        }
        if (claim.conflict_id === conflictId) {
          return { ...claim, status: 'superseded', conflict_id: null };
        }
        return claim;
      })
    );

    setStats((prev) => ({
      ...prev,
      openConflicts: Math.max(0, prev.openConflicts - 1),
    }));

    // Add audit log
    const resolvedEvent: ActivityEvent = {
      id: `act-res-${Date.now()}`,
      type: 'conflict_resolved',
      title: 'Conflict resolved',
      subtitle: `Dispute ${conflictId} settled by owner`,
      timestamp: 'Just now',
      state: 'synced',
      icon: 'alert',
    };
    setRecentActivity((prev) => [resolvedEvent, ...prev]);
  };

  // Change Tier Action
  const handleUpdateClaimTier = (claimId: string, newTier: SyncTier) => {
    setClaims((prev) =>
      prev.map((c) => {
        if (c.claim_id === claimId) {
          return { ...c, tier: newTier };
        }
        return c;
      })
    );

    const tierEvent: ActivityEvent = {
      id: `act-tier-${Date.now()}`,
      type: 'claim_added',
      title: 'Sync tier updated',
      subtitle: `Claim ${claimId.substring(0, 10)} moved to ${newTier}`,
      timestamp: 'Just now',
      state: newTier === 'device' ? 'local' : 'synced',
      icon: 'file',
    };
    setRecentActivity((prev) => [tierEvent, ...prev]);
  };

  // Trigger Outbox Sync Action
  const handleTriggerSync = () => {
    if (outbox.length === 0 || isSyncing) return;
    setIsSyncing(true);
    setIsOffline(false);

    // Simulate network activity during sync
    setBytesIn(4820);
    setBytesOut(1250);

    setTimeout(() => {
      // Drain outbox
      setOutbox([]);
      setBytesIn(0);
      setBytesOut(0);
      setIsSyncing(false);

      // Turn queued items in recent activity to synced
      setRecentActivity((prev) =>
        prev.map((item) =>
          item.state === 'queued' ? { ...item, state: 'synced', subtitle: 'Synced to BKA Hub' } : item
        )
      );

      const syncDoneEvent: ActivityEvent = {
        id: `act-sync-${Date.now()}`,
        type: 'sync_started',
        title: 'Outbox drained to hub',
        subtitle: '1 mutation confirmed by Docker Qdrant',
        timestamp: 'Just now',
        state: 'synced',
        icon: 'refresh',
      };
      setRecentActivity((prev) => [syncDoneEvent, ...prev]);
    }, 1800);
  };

  // Voice Note Simulation
  const handleSimulateVoiceNote = () => {
    const newClaim: ClaimRecord = {
      claim_id: `clm_${Date.now()}`,
      entity_id: 'task_sharma_edit',
      attribute: 'delivery_update',
      value: 'Voice memo: Client confirmed sound pass due Friday',
      source: { kind: 'voice', ref: 'onset_mic_take08', author: 'tushar' },
      stated_at: new Date().toISOString(),
      captured_by: 'tushar',
      device_id: 'dev_tushar_laptop',
      tier: 'team',
      status: 'active',
      conflict_id: null,
      version: 1,
    };

    setClaims((prev) => [newClaim, ...prev]);
    setStats((prev) => ({ ...prev, claimsRemembered: prev.claimsRemembered + 1 }));

    // Add to persistent outbox
    const newOutboxOp: OutboxRecord = {
      op_id: `op_voice_${Date.now()}`,
      claim_id: newClaim.claim_id,
      op: 'upsert',
      tier: 'team',
      created_at: new Date().toISOString(),
      attempts: 0,
      last_error: null,
    };
    setOutbox((prev) => [newOutboxOp, ...prev]);

    // Add to activity stream
    const voiceEvent: ActivityEvent = {
      id: `act-voice-${Date.now()}`,
      type: 'claim_added',
      title: 'Voice note captured',
      subtitle: '1 change waiting to sync (offline)',
      timestamp: 'Just now',
      state: 'queued',
      icon: 'mic',
    };
    setRecentActivity((prev) => [voiceEvent, ...prev]);

    // Assistant notice
    const noteMsg: AssistantMessage = {
      id: `msg-voice-${Date.now()}`,
      sender: 'assistant',
      text: "Captured voice note: 'Client confirmed sound pass due Friday'. Extracted 1 claim, queued for team tier sync.",
      timestamp: 'Just now',
      sources: [{ kind: 'voice', ref: 'onset_mic_take08', author: 'tushar' }],
    };
    setMessages((prev) => [...prev, noteMsg]);
  };

  // Hyperfocus Nudge Demo Trigger
  const handleTriggerHyperfocusNudge = () => {
    const nudgeEvent: ActivityEvent = {
      id: `act-nudge-${Date.now()}`,
      type: 'nudge',
      title: 'Hyperfocus Nudge Triggered',
      subtitle: '3.5h on TrackShift Engine while Sharma due tomorrow',
      timestamp: 'Just now',
      state: 'local',
      icon: 'sparkles',
    };
    setRecentActivity((prev) => [nudgeEvent, ...prev]);

    const nudgeMsg: AssistantMessage = {
      id: `msg-nudge-${Date.now()}`,
      sender: 'assistant',
      text: "You've been on the game project since 2:00 PM. The Sharma edit is due tomorrow at 10:00 AM.",
      timestamp: 'Just now',
      nudge: true,
      sources: [
        { kind: 'window', ref: 'app:Visual Studio Code (trackshift)', author: 'system' },
        { kind: 'email', ref: 'gmail:18f2a994c1', author: 'client:sharma' },
      ],
    };
    setMessages((prev) => [...prev, nudgeMsg]);
    setCurrentTab('search');
  };

  // Assistant Query Handling
  const handleSendMessage = (query: string) => {
    const userMsg: AssistantMessage = {
      id: `msg-u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    let replyText = "I checked your offline memory index across 1,284 claims.";
    let sources: AssistantMessage['sources'] = [];
    let disputed = false;
    let conflictDetails = undefined;

    const lower = query.toLowerCase();
    if (lower.includes('sharma') || lower.includes('due') || lower.includes('week')) {
      replyText =
        "Sharma Commercial Edit: Delivery is disputed between two sources.\n\n• The client's email says the 16th.\n• You said the 18th on set.\n\nThree reel cutdowns requested per latest WhatsApp message.";
      sources = [
        { kind: 'email', ref: 'gmail:18f2a994c1', author: 'client:sharma' },
        { kind: 'voice', ref: 'ladakh_onset:audio_04', author: 'tushar' },
        { kind: 'whatsapp', ref: 'whatsapp:export_sep28#L412', author: 'client:sharma' },
      ];
      disputed = true;
      conflictDetails = {
        versionA: 'Oct 16 (Email)',
        sourceA: 'client:sharma',
        versionB: 'Oct 18 (Voice note)',
        sourceB: 'tushar',
        conflictId: 'cnf_sharma_due_01',
      };
    } else if (lower.includes('riya') || lower.includes('birthday')) {
      replyText = "Riya's birthday is Thursday. Last time you talked about her trip to Goa.";
      sources = [
        { kind: 'whatsapp', ref: 'whatsapp:export_sep15#L89', author: 'riya' },
        { kind: 'voice', ref: 'call_followup_note_sep20', author: 'tushar' },
      ];
    } else if (lower.includes('ssd') || lower.includes('ladakh') || lower.includes('footage')) {
      replyText = "The Ladakh footage is stored on Rugged SSD #2, partition /raw/4k, logged by Lakshya.";
      sources = [{ kind: 'voice', ref: 'voice:ladakh_camp_01', author: 'lakshya' }];
    } else {
      replyText = `Found 3 claims matching "${query}". All stored locally on-device in Qdrant Edge vector store.`;
      sources = [{ kind: 'system', ref: 'qdrant:local_claims_collection', author: 'edge_engine' }];
    }

    const assistantReply: AssistantMessage = {
      id: `msg-a-${Date.now()}`,
      sender: 'assistant',
      text: replyText,
      timestamp: 'Just now',
      sources,
      disputed,
      conflictDetails,
    };

    setMessages((prev) => [...prev, userMsg, assistantReply]);
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: 'var(--bg)',
      }}
    >
      {/* Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        openConflictsCount={stats.openConflicts}
      />

      {/* Main App Stage */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Top Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={() => {
            if (searchQuery.trim()) {
              handleSendMessage(searchQuery.trim());
              setSearchQuery('');
              setCurrentTab('search');
            }
          }}
          onOpenAssistant={() => setCurrentTab('search')}
        />

        {/* View Router */}
        <main style={{ flex: 1, overflow: 'hidden' }}>
          {currentTab === 'home' && (
            <HomeView
              stats={stats}
              recentActivity={recentActivity}
              claims={claims}
              isOffline={isOffline}
              queuedCount={outbox.length}
              onNavigate={setCurrentTab}
              onOpenConflictCentre={handleOpenConflictCentre}
              onOpenNetworkMonitor={() => setIsNetworkModalOpen(true)}
            />
          )}

          {currentTab === 'memory' && (
            <MemoryView
              claims={claims}
              conflicts={conflicts}
              onUpdateClaimTier={handleUpdateClaimTier}
              onResolveConflict={handleResolveConflict}
              initialSubTab={memorySubTab}
            />
          )}

          {currentTab === 'activity' && (
            <ActivityView
              activityList={recentActivity}
              outbox={outbox}
              isOffline={isOffline}
              onToggleOffline={() => setIsOffline(!isOffline)}
              onTriggerSync={handleTriggerSync}
              isSyncing={isSyncing}
            />
          )}

          {currentTab === 'projects' && (
            <ProjectsView
              projects={INITIAL_PROJECTS}
              claims={claims}
              onSelectProject={() => {}}
              onNavigateToConflicts={handleOpenConflictCentre}
            />
          )}

          {currentTab === 'people' && <PeopleView people={INITIAL_PEOPLE} />}

          {currentTab === 'search' && (
            <AssistantView
              messages={messages}
              onSendMessage={handleSendMessage}
              onSimulateVoiceNote={handleSimulateVoiceNote}
              onTriggerHyperfocusNudge={handleTriggerHyperfocusNudge}
              onResolveDispute={() => handleOpenConflictCentre()}
            />
          )}
        </main>
      </div>

      {/* Network Isolation Monitor Modal */}
      <NetworkMonitorModal
        isOpen={isNetworkModalOpen}
        onClose={() => setIsNetworkModalOpen(false)}
        isOffline={isOffline}
        onToggleOffline={() => setIsOffline(!isOffline)}
        bytesIn={bytesIn}
        bytesOut={bytesOut}
      />
    </div>
  );
};
