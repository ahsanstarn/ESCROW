import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ShieldCheck, CheckCircle2, Clock, Box, Info } from 'lucide-react';
import { Escrow } from '@/types';

interface BuyerTransactionsProps {
  userId?: string;
  userName?: string;
}

export default function BuyerTransactions({ userId, userName }: BuyerTransactionsProps) {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    api.escrows.list({ buyerId: userId })
      .then(res => setEscrows(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading transactions..." />;
  }

  return (
    <div className="min-h-screen bg-[#ECF4E9]">
      <div className="p-6 lg:p-8 max-w-[1440px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col animate-fadeInUp" style={{ animation: 'fadeInUp 0.1s ease-out both' }}>
          <h1 className="text-2xl font-bold text-slate-900">Buyer Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Order ORD-2026-0112</p>
        </div>

        {/* Protection Banner */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: 'fadeInUp 0.2s ease-out both' }}>
          <div className="w-12 h-12 rounded-xl bg-[#DDFC95] flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#305941]" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Your money is protected and held until you confirm delivery</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your payment of <strong className="text-slate-900">$2,450.00 USD</strong> is securely held in escrow. Funds will only be released to the seller after you confirm receipt of your order, or automatically after the protection period expires if no issues are reported.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Escrow Status Stepper */}
            <div className="bg-white rounded-2xl shadow-sm p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: 'fadeInUp 0.3s ease-out both' }}>
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-slate-900 text-sm">Escrow Status</h3>
                <span className="px-3 py-1 bg-[#BCF49D] text-[#1B4D1E] text-[10px] rounded font-bold uppercase">Held in Escrow</span>
              </div>
              
              <div className="relative">
                <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 -z-10"></div>
                <div className="flex justify-between relative z-10">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#305941] text-white flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-900">Payment</span>
                  </div>
                  <div className="w-16 h-0.5 bg-[#305941] absolute left-10 top-5 -z-10"></div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#5D8CAE] text-white flex items-center justify-center shadow-[0_0_0_4px_white]">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-900">Escrow</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 text-slate-400 flex items-center justify-center shadow-[0_0_0_4px_white]">
                      <Box className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-medium text-slate-500">Delivery</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 text-slate-400 flex items-center justify-center shadow-[0_0_0_4px_white]">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-medium text-slate-500">Confirmation</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 text-slate-400 flex items-center justify-center shadow-[0_0_0_4px_white]">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-medium text-slate-500">Release</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: 'fadeInUp 0.4s ease-out both' }}>
              <h3 className="font-bold text-slate-900 text-sm mb-6 border-b border-slate-100 pb-4">Order Details</h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-medium mb-1">Order ID</p>
                  <p className="text-sm font-bold text-slate-900">ORD-2026-0112</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-medium mb-1">Transaction ID</p>
                  <p className="text-sm font-bold text-slate-900">esc_4d5e6f7g</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-medium mb-1">Seller</p>
                  <p className="text-sm text-slate-700">Tech Supplies Inc.</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-medium mb-1">Amount</p>
                  <p className="text-sm font-bold text-slate-900">$4,300.00 USD</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-medium mb-1">Courier</p>
                  <p className="text-sm text-slate-700">Swift Transit</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-medium mb-1">Delivery Status</p>
                  <p className="text-sm text-slate-700">Pending</p>
                </div>
              </div>
            </div>

            {/* Transaction History Timeline */}
            <div className="bg-white rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: 'fadeInUp 0.5s ease-out both' }}>
              <div className="p-4 border-b border-slate-100 flex items-center gap-2">
                <Box className="w-4 h-4 text-slate-500" />
                <h3 className="font-bold text-slate-900 text-sm">Transaction History</h3>
              </div>
              <div className="p-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#5D8CAE] mt-1"></div>
                    <div className="w-px h-full bg-slate-200 mt-2"></div>
                  </div>
                  <div className="pb-6">
                    <p className="text-sm font-bold text-slate-900">Payment - Held</p>
                    <p className="text-[10px] text-slate-500">Jan 12, 2026, 05:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="space-y-6">
            {/* Protection Period */}
            <div className="bg-white rounded-2xl shadow-sm p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: 'fadeInUp 0.3s ease-out both' }}>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-slate-900" />
                <h3 className="font-bold text-slate-900 text-sm">Protection Period</h3>
              </div>
              <p className="text-[10px] text-slate-500 mb-1">Auto-release in</p>
              <div className="flex items-center gap-1 mb-4">
                <Clock className="w-3 h-3 text-slate-500" />
                <span className="text-sm font-bold text-slate-900">Expired</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">Funds will be automatically released if no action is taken before this time.</p>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: 'fadeInUp 0.4s ease-out both' }}>
              <h3 className="font-bold text-slate-900 text-sm mb-4">Actions</h3>
              <button className="w-full py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                <Info className="w-4 h-4" /> Report an Issue
              </button>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: 'fadeInUp 0.5s ease-out both' }}>
              <h3 className="font-bold text-slate-900 text-sm mb-4">Quick Info</h3>
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <span className="text-slate-500">Created</span>
                  <span className="font-medium text-slate-900">Jan 12, 2026</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <span className="text-slate-500">Expected Release</span>
                  <span className="font-medium text-slate-900">Jan 29</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Status</span>
                  <span className="px-2 py-1 bg-[#BCF49D] text-[#1B4D1E] text-[10px] rounded font-bold uppercase">Held in Escrow</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
