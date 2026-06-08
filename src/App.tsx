import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { MerchantDashboard } from './pages/MerchantDashboard';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { CourierDashboard } from './pages/CourierDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { EscrowDetail } from './pages/EscrowDetail';
import { DisputeDetail } from './pages/DisputeDetail';
import { useState, useEffect, useCallback } from 'react';
import { UserRole, User } from './types';
import { api } from './lib/api';

function AppInner() {
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
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-escrow-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Loading platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar currentRole={currentRole} onRoleChange={handleRoleChange} currentUser={currentUser} />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to={`/${currentRole.toLowerCase()}`} replace />} />
          <Route path="/merchant" element={<MerchantDashboard userId={currentUser?.id} />} />
          <Route path="/buyer" element={<CustomerDashboard userId={currentUser?.id} />} />
          <Route path="/courier" element={<CourierDashboard userId={currentUser?.id} />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/escrow/:id" element={<EscrowDetail userId={currentUser?.id} userRole={currentRole} />} />
          <Route path="/dispute/:id" element={<DisputeDetail userId={currentUser?.id} userRole={currentRole} />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}
