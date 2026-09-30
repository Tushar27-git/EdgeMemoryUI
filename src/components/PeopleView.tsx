import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import { PersonEntity } from '../types';

interface PeopleViewProps {
  people: PersonEntity[];
}

export const PeopleView: React.FC<PeopleViewProps> = ({ people }) => {
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
      <div style={{ marginBottom: '22px' }}>
        <h1 className="t-h1" style={{ marginBottom: '4px' }}>
          People & Relationships
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Contacts, collaborative contexts, and proactive relationship memories
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '16px',
        }}
      >
        {people.map((person) => (
          <div
            key={person.id}
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: 'var(--r-lg)',
              padding: '22px',
              border: '1px solid var(--line)',
              boxShadow: 'var(--shadow-clay)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '190px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--r-pill)',
                    backgroundColor: 'var(--tint)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text)',
                    fontWeight: 600,
                    fontSize: '15px',
                  }}
                >
                  {person.name.charAt(0)}
                </div>
                <div>
                  <h2 className="t-h3" style={{ fontSize: '17px' }}>
                    {person.name}
                  </h2>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {person.role}
                  </div>
                </div>
              </div>

              {/* Memory Fact Callout */}
              <div
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--r-sm)',
                  backgroundColor: 'var(--raised)',
                  border: '1px solid var(--line)',
                  fontSize: '13px',
                  lineHeight: '19px',
                  color: 'var(--text)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  marginBottom: '14px',
                }}
              >
                <Sparkles size={15} color="var(--deco)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{person.keyFact}</span>
              </div>
            </div>

            {/* Bottom Meta */}
            <div
              style={{
                borderTop: '1px solid var(--line)',
                paddingTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: 'var(--text-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={13} />
                <span>Last note: {person.lastInteraction}</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)' }}>
                {person.claimsCount} claims
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
