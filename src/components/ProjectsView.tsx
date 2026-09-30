import React from 'react';
import { Folder, AlertTriangle, Clock, Layers } from 'lucide-react';
import { ProjectEntity, ClaimRecord } from '../types';

interface ProjectsViewProps {
  projects: ProjectEntity[];
  claims: ClaimRecord[];
  onSelectProject: (projectId: string) => void;
  onNavigateToConflicts: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  claims,
  onNavigateToConflicts,
}) => {
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
          Projects
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Entities clustered across Gmail, WhatsApp, and voice note extractions
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '16px',
        }}
      >
        {projects.map((project) => {
          const projectClaims = claims.filter(
            (c) => c.entity_id.toLowerCase().includes(project.id.replace('proj_', ''))
          );

          return (
            <div
              key={project.id}
              style={{
                backgroundColor: 'var(--surface)',
                borderRadius: 'var(--r-lg)',
                padding: '22px',
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadow-clay)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '220px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--r-sm)',
                        backgroundColor: 'var(--tint)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Folder size={18} color="var(--text)" />
                    </div>
                    <div>
                      <h2 className="t-h3" style={{ fontSize: '17px' }}>
                        {project.name}
                      </h2>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        {project.id}
                      </span>
                    </div>
                  </div>

                  {project.openConflicts > 0 && (
                    <button
                      onClick={onNavigateToConflicts}
                      className="chip"
                      data-state="conflict"
                      style={{ cursor: 'pointer' }}
                    >
                      <AlertTriangle size={12} color="var(--state-conflict)" />
                      <span>{project.openConflicts} Disputed</span>
                    </button>
                  )}
                </div>

                <p style={{ fontSize: '13px', lineHeight: '20px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  {project.description}
                </p>

                {project.due_date && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      color: project.openConflicts > 0 ? 'var(--state-conflict)' : 'var(--text)',
                      fontWeight: 500,
                      marginBottom: '12px',
                    }}
                  >
                    <Clock size={13} />
                    <span>Target Due: {project.due_date}</span>
                  </div>
                )}
              </div>

              {/* Claims Preview */}
              <div
                style={{
                  borderTop: '1px solid var(--line)',
                  paddingTop: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Layers size={14} />
                  <span>{project.claimsCount} claims indexed</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)' }}>
                  {projectClaims.length} active in memory
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
