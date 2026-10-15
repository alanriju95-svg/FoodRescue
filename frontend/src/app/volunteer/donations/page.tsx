'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RoleGuard from '../../../components/RoleGuard';
import Sidebar from '../../../components/Sidebar';
import PortalHeader from '../../../components/PortalHeader';
import StatusBadge from '../../../components/StatusBadge';
import { executeGraphQL } from '../../../lib/graphql-client';
import { GET_AVAILABLE_PICKUP_TASKS_QUERY, ACCEPT_PICKUP_MUTATION } from '../../../lib/graphql-queries';
import { Donation } from '../../../types/index';
import { Search, MapPin, Clock, Truck, Check } from 'lucide-react';

export default function AvailablePickupsPage() {
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [search, setSearch] = useState('');
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      const res = await executeGraphQL<{ availablePickupTasks: Donation[] }>(GET_AVAILABLE_PICKUP_TASKS_QUERY);
      if (res?.availablePickupTasks) {
        setDonations(res.availablePickupTasks);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleClaim = async (id: string) => {
    setClaimingId(id);
    try {
      await executeGraphQL(ACCEPT_PICKUP_MUTATION, { donationId: id });
      router.push('/volunteer/tasks');
    } catch (err: any) {
      alert(err?.message || 'Could not claim pickup task');
      setClaimingId(null);
    }
  };

  const filtered = donations.filter((d) =>
    d.foodName.toLowerCase().includes(search.toLowerCase()) ||
    d.pickupLocation.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <RoleGuard allowedRoles={['VOLUNTEER']}>
      <div className="portal-layout">
        <Sidebar role="VOLUNTEER" />

        <div className="portal-main">
          <PortalHeader
            title="Available Food Pickups"
            subtitle="Claim surplus food collection runs and transport them to local shelters"
          />

          <main className="portal-content">
            {/* Search Bar */}
            <div className="card" style={{ marginBottom: '2rem', padding: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="Filter pickups by location, food name, or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input"
                  style={{ paddingLeft: '36px' }}
                />
              </div>
            </div>

            {/* Pickups Grid */}
            {filtered.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3.5rem' }}>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                  No available pickup tasks matching your search. Check back shortly as new surplus is posted!
                </p>
              </div>
            ) : (
              <div className="grid-3">
                {filtered.map((item) => (
                  <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span className="category-pill">{item.category.replace(/_/g, ' ')}</span>
                      <StatusBadge status={item.status} size="sm" />
                    </div>

                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                      {item.foodName}
                    </h3>

                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
                      {item.description}
                    </p>

                    <div style={{ padding: '0.85rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Quantity:</span>
                        <strong style={{ color: 'var(--text-main)' }}>{item.quantity} {item.unit}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Pickup Location:</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                          {item.pickupLocation}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Time Slot:</span>
                        <span style={{ color: '#d97706', fontWeight: 600 }}>{item.pickupAvailableTime}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleClaim(item.id)}
                      disabled={claimingId === item.id}
                      className="btn btn-secondary"
                      style={{ width: '100%', fontWeight: 700 }}
                    >
                      {claimingId === item.id ? 'Claiming Task...' : '✓ Claim & Start Task'}
                    </button>
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
