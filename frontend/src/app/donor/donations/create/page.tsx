'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RoleGuard from '../../../../components/RoleGuard';
import Sidebar from '../../../../components/Sidebar';
import PortalHeader from '../../../../components/PortalHeader';
import { executeGraphQL } from '../../../../lib/graphql-client';
import { CREATE_DONATION_MUTATION } from '../../../../lib/graphql-queries';
import { FoodCategory } from '../../../../types/index';
import { Utensils, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function CreateDonationPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<FoodCategory>('COOKED_MEALS');
  const [quantity, setQuantity] = useState('25');
  const [unit, setUnit] = useState('portions');
  const [pickupLocation, setPickupLocation] = useState('742 Evergreen Terrace, Kitchen Loading Dock');
  const [pickupAvailableTime, setPickupAvailableTime] = useState('2:00 PM - 5:00 PM Today');

  // Dates
  const now = new Date();
  const defaultPickupDeadline = new Date(now.getTime() + 6 * 3600 * 1000).toISOString().slice(0, 16);
  const defaultExpiryDeadline = new Date(now.getTime() + 24 * 3600 * 1000).toISOString().slice(0, 16);

  const [pickupDeadline, setPickupDeadline] = useState(defaultPickupDeadline);
  const [expiryDeadline, setExpiryDeadline] = useState(defaultExpiryDeadline);
  const [storageNotes, setStorageNotes] = useState('Keep chilled under 4°C. Hygienically handled.');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const input = {
        foodName,
        description,
        category,
        quantity: parseFloat(quantity) || 1,
        unit,
        pickupLocation,
        pickupAvailableTime,
        pickupDeadline: new Date(pickupDeadline).toISOString(),
        expiryDeadline: new Date(expiryDeadline).toISOString(),
        storageNotes,
      };

      const res = await executeGraphQL(CREATE_DONATION_MUTATION, { input });
      if (res?.createDonation) {
        router.push('/donor/donations');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to publish donation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RoleGuard allowedRoles={['DONOR']}>
      <div className="portal-layout">
        <Sidebar role="DONOR" />

        <div className="portal-main">
          <PortalHeader
            title="Create Surplus Food Donation"
            subtitle="List excess food for immediate volunteer pickup and redistribution"
            action={
              <Link href="/donor/donations" className="btn btn-outline btn-sm">
                <ArrowLeft size={16} />
                <span>Back to Donations</span>
              </Link>
            }
          />

          <main className="portal-content">
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
              <div className="card">
                {error && (
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#dc2626',
                      fontSize: '0.875rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Section 1: Food Details */}
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Utensils size={18} color="var(--primary)" />
                    <span>Food Information</span>
                  </h3>

                  <div className="form-group">
                    <label className="form-label" htmlFor="foodName">
                      Food Item Name *
                    </label>
                    <input
                      id="foodName"
                      type="text"
                      required
                      placeholder="e.g. 40 Hot Trays of Roasted Chicken & Herb Rice"
                      value={foodName}
                      onChange={(e) => setFoodName(e.target.value)}
                      className="input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="description">
                      Description & Preparation Details *
                    </label>
                    <textarea
                      id="description"
                      required
                      placeholder="Detail ingredients, cooking time, whether untouched buffet surplus, and how packaged..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="textarea"
                    />
                  </div>

                  <div className="grid-3">
                    <div className="form-group">
                      <label className="form-label" htmlFor="category">
                        Food Category *
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as FoodCategory)}
                        className="select"
                      >
                        <option value="COOKED_MEALS">Cooked Meals & Trays</option>
                        <option value="BAKERY">Bakery & Breads</option>
                        <option value="PRODUCE">Fresh Produce & Greens</option>
                        <option value="DAIRY_EGGS">Dairy & Eggs</option>
                        <option value="PACKAGED">Packaged & Canned</option>
                        <option value="BEVERAGES">Beverages & Juices</option>
                        <option value="OTHER">Other Perishables</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="quantity">
                        Quantity *
                      </label>
                      <input
                        id="quantity"
                        type="number"
                        step="0.5"
                        min="0.5"
                        required
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="unit">
                        Unit *
                      </label>
                      <input
                        id="unit"
                        type="text"
                        required
                        placeholder="meals, kg, boxes, portions"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.75rem 0' }} />

                  {/* Section 2: Logistics & Deadlines */}
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
                    Pickup Logistics & Expiry Deadlines
                  </h3>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="pickupLocation">
                        Pickup Location Address *
                      </label>
                      <input
                        id="pickupLocation"
                        type="text"
                        required
                        placeholder="Street, suite, building, specific door..."
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="pickupAvailableTime">
                        Pickup Window Slot *
                      </label>
                      <input
                        id="pickupAvailableTime"
                        type="text"
                        required
                        placeholder="e.g. 2:00 PM - 5:00 PM Today"
                        value={pickupAvailableTime}
                        onChange={(e) => setPickupAvailableTime(e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="pickupDeadline">
                        Pickup Cutoff Deadline *
                      </label>
                      <input
                        id="pickupDeadline"
                        type="datetime-local"
                        required
                        value={pickupDeadline}
                        onChange={(e) => setPickupDeadline(e.target.value)}
                        className="input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="expiryDeadline">
                        Consumption / Expiry Deadline *
                      </label>
                      <input
                        id="expiryDeadline"
                        type="datetime-local"
                        required
                        value={expiryDeadline}
                        onChange={(e) => setExpiryDeadline(e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="storageNotes">
                      Storage & Handling Instructions
                    </label>
                    <input
                      id="storageNotes"
                      type="text"
                      placeholder="e.g. Keep refrigerated below 4°C, contains dairy, fragile containers"
                      value={storageNotes}
                      onChange={(e) => setStorageNotes(e.target.value)}
                      className="input"
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                    <Link href="/donor/donations" className="btn btn-outline">
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary"
                      style={{ padding: '0.75rem 2rem' }}
                    >
                      {submitting ? 'Publishing...' : '✓ Publish Food Donation'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
