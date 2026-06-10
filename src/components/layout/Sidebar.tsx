import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  LayoutGrid,
  ArrowLeftRight,
  Building2,
  User,
  X,
  ChevronsUpDown,
  Shield,
  Users,
  FileCheck,
  Store,
  ShoppingCart,
  Truck,
  HelpCircle,
} from 'lucide-react';
import { UserRole, User as UserType } from '@/types';
import { useTranslation } from '@/i18n';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

interface SidebarProps {
  currentRole: UserRole;
  currentUser?: UserType;
  mobileOpen: boolean;
  onMobileClose: () => void;
  onRoleChange: (role: UserRole) => void;
}

const ROLE_LABELS: Record<UserRole, string> = {
  MERCHANT: 'Merchant',
  BUYER: 'Buyer',
  COURIER: 'Courier',
  ADMIN: 'Admin',
  SELLER: 'Seller',
  AGENCY: 'Agency',
};

const ROLE_ICONS: Record<UserRole, React.ElementType> = {
  MERCHANT: Store,
  BUYER: ShoppingCart,
  COURIER: Truck,
  ADMIN: Shield,
  SELLER: Store,
  AGENCY: Building2,
};

const FALLBACK_ICON = HelpCircle;

const AVAILABLE_ROLES: UserRole[] = ['SELLER', 'BUYER', 'MERCHANT', 'AGENCY', 'COURIER', 'ADMIN'];

export function Sidebar({ currentRole, currentUser, mobileOpen, onMobileClose, onRoleChange }: SidebarProps) {
  const location = useLocation();
  const { t } = useTranslation();
  const [roleOpen, setRoleOpen] = useState(false);

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
    currentRole === 'SELLER' || currentRole === 'MERCHANT' ? [
      { path: `/${currentRole.toLowerCase()}`, label: 'Dashboard', icon: LayoutGrid },
      { path: `/${currentRole.toLowerCase()}/transactions`, label: 'Transactions', icon: ArrowLeftRight },
      { path: `/${currentRole.toLowerCase()}/bank-accounts`, label: 'Bank Accounts', icon: Building2 },
      { path: `/${currentRole.toLowerCase()}/profile`, label: 'Profile', icon: User },
    ] :
    currentRole === 'BUYER' ? [
      { path: '/buyer', label: 'Dashboard', icon: LayoutGrid },
      { path: '/buyer/transactions', label: 'Transactions', icon: ArrowLeftRight },
      { path: '/buyer/bank-accounts', label: 'Bank Accounts', icon: Building2 },
      { path: '/buyer/profile', label: 'Profile', icon: User },
    ] :
    currentRole === 'ADMIN' ? [
      { path: '/admin', label: 'Dashboard', icon: LayoutGrid },
      { path: '/admin/users', label: 'Users', icon: Users },
      { path: '/admin/kyc', label: 'KYC Verification', icon: FileCheck },
    ] :
    currentRole === 'COURIER' ? [
      { path: '/courier', label: 'Dashboard', icon: LayoutGrid },
    ] :
    currentRole === 'AGENCY' ? [
      { path: '/agency', label: 'Dashboard', icon: LayoutGrid },
    ] : [];

  const sidebarContent = (
    <>
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
            <span className="text-lg font-bold text-white leading-tight">Escro</span>
            <span className="text-[10px] tracking-wide text-[#A3E635] font-medium leading-tight">{ROLE_LABELS[currentRole]} View</span>
          </div>
        </Link>
      </div>

      <div className="px-3 md:px-4 mb-4">
        <div className="relative">
          <button
            onClick={() => setRoleOpen(!roleOpen)}
            className="w-full flex items-center gap-3 bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:border-[#444] transition-colors"
          >
            {(() => { const Icon = ROLE_ICONS[currentRole] || FALLBACK_ICON; return <Icon className="w-4 h-4 text-[#A3E635] flex-shrink-0" />; })()}
            <span className="flex-1 text-left">{ROLE_LABELS[currentRole]}</span>
            <ChevronsUpDown className={`w-4 h-4 text-slate-500 transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
          </button>
          {roleOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden z-50 shadow-xl">
              {AVAILABLE_ROLES.map((role) => {
                const Icon = ROLE_ICONS[role] || FALLBACK_ICON;
                return (
                  <button
                    key={role}
                    onClick={() => { onRoleChange(role); setRoleOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-[#252525] transition-colors ${
                      role === currentRole ? 'text-[#A3E635] bg-[#A3E635]/5' : 'text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{ROLE_LABELS[role]}</span>
                    {role === currentRole && <span className="ml-auto text-[10px] text-[#A3E635]">Current</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 px-2 md:px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== `/${currentRole.toLowerCase()}` && location.pathname.startsWith(item.path));
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
        </div>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden md:flex w-64 h-screen bg-[#111] border-r border-[#222] flex-col flex-shrink-0">
        {sidebarContent}
      </aside>

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
