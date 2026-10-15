import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../lib/auth-context';

export const metadata: Metadata = {
  title: 'FoodRescue | Surplus Food Redistribution & Management',
  description:
    'Rescue Food. Reduce Waste. Feed Hope. A transparent platform connecting surplus food from donors with volunteers and communities in need.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
