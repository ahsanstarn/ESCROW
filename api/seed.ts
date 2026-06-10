import type { VercelRequest, VercelResponse } from '@vercel/node';

const BASE = () => `${process.env.SUPABASE_URL}/rest/v1`;
const KEY = () => process.env.SUPABASE_SERVICE_ROLE_KEY!;
const HDRS = () => ({ apikey: KEY(), Authorization: `Bearer ${KEY()}`, 'Content-Type': 'application/json', Prefer: 'return=representation' });

function hasConfig() {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

async function sbInsert(table: string, row: Record<string, any>) {
  if (!hasConfig()) return { id: `mock-${Date.now()}`, ...row };
  const res = await fetch(`${BASE()}/${table}`, { method: 'POST', headers: HDRS(), body: JSON.stringify(row) });
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

async function sbInsertMany(table: string, rows: Record<string, any>[]) {
  await fetch(`${BASE()}/${table}`, { method: 'POST', headers: HDRS(), body: JSON.stringify(rows) });
}

async function sbCount(table: string): Promise<number> {
  if (!hasConfig()) return 0;
  const res = await fetch(`${BASE()}/${table}?select=*&limit=1`, { headers: { ...HDRS(), Prefer: 'count=exact', Range: '0-0' } });
  const cr = res.headers.get('content-range');
  return cr ? parseInt(cr.split('/')[1]) : 0;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const force = req.query.force === 'true';
    if (!force) {
      const count = await sbCount('users');
      if (count > 0) {
        return res.json({ success: true, message: 'Database already seeded' });
      }
    }

    if (force) {
      const delAll = async (table: string) => {
        await fetch(`${BASE()}/${table}?id=not.is.null`, { method: 'DELETE', headers: HDRS() });
      };
      await delAll('ledger_entries');
      await delAll('state_transitions');
      await delAll('milestones');
      await delAll('disputes');
      await delAll('escrows');
      await delAll('users');
    }

    const merchant = await sbInsert('users', {
      email: 'merchant@example.com', name: 'TechStore Global', role: 'MERCHANT', trust_score: 78, kyc_status: 'VERIFIED',
    });

    const merchant2 = await sbInsert('users', {
      email: 'designstudio@example.com', name: 'DesignStudio Pro', role: 'MERCHANT', trust_score: 92, kyc_status: 'VERIFIED',
    });

    const buyer = await sbInsert('users', {
      email: 'buyer@example.com', name: 'Sarah Johnson', role: 'BUYER', trust_score: 85, kyc_status: 'VERIFIED',
    });

    const buyer2 = await sbInsert('users', {
      email: 'buyer2@example.com', name: 'James Wilson', role: 'BUYER', trust_score: 92, kyc_status: 'VERIFIED',
    });

    const courier = await sbInsert('users', {
      email: 'courier@example.com', name: 'QuickDeliver Express', role: 'COURIER', trust_score: 88, kyc_status: 'VERIFIED',
    });

    const admin = await sbInsert('users', {
      email: 'admin@example.com', name: 'Platform Admin', role: 'ADMIN', trust_score: 100, kyc_status: 'VERIFIED',
    });

    const seller = await sbInsert('users', {
      email: 'seller@example.com', name: 'Pro Seller Store', role: 'SELLER', trust_score: 88, kyc_status: 'VERIFIED',
    });

    const agency = await sbInsert('users', {
      email: 'agency@example.com', name: 'Global Agency Partners', role: 'AGENCY', trust_score: 95, kyc_status: 'VERIFIED',
    });

    const now = Date.now();
    const DAY = 86400000;

    const e1 = await sbInsert('escrows', {
      escrow_code: 'ESC-2026-001', merchant_id: merchant.id, buyer_id: buyer.id, courier_id: courier.id,
      amount: 2499.99, currency: 'USD', platform_fee: 62.50, status: 'DELIVERED', product_type: 'PHYSICAL',
      description: 'MacBook Pro 14" M3 Pro - Brand New', confirmation_window_hours: 72,
      tracking_id: 'TRK-9876543210', shipment_carrier: 'FedEx',
      shipment_date: new Date(now - 5 * DAY).toISOString(), delivery_date: new Date(now - DAY).toISOString(),
      dispute_deadline: new Date(now + 2 * DAY).toISOString(),
    });

    const e2 = await sbInsert('escrows', {
      escrow_code: 'ESC-2026-002', merchant_id: merchant.id, buyer_id: buyer2.id, courier_id: courier.id,
      amount: 899.00, currency: 'USD', platform_fee: 22.48, status: 'IN_TRANSIT', product_type: 'PHYSICAL',
      description: 'Sony WH-1000XM5 Headphones', confirmation_window_hours: 48,
      tracking_id: 'TRK-1234567890', shipment_carrier: 'UPS',
      shipment_date: new Date(now - 2 * DAY).toISOString(),
    });

    const e3 = await sbInsert('escrows', {
      escrow_code: 'ESC-2026-003', merchant_id: merchant2.id, buyer_id: buyer.id,
      amount: 150.00, currency: 'USD', platform_fee: 3.75, status: 'RELEASED', product_type: 'DIGITAL',
      description: 'UI/UX Design Package - 10 Screens', confirmation_window_hours: 24,
      confirmed_at: new Date(now - 3 * DAY).toISOString(), released_at: new Date(now - 3 * DAY).toISOString(),
    });

    const e4 = await sbInsert('escrows', {
      escrow_code: 'ESC-2026-004', merchant_id: merchant.id, buyer_id: buyer2.id, courier_id: courier.id,
      amount: 3200.00, currency: 'USD', platform_fee: 80.00, status: 'DISPUTED', product_type: 'PHYSICAL',
      description: 'Gaming PC Custom Build - RTX 4090', confirmation_window_hours: 72,
      tracking_id: 'TRK-5556667778', shipment_carrier: 'DHL',
      shipment_date: new Date(now - 7 * DAY).toISOString(), delivery_date: new Date(now - 4 * DAY).toISOString(),
    });

    const e5 = await sbInsert('escrows', {
      escrow_code: 'ESC-2026-005', merchant_id: merchant.id, buyer_id: buyer.id,
      amount: 450.00, currency: 'USD', platform_fee: 11.25, status: 'DEPOSITED', product_type: 'DIGITAL',
      description: 'WordPress E-commerce Setup - Full Store', confirmation_window_hours: 168,
    });

    const e6 = await sbInsert('escrows', {
      escrow_code: 'ESC-2026-006', merchant_id: merchant2.id, buyer_id: buyer2.id,
      amount: 750.00, currency: 'USD', platform_fee: 18.75, status: 'DISPUTED', product_type: 'DIGITAL',
      description: 'SEO Consultation - 3 Month Package', confirmation_window_hours: 48,
    });

    await sbInsertMany('disputes', [
      { id: 'dispute-1', escrow_id: e4.id, opened_by_id: buyer2.id, reason: 'Item not as described', description: 'Received PC with different specs than advertised. GPU is RTX 4080 instead of RTX 4090 as listed.', status: 'UNDER_REVIEW', tier: 2 },
      { id: 'dispute-2', escrow_id: e5.id, opened_by_id: buyer.id, reason: 'Service not delivered', description: 'Waiting for merchant to begin work on the project.', status: 'OPEN', tier: 1 },
    ]);

    await sbInsertMany('milestones', [
      { escrow_id: e5.id, title: 'Wireframes & Mockups', amount: 100, status: 'COMPLETED', completed_at: new Date().toISOString() },
      { escrow_id: e5.id, title: 'Frontend Development', amount: 150, status: 'IN_PROGRESS' },
      { escrow_id: e5.id, title: 'Backend Integration', amount: 120, status: 'PENDING' },
      { escrow_id: e5.id, title: 'Final Delivery & Launch', amount: 80, status: 'PENDING' },
    ]);

    await sbInsertMany('state_transitions', [
      { escrow_id: e1.id, from_state: 'CREATED', to_state: 'DEPOSITED', triggered_by: buyer.id, reason: 'Funds deposited' },
      { escrow_id: e1.id, from_state: 'DEPOSITED', to_state: 'SHIPPED', triggered_by: merchant.id, reason: 'Shipment dispatched' },
      { escrow_id: e1.id, from_state: 'SHIPPED', to_state: 'IN_TRANSIT', triggered_by: courier.id, reason: 'Package picked up' },
      { escrow_id: e1.id, from_state: 'IN_TRANSIT', to_state: 'DELIVERED', triggered_by: courier.id, reason: 'Delivered to recipient' },
    ]);

    await sbInsertMany('ledger_entries', [
      { escrow_id: e1.id, user_id: buyer.id, type: 'HOLD', amount: 2499.99, balance: -2499.99, description: 'Funds held in escrow for ESC-2026-001' },
      { escrow_id: e3.id, user_id: buyer.id, type: 'HOLD', amount: 150, balance: -2649.99, description: 'Funds held for ESC-2026-003' },
      { escrow_id: e3.id, user_id: buyer.id, type: 'RELEASE', amount: 146.25, balance: -2503.74, description: 'Funds released from ESC-2026-003' },
      { escrow_id: e3.id, user_id: merchant2.id, type: 'RELEASE', amount: 146.25, balance: 146.25, description: 'Received from ESC-2026-003' },
    ]);

    return res.json({ success: true, message: 'Database seeded successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
