import { useState, useEffect } from 'react';
import AccountHeader from '@/components/layout/AccountHeader';
import { api } from '@/lib/api';
import {
  Copy, Check, ExternalLink,
  Download, CheckCircle, XCircle,
} from 'lucide-react';

const apiKeys = [
  { id: 'prod', name: 'Production API Key', key: 'live_••••••••••••••••••••••••••••••••', created: 'Jan 10, 2025', lastUsed: '2 hours ago' },
  { id: 'test', name: 'Test API Key', key: 'test_••••••••••••••••••••••••••••••••', created: 'Dec 10, 2024', lastUsed: '5 hours ago' },
];

const defaultEvents = [
  { id: 'order_created', label: 'Order Created', active: true },
  { id: 'funds_held', label: 'Funds Held', active: true },
  { id: 'order_delivered', label: 'Order Delivered', active: true },
  { id: 'buyer_confirmed', label: 'Buyer Confirmed', active: false },
  { id: 'funds_released', label: 'Funds Released', active: true },
  { id: 'dispute_opened', label: 'Dispute Opened', active: true },
  { id: 'dispute_resolved', label: 'Dispute Resolved', active: false },
  { id: 'payout_completed', label: 'Payout Completed', active: true },
];

interface SellerApiProps {
  userId?: string;
  userName?: string;
}

export default function SellerApi({ userId, userName }: SellerApiProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState('https://api.your-company.com/webhooks');
  const [webhookSecret, setWebhookSecret] = useState('whsec_••••••••••••••••••••••••••••••••');
  const [activeEvents, setActiveEvents] = useState<Record<string, boolean>>(
    Object.fromEntries(defaultEvents.map(e => [e.id, e.active]))
  );
  const [webhooks, setWebhooks] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  const recentEvents = [
    { time: 'Today 2:45 PM', event: 'funds.received', status: 'Success', code: '200' },
    { time: 'Today 1:20 PM', event: 'orders.created', status: 'Success', code: '200' },
    { time: 'Yesterday 11:15 AM', event: 'disputes.opened', status: 'Failed', code: '500' },
    { time: 'Yesterday 3:30 PM', event: 'payments.released', status: 'Success', code: '200' },
    { time: 'Yesterday 9:00 AM', event: 'orders.updated', status: 'Success', code: '200' },
  ];

  useEffect(() => {
    if (!userId) return;
    api.webhooks.config(userId)
      .then(res => {
        if (res.data && res.data.length > 0) {
          const wh = res.data[0];
          setWebhookUrl(wh.url || webhookUrl);
        }
        setWebhooks(res.data || []);
      })
      .catch(() => {});
  }, [userId]);

  const handleCopy = (id: string) => {
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleEvent = (id: string) => {
    setActiveEvents(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleUpdateEndpoint = async () => {
    if (!userId) return;
    setSaving(true);
    try {
      await api.webhooks.create({
        userId,
        url: webhookUrl,
        events: Object.entries(activeEvents).filter(([, v]) => v).map(([k]) => k),
      });
    } catch { /* empty */ }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">API & Webhooks</h1>
            <p className="mt-1 text-sm text-slate-500">Integrate with our platform using API keys and webhooks</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 lg:mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <h2 className="text-lg font-semibold text-slate-900">API Keys</h2>
              <button onClick={() => alert('New API key generated! Copy it below.')} className="px-3 py-1.5 bg-[#A3E635] text-black text-xs font-semibold rounded-lg hover:bg-[#95d630] transition-colors">
                Generate New
              </button>
            </div>
            <div className="space-y-3">
              {apiKeys.map((key) => (
                <div key={key.id} className="p-4 border border-slate-100 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-slate-900">{key.name}</p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-medium">
                      <CheckCircle className="w-3 h-3" /> Active
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <code className="flex-1 text-xs bg-slate-100 text-slate-700 px-2 py-1.5 rounded-lg font-mono">{key.key}</code>
                    <button
                      onClick={() => handleCopy(key.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                    >
                      {copied === key.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">Created {key.created} • Last used {key.lastUsed}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Webhook Endpoint</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Endpoint URL</label>
                <input
                  value={webhookUrl}
                  onChange={e => setWebhookUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Webhook Secret</label>
                <input
                  value={webhookSecret}
                  onChange={e => setWebhookSecret(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50"
                />
              </div>
              <button onClick={handleUpdateEndpoint} disabled={saving} className="w-full py-2.5 bg-[#A3E635] text-black text-sm font-semibold rounded-xl hover:bg-[#95d630] transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : 'Update Endpoint'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 lg:mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Subscribed Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {defaultEvents.map((e) => (
              <button
                key={e.id}
                onClick={() => toggleEvent(e.id)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                  activeEvents[e.id]
                    ? 'border-[#A3E635] bg-[#A3E635]/10'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-sm font-medium text-slate-900">{e.label}</span>
                {activeEvents[e.id] ? (
                  <div className="w-8 h-5 bg-[#A3E635] rounded-full flex items-center justify-end px-1">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                ) : (
                  <div className="w-8 h-5 bg-slate-300 rounded-full flex items-center justify-start px-1">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Quick Start</h2>
            <div className="flex gap-2">
              <button onClick={() => alert('Opening API documentation...')} className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                <ExternalLink className="w-4 h-4" /> View Docs
              </button>
              <button onClick={() => alert('SDK download started.')} className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                <Download className="w-4 h-4" /> SDK
              </button>
            </div>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 overflow-x-auto">
            <pre className="text-sm font-mono text-slate-300">
{`curl -X POST https://api.escrow.com/v1/orders \\
  -H "Authorization: Bearer live_••••••••••••••" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 10000,
    "currency": "USD",
    "buyer_email": "buyer@example.com"
  }'`}
            </pre>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-3 sm:px-4 lg:px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Webhook Events</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#A3E635]">
                  <th className="text-left py-3 px-3 sm:px-4 text-black font-semibold text-xs uppercase tracking-wider">Time</th>
                  <th className="text-left py-3 px-3 sm:px-4 text-black font-semibold text-xs uppercase tracking-wider">Event</th>
                  <th className="text-left py-3 px-3 sm:px-4 text-black font-semibold text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-3 sm:px-4 text-black font-semibold text-xs uppercase tracking-wider">Code</th>
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((ev, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 sm:px-4 text-slate-700">{ev.time}</td>
                    <td className="py-3 px-3 sm:px-4 font-medium text-slate-900">{ev.event}</td>
                    <td className="py-3 px-3 sm:px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        ev.status === 'Success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {ev.status === 'Success' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {ev.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-slate-700 font-mono">{ev.code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
