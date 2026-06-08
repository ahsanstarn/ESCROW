-- Escrow Trust Platform - Supabase PostgreSQL Schema
-- Run this in the Supabase SQL Editor to create all tables

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'BUYER',
  avatar_url TEXT,
  phone TEXT,
  kyc_status TEXT NOT NULL DEFAULT 'PENDING',
  risk_score DOUBLE PRECISION NOT NULL DEFAULT 0,
  trust_score DOUBLE PRECISION NOT NULL DEFAULT 50,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS escrows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escrow_code TEXT UNIQUE NOT NULL,
  merchant_id UUID NOT NULL REFERENCES users(id),
  buyer_id UUID REFERENCES users(id),
  courier_id UUID REFERENCES users(id),
  amount DOUBLE PRECISION NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  platform_fee DOUBLE PRECISION NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'CREATED',
  product_type TEXT NOT NULL,
  description TEXT,
  confirmation_window_hours INTEGER NOT NULL DEFAULT 72,
  tracking_id TEXT,
  shipment_carrier TEXT,
  shipment_date TIMESTAMPTZ,
  delivery_date TIMESTAMPTZ,
  confirmed_at TIMESTAMPTZ,
  released_at TIMESTAMPTZ,
  dispute_deadline TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escrow_id UUID NOT NULL REFERENCES escrows(id),
  title TEXT NOT NULL,
  description TEXT,
  amount DOUBLE PRECISION NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  completed_at TIMESTAMPTZ,
  released_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escrow_id UUID NOT NULL REFERENCES escrows(id),
  courier_id UUID NOT NULL REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'ASSIGNED',
  tracking_id TEXT,
  carrier TEXT,
  picked_up_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  proof_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escrow_id UUID NOT NULL REFERENCES escrows(id),
  opened_by_id UUID NOT NULL REFERENCES users(id),
  arbiter_id UUID REFERENCES users(id),
  reason TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'OPEN',
  outcome TEXT,
  resolution_notes TEXT,
  resolved_at TIMESTAMPTZ,
  tier INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dispute_id UUID NOT NULL REFERENCES disputes(id),
  submitted_by UUID NOT NULL,
  type TEXT NOT NULL,
  url TEXT,
  content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ledger_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escrow_id UUID NOT NULL REFERENCES escrows(id),
  user_id UUID NOT NULL REFERENCES users(id),
  type TEXT NOT NULL,
  amount DOUBLE PRECISION NOT NULL,
  balance DOUBLE PRECISION NOT NULL,
  description TEXT NOT NULL,
  reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS state_transitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escrow_id UUID NOT NULL REFERENCES escrows(id),
  from_state TEXT NOT NULL,
  to_state TEXT NOT NULL,
  triggered_by UUID,
  reason TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS webhook_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  url TEXT NOT NULL,
  events TEXT NOT NULL,
  secret TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS platform_settings (
  id TEXT PRIMARY KEY DEFAULT 'singleton',
  default_confirmation_hours INTEGER NOT NULL DEFAULT 72,
  max_confirmation_hours INTEGER NOT NULL DEFAULT 168,
  platform_fee_basis_points INTEGER NOT NULL DEFAULT 250,
  min_escrow_amount DOUBLE PRECISION NOT NULL DEFAULT 1,
  max_escrow_amount DOUBLE PRECISION NOT NULL DEFAULT 1000000,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RPC functions for analytics
CREATE OR REPLACE FUNCTION disputes_by_status()
RETURNS TABLE(status TEXT, count BIGINT) AS $$
  SELECT d.status, COUNT(*) as count FROM disputes d GROUP BY d.status;
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION escrows_by_status()
RETURNS TABLE(status TEXT, count BIGINT) AS $$
  SELECT e.status, COUNT(*) as count FROM escrows e GROUP BY e.status;
$$ LANGUAGE sql STABLE;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_escrows_merchant ON escrows(merchant_id);
CREATE INDEX IF NOT EXISTS idx_escrows_buyer ON escrows(buyer_id);
CREATE INDEX IF NOT EXISTS idx_escrows_courier ON escrows(courier_id);
CREATE INDEX IF NOT EXISTS idx_escrows_status ON escrows(status);
CREATE INDEX IF NOT EXISTS idx_disputes_escrow ON disputes(escrow_id);
CREATE INDEX IF NOT EXISTS idx_disputes_status ON disputes(status);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_user ON ledger_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_escrow ON ledger_entries(escrow_id);
CREATE INDEX IF NOT EXISTS idx_state_transitions_escrow ON state_transitions(escrow_id);
CREATE INDEX IF NOT EXISTS idx_deliveries_courier ON deliveries(courier_id);
CREATE INDEX IF NOT EXISTS idx_milestones_escrow ON milestones(escrow_id);
CREATE INDEX IF NOT EXISTS idx_evidence_dispute ON evidence(dispute_id);
