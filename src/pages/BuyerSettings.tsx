import { useState } from 'react';
import AccountHeader from '@/components/layout/AccountHeader';

interface BuyerSettingsProps {
  userId?: string;
  userName?: string;
}

export default function BuyerSettings({ userId, userName }: BuyerSettingsProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [language, setLanguage] = useState('English');
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
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-900">Settings</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your account settings and preferences</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Personal info */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="font-display font-bold text-slate-900 mb-6">Personal info</h2>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">Email</p>
                  <p className="text-sm text-slate-500">buyer@example.com</p>
                </div>
                <button className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Change</button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">Password</p>
                  <p className="text-sm text-slate-500">••••••••</p>
                </div>
                <button className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Change</button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">Phone verification</p>
                  <p className="text-sm text-slate-500">Not verified</p>
                </div>
                <button className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Verify now</button>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="font-display font-bold text-slate-900 mb-6">Preferences</h2>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">Language</p>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="text-sm text-slate-700 bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer"
                >
                  <option>English</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">Dark Mode</p>
                <button onClick={() => setDarkMode(!darkMode)} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${darkMode ? 'bg-[#A3E635]' : 'bg-slate-300'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${darkMode ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">Two-Factor Auth</p>
                <button onClick={() => setTwoFactor(!twoFactor)} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${twoFactor ? 'bg-[#A3E635]' : 'bg-slate-300'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${twoFactor ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">Email Notification</p>
                <button onClick={() => setEmailNotifs(!emailNotifs)} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${emailNotifs ? 'bg-[#A3E635]' : 'bg-slate-300'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${emailNotifs ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>
          </div>

          <button onClick={handleSave} className="w-full py-3 bg-[#A3E635] text-black font-semibold text-sm rounded-xl hover:bg-[#b8ed5a] transition-colors">
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
