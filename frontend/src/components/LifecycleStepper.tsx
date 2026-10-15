import React from 'react';
import { DonationStatus } from '../types/index';
import { Check, Clock, Package, Truck, Home, CheckCircle2 } from 'lucide-react';

interface LifecycleStepperProps {
  status: DonationStatus;
  pickedUpAt?: string | null;
  deliveredAt?: string | null;
  confirmedAt?: string | null;
}

const STEPS = [
  { key: 'AVAILABLE', label: 'Surplus Posted', icon: Package, desc: 'Ready for request' },
  { key: 'REQUESTED', label: 'Requested', icon: Clock, desc: 'Receiver claimed' },
  { key: 'PICKUP_ASSIGNED', label: 'Pickup Assigned', icon: Truck, desc: 'Volunteer matched' },
  { key: 'PICKED_UP', label: 'In Transit', icon: Truck, desc: 'Collected from donor' },
  { key: 'DELIVERED', label: 'Delivered', icon: Home, desc: 'Arrived at drop-off' },
  { key: 'COMPLETED', label: 'Confirmed', icon: CheckCircle2, desc: 'Receipt verified' },
];

export default function LifecycleStepper({
  status,
  pickedUpAt,
  deliveredAt,
  confirmedAt,
}: LifecycleStepperProps) {
  const getStepIndex = (s: DonationStatus) => {
    switch (s) {
      case 'AVAILABLE': return 0;
      case 'REQUESTED': return 1;
      case 'PICKUP_ASSIGNED': return 2;
      case 'PICKED_UP': return 3;
      case 'DELIVERED': return 4;
      case 'COMPLETED': return 5;
      case 'CANCELLED': return -1;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(status);

  if (status === 'CANCELLED') {
    return (
      <div style={{
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        background: '#fef2f2',
        border: '1px solid #fecaca',
        color: '#991b1b',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        ⚠️ This food donation has been cancelled and is no longer active.
      </div>
    );
  }

  return (
    <div style={{ width: '100%', margin: '1.5rem 0' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '0 0.5rem',
      }}>
        {/* Background Connecting Line */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '40px',
          right: '40px',
          height: '4px',
          background: '#e2e8f0',
          zIndex: 0,
        }} />

        {/* Progress Connecting Line */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '40px',
          width: `${(Math.min(currentIndex, STEPS.length - 1) / (STEPS.length - 1)) * 90}%`,
          height: '4px',
          background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
          zIndex: 1,
          transition: 'width 0.4s ease',
        }} />

        {STEPS.map((step, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const StepIcon = step.icon;

          let circleBg = '#ffffff';
          let circleBorder = '#cbd5e1';
          let iconColor = '#94a3b8';

          if (isDone) {
            circleBg = '#10b981';
            circleBorder = '#10b981';
            iconColor = '#ffffff';
          } else if (isCurrent) {
            circleBg = '#ecfdf5';
            circleBorder = '#059669';
            iconColor = '#059669';
          }

          return (
            <div
              key={step.key}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                zIndex: 2,
                minWidth: '70px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: circleBg,
                  border: `3px solid ${circleBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isCurrent ? '0 0 0 4px rgba(16, 185, 129, 0.2)' : 'var(--shadow-sm)',
                  transition: 'var(--transition)',
                }}
              >
                {isDone ? (
                  <Check size={20} color="#ffffff" strokeWidth={3} />
                ) : (
                  <StepIcon size={18} color={iconColor} />
                )}
              </div>
              <span
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.8125rem',
                  fontWeight: isCurrent ? 700 : isDone ? 600 : 500,
                  color: isCurrent ? 'var(--primary-dark)' : isDone ? 'var(--text-main)' : 'var(--text-muted)',
                }}
              >
                {step.label}
              </span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                {step.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
