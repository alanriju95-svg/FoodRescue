'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/auth-context';
import { ExternalLink, Bell, User as UserIcon } from 'lucide-react';

interface PortalHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function PortalHeader({ title, subtitle, action }: PortalHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="portal-header">
      <div>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {action}

        <Link
          href="/"
          className="btn btn-outline btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          title="View public website"
        >
          <ExternalLink size={14} />
          <span>Public Site</span>
        </Link>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.75rem',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UserIcon size={14} color="var(--primary)" />
          </div>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)' }}>
            {user?.name || 'User'}
          </span>
        </div>
      </div>
    </header>
  );
}
