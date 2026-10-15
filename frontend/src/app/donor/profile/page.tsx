'use client';

import React, { useState } from 'react';
import RoleGuard from '../../../components/RoleGuard';
import Sidebar from '../../../components/Sidebar';
import PortalHeader from '../../../components/PortalHeader';
import { useAuth } from '../../../lib/auth-context';
import { executeGraphQL } from '../../../lib/graphql-client';
import { UPDATE_PROFILE_MUTATION } from '../../../lib/graphql-queries';
import { User, CheckCircle2 } from 'lucide-react';

export default function DonorProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Elena Rostova');
  const [organization, setOrganization] = useState(user?.organization || 'Green Leaf Bistro');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [address, setAddress] = useState(user?.address || '742 Evergreen Terrace, Downtown');
  const [city, setCity] = useState(user?.city || 'Metro City');
  const [bio, setBio] = useState(user?.bio || 'Farm-to-table organic restaurant dedicated to zero food waste.');

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      await executeGraphQL(UPDATE_PROFILE_MUTATION, {
        input: { name, organization, phone, address, city, bio },
      });
      setSaved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <RoleGuard allowedRoles={['DONOR']}>
      <div className="portal-layout">
        <Sidebar role="DONOR" />

        <div className="portal-main">
          <PortalHeader
            title="Donor Profile & Kitchen Settings"
            subtitle="Manage your business contact info and default pickup address"
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
                    Profile settings updated successfully!
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">
                        Primary Contact Name
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
                      <label className="form-label" htmlFor="organization">
                        Business / Restaurant Name
                      </label>
                      <input
                        id="organization"
                        type="text"
                        required
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">
                        Contact Phone (for Volunteer Drivers)
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="city">
                        City / Service Area
                      </label>
                      <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="address">
                      Default Kitchen / Pickup Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="bio">
                      About Your Kitchen / Sustainability Pledge
                    </label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="textarea"
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                    <button type="submit" disabled={saving} className="btn btn-primary">
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
