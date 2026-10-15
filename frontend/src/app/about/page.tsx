import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { HeartHandshake, Leaf, ShieldCheck, Globe, Users, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <Navbar />

      {/* Hero Banner */}
      <section style={{ background: 'linear-gradient(180deg, #ecfdf5 0%, #f8fafc 100%)', padding: '4.5rem 0 3rem', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Our Mission & Impact
          </span>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '0.5rem', letterSpacing: '-0.02em' }}>
            Bridging Surplus and Need Through Transparent Technology
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: 1.6 }}>
            Every day, perfectly edible food is discarded while local families and community shelters struggle to provide meals. FoodRescue eliminates that gap.
          </p>
        </div>
      </section>

      {/* Content Pillars */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div className="grid-3" style={{ marginBottom: '4rem' }}>
            <div className="card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Leaf size={24} color="#059669" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>The Environmental Toll</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Food waste accounts for 8-10% of global greenhouse gas emissions. When food rots in landfills, it produces methane, a potent greenhouse gas. Rescuing food protects our planet.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <HeartHandshake size={24} color="#d97706" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Community Dignity</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                We believe access to nutritious, wholesome food is a basic human right. FoodRescue preserves food dignity by connecting quality prepared dishes and fresh produce directly to kitchens.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <ShieldCheck size={24} color="#2563eb" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Safety & Tracking</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Our 5-stage lifecycle state machine prevents expired handoffs, enforces safe pickup windows, and logs recipient receipt for complete accountability.
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="card" style={{ background: '#0f172a', color: '#ffffff', padding: '3rem 2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>
              Our Goal: Zero Good Food in City Landfills
            </h2>
            <div className="grid-3">
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#34d399' }}>4,850+</div>
                <div style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.25rem' }}>Meals Rescued to Date</div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fbbf24' }}>100%</div>
                <div style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.25rem' }}>Transparent Delivery Journey</div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#60a5fa' }}>45+</div>
                <div style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.25rem' }}>Community Kitchen Partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
