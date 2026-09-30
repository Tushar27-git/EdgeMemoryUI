import React, { useState } from 'react';
import { Send, Mic, AlertTriangle, Zap } from 'lucide-react';
import { AssistantMessage } from '../types';

interface AssistantViewProps {
  messages: AssistantMessage[];
  onSendMessage: (query: string) => void;
  onSimulateVoiceNote: () => void;
  onTriggerHyperfocusNudge: () => void;
  onResolveDispute: (conflictId: string) => void;
}

export const AssistantView: React.FC<AssistantViewProps> = ({
  messages,
  onSendMessage,
  onSimulateVoiceNote,
  onTriggerHyperfocusNudge,
  onResolveDispute,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const sampleQueries = [
    "What's due this week?",
    "When is Riya's birthday?",
    "Check Sharma edit status",
    "Where is the Ladakh SSD stored?",
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '0 28px 24px 28px',
        overflowY: 'hidden',
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
        <div>
          <h1 className="t-h1" style={{ marginBottom: '4px' }}>
            Assistant
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            On-device local LLM reasoning over SQLite graph and Qdrant Edge
          </p>
        </div>

        {/* Demo Triggers */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={onSimulateVoiceNote}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--r-sm)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--line)',
              fontSize: '12px',
              color: 'var(--text)',
              boxShadow: 'var(--shadow-subtle)',
            }}
            title="Simulate recording on-set audio note: 'Push Sharma delivery to the 18th'"
          >
            <Mic size={14} color="var(--state-queued)" />
            <span>Simulate Voice Note</span>
          </button>

          <button
            onClick={onTriggerHyperfocusNudge}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--r-sm)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--line)',
              fontSize: '12px',
              color: 'var(--text)',
              boxShadow: 'var(--shadow-subtle)',
            }}
            title="Trigger hyperfocus nudge behavior"
          >
            <Zap size={14} color="var(--deco)" />
            <span>Trigger Nudge</span>
          </button>
        </div>
      </div>

      {/* Main Conversation Canvas */}
      <div
        style={{
          flex: 1,
          backgroundColor: 'var(--surface)',
          borderRadius: 'var(--r-lg)',
          border: '1px solid var(--line)',
          boxShadow: 'var(--shadow-clay)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Message Stream */}
        <div
          style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '780px',
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  width: '100%',
                }}
              >
                {/* Sender & Timestamp */}
                <div
                  style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    marginBottom: '4px',
                  }}
                >
                  {isUser ? 'You' : 'Edge Assistant'} · {msg.timestamp}
                </div>

                {/* Message Body */}
                <div
                  style={{
                    backgroundColor: isUser ? 'var(--raised)' : 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--r-md)',
                    padding: '16px 20px',
                    boxShadow: 'var(--shadow-subtle)',
                    color: 'var(--text)',
                    fontSize: '16px',
                    lineHeight: '26px',
                    whiteSpace: 'pre-wrap',
                    width: '100%',
                  }}
                >
                  {msg.text}

                  {/* Disputed Conflict Warning Box */}
                  {msg.disputed && msg.conflictDetails && (
                    <div
                      style={{
                        marginTop: '16px',
                        padding: '14px 16px',
                        borderRadius: 'var(--r-sm)',
                        backgroundColor: 'color-mix(in oklch, var(--state-conflict) 8%, var(--surface))',
                        border: '1px solid color-mix(in oklch, var(--state-conflict) 30%, var(--surface))',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: 'var(--state-conflict)',
                          fontWeight: 600,
                          fontSize: '13px',
                          marginBottom: '8px',
                        }}
                      >
                        <AlertTriangle size={15} />
                        <span>Disputed Fact: Multiple conflicting claims exist</span>
                      </div>

                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '10px',
                          marginBottom: '10px',
                          fontSize: '13px',
                        }}
                      >
                        <div style={{ backgroundColor: 'var(--surface)', padding: '8px 12px', borderRadius: 'var(--r-xs)' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{msg.conflictDetails.sourceA}:</span>
                          <div style={{ fontWeight: 500 }}>{msg.conflictDetails.versionA}</div>
                        </div>
                        <div style={{ backgroundColor: 'var(--surface)', padding: '8px 12px', borderRadius: 'var(--r-xs)' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{msg.conflictDetails.sourceB}:</span>
                          <div style={{ fontWeight: 500 }}>{msg.conflictDetails.versionB}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => onResolveDispute(msg.conflictDetails!.conflictId)}
                        style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: 'var(--accent)',
                          padding: '4px 0',
                          textDecoration: 'underline',
                        }}
                      >
                        Open Conflict Centre to settle this →
                      </button>
                    </div>
                  )}

                  {/* Sources Chips under the answer */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div
                      style={{
                        marginTop: '14px',
                        paddingTop: '10px',
                        borderTop: '1px solid var(--line)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginRight: '4px' }}>
                        Sources:
                      </span>
                      {msg.sources.map((src, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 8px',
                            borderRadius: 'var(--r-sm)',
                            backgroundColor: 'var(--raised)',
                            fontSize: '11px',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--text-muted)',
                            border: '1px solid var(--line)',
                          }}
                          title={src.quote || src.ref}
                        >
                          <span>[{src.kind}: {src.author}]</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Suggestion Chips */}
        <div
          style={{
            padding: '10px 20px',
            borderTop: '1px solid var(--line)',
            backgroundColor: 'var(--surface)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
          }}
        >
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            Try asking:
          </span>
          {sampleQueries.map((query, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(query)}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--r-pill)',
                backgroundColor: 'var(--raised)',
                border: '1px solid var(--line)',
                fontSize: '12px',
                color: 'var(--text)',
                whiteSpace: 'nowrap',
              }}
            >
              {query}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '14px 20px',
            borderTop: '1px solid var(--line)',
            backgroundColor: 'var(--raised)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask your memory layer (offline FastEmbed + local LLM)..."
            style={{
              flex: 1,
              height: '42px',
              padding: '0 14px',
              borderRadius: 'var(--r-sm)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--line)',
              color: 'var(--text)',
              fontSize: '14px',
              outline: 'none',
            }}
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--r-sm)',
              backgroundColor: inputText.trim() ? 'var(--accent)' : 'var(--surface)',
              color: inputText.trim() ? 'var(--on-accent)' : 'var(--text-muted)',
              border: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
