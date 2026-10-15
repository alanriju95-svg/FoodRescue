import React from 'react';
import Link from 'next/link';
import { HeartHandshake, ShieldCheck, Leaf, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '4rem 0 2rem', marginTop: 'auto', borderTop: '1px solid #1e293b' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}>
                <HeartHandshake size={20} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                Food<span style={{ color: '#10b981' }}>Rescue</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#94a3b8', marginBottom: '1.25rem' }}>
              Rescue Food. Reduce Waste. Feed Hope. Connecting surplus food with volunteers and vulnerable communities.
            </p>
            <div style={{ display: 'flex', gap: '1rem', color: '#64748b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8125rem' }}>
                <Leaf size={16} color="#10b981" /> 100% Sustainable
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8125rem' }}>
                <ShieldCheck size={16} color="#38bdf8" /> Safe & Tracked
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Platform
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li><Link href="/" style={{ color: '#cbd5e1' }}>Home</Link></li>
              <li><Link href="/how-it-works" style={{ color: '#cbd5e1' }}>How It Works</Link></li>
              <li><Link href="/about" style={{ color: '#cbd5e1' }}>Our Mission</Link></li>
              <li><Link href="/login" style={{ color: '#cbd5e1' }}>Portal Login</Link></li>
              <li><Link href="/signup" style={{ color: '#cbd5e1' }}>Join as Donor / Volunteer</Link></li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              User Roles
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li><Link href="/donor/dashboard" style={{ color: '#cbd5e1' }}>🍱 Donor Dashboard</Link></li>
              <li><Link href="/volunteer/dashboard" style={{ color: '#cbd5e1' }}>🛵 Volunteer Logistics</Link></li>
              <li><Link href="/receiver/dashboard" style={{ color: '#cbd5e1' }}>🍽️ Receiver Community Food</Link></li>
            </ul>
          </div>

          {/* Impact Motto */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Community Impact
            </h4>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#94a3b8', marginBottom: '1rem' }}>
              Every meal rescued prevents greenhouse gas emissions and brings nourishment to someone in need.
            </p>
            <div style={{ background: '#1e293b', padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
              <span style={{ fontSize: '0.8125rem', color: '#f8fafc', fontWeight: 600 }}>
                &ldquo;A simple digital ecosystem where surplus food reaches people instead of landfills.&rdquo;
              </span>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: '2rem', borderTop: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8125rem' }}>
          <p>© 2026 FoodRescue Platform. Built for Sustainability & Community.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Zero Waste Initiative</span>
            <span>GraphQL + Next.js</span>
            <span>Open Impact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
