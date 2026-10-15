'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import RoleGuard from '../../../components/RoleGuard';
import Sidebar from '../../../components/Sidebar';
import PortalHeader from '../../../components/PortalHeader';
import StatusBadge from '../../../components/StatusBadge';
import { executeGraphQL } from '../../../lib/graphql-client';
import { GET_MY_TASKS_QUERY } from '../../../lib/graphql-queries';
import { PickupTask } from '../../../types/index';
import { Truck, MapPin, ArrowRight, Clock, Navigation } from 'lucide-react';

export default function VolunteerTasksPage() {
  const [tasks, setTasks] = useState<PickupTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      try {
        const res = await executeGraphQL<{ myTasks: PickupTask[] }>(GET_MY_TASKS_QUERY);
        if (res?.myTasks) {
          setTasks(res.myTasks);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  return (
    <RoleGuard allowedRoles={['VOLUNTEER']}>
      <div className="portal-layout">
        <Sidebar role="VOLUNTEER" />

        <div className="portal-main">
          <PortalHeader
            title="My Active Tasks"
            subtitle="Current rescue collection and delivery assignments"
            action={
              <Link href="/volunteer/donations" className="btn btn-secondary btn-sm">
                <span>+ Claim Another Pickup</span>
              </Link>
            }
          />

          <main className="portal-content">
            {tasks.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3.5rem' }}>
                <Truck size={40} color="var(--text-light)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>No Active Tasks Assigned</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem', marginBottom: '1.25rem' }}>
                  You don&apos;t have any ongoing pickups right now. Browse available food to start a delivery run!
                </p>
                <Link href="/volunteer/donations" className="btn btn-secondary btn-sm">
                  Browse Available Pickups
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1.5rem',
                      padding: '1.5rem',
                      borderLeft: `4px solid ${task.status === 'PICKED_UP' ? '#7c3aed' : '#f59e0b'}`,
                    }}
                  >
                    <div style={{ flex: '1 1 320px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                        <StatusBadge status={task.status} size="sm" />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Task ID: {task.id}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        {task.donation?.foodName}
                      </h3>

                      <div style={{ marginTop: '0.6rem', fontSize: '0.8125rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)' }}>
                          <MapPin size={14} color="#059669" />
                          <span>Pickup: <strong>{task.donation?.pickupLocation}</strong></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)' }}>
                          <Navigation size={14} color="#2563eb" />
                          <span>
                            Dropoff: <strong>{task.donation?.requests?.[0]?.deliveryAddress || 'Community Shelter Kitchen'}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'block', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          Quantity
                        </span>
                        <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>
                          {task.donation?.quantity} {task.donation?.unit}
                        </strong>
                      </div>

                      <Link href={`/volunteer/tasks/${task.id}`} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span>Manage Mission</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
