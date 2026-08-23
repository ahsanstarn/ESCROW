import { useState } from 'react';
import AccountHeader from '@/components/layout/AccountHeader';
import { CreditCard } from 'lucide-react';

interface BuyerCardsProps {
  userId?: string;
  userName?: string;
}

export default function BuyerCards({ userId, userName }: BuyerCardsProps) {
  const [onlineTx, setOnlineTx] = useState(true);
  const [txNotifs, setTxNotifs] = useState(true);
  const [intlPayments, setIntlPayments] = useState(false);

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-900">Cards</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your payment cards and limits</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        {/* Empty state */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 mb-8">
          <div className="flex flex-col items-center text-center max-w-sm mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#A3E635]/20 flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 text-[#A3E635]" />
            </div>
            <h2 className="font-display font-bold text-lg text-slate-900 mb-2">No Payment Cards Yet</h2>
            <p className="text-sm text-slate-500 mb-6">
              Add a payment card to start making secure transactions.
            </p>
            <button className="px-6 py-2.5 bg-[#A3E635] text-black font-semibold text-sm rounded-lg hover:bg-[#b8ed5a] transition-colors">
              + Add New Card
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-display font-bold text-lg text-slate-900 mb-4">Card Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-sm text-slate-900">Online Transactions</p>
                <p className="text-xs text-slate-500">Allow cards to be used for online payments</p>
              </div>
              <button onClick={() => setOnlineTx(!onlineTx)} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${onlineTx ? 'bg-[#A3E635]' : 'bg-slate-300'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${onlineTx ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-sm text-slate-900">Transaction Notifications</p>
                <p className="text-xs text-slate-500">Get notified for every card transaction</p>
              </div>
              <button onClick={() => setTxNotifs(!txNotifs)} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${txNotifs ? 'bg-[#A3E635]' : 'bg-slate-300'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${txNotifs ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-sm text-slate-900">International Payments</p>
                <p className="text-xs text-slate-500">Allow cards to be used for international transactions</p>
              </div>
              <button onClick={() => setIntlPayments(!intlPayments)} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${intlPayments ? 'bg-[#A3E635]' : 'bg-slate-300'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${intlPayments ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
