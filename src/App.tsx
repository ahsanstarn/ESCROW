import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { MerchantDashboard } from './pages/MerchantDashboard';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { CourierDashboard } from './pages/CourierDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import SellerDashboard from './pages/SellerDashboard';
import SellerOrders from './pages/SellerOrders';
import SellerWallet from './pages/SellerWallet';
import SellerDisputes from './pages/SellerDisputes';
import SellerAnalytics from './pages/SellerAnalytics';
import SellerApi from './pages/SellerApi';
import SellerSettings from './pages/SellerSettings';
import { AgencyDashboard } from './pages/AgencyDashboard';
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
import { useState, useEffect, useCallback } from 'react';
import { UserRole, User } from './types';
import { api } from './lib/api';

function DashboardLayout() {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState<UserRole>('MERCHANT');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      let res = await api.users.list();
      if (res.data.length === 0) {
        await fetch('/api/seed', { method: 'POST' });
        res = await api.users.list();
      }
      setUsers(res.data);
    } catch { /* empty */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const currentUser = users.find(u => u.role === currentRole);

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    navigate(`/${role.toLowerCase()}`);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Loading platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      <Sidebar currentRole={currentRole} onRoleChange={handleRoleChange} currentUser={currentUser} />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to={`/${currentRole.toLowerCase()}`} replace />} />
          <Route path="/merchant" element={<MerchantDashboard userId={currentUser?.id} />} />
          <Route path="/seller" element={<SellerDashboard userId={currentUser?.id} />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
          <Route path="/seller/wallet" element={<SellerWallet />} />
          <Route path="/seller/disputes" element={<SellerDisputes />} />
          <Route path="/seller/analytics" element={<SellerAnalytics />} />
          <Route path="/seller/api" element={<SellerApi />} />
          <Route path="/seller/settings" element={<SellerSettings />} />
          <Route path="/buyer" element={<CustomerDashboard userId={currentUser?.id} />} />
          <Route path="/courier" element={<CourierDashboard userId={currentUser?.id} />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/agency" element={<AgencyOverview />} />
          <Route path="/agency/bulk-orders" element={<AgencyBulkOrders />} />
          <Route path="/agency/escrow-finance" element={<AgencyEscrowFinance />} />
          <Route path="/agency/disputes" element={<AgencyDisputes />} />
          <Route path="/agency/reports" element={<AgencyReports />} />
          <Route path="/agency/api" element={<AgencyApi />} />
          <Route path="/escrow/:id" element={<EscrowDetail userId={currentUser?.id} userRole={currentRole} />} />
          <Route path="/dispute/:id" element={<DisputeDetail userId={currentUser?.id} userRole={currentRole} />} />
        </Routes>
      </main>
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
    <Router>
      <AppRoutes />
    </Router>
  );
}
