import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n';
import { Sidebar } from './components/layout/Sidebar';
import { MerchantDashboard } from './pages/MerchantDashboard';
import { CourierDashboard } from './pages/CourierDashboard';
import SellerDashboard from './pages/SellerDashboard';
import SellerOrders from './pages/SellerOrders';
import SellerWallet from './pages/SellerWallet';
import SellerDisputes from './pages/SellerDisputes';
import SellerAnalytics from './pages/SellerAnalytics';
import SellerApi from './pages/SellerApi';
import SellerSettings from './pages/SellerSettings';
import BuyerOverview from './pages/BuyerOverview';
import BuyerTransactions from './pages/BuyerTransactions';
import BuyerExplore from './pages/BuyerExplore';
import BuyerWallet from './pages/BuyerWallet';
import BankAccounts from './pages/BankAccounts';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminUserDetail from './pages/AdminUserDetail';
import AdminKyc from './pages/AdminKyc';
import AgencyOverview from './pages/AgencyOverview';
import AgencyBulkOrders from './pages/AgencyBulkOrders';
import AgencyEscrowFinance from './pages/AgencyEscrowFinance';
import AgencyDisputes from './pages/AgencyDisputes';
import AgencyReports from './pages/AgencyReports';
import AgencyApi from './pages/AgencyApi';
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
import { useState, useEffect, useCallback, useRef } from 'react';
import { UserRole, User } from './types';
import { api } from './lib/api';
import { useAuth } from './hooks/useAuth';
import { Menu, Bell, User as UserIcon } from 'lucide-react';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { ToastProvider, useToast } from './components/ui/Toast';
import { LoadingScreen } from './components/ui/LoadingSpinner';

import LanguageSwitcher from './components/ui/LanguageSwitcher';

