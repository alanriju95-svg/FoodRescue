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
import { DONOR_STATS_QUERY, GET_MY_DONATIONS_QUERY, ACCEPT_REQUEST_MUTATION } from '../../../lib/graphql-queries';
import { DonorStats, Donation } from '../../../types/index';
import {
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  Utensils,
  PlusCircle,
  ArrowRight,
  MapPin,
  Calendar,
  Building2,
} from 'lucide-react';

export default function DonorDashboardPage() {
  const { user, isLoading } = useAuth();
  const [stats, setStats] = useState<DonorStats>({
    totalDonations: 0,
    activeDonations: 0,
    completedDonations: 0,
    pendingRequests: 0,
    totalMealsSaved: 0,
  });
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);

  const loadDonorData = async () => {
    try {
      const statsData = await executeGraphQL<{ donorStats: DonorStats }>(DONOR_STATS_QUERY);
      if (statsData?.donorStats) {
        setStats(statsData.donorStats);
      }

      const listData = await executeGraphQL<{ myDonations: Donation[] }>(GET_MY_DONATIONS_QUERY);
      if (listData?.myDonations) {
        setDonations(listData.myDonations);
      }
    } catch (err) {
      console.error('Error fetching donor data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    setAcceptingId(requestId);
    try {
      await executeGraphQL(ACCEPT_REQUEST_MUTATION, { requestId });
      await loadDonorData();
    } catch (err: any) {
      alert(err?.message || 'Failed to accept request');
    } finally {
      setAcceptingId(null);
    }
  };
  useEffect(() => {
    if (!isLoading && user?.role === 'DONOR') {
      loadDonorData();
    }
  }, [user, isLoading]);

  const activeDonations = donations.filter((d) =>
    ['AVAILABLE', 'REQUESTED', 'PICKUP_ASSIGNED', 'PICKED_UP'].includes(d.status)
  );

  const pendingRequestsList = donations.filter(
    (d) => d.currentRequest && d.currentRequest.status === 'PENDING'
  );

  return (
    <RoleGuard allowedRoles={['DONOR']}>
      <div className="portal-layout">
        <Sidebar role="DONOR" />

        <div className="portal-main">
          <PortalHeader
            title="Donor Dashboard"
            subtitle="Overview of your surplus food contributions & live pickups"
            action={
              <Link href="/donor/donations/create" className="btn btn-primary btn-sm">
                <PlusCircle size={16} />
                <span>+ Create Donation</span>
              </Link>
            }
          />

          <main className="portal-content">
            {/* Stat Cards */}
            <div className="grid-4" style={{ marginBottom: '2rem' }}>
              <StatCard
                title="Total Donations"
                value={stats.totalDonations}
                subtitle="Lifetime surplus logged"
                icon={Package}
                variant="emerald"
              />
              <StatCard
                title="Active Rescues"
                value={stats.activeDonations}
                subtitle="Currently in progress"
                icon={Clock}
                variant="amber"
              />
              <StatCard
                title="Completed Deliveries"
                value={stats.completedDonations}
                subtitle="Successfully fed shelters"
                icon={CheckCircle2}
                variant="blue"
              />
              <StatCard
                title="Meals Rescued"
                value={stats.totalMealsSaved}
                subtitle="Total portions saved"
                icon={Utensils}
                variant="purple"
              />
            </div>

            {/* Quick Action Banner */}
            <div
              className="card"
              style={{
                background: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.75rem 2rem',
                marginBottom: '2.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                  Have surplus food from today&apos;s kitchen or service?
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#a7f3d0' }}>
                  Log it now so volunteer drivers and community kitchens can arrange prompt collection.
                </p>
              </div>
              <Link
                href="/donor/donations/create"
                className="btn btn-secondary"
                style={{ fontWeight: 700 }}
              >
                + Post Surplus Food
              </Link>
            </div>

            {/* Incoming Requests Section (Awaiting Donor Acceptance) */}
            {pendingRequestsList.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#b45309', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <AlertCircle size={20} color="#b45309" />
                      <span>Incoming Requests Requiring Your Approval ({pendingRequestsList.length})</span>
                    </h2>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      Local shelters have requested these food items. Please review and accept to authorize volunteer pickup.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {pendingRequestsList.map((item) => (
                    <div
                      key={item.id}
                      className="card"
                      style={{
                        padding: '1.25rem 1.5rem',
                        borderLeft: '4px solid #f59e0b',
                        background: '#fffdf5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1rem',
                      }}
                    >
                      <div style={{ flex: '1 1 300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                          <span className="category-pill">{item.category.replace(/_/g, ' ')}</span>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b45309' }}>
                            🔔 Request from: {item.currentRequest?.receiver?.organization || item.currentRequest?.receiver?.name}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                          {item.foodName} ({item.quantity} {item.unit})
                        </h3>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                          Drop-off Address: <strong>{item.currentRequest?.deliveryAddress}</strong>
                          {item.currentRequest?.notes && <span> &bull; &ldquo;{item.currentRequest.notes}&rdquo;</span>}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Link href={`/donor/donations/${item.id}`} className="btn btn-outline btn-sm">
                          Details
                        </Link>
                        <button
                          onClick={() => handleAcceptRequest(item.currentRequest!.id)}
                          disabled={acceptingId === item.currentRequest?.id}
                          className="btn btn-primary btn-sm"
                          style={{ background: '#059669', borderColor: '#059669', fontWeight: 700 }}
                        >
                          <CheckCircle2 size={16} />
                          <span>{acceptingId === item.currentRequest?.id ? 'Accepting...' : '✓ Accept Request'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active Donations Section */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Active Food Donations ({activeDonations.length})
                  </h2>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    Surplus items waiting for pickup or currently in transit
                  </p>
                </div>
                <Link href="/donor/donations" className="btn btn-outline btn-sm">
                  View All Donations <ArrowRight size={14} />
                </Link>
              </div>

              {activeDonations.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                  <Package size={40} color="var(--text-light)" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    No Active Donations Right Now
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem', marginBottom: '1.25rem' }}>
                    All your surplus food has been delivered! Post a new batch when ready.
                  </p>
                  <Link href="/donor/donations/create" className="btn btn-primary btn-sm">
                    + Create New Donation
                  </Link>
                </div>
              ) : (
                <div className="grid-3">
                  {activeDonations.map((item) => (
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
                          <span style={{ color: 'var(--text-muted)' }}>Quantity:</span>
                          <strong style={{ color: 'var(--text-main)' }}>{item.quantity} {item.unit}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Pickup Slot:</span>
                          <span style={{ color: '#059669', fontWeight: 600 }}>{item.pickupAvailableTime}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Location:</span>
                          <span style={{ color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                            {item.pickupLocation}
                          </span>
                        </div>
                      </div>

                      <Link href={`/donor/donations/${item.id}`} className="btn btn-outline btn-sm" style={{ width: '100%' }}>
                        Track Food Journey →
                      </Link>
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
