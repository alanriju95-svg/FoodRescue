'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../lib/auth-context';
import { HeartHandshake, LogOut, User, LayoutDashboard, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'DONOR') return '/donor/dashboard';
    if (user.role === 'VOLUNTEER') return '/volunteer/dashboard';
    if (user.role === 'RECEIVER') return '/receiver/dashboard';
    return '/';
  };

  const getRoleLabel = () => {
    if (!user) return '';
    if (user.role === 'DONOR') return '🍱 Donor';
    if (user.role === 'VOLUNTEER') return '🛵 Volunteer';
    if (user.role === 'RECEIVER') return '🍽️ Receiver';
    return user.role;
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)',
            }}
          >
            <HeartHandshake size={24} />
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Food<span style={{ color: 'var(--primary)' }}>Rescue</span>
            </span>
            <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Surplus Redistribution
            </span>
          </div>
        </Link>

        {/* Public Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link
            href="/"
            style={{
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: pathname === '/' ? 'var(--primary)' : 'var(--text-secondary)',
              transition: 'var(--transition)',
            }}
          >
            Home
          </Link>
          <Link
            href="/how-it-works"
            style={{
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: pathname === '/how-it-works' ? 'var(--primary)' : 'var(--text-secondary)',
              transition: 'var(--transition)',
            }}
          >
            How It Works
          </Link>
          <Link
            href="/about"
            style={{
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: pathname === '/about' ? 'var(--primary)' : 'var(--text-secondary)',
              transition: 'var(--transition)',
            }}
          >
            About Us
          </Link>
        </nav>

        {/* Auth Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link
                href={getDashboardLink()}
                className="btn btn-primary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <LayoutDashboard size={16} />
                <span>Dashboard ({getRoleLabel()})</span>
                <ChevronRight size={14} />
              </Link>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.75rem',
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                }}
              >
                <User size={16} color="var(--primary)" />
                <span>{user.name.split(' ')[0]}</span>
              </div>
              <button
                onClick={logout}
                className="btn btn-outline btn-sm"
                title="Log out"
                style={{ padding: '0.4rem 0.6rem' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link href="/login" className="btn btn-outline btn-sm">
                Log In
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
