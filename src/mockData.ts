import {
  ClaimRecord,
  ConflictRecord,
  OutboxRecord,
  ActivityEvent,
  ProjectEntity,
  PersonEntity,
  AssistantMessage
} from './types';

export const INITIAL_SUMMARY_STATS = {
  claimsRemembered: 1284,
  activeProjects: 12,
  openConflicts: 8,
  devicesSynced: 3,
};

export const INITIAL_RECENT_ACTIVITY: ActivityEvent[] = [
  {
    id: 'act-01',
    type: 'claim_added',
    title: 'Sharma edit',
    subtitle: 'Due tomorrow',
    timestamp: '10:24 AM',
    state: 'synced',
    icon: 'file'
  },
  {
    id: 'act-02',
    type: 'claim_added',
    title: 'TrackShift notes',
    subtitle: '6 new claims',
    timestamp: '09:12 AM',
    state: 'local',
    icon: 'file'
  },
  {
    id: 'act-03',
    type: 'claim_added',
    title: 'Voice note',
    subtitle: '1 change waiting to sync',
    timestamp: '08:41 AM',
    state: 'queued',
    icon: 'mic'
  },
  {
    id: 'act-04',
    type: 'claim_added',
    title: 'Client meeting',
    subtitle: '2 new mentions',
    timestamp: 'Yesterday',
    state: 'synced',
    icon: 'calendar'
  },
  {
    id: 'act-05',
    type: 'conflict_detected',
    title: 'Conflict detected',
    subtitle: 'Sharma delivery date (16th vs 18th)',
    timestamp: 'Sep 29',
    state: 'conflict',
    icon: 'alert'
  },
  {
    id: 'act-06',
    type: 'snapshot_applied',
    title: 'Team sync applied',
    subtitle: '14 claims merged from Hub',
    timestamp: 'Sep 28',
    state: 'synced',
    icon: 'refresh'
  },
  {
    id: 'act-07',
    type: 'nudge',
    title: 'Hyperfocus notice',
    subtitle: '3.5h on TrackShift while Sharma due',
    timestamp: 'Sep 28',
    state: 'local',
    icon: 'sparkles'
  }
];

export const INITIAL_CLAIMS: ClaimRecord[] = [
  {
    claim_id: 'clm_01J9A8B7C6D5',
    entity_id: 'task_sharma_edit',
    attribute: 'due_date',
    value: '2026-10-16',
    source: { kind: 'email', ref: 'gmail:18f2a994c1', author: 'client:sharma' },
    stated_at: '2026-10-03T11:20:00+05:30',
    captured_by: 'lakshya',
    device_id: 'dev_lakshya_laptop',
    tier: 'team',
    status: 'disputed',
    conflict_id: 'cnf_sharma_due_01',
    version: 1
  },
  {
    claim_id: 'clm_01J9A8B7C6E9',
    entity_id: 'task_sharma_edit',
    attribute: 'due_date',
    value: '2026-10-18',
    source: { kind: 'voice', ref: 'ladakh_onset:audio_04', author: 'tushar' },
    stated_at: '2026-10-04T15:10:00+05:30',
    captured_by: 'tushar',
    device_id: 'dev_tushar_laptop',
    tier: 'team',
    status: 'disputed',
    conflict_id: 'cnf_sharma_due_01',
    version: 2
  },
  {
    claim_id: 'clm_01J9A8B7C7A1',
    entity_id: 'task_sharma_edit',
    attribute: 'deliverables_count',
    value: '3 reel cutdowns',
    source: { kind: 'whatsapp', ref: 'whatsapp:export_sep28#L412', author: 'client:sharma' },
    stated_at: '2026-10-02T19:44:12+05:30',
    captured_by: 'tushar',
    device_id: 'dev_tushar_laptop',
    tier: 'team',
    status: 'active',
    conflict_id: null,
    version: 2
  },
  {
    claim_id: 'clm_01J9A8B7C7B2',
    entity_id: 'proj_trackshift',
    attribute: 'engine_target',
    value: 'Vulkan ray-tracing pipeline',
    source: { kind: 'window', ref: 'code:trackshift/engine.cpp', author: 'tushar' },
    stated_at: '2026-10-04T14:02:00+05:30',
    captured_by: 'tushar',
    device_id: 'dev_tushar_laptop',
    tier: 'device',
    status: 'active',
    conflict_id: null,
    version: 1
  },
  {
    claim_id: 'clm_01J9A8B7C7C3',
    entity_id: 'person_riya',
    attribute: 'birthday',
    value: 'Thursday (Oct 08)',
    source: { kind: 'whatsapp', ref: 'whatsapp:export_sep15#L89', author: 'riya' },
    stated_at: '2026-09-15T22:15:00+05:30',
    captured_by: 'tushar',
    device_id: 'dev_tushar_laptop',
    tier: 'my_devices',
    status: 'active',
    conflict_id: null,
    version: 1
  },
  {
    claim_id: 'clm_01J9A8B7C7D4',
    entity_id: 'person_riya',
    attribute: 'recent_topic',
    value: 'Trip to Goa with college friends',
    source: { kind: 'voice', ref: 'call_followup_note_sep20', author: 'tushar' },
    stated_at: '2026-09-20T17:30:00+05:30',
    captured_by: 'tushar',
    device_id: 'dev_tushar_laptop',
    tier: 'my_devices',
    status: 'active',
    conflict_id: null,
    version: 1
  },
  {
    claim_id: 'clm_01J9A8B7C7E5',
    entity_id: 'task_ladakh_footage',
    attribute: 'storage_location',
    value: 'Rugged SSD #2, partition /raw/4k',
    source: { kind: 'voice', ref: 'voice:ladakh_camp_01', author: 'lakshya' },
    stated_at: '2026-09-24T20:10:00+05:30',
    captured_by: 'lakshya',
    device_id: 'dev_lakshya_laptop',
    tier: 'team',
    status: 'active',
    conflict_id: null,
    version: 1
  },
  {
    claim_id: 'clm_01J9A8B7C7F6',
    entity_id: 'routine_invoices',
    attribute: 'friday_reminder',
    value: '4:00 PM GST client billings',
    source: { kind: 'system', ref: 'pattern_learner:weekly_misses', author: 'system' },
    stated_at: '2026-09-25T16:00:00+05:30',
    captured_by: 'tushar',
    device_id: 'dev_tushar_laptop',
    tier: 'device',
    status: 'active',
    conflict_id: null,
    version: 1
  },
  {
    claim_id: 'clm_01J9A8B7C8G7',
    entity_id: 'proj_commercial_bka',
    attribute: 'color_grade',
    value: 'Warm Kodak 5207 emulation, grain 18%',
    source: { kind: 'email', ref: 'gmail:18f50b299e', author: 'director:ananya' },
    stated_at: '2026-09-27T10:05:00+05:30',
    captured_by: 'tushar',
    device_id: 'dev_tushar_laptop',
    tier: 'team',
    status: 'active',
    conflict_id: null,
    version: 1
  }
];