function Header({ onMenuToggle, currentUser }: { onMenuToggle: () => void, currentUser?: User | null }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 z-10 h-[72px]">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="md:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6">
        <LanguageSwitcher />
        
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-slate-900">{currentUser?.name || 'Account'}</span>
            <span className="text-xs text-slate-500">ID: {currentUser?.id || 'acc_12345'}</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-escrow-primary flex items-center justify-center text-sm font-semibold text-black flex-shrink-0 border border-slate-200">
            {currentUser?.name?.split(' ').map(n => n[0]).join('') || <UserIcon className="w-4 h-4" />}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardLayout() {
  const navigate = useNavigate();
  const { session, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const toastRef = useRef(showToast);
  toastRef.current = showToast;
  const VALID_ROLES: UserRole[] = ['SELLER', 'BUYER', 'MERCHANT', 'AGENCY', 'COURIER', 'ADMIN'];
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('escrow_role');
    return saved && VALID_ROLES.includes(saved as UserRole) ? (saved as UserRole) : 'SELLER';
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!session) {
      navigate('/login', { replace: true });
      return;
    }
    const email = session.user?.email;
    if (!email) {
      setLoading(false);
      return;
    }
    const sessionRole = session.user?.user_metadata?.role?.toLowerCase() as UserRole | undefined;
    const sessionName = session.user?.user_metadata?.name || email;
    const fallbackUser: User = {
      id: session.user?.id || '',
      email,
      name: sessionName,
      role: (sessionRole || 'SELLER') as UserRole,
      kycStatus: 'VERIFIED',
      riskScore: 0,
      trustScore: 80,
      createdAt: new Date().toISOString(),
    };
    const loadUser = async () => {
      try {
        let res = await api.users.list();
        if (!res.data || res.data.length === 0) {
          try { await fetch('/api/seed', { method: 'POST' }); } catch { /* ignore */ }
          try { res = await api.users.list(); } catch { /* ignore */ }
        }
        const matched = res.data?.find((u: User) => u.email === email);
        if (matched) {
          setCurrentUser(matched);
          const savedRole = localStorage.getItem('escrow_role') as UserRole;
          if (!savedRole) setCurrentRole(matched.role);
        } else {
          setCurrentUser(fallbackUser);
          const savedRole = localStorage.getItem('escrow_role') as UserRole;
          if (!savedRole) setCurrentRole(fallbackUser.role);
        }
      } catch {
        setCurrentUser(fallbackUser);
        const savedRole = localStorage.getItem('escrow_role') as UserRole;
        if (!savedRole) setCurrentRole(fallbackUser.role);
        toastRef.current('Failed to load user profile', 'error');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [session, authLoading, navigate]);

  const handleRoleChange = useCallback((role: UserRole) => {
    setCurrentRole(role);
    localStorage.setItem('escrow_role', role);
    navigate(`/${role.toLowerCase()}`);
  }, [navigate]);

  if (authLoading || loading) {
    return <LoadingScreen message="Securing session..." />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        currentUser={currentUser}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuToggle={() => setMobileOpen(prev => !prev)} currentUser={currentUser} />
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Routes location={location}>
                {/* Seller Routes */}
                <Route path="/seller" element={<SellerDashboard />} />
                <Route path="/seller/orders" element={<SellerOrders />} />
                <Route path="/seller/wallet" element={<SellerWallet />} />
                <Route path="/seller/disputes" element={<SellerDisputes />} />
                <Route path="/seller/analytics" element={<SellerAnalytics />} />
                <Route path="/seller/api" element={<SellerApi />} />
                <Route path="/seller/settings" element={<SellerSettings />} />
                <Route path="/seller/profile" element={<SellerSettings />} />

                {/* Merchant Route */}
                <Route path="/merchant" element={<MerchantDashboard userId={currentUser?.id} />} />

                {/* Buyer Routes */}
                <Route path="/buyer" element={<BuyerOverview userId={currentUser?.id} userName={currentUser?.name} />} />
                <Route path="/buyer/transactions" element={<BuyerTransactions userId={currentUser?.id} userName={currentUser?.name} />} />
                <Route path="/buyer/explore" element={<BuyerExplore />} />
                <Route path="/buyer/wallet" element={<BuyerWallet />} />
                <Route path="/buyer/bank-accounts" element={<BuyerWallet />} />
                <Route path="/buyer/profile" element={<Profile userId={currentUser?.id} userName={currentUser?.name} role="buyer" />} />

                {/* Courier Route */}
                <Route path="/courier" element={<CourierDashboard userId={currentUser?.id} />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers userId={currentUser?.id} />} />
                <Route path="/admin/users/:id" element={<AdminUserDetail />} />
                <Route path="/admin/kyc" element={<AdminKyc />} />

                {/* Agency Routes */}
                <Route path="/agency" element={<AgencyOverview />} />
                <Route path="/agency/bulk-orders" element={<AgencyBulkOrders />} />
                <Route path="/agency/finance" element={<AgencyEscrowFinance />} />
                <Route path="/agency/disputes" element={<AgencyDisputes />} />
                <Route path="/agency/reports" element={<AgencyReports />} />
                <Route path="/agency/api" element={<AgencyApi />} />

                {/* Detail Routes */}
                <Route path="/escrow/:id" element={<EscrowDetail userId={currentUser?.id} userRole={currentRole} />} />
                <Route path="/dispute/:id" element={<DisputeDetail userId={currentUser?.id} userRole={currentRole} />} />

                <Route path="*" element={<Navigate to={`/${currentRole.toLowerCase()}`} replace />} />
              </Routes>
            </PageTransition>
          </AnimatePresence>
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

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        {isLanding && <Landing />}
        {isAuth && (
          <Routes location={location}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
        {isCallback && <AuthCallback />}
        {isPublic && (
          <Routes location={location}>
            <Route path="/careers" element={<Careers />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        )}
        {!isLanding && !isAuth && !isCallback && !isPublic && <DashboardLayout />}
      </PageTransition>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ToastProvider>
          <Router>
            <ScrollToTop />
            <AppRoutes />
          </Router>
        </ToastProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
