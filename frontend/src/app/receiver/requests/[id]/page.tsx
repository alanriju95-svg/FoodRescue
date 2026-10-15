'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import RoleGuard from '../../../../components/RoleGuard';
import Sidebar from '../../../../components/Sidebar';
import PortalHeader from '../../../../components/PortalHeader';
import StatusBadge from '../../../../components/StatusBadge';
import LifecycleStepper from '../../../../components/LifecycleStepper';
import { executeGraphQL } from '../../../../lib/graphql-client';
import { GET_REQUEST_DETAIL_QUERY, CONFIRM_RECEIPT_MUTATION } from '../../../../lib/graphql-queries';
import { DonationRequest } from '../../../../types/index';
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Clock,
  Truck,
  Building2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export default function ReceiverRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [request, setRequest] = useState<DonationRequest | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      const res = await executeGraphQL<{ donationRequest: DonationRequest }>(GET_REQUEST_DETAIL_QUERY, { id });
      if (res?.donationRequest) {
        setRequest(res.donationRequest);
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

  const handleConfirmReceipt = async () => {
    if (!request?.donation) return;
    setConfirming(true);
    try {
      await executeGraphQL(CONFIRM_RECEIPT_MUTATION, {
        donationId: request.donation.id,
        notes: 'Verified received in good condition.',
      });
      fetchDetail();
    } catch (err: any) {
      alert(err?.message || 'Confirmation failed');
    } finally {
      setConfirming(false);
    }
  };

  if (loading || !request) {
    return (
      <RoleGuard allowedRoles={['RECEIVER']}>
        <div className="portal-layout">
          <Sidebar role="RECEIVER" />
          <div className="portal-main">
            <PortalHeader title="Request Tracking" />
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading request tracking...
            </div>
          </div>
        </div>
      </RoleGuard>
    );
  }

  const donation = request.donation;
  const activeTask = donation?.pickupTasks && donation.pickupTasks.length > 0 ? donation.pickupTasks[0] : null;
  const isDelivered = donation?.status === 'DELIVERED';
  const isCompleted = donation?.status === 'COMPLETED';

  return (
    <RoleGuard allowedRoles={['RECEIVER']}>
      <div className="portal-layout">
        <Sidebar role="RECEIVER" />

        <div className="portal-main">
          <PortalHeader
            title="Food Arrival Tracker"
            subtitle={`Request #${request.id} • ${donation?.foodName}`}
            action={
              <Link href="/receiver/requests" className="btn btn-outline btn-sm">
                <ArrowLeft size={16} />
                <span>My Requests</span>
              </Link>
            }
          />

          <main className="portal-content">
            {/* Top Stepper Card */}
            <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    {donation && <StatusBadge status={donation.status} size="md" />}
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      Requested by: {request.receiver?.name}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.4rem' }}>
                    {donation?.foodName}
                  </h2>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Portions</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {donation?.quantity} {donation?.unit}
                  </div>
                </div>
              </div>

              {donation && (
                <LifecycleStepper
                  status={donation.status}
                  pickedUpAt={activeTask?.pickedUpAt}
                  deliveredAt={activeTask?.deliveredAt}
                  confirmedAt={activeTask?.delivery?.confirmedAt}
                />
              )}
            </div>

            {/* ACTION BANNER: Confirm Food Receipt */}
            {isDelivered && (
              <div
                className="card"
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  color: '#ffffff',
                  padding: '2rem',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  boxShadow: 'var(--shadow-glow)',
                }}
              >
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', background: 'rgba(255, 255, 255, 0.2)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    <Sparkles size={14} />
                    <span>Courier Arrival Confirmed</span>
                  </div>
                  <h3 style={{ fontSize: '1.375rem', fontWeight: 800 }}>
                    Your food donation has arrived at your facility!
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#ecfdf5', marginTop: '0.25rem' }}>
                    Please verify the food packages and click below to confirm receipt and mark this rescue completed.
                  </p>
                </div>

                <button
                  onClick={handleConfirmReceipt}
                  disabled={confirming}
                  className="btn"
                  style={{ background: '#ffffff', color: '#065f46', fontWeight: 800, padding: '0.85rem 1.75rem', fontSize: '1rem' }}
                >
                  {confirming ? 'Confirming...' : '✓ Confirm Food Received'}
                </button>
              </div>
            )}

            {isCompleted && (
              <div
                className="card"
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#166534',
                  padding: '1.5rem 2rem',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <CheckCircle2 size={32} color="#16a34a" />
                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 800 }}>Food Rescue Mission Completed!</h4>
                  <p style={{ fontSize: '0.875rem', color: '#15803d', marginTop: '0.15rem' }}>
                    Thank you for confirming receipt. {donation?.quantity} {donation?.unit} of wholesome food was rescued from waste and safely served.
                  </p>
                </div>
              </div>
            )}

            {/* Stakeholders & Logistics Details */}
            <div className="grid-2">
              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
                  Donor Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Donor Business</span>
                    <strong style={{ color: 'var(--text-main)' }}>
                      {donation?.donor?.organization || donation?.donor?.name}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Pickup Origin Address</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{donation?.pickupLocation}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Food Details</span>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{donation?.description}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
                  Volunteer Transport Courier
                </h3>
                {activeTask ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Driver Name</span>
                      <strong style={{ color: 'var(--text-main)' }}>{activeTask.volunteer?.name}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Vehicle</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{activeTask.volunteer?.vehicleType || 'Car'}</span>
                    </div>
                    {activeTask.delivery?.proofNotes && (
                      <div style={{ padding: '0.6rem', background: 'var(--bg-subtle)', borderRadius: '6px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Courier Delivery Proof:</span>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                          {activeTask.delivery.proofNotes}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Your request is in the dispatch queue. A volunteer driver will claim and deliver shortly.
                  </p>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
