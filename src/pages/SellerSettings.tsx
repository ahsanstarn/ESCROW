import { useState } from 'react';
import AccountHeader from '@/components/layout/AccountHeader';
import {
  CheckCircle, AlertTriangle, Shield,
  Building2, Phone, Mail, FileText, Download, Lock,
  ChevronRight, Bell, User,
} from 'lucide-react';

interface SellerSettingsProps {
  userId?: string;
  userName?: string;
}

export default function SellerSettings({ userId, userName }: SellerSettingsProps) {
  const [twoFactor, setTwoFactor] = useState(true);
  const [loginNotif, setLoginNotif] = useState(true);
  const [transAlerts, setTransAlerts] = useState(false);
  const [businessName, setBusinessName] = useState('Acme Trading Co.');
  const [taxId, setTaxId] = useState('GSTIN123456789');
  const [businessEmail, setBusinessEmail] = useState('seller@business.com');
  const [businessPhone, setBusinessPhone] = useState('+91 98765 43210');
  const [website, setWebsite] = useState('https://acme-trading.com');
  const [businessType, setBusinessType] = useState('Private Limited');
  const [address, setAddress] = useState('123 Business Park, Sector 45, Gurugram, Haryana 122003');
  const [saved, setSaved] = useState(false);

  const handleSaveProfile = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Settings & Compliance</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your business profile, verification, and security</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        {/* KYC Alerts */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-900">KYC Verification Pending</p>
            <p className="text-sm text-amber-700 mt-0.5">Complete identity verification to unlock full platform features.</p>
          </div>
          <button onClick={() => alert('KYC verification form would open here.')} className="px-3 py-1.5 bg-amber-600 text-white text-xs font-medium rounded-lg hover:bg-amber-700 transition-colors">
            Complete KYC
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 lg:mb-8 flex flex-col sm:flex-row items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-900">Business Verification (KYB) In Progress</p>
            <p className="text-sm text-amber-700 mt-0.5">Your business documents are under review. This usually takes 2-3 business days.</p>
          </div>
          <button onClick={() => alert('KYB verification status would display here.')} className="px-3 py-1.5 bg-white border border-amber-300 text-amber-700 text-xs font-medium rounded-lg hover:bg-amber-100 transition-colors">
            View Status
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 lg:mb-8">
          {/* Compliance & Verification */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Compliance & Verification</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">KYC Verification</p>
                    <p className="text-xs text-slate-500">Identity & business verification</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-lg hover:bg-amber-100 transition-colors">
                  Pending
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Business Verification (KYB)</p>
                    <p className="text-xs text-slate-500">Business document certified</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Risk Assessment</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Account Risk Level</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                  <Shield className="w-3 h-3" /> Low
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Trust Score</span>
                <span className="text-sm font-bold text-slate-900">87/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Dispute Ratio</span>
                <span className="text-sm font-medium text-slate-900">2.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Verification Level</span>
                <span className="text-sm font-medium text-slate-900">Level 2 (of 3)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Business Profile */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 lg:mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Business Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
              <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">GST / Tax ID</label>
              <input value={taxId} onChange={(e) => setTaxId(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Business Email</label>
              <input value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Business Phone</label>
              <input value={businessPhone} onChange={(e) => setBusinessPhone(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
              <input value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Business Type</label>
              <input value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Business Address</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50" />
          </div>
          <div className="mt-4">
            <button onClick={handleSaveProfile} className="px-6 py-2.5 bg-[#A3E635] text-black font-semibold text-sm rounded-lg hover:bg-[#95d630] transition-colors">
              {saved ? 'Saved!' : 'Save Profile'}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6 lg:mb-8">
          <button onClick={() => alert('Bank details update form would open here.')} className="flex items-center gap-2 px-4 py-2.5 bg-[#A3E635] text-black text-sm font-semibold rounded-xl hover:bg-[#95d630] transition-colors">
            <Building2 className="w-4 h-4" /> Update Bank Details
          </button>
          <button onClick={() => alert('Tax report download started.')} className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" /> Download Tax Reports
          </button>
          <button onClick={() => alert('Security settings page would open here.')} className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
            <Lock className="w-4 h-4" /> Security Settings
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 lg:mb-8">
          {/* Security & Privacy */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Security & Privacy Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-500">Require OTP for sensitive actions</p>
                  </div>
                </div>
                <button onClick={() => setTwoFactor(!twoFactor)}>
                  {twoFactor ? (
                    <div className="w-10 h-6 bg-[#A3E635] rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  ) : (
                    <div className="w-10 h-6 bg-slate-300 rounded-full flex items-center justify-start px-1">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Login Notifications</p>
                    <p className="text-xs text-slate-500">Email alerts for new device logins</p>
                  </div>
                </div>
                <button onClick={() => setLoginNotif(!loginNotif)}>
                  {loginNotif ? (
                    <div className="w-10 h-6 bg-[#A3E635] rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  ) : (
                    <div className="w-10 h-6 bg-slate-300 rounded-full flex items-center justify-start px-1">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Transaction Alerts</p>
                    <p className="text-xs text-slate-500">Real-time alerts for all transactions</p>
                  </div>
                </div>
                <button onClick={() => setTransAlerts(!transAlerts)}>
                  {transAlerts ? (
                    <div className="w-10 h-6 bg-[#A3E635] rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  ) : (
                    <div className="w-10 h-6 bg-slate-300 rounded-full flex items-center justify-start px-1">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Data Export */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Data Export</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Transaction History</p>
                    <p className="text-xs text-slate-500">CSV export of all transactions</p>
                  </div>
                </div>
                <button onClick={() => alert('Transaction history CSV download started.')} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors">
                  Export
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Payout Reports</p>
                    <p className="text-xs text-slate-500">Monthly payout summaries</p>
                  </div>
                </div>
                <button onClick={() => alert('Payout reports download started.')} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors">
                  Export
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Dispute Records</p>
                    <p className="text-xs text-slate-500">All dispute case details</p>
                  </div>
                </div>
                <button onClick={() => alert('Dispute records download started.')} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors">
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
