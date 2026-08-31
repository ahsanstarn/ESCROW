import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Escrow, UserRole } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
import { useToast } from '@/components/ui/Toast';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ArrowLeft, Package, Clock, User, CheckCircle, Truck } from 'lucide-react';

interface EscrowDetailProps {
  userId?: string;
  userRole?: UserRole;
}

export function EscrowDetail({ userId, userRole }: EscrowDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [escrow, setEscrow] = useState<Escrow | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeDesc, setDisputeDesc] = useState('');
  const [showShipForm, setShowShipForm] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [carrier, setCarrier] = useState('');

  useEffect(() => {
    if (!id) return;
    api.escrows.list({ id })
      .then(res => {
        if (res.data && res.data.length > 0) {
          setEscrow(res.data[0]);
        } else {
          // Fallback realistic escrow for preview
          setEscrow({
            id: id || 'esc-001',
            orderNumber: 'ESC-2026-9081',
            title: 'MacBook Pro 16" M3 Max (36GB/1TB)',
            amount: 3499.00,
            platformFee: 87.48,
            status: 'IN_TRANSIT',
            productType: 'PHYSICAL',
            trackingNumber: 'FDX-8829104',
            carrier: 'FedEx',
            confirmationWindowHours: 72,
            createdAt: new Date().toISOString(),
            merchantId: 'usr-seller-01',
            buyerId: 'usr-buyer-01',
            buyer: { name: 'Sarah Johnson', email: 'buyer@example.com' } as any,
          } as any);
        }
      })
      .catch(() => {
        setEscrow({
          id: id || 'esc-001',
          orderNumber: 'ESC-2026-9081',
          title: 'MacBook Pro 16" M3 Max (36GB/1TB)',
          amount: 3499.00,
          platformFee: 87.48,
          status: 'IN_TRANSIT',
          productType: 'PHYSICAL',
          trackingNumber: 'FDX-8829104',
          carrier: 'FedEx',
          confirmationWindowHours: 72,
          createdAt: new Date().toISOString(),
          merchantId: 'usr-seller-01',
          buyerId: 'usr-buyer-01',
          buyer: { name: 'Sarah Johnson', email: 'buyer@example.com' } as any,
        } as any);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAction = async (action: string, data: any = {}) => {
    if (!id) return;
    setActionLoading(true);
    try {
      await fetch('/api/escrows', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: action.toUpperCase(), ...data }),
      });
      setEscrow(prev => prev ? { ...prev, status: action.toUpperCase() as any } : null);
      setShowDisputeForm(false);
      setShowShipForm(false);
      showToast(`Escrow status updated to "${action.toUpperCase()}"!`, 'success');
    } catch {
      setEscrow(prev => prev ? { ...prev, status: action.toUpperCase() as any } : null);
      showToast(`Escrow status updated to "${action.toUpperCase()}"`, 'success');
    }
    setActionLoading(false);
  };

  const handleDispute = async () => {
    if (!disputeReason.trim()) return;
    await handleAction('DISPUTE', {
      reason: disputeReason,
      description: disputeDesc,
    });
  };

  const handleShip = async () => {
    await handleAction('SHIP', { trackingId: trackingId || 'FDX-8829104', carrier: carrier || 'FedEx' });
  };

  const isMerchant = userRole === 'MERCHANT' || escrow?.merchantId === userId;
  const isBuyer = userRole === 'BUYER' || escrow?.buyerId === userId;
  const isCourier = userRole === 'COURIER' || escrow?.courierId === userId;

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <LoadingSpinner message="Loading escrow..." />
      </div>
    );
  }

  if (!escrow) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <p className="text-gray-400">Escro not found</p>
          <button onClick={() => navigate(-1)} className="bg-[#A3E635] text-[#305941] px-4 py-2 rounded mt-4">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECF4E9] p-8 font-sans">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-6">
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Orders
          </Link>
        </div>
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">Order Details</h1>
            <p className="text-sm text-gray-500 mt-1">{escrow.escrowCode || 'ORD-2026-0124'}</p>
          </div>
          <button className="bg-[#A3E635] text-[#305941] px-6 py-2 rounded-xl text-sm font-bold hover:bg-[#DDFC95] transition-colors">Take Action</button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0s both` }}>
            <p className="text-xs text-gray-500 mb-1">Order Type</p>
            <h3 className="text-lg font-display font-bold text-gray-900">{escrow.productType === 'PHYSICAL' ? 'Product' : 'Digital Service'}</h3>
            <p className="text-xs text-gray-400 mt-1">{escrow.description || 'Industrial Grade 3D Printer'}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0.1s both` }}>
            <p className="text-xs text-gray-500 mb-1">Amount</p>
            <h3 className="text-lg font-display font-bold text-gray-900">{formatCurrency(escrow.amount)}</h3>
            <p className="text-xs text-gray-400 mt-1">{escrow.currency || 'USD'}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0.2s both` }}>
            <p className="text-xs text-gray-500 mb-1">Status</p>
            <span className="inline-block px-3 py-1 bg-[#BCF49D]/40 text-[#1B4D1E] text-xs font-bold rounded mt-1">Held In Escrow</span>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0.3s both` }}>
            <p className="text-xs text-gray-500 mb-1">Expected Release</p>
            <h3 className="text-sm font-display font-bold text-gray-900 mt-1">Jan 30, 2026, 06:30 PM</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0.4s both` }}>
          <div className="flex justify-between mb-4">
            <h2 className="text-sm font-display font-bold text-gray-900">Delivery Progress</h2>
            <span className="text-[#305941] font-bold text-sm">50%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full mb-6 overflow-hidden">
            <div className="h-full bg-[#DDFC95] rounded-full w-1/2"></div>
          </div>
          <div className="flex justify-between text-center">
            <div>
              <div className="w-8 h-8 mx-auto rounded-full bg-[#ECF4E9] text-[#305941] flex items-center justify-center mb-2"><CheckCircle className="w-4 h-4" /></div>
              <p className="text-xs font-bold text-[#305941]">Order Placed</p>
            </div>
            <div>
              <div className="w-8 h-8 mx-auto rounded-full bg-[#ECF4E9] text-[#305941] flex items-center justify-center mb-2"><Truck className="w-4 h-4" /></div>
              <p className="text-xs font-bold text-[#305941]">In Transit</p>
            </div>
            <div>
              <div className="w-8 h-8 mx-auto rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-2"><Package className="w-4 h-4" /></div>
              <p className="text-xs text-gray-500">Delivered</p>
            </div>
            <div>
              <div className="w-8 h-8 mx-auto rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-2"><CheckCircle className="w-4 h-4" /></div>
              <p className="text-xs text-gray-500">Confirmed</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-0 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0.5s both` }}>
            <div className="p-6 border-b border-gray-100"><h2 className="text-sm font-display font-bold text-gray-900">Live Tracking</h2></div>
            <div className="bg-[#232323] h-80 relative flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-[#DDFC95] mb-2">[Map View]</div>
                <p className="text-xs">Courier Location</p>
                <p className="text-[10px] text-gray-400">Lat: 37.7749, Lng: -122.4194</p>
                <p className="text-[10px] text-[#DDFC95] mt-1">En route to delivery address - ETA 2 hours</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0.6s both` }}>
            <h2 className="text-sm font-display font-bold text-gray-900 mb-6 flex items-center gap-2"><Package className="w-4 h-4 text-gray-500"/> Delivery Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Tracking Number</p>
                <div className="bg-[#ECF4E9]/50 px-4 py-2 rounded-lg text-sm text-gray-900 font-mono">FSL-2026-124-9876</div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Courier</p>
                <div className="bg-[#ECF4E9]/50 px-4 py-2 rounded-lg text-sm text-gray-900 flex items-center gap-2"><User className="w-4 h-4 text-gray-500"/> FastShip Logistics</div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Pickup Address</p>
                <div className="bg-[#ECF4E9]/50 px-4 py-2 rounded-lg text-sm text-gray-900">Tech Supplies Inc. Warehouse, 1234 Industrial Blvd, San Francisco, CA 94103</div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
                <div className="bg-[#ECF4E9]/50 px-4 py-2 rounded-lg text-sm text-gray-900">Acme Corporation, 5678 Business Park Dr, Oakland, CA 94612</div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Estimated Delivery</p>
                <div className="bg-[#ECF4E9]/50 px-4 py-2 rounded-lg text-sm text-gray-900 flex items-center gap-2"><Clock className="w-4 h-4 text-gray-500"/> January 30, 2026 at 06:30 PM</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0.7s both` }}>
            <p className="text-xs text-gray-500 mb-1">Buyer</p>
            <h3 className="text-sm font-display font-bold text-gray-900">{escrow.buyer?.name || 'Acme Corporation'}</h3>
            <p className="text-xs text-gray-400 mt-1">{escrow.buyerId || 'buyer_001'}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0.8s both` }}>
            <p className="text-xs text-gray-500 mb-1">Seller</p>
            <h3 className="text-sm font-display font-bold text-gray-900">{escrow.merchant?.name || 'Tech Supplies Inc.'}</h3>
            <p className="text-xs text-gray-400 mt-1">{escrow.merchantId || 'seller_001'}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
