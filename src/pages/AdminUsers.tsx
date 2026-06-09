import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Eye } from 'lucide-react';
import { User } from '@/types';

interface AdminUsersProps {
  userId?: string;
}

const TABS = ['All', 'Buyers', 'Sellers', 'Disputes'];

export default function AdminUsers({ userId }: AdminUsersProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    api.users.list()
      .then(res => setUsers(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (activeTab === 'All') return users;
    if (activeTab === 'Buyers') return users.filter(u => u.role === 'BUYER');
    if (activeTab === 'Sellers') return users.filter(u => u.role === 'SELLER' || u.role === 'MERCHANT');
    return users;
  }, [users, activeTab]);

  const tabCounts = useMemo(() => ({
    All: users.length,
    Buyers: users.filter(u => u.role === 'BUYER').length,
    Sellers: users.filter(u => u.role === 'SELLER' || u.role === 'MERCHANT').length,
    Disputes: 0,
  }), [users]);

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading users..." />;
  }

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-6 lg:mb-8">Users</h1>

        <div className="flex gap-6 mb-6 border-b border-slate-200">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === tab ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A3E635]" />}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f0f5f0]">
                  <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase">Name</th>
                  <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase">Email Address</th>
                  <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Phone Number</th>
                  <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase">Role</th>
                  <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Verification</th>
                  <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="py-8 text-center text-slate-500">No users found.</td></tr>
                ) : (
                  filtered.map(user => (
                    <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-5 font-medium text-slate-900">{user.name}</td>
                      <td className="py-4 px-5 text-slate-700">{user.email}</td>
                      <td className="py-4 px-5 text-slate-700 hidden md:table-cell">{(user as any).phone || '+1 1546 34567'}</td>
                      <td className="py-4 px-5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.role === 'SELLER' || user.role === 'MERCHANT' ? 'bg-[#A3E635]/20 text-black' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {user.role === 'SELLER' ? 'Seller' : user.role === 'BUYER' ? 'Buyer' : user.role === 'MERCHANT' ? 'Merchant' : user.role}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      </td>
                      <td className="py-4 px-5 hidden md:table-cell">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.kycStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
                        }`}>
                          {user.kycStatus === 'VERIFIED' ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <Link to={`/admin/users/${user.id}`} className="p-1.5 hover:bg-slate-100 rounded-lg inline-flex transition-colors">
                          <Eye className="w-4 h-4 text-slate-400" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
