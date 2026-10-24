'use client';

import React from 'react';
import RoleGuard from '../../components/RoleGuard';

export default function DonorLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRoles={['DONOR']}>{children}</RoleGuard>;
}
