'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import LifecycleStepper from '../../components/LifecycleStepper';
import { Utensils, Truck, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<'DONOR' | 'VOLUNTEER' | 'RECEIVER'>('DONOR');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <Navbar />

      <section style={{ background: 'linear-gradient(180deg, #ecfdf5 0%, #f8fafc 100%)', padding: '4.5rem 0 3rem', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Lifecycle & Architecture
          </span>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '0.5rem', letterSpacing: '-0.02em' }}>
            How Food Moves From Surplus to Plate
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: 1.6 }}>
            Every food item follows a strictly enforced 6-step lifecycle ensuring complete food safety, real-time coordination, and transparent verification.
          </p>
        </div>
      </section>

      {/* Visual Stepper Demo */}
      <section style={{ padding: '3.5rem 0 2rem' }}>
        <div className="container">
          <div className="card" style={{ padding: '2.5rem 2rem', marginBottom: '3.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
              The 6-Stage Food Rescue Journey
            </h3>
            <LifecycleStepper status="PICKED_UP" />
            <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
              The state machine prevents skipped steps: food cannot be completed until it is delivered, and cannot be delivered until it is collected.
            </p>
          </div>

          {/* Role Perspective Selector */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
            <button
              onClick={() => setActiveTab('DONOR')}
              className={`btn ${activeTab === 'DONOR' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.9375rem', padding: '0.75rem 1.5rem' }}
            >
              🍱 For Food Donors
            </button>
            <button
              onClick={() => setActiveTab('VOLUNTEER')}
              className={`btn ${activeTab === 'VOLUNTEER' ? 'btn-secondary' : 'btn-outline'}`}
              style={{ fontSize: '0.9375rem', padding: '0.75rem 1.5rem' }}
            >
              🛵 For Volunteers
            </button>
            <button
              onClick={() => setActiveTab('RECEIVER')}
              className={`btn ${activeTab === 'RECEIVER' ? 'btn-primary' : 'btn-outline'}`}
              style={{
                fontSize: '0.9375rem',
                padding: '0.75rem 1.5rem',
                background: activeTab === 'RECEIVER' ? '#2563eb' : undefined,
                color: activeTab === 'RECEIVER' ? '#ffffff' : undefined,
              }}
            >
              🍽️ For Receivers
            </button>
          </div>

          {/* Tab Content */}
          <div className="card" style={{ padding: '2.5rem' }}>
            {activeTab === 'DONOR' && (
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669', marginBottom: '1rem' }}>
                  The Donor Experience: Turn Excess into Community Meals
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ padding: '1.25rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>1. Post In 60 Seconds</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Log surplus portions, food category, pickup window, and consumption deadline from your phone or kitchen terminal.
                    </p>
                  </div>
                  <div style={{ padding: '1.25rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>2. Live Match Notification</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      As soon as a community shelter requests your surplus, an alert notifies you and coordinates volunteer pickup.
                    </p>
                  </div>
                  <div style={{ padding: '1.25rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>3. Seamless Handoff & Impact</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Hand off food directly to verified volunteer couriers and watch your personal CO₂ and meal rescue stats grow.
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                  <Link href="/donor/dashboard" className="btn btn-primary btn-lg">
                    Go to Donor Dashboard
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'VOLUNTEER' && (
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#d97706', marginBottom: '1rem' }}>
                  The Volunteer Experience: The Wheels of Hope
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ padding: '1.25rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>1. Browse Nearby Pickups</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      View a live dispatch board of available food donations waiting for rescue in your neighborhood or along your commute.
                    </p>
                  </div>
                  <div style={{ padding: '1.25rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>2. Accept & Collect</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Claim the task, drive/bike to the donor, confirm collection in the app with one click, and receive drop-off directions.
                    </p>
                  </div>
                  <div style={{ padding: '1.25rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>3. Deliver Directly</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Safely drop off the food at the shelter intake door and confirm delivery. Your volunteer profile tracks all missions!
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                  <Link href="/volunteer/dashboard" className="btn btn-secondary btn-lg">
                    Go to Volunteer Dashboard
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'RECEIVER' && (
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2563eb', marginBottom: '1rem' }}>
                  The Receiver Experience: Wholesome Nourishment When Needed
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ padding: '1.25rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>1. Discover Available Surplus</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Browse the marketplace filtered by category (Cooked Meals, Bakery, Produce, Dairy) and claim what your kitchen needs.
                    </p>
                  </div>
                  <div style={{ padding: '1.25rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>2. Track Arrival In Real Time</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Watch your food move through the lifecycle tracker from volunteer pickup to your intake door.
                    </p>
                  </div>
                  <div style={{ padding: '1.25rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>3. One-Click Confirmation</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Click &ldquo;Confirm Food Received&rdquo; upon arrival to complete the rescue mission and close the loop.
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                  <Link href="/receiver/dashboard" className="btn btn-primary btn-lg" style={{ background: '#2563eb' }}>
                    Go to Receiver Dashboard
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
