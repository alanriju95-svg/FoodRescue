'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../lib/auth-context';
import { UserRole } from '../../types/index';
import { HeartHandshake, Check, ShieldCheck } from 'lucide-react';

export default function SignupPage() {
  const { register, isLoading } = useAuth();
  const [role, setRole] = useState<UserRole>('DONOR');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [address, setAddress] = useState('');
  const [vehicleType, setVehicleType] = useState('Car');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register({
        role,
        name,
        email,
        password,
        phone,
        organization: role !== 'VOLUNTEER' ? organization : undefined,
        address: role !== 'VOLUNTEER' ? address : undefined,
        vehicleType: role === 'VOLUNTEER' ? vehicleType : undefined,
      });
    } catch (err: any) {
      setError(err?.message || 'Failed to create account. Please check your information.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <Navbar />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '560px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                marginBottom: '1rem',
              }}
            >
              <HeartHandshake size={28} />
            </div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Join the FoodRescue Network
            </h1>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Choose your role to get started with tailored tools.
            </p>
          </div>

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
                  marginBottom: '1.25rem',
                }}
              >
                {error}
              </div>
            )}

            {/* Role Selector Tabs */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
                Select Your Role
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setRole('DONOR')}
                  style={{
                    padding: '0.75rem 0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: `2px solid ${role === 'DONOR' ? '#059669' : 'var(--border)'}`,
                    background: role === 'DONOR' ? '#ecfdf5' : '#ffffff',
                    color: role === 'DONOR' ? '#065f46' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🍱</div>
                  Food Donor
                </button>

                <button
                  type="button"
                  onClick={() => setRole('VOLUNTEER')}
                  style={{
                    padding: '0.75rem 0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: `2px solid ${role === 'VOLUNTEER' ? '#d97706' : 'var(--border)'}`,
                    background: role === 'VOLUNTEER' ? '#fffbeb' : '#ffffff',
                    color: role === 'VOLUNTEER' ? '#92400e' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🛵</div>
                  Volunteer
                </button>

                <button
                  type="button"
                  onClick={() => setRole('RECEIVER')}
                  style={{
                    padding: '0.75rem 0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: `2px solid ${role === 'RECEIVER' ? '#2563eb' : 'var(--border)'}`,
                    background: role === 'RECEIVER' ? '#eff6ff' : '#ffffff',
                    color: role === 'RECEIVER' ? '#1e40af' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🍽️</div>
                  Food Receiver
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password (min 6 characters) *
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
              </div>

              {/* Role-Specific Fields */}
              {role !== 'VOLUNTEER' && (
                <div className="form-group">
                  <label className="form-label" htmlFor="organization">
                    {role === 'DONOR' ? 'Restaurant / Business Name' : 'Organization / Shelter Name'}
                  </label>
                  <input
                    id="organization"
                    type="text"
                    placeholder={role === 'DONOR' ? 'Green Leaf Bistro' : 'Hope Community Shelter'}
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="input"
                  />
                </div>
              )}

              {role !== 'VOLUNTEER' && (
                <div className="form-group">
                  <label className="form-label" htmlFor="address">
                    {role === 'DONOR' ? 'Default Pickup Location' : 'Delivery Address'}
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Street address, building, floor"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input"
                  />
                </div>
              )}

              {role === 'VOLUNTEER' && (
                <div className="form-group">
                  <label className="form-label" htmlFor="vehicleType">
                    Vehicle Type for Rescue Deliveries
                  </label>
                  <select
                    id="vehicleType"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="select"
                  >
                    <option value="Car">Car (Trunk & Seats)</option>
                    <option value="Bicycle">Bicycle with Cargo Rack</option>
                    <option value="Scooter / Motorcycle">Scooter / Motorcycle</option>
                    <option value="Van / SUV">Van / SUV (Large Loads)</option>
                    <option value="On Foot">On Foot (Walkable Nearby Deliveries)</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1rem', padding: '0.8rem' }}
              >
                {isLoading ? 'Creating Account...' : 'Complete Registration'}
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Already registered?{' '}
                <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
