import { useState } from 'react';
import AccountHeader from '@/components/layout/AccountHeader';
import { Shield, Lock, BellRing } from 'lucide-react';

interface BuyerSettingsProps {
  userId?: string;
  userName?: string;
}

export default function BuyerSettings({ userId, userName }: BuyerSettingsProps) {
  const [fullName, setFullName] = useState('John Buyer');
  const [email, setEmail] = useState('buyer@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [twoFactor, setTwoFactor] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [txAlerts, setTxAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Settings</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your account settings and preferences</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="font-bold text-slate-900 mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50" />
                </div>
                <button onClick={handleSave} className="px-6 py-2.5 bg-[#A3E635] text-black font-semibold text-sm rounded-lg hover:bg-[#b8ed5a] transition-colors">
                  {saved ? 'Saved!' : 'Save Changes'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="font-bold text-slate-900 mb-4">Payment Methods</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center"><span className="text-[8px] text-white font-bold">VISA</span></div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Visa •••• 4819</p>
                      <p className="text-xs text-slate-500">Expires 09/26</p>
                    </div>
                  </div>
                  <span className="text-xs bg-[#A3E635]/20 text-black px-2 py-1 rounded-full font-semibold">Default</span>
                </div>
                <button className="w-full p-3 border-2 border-dashed border-slate-200 rounded-xl text-sm text-slate-500 hover:border-[#A3E635] hover:text-[#A3E635] transition-colors">
                  + Add Payment Method
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="font-bold text-slate-900 mb-4">Security</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-slate-600" />
                    <span className="text-sm text-slate-700">Two-Factor Auth</span>
                  </div>
                  <button onClick={() => setTwoFactor(!twoFactor)} className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${twoFactor ? 'bg-[#A3E635]' : 'bg-slate-300'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${twoFactor ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <BellRing className="w-4 h-4 text-slate-600" />
                    <span className="text-sm text-slate-700">Login Alerts</span>
                  </div>
                  <button onClick={() => setLoginAlerts(!loginAlerts)} className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${loginAlerts ? 'bg-[#A3E635]' : 'bg-slate-300'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${loginAlerts ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-slate-600" />
                    <span className="text-sm text-slate-700">Transaction Alerts</span>
                  </div>
                  <button onClick={() => setTxAlerts(!txAlerts)} className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${txAlerts ? 'bg-[#A3E635]' : 'bg-slate-300'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${txAlerts ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="font-bold text-slate-900 mb-4">Danger Zone</h2>
              <button className="w-full py-2.5 border border-red-300 text-red-600 font-semibold text-sm rounded-lg hover:bg-red-50 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
