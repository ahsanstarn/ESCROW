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
    <div className="min-h-screen bg-[#ECF4E9] p-8 font-sans">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">API & Webhooks</h1>
            <p className="text-sm text-gray-500 mt-1">Manage API keys and webhook integrations</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0s both` }}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-display font-bold text-gray-900">API Keys</h2>
                <p className="text-xs text-gray-500">Use these keys to authenticate API requests</p>
              </div>
              <button className="bg-[#A3E635] text-[#305941] px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#DDFC95] transition-colors">+ Generate New Key</button>
            </div>
            <div className="space-y-6">
              {apiKeys.map((key, i) => (
                <div key={key.id}>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm font-bold text-gray-900">{key.name}</p>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] rounded uppercase font-bold">{key.id}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">Created: {key.created} • Last used: {key.lastUsed}</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Public Key</p>
                      <div className="flex gap-2">
                        <input readOnly value={`pk_${key.id}_XY299aAbBcCdD123456`} className="flex-1 bg-[#ECF4E9]/50 border border-[#DDFC95] rounded-xl px-4 py-2 text-sm text-gray-800 font-mono focus:outline-none" />
                        <button onClick={() => handleCopy(key.id)} className="p-2 bg-[#A3E635] rounded-xl text-[#305941]"><Copy className="w-4 h-4"/></button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Secret Key</p>
                      <div className="flex gap-2">
                        <input readOnly type="password" value="sk_live_XY299aAbBcCdD123456" className="flex-1 bg-[#ECF4E9]/50 border border-[#DDFC95] rounded-xl px-4 py-2 text-sm text-gray-800 font-mono focus:outline-none" />
                        <button className="p-2 bg-[#A3E635] rounded-xl text-[#305941]"><Copy className="w-4 h-4"/></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0.1s both` }}>
              <h2 className="text-lg font-display font-bold text-gray-900">Webhook Endpoint</h2>
              <p className="text-xs text-gray-500 mb-4">Configure to receive live events</p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Endpoint URL</p>
                  <input value={webhookUrl} onChange={e => setWebhookUrl(e.target.value)} className="w-full bg-[#ECF4E9]/50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#DDFC95]" placeholder="https://api.yourdomain.com/webhooks" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Secret</p>
                  <div className="flex gap-2">
                    <input readOnly value="sec_XYZ88aZz123" className="flex-1 bg-[#ECF4E9]/50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#DDFC95]" />
                    <button className="p-2 bg-[#A3E635] rounded-xl text-[#305941]"><Copy className="w-4 h-4"/></button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleUpdateEndpoint} className="flex-1 bg-[#A3E635] text-[#305941] py-2 rounded-xl text-sm font-bold hover:bg-[#DDFC95] transition-colors">Update Endpoint</button>
                  <button className="flex-1 bg-gray-400 text-white py-2 rounded-xl text-sm font-bold hover:bg-gray-500 transition-colors">Test Webhook</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0.2s both` }}>
              <h2 className="text-lg font-display font-bold text-gray-900 mb-4">Subscribed Events</h2>
              <div className="space-y-4">
                {defaultEvents.slice(0,4).map(e => (
                  <div key={e.id} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{e.id}</p>
                      <p className="text-xs text-gray-500">Triggered when {e.label.toLowerCase()}</p>
                    </div>
                    <button onClick={() => toggleEvent(e.id)} className={`w-12 h-6 rounded-full p-1 transition-colors ${activeEvents[e.id] ? 'bg-[#A3E635]' : 'bg-gray-300'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${activeEvents[e.id] ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0.3s both` }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-display font-bold text-gray-900 flex items-center gap-2"><span className="text-gray-400">&lt;/&gt;</span> Quick Start</h2>
            <div className="flex gap-2">
              <button className="bg-[#A3E635] text-[#305941] px-4 py-1.5 rounded-xl text-sm font-bold">View Full Documentation</button>
              <button className="bg-[#A3E635] text-[#305941] px-4 py-1.5 rounded-xl text-sm font-bold">Download SDK</button>
            </div>
          </div>
          <div className="bg-[#1a1a2e] rounded-xl p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-[#DDFC95]">
{`// Initialize the SDK
import Escro from '@escro/node';

const escro = new Escro({
  apiKey: 'sk_live_XYZ99aAbBcCdD123456',
});

// Create an escrow order
const order = await escro.orders.create({
  buyer: 'buyer@example.com',
  type: 'product',
  amount: 2500,
  autoReleaseDuration: 72 // hours
});`}
            </pre>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0.4s both` }}>
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-display font-bold text-gray-900">Recent Webhook Events</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-[#DDFC95] text-[#305941]">
              <tr>
                <th className="text-left py-3 px-6 font-bold">Event</th>
                <th className="text-left py-3 px-6 font-bold">Order ID</th>
                <th className="text-left py-3 px-6 font-bold">Status</th>
                <th className="text-left py-3 px-6 font-bold">Response</th>
                <th className="text-left py-3 px-6 font-bold">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {recentEvents.map((ev, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-[#DDFC95]/10 transition-colors">
                  <td className="py-4 px-6 text-gray-900 font-medium">{ev.event}</td>
                  <td className="py-4 px-6 text-gray-500">#83425</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max ${ev.status === 'Success' ? 'bg-[#BCF49D]/40 text-[#1B4D1E]' : 'bg-red-100 text-red-800'}`}>
                      {ev.status === 'Success' ? <CheckCircle className="w-3 h-3"/> : <XCircle className="w-3 h-3"/>}
                      {ev.status.toLowerCase()}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#305941] font-mono">{ev.code}</td>
                  <td className="py-4 px-6 text-gray-500">{ev.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
