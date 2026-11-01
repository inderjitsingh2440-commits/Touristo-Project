import React, { useState } from 'react';
import { ScreenId } from './types/touristo';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { NotificationModal } from './components/NotificationModal';
import { PythonProjectDrawer } from './components/PythonProjectDrawer';
import { LoginModal } from './components/LoginModal';
import { authService } from './services/authService';
import { AuthUser } from './types/auth';

// Screens
import { SplashScreen } from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CurrencyScannerScreen } from './screens/CurrencyScannerScreen';
import { TranslatorScreen } from './screens/TranslatorScreen';
import { CurrencyCalculatorScreen } from './screens/CurrencyCalculatorScreen';
import { ExpenseTrackerScreen } from './screens/ExpenseTrackerScreen';
import { ScamDetectorScreen } from './screens/ScamDetectorScreen';
import { ScamExamplesScreen } from './screens/ScamExamplesScreen';
import { SafeRouteScreen } from './screens/SafeRouteScreen';
import { SOSEmergencyScreen } from './screens/SOSEmergencyScreen';
import { NearbyHelpScreen } from './screens/NearbyHelpScreen';
import { ProfileSettingsScreen } from './screens/ProfileSettingsScreen';
import { ExploreIndiaScreen } from './screens/ExploreIndiaScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isPythonDrawerOpen, setIsPythonDrawerOpen] = useState(false);
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => authService.getCurrentUser());
  const [welcomeToast, setWelcomeToast] = useState<string | null>(null);

  // When splash screen finishes, transition to home and immediately popup the login dialog
  const handleSplashFinish = () => {
    setCurrentScreen('home');
    // Pop up login dialog right after app starts
    setIsLoginModalOpen(true);
  };

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    const greeting = user.isGuest 
      ? 'Exploring as Guest. You can sign in anytime from the top bar.' 
      : `Namaste, ${user.name}! Welcome to your India travel guide.`;
    setWelcomeToast(greeting);
    setTimeout(() => {
      setWelcomeToast(null);
    }, 4500);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setWelcomeToast('Signed out successfully.');
    setTimeout(() => {
      setWelcomeToast(null);
    }, 3000);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onFinish={handleSplashFinish} />;
      case 'home':
        return (
          <HomeScreen 
            onNavigate={handleNavigate} 
            userName={currentUser?.name || 'Traveler'}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            isGuest={!currentUser || currentUser.isGuest}
          />
        );
      case 'currency_scanner':
        return <CurrencyScannerScreen />;
      case 'translator':
        return <TranslatorScreen />;
      case 'currency_calculator':
        return <CurrencyCalculatorScreen onNavigate={handleNavigate} />;
      case 'expense_tracker':
        return <ExpenseTrackerScreen />;
      case 'scam_detector':
        return <ScamDetectorScreen />;
      case 'scam_examples':
        return <ScamExamplesScreen onNavigate={handleNavigate} />;
      case 'safe_route':
        return <SafeRouteScreen />;
      case 'sos_emergency':
        return <SOSEmergencyScreen onNavigate={handleNavigate} />;
      case 'nearby_help':
        return <NearbyHelpScreen />;
      case 'profile_settings':
        return (
          <ProfileSettingsScreen 
            onNavigate={handleNavigate}
            currentUser={currentUser}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            onLogout={handleLogout}
          />
        );
      case 'explore_india':
        return <ExploreIndiaScreen onNavigate={handleNavigate} />;
      default:
        return (
          <HomeScreen 
            onNavigate={handleNavigate} 
            userName={currentUser?.name || 'Traveler'}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            isGuest={!currentUser || currentUser.isGuest}
          />
        );
    }
  };

  if (currentScreen === 'splash') {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  const isSOS = currentScreen === 'sos_emergency';

  return (
    <div className={`min-h-screen transition-colors ${isSOS ? 'bg-[#3B0707]' : 'bg-[#F5F7F7]'}`}>
      {/* Welcome Toast Notification */}
      {welcomeToast && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-500/30 flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-2">
          <span>{welcomeToast}</span>
          <button 
            onClick={() => setWelcomeToast(null)} 
            className="text-slate-400 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Outer Layout Container */}
      <div className={`mx-auto transition-all ${
        isMobileFrame 
          ? 'max-w-[420px] my-4 shadow-2xl rounded-[38px] border-8 border-slate-800 overflow-hidden min-h-[92vh] bg-white relative' 
          : 'max-w-2xl min-h-screen relative'
      }`}>
        {/* Top Header */}
        <Header
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onOpenNotifications={() => setIsNotificationOpen(true)}
          onTogglePythonVault={() => setIsPythonDrawerOpen(true)}
          unreadCount={2}
          isMobileFrame={isMobileFrame}
          onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
          currentUser={currentUser}
          onOpenLogin={() => setIsLoginModalOpen(true)}
        />

        {/* Screen Content Body */}
        <main className="p-4 pb-20">
          {renderScreen()}
        </main>

        {/* Bottom Navigation Bar */}
        <Navigation
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
        />
      </div>

      {/* Global Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      <PythonProjectDrawer
        isOpen={isPythonDrawerOpen}
        onClose={() => setIsPythonDrawerOpen(false)}
      />
    </div>
  );
}
