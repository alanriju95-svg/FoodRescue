'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../lib/auth-context';
import { HeartHandshake, LogIn, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { UserRole } from '../../types/index';

export default function LoginPage() {
  const { login, demoLogin, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleDemoClick = async (role: UserRole) => {
    setError(null);
    await demoLogin(role);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <Navbar />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          {/* Header Card */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                marginBottom: '1rem',
              }}
            >
              <HeartHandshake size={32} />
            </div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Welcome to FoodRescue
            </h1>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Sign in to manage donations, coordinate pickups, or request food.
            </p>
          </div>

          {/* Quick 1-Click Demo Login Box */}
          <div
            className="card"
            style={{
              marginBottom: '1.5rem',
              border: '1px solid #a7f3d0',
              background: '#ecfdf5',
              padding: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Sparkles size={18} color="#059669" />
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#065f46' }}>
                Instant 1-Click Demo Login
              </span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#047857', marginBottom: '0.875rem', lineHeight: 1.4 }}>
              Click any role below to test the platform instantly with pre-loaded data:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleDemoClick('DONOR')}
                className="btn btn-sm"
                style={{ background: '#059669', color: '#ffffff', fontWeight: 700, fontSize: '0.75rem' }}
              >
                🍱 Donor
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick('VOLUNTEER')}
                className="btn btn-sm"
                style={{ background: '#d97706', color: '#ffffff', fontWeight: 700, fontSize: '0.75rem' }}
              >
                🛵 Volunteer
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick('RECEIVER')}
                className="btn btn-sm"
                style={{ background: '#2563eb', color: '#ffffff', fontWeight: 700, fontSize: '0.75rem' }}
              >
                🍽️ Receiver
              </button>
            </div>
          </div>

          {/* Main Login Card */}
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

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Don&apos;t have an account yet?{' '}
                <Link href="/signup" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                  Create an account
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
