export type UserRole = 'BUYER' | 'MERCHANT' | 'COURIER' | 'ADMIN';

export type EscrowStatus =
  | 'CREATED'
  | 'DEPOSITED'
  | 'SHIPPED'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'CONFIRMED'
  | 'RELEASED'
  | 'DISPUTED'
  | 'REFUNDED'
  | 'CANCELLED';

export type ProductType = 'PHYSICAL' | 'DIGITAL';

export type DisputeStatus = 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'ESCALATED';

export type DisputeOutcome =
  | 'FULL_REFUND'
  | 'PARTIAL_REFUND'
  | 'FULL_RELEASE'
  | 'PARTIAL_RELEASE';

export type DeliveryStatus = 'ASSIGNED' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED';

export type MilestoneStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'RELEASED';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  kycStatus: string;
  riskScore: number;
  trustScore: number;
  createdAt: string;
}

export interface Escrow {
  id: string;
  escrowCode: string;
  merchantId: string;
  buyerId?: string;
  courierId?: string;
  amount: number;
  currency: string;
  platformFee: number;
  status: EscrowStatus;
  productType: ProductType;
  description?: string;
  confirmationWindowHours: number;
  trackingId?: string;
  shipmentCarrier?: string;
  shipmentDate?: string;
  deliveryDate?: string;
  confirmedAt?: string;
  releasedAt?: string;
  disputeDeadline?: string;
  metadata?: string;
  createdAt: string;
  updatedAt: string;
  merchant?: { id: string; name: string; email: string };
  buyer?: { id: string; name: string; email: string };
  milestones?: Milestone[];
  disputes?: Dispute[];
  stateTransitions?: StateTransition[];
  ledgerEntries?: LedgerEntry[];
  _count?: { disputes: number; milestones: number };
}

export interface Milestone {
  id: string;
  escrowId: string;
  title: string;
  description?: string;
  amount: number;
  status: MilestoneStatus;
  completedAt?: string;
  releasedAt?: string;
  createdAt: string;
}

export interface Dispute {
  id: string;
  escrowId: string;
  openedById: string;
  arbiterId?: string;
  reason: string;
  description: string;
  status: DisputeStatus;
  outcome?: DisputeOutcome;
  resolutionNotes?: string;
  resolvedAt?: string;
  tier: number;
  createdAt: string;
  updatedAt: string;
  escrow?: Escrow;
  opener?: { id: string; name: string; email: string };
  arbiter?: { id: string; name: string };
  evidence?: Evidence[];
}

export interface Evidence {
  id: string;
  disputeId: string;
  submittedBy: string;
  type: string;
  url?: string;
  content?: string;
  createdAt: string;
}

export interface Delivery {
  id: string;
  escrowId: string;
  courierId: string;
  status: DeliveryStatus;
  trackingId?: string;
  carrier?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  proofUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  escrow?: Escrow;
}

export interface LedgerEntry {
  id: string;
  escrowId: string;
  userId: string;
  type: string;
  amount: number;
  balance: number;
  description: string;
  reference?: string;
  createdAt: string;
  user?: { id: string; name: string; email: string };
}

export interface StateTransition {
  id: string;
  escrowId: string;
  fromState: string;
  toState: string;
  triggeredBy?: string;
  reason?: string;
  metadata?: string;
  createdAt: string;
}

export interface PlatformAnalytics {
  overview: {
    totalEscrows: number;
    activeEscrows: number;
    totalVolume: number;
    totalFeesCollected: number;
    openDisputes: number;
    resolvedDisputes: number;
    disputeRate: string;
  };
  users: {
    total: number;
    merchants: number;
    buyers: number;
    couriers: number;
  };
  disputesByStatus: Array<{ status: string; _count: number }>;
  escrowsByStatus: Array<{ status: string; _count: number }>;
  recentEscrows: Escrow[];
}

export interface UserStats {
  user: { id: string; name: string; role: string; trustScore: number };
  totalEscrows: number;
  activeEscrows: number;
  completedEscrows: number;
  disputes: number;
  successRate: string;
}
