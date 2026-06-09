import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutGrid,
  Package,
  Wallet,
  DollarSign,
  AlertTriangle,
  BarChart3,
  Code2,
  Settings,
  Shield,
  HelpCircle,
  Bell,
  ChevronDown,
  ArrowLeftRight,
  CreditCard,
} from 'lucide-react';
import { UserRole, User } from '@/types';

interface SidebarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentUser?: User;
}

const ROLE_LABELS: Record<UserRole, string> = {
  MERCHANT: 'Merchant',
  BUYER: 'Buyer',
  COURIER: 'Courier',
  ADMIN: 'Admin',
  SELLER: 'Seller',
  AGENCY: 'Agency',
};

const SELLER_NAV = [
  { path: '/seller', label: 'Overview', icon: LayoutGrid },
  { path: '/seller/orders', label: 'Orders', icon: Package },
  { path: '/seller/wallet', label: 'Wallet & Payouts', icon: Wallet },
  { path: '/seller/disputes', label: 'Disputes', icon: AlertTriangle },
  { path: '/seller/analytics', label: 'Analytics & Trust', icon: BarChart3 },
  { path: '/seller/api', label: 'API & Webhooks', icon: Code2 },
  { path: '/seller/settings', label: 'Settings & Compliance', icon: Settings },
  { path: '/seller/help', label: 'Help & Support', icon: HelpCircle },
];

const AGENCY_NAV = [
  { path: '/agency', label: 'Overview', icon: LayoutGrid },
  { path: '/agency/bulk-orders', label: 'Bulk Orders', icon: Package },
  { path: '/agency/escrow-finance', label: 'Escrow & Finance', icon: DollarSign },
  { path: '/agency/disputes', label: 'Disputes & Risk', icon: AlertTriangle },
  { path: '/agency/reports', label: 'Reports', icon: BarChart3 },
  { path: '/agency/api', label: 'API', icon: Code2 },
  { path: '/help', label: 'Help & Support', icon: HelpCircle },
];

const BUYER_NAV = [
  { path: '/buyer', label: 'Overview', icon: LayoutGrid },
  { path: '/buyer/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/buyer/cards', label: 'Cards', icon: CreditCard },
  { path: '/buyer/settings', label: 'Settings', icon: Settings },
  { path: '/help', label: 'Help Center', icon: HelpCircle },
];

const OTHER_NAV: Record<UserRole, { path: string; label: string; icon: React.ElementType }[]> = {
  MERCHANT: [
    { path: '/merchant', label: 'Home', icon: LayoutGrid },
  ],
  BUYER: [],
  COURIER: [
    { path: '/courier', label: 'Home', icon: LayoutGrid },
  ],
  ADMIN: [
    { path: '/admin', label: 'Home', icon: LayoutGrid },
  ],
  SELLER: [],
  AGENCY: [],
};

export function Sidebar({ currentRole, onRoleChange, currentUser }: SidebarProps) {
  const location = useLocation();
  const [roleOpen, setRoleOpen] = useState(false);

  const navItems =
    currentRole === 'SELLER' ? SELLER_NAV :
    currentRole === 'AGENCY' ? AGENCY_NAV :
    currentRole === 'BUYER' ? BUYER_NAV :
    OTHER_NAV[currentRole] || [];

  return (
    <aside className="w-64 h-screen bg-[#111] border-r border-[#222] flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#A3E635] rounded-xl flex items-center justify-center overflow-hidden relative">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0" stroke="black" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 16c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0" stroke="black" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 8c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0" stroke="black" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white leading-tight">Escrow</span>
            <span className="text-[9px] tracking-widest text-slate-500 uppercase leading-tight">Payment Protection</span>
          </div>
        </Link>
      </div>

      {/* Role Switcher */}
      <div className="px-4 mb-4">
        <div className="relative">
          <button
            onClick={() => setRoleOpen(!roleOpen)}
            className="w-full flex items-center justify-between bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:border-[#444] transition-colors"
          >
            <span>{ROLE_LABELS[currentRole]} View</span>
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
          </button>
          {roleOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden z-50">
              {(Object.keys(ROLE_LABELS) as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    onRoleChange(role);
                    setRoleOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-[#252525] transition-colors ${
                    role === currentRole ? 'text-[#A3E635]' : 'text-slate-300'
                  }`}
                >
                  {ROLE_LABELS[role]} View
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/seller' && item.path !== '/agency' && item.path !== '/buyer' && item.path !== '/help' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 border-l-2 ${
                isActive
                  ? 'border-l-[#A3E635] bg-[#A3E635]/10 text-[#A3E635]'
                  : 'border-l-transparent text-slate-400 hover:text-slate-200 hover:bg-[#1a1a1a]'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Account */}
      <div className="p-4 border-t border-[#222]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#A3E635] flex items-center justify-center text-xs font-semibold text-black">
            {currentUser?.name?.split(' ').map(n => n[0]).join('') || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentUser?.name || 'Account'}</p>
            <p className="text-[11px] text-slate-500">ID: {currentUser?.id || 'acc_12345'}</p>
          </div>
          <button className="p-1.5 rounded-md hover:bg-[#1a1a1a] text-slate-400 hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
