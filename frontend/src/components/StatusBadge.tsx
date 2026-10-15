import React from 'react';
import { DonationStatus } from '../types/index';

interface StatusBadgeProps {
  status: DonationStatus | string;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const getBadgeClass = (s: string) => {
    switch (s) {
      case 'AVAILABLE':
        return 'badge-available';
      case 'REQUESTED':
        return 'badge-requested';
      case 'PICKUP_ASSIGNED':
      case 'ASSIGNED':
        return 'badge-pickup-assigned';
      case 'PICKED_UP':
        return 'badge-picked-up';
      case 'DELIVERED':
        return 'badge-delivered';
      case 'COMPLETED':
      case 'FULFILLED':
        return 'badge-completed';
      case 'CANCELLED':
        return 'badge-cancelled';
      default:
        return 'badge-available';
    }
  };

  const formatLabel = (s: string) => {
    switch (s) {
      case 'AVAILABLE':
        return 'Available';
      case 'REQUESTED':
        return 'Requested';
      case 'PICKUP_ASSIGNED':
      case 'ASSIGNED':
        return 'Pickup Assigned';
      case 'PICKED_UP':
        return 'Picked Up';
      case 'DELIVERED':
        return 'Delivered';
      case 'COMPLETED':
        return 'Completed';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return s.replace(/_/g, ' ');
    }
  };

  return (
    <span
      className={`badge ${getBadgeClass(status)}`}
      style={{
        fontSize: size === 'sm' ? '0.7rem' : '0.75rem',
        padding: size === 'sm' ? '0.15rem 0.5rem' : '0.25rem 0.65rem',
      }}
    >
      <span className="badge-dot" />
      {formatLabel(status)}
    </span>
  );
}
