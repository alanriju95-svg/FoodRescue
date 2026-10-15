'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RoleGuard from '../../../components/RoleGuard';
import Sidebar from '../../../components/Sidebar';
import PortalHeader from '../../../components/PortalHeader';
import StatusBadge from '../../../components/StatusBadge';
import { executeGraphQL } from '../../../lib/graphql-client';
import { GET_AVAILABLE_DONATIONS_QUERY, REQUEST_DONATION_MUTATION } from '../../../lib/graphql-queries';
import { Donation, FoodCategory } from '../../../types/index';
import { Search, Utensils, MapPin, Clock, X, Check } from 'lucide-react';

export default function ReceiverFoodCatalogPage() {
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  // Request Modal State
  const [modalItem, setModalItem] = useState<Donation | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState('450 Compassion Blvd, North District Kitchen');
  const [notes, setNotes] = useState('Needed for our evening community dinner service. Thank you!');
  const [submitting, setSubmitting] = useState(false);

  const loadFood = async () => {
    try {
      const res = await executeGraphQL<{ availableDonations: Donation[] }>(GET_AVAILABLE_DONATIONS_QUERY);
      if (res?.availableDonations) {
        setDonations(res.availableDonations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFood();
  }, []);

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalItem) return;
    setSubmitting(true);

    try {
      await executeGraphQL(REQUEST_DONATION_MUTATION, {
        input: {
          donationId: modalItem.id,
          deliveryAddress,
          notes,
        },
      });
      setModalItem(null);
      router.push('/receiver/requests');
    } catch (err: any) {
      alert(err?.message || 'Failed to request food');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = donations.filter((d) => {
    const matchCategory = selectedCategory === 'ALL' || d.category === selectedCategory;
    const matchSearch =
      d.foodName.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase()) ||
      d.pickupLocation.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <RoleGuard allowedRoles={['RECEIVER']}>
      <div className="portal-layout">
        <Sidebar role="RECEIVER" />

        <div className="portal-main">
          <PortalHeader
            title="Surplus Food Marketplace"
            subtitle="Browse available nutritious surplus food and request allocation for your kitchen"
          />

          <main className="portal-content">
            {/* Filter Bar */}
            <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="text"
                    placeholder="Search by food name, description, donor..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input"
                    style={{ paddingLeft: '36px' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {['ALL', 'COOKED_MEALS', 'BAKERY', 'PRODUCE', 'DAIRY_EGGS', 'PACKAGED', 'BEVERAGES'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: selectedCategory === cat ? 700 : 500,
                        background: selectedCategory === cat ? '#2563eb' : 'var(--bg-subtle)',
                        color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                      }}
                    >
                      {cat.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Food Grid */}
            {filtered.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3.5rem' }}>
                <p style={{ color: 'var(--text-muted)' }}>No food items matching your search criteria.</p>
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
                        <span style={{ color: 'var(--text-muted)' }}>Amount:</span>
                        <strong style={{ color: 'var(--text-main)' }}>{item.quantity} {item.unit}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Donor:</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.donor?.organization || item.donor?.name}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Pickup Slot:</span>
                        <span style={{ color: '#059669', fontWeight: 600 }}>{item.pickupAvailableTime}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setModalItem(item)}
                      className="btn btn-primary"
                      style={{ background: '#2563eb', width: '100%', fontWeight: 700 }}
                    >
                      Request This Food
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Request Modal */}
            {modalItem && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(15, 23, 42, 0.6)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 100,
                  padding: '1.5rem',
                }}
              >
                <div className="card" style={{ maxWidth: '520px', width: '100%', position: 'relative' }}>
                  <button
                    onClick={() => setModalItem(null)}
                    style={{ position: 'absolute', right: '1.25rem', top: '1.25rem', color: 'var(--text-muted)' }}
                  >
                    <X size={20} />
                  </button>

                  <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                    Request Food Allocation
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    {modalItem.foodName} ({modalItem.quantity} {modalItem.unit})
                  </p>

                  <form onSubmit={handleRequestSubmit}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="delAddress">
                        Delivery Drop-Off Address *
                      </label>
                      <input
                        id="delAddress"
                        type="text"
                        required
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="reqNotes">
                        Notes for Volunteer Courier (Access instructions, dietary notes)
                      </label>
                      <textarea
                        id="reqNotes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="textarea"
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                      <button type="button" onClick={() => setModalItem(null)} className="btn btn-outline">
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-primary"
                        style={{ background: '#2563eb' }}
                      >
                        {submitting ? 'Submitting...' : '✓ Submit Food Request'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
