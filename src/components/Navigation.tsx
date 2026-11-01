import React from 'react';
import { ScreenId } from '../types/touristo';
import { 
  Home, 
  Scan, 
  Languages, 
  Receipt, 
  ShieldAlert, 
  User 
} from 'lucide-react';

interface NavigationProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate }) => {
  if (currentScreen === 'splash') return null;

  const isSOS = currentScreen === 'sos_emergency';

  const navItems = [
    { id: 'home' as ScreenId, label: 'Home', icon: Home },
    { id: 'currency_scanner' as ScreenId, label: 'Scanner', icon: Scan },
    { id: 'translator' as ScreenId, label: 'Translate', icon: Languages },
    { id: 'expense_tracker' as ScreenId, label: 'Expenses', icon: Receipt },
    { id: 'sos_emergency' as ScreenId, label: 'Safety SOS', icon: ShieldAlert, highlight: true },
    { id: 'profile_settings' as ScreenId, label: 'Profile', icon: User },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-40 border-t safe-bottom transition-colors ${
      isSOS 
        ? 'bg-[#450A0A] border-[#991B1B] text-red-200' 
        : 'bg-white border-[#E2E8E6] text-[#62716F]'
    }`}>
      <div className="max-w-2xl mx-auto px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          if (item.highlight) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center justify-center -mt-4 group focus:outline-none"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90 ${
                  isSOS 
                    ? 'bg-red-500 text-white ring-4 ring-red-900/60' 
                    : 'bg-[#E53935] text-white ring-4 ring-white'
                }`}>
                  <Icon className="w-6 h-6 animate-pulse" />
                </div>
                <span className={`text-[10px] font-bold mt-0.5 tracking-tight ${
                  isSOS ? 'text-red-300' : 'text-[#E53935]'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 py-1 flex flex-col items-center justify-center rounded-lg transition-colors focus:outline-none ${
                isActive
                  ? isSOS 
                    ? 'text-white font-bold' 
                    : 'text-[#07866D] font-bold'
                  : isSOS 
                    ? 'text-red-300/70 hover:text-white' 
                    : 'text-[#62716F] hover:text-[#087F68]'
              }`}
            >
              <div className={`p-1 rounded-md transition-colors ${
                isActive && !isSOS ? 'bg-[#E6F6EF]' : ''
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
