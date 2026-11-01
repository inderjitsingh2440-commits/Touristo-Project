import React from 'react';
import { ScreenId } from '../types/touristo';
import { 
  ArrowLeft, 
  Bell, 
  ShieldAlert, 
  Code2, 
  Compass, 
  Smartphone, 
  Monitor 
} from 'lucide-react';

import { AuthUser } from '../types/auth';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenNotifications: () => void;
  onTogglePythonVault: () => void;
  unreadCount?: number;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
  currentUser?: AuthUser | null;
  onOpenLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenNotifications,
  onTogglePythonVault,
  unreadCount = 2,
  isMobileFrame,
  onToggleFrame,
  currentUser,
  onOpenLogin,
}) => {
  if (currentScreen === 'splash') return null;

  const isSOS = currentScreen === 'sos_emergency';
  const showBack = currentScreen !== 'home';

  const getScreenTitle = (screen: ScreenId): string => {
    switch (screen) {
      case 'currency_scanner': return 'Currency Scanner';
      case 'translator': return 'Voice & Text Translator';
      case 'currency_calculator': return 'Currency Calculator';
      case 'expense_tracker': return 'Expense Tracker';
      case 'scam_detector': return 'Scam Risk Detector';
      case 'scam_examples': return 'Scam Guide & Traps';
      case 'safe_route': return 'Women Safety Routes';
      case 'sos_emergency': return 'EMERGENCY SOS';
      case 'nearby_help': return 'Nearby Verified Help';
      case 'profile_settings': return 'Profile & Settings';
      case 'explore_india': return 'Explore India Guide';
      default: return 'TOURISTO';
    }
  };

  return (
    <header className={`sticky top-0 z-40 transition-colors border-b ${
      isSOS 
        ? 'bg-[#450A0A] border-[#991B1B] text-white' 
        : 'bg-white border-[#E2E8E6] text-[#172B2A]'
    }`}>
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {showBack ? (
            <button
              onClick={() => onNavigate('home')}
              className={`p-1.5 rounded-lg transition-colors ${
                isSOS 
                  ? 'hover:bg-red-900/60 text-white' 
                  : 'hover:bg-[#E6F6EF] text-[#075B4E]'
              }`}
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm border border-emerald-600/30 bg-white flex items-center justify-center">
                <img 
                  src="/assets/aistudio/WhatsApp_Image_2026-10-31_at_9.52.03_AM_17298cf5.jpeg" 
                  alt="Touristo Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center gap-1.5">
              <span className={`font-bold tracking-tight text-base sm:text-lg ${
                isSOS ? 'text-white' : 'text-[#087F68]'
              }`}>
                {showBack ? getScreenTitle(currentScreen) : 'TOURISTO'}
              </span>
              {!showBack && (
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#E6F6EF] text-[#087F68] tracking-wider hidden sm:inline-block">
                  India
                </span>
              )}
            </div>
            {!showBack && (
              <p className="text-[11px] text-[#62716F] font-medium leading-tight">
                Travel Smart. Travel Safe.
              </p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick SOS Trigger Button in Header (if not on SOS screen) */}
          {!isSOS && (
            <button
              onClick={() => onNavigate('sos_emergency')}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#E53935] hover:bg-[#c92f2b] text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-transform active:scale-95"
              title="Emergency SOS"
            >
              <ShieldAlert className="w-3.5 h-3.5 fill-white" />
              <span>SOS</span>
            </button>
          )}

          {/* Python Code Vault Button */}
          <button
            onClick={onTogglePythonVault}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors border ${
              isSOS 
                ? 'border-red-800 text-red-200 hover:bg-red-900/40' 
                : 'border-[#E2E8E6] text-[#075B4E] hover:bg-[#E6F6EF]'
            }`}
            title="Inspect & Export Python 3.11 / Kivy / Buildozer Code"
          >
            <Code2 className="w-4 h-4 text-[#087F68]" />
            <span className="hidden md:inline text-xs font-semibold">Python Code</span>
          </button>

          {/* Mobile Phone Mockup Toggle for wide screens */}
          <button
            onClick={onToggleFrame}
            className={`p-1.5 rounded-lg transition-colors border ${
              isSOS 
                ? 'border-red-800 text-red-200 hover:bg-red-900/40' 
                : 'border-[#E2E8E6] text-[#62716F] hover:bg-slate-100'
            } hidden sm:flex`}
            title={isMobileFrame ? 'Expand to Full Width' : 'Constrain to Mobile Frame'}
          >
            {isMobileFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className={`p-1.5 rounded-lg relative transition-colors ${
              isSOS 
                ? 'hover:bg-red-900/60 text-white' 
                : 'hover:bg-[#E6F6EF] text-[#62716F]'
            }`}
            title="Notifications & Alerts"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E53935] ring-2 ring-white"></span>
            )}
          </button>

          {/* Profile Avatar or Sign In button */}
          {currentUser && !currentUser.isGuest ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onNavigate('profile_settings')}
                className="w-8 h-8 rounded-full bg-[#087F68]/15 border-2 border-[#087F68] flex items-center justify-center text-[#087F68] font-bold text-xs hover:ring-2 hover:ring-[#087F68]/40 transition-all overflow-hidden relative group"
                title={`${currentUser.name} (Click for Profile & Settings)`}
              >
                {currentUser.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : null}
                <span className="text-[11px] font-bold">
                  {currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </span>
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 border shadow-xs ${
                isSOS 
                  ? 'border-red-400 bg-red-800 text-white hover:bg-red-700' 
                  : 'border-[#087F68] bg-[#E6F6EF] text-[#087F68] hover:bg-[#087F68] hover:text-white'
              }`}
              title="Sign in or switch traveler profile"
            >
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
