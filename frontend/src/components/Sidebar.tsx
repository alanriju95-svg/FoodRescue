'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../lib/auth-context';
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  History,
  User,
  Truck,
  MapPin,
  UtensilsCrossed,
  Clock,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { UserRole } from '../types/index';

interface SidebarProps {
  role: UserRole;
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout, demoLogin } = useAuth();

  const donorLinks = [
    { label: 'Dashboard', href: '/donor/dashboard', icon: LayoutDashboard },
    { label: 'Create Donation', href: '/donor/donations/create', icon: PlusCircle },
    { label: 'My Food Donations', href: '/donor/donations', icon: Package },
    { label: 'Donation History', href: '/donor/history', icon: History },
    { label: 'Donor Profile', href: '/donor/profile', icon: User },
  ];

  const volunteerLinks = [
    { label: 'Dashboard', href: '/volunteer/dashboard', icon: LayoutDashboard },
    { label: 'Available Pickups', href: '/volunteer/donations', icon: MapPin },
    { label: 'My Pickup Tasks', href: '/volunteer/tasks', icon: Truck },
    { label: 'Mission History', href: '/volunteer/history', icon: History },
    { label: 'Volunteer Profile', href: '/volunteer/profile', icon: User },
  ];

  const receiverLinks = [
    { label: 'Dashboard', href: '/receiver/dashboard', icon: LayoutDashboard },
    { label: 'Available Surplus Food', href: '/receiver/food', icon: UtensilsCrossed },
    { label: 'My Food Requests', href: '/receiver/requests', icon: Clock },
    { label: 'Received History', href: '/receiver/history', icon: History },
    { label: 'Receiver Profile', href: '/receiver/profile', icon: User },
  ];

  const links = role === 'DONOR' ? donorLinks : role === 'VOLUNTEER' ? volunteerLinks : receiverLinks;

  const getRoleHeader = () => {
    if (role === 'DONOR') return { title: 'Donor Portal', subtitle: 'Surplus Management', badge: '🍱 Donor' };
    if (role === 'VOLUNTEER') return { title: 'Volunteer Portal', subtitle: 'Food Transport', badge: '🛵 Volunteer' };
    return { title: 'Receiver Portal', subtitle: 'Food Assistance', badge: '🍽️ Receiver' };
  };

  const headerInfo = getRoleHeader();

  return (
    <aside className="portal-sidebar">
      {/* Portal Branding */}
      <div style={{ paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.25rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '0.875rem',
          }}>
            FR
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>FoodRescue</div>
            <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>{headerInfo.subtitle}</div>
          </div>
        </Link>

        <div style={{ marginTop: '0.875rem' }}>
          <span style={{
            display: 'inline-block',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            background: 'rgba(16, 185, 129, 0.2)',
            color: '#34d399',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}>
            {headerInfo.badge}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#ffffff' : '#94a3b8',
                background: isActive ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                borderLeft: isActive ? '3px solid #10b981' : '3px solid transparent',
                transition: 'var(--transition)',
              }}
            >
              <Icon size={18} color={isActive ? '#34d399' : '#94a3b8'} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Demo Role Switcher Quick Actions */}
      <div style={{
        marginTop: 'auto',
        padding: '0.75rem',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#fbbf24', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          <Sparkles size={14} />
          <span>Switch Demo Persona</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.25rem' }}>
          <button
            onClick={() => demoLogin('DONOR')}
            style={{
              fontSize: '0.6875rem',
              padding: '0.35rem 0.25rem',
              background: role === 'DONOR' ? '#059669' : 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              borderRadius: '4px',
              fontWeight: 600,
            }}
          >
            Donor
          </button>
          <button
            onClick={() => demoLogin('VOLUNTEER')}
            style={{
              fontSize: '0.6875rem',
              padding: '0.35rem 0.25rem',
              background: role === 'VOLUNTEER' ? '#059669' : 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              borderRadius: '4px',
              fontWeight: 600,
            }}
          >
            Volunteer
          </button>
          <button
            onClick={() => demoLogin('RECEIVER')}
            style={{
              fontSize: '0.6875rem',
              padding: '0.35rem 0.25rem',
              background: role === 'RECEIVER' ? '#059669' : 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              borderRadius: '4px',
              fontWeight: 600,
            }}
          >
            Receiver
          </button>
        </div>
      </div>

      {/* User Info & Logout */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.875rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#f8fafc', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {user?.name || 'User'}
          </div>
          <div style={{ fontSize: '0.6875rem', color: '#64748b', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {user?.organization || user?.email}
          </div>
        </div>
        <button
          onClick={logout}
          title="Sign out"
          style={{
            padding: '0.4rem',
            color: '#94a3b8',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
