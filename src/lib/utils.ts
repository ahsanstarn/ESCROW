import { EscrowStatus, DisputeStatus, DeliveryStatus, MilestoneStatus } from '@/types';

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);
  const diffMs = target.getTime() - now.getTime();
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffMs < 0) return 'Expired';
  if (diffHours < 1) return 'Less than 1 hour';
  if (diffHours < 24) return `${diffHours}h remaining`;
  if (diffDays === 1) return '1 day remaining';
  return `${diffDays} days remaining`;
}

export function getEscrowStatusLabel(status: EscrowStatus): string {
  const labels: Record<EscrowStatus, string> = {
    CREATED: 'Created',
    DEPOSITED: 'Funds Held',
    SHIPPED: 'Shipped',
    IN_TRANSIT: 'In Transit',
    DELIVERED: 'Delivered',
    CONFIRMED: 'Confirmed',
    RELEASED: 'Released',
    DISPUTED: 'Disputed',
    REFUNDED: 'Refunded',
    CANCELLED: 'Cancelled',
  };
  return labels[status] || status;
}

export function getEscrowStatusColor(status: EscrowStatus): string {
  const colors: Record<EscrowStatus, string> = {
    CREATED: 'badge-neutral',
    DEPOSITED: 'badge-active',
    SHIPPED: 'badge-active',
    IN_TRANSIT: 'badge-active',
    DELIVERED: 'badge-caution',
    CONFIRMED: 'badge-success',
    RELEASED: 'badge-success',
    DISPUTED: 'badge-danger',
    REFUNDED: 'badge-caution',
    CANCELLED: 'badge-neutral',
  };
  return colors[status] || 'badge-neutral';
}

export function getDisputeStatusLabel(status: DisputeStatus): string {
  const labels: Record<DisputeStatus, string> = {
    OPEN: 'Open',
    UNDER_REVIEW: 'Under Review',
    RESOLVED: 'Resolved',
    ESCALATED: 'Escalated',
  };
  return labels[status] || status;
}

export function getDisputeStatusColor(status: DisputeStatus): string {
  const colors: Record<DisputeStatus, string> = {
    OPEN: 'badge-caution',
    UNDER_REVIEW: 'badge-active',
    RESOLVED: 'badge-success',
    ESCALATED: 'badge-danger',
  };
  return colors[status] || 'badge-neutral';
}

export function getDeliveryStatusLabel(status: DeliveryStatus): string {
  const labels: Record<DeliveryStatus, string> = {
    ASSIGNED: 'Assigned',
    PICKED_UP: 'Picked Up',
    IN_TRANSIT: 'In Transit',
    DELIVERED: 'Delivered',
    FAILED: 'Failed',
  };
  return labels[status] || status;
}

export function getMilestoneStatusLabel(status: MilestoneStatus): string {
  const labels: Record<MilestoneStatus, string> = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    RELEASED: 'Released',
  };
  return labels[status] || status;
}

export function getTrustScoreColor(score: number): string {
  if (score >= 80) return 'text-trust-400';
  if (score >= 60) return 'text-brand-400';
  if (score >= 40) return 'text-caution-400';
  return 'text-danger-400';
}

export function getTrustScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Poor';
}

export function getEscrowProgress(status: EscrowStatus): number {
  const progress: Record<EscrowStatus, number> = {
    CREATED: 10,
    DEPOSITED: 25,
    SHIPPED: 40,
    IN_TRANSIT: 55,
    DELIVERED: 70,
    CONFIRMED: 85,
    RELEASED: 100,
    DISPUTED: 70,
    REFUNDED: 100,
    CANCELLED: 100,
  };
  return progress[status] || 0;
}
