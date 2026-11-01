import React from 'react';
import { X, AlertTriangle, ShieldCheck, Info, MapPin } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const alerts = [
    {
      id: '1',
      type: 'warning',
      title: 'Scam Advisory: New Delhi Railway Station',
      time: '12 mins ago',
      desc: 'Multiple reports of unauthorized touts falsely claiming the NDLS booking counter has shifted. ASI & Railway booking desks operate exclusively on Platform 1 & 16.',
    },
    {
      id: '2',
      type: 'success',
      title: 'Women Safety Pink Booth Activated',
      time: '1 hour ago',
      desc: 'Delhi Police has deployed 24/7 all-female personnel at Rajiv Chowk Metro Station Gate 7 and Chandni Chowk.',
    },
    {
      id: '3',
      type: 'info',
      title: 'Weather & Air Quality Update',
      time: '3 hours ago',
      desc: 'New Delhi: 28°C, Clear skies. Humidity 44%. Recommended to carry sealed water bottles and sunglasses.',
    },
    {
      id: '4',
      type: 'info',
      title: 'UPI for Foreign Travelers (UPI One World)',
      time: 'Yesterday',
      desc: 'You can now obtain a prepaid UPI One World wallet at IGI Airport Terminal 3 for instant merchant payments via QR code without an Indian bank account.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#E2E8E6] overflow-hidden flex flex-col max-h-[85vh]">
        <div className="p-4 border-b border-[#E2E8E6] flex items-center justify-between bg-[#F5F7F7]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E6F6EF] flex items-center justify-center text-[#087F68]">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#172B2A]">Travel Alerts & Notices</h3>
              <p className="text-xs text-[#62716F]">Verified live intelligence for travelers in India</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3.5 rounded-xl border text-xs leading-relaxed transition-all ${
                alert.type === 'warning'
                  ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                  : alert.type === 'success'
                  ? 'bg-[#E6F6EF]/70 border-emerald-200 text-emerald-950'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  {alert.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  ) : alert.type === 'success' ? (
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                  )}
                  <span>{alert.title}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium shrink-0 ml-2">
                  {alert.time}
                </span>
              </div>
              <p className="text-slate-600">{alert.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-[#E2E8E6] bg-slate-50 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-[#087F68] hover:bg-[#075B4E] text-white rounded-xl text-xs font-bold transition-colors"
          >
            Mark All as Read & Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
