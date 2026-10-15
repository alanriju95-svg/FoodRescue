'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import RoleGuard from '../../../components/RoleGuard';
import Sidebar from '../../../components/Sidebar';
import PortalHeader from '../../../components/PortalHeader';
import StatCard from '../../../components/StatCard';
import StatusBadge from '../../../components/StatusBadge';
import { executeGraphQL } from '../../../lib/graphql-client';
import {
  RECEIVER_STATS_QUERY,
  GET_MY_REQUESTS_QUERY,
  GET_AVAILABLE_DONATIONS_QUERY,
} from '../../../lib/graphql-queries';
import { ReceiverStats, DonationRequest, Donation } from '../../../types/index';
import {
  UtensilsCrossed,
  Clock,
  Truck,
  CheckCircle2,
  ArrowRight,
  Package,
  MapPin,
  Calendar,
} from 'lucide-react';

export default function ReceiverDashboardPage() {
  const [stats, setStats] = useState<ReceiverStats>({
    availableFood: 0,
    pendingRequests: 0,
    activeDeliveries: 0,
    completedRequests: 0,
  });
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [availableFood, setAvailableFood] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReceiverData() {
      try {
        const statsRes = await executeGraphQL<{ receiverStats: ReceiverStats }>(RECEIVER_STATS_QUERY);
        if (statsRes?.receiverStats) {
          setStats(statsRes.receiverStats);
        }

        const reqsRes = await executeGraphQL<{ myRequests: DonationRequest[] }>(GET_MY_REQUESTS_QUERY);
        if (reqsRes?.myRequests) {
          setRequests(reqsRes.myRequests);
        }

        const foodRes = await executeGraphQL<{ availableDonations: Donation[] }>(GET_AVAILABLE_DONATIONS_QUERY);
        if (foodRes?.availableDonations) {
          setAvailableFood(foodRes.availableDonations);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadReceiverData();
  }, []);

  const activeInTransit = requests.filter((r) =>
    ['REQUESTED', 'PICKUP_ASSIGNED', 'PICKED_UP', 'DELIVERED'].includes(r.donation?.status || '')
  );

  return (
    <RoleGuard allowedRoles={['RECEIVER']}>
      <div className="portal-layout">
        <Sidebar role="RECEIVER" />

        <div className="portal-main">
          <PortalHeader
            title="Receiver Community Dashboard"
            subtitle="Surplus food allocation, request tracking, and delivery confirmations"
            action={
              <Link href="/receiver/food" className="btn btn-primary btn-sm" style={{ background: '#2563eb' }}>
                <UtensilsCrossed size={16} />
                <span>Browse Available Food</span>
              </Link>
            }
          />

          <main className="portal-content">
            {/* Stats Cards */}
            <div className="grid-4" style={{ marginBottom: '2rem' }}>
              <StatCard
                title="Available Food"
                value={stats.availableFood}
                subtitle="Ready to request"
                icon={UtensilsCrossed}
                variant="emerald"
              />
              <StatCard
                title="Pending Requests"
                value={stats.pendingRequests}
                subtitle="Awaiting courier"
                icon={Clock}
                variant="amber"
              />
              <StatCard
                title="In-Transit Deliveries"
                value={activeInTransit.length}
                subtitle="En route to shelter"
                icon={Truck}
                variant="blue"
              />
              <StatCard
                title="Completed Rescues"
                value={stats.completedRequests}
                subtitle="Received & served"
                icon={CheckCircle2}
                variant="purple"
              />
            </div>

            {/* Active In-Transit Alert */}
            {activeInTransit.length > 0 && (
              <div
                className="card"
                style={{
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
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
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', background: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    <Truck size={14} />
                    <span>Incoming Food Delivery</span>
                  </div>
                  <h3 style={{ fontSize: '1.375rem', fontWeight: 800 }}>
                    {activeInTransit[0].donation?.foodName}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#bfdbfe', marginTop: '0.25rem' }}>
                    Status: <strong>{activeInTransit[0].donation?.status.replace(/_/g, ' ')}</strong> • From: {activeInTransit[0].donation?.donor?.organization || 'Food Donor'}
                  </p>
                </div>
                <Link
                  href={`/receiver/requests/${activeInTransit[0].id}`}
                  className="btn"
                  style={{ background: '#ffffff', color: '#1e3a8a', fontWeight: 700 }}
                >
                  Track & Confirm Receipt →
                </Link>
              </div>
            )}

            {/* Available Surplus Marketplace Teaser */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Surplus Food Available Right Now ({availableFood.length})
                  </h2>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    High-quality surplus meals and ingredients ready for immediate claim
                  </p>
                </div>
                <Link href="/receiver/food" className="btn btn-outline btn-sm">
                  Marketplace Catalog <ArrowRight size={14} />
                </Link>
              </div>

              {availableFood.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                  <Package size={40} color="var(--text-light)" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>No Food Available Currently</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    Check back in a few moments as local restaurants log surplus after meal service.
                  </p>
                </div>
              ) : (
                <div className="grid-3">
                  {availableFood.slice(0, 3).map((item) => (
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
                          <span style={{ color: 'var(--text-muted)' }}>Donor:</span>
                          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.donor?.organization || item.donor?.name}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Pickup Slot:</span>
                          <span style={{ color: '#059669', fontWeight: 600 }}>{item.pickupAvailableTime}</span>
                        </div>
                      </div>

                      <Link
                        href="/receiver/food"
                        className="btn btn-primary btn-sm"
                        style={{ background: '#2563eb', width: '100%' }}
                      >
                        Request This Food →
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
