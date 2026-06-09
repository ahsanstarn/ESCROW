import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n';
import { Sidebar } from './components/layout/Sidebar';
import { MerchantDashboard } from './pages/MerchantDashboard';
import { CourierDashboard } from './pages/CourierDashboard';
import SellerDashboard from './pages/SellerDashboard';
import SellerOrders from './pages/SellerOrders';
import BuyerOverview from './pages/BuyerOverview';
import BuyerTransactions from './pages/BuyerTransactions';
import BankAccounts from './pages/BankAccounts';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminUserDetail from './pages/AdminUserDetail';
import AdminKyc from './pages/AdminKyc';
import { EscrowDetail } from './pages/EscrowDetail';
import { DisputeDetail } from './pages/DisputeDetail';
import AuthCallback from './pages/AuthCallback';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Careers from './pages/Careers';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import HelpCenter from './pages/HelpCenter';
import Privacy from './pages/Privacy';
import { Terms } from './pages/Terms';
import { useState, useEffect, useCallback } from 'react';
import { UserRole, User } from './types';
import { api } from './lib/api';
import { useAuth } from './hooks/useAuth';
import { Menu, Bell } from 'lucide-react';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { ToastProvider, useToast } from './components/ui/Toast';
import { LoadingScreen } from './components/ui/LoadingSpinner';

function MobileHeader({ onMenuToggle }: { onMenuToggle: () => void }) {
  return (
    <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#111] border-b border-[#222] sticky top-0 z-40">
      <button onClick={onMenuToggle} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a1a1a] transition-colors">
        <Menu className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-[#A3E635] rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <path d="M2 16c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0" stroke="black" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <span className="text-sm font-bold text-white">Escrow</span>
      </div>
      <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a1a1a] transition-colors relative">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>
    </div>
  );
}

function DashboardLayout() {
  const navigate = useNavigate();
  const { session, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('escrow_role');
    return (saved as UserRole) || 'SELLER';
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const fetchUser = useCallback(async () => {
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }
    const sessionRole = session.user?.user_metadata?.role?.toLowerCase() as UserRole | undefined;
    const sessionName = session.user?.user_metadata?.name || session.user?.email;

    try {
      let res = await api.users.list();
      if (res.data.length === 0) {
        try {
          await fetch('/api/seed', { method: 'POST' });
          res = await api.users.list();
        } catch {
          showToast('Failed to initialize platform data', 'error');
        }
      }
      const matched = res.data.find((u: User) => u.email === session.user?.email);
      if (matched) {
        setCurrentUser(matched);
        const savedRole = localStorage.getItem('escrow_role') as UserRole;
        if (!savedRole) setCurrentRole(matched.role);
      } else {
        const fallbackRole = sessionRole || 'SELLER';
        setCurrentUser({ id: session.user?.id || '', email: session.user?.email || '', name: sessionName, role: fallbackRole, kycStatus: 'VERIFIED', riskScore: 0, trustScore: 80, createdAt: new Date().toISOString() });
        const savedRole = localStorage.getItem('escrow_role') as UserRole;
        if (!savedRole) setCurrentRole(fallbackRole);
      }
    } catch {
      const fallbackRole = sessionRole || 'SELLER';
      setCurrentUser({ id: session.user?.id || '', email: session.user?.email || '', name: sessionName, role: fallbackRole, kycStatus: 'VERIFIED', riskScore: 0, trustScore: 80, createdAt: new Date().toISOString() });
      const savedRole = localStorage.getItem('escrow_role') as UserRole;
      if (!savedRole) setCurrentRole(fallbackRole);
      showToast('Could not load user data. Using default profile.', 'info');
    }
    setLoading(false);
  }, [session, showToast]);

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    localStorage.setItem('escrow_role', role);
    navigate(`/${role.toLowerCase()}`, { replace: true });
  };

  useEffect(() => {
    if (!authLoading) {
      if (!session) {
        navigate('/login', { replace: true });
        return;
      }
      fetchUser();
    }
  }, [session, authLoading, fetchUser, navigate]);

  if (authLoading || loading) {
    return <LoadingScreen />;
  }

  if (!session) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      <Sidebar currentRole={currentRole} currentUser={currentUser || undefined} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} onRoleChange={handleRoleChange} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <MobileHeader onMenuToggle={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to={`/${currentRole.toLowerCase()}`} replace />} />

            <Route path="/seller" element={<SellerDashboard userId={currentUser?.id} userName={currentUser?.name} />} />
            <Route path="/seller/transactions" element={<SellerOrders userId={currentUser?.id} userName={currentUser?.name} />} />
            <Route path="/seller/bank-accounts" element={<BankAccounts userId={currentUser?.id} userName={currentUser?.name} role="seller" />} />
            <Route path="/seller/profile" element={<Profile userId={currentUser?.id} userName={currentUser?.name} role="seller" />} />

            <Route path="/merchant" element={<MerchantDashboard userId={currentUser?.id} />} />

            <Route path="/buyer" element={<BuyerOverview userId={currentUser?.id} userName={currentUser?.name} />} />
            <Route path="/buyer/transactions" element={<BuyerTransactions userId={currentUser?.id} userName={currentUser?.name} />} />
            <Route path="/buyer/bank-accounts" element={<BankAccounts userId={currentUser?.id} userName={currentUser?.name} role="buyer" />} />
            <Route path="/buyer/profile" element={<Profile userId={currentUser?.id} userName={currentUser?.name} role="buyer" />} />

            <Route path="/courier" element={<CourierDashboard userId={currentUser?.id} />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers userId={currentUser?.id} />} />
            <Route path="/admin/users/:id" element={<AdminUserDetail />} />
            <Route path="/admin/kyc" element={<AdminKyc />} />

            <Route path="/agency" element={<SellerDashboard userId={currentUser?.id} userName={currentUser?.name} />} />

            <Route path="/escrow/:id" element={<EscrowDetail userId={currentUser?.id} userRole={currentRole} />} />
            <Route path="/dispute/:id" element={<DisputeDetail userId={currentUser?.id} userRole={currentRole} />} />

            <Route path="*" element={<Navigate to={`/${currentRole.toLowerCase()}`} replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isAuth = location.pathname === '/login' || location.pathname === '/register';
  const isCallback = location.pathname === '/auth/callback';
  const isPublic = ['/careers', '/about', '/blog', '/contact', '/pricing', '/help', '/privacy', '/terms'].includes(location.pathname);

  if (isLanding) return <Landing />;
  if (isAuth) return <Routes><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /></Routes>;
  if (isCallback) return <AuthCallback />;
  if (isPublic) return (
    <Routes>
      <Route path="/careers" element={<Careers />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
  return <DashboardLayout />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ToastProvider>
          <Router>
            <AppRoutes />
          </Router>
        </ToastProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
