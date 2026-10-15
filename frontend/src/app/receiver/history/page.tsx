'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import RoleGuard from '../../../components/RoleGuard';
import Sidebar from '../../../components/Sidebar';
import PortalHeader from '../../../components/PortalHeader';
import StatusBadge from '../../../components/StatusBadge';
import { executeGraphQL } from '../../../lib/graphql-client';
import { GET_MY_REQUESTS_QUERY } from '../../../lib/graphql-queries';
import { DonationRequest } from '../../../types/index';
import { History, Utensils, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ReceiverHistoryPage() {
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await executeGraphQL<{ myRequests: DonationRequest[] }>(GET_MY_REQUESTS_QUERY);
        if (res?.myRequests) {
          setRequests(res.myRequests.filter((r) => r.donation?.status === 'COMPLETED'));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  const totalMeals = requests.reduce((acc, curr) => acc + (curr.donation?.quantity || 0), 0);

  return (
    <RoleGuard allowedRoles={['RECEIVER']}>
      <div className="portal-layout">
        <Sidebar role="RECEIVER" />

        <div className="portal-main">
          <PortalHeader
            title="Received Food History"
            subtitle="Verified record of surplus food allocations received and served"
          />

          <main className="portal-content">
            <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
              <div className="card" style={{ borderLeft: '4px solid #2563eb' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Utensils size={32} color="#2563eb" />
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Portions Received
                    </span>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)' }}>
                      {totalMeals} Meals
                    </h3>
                  </div>
                </div>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #059669' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={32} color="#059669" />
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Fulfilled Requests
                    </span>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)' }}>
                      {requests.length} Orders
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <History size={20} color="var(--primary)" />
                <span>Past Received Food Allocations</span>
              </h3>

              {requests.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2.5rem' }}>
                  No past completed requests yet. As deliveries arrive and you confirm receipt, they appear here.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {requests.map((req) => (
                    <div
                      key={req.id}
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
                          <StatusBadge status="COMPLETED" size="sm" />
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {new Date(req.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {req.donation?.foodName}
                        </h4>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                          Donated by <strong>{req.donation?.donor?.organization || 'Local Donor'}</strong>
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                            Quantity
                          </span>
                          <strong style={{ fontSize: '0.9375rem', color: 'var(--text-main)' }}>
                            {req.donation?.quantity} {req.donation?.unit}
                          </strong>
                        </div>

                        <Link href={`/receiver/requests/${req.id}`} className="btn btn-outline btn-sm">
                          Details <ArrowRight size={14} />
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
