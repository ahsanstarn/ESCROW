import { Bell, User } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AccountHeaderProps {
  userId?: string;
  userName?: string;
  accountId?: string;
}

export default function AccountHeader({ userId, userName, accountId }: AccountHeaderProps) {
  const displayName = userName || 'Account';
  const displayId = accountId || userId || 'acc_12345';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (!userId) return;
    // Fetch disputes count as notification indicator
    fetch(`/api/disputes?openedById=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setNotificationCount(data.data.filter((d: any) => d.status === 'OPEN').length);
        }
      })
      .catch(() => {});
  }, [userId]);

  return (
    <div className="flex items-center gap-3">
      <button className="p-2 rounded-xl bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors relative">
        <Bell className="w-5 h-5" />
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
            {notificationCount}
          </span>
        )}
      </button>
      <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-2 shadow-sm border border-slate-200">
        <div className="w-8 h-8 rounded-full bg-[#A3E635] flex items-center justify-center text-xs font-semibold text-black">
          {initials || <User className="w-4 h-4" />}
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-slate-900">{displayName}</p>
          <p className="text-[11px] text-slate-500">ID: {displayId}</p>
        </div>
      </div>
    </div>
  );
}
