import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ArrowLeft } from 'lucide-react';
import { User } from '@/types';

export default function AdminUserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.users.get(id)
      .then(res => setUser(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading user..." />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f0f5f0] flex items-center justify-center">
        <p className="text-slate-500">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <Link to="/admin/users" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </Link>

        <div className="mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-900">{user.name}</h1>
          <p className="text-sm text-slate-500">{user.email}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-1">No. of transactions</p>
            <p className="text-2xl font-bold text-slate-900">3000</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-1">Volume of transaction in USD</p>
            <p className="text-2xl font-bold text-slate-900">$3000</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-1">Transaction fee in USD</p>
            <p className="text-2xl font-bold text-slate-900">$3000</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-1">Dispute rate in USD</p>
            <p className="text-2xl font-bold text-slate-900">$3000</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-display font-bold text-slate-900 mb-6">User Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500 mb-1">Email address</p>
              <p className="text-sm font-medium text-slate-900">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Name</p>
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Country</p>
              <p className="text-sm font-medium text-slate-900">United States of America</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Username</p>
              <p className="text-sm font-medium text-slate-900">{(user as any).username || 'user123'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Phone number</p>
              <p className="text-sm font-medium text-slate-900">{(user as any).phone || '+1 1546 34567'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
