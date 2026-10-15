'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import RoleGuard from '../../../../components/RoleGuard';
import Sidebar from '../../../../components/Sidebar';
import PortalHeader from '../../../../components/PortalHeader';
import StatusBadge from '../../../../components/StatusBadge';
import LifecycleStepper from '../../../../components/LifecycleStepper';
import { executeGraphQL } from '../../../../lib/graphql-client';
import {
  GET_TASK_DETAIL_QUERY,
  UPDATE_PICKUP_STATUS_MUTATION,
  CONFIRM_DELIVERY_MUTATION,
} from '../../../../lib/graphql-queries';
import { PickupTask } from '../../../../types/index';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  Truck,
  Building2,
  Navigation,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export default function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [task, setTask] = useState<PickupTask | null>(null);
  const [proofNotes, setProofNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      const res = await executeGraphQL<{ pickupTask: PickupTask }>(GET_TASK_DETAIL_QUERY, { id });
      if (res?.pickupTask) {
        setTask(res.pickupTask);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleConfirmPickup = async () => {
    if (!task) return;
    setUpdating(true);
    try {
      await executeGraphQL(UPDATE_PICKUP_STATUS_MUTATION, {
        taskId: task.id,
        status: 'PICKED_UP',
      });
      fetchTask();
    } catch (err: any) {
      alert(err?.message || 'Failed to update pickup status');
    } finally {
      setUpdating(false);
    }
  };

  const handleConfirmDelivery = async () => {
    if (!task) return;
    setUpdating(true);
    try {
      await executeGraphQL(CONFIRM_DELIVERY_MUTATION, {
        taskId: task.id,
        proofNotes: proofNotes || 'Delivered safely in clean food containers.',
      });
      fetchTask();
    } catch (err: any) {
      alert(err?.message || 'Failed to confirm delivery');
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !task) {
    return (
      <RoleGuard allowedRoles={['VOLUNTEER']}>
        <div className="portal-layout">
          <Sidebar role="VOLUNTEER" />
          <div className="portal-main">
            <PortalHeader title="Task Details" />
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading task details...
            </div>
          </div>
        </div>
      </RoleGuard>
    );
  }

  const donation = task.donation;
  const isAssigned = task.status === 'ASSIGNED';
  const isPickedUp = task.status === 'PICKED_UP';
  const isDelivered = task.status === 'DELIVERED';

  return (
    <RoleGuard allowedRoles={['VOLUNTEER']}>
      <div className="portal-layout">
        <Sidebar role="VOLUNTEER" />

        <div className="portal-main">
          <PortalHeader
            title="Dispatch Mission Guide"
            subtitle={`Task #${task.id} • ${donation?.foodName}`}
            action={
              <Link href="/volunteer/tasks" className="btn btn-outline btn-sm">
                <ArrowLeft size={16} />
                <span>My Tasks</span>
              </Link>
            }
          />

          <main className="portal-content">
            {/* Top Stepper Card */}
            <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <StatusBadge status={task.status} size="md" />
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      Assigned to: {task.volunteer?.name}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.4rem' }}>
                    {donation?.foodName}
                  </h2>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Amount to Transport</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {donation?.quantity} {donation?.unit}
                  </div>
                </div>
              </div>

              {donation && (
                <LifecycleStepper
                  status={donation.status}
                  pickedUpAt={task.pickedUpAt}
                  deliveredAt={task.deliveredAt}
                  confirmedAt={task.delivery?.confirmedAt}
                />
              )}
            </div>

            {/* Step 1 & Step 2 Interactive Action Flow */}
            <div className="grid-2">
              {/* Step 1: Donor Collection */}
              <div
                className="card"
                style={{
                  border: isAssigned ? '2px solid #059669' : '1px solid var(--border)',
                  background: isAssigned ? '#ffffff' : '#f8fafc',
                  opacity: isDelivered ? 0.8 : 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase' }}>
                    Phase 1: Donor Pickup
                  </span>
                  {task.pickedUpAt && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#059669', fontSize: '0.75rem', fontWeight: 700 }}>
                      <CheckCircle2 size={14} /> Collected
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                  {donation?.donor?.organization || donation?.donor?.name}
                </h3>

                <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                    <MapPin size={16} color="#059669" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontWeight: 600 }}>{donation?.pickupLocation}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={16} color="var(--text-muted)" />
                    <span>Pickup Window: <strong>{donation?.pickupAvailableTime}</strong></span>
                  </div>
                  {donation?.donor?.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Phone size={16} color="var(--text-muted)" />
                      <span>Contact: <strong>{donation.donor.phone}</strong></span>
                    </div>
                  )}
                  {donation?.storageNotes && (
                    <div style={{ padding: '0.6rem', background: '#ecfdf5', borderRadius: '6px', fontSize: '0.8125rem', color: '#065f46' }}>
                      <strong>Handling Note:</strong> {donation.storageNotes}
                    </div>
                  )}
                </div>

                {isAssigned ? (
                  <button
                    onClick={handleConfirmPickup}
                    disabled={updating}
                    className="btn btn-primary"
                    style={{ width: '100%', fontWeight: 700, padding: '0.75rem' }}
                  >
                    {updating ? 'Updating...' : '✓ Confirm Food Collected from Donor'}
                  </button>
                ) : (
                  <div style={{ padding: '0.6rem', background: '#ecfdf5', borderRadius: 'var(--radius-md)', textAlign: 'center', color: '#065f46', fontSize: '0.8125rem', fontWeight: 600 }}>
                    ✓ Food Collected at {task.pickedUpAt ? new Date(task.pickedUpAt).toLocaleTimeString() : 'Earlier'}
                  </div>
                )}
              </div>

              {/* Step 2: Receiver Delivery */}
              <div
                className="card"
                style={{
                  border: isPickedUp ? '2px solid #2563eb' : '1px solid var(--border)',
                  background: isPickedUp ? '#ffffff' : '#f8fafc',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>
                    Phase 2: Shelter Drop-Off
                  </span>
                  {task.deliveredAt && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#2563eb', fontSize: '0.75rem', fontWeight: 700 }}>
                      <CheckCircle2 size={14} /> Delivered
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                  {donation?.requests?.[0]?.receiver?.organization || donation?.requests?.[0]?.receiver?.name || 'Community Shelter Kitchen'}
                </h3>

                <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                    <Navigation size={16} color="#2563eb" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontWeight: 600 }}>
                      {donation?.requests?.[0]?.deliveryAddress || '450 Compassion Blvd, Loading Bay'}
                    </span>
                  </div>
                  {donation?.requests?.[0]?.receiver?.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Phone size={16} color="var(--text-muted)" />
                      <span>Shelter Intake Contact: <strong>{donation.requests[0].receiver.phone}</strong></span>
                    </div>
                  )}
                  {donation?.requests?.[0]?.notes && (
                    <div style={{ padding: '0.6rem', background: '#eff6ff', borderRadius: '6px', fontSize: '0.8125rem', color: '#1e40af' }}>
                      <strong>Receiver Note:</strong> &ldquo;{donation.requests[0].notes}&rdquo;
                    </div>
                  )}
                </div>

                {isPickedUp ? (
                  <div>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label className="form-label" style={{ fontSize: '0.8125rem' }}>
                        Delivery Handoff Notes (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Handed to staff member Maria at dock"
                        value={proofNotes}
                        onChange={(e) => setProofNotes(e.target.value)}
                        className="input"
                        style={{ fontSize: '0.8125rem' }}
                      />
                    </div>
                    <button
                      onClick={handleConfirmDelivery}
                      disabled={updating}
                      className="btn btn-secondary"
                      style={{ width: '100%', fontWeight: 700, padding: '0.75rem' }}
                    >
                      {updating ? 'Confirming...' : '✓ Confirm Safe Delivery to Receiver'}
                    </button>
                  </div>
                ) : isDelivered ? (
                  <div style={{ padding: '0.6rem', background: '#eef2ff', borderRadius: 'var(--radius-md)', textAlign: 'center', color: '#3730a3', fontSize: '0.8125rem', fontWeight: 600 }}>
                    ✓ Delivered to shelter at {task.deliveredAt ? new Date(task.deliveredAt).toLocaleTimeString() : 'Earlier'}
                  </div>
                ) : (
                  <div style={{ padding: '0.6rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                    Collect food from donor first before confirming delivery.
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
