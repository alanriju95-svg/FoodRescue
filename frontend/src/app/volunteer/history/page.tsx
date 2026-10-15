'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import RoleGuard from '../../../components/RoleGuard';
import Sidebar from '../../../components/Sidebar';
import PortalHeader from '../../../components/PortalHeader';
import StatusBadge from '../../../components/StatusBadge';
import { executeGraphQL } from '../../../lib/graphql-client';
import { GET_MY_TASK_HISTORY_QUERY } from '../../../lib/graphql-queries';
import { PickupTask } from '../../../types/index';
import { Award, CheckCircle2, History, Truck, ArrowRight } from 'lucide-react';

export default function VolunteerHistoryPage() {
  const [history, setHistory] = useState<PickupTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await executeGraphQL<{ myTaskHistory: PickupTask[] }>(GET_MY_TASK_HISTORY_QUERY);
        if (res?.myTaskHistory) {
          setHistory(res.myTaskHistory);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  const totalMeals = history.reduce((acc, curr) => acc + (curr.donation?.quantity || 0), 0);

  return (
    <RoleGuard allowedRoles={['VOLUNTEER']}>
      <div className="portal-layout">
        <Sidebar role="VOLUNTEER" />

        <div className="portal-main">
          <PortalHeader
            title="Volunteer Mission History"
            subtitle="Record of your completed surplus food transports & rescue achievements"
          />

          <main className="portal-content">
            {/* Impact Badges */}
            <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
              <div className="card" style={{ borderLeft: '4px solid #d97706' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Award size={32} color="#d97706" />
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Meals Delivered
                    </span>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)' }}>
                      {totalMeals} Portions
                    </h3>
                  </div>
                </div>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #059669' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={32} color="#059669" />
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Completed Runs
                    </span>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)' }}>
                      {history.length} Missions
                    </h3>
                  </div>
                </div>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #7c3aed' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Truck size={32} color="#7c3aed" />
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Reliability Score
                    </span>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)' }}>
                      100% On-Time
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* History Table */}
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <History size={20} color="var(--primary)" />
                <span>Completed Food Transport Missions</span>
              </h3>

              {history.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2.5rem' }}>
                  No completed delivery missions yet. Accept available pickups to build your log!
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {history.map((task) => (
                    <div
                      key={task.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1.25rem',
                        background: 'var(--bg-subtle)',
                        borderRadius: 'var(--radius-md)',
                        flexWrap: 'wrap',
                        gap: '1rem',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <StatusBadge status={task.status} size="sm" />
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Delivered: {task.deliveredAt ? new Date(task.deliveredAt).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {task.donation?.foodName}
                        </h4>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                          From <strong>{task.donation?.donor?.organization || 'Donor'}</strong> to{' '}
                          <strong>{task.donation?.requests?.[0]?.receiver?.organization || 'Community Kitchen'}</strong>
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                            Delivered
                          </span>
                          <strong style={{ fontSize: '0.9375rem', color: 'var(--text-main)' }}>
                            {task.donation?.quantity} {task.donation?.unit}
                          </strong>
                        </div>

                        <Link href={`/volunteer/tasks/${task.id}`} className="btn btn-outline btn-sm">
                          View Run <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
