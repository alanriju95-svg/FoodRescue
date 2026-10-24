'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import RoleGuard from '../../../components/RoleGuard';
import Sidebar from '../../../components/Sidebar';
import PortalHeader from '../../../components/PortalHeader';
import StatusBadge from '../../../components/StatusBadge';
import { executeGraphQL } from '../../../lib/graphql-client';
import { GET_MY_DONATIONS_QUERY, CANCEL_DONATION_MUTATION, ACCEPT_REQUEST_MUTATION } from '../../../lib/graphql-queries';
import { Donation, DonationStatus } from '../../../types/index';
import { PlusCircle, Search, Filter, ArrowRight, Eye, Ban, CheckCircle2 } from 'lucide-react';

export default function DonorDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filtered, setFiltered] = useState<Donation[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);

  const loadDonations = async () => {
    try {
      const res = await executeGraphQL<{ myDonations: Donation[] }>(GET_MY_DONATIONS_QUERY);
      if (res?.myDonations) {
        setDonations(res.myDonations);
        setFiltered(res.myDonations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  const handleAcceptRequest = async (requestId: string) => {
    setAcceptingId(requestId);
    try {
      await executeGraphQL(ACCEPT_REQUEST_MUTATION, { requestId });
      await loadDonations();
    } catch (err: any) {
      alert(err?.message || 'Failed to accept request');
    } finally {
      setAcceptingId(null);
    }
  };

  useEffect(() => {
    let list = [...donations];
    if (statusFilter !== 'ALL') {
      list = list.filter((d) => d.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.foodName.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.pickupLocation.toLowerCase().includes(q)
      );
    }
    setFiltered(list);
  }, [statusFilter, search, donations]);

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this food donation?')) return;
    try {
      await executeGraphQL(CANCEL_DONATION_MUTATION, { id });
      loadDonations();
    } catch (err: any) {
      alert(err?.message || 'Could not cancel donation');
    }
  };

  return (
    <RoleGuard allowedRoles={['DONOR']}>
      <div className="portal-layout">
        <Sidebar role="DONOR" />

        <div className="portal-main">
          <PortalHeader
            title="My Food Donations"
            subtitle="Manage and track the lifecycle of your surplus contributions"
            action={
              <Link href="/donor/donations/create" className="btn btn-primary btn-sm">
                <PlusCircle size={16} />
                <span>+ Create Donation</span>
              </Link>
            }
          />

          <main className="portal-content">
            {/* Filter Bar */}
            <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                {/* Search */}
                <div style={{ position: 'relative', minWidth: '260px', flex: 1 }}>
                  <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="text"
                    placeholder="Search by food name, description..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input"
                    style={{ paddingLeft: '36px' }}
                  />
                </div>

                {/* Status Tabs */}
                <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '2px' }}>
                  {['ALL', 'AVAILABLE', 'REQUESTED', 'PICKUP_ASSIGNED', 'PICKED_UP', 'DELIVERED', 'COMPLETED', 'CANCELLED'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: statusFilter === s ? 700 : 500,
                        background: statusFilter === s ? 'var(--primary)' : 'var(--bg-subtle)',
                        color: statusFilter === s ? '#ffffff' : 'var(--text-secondary)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {s.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Donations Table / Grid */}
            {filtered.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3.5rem' }}>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                  No donations matching the selected filters.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filtered.map((item) => {
                  const canCancel = ['AVAILABLE', 'REQUESTED'].includes(item.status);
                  return (
                    <div
                      key={item.id}
                      className="card"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1.25rem',
                        padding: '1.25rem 1.5rem',
                      }}
                    >
                      <div style={{ flex: '1 1 300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                          <StatusBadge status={item.status} size="sm" />
                          <span className="category-pill">{item.category.replace(/_/g, ' ')}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Posted {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {item.foodName}
                        </h3>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                          {item.description}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                            Quantity
                          </span>
                          <strong style={{ fontSize: '0.9375rem', color: 'var(--text-main)' }}>
                            {item.quantity} {item.unit}
                          </strong>
                        </div>

                        <div>
                          <span style={{ display: 'block', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                            Pickup Slot
                          </span>
                          <span style={{ fontSize: '0.875rem', color: '#059669', fontWeight: 600 }}>
                            {item.pickupAvailableTime}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Link href={`/donor/donations/${item.id}`} className="btn btn-outline btn-sm">
                            <Eye size={14} />
                            <span>Details</span>
                          </Link>
                          {canCancel && (
                            <button
                              onClick={() => handleCancel(item.id)}
                              className="btn btn-danger btn-sm"
                              title="Cancel this donation"
                            >
                              <Ban size={14} />
                              <span>Cancel</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Incoming Request Alert & Accept Button */}
                      {item.currentRequest && (
                        <div
                          style={{
                            width: '100%',
                            marginTop: '0.75rem',
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            background: item.currentRequest.status === 'PENDING' ? '#fffbeb' : '#f0fdf4',
                            border: `1px solid ${item.currentRequest.status === 'PENDING' ? '#fde68a' : '#bbf7d0'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '0.75rem',
                          }}
                        >
                          <div style={{ fontSize: '0.8125rem' }}>
                            <span style={{ fontWeight: 700, color: item.currentRequest.status === 'PENDING' ? '#92400e' : '#166534' }}>
                              {item.currentRequest.status === 'PENDING' ? '🔔 New Request Received from:' : '✓ Request Accepted for:'}
                            </span>{' '}
                            <strong>{item.currentRequest.receiver?.organization || item.currentRequest.receiver?.name}</strong>
                            <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                              • Dropoff: {item.currentRequest.deliveryAddress}
                            </span>
                          </div>

                          {item.currentRequest.status === 'PENDING' && (
                            <button
                              onClick={() => handleAcceptRequest(item.currentRequest!.id)}
                              disabled={acceptingId === item.currentRequest.id}
                              className="btn btn-primary btn-sm"
                              style={{ background: '#059669', borderColor: '#059669', padding: '0.35rem 0.75rem', fontSize: '0.8125rem' }}
                            >
                              <CheckCircle2 size={14} />
                              <span>{acceptingId === item.currentRequest.id ? 'Accepting...' : 'Accept Request'}</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
