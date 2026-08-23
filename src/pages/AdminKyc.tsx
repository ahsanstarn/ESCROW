import { useState } from 'react';

export default function AdminKyc() {
  const [kycItems] = useState([
    {
      id: '1',
      name: 'Adebayo O.',
      documentType: 'Driver\'s License',
      documentFront: 'Nigerian Driver\'s License',
      dob: '17-09-1990',
      state: 'Lagos',
      issueDate: '06-06-2020',
      expiryDate: '06-06-2025',
      status: 'pending',
    },
  ]);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-900 mb-6 lg:mb-8">KYC Verification</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {kycItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-4 bg-[#A3E635]/10 border-b border-slate-100">
                <p className="text-xs font-semibold text-[#A3E635] uppercase tracking-wider">KYC Verification</p>
              </div>
              <div className="p-6">
                <div className="bg-slate-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">NG</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Federal Republic of Nigeria</p>
                      <p className="text-sm font-bold text-slate-900">Driver's License</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Name:</span>
                      <span className="font-medium text-slate-900">{item.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">DOB:</span>
                      <span className="font-medium text-slate-900">{item.dob}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">State:</span>
                      <span className="font-medium text-slate-900">{item.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Issuing Date:</span>
                      <span className="font-medium text-slate-900">{item.issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Expires Date:</span>
                      <span className="font-medium text-slate-900">{item.expiryDate}</span>
                    </div>
                  </div>
                </div>

                <h3 className="font-display font-bold text-slate-900 mb-4">Confirm or Deny</h3>
                <div className="flex gap-3">
                  <button className="flex-1 py-2.5 bg-[#A3E635] text-black font-semibold text-sm rounded-lg hover:bg-[#b8ed5a] transition-colors">
                    Approve
                  </button>
                  <button className="flex-1 py-2.5 bg-red-500 text-white font-semibold text-sm rounded-lg hover:bg-red-600 transition-colors">
                    Deny
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {kycItems.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
            <p className="text-slate-500">No pending KYC verifications.</p>
          </div>
        )}
      </div>
    </div>
  );
}
