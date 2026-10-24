'use client';

import React from 'react';
import RoleGuard from '../../components/RoleGuard';

export default function ReceiverLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRoles={['RECEIVER']}>{children}</RoleGuard>;
}
