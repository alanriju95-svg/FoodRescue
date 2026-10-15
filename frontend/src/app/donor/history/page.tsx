'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import RoleGuard from '../../../components/RoleGuard';
import Sidebar from '../../../components/Sidebar';
import PortalHeader from '../../../components/PortalHeader';
import StatusBadge from '../../../components/StatusBadge';
import { executeGraphQL } from '../../../lib/graphql-client';
import { GET_MY_DONATIONS_QUERY } from '../../../lib/graphql-queries';
import { Donation } from '../../../types/index';
import { Award, Leaf, CheckCircle2, History, Utensils, ArrowRight } from 'lucide-react';

export default function DonorHistoryPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await executeGraphQL<{ myDonations: Donation[] }>(GET_MY_DONATIONS_QUERY);
        if (res?.myDonations) {
          setDonations(res.myDonations.filter((d) => ['COMPLETED', 'DELIVERED', 'CANCELLED'].includes(d.status)));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const completed = donations.filter((d) => d.status === 'COMPLETED');
  const totalMeals = completed.reduce((acc, curr) => acc + (curr.quantity || 0), 0);

  return (
    <RoleGuard allowedRoles={['DONOR']}>
      <div className="portal-layout">
        <Sidebar role="DONOR" />

        <div className="portal-main">
          <PortalHeader
            title="Donation History & Impact Log"
            subtitle="Verified record of delivered meals and environmental contribution"
          />

          <main className="portal-content">
            {/* Impact Metric Cards */}
            <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
              <div className="card" style={{ borderLeft: '4px solid #059669' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Award size={32} color="#059669" />
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Meals Provided
                    </span>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)' }}>
                      {totalMeals} Portions
                    </h3>
                  </div>
                </div>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Leaf size={32} color="#10b981" />
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      CO₂ Diverted
                    </span>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)' }}>
                      ~{Math.round(totalMeals * 1.8)} kg
                    </h3>
                  </div>
                </div>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #3b82f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={32} color="#2563eb" />
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Completed Rescues
                    </span>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)' }}>
                      {completed.length} Missions
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Historical Log */}
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <History size={20} color="var(--primary)" />
                <span>Completed & Archived Handoffs</span>
              </h3>

              {donations.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                  No historical records yet. As your active donations complete, they will be archived here.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {donations.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem 1.25rem',
                        background: 'var(--bg-subtle)',
                        borderRadius: 'var(--radius-md)',
                        flexWrap: 'wrap',
                        gap: '1rem',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <StatusBadge status={item.status} size="sm" />
                          <span className="category-pill">{item.category.replace(/_/g, ' ')}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {item.foodName}
                        </h4>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                          {item.quantity} {item.unit} • Delivered to{' '}
                          <strong>{item.currentRequest?.receiver?.organization || 'Community Shelter'}</strong>
                        </span>
                      </div>

                      <Link href={`/donor/donations/${item.id}`} className="btn btn-outline btn-sm">
                        View Log <ArrowRight size={14} />
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
