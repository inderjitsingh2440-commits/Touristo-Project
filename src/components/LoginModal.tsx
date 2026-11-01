import React, { useState } from 'react';
import { 
  X, 
  Compass, 
  Lock, 
  Mail, 
  User, 
  Globe, 
  DollarSign, 
  Sparkles, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Zap,
  ChevronRight
} from 'lucide-react';
import { authService, DEMO_TRAVELERS } from '../services/authService';
import { AuthUser, DemoTraveler } from '../types/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  initialMode?: 'signin' | 'register' | 'quick';
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'signin',
}) => {
  const [mode, setMode] = useState<'signin' | 'register' | 'quick'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sign In State
  const [loginEmail, setLoginEmail] = useState('alex.traveler@example.com');
  const [loginPassword, setLoginPassword] = useState('Touristo2026!');
  const [rememberMe, setRememberMe] = useState(true);

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regNationality, setRegNationality] = useState('United States');
  const [regCurrency, setRegCurrency] = useState('USD');
  const [regPhone, setRegPhone] = useState('');

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!loginEmail.trim()) {
      setErrorMsg('Please enter your email or username');
      return;
    }
    if (!loginPassword || loginPassword.length < 4) {
      setErrorMsg('Please enter a valid password (min 4 characters)');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      try {
        const user = authService.loginWithCredentials(loginEmail, loginPassword);
        setSuccessMsg(`Welcome back, ${user.name}!`);
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess(user);
          onClose();
        }, 500);
      } catch (err: unknown) {
        setIsLoading(false);
        setErrorMsg((err as Error).message || 'Failed to sign in. Please try again.');
      }
    }, 600);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!regName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (!regPassword || regPassword.length < 4) {
      setErrorMsg('Password must be at least 4 characters');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      try {
        const user = authService.registerNewUser({
          name: regName,
          email: regEmail,
          nationality: regNationality,
          preferredCurrency: regCurrency,
          phone: regPhone,
        });
        setSuccessMsg(`Account created! Welcome to Touristo, ${user.name}!`);
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess(user);
          onClose();
        }, 500);
      } catch (err: unknown) {
        setIsLoading(false);
        setErrorMsg((err as Error).message || 'Failed to register account');
      }
    }, 700);
  };

  const handleQuickDemoLogin = (traveler: DemoTraveler) => {
    setErrorMsg(null);
    setIsLoading(true);
    setTimeout(() => {
      const user = authService.loginWithDemo(traveler);
      setSuccessMsg(`Logged in as ${user.name}! (${traveler.role})`);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(user);
        onClose();
      }, 400);
    }, 350);
  };

  const handleGoogleSimulation = () => {
    setIsLoading(true);
    setTimeout(() => {
      const user = authService.loginWithCredentials(
        'google.traveler@gmail.com', 
        'google_oauth_pass', 
        'Sarah Jenkins'
      );
      setSuccessMsg('Google verification successful!');
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(user);
        onClose();
      }, 500);
    }, 800);
  };

  const handleContinueAsGuest = () => {
    const guestUser = authService.continueAsGuest();
    onLoginSuccess(guestUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Modal Card */}
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with India Motif & Emerald Glow */}
        <div className="relative bg-gradient-to-r from-[#087F68] to-[#075B4E] text-white p-5 pb-6">
          <div className="absolute top-3 right-3 flex items-center gap-1">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close modal"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white p-0.5 overflow-hidden ring-2 ring-white/30 shadow-md flex items-center justify-center">
              <img 
                src="/assets/aistudio/WhatsApp_Image_2026-10-31_at_9.52.03_AM_17298cf5.jpeg" 
                alt="Touristo Logo" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xl font-black tracking-tight">TOURISTO</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-emerald-100 px-1.5 py-0.5 rounded-md">
                  INDIA 🇮🇳
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 font-medium">
                Travel Smart. Travel Safe.
              </p>
            </div>
          </div>

          {/* Subtitle / Value prop */}
          <p className="text-xs text-white/80 mt-3 leading-relaxed flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>Sign in to sync your verified rupees, safe routes & emergency contacts.</span>
          </p>

          {/* Tab Selector */}
          <div className="mt-4 grid grid-cols-3 bg-black/20 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => { setMode('signin'); setErrorMsg(null); }}
              className={`py-1.5 rounded-lg transition-all ${
                mode === 'signin' 
                  ? 'bg-white text-[#087F68] shadow-sm font-bold' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setErrorMsg(null); }}
              className={`py-1.5 rounded-lg transition-all ${
                mode === 'register' 
                  ? 'bg-white text-[#087F68] shadow-sm font-bold' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              New Account
            </button>
            <button
              onClick={() => { setMode('quick'); setErrorMsg(null); }}
              className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
                mode === 'quick' 
                  ? 'bg-white text-[#087F68] shadow-sm font-bold' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>1-Click Demo</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-slate-800 flex-1">
          {/* Notifications */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span className="font-medium">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">{successMsg}</span>
            </div>
          )}

          {/* TAB 1: SIGN IN */}
          {mode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email or Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="alex.traveler@example.com"
                    required
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F68] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setLoginPassword('Touristo2026!')}
                    className="text-[11px] text-[#087F68] hover:underline"
                  >
                    Auto-fill demo pass
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-9 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F68] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#087F68] focus:ring-[#087F68] accent-[#087F68]"
                  />
                  <span className="text-slate-600 font-medium">Keep me signed in</span>
                </label>
                <button
                  type="button"
                  onClick={() => setMode('quick')}
                  className="text-[#087F68] font-semibold hover:underline"
                >
                  Quick Sign-in?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-[#087F68] hover:bg-[#075B4E] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Touristo</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-2 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <span className="relative bg-white px-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  or continue with
                </span>
              </div>

              {/* Social Login Button */}
              <button
                type="button"
                onClick={handleGoogleSimulation}
                disabled={isLoading}
                className="w-full py-2 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </form>
          )}

          {/* TAB 2: REGISTER */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Maya Lin"
                    required
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F68] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="maya@example.com"
                    required
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F68] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Home Country
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={regNationality}
                      onChange={(e) => setRegNationality(e.target.value)}
                      className="w-full pl-9 pr-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F68]"
                    >
                      <option value="United States">🇺🇸 United States</option>
                      <option value="United Kingdom">🇬🇧 United Kingdom</option>
                      <option value="France">🇫🇷 France</option>
                      <option value="Germany">🇩🇪 Germany</option>
                      <option value="Canada">🇨🇦 Canada</option>
                      <option value="Australia">🇦🇺 Australia</option>
                      <option value="Japan">🇯🇵 Japan</option>
                      <option value="Singapore">🇸🇬 Singapore</option>
                      <option value="India">🇮🇳 India</option>
                      <option value="Other">🌐 Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Home Currency
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={regCurrency}
                      onChange={(e) => setRegCurrency(e.target.value)}
                      className="w-full pl-9 pr-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F68]"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD (CA$)</option>
                      <option value="AUD">AUD (AU$)</option>
                      <option value="JPY">JPY (¥)</option>
                      <option value="SGD">SGD (SG$)</option>
                      <option value="INR">INR (₹)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="At least 4 characters"
                    required
                    className="w-full pl-9 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F68]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-[#087F68] hover:bg-[#075B4E] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Create Profile & Enter India Guide</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 3: 1-CLICK QUICK DEMO LOGINS */}
          {mode === 'quick' && (
            <div className="space-y-2.5">
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Choose a pre-configured traveler profile to test all features instantly with customized currencies, trips, and emergency setups:
              </p>

              <div className="space-y-2 pt-1">
                {DEMO_TRAVELERS.map((traveler) => (
                  <button
                    key={traveler.id}
                    onClick={() => handleQuickDemoLogin(traveler)}
                    disabled={isLoading}
                    className="w-full text-left p-3 rounded-2xl border border-slate-200 hover:border-[#087F68] hover:bg-[#E6F6EF]/40 transition-all flex items-center justify-between group active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={traveler.avatar}
                        alt={traveler.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#087F68]/30 group-hover:border-[#087F68]"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-900">{traveler.name}</span>
                          <span className="text-xs">{traveler.flag}</span>
                          <span className="text-[10px] bg-slate-100 px-1.5 py-0.2 rounded font-semibold text-slate-600">
                            {traveler.preferredCurrency}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#087F68] font-medium leading-tight mt-0.5">
                          {traveler.role}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#087F68] group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Guest & Privacy */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleContinueAsGuest}
            className="text-xs font-bold text-slate-600 hover:text-[#087F68] transition-colors flex items-center gap-1 py-1"
          >
            <span>Continue as Guest</span>
            <span className="text-slate-400">→</span>
          </button>

          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>Encrypted & Private</span>
          </span>
        </div>
      </div>
    </div>
  );
};
