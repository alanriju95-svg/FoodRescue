'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import RoleGuard from '../../../../components/RoleGuard';
import Sidebar from '../../../../components/Sidebar';
import PortalHeader from '../../../../components/PortalHeader';
import StatusBadge from '../../../../components/StatusBadge';
import LifecycleStepper from '../../../../components/LifecycleStepper';
import { executeGraphQL } from '../../../../lib/graphql-client';
import { GET_DONATION_DETAIL_QUERY, CANCEL_DONATION_MUTATION, ACCEPT_REQUEST_MUTATION } from '../../../../lib/graphql-queries';
import { Donation } from '../../../../types/index';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Calendar,
  Utensils,
  User,
  Truck,
  Building2,
  CheckCircle2,
  Ban,
  ShieldCheck,
} from 'lucide-react';

export default function DonationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [donation, setDonation] = useState<Donation | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  const fetchDetail = async () => {
    try {
      const res = await executeGraphQL<{ donation: Donation }>(GET_DONATION_DETAIL_QUERY, { id });
      if (res?.donation) {
        setDonation(res.donation);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const handleAcceptRequest = async (requestId: string) => {
    setAccepting(true);
    try {
      await executeGraphQL(ACCEPT_REQUEST_MUTATION, { requestId });
      await fetchDetail();
    } catch (err: any) {
      alert(err?.message || 'Failed to accept request');
    } finally {
      setAccepting(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this donation?')) return;
    try {
      await executeGraphQL(CANCEL_DONATION_MUTATION, { id });
      fetchDetail();
    } catch (err: any) {
      alert(err?.message || 'Cancellation failed');
    }
  };

  if (loading || !donation) {
    return (
      <RoleGuard allowedRoles={['DONOR']}>
        <div className="portal-layout">
          <Sidebar role="DONOR" />
          <div className="portal-main">
            <PortalHeader title="Donation Details" />
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading food journey details...
            </div>
          </div>
        </div>
      </RoleGuard>
    );
  }

  const activeTask = donation.pickupTasks && donation.pickupTasks.length > 0 ? donation.pickupTasks[0] : null;
  const activeReq = donation.requests && donation.requests.length > 0 ? donation.requests[0] : null;
  const canCancel = ['AVAILABLE', 'REQUESTED'].includes(donation.status);

  return (
    <RoleGuard allowedRoles={['DONOR']}>
      <div className="portal-layout">
        <Sidebar role="DONOR" />

        <div className="portal-main">
          <PortalHeader
            title="Food Journey Tracking"
            subtitle={`Tracking lifecycle for: ${donation.foodName}`}
            action={
              <Link href="/donor/donations" className="btn btn-outline btn-sm">
                <ArrowLeft size={16} />
                <span>All Donations</span>
              </Link>
            }
          />

          <main className="portal-content">
            {/* Top Stepper Card */}
            <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Donation ID: {donation.id}</span>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                    {donation.foodName}
                  </h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <StatusBadge status={donation.status} size="md" />
                  {canCancel && (
                    <button onClick={handleCancel} className="btn btn-danger btn-sm">
                      <Ban size={14} />
                      <span>Cancel Donation</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Lifecycle Visual Stepper */}
              <LifecycleStepper
                status={donation.status}
                pickedUpAt={activeTask?.pickedUpAt}
                deliveredAt={activeTask?.deliveredAt}
                confirmedAt={activeTask?.delivery?.confirmedAt}
              />
            </div>

            {/* Details Grid */}
            <div className="grid-2">
              {/* Food & Pickup Logistics */}
              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Utensils size={18} color="var(--primary)" />
                  <span>Food & Pickup Specifications</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.875rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      Category & Amount
                    </span>
                    <strong style={{ color: 'var(--text-main)' }}>
                      {donation.quantity} {donation.unit} ({donation.category.replace(/_/g, ' ')})
                    </strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      Description
                    </span>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '0.2rem' }}>
                      {donation.description}
                    </p>
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      Pickup Address & Landmark
                    </span>
                    <p style={{ color: 'var(--text-main)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                      <MapPin size={16} color="#059669" />
                      {donation.pickupLocation}
                    </p>
                  </div>

                  <div className="grid-2" style={{ marginTop: '0.5rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                        Pickup Available Window
                      </span>
                      <strong style={{ color: '#059669' }}>{donation.pickupAvailableTime}</strong>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                        Consumption Deadline
                      </span>
                      <strong style={{ color: '#d97706' }}>
                        {new Date(donation.expiryDeadline).toLocaleString()}
                      </strong>
                    </div>
                  </div>

                  {donation.storageNotes && (
                    <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        Storage Instructions:
                      </span>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                        {donation.storageNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Journey Stakeholders: Volunteer & Receiver */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Receiver Info Card */}
                <div className="card">
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Building2 size={18} color="#2563eb" />
                    <span>Recipient Community Kitchen</span>
                  </h3>

                  {activeReq ? (
                    <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Recipient Organization</span>
                          <strong style={{ color: 'var(--text-main)' }}>
                            {activeReq.receiver?.organization || activeReq.receiver?.name}
                          </strong>
                        </div>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            background: activeReq.status === 'APPROVED' ? '#dcfce7' : activeReq.status === 'PENDING' ? '#fef3c7' : '#f1f5f9',
                            color: activeReq.status === 'APPROVED' ? '#15803d' : activeReq.status === 'PENDING' ? '#b45309' : '#475569',
                          }}
                        >
                          Request: {activeReq.status}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Delivery Drop-Off Location</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{activeReq.deliveryAddress}</span>
                      </div>
                      {activeReq.notes && (
                        <div style={{ padding: '0.6rem', background: '#eff6ff', borderRadius: '6px', color: '#1e40af', fontSize: '0.8125rem' }}>
                          &ldquo;{activeReq.notes}&rdquo;
                        </div>
                      )}

                      {/* Donor Acceptance Section */}
                      {activeReq.status === 'PENDING' && (
                        <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
                          <p style={{ fontSize: '0.8125rem', color: '#92400e', marginBottom: '0.5rem', fontWeight: 600 }}>
                            🔔 This shelter has requested your surplus food. Accept to authorize volunteer pickup!
                          </p>
                          <button
                            onClick={() => handleAcceptRequest(activeReq.id)}
                            disabled={accepting}
                            className="btn btn-primary btn-sm"
                            style={{ background: '#059669', borderColor: '#059669', width: '100%', justifyContent: 'center' }}
                          >
                            <CheckCircle2 size={15} />
                            <span>{accepting ? 'Accepting Request...' : '✓ Accept Request'}</span>
                          </button>
                        </div>
                      )}

                      {activeReq.status === 'APPROVED' && (
                        <div style={{ marginTop: '0.4rem', padding: '0.5rem 0.75rem', background: '#ecfdf5', borderRadius: '6px', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: '#065f46', fontWeight: 600 }}>
                          <CheckCircle2 size={16} color="#059669" />
                          <span>Request Accepted. Ready for courier pickup assignment!</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      Waiting for a local shelter or food pantry to request this donation.
                    </p>
                  )}
                </div>

                {/* Volunteer Courier Card */}
                <div className="card">
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Truck size={18} color="#d97706" />
                    <span>Assigned Volunteer Courier</span>
                  </h3>

                  {activeTask ? (
                    <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Courier Name</span>
                          <strong style={{ color: 'var(--text-main)' }}>{activeTask.volunteer?.name}</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Vehicle</span>
                          <span style={{ color: 'var(--text-secondary)' }}>{activeTask.volunteer?.vehicleType || 'Car'}</span>
                        </div>
                      </div>

                      {activeTask.pickedUpAt && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontSize: '0.8125rem', fontWeight: 600 }}>
                          <CheckCircle2 size={16} />
                          <span>Food collected from your location: {new Date(activeTask.pickedUpAt).toLocaleTimeString()}</span>
                        </div>
                      )}

                      {activeTask.deliveredAt && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', fontSize: '0.8125rem', fontWeight: 600 }}>
                          <CheckCircle2 size={16} />
                          <span>Delivered to shelter: {new Date(activeTask.deliveredAt).toLocaleTimeString()}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      No volunteer courier assigned yet. Once requested, a driver will claim the task.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
