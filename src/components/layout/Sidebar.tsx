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

export function Sidebar({ currentRole, mobileOpen, onMobileClose, onRoleChange }: SidebarProps) {
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
      { path: `/${currentRole.toLowerCase()}`, label: 'Overview', icon: LayoutGrid },
      { path: `/${currentRole.toLowerCase()}/transactions`, label: 'Orders', icon: Store },
      { path: `/${currentRole.toLowerCase()}/bank-accounts`, label: 'Wallet & Payouts', icon: Building2 },
      { path: `/${currentRole.toLowerCase()}/disputes`, label: 'Disputes', icon: Shield },
      { path: `/${currentRole.toLowerCase()}/analytics`, label: 'Analytics & Trust', icon: FileCheck },
      { path: `/${currentRole.toLowerCase()}/api`, label: 'API & Webhooks', icon: ArrowLeftRight },
      { path: `/${currentRole.toLowerCase()}/profile`, label: 'Settings & Compliance', icon: User },
    ] :
    currentRole === 'BUYER' ? [
      { path: '/buyer', label: 'Overview', icon: LayoutGrid },
      { path: '/buyer/explore', label: 'Explore', icon: Store },
      { path: '/buyer/transactions', label: 'My Orders', icon: ShoppingCart },
      { path: '/buyer/bank-accounts', label: 'Wallet', icon: Building2 },
    ] :
    currentRole === 'ADMIN' ? [
      { path: '/admin', label: 'Dashboard', icon: LayoutGrid },
      { path: '/admin/users', label: 'Users', icon: Users },
      { path: '/admin/kyc', label: 'KYC Verification', icon: FileCheck },
    ] :
    currentRole === 'AGENCY' ? [
      { path: '/agency', label: 'Overview', icon: LayoutGrid },
      { path: '/agency/bulk-orders', label: 'Bulk Orders', icon: Store },
      { path: '/agency/finance', label: 'Escrow & Finance', icon: Building2 },
      { path: '/agency/disputes', label: 'Disputes & Risk', icon: Shield },
      { path: '/agency/reports', label: 'Reports', icon: FileCheck },
      { path: '/agency/api', label: 'API', icon: ArrowLeftRight },
    ] : [];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b border-slate-100">
        <Link to="/" className="flex items-center gap-3" onClick={onMobileClose}>
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M4 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0" stroke="#DDFC95" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 16c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0" stroke="#DDFC95" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 8c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0" stroke="#DDFC95" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900 leading-tight">Escrow</span>
            <span className="text-[10px] tracking-wide text-slate-500 font-medium leading-tight uppercase">Payment Protection</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== `/${currentRole.toLowerCase()}` && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onMobileClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-escrow-primary text-black shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}

        <div className="pt-8 mt-8 border-t border-slate-100">
          <Link
            to="/help"
            onClick={onMobileClose}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-150"
          >
            <HelpCircle className="w-5 h-5 flex-shrink-0" />
            Help & Support
          </Link>
        </div>
      </nav>
      
      {/* Role Switcher (Hidden in actual UI but keeping for dev functionality) */}
      <div className="p-4 border-t border-slate-100">
        <div className="relative">
          <button
            onClick={() => setRoleOpen(!roleOpen)}
            className="w-full flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600 hover:border-slate-300 transition-colors"
          >
            <span className="flex-1 text-left">View: {ROLE_LABELS[currentRole]}</span>
            <ChevronsUpDown className="w-3 h-3 text-slate-400" />
          </button>
          {roleOpen && (
            <div className="absolute bottom-full mb-1 left-0 right-0 bg-white border border-slate-200 rounded-lg overflow-hidden z-50 shadow-xl">
              {AVAILABLE_ROLES.map((role) => (
                <button
                  key={role}
                  onClick={() => { onRoleChange(role); setRoleOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 ${role === currentRole ? 'text-black font-semibold' : 'text-slate-600'}`}
                >
                  {ROLE_LABELS[role]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex w-64 h-screen bg-white border-r border-slate-200 flex-col flex-shrink-0 z-10">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onMobileClose} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white border-r border-slate-200 flex flex-col animate-slide-in-left">
            <button
              onClick={onMobileClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-black transition-colors"
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
