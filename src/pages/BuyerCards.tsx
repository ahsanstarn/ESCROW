import { Bell, User, CreditCard } from 'lucide-react';

const cards = [
  { name: 'Visa Business', number: '•••• 4819', expiry: '09/26', color: 'from-[#A3E635] to-[#78c800]', textColor: 'text-black', limit: '$10,000', spent: '$3,200' },
  { name: 'Mastercard', number: '•••• 8934', expiry: '11/25', color: 'from-teal-400 to-teal-600', textColor: 'text-white', limit: '$5,000', spent: '$1,800' },
  { name: 'Virtual Card', number: '•••• 7813', expiry: '03/27', color: 'from-slate-700 to-slate-900', textColor: 'text-white', limit: '$2,500', spent: '$950' },
];

export default function BuyerCards() {
  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Cards</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your payment cards and limits</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-[#A3E635] text-black font-semibold text-sm rounded-lg hover:bg-[#b8ed5a] transition-colors">
              + Add New Card
            </button>
            <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 shadow-sm relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">3</span>
            </button>
            <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-[#A3E635] flex items-center justify-center">
                <User className="w-4 h-4 text-black" />
              </div>
              <span className="text-sm font-medium text-slate-700">Buyer</span>
            </div>
          </div>
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
          <h2 className="font-bold text-slate-900 mb-4">Card Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-sm text-slate-900">Online Transactions</p>
                <p className="text-xs text-slate-500">Allow cards to be used for online payments</p>
              </div>
              <div className="w-12 h-6 bg-[#A3E635] rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-sm text-slate-900">Transaction Notifications</p>
                <p className="text-xs text-slate-500">Get notified for every card transaction</p>
              </div>
              <div className="w-12 h-6 bg-[#A3E635] rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-sm text-slate-900">International Payments</p>
                <p className="text-xs text-slate-500">Allow cards to be used for international transactions</p>
              </div>
              <div className="w-12 h-6 bg-slate-300 rounded-full relative cursor-pointer">
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
