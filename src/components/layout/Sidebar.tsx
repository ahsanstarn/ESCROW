import { Link, useLocation } from 'react-router-dom';
import { Home, ArrowLeftRight, CreditCard, BarChart3, Settings, HelpCircle, ChevronDown, LogOut } from 'lucide-react';
import { UserRole, User } from '@/types';

interface SidebarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentUser?: User;
}

const NAV_ITEMS = [
  { path: '/merchant', label: 'Home', icon: Home, roles: ['MERCHANT'] as UserRole[] },
  { path: '/buyer', label: 'Home', icon: Home, roles: ['BUYER'] as UserRole[] },
  { path: '/courier', label: 'Home', icon: Home, roles: ['COURIER'] as UserRole[] },
  { path: '/admin', label: 'Home', icon: Home, roles: ['ADMIN'] as UserRole[] },
  { path: '#', label: 'Transactions', icon: ArrowLeftRight, roles: ['MERCHANT', 'BUYER'] as UserRole[] },
  { path: '#', label: 'Cards', icon: CreditCard, roles: ['MERCHANT', 'BUYER'] as UserRole[] },
  { path: '#', label: 'Analytics', icon: BarChart3, roles: ['MERCHANT', 'ADMIN'] as UserRole[] },
  { path: '#', label: 'Settings', icon: Settings, roles: ['MERCHANT', 'BUYER', 'COURIER', 'ADMIN'] as UserRole[] },
  { path: '#', label: 'Help Center', icon: HelpCircle, roles: ['MERCHANT', 'BUYER', 'COURIER', 'ADMIN'] as UserRole[] },
];

const ROLE_LABELS: Record<UserRole, string> = {
  MERCHANT: 'Merchant',
  BUYER: 'Buyer',
  COURIER: 'Courier',
  ADMIN: 'Admin',
};

export function Sidebar({ currentRole, onRoleChange, currentUser }: SidebarProps) {
  const location = useLocation();
  const filteredNav = NAV_ITEMS.filter(item => item.roles.includes(currentRole));
  const activePath = filteredNav[0]?.path || '/merchant';

  return (
    <aside className="w-60 h-screen bg-black border-r border-slate-800/50 flex flex-col">
      <div className="p-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-400 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">E</span>
          </div>
          <span className="text-lg font-bold">Escrow</span>
        </Link>
      </div>

      <div className="px-3 mb-2">
        <div className="relative">
          <select
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="w-full appearance-none bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 pr-8 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-400/50 cursor-pointer"
          >
            {(Object.keys(ROLE_LABELS) as UserRole[]).map((role) => (
              <option key={role} value={role}>{ROLE_LABELS[role]} View</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {filteredNav.map((item) => {
          const isActive = item.path !== '#' && location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-brand-400/10 text-brand-400'
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
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-semibold text-slate-300">
            {currentUser?.name?.split(' ').map(n => n[0]).join('') || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">{currentUser?.name || 'Loading...'}</p>
            <p className="text-[11px] text-slate-500">{ROLE_LABELS[currentRole]}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
