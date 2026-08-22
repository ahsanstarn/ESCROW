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
    <div className="min-h-screen bg-[#ECF4E9] p-8 font-sans">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings & Compliance</h1>
            <p className="text-sm text-gray-500 mt-1">Manage compliance, verification, and account settings</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        <div className="space-y-4" style={{ animation: `fadeInUp 0.5s ease-out 0s both` }}>
          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-800 flex justify-between items-center">
            <div className="flex gap-3">
              <div className="bg-red-100 p-2 rounded-lg text-red-800"><AlertTriangle className="w-5 h-5" /></div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">KYC required to enable payouts</h4>
                <p className="text-xs text-gray-500">Complete verification to unlock withdrawals above ₹50,000</p>
              </div>
            </div>
            <button className="bg-red-800 text-white px-4 py-2 rounded-lg text-sm font-bold">Take Action</button>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500 flex justify-between items-center">
            <div className="flex gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600"><AlertTriangle className="w-5 h-5" /></div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">High dispute ratio detected</h4>
                <p className="text-xs text-gray-500">Reduce disputes to improve trust score and release times</p>
              </div>
            </div>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Take Action</button>
          </div>
        </div>

        <div style={{ animation: `fadeInUp 0.5s ease-out 0.1s both` }}>
          <h2 className="text-sm font-bold text-gray-900 mb-3 mt-4">Compliance & Verification</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="flex gap-3 mb-4">
                <div className="bg-yellow-100 p-2 rounded-full text-yellow-600 h-max"><Shield className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">KYC Verification</h4>
                  <p className="text-xs text-gray-500">Identity verification required for withdrawals above ₹50,000</p>
                </div>
              </div>
              <button className="w-full bg-yellow-500 text-white py-2 rounded-xl text-sm font-bold">Complete Now</button>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="flex gap-3 mb-4">
                <div className="bg-[#BCF49D]/40 p-2 rounded-full text-[#1B4D1E] h-max"><CheckCircle className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Business Verification (KYB)</h4>
                  <p className="text-xs text-gray-500">Business documents verified</p>
                  <span className="mt-2 inline-block px-2 py-1 bg-[#BCF49D]/40 text-[#1B4D1E] text-[10px] rounded font-bold">Verified on Dec 20, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ animation: `fadeInUp 0.5s ease-out 0.2s both` }}>
          <h2 className="text-sm font-bold text-gray-900 mb-3 mt-4">Risk Assessment</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <p className="text-xs text-gray-500 mb-1">Account Risk Level</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Low</h3>
              <p className="text-[10px] text-gray-400">Based on transaction history and behavior</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <p className="text-xs text-gray-500 mb-1">Trust Score</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">92 / 100</h3>
              <p className="text-[10px] text-gray-400">High standing with platform</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <p className="text-xs text-gray-500 mb-1">Dispute Ratio</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">2.3%</h3>
              <p className="text-[10px] text-gray-400">Higher than optimal (target: &lt;2%)</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <p className="text-xs text-gray-500 mb-1">Verification Level</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Level 2</h3>
              <p className="text-[10px] text-gray-400">Complete KYC for Level 3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0.3s both` }}>
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-sm font-bold text-gray-900">Business Profile</h2>
            <button className="text-blue-500 text-sm font-bold">Edit Profile</button>
          </div>
          <div className="grid grid-cols-2 gap-y-6 gap-x-12">
            <div>
              <p className="text-xs text-gray-500">Business Name</p>
              <p className="text-sm text-gray-900">TechStore Solutions Pvt. Ltd.</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Business Address</p>
              <p className="text-sm text-gray-900">123, MG Road, Bangalore, Karnataka - 560001</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Business Type</p>
              <p className="text-sm text-gray-900">Private Limited Company</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm text-gray-900">+91 98765 43210</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Registration Number</p>
              <p className="text-sm text-gray-900">U74999KA2019PTC123456</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm text-gray-900">contact@techstore.com</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">GST Number</p>
              <p className="text-sm text-gray-900">29AABCT1234F1Z5</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Website</p>
              <p className="text-sm text-blue-500">www.techstore.com</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">PAN</p>
              <p className="text-sm text-gray-900">AACCT1234F</p>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <button className="flex-1 bg-[#A3E635] text-[#305941] py-3 rounded-xl text-sm font-bold hover:bg-[#DDFC95] transition-colors">Update Bank Details</button>
            <button className="flex-1 bg-[#A3E635] text-[#305941] py-3 rounded-xl text-sm font-bold hover:bg-[#DDFC95] transition-colors">Download Tax Reports</button>
            <button className="flex-1 bg-[#A3E635] text-[#305941] py-3 rounded-xl text-sm font-bold hover:bg-[#DDFC95] transition-colors">Security Settings</button>
          </div>
        </div>

        <div style={{ animation: `fadeInUp 0.5s ease-out 0.4s both` }}>
          <h2 className="text-sm font-bold text-gray-900 mb-3 mt-4">Security & Privacy Settings</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div>
                <h4 className="text-sm font-bold text-gray-900">Two-Factor Authentication</h4>
                <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <button onClick={() => setTwoFactor(!twoFactor)} className={`w-12 h-6 rounded-full p-1 transition-colors ${twoFactor ? 'bg-[#A3E635]' : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${twoFactor ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div>
                <h4 className="text-sm font-bold text-gray-900">Login Notifications</h4>
                <p className="text-xs text-gray-500">Get notified when someone logs into your account</p>
              </div>
              <button onClick={() => setLoginNotif(!loginNotif)} className={`w-12 h-6 rounded-full p-1 transition-colors ${loginNotif ? 'bg-[#A3E635]' : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${loginNotif ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div>
                <h4 className="text-sm font-bold text-gray-900">Data Export</h4>
                <p className="text-xs text-gray-500">Download all your account data</p>
              </div>
              <button className="bg-[#A3E635] text-[#305941] px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#DDFC95] transition-colors">Export Data</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
