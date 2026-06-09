import { useState } from 'react';
import { api } from '@/lib/api';

interface ProfileProps {
  userId?: string;
  userName?: string;
  role?: 'buyer' | 'seller';
}

export default function Profile({ userId, userName, role = 'buyer' }: ProfileProps) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    username: role === 'buyer' ? 'Michael22' : 'Oscar11',
    name: userName || (role === 'buyer' ? 'Michael Jackson' : 'Oscar Wilson'),
    country: 'United States of America',
    email: role === 'buyer' ? 'Michaeljackson@mail.com' : 'oscarwilson@mail.com',
    phone: '+1 1546 34567',
  });

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    try {
      await api.users2.update({
        userId,
        name: formData.name,
        phone: formData.phone,
        username: formData.username,
      });
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Failed to save profile:', err);
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Profile Settings</h1>
          <p className="mt-1 text-sm text-slate-500">Update your personal details and contact information.</p>
        </div>

        <div className="max-w-2xl space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="font-bold text-slate-900 mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  disabled={!editing}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!editing}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  disabled
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm opacity-70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm opacity-70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!editing}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              {editing ? (
                <>
                  <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-[#A3E635] text-black font-semibold text-sm rounded-lg hover:bg-[#b8ed5a] transition-colors disabled:opacity-50">
                    {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                  </button>
                  <button onClick={() => setEditing(false)} className="px-6 py-2.5 border border-slate-200 text-slate-700 font-semibold text-sm rounded-lg hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setEditing(true)} className="px-6 py-2.5 bg-[#A3E635] text-black font-semibold text-sm rounded-lg hover:bg-[#b8ed5a] transition-colors">
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
            <h2 className="font-bold text-slate-900 mb-2">Close Account</h2>
            <p className="text-sm text-slate-500 mb-4">Close your account and remove all your data</p>
            <button className="px-6 py-2.5 border border-red-300 text-red-600 font-semibold text-sm rounded-lg hover:bg-red-50 transition-colors">
              Close Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
