'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../lib/auth-context';
import RoleGuard from '../../../components/RoleGuard';
import Sidebar from '../../../components/Sidebar';
import PortalHeader from '../../../components/PortalHeader';
import StatCard from '../../../components/StatCard';
import StatusBadge from '../../../components/StatusBadge';
import { executeGraphQL } from '../../../lib/graphql-client';
import {
  VOLUNTEER_STATS_QUERY,
  GET_MY_TASKS_QUERY,
  GET_AVAILABLE_PICKUP_TASKS_QUERY,
  ACCEPT_PICKUP_MUTATION,
} from '../../../lib/graphql-queries';
import { VolunteerStats, PickupTask, Donation } from '../../../types/index';
import {
  Truck,
  MapPin,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Navigation,
} from 'lucide-react';

export default function VolunteerDashboardPage() {
  const { user, isLoading } = useAuth();
  const [stats, setStats] = useState<VolunteerStats>({
    availableTasks: 0,
    activeTasks: 0,
    completedPickups: 0,
    todayTasks: 0,
  });
  const [activeTasks, setActiveTasks] = useState<PickupTask[]>([]);
  const [availableDonations, setAvailableDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const statsRes = await executeGraphQL<{ volunteerStats: VolunteerStats }>(VOLUNTEER_STATS_QUERY);
      if (statsRes?.volunteerStats) {
        setStats(statsRes.volunteerStats);
      }

      const myTasksRes = await executeGraphQL<{ myTasks: PickupTask[] }>(GET_MY_TASKS_QUERY);
      if (myTasksRes?.myTasks) {
        setActiveTasks(myTasksRes.myTasks);
      }

      const availRes = await executeGraphQL<{ availablePickupTasks: Donation[] }>(GET_AVAILABLE_PICKUP_TASKS_QUERY);
      if (availRes?.availablePickupTasks) {
        setAvailableDonations(availRes.availablePickupTasks);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && user?.role === 'VOLUNTEER') {
      loadData();
    }
  }, [user, isLoading]);

  const handleClaim = async (donationId: string) => {
    try {
      await executeGraphQL(ACCEPT_PICKUP_MUTATION, { donationId });
      loadData();
    } catch (err: any) {
      alert(err?.message || 'Could not claim task');
    }
  };

  return (
    <RoleGuard allowedRoles={['VOLUNTEER']}>
      <div className="portal-layout">
        <Sidebar role="VOLUNTEER" />

        <div className="portal-main">
          <PortalHeader
            title="Volunteer Courier Dashboard"
            subtitle="Surplus food collection dispatch & route management"
            action={
              <Link href="/volunteer/donations" className="btn btn-secondary btn-sm">
                <MapPin size={16} />
                <span>Browse Available Pickups</span>
              </Link>
            }
          />

          <main className="portal-content">
            {/* Stat Cards */}
            <div className="grid-4" style={{ marginBottom: '2rem' }}>
              <StatCard
                title="Available Tasks"
                value={stats.availableTasks}
                subtitle="Waiting for courier"
                icon={MapPin}
                variant="amber"
              />
              <StatCard
                title="My Active Tasks"
                value={activeTasks.length}
                subtitle="Currently dispatched"
                icon={Truck}
                variant="blue"
              />
              <StatCard
                title="Completed Missions"
                value={stats.completedPickups}
                subtitle="Safely delivered"
                icon={CheckCircle2}
                variant="emerald"
              />
              <StatCard
                title="Today's Deliveries"
                value={stats.todayTasks}
                subtitle="Missions today"
                icon={Calendar}
                variant="purple"
              />
            </div>

            {/* In-Progress Task Alert */}
            {activeTasks.length > 0 && (
              <div
                className="card"
                style={{
                  background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                  color: '#ffffff',
                  padding: '1.75rem 2rem',
                  marginBottom: '2.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.25rem',
                }}
              >
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    <Navigation size={12} />
                    <span>Active Dispatched Mission</span>
                  </div>
                  <h3 style={{ fontSize: '1.375rem', fontWeight: 800 }}>
                    {activeTasks[0].donation?.foodName}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#c7d2fe', marginTop: '0.25rem' }}>
                    Pickup: {activeTasks[0].donation?.pickupLocation} → Dropoff: {activeTasks[0].donation?.requests?.[0]?.deliveryAddress || 'Community Shelter'}
                  </p>
                </div>
                <Link
                  href={`/volunteer/tasks/${activeTasks[0].id}`}
                  className="btn btn-secondary"
                  style={{ fontWeight: 700 }}
                >
                  Continue Mission Steps →
                </Link>
              </div>
            )}

            {/* Available Pickup Tasks Section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Surplus Food Ready for Collection ({availableDonations.length})
                  </h2>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    Food donations needing volunteer drivers to collect and deliver
                  </p>
                </div>
                <Link href="/volunteer/donations" className="btn btn-outline btn-sm">
                  View Full Board <ArrowRight size={14} />
                </Link>
              </div>

              {availableDonations.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                  <CheckCircle2 size={40} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>All Surplus Picked Up!</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    No pending pickup tasks at this moment. Thank you for your volunteer readiness!
                  </p>
                </div>
              ) : (
                <div className="grid-3">
                  {availableDonations.slice(0, 6).map((item) => (
                    <div key={item.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span className="category-pill">{item.category.replace(/_/g, ' ')}</span>
                        <StatusBadge status={item.status} size="sm" />
                      </div>

                      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                        {item.foodName}
                      </h3>

                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>
                        {item.description}
                      </p>

                      <div style={{ padding: '0.75rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Amount:</span>
                          <strong style={{ color: 'var(--text-main)' }}>{item.quantity} {item.unit}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Donor Location:</span>
                          <span style={{ color: 'var(--text-main)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                            {item.pickupLocation}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Pickup Slot:</span>
                          <span style={{ color: '#d97706', fontWeight: 600 }}>{item.pickupAvailableTime}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleClaim(item.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ width: '100%', fontWeight: 700 }}
                      >
                        ✓ Accept Pickup Task
                      </button>
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
