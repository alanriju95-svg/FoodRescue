'use client';

import React, { useState } from 'react';
import RoleGuard from '../../../components/RoleGuard';
import Sidebar from '../../../components/Sidebar';
import PortalHeader from '../../../components/PortalHeader';
import { useAuth } from '../../../lib/auth-context';
import { executeGraphQL } from '../../../lib/graphql-client';
import { UPDATE_PROFILE_MUTATION } from '../../../lib/graphql-queries';
import { CheckCircle2, Truck } from 'lucide-react';

export default function VolunteerProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 456-7890');
  const [city, setCity] = useState(user?.city || 'Metro City');
  const [vehicleType, setVehicleType] = useState(user?.vehicleType || 'Car (Honda Civic with thermal cooler bags)');
  const [bio, setBio] = useState(user?.bio || 'Community courier passionate about getting surplus food to people in need.');

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      await executeGraphQL(UPDATE_PROFILE_MUTATION, {
        input: { name, phone, city, vehicleType, bio },
      });
      setSaved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <RoleGuard allowedRoles={['VOLUNTEER']}>
      <div className="portal-layout">
        <Sidebar role="VOLUNTEER" />

        <div className="portal-main">
          <PortalHeader
            title="Volunteer Courier Profile"
            subtitle="Vehicle specifications, contact details, and courier readiness"
          />

          <main className="portal-content">
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <div className="card">
                {saved && (
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      color: '#065f46',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <CheckCircle2 size={16} />
                    Volunteer settings updated successfully!
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">
                        Mobile Phone (for donor & shelter dispatch)
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="vehicleType">
                      Vehicle Type & Transport Equipment
                    </label>
                    <input
                      id="vehicleType"
                      type="text"
                      placeholder="e.g. Car with 2 thermal bags, cargo bike, SUV"
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="city">
                      Preferred Dispatch Zone / City
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="bio">
                      Courier Bio & Experience
                    </label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="textarea"
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                    <button type="submit" disabled={saving} className="btn btn-secondary">
                      {saving ? 'Saving...' : 'Save Profile Changes'}
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
