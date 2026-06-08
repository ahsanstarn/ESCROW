import { Link, useLocation } from 'react-router-dom';
import { Shield, Store, ShoppingCart, Truck, Settings, ChevronDown, Lock } from 'lucide-react';
import { UserRole, User } from '@/types';

interface SidebarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentUser?: User;
}

const NAV_ITEMS: Record<UserRole, Array<{ path: string; label: string; icon: any }>> = {
  MERCHANT: [{ path: '/merchant', label: 'Dashboard', icon: Store }],
  BUYER: [{ path: '/buyer', label: 'Dashboard', icon: ShoppingCart }],
  COURIER: [{ path: '/courier', label: 'Dashboard', icon: Truck }],
  ADMIN: [{ path: '/admin', label: 'Dashboard', icon: Settings }],
};

const ROLE_LABELS: Record<UserRole, string> = {
  MERCHANT: 'Merchant',
  BUYER: 'Buyer',
  COURIER: 'Courier',
  ADMIN: 'Admin',
};

export function Sidebar({ currentRole, onRoleChange, currentUser }: SidebarProps) {
  const location = useLocation();
  const navItems = NAV_ITEMS[currentRole];

  return (
    <aside className="w-64 h-screen bg-slate-900/80 border-r border-slate-800/50 flex flex-col">
      <div className="p-5 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-escrow-600/20 rounded-lg flex items-center justify-center border border-escrow-600/30">
            <Shield className="w-5 h-5 text-escrow-400" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-100">Escrow Trust</h1>
            <p className="text-[11px] text-slate-500">Financial Infrastructure</p>
          </div>
        </div>
      </div>

      <div className="p-3 border-b border-slate-800/50">
        <div className="relative">
          <select
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="w-full appearance-none bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2.5 pr-8 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-escrow-500/50 cursor-pointer"
          >
            {(Object.keys(ROLE_LABELS) as UserRole[]).map((role) => (
              <option key={role} value={role}>{ROLE_LABELS[role]} View</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-escrow-600/15 text-escrow-400 border border-escrow-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-800/50">
        <div className="card p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300">
              {currentUser?.name?.split(' ').map(n => n[0]).join('') || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">{currentUser?.name || 'Loading...'}</p>
              <p className="text-[11px] text-slate-500">{ROLE_LABELS[currentRole]}</p>
            </div>
            <Lock className="w-3.5 h-3.5 text-slate-600" />
          </div>
        </div>
      </div>
    </aside>
  );
}
