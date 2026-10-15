'use client';

import React, { useState } from 'react';
import RoleGuard from '../../../components/RoleGuard';
import Sidebar from '../../../components/Sidebar';
import PortalHeader from '../../../components/PortalHeader';
import { useAuth } from '../../../lib/auth-context';
import { executeGraphQL } from '../../../lib/graphql-client';
import { UPDATE_PROFILE_MUTATION } from '../../../lib/graphql-queries';
import { CheckCircle2 } from 'lucide-react';

export default function ReceiverProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Sarah Jenkins');
  const [organization, setOrganization] = useState(user?.organization || 'Hope Community Shelter & Kitchen');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 567-8901');
  const [address, setAddress] = useState(user?.address || '450 Compassion Blvd, North District');
  const [city, setCity] = useState(user?.city || 'Metro City');
  const [bio, setBio] = useState(user?.bio || 'Serving 200+ warm meals daily to vulnerable families and individuals.');

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
    <RoleGuard allowedRoles={['RECEIVER']}>
      <div className="portal-layout">
        <Sidebar role="RECEIVER" />

        <div className="portal-main">
          <PortalHeader
            title="Receiver Organization Profile"
            subtitle="Manage your shelter intake contact and default delivery drop-off location"
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
                    Organization settings updated successfully!
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">
                        Intake Coordinator / Contact Person
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
                        Shelter / Non-Profit / Kitchen Name
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
                        Intake Mobile Phone (for volunteer couriers)
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
                        City / Neighborhood
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
                      Primary Delivery Drop-Off Address & Loading Dock Instructions
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
                      Mission & Community Served
                    </label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="textarea"
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                    <button type="submit" disabled={saving} className="btn btn-primary" style={{ background: '#2563eb' }}>
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