export const INITIAL_CONFLICTS: ConflictRecord[] = [
  {
    conflict_id: 'cnf_sharma_due_01',
    entity_id: 'task_sharma_edit',
    attribute: 'due_date',
    owner: 'tushar',
    detected_at: '2026-10-04T15:10:05+05:30',
    claim_a: {
      claim_id: 'clm_01J9A8B7C6D5',
      entity_id: 'task_sharma_edit',
      attribute: 'due_date',
      value: '2026-10-16',
      source: { kind: 'email', ref: 'gmail:18f2a994c1', author: 'client:sharma' },
      stated_at: '2026-10-03T11:20:00+05:30',
      captured_by: 'lakshya',
      device_id: 'dev_lakshya_laptop',
      tier: 'team',
      status: 'disputed',
      conflict_id: 'cnf_sharma_due_01',
      version: 1
    },
    claim_b: {
      claim_id: 'clm_01J9A8B7C6E9',
      entity_id: 'task_sharma_edit',
      attribute: 'due_date',
      value: '2026-10-18',
      source: { kind: 'voice', ref: 'ladakh_onset:audio_04', author: 'tushar' },
      stated_at: '2026-10-04T15:10:00+05:30',
      captured_by: 'tushar',
      device_id: 'dev_tushar_laptop',
      tier: 'team',
      status: 'disputed',
      conflict_id: 'cnf_sharma_due_01',
      version: 2
    },
    draft_message: "Hi Sharma, our set notes mentioned Sunday the 18th for delivery, while our email thread had the 16th. Which date works better for your team's review?",
    status: 'open',
    resolved_claim_id: null
  },
  {
    conflict_id: 'cnf_cutdown_count_02',
    entity_id: 'task_sharma_edit',
    attribute: 'cutdown_versions',
    owner: 'lakshya',
    detected_at: '2026-10-02T19:50:00+05:30',
    claim_a: {
      claim_id: 'clm_01J9A8B7C901',
      entity_id: 'task_sharma_edit',
      attribute: 'cutdown_versions',
      value: '2 cutdowns (30s, 60s)',
      source: { kind: 'email', ref: 'gmail:18e811f2', author: 'agency:producer' },
      stated_at: '2026-09-25T14:10:00+05:30',
      captured_by: 'lakshya',
      device_id: 'dev_lakshya_laptop',
      tier: 'team',
      status: 'disputed',
      conflict_id: 'cnf_cutdown_count_02',
      version: 1
    },
    claim_b: {
      claim_id: 'clm_01J9A8B7C902',
      entity_id: 'task_sharma_edit',
      attribute: 'cutdown_versions',
      value: '3 cutdowns (15s, 30s, 60s)',
      source: { kind: 'whatsapp', ref: 'whatsapp:export_sep28#L412', author: 'client:sharma' },
      stated_at: '2026-10-02T19:44:12+05:30',
      captured_by: 'tushar',
      device_id: 'dev_tushar_laptop',
      tier: 'team',
      status: 'disputed',
      conflict_id: 'cnf_cutdown_count_02',
      version: 2
    },
    draft_message: "Hey Lakshya, the client's latest WhatsApp asked for three cutdowns (15s, 30s, 60s), overriding the initial agency request for two. Shall we proceed with 3?",
    status: 'open',
    resolved_claim_id: null
  }
];

