'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import RoleGuard from '../../../components/RoleGuard';
import Sidebar from '../../../components/Sidebar';
import PortalHeader from '../../../components/PortalHeader';
import StatusBadge from '../../../components/StatusBadge';
import { executeGraphQL } from '../../../lib/graphql-client';
import { GET_MY_REQUESTS_QUERY, CONFIRM_RECEIPT_MUTATION } from '../../../lib/graphql-queries';
import { DonationRequest } from '../../../types/index';
import { Clock, MapPin, ArrowRight, Truck, UtensilsCrossed, CheckCircle2 } from 'lucide-react';

export default function ReceiverRequestsPage() {
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const loadRequests = async () => {
    try {
      const res = await executeGraphQL<{ myRequests: DonationRequest[] }>(GET_MY_REQUESTS_QUERY);
      if (res?.myRequests) {
        setRequests(res.myRequests);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleConfirmReceipt = async (donationId: string) => {
    setConfirmingId(donationId);
    try {
      await executeGraphQL(CONFIRM_RECEIPT_MUTATION, {
        donationId,
        notes: 'Verified received in good condition.',
      });
      await loadRequests();
    } catch (err: any) {
      alert(err?.message || 'Confirmation failed');
    } finally {
      setConfirmingId(null);
    }
  };

  return (
    <RoleGuard allowedRoles={['RECEIVER']}>
      <div className="portal-layout">
        <Sidebar role="RECEIVER" />

        <div className="portal-main">
          <PortalHeader
            title="My Food Requests"
            subtitle="Track live status and confirm food arrival at your shelter or kitchen"
            action={
              <Link href="/receiver/food" className="btn btn-primary btn-sm" style={{ background: '#2563eb' }}>
                <UtensilsCrossed size={16} />
                <span>+ Request More Food</span>
              </Link>
            }
          />

          <main className="portal-content">
            {requests.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3.5rem' }}>
                <Clock size={40} color="var(--text-light)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>No Requests Placed Yet</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem', marginBottom: '1.25rem' }}>
                  Browse our surplus food marketplace to find and request meals for your organization.
                </p>
                <Link href="/receiver/food" className="btn btn-primary btn-sm" style={{ background: '#2563eb' }}>
                  Browse Available Food
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1.5rem',
                      padding: '1.5rem',
                    }}
                  >
                    <div style={{ flex: '1 1 320px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                        <StatusBadge status={req.donation?.status || 'REQUESTED'} size="sm" />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Requested on {new Date(req.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        {req.donation?.foodName}
                      </h3>

                      <div style={{ marginTop: '0.5rem', fontSize: '0.8125rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          Donor: <strong>{req.donation?.donor?.organization || req.donation?.donor?.name}</strong>
                        </span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          Delivery Dropoff: <strong>{req.deliveryAddress}</strong>
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'block', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          Quantity
                        </span>
                        <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>
                          {req.donation?.quantity} {req.donation?.unit}
                        </strong>
                      </div>

                      {req.donation?.status === 'DELIVERED' && (
                        <button
                          onClick={() => handleConfirmReceipt(req.donation!.id)}
                          disabled={confirmingId === req.donation?.id}
                          className="btn"
                          style={{
                            background: '#16a34a',
                            color: '#ffffff',
                            fontWeight: 700,
                            padding: '0.55rem 1.1rem',
                            fontSize: '0.875rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                          }}
                        >
                          <CheckCircle2 size={16} />
                          <span>{confirmingId === req.donation?.id ? 'Confirming...' : '✓ Confirm Received'}</span>
                        </button>
                      )}

                      <Link
                        href={`/receiver/requests/${req.id}`}
                        className="btn btn-primary"
                        style={{ background: '#2563eb', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <span>Track & Confirm</span>
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
