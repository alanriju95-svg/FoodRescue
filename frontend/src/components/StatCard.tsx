import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'emerald' | 'amber' | 'blue' | 'purple';
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'emerald',
}: StatCardProps) {
  const getColors = () => {
    switch (variant) {
      case 'amber':
        return { bg: '#fffbeb', border: '#fde68a', iconColor: '#d97706' };
      case 'blue':
        return { bg: '#eff6ff', border: '#bfdbfe', iconColor: '#2563eb' };
      case 'purple':
        return { bg: '#f5f3ff', border: '#ddd6fe', iconColor: '#7c3aed' };
      case 'emerald':
      default:
        return { bg: '#ecfdf5', border: '#a7f3d0', iconColor: '#059669' };
    }
  };

  const colors = getColors();

  return (
    <div className="card" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div>
        <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </p>
        <h3 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
          {value}
        </h3>
        {subtitle && (
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {subtitle}
          </p>
        )}
      </div>
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-md)',
          background: colors.bg,
          border: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={24} color={colors.iconColor} />
      </div>
    </div>
  );
}
