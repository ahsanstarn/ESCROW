import mongoose, { Schema, Document, Model } from 'mongoose';

// ================= USER MODEL =================
export interface IUser extends Document {
  id: string;
  email: string;
  name: string;
  role: 'BUYER' | 'SELLER' | 'MERCHANT' | 'AGENCY' | 'COURIER' | 'ADMIN';
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  trustScore: number;
  riskScore: number;
  avatarUrl?: string;
  walletBalance: number;
  inEscrowBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['BUYER', 'SELLER', 'MERCHANT', 'AGENCY', 'COURIER', 'ADMIN'], 
      default: 'BUYER' 
    },
    kycStatus: { 
      type: String, 
      enum: ['PENDING', 'VERIFIED', 'REJECTED'], 
      default: 'PENDING' 
    },
    trustScore: { type: Number, default: 85, min: 0, max: 100 },
    riskScore: { type: Number, default: 5, min: 0, max: 100 },
    avatarUrl: { type: String },
    walletBalance: { type: Number, default: 0 },
    inEscrowBalance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ================= ESCROW TRANSACTION MODEL =================
export interface IEscrow extends Document {
  id: string;
  orderNumber: string;
  buyerId: string;
  sellerId: string;
  merchantId?: string;
  title: string;
  description?: string;
  amount: number;
  fee: number;
  netAmount: number;
  currency: string;
  status: 'PENDING' | 'FUNDED' | 'IN_TRANSIT' | 'DELIVERED' | 'RELEASED' | 'DISPUTED' | 'REFUNDED' | 'CANCELLED';
  productType: 'PHYSICAL' | 'DIGITAL' | 'SERVICE' | 'MILESTONE';
  trackingNumber?: string;
  carrier?: string;
  confirmationWindowHours: number;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const EscrowSchema = new Schema<IEscrow>(
  {
    id: { type: String, required: true, unique: true, index: true },
    orderNumber: { type: String, required: true, unique: true, index: true },
    buyerId: { type: String, required: true, index: true },
    sellerId: { type: String, required: true, index: true },
    merchantId: { type: String, index: true },
    title: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true, min: 0 },
    fee: { type: Number, default: 0 },
    netAmount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: {
      type: String,
      enum: ['PENDING', 'FUNDED', 'IN_TRANSIT', 'DELIVERED', 'RELEASED', 'DISPUTED', 'REFUNDED', 'CANCELLED'],
      default: 'PENDING',
      index: true,
    },
    productType: {
      type: String,
      enum: ['PHYSICAL', 'DIGITAL', 'SERVICE', 'MILESTONE'],
      default: 'PHYSICAL',
    },
    trackingNumber: { type: String },
    carrier: { type: String },
    confirmationWindowHours: { type: Number, default: 72 },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

// ================= DISPUTE MODEL =================
export interface IDispute extends Document {
  id: string;
  escrowId: string;
  orderNumber: string;
  raisedBy: string;
  respondentId: string;
  reason: string;
  status: 'OPEN' | 'UNDER_REVIEW' | 'EVIDENCE_REQUIRED' | 'RESOLVED_BUYER' | 'RESOLVED_SELLER' | 'CANCELLED';
  disputedAmount: number;
  evidence: Array<{
    id: string;
    submittedBy: string;
    type: 'TEXT' | 'IMAGE' | 'DOCUMENT';
    content: string;
    createdAt: Date;
  }>;
  resolutionNotes?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DisputeSchema = new Schema<IDispute>(
  {
    id: { type: String, required: true, unique: true, index: true },
    escrowId: { type: String, required: true, index: true },
    orderNumber: { type: String, required: true },
    raisedBy: { type: String, required: true },
    respondentId: { type: String, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ['OPEN', 'UNDER_REVIEW', 'EVIDENCE_REQUIRED', 'RESOLVED_BUYER', 'RESOLVED_SELLER', 'CANCELLED'],
      default: 'OPEN',
      index: true,
    },
    disputedAmount: { type: Number, required: true },
    evidence: [
      {
        id: { type: String, required: true },
        submittedBy: { type: String, required: true },
        type: { type: String, enum: ['TEXT', 'IMAGE', 'DOCUMENT'], default: 'TEXT' },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    resolutionNotes: { type: String },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

// ================= TRANSACTION / LEDGER MODEL =================
export interface ITransaction extends Document {
  id: string;
  userId: string;
  escrowId?: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'ESCROW_LOCK' | 'ESCROW_RELEASE' | 'FEE' | 'REFUND';
  amount: number;
  fee: number;
  balanceAfter: number;
  currency: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  description: string;
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    escrowId: { type: String, index: true },
    type: {
      type: String,
      enum: ['DEPOSIT', 'WITHDRAWAL', 'ESCROW_LOCK', 'ESCROW_RELEASE', 'FEE', 'REFUND'],
      required: true,
    },
    amount: { type: Number, required: true },
    fee: { type: Number, default: 0 },
    balanceAfter: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['COMPLETED', 'PENDING', 'FAILED'], default: 'COMPLETED' },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

// Safe export for hot reloading & serverless caching
export const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const EscrowModel: Model<IEscrow> = mongoose.models.Escrow || mongoose.model<IEscrow>('Escrow', EscrowSchema);
export const DisputeModel: Model<IDispute> = mongoose.models.Dispute || mongoose.model<IDispute>('Dispute', DisputeSchema);
export const TransactionModel: Model<ITransaction> = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