export const INITIAL_OUTBOX: OutboxRecord[] = [
  {
    op_id: 'op_01J9A8B7C6E9_upsert',
    claim_id: 'clm_01J9A8B7C6E9',
    op: 'upsert',
    tier: 'team',
    created_at: '2026-10-04T15:10:05+05:30',
    attempts: 0,
    last_error: null
  }
];

export const INITIAL_PROJECTS: ProjectEntity[] = [
  {
    id: 'proj_sharma',
    name: 'Sharma Edit',
    description: 'Commercial film final cut, color grade, and vertical reel delivery',
    claimsCount: 24,
    status: 'deliverable_near',
    due_date: 'Oct 16 - Oct 18 (Disputed)',
    openConflicts: 2
  },
  {
    id: 'proj_trackshift',
    name: 'TrackShift Engine',
    description: 'High performance physics engine and rendering prototype',
    claimsCount: 68,
    status: 'active',
    due_date: 'Nov 01, 2026',
    openConflicts: 0
  },
  {
    id: 'proj_ladakh',
    name: 'Ladakh Documentary',
    description: 'Field shoot raw footage, drone logs, and offline archival',
    claimsCount: 89,
    status: 'active',
    due_date: 'Oct 30, 2026',
    openConflicts: 1
  },
  {
    id: 'proj_commercial_bka',
    name: 'BKA Brand Reel',
    description: 'Studio portfolio showcase cut and client sound design',
    claimsCount: 42,
    status: 'idle',
    due_date: 'Nov 15, 2026',
    openConflicts: 0
  }
];

export const INITIAL_PEOPLE: PersonEntity[] = [
  {
    id: 'person_sharma',
    name: 'Sharma',
    role: 'Client / Director',
    keyFact: 'Preferences: prefers WhatsApp for quick changes, email for master sign-off',
    lastInteraction: 'Oct 03 (WhatsApp export)',
    claimsCount: 31
  },
  {
    id: 'person_lakshya',
    name: 'Lakshya',
    role: 'Co-producer / BKA Team',
    keyFact: 'Handling drone footage ingest and client email communications',
    lastInteraction: 'Today at 10:24 AM',
    claimsCount: 78
  },
  {
    id: 'person_riya',
    name: 'Riya',
    role: 'Friend / Collaborator',
    keyFact: 'Birthday is Thursday. Last talked about Goa trip plans.',
    lastInteraction: 'Sep 20 (Voice note)',
    claimsCount: 14
  },
  {
    id: 'person_aayat',
    name: 'Aayat',
    role: 'Sound Designer',
    keyFact: 'Working on audio mastering for Sharma final deliverable',
    lastInteraction: 'Sep 28 (Gmail)',
    claimsCount: 19
  },
  {
    id: 'person_tanishk',
    name: 'Tanishk',
    role: 'Sync & Memory Lead',
    keyFact: 'Managing Qdrant Edge sync worker and SQLite persistent outbox',
    lastInteraction: 'Today at 08:30 AM',
    claimsCount: 62
  }
];

export const INITIAL_ASSISTANT_MESSAGES: AssistantMessage[] = [
  {
    id: 'msg-01',
    sender: 'assistant',
    text: "I'm ready. Memory layer is active on device. 1,284 claims indexed in local Qdrant Edge, 1 change queued in outbox.",
    timestamp: '08:40 AM'
  },
  {
    id: 'msg-02',
    sender: 'user',
    text: "What's due this week?",
    timestamp: '08:41 AM'
  },
  {
    id: 'msg-03',
    sender: 'assistant',
    text: "You have one immediate deliverable:\n\n• Sharma Commercial Edit: Delivery was confirmed for Friday the 16th in the client's email, though your Ladakh voice note recorded the 18th. Three reel cutdowns are requested.",
    timestamp: '08:41 AM',
    sources: [
      { kind: 'email', ref: 'gmail:18f2a994c1', author: 'client:sharma', quote: 'Final deliverable due on Oct 16.' },
      { kind: 'voice', ref: 'ladakh_onset:audio_04', author: 'tushar', quote: 'Push Sharma delivery to the 18th.' },
      { kind: 'whatsapp', ref: 'whatsapp:export_sep28#L412', author: 'client:sharma', quote: 'Three cutdowns, not two.' }
    ],
    disputed: true,
    conflictDetails: {
      versionA: 'Oct 16, 2026',
      sourceA: 'Email (client:sharma)',
      versionB: 'Oct 18, 2026',
      sourceB: 'Voice note (tushar)',
      conflictId: 'cnf_sharma_due_01'
    }
  }
];
