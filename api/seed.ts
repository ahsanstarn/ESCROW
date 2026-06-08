import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { count } = await supabase.from('users').select('*', { count: 'exact', head: true });
    if (count && count > 0) {
      return res.json({ success: true, message: 'Database already seeded' });
    }

    const merchant = (await supabase.from('users').insert({
      email: 'merchant@example.com', name: 'TechStore Global', role: 'MERCHANT', trust_score: 78, kyc_status: 'VERIFIED',
    }).select().single()).data!;

    const merchant2 = (await supabase.from('users').insert({
      email: 'designstudio@example.com', name: 'DesignStudio Pro', role: 'MERCHANT', trust_score: 92, kyc_status: 'VERIFIED',
    }).select().single()).data!;

    const buyer = (await supabase.from('users').insert({
      email: 'buyer@example.com', name: 'Sarah Johnson', role: 'BUYER', trust_score: 85, kyc_status: 'VERIFIED',
    }).select().single()).data!;

    const buyer2 = (await supabase.from('users').insert({
      email: 'buyer2@example.com', name: 'James Wilson', role: 'BUYER', trust_score: 92, kyc_status: 'VERIFIED',
    }).select().single()).data!;

    const courier = (await supabase.from('users').insert({
      email: 'courier@example.com', name: 'QuickDeliver Express', role: 'COURIER', trust_score: 88, kyc_status: 'VERIFIED',
    }).select().single()).data!;

    const admin = (await supabase.from('users').insert({
      email: 'admin@escrowtrust.com', name: 'Platform Admin', role: 'ADMIN', trust_score: 100, kyc_status: 'VERIFIED',
    }).select().single()).data!;

    const now = Date.now();
    const DAY = 86400000;

    const e1 = (await supabase.from('escrows').insert({
      escrow_code: 'ESC-2026-001', merchant_id: merchant.id, buyer_id: buyer.id, courier_id: courier.id,
      amount: 2499.99, currency: 'USD', platform_fee: 62.50, status: 'DELIVERED', product_type: 'PHYSICAL',
      description: 'MacBook Pro 14" M3 Pro - Brand New', confirmation_window_hours: 72,
      tracking_id: 'TRK-9876543210', shipment_carrier: 'FedEx',
      shipment_date: new Date(now - 5 * DAY).toISOString(), delivery_date: new Date(now - DAY).toISOString(),
      dispute_deadline: new Date(now + 2 * DAY).toISOString(),
    }).select().single()).data!;

    const e2 = (await supabase.from('escrows').insert({
      escrow_code: 'ESC-2026-002', merchant_id: merchant.id, buyer_id: buyer2.id, courier_id: courier.id,
      amount: 899.00, currency: 'USD', platform_fee: 22.48, status: 'IN_TRANSIT', product_type: 'PHYSICAL',
      description: 'Sony WH-1000XM5 Headphones', confirmation_window_hours: 48,
      tracking_id: 'TRK-1234567890', shipment_carrier: 'UPS',
      shipment_date: new Date(now - 2 * DAY).toISOString(),
    }).select().single()).data!;

    const e3 = (await supabase.from('escrows').insert({
      escrow_code: 'ESC-2026-003', merchant_id: merchant2.id, buyer_id: buyer.id,
      amount: 150.00, currency: 'USD', platform_fee: 3.75, status: 'RELEASED', product_type: 'DIGITAL',
      description: 'UI/UX Design Package - 10 Screens', confirmation_window_hours: 24,
      confirmed_at: new Date(now - 3 * DAY).toISOString(), released_at: new Date(now - 3 * DAY).toISOString(),
    }).select().single()).data!;

    const e4 = (await supabase.from('escrows').insert({
      escrow_code: 'ESC-2026-004', merchant_id: merchant.id, buyer_id: buyer2.id, courier_id: courier.id,
      amount: 3200.00, currency: 'USD', platform_fee: 80.00, status: 'DISPUTED', product_type: 'PHYSICAL',
      description: 'Gaming PC Custom Build - RTX 4090', confirmation_window_hours: 72,
      tracking_id: 'TRK-5556667778', shipment_carrier: 'DHL',
      shipment_date: new Date(now - 7 * DAY).toISOString(), delivery_date: new Date(now - 4 * DAY).toISOString(),
    }).select().single()).data!;

    const e5 = (await supabase.from('escrows').insert({
      escrow_code: 'ESC-2026-005', merchant_id: merchant.id, buyer_id: buyer.id,
      amount: 450.00, currency: 'USD', platform_fee: 11.25, status: 'DEPOSITED', product_type: 'DIGITAL',
      description: 'WordPress E-commerce Setup - Full Store', confirmation_window_hours: 168,
    }).select().single()).data!;

    const e6 = (await supabase.from('escrows').insert({
      escrow_code: 'ESC-2026-006', merchant_id: merchant2.id, buyer_id: buyer2.id,
      amount: 750.00, currency: 'USD', platform_fee: 18.75, status: 'DISPUTED', product_type: 'DIGITAL',
      description: 'SEO Consultation - 3 Month Package', confirmation_window_hours: 48,
    }).select().single()).data!;

    await supabase.from('disputes').insert([
      { id: 'dispute-1', escrow_id: e4.id, opened_by_id: buyer2.id, reason: 'Item not as described', description: 'Received PC with different specs than advertised. GPU is RTX 4080 instead of RTX 4090 as listed.', status: 'UNDER_REVIEW', tier: 2 },
      { id: 'dispute-2', escrow_id: e5.id, opened_by_id: buyer.id, reason: 'Service not delivered', description: 'Waiting for merchant to begin work on the project.', status: 'OPEN', tier: 1 },
    ]);

    await supabase.from('milestones').insert([
      { escrow_id: e5.id, title: 'Wireframes & Mockups', amount: 100, status: 'COMPLETED', completed_at: new Date().toISOString() },
      { escrow_id: e5.id, title: 'Frontend Development', amount: 150, status: 'IN_PROGRESS' },
      { escrow_id: e5.id, title: 'Backend Integration', amount: 120, status: 'PENDING' },
      { escrow_id: e5.id, title: 'Final Delivery & Launch', amount: 80, status: 'PENDING' },
    ]);

    await supabase.from('state_transitions').insert([
      { escrow_id: e1.id, from_state: 'CREATED', to_state: 'DEPOSITED', triggered_by: buyer.id, reason: 'Funds deposited' },
      { escrow_id: e1.id, from_state: 'DEPOSITED', to_state: 'SHIPPED', triggered_by: merchant.id, reason: 'Shipment dispatched' },
      { escrow_id: e1.id, from_state: 'SHIPPED', to_state: 'IN_TRANSIT', triggered_by: courier.id, reason: 'Package picked up' },
      { escrow_id: e1.id, from_state: 'IN_TRANSIT', to_state: 'DELIVERED', triggered_by: courier.id, reason: 'Delivered to recipient' },
    ]);

    await supabase.from('ledger_entries').insert([
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
