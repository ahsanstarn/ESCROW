import { useState } from 'react';
import AccountHeader from '@/components/layout/AccountHeader';
import { CreditCard } from 'lucide-react';

interface BuyerCardsProps {
  userId?: string;
  userName?: string;
}

const cards = [
  { name: 'Visa Business', number: '•••• 4819', expiry: '09/26', color: 'from-[#A3E635] to-[#78c800]', textColor: 'text-black', limit: '$10,000', spent: '$3,200' },
  { name: 'Mastercard', number: '•••• 8934', expiry: '11/25', color: 'from-teal-400 to-teal-600', textColor: 'text-white', limit: '$5,000', spent: '$1,800' },
  { name: 'Virtual Card', number: '•••• 7813', expiry: '03/27', color: 'from-slate-700 to-slate-900', textColor: 'text-white', limit: '$2,500', spent: '$950' },
];

export default function BuyerCards({ userId, userName }: BuyerCardsProps) {
  const [onlineTx, setOnlineTx] = useState(true);
  const [txNotifs, setTxNotifs] = useState(true);
  const [intlPayments, setIntlPayments] = useState(false);

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Cards</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your payment cards and limits</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cards.map((card, i) => (
            <div key={i} className={`rounded-2xl p-6 bg-gradient-to-br ${card.color} shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer`}>
              <div className="flex items-center justify-between mb-8">
                <span className={`text-sm font-bold tracking-wider ${card.textColor}`}>ESCROW</span>
                <CreditCard className={`w-6 h-6 ${card.textColor} opacity-50`} />
              </div>
              <p className={`text-lg font-mono tracking-widest mb-4 ${card.textColor}`}>{card.number}</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className={`text-[10px] ${card.textColor} opacity-60`}>CARD HOLDER</p>
                  <p className={`text-xs font-medium ${card.textColor}`}>BUYER ACCOUNT</p>
                </div>
                <div className="text-right">
                  <p className={`text-[10px] ${card.textColor} opacity-60`}>EXPIRES</p>
                  <p className={`text-xs font-medium ${card.textColor}`}>{card.expiry}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 flex justify-between">
                <div>
                  <p className={`text-[10px] ${card.textColor} opacity-60`}>LIMIT</p>
                  <p className={`text-xs font-bold ${card.textColor}`}>{card.limit}</p>
                </div>
                <div className="text-right">
                  <p className={`text-[10px] ${card.textColor} opacity-60`}>SPENT</p>
                  <p className={`text-xs font-bold ${card.textColor}`}>{card.spent}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-bold text-lg text-slate-900 mb-4">Card Settings</h2>
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
