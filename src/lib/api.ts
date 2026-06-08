const API_BASE = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  escrows: {
    list: (params?: Record<string, string>) => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return request<{ success: boolean; data: any[]; total: number }>(`/escrows${query}`);
    },
    get: (id: string) => request<{ success: boolean; data: any }>(`/escrows/${id}`),
    create: (data: any) =>
      request<{ success: boolean; data: any }>('/escrows', { method: 'POST', body: JSON.stringify(data) }),
    action: (id: string, action: string, data: any = {}) =>
      request<{ success: boolean; data: any }>(`/escrows/${id}`, { method: 'POST', body: JSON.stringify({ action, ...data }) }),
    timeline: (id: string) =>
      request<{ success: boolean; data: any[] }>(`/escrows/${id}`),
  },
  users: {
    list: (role?: string) =>
      request<{ success: boolean; data: any[] }>(`/users${role ? `?role=${role}` : ''}`),
    get: (id: string) => request<{ success: boolean; data: any }>(`/users/${id}`),
    stats: (id: string) => request<{ success: boolean; data: any }>(`/users/${id}/stats`),
    create: (data: any) =>
      request<{ success: boolean; data: any }>('/users', { method: 'POST', body: JSON.stringify(data) }),
  },
  disputes: {
    list: (params?: Record<string, string>) => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return request<{ success: boolean; data: any[]; total: number }>(`/disputes${query}`);
    },
    get: (id: string) => request<{ success: boolean; data: any }>(`/disputes/${id}`),
    submitEvidence: (id: string, data: any) =>
      request<{ success: boolean; data: any }>(`/disputes/${id}`, { method: 'POST', body: JSON.stringify(data) }),
    resolve: (id: string, data: any) =>
      request<{ success: boolean; data: any }>(`/disputes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  },
  deliveries: {
    list: (courierId: string) =>
      request<{ success: boolean; data: any[] }>(`/deliveries?courierId=${courierId}`),
    create: (data: any) =>
      request<{ success: boolean; data: any }>('/deliveries', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id: string, data: any) =>
      request<{ success: boolean; data: any }>('/deliveries', { method: 'PUT', body: JSON.stringify({ id, ...data }) }),
  },
  ledger: {
    user: (userId: string) =>
      request<{ success: boolean; data: any }>(`/ledger?userId=${userId}`),
    escrow: (escrowId: string) =>
      request<{ success: boolean; data: any[] }>(`/ledger?escrowId=${escrowId}`),
  },
  analytics: {
    platform: () => request<{ success: boolean; data: any }>('/analytics'),
  },
  webhooks: {
    config: (userId: string) =>
      request<{ success: boolean; data: any[] }>(`/webhooks?userId=${userId}`),
    create: (data: any) =>
      request<{ success: boolean; data: any }>('/webhooks', { method: 'POST', body: JSON.stringify(data) }),
  },
};
