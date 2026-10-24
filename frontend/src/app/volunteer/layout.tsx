'use client';

import React from 'react';
import RoleGuard from '../../components/RoleGuard';

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRoles={['VOLUNTEER']}>{children}</RoleGuard>;
}
