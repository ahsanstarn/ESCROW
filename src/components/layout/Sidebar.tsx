import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  Menu,
  X,
} from 'lucide-react';
import { UserRole, User } from '@/types';
import { useTranslation } from '@/i18n';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

interface SidebarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentUser?: User;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const ROLE_LABELS: Record<UserRole, string> = {
  MERCHANT: 'Merchant',
  BUYER: 'Buyer',
  COURIER: 'Courier',
  ADMIN: 'Admin',
  SELLER: 'Seller',
  AGENCY: 'Agency',
};

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

export function Sidebar({ currentRole, onRoleChange, currentUser, mobileOpen, onMobileClose }: SidebarProps) {
  const location = useLocation();
  const [roleOpen, setRoleOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    onMobileClose();
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navItems =
    currentRole === 'SELLER' ? [
      { path: '/seller', label: t.dashboard.overview, icon: LayoutGrid },
      { path: '/seller/orders', label: t.dashboard.orders, icon: Package },
      { path: '/seller/wallet', label: t.dashboard.wallet, icon: Wallet },
      { path: '/seller/disputes', label: t.dashboard.disputes, icon: AlertTriangle },
      { path: '/seller/analytics', label: t.dashboard.analytics, icon: BarChart3 },
      { path: '/seller/api', label: t.dashboard.api, icon: Code2 },
      { path: '/seller/settings', label: t.dashboard.settings, icon: Settings },
      { path: '/help', label: t.dashboard.help, icon: HelpCircle },
    ] :
    currentRole === 'AGENCY' ? [
      { path: '/agency', label: t.dashboard.overview, icon: LayoutGrid },
      { path: '/agency/bulk-orders', label: t.dashboard.bulkOrders, icon: Package },
      { path: '/agency/escrow-finance', label: t.dashboard.escrowFinance, icon: DollarSign },
      { path: '/agency/disputes', label: t.dashboard.disputes, icon: AlertTriangle },
      { path: '/agency/reports', label: t.dashboard.reports, icon: BarChart3 },
      { path: '/agency/api', label: t.dashboard.api, icon: Code2 },
      { path: '/help', label: t.dashboard.help, icon: HelpCircle },
    ] :
    currentRole === 'BUYER' ? [
      { path: '/buyer', label: t.dashboard.overview, icon: LayoutGrid },
      { path: '/buyer/transactions', label: t.dashboard.transactions, icon: ArrowLeftRight },
      { path: '/buyer/cards', label: t.dashboard.cards, icon: CreditCard },
      { path: '/buyer/settings', label: t.dashboard.settings, icon: Settings },
      { path: '/help', label: t.dashboard.help, icon: HelpCircle },
    ] :
    OTHER_NAV[currentRole] || [];

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-4 md:p-6">
        <Link to="/" className="flex items-center gap-3" onClick={onMobileClose}>
          <div className="w-10 h-10 bg-[#A3E635] rounded-xl flex items-center justify-center overflow-hidden relative flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0" stroke="black" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 16c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0" stroke="black" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 8c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0" stroke="black" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white leading-tight">Escrow</span>
            <span className="text-[10px] tracking-wide text-[#A3E635] font-medium leading-tight">{ROLE_LABELS[currentRole]} View</span>
          </div>
        </Link>
      </div>

      {/* Role Switcher */}
      <div className="px-3 md:px-4 mb-4">
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
      <nav className="flex-1 px-2 md:px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/seller' && item.path !== '/agency' && item.path !== '/buyer' && item.path !== '/help' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onMobileClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 border-l-2 ${
                isActive
                  ? 'border-l-[#A3E635] bg-[#A3E635]/10 text-[#A3E635]'
                  : 'border-l-transparent text-slate-400 hover:text-slate-200 hover:bg-[#1a1a1a]'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Account */}
      <div className="p-3 md:p-4 border-t border-[#222]">
        <div className="mb-3">
          <LanguageSwitcher />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#A3E635] flex items-center justify-center text-xs font-semibold text-black flex-shrink-0">
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
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 h-screen bg-[#111] border-r border-[#222] flex-col flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onMobileClose} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-[#111] border-r border-[#222] flex flex-col animate-slide-in-left">
            <button
              onClick={onMobileClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-[#1a1a1a] text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
