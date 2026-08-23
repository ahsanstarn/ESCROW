import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { 
  ShieldCheck, MapPin, Star
} from 'lucide-react';

export default function BuyerExplore() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading explore..." />;
  }

  return (
    <div className="min-h-screen bg-[#ECF4E9]">
      <div className="p-6 lg:p-8 max-w-[1440px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col animate-fadeInUp" style={{ animation: 'fadeInUp 0.1s ease-out both' }}>
          <h1 className="text-2xl font-display font-bold text-slate-900">Explore</h1>
          <p className="text-sm text-slate-500 mt-1">Browse escrow-protected products from trusted sellers</p>
        </div>

        {/* Protection Banner */}
        <div className="bg-[#305941] rounded-2xl p-6 shadow-sm flex items-center justify-between relative overflow-hidden" style={{ animation: 'fadeInUp 0.2s ease-out both' }}>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#DDFC95]" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-white mb-1">Escrow Protected Shopping</h2>
              <p className="text-sm text-white/80">Pay safely. Seller is paid only after you confirm delivery. Your money is protected every step of the way.</p>
            </div>
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-50">
            <div className="w-4 h-4 rounded-full bg-white/30"></div>
            <div className="w-6 h-6 rounded-full bg-white/20"></div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#DDFC95]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDFC95]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDFC95]"></div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ animation: 'fadeInUp 0.3s ease-out both' }}>
          {['All Products', 'Electronics', 'Fashion', 'Home & Living', 'Sports'].map((cat, idx) => (
            <button key={idx} className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${idx === 0 ? 'bg-[#DDFC95] text-[#305941]' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: 1, name: 'Premium Wireless Headphones', price: '₹4,500', rating: '4.8', reviews: '234 reviews', loc: 'Mumbai', seller: 'TechStore', delay: '0.4s' },
            { id: 2, name: 'Designer Sneakers', price: '₹3,200', rating: '4.9', reviews: '456 reviews', loc: 'Delhi', seller: 'FootwearHub', delay: '0.5s' },
            { id: 3, name: 'Vintage Camera', price: '₹12,500', rating: '4.7', reviews: '89 reviews', loc: 'Bangalore', seller: 'CameraWorld', delay: '0.6s' },
            { id: 4, name: 'Leather Laptop Bag', price: '₹2,800', rating: '4.6', reviews: '512 reviews', loc: 'Pune', seller: 'BagBazaar', delay: '0.7s' },
            { id: 5, name: 'Smart Watch Pro', price: '₹8,900', rating: '4.8', reviews: '567 reviews', loc: 'Mumbai', seller: 'WearTech', delay: '0.8s' },
            { id: 6, name: 'Mechanical Keyboard', price: '₹5,400', rating: '4.9', reviews: '423 reviews', loc: 'Bangalore', seller: 'KeyMasters', delay: '0.9s' },
          ].map((prod) => (
            <div key={prod.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col" style={{ animation: `fadeInUp ${prod.delay} ease-out both` }}>
              <div className="h-48 bg-slate-200 relative">
                <div className="absolute inset-0 bg-slate-800/10"></div>
                <div className="absolute top-4 right-4 bg-[#305941] text-white text-[10px] font-semibold px-2 py-1 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#DDFC95]" /> Protected
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display font-bold text-slate-900 mb-2">{prod.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1 bg-[#F9FBE7] px-1.5 py-0.5 rounded text-[10px] font-bold text-[#305941]">
                    <Star className="w-3 h-3 fill-[#305941]" /> {prod.rating}
                  </div>
                  <span className="text-[10px] text-slate-400">({prod.reviews})</span>
                </div>
                <div className="flex items-end justify-between mt-auto pt-4 border-t border-slate-50">
                  <div>
                    <h2 className="text-xl font-display font-bold text-slate-900 mb-1">{prod.price}</h2>
                    <p className="text-[10px] text-slate-500">Sold by <span className="font-semibold text-slate-700">{prod.seller}</span></p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="flex items-center gap-1 text-[10px] bg-[#DDFC95]/30 text-[#305941] px-2 py-1 rounded font-medium">
                      <MapPin className="w-3 h-3" /> {prod.loc}
                    </span>
                    <button className="px-4 py-1.5 bg-[#DDFC95] text-[#305941] text-xs font-bold rounded-lg hover:bg-[#cbf07b] transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How Escrow Works Footer */}
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 mt-8" style={{ animation: 'fadeInUp 1s ease-out both' }}>
          <h2 className="text-lg font-display font-bold text-slate-900 mb-8">How Escrow Protection Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#DDFC95] flex items-center justify-center text-2xl font-bold text-[#305941] mb-4 relative">
                1
                <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full translate-x-1 -translate-y-1"></div>
              </div>
              <h3 className="font-display font-bold text-slate-900 text-sm mb-2">Payment Held Securely</h3>
              <p className="text-xs text-slate-500 max-w-[250px]">Your payment is held in escrow. The seller cannot access funds until delivery is confirmed.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#0B406B] flex items-center justify-center text-2xl font-bold text-white mb-4 relative">
                2
                <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full translate-x-1 -translate-y-1"></div>
              </div>
              <h3 className="font-display font-bold text-slate-900 text-sm mb-2">Receive & Inspect</h3>
              <p className="text-xs text-slate-500 max-w-[250px]">Get your item delivered. You have time to inspect and confirm everything is as expected.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#305941] flex items-center justify-center text-2xl font-bold text-white mb-4 relative">
                3
                <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full translate-x-1 -translate-y-1"></div>
              </div>
              <h3 className="font-display font-bold text-slate-900 text-sm mb-2">Confirm & Release</h3>
              <p className="text-xs text-slate-500 max-w-[250px]">Once satisfied, confirm delivery. Funds are released to the seller. Your purchase is protected.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
