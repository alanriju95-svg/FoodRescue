'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatusBadge from '../components/StatusBadge';
import { executeGraphQL } from '../lib/graphql-client';
import { PLATFORM_STATS_QUERY, GET_AVAILABLE_DONATIONS_QUERY } from '../lib/graphql-queries';
import { PlatformStats, Donation } from '../types/index';
import {
  HeartHandshake,
  Utensils,
  Truck,
  Building2,
  Leaf,
  ShieldCheck,
  ArrowRight,
  Clock,
  Sparkles,
  Award,
  Users,
} from 'lucide-react';

export default function HomePage() {
  const [stats, setStats] = useState<PlatformStats>({
    totalDonations: 7,
    totalMealsRescued: 4850,
    activeVolunteers: 184,
    communityPartners: 46,
  });

  const [availableFood, setAvailableFood] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const statsData = await executeGraphQL<{ platformStats: PlatformStats }>(PLATFORM_STATS_QUERY);
        if (statsData?.platformStats) {
          setStats(statsData.platformStats);
        }

        const foodData = await executeGraphQL<{ availableDonations: Donation[] }>(GET_AVAILABLE_DONATIONS_QUERY);
        if (foodData?.availableDonations) {
          setAvailableFood(foodData.availableDonations.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(180deg, #ecfdf5 0%, #f8fafc 100%)',
          padding: '5rem 0 4rem',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: 'var(--radius-full)',
              background: '#d1fae5',
              border: '1px solid #a7f3d0',
              color: '#065f46',
              fontSize: '0.875rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}
          >
            <Sparkles size={16} />
            <span>Connecting Surplus Food to Communities in Real Time</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
              fontWeight: 900,
              color: 'var(--text-main)',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              maxWidth: '900px',
              margin: '0 auto 1.5rem',
            }}
          >
            Rescue Food. <span style={{ color: 'var(--primary)' }}>Reduce Waste.</span> Feed Hope.
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              maxWidth: '720px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6,
            }}
          >
            FoodRescue is the transparent, trackable redistribution platform connecting food businesses with surplus meals, volunteer rescue couriers, and community shelters.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '3rem',
            }}
          >
            <Link href="/donor/donations/create" className="btn btn-primary btn-lg">
              🍱 Donate Surplus Food
            </Link>
            <Link href="/volunteer/donations" className="btn btn-secondary btn-lg">
              🛵 Volunteer to Deliver
            </Link>
            <Link href="/receiver/food" className="btn btn-outline btn-lg">
              🍽️ Find Food Support
            </Link>
          </div>

          {/* Quick Demo Switcher Prompt */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1.25rem',
              background: '#ffffff',
              borderRadius: 'var(--radius-full)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border)',
            }}
          >
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Explore Role Dashboards:
            </span>
            <Link
              href="/donor/dashboard"
              style={{ fontSize: '0.875rem', fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
            >
              Donor <ArrowRight size={14} />
            </Link>
            <span style={{ color: 'var(--border-dark)' }}>•</span>
            <Link
              href="/volunteer/dashboard"
              style={{ fontSize: '0.875rem', fontWeight: 700, color: '#d97706', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
            >
              Volunteer <ArrowRight size={14} />
            </Link>
            <span style={{ color: 'var(--border-dark)' }}>•</span>
            <Link
              href="/receiver/dashboard"
              style={{ fontSize: '0.875rem', fontWeight: 700, color: '#2563eb', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
            >
              Receiver <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Live Impact Counters */}
      <section style={{ padding: '3.5rem 0', background: '#ffffff', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid-4">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)' }}>
                {stats.totalMealsRescued.toLocaleString()}+
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                Nutritious Meals Rescued
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Diverted from landfills directly to dining tables
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#d97706' }}>
                11.8 Tons
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                CO₂ Emissions Prevented
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Measurable greenhouse reduction
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#2563eb' }}>
                {stats.activeVolunteers}+
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                Active Volunteer Couriers
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Community champions on bikes and in cars
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#7c3aed' }}>
                {stats.communityPartners}+
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                Shelters & Food Banks
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Receiving regular surplus meal deliveries
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3-Step Lifecycle Visual */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Seamless Journey
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.5rem' }}>
              How FoodRescue Connects Communities
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: 1.6 }}>
              A closed-loop transparent system tracking food from initial donor posting all the way to verified recipient delivery.
            </p>
          </div>

          <div className="grid-3">
            {/* Step 1 */}
            <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: 'var(--radius-md)',
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Utensils size={28} color="#059669" />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>
                Step 1: Donors Post
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.4rem 0 0.75rem' }}>
                Surplus Food Logged
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Restaurants, bakeries, hotels, and markets register excess prepared dishes, fresh produce, and baked items with photos, expiry times, and pickup addresses.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: 'var(--radius-md)',
                  background: '#fffbeb',
                  border: '1px solid #fde68a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Truck size={28} color="#d97706" />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }}>
                Step 2: Volunteers Transport
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.4rem 0 0.75rem' }}>
                Pickup & Direct Transit
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Volunteers view available rescue dispatches, accept the pickup, safely collect food with thermal storage, and transport it directly to the receiver.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: 'var(--radius-md)',
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Building2 size={28} color="#2563eb" />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>
                Step 3: Receivers Nourished
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.4rem 0 0.75rem' }}>
                Receipt & Distribution
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Shelters, kitchens, and families receive fresh meals, verify food arrival with one click, and distribute hot nourishment immediately to those in need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Available Surplus Food Preview */}
      <section style={{ padding: '4.5rem 0', background: '#ffffff', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                Live Marketplace
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                Surplus Food Ready for Rescue
              </h2>
            </div>
            <Link href="/receiver/food" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>Browse All Food</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-3">
            {availableFood.map((donation) => (
              <div key={donation.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="category-pill">{donation.category.replace(/_/g, ' ')}</span>
                  <StatusBadge status={donation.status} size="sm" />
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  {donation.foodName}
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>
                  {donation.description}
                </p>

                <div style={{ padding: '0.85rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Quantity:</span>
                    <strong style={{ color: 'var(--text-main)' }}>{donation.quantity} {donation.unit}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Donor:</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{donation.donor?.organization || donation.donor?.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Pickup Slot:</span>
                    <span style={{ color: '#059669', fontWeight: 600 }}>{donation.pickupAvailableTime}</span>
                  </div>
                </div>

                <Link href="/receiver/food" className="btn btn-primary" style={{ width: '100%' }}>
                  Request this Food
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Personas Cards */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-main)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Built for Every Role in the Food Ecosystem
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
              Whether you have food to give, wheels to deliver, or people to feed, FoodRescue gives you dedicated tools.
            </p>
          </div>

          <div className="grid-3">
            {/* Donor Role Card */}
            <div className="card" style={{ borderTop: '4px solid #10b981', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>🍱</span>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>For Food Donors</h3>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Restaurants, Bakeries & Hotels</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                <li>✓ Easy surplus meal posting in 60 seconds</li>
                <li>✓ Real-time volunteer pickup tracking</li>
                <li>✓ Zero-waste sustainability impact metrics</li>
                <li>✓ Digital verification and history logs</li>
              </ul>
              <Link href="/donor/dashboard" className="btn btn-primary" style={{ width: '100%' }}>
                Enter Donor Portal
              </Link>
            </div>

            {/* Volunteer Role Card */}
            <div className="card" style={{ borderTop: '4px solid #f59e0b', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>🛵</span>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>For Volunteers</h3>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Drivers, Riders & Walkers</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                <li>✓ Browse nearby available surplus pickups</li>
                <li>✓ One-click task acceptance & map dispatch</li>
                <li>✓ Step-by-step status confirmation</li>
                <li>✓ Total meals rescued achievement tracking</li>
              </ul>
              <Link href="/volunteer/dashboard" className="btn btn-secondary" style={{ width: '100%' }}>
                Enter Volunteer Portal
              </Link>
            </div>

            {/* Receiver Role Card */}
            <div className="card" style={{ borderTop: '4px solid #3b82f6', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>🍽️</span>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>For Receivers</h3>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Shelters, Pantries & Families</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                <li>✓ Live catalog of available healthy food</li>
                <li>✓ Instant request with delivery address</li>
                <li>✓ Real-time courier arrival tracker</li>
                <li>✓ Free, transparent community support</li>
              </ul>
              <Link href="/receiver/dashboard" className="btn btn-outline" style={{ width: '100%' }}>
                Enter Receiver Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
          color: '#ffffff',
          padding: '4.5rem 0',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Ready to Put an End to Food Waste in Your City?
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#d1fae5', maxWidth: '640px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Join hundreds of local donors, volunteer drivers, and community recipients building a zero-hunger, sustainable future today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn btn-secondary btn-lg">
              Create Your Account Now
            </Link>
            <Link href="/how-it-works" className="btn btn-outline btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
