export type SyncTier = 'device' | 'my_devices' | 'team';

export type ClaimStatus = 'active' | 'disputed' | 'superseded' | 'retracted';

export type ClaimStateShape = 'local' | 'queued' | 'synced' | 'conflict';

export interface ClaimSource {
  kind: 'email' | 'whatsapp' | 'voice' | 'window' | 'system';
  ref: string;
  author: string;
}

export interface ClaimRecord {
  claim_id: string;
  entity_id: string;
  attribute: string;
  value: string;
  source: ClaimSource;
  stated_at: string;
  captured_by: string;
  device_id: string;
  tier: SyncTier;
  status: ClaimStatus;
  conflict_id: string | null;
  version: number;
}

export interface ConflictRecord {
  conflict_id: string;
  entity_id: string;
  attribute: string;
  owner: string;
  detected_at: string;
  claim_a: ClaimRecord;
  claim_b: ClaimRecord;
  draft_message: string;
  status: 'open' | 'resolved';
  resolved_claim_id: string | null;
}

export interface OutboxRecord {
  op_id: string;
  claim_id: string;
  op: 'upsert' | 'retract';
  tier: SyncTier;
  created_at: string;
  attempts: number;
  last_error: string | null;
}

export interface ActivityEvent {
  id: string;
  type: 'claim_added' | 'search_run' | 'sync_started' | 'snapshot_applied' | 'conflict_detected' | 'conflict_resolved' | 'nudge';
  title: string;
  subtitle: string;
  timestamp: string;
  state: ClaimStateShape;
  icon: 'file' | 'mic' | 'calendar' | 'alert' | 'refresh' | 'sparkles';
}

export interface ProjectEntity {
  id: string;
  name: string;
  description: string;
  claimsCount: number;
  status: 'active' | 'deliverable_near' | 'idle';
  due_date?: string;
  openConflicts: number;
}

export interface PersonEntity {
  id: string;
  name: string;
  role: string;
  keyFact: string;
  lastInteraction: string;
  claimsCount: number;
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: Array<{
    kind: string;
    ref: string;
    author: string;
    quote?: string;
  }>;
  disputed?: boolean;
  conflictDetails?: {
    versionA: string;
    sourceA: string;
    versionB: string;
    sourceB: string;
    conflictId: string;
  };
  nudge?: boolean;
}
