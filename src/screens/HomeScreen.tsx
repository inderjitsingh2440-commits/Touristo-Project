import React from 'react';
import { ScreenId } from '../types/touristo';
import { 
  AlertTriangle, 
  Scan, 
  Languages, 
  Calculator, 
  ShieldCheck, 
  Compass, 
  ShieldAlert, 
  MapPin, 
  BookOpen, 
  ArrowRight,
  Sparkles,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  userName?: string;
  onOpenLogin?: () => void;
  isGuest?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ 
  onNavigate, 
  userName = 'Traveler',
  onOpenLogin,
  isGuest = false,
}) => {
  return (
    <div className="space-y-5 pb-8 animate-in fade-in duration-300">
      {/* Welcome & City Safety Status Card */}
      <div className="bg-gradient-to-br from-[#087F68] to-[#075B4E] rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
        {/* Subtle decorative background wave */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Delhi, India · Verified Zone
            </span>
          </div>
          {isGuest && onOpenLogin ? (
            <button
              onClick={onOpenLogin}
              className="text-xs bg-white/25 hover:bg-white text-white hover:text-[#087F68] font-bold px-2.5 py-1 rounded-full transition-all"
            >
              Sign In ➔
            </button>
          ) : (
            <span className="text-xs text-emerald-100 font-medium">28°C · Fair</span>
          )}
        </div>

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black tracking-tight">Namaste, {userName}!</h2>
            <p className="text-xs text-emerald-100/90 mt-1 max-w-sm leading-relaxed">
              Your travel shield is active. Scan rupees, detect taxi traps, and navigate safe routes with confidence.
            </p>
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-0.5 shadow-lg border border-white/30 shrink-0 flex items-center justify-center overflow-hidden">
            <img 
              src="/assets/aistudio/WhatsApp_Image_2026-10-31_at_9.52.03_AM_17298cf5.jpeg" 
              alt="Touristo Badge" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Quick SOS Emergency Strip inside Banner */}
        <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs relative z-10">
          <div className="flex items-center gap-2 text-white/95">
            <ShieldAlert className="w-4 h-4 text-red-300 animate-pulse" />
            <span className="font-semibold">In an emergency?</span>
          </div>
          <button
            onClick={() => onNavigate('sos_emergency')}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-transform active:scale-95 shadow-sm flex items-center gap-1"
          >
            <span>Emergency SOS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Primary 6 Feature Cards Grid (Exact reference pastel colors) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold tracking-tight text-[#172B2A] uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#087F68]" />
            Core Travel Tools
          </h3>
          <span className="text-xs text-[#62716F]">6 AI Modules</span>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {/* 1. Scam Detector (Pale Yellow) */}
          <button
            onClick={() => onNavigate('scam_detector')}
            className="p-4 rounded-2xl bg-[#FEF8D8] border border-[#F7E7A6] text-left hover:shadow-md transition-all active:scale-[0.98] flex flex-col justify-between group h-38"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-[#FDF0B0] flex items-center justify-center text-[#8D6500] group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-5 h-5 text-[#8D6500]" />
              </div>
              <span className="text-[10px] font-bold text-[#8D6500] bg-white/70 px-2 py-0.5 rounded-full">
                Fair Fare
              </span>
            </div>
            <div>
              <h4 className="font-bold text-[#3E2D04] text-sm group-hover:text-[#087F68] transition-colors">
                Scam Detector
              </h4>
              <p className="text-[11px] text-[#785906] mt-0.5 leading-snug">
                Detect auto & taxi traps, check official tariffs
              </p>
            </div>
          </button>

          {/* 2. Currency Scanner (Pale Blue) */}
          <button
            onClick={() => onNavigate('currency_scanner')}
            className="p-4 rounded-2xl bg-[#E3F2FD] border border-[#BBE3FB] text-left hover:shadow-md transition-all active:scale-[0.98] flex flex-col justify-between group h-38"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-[#CDEBFC] flex items-center justify-center text-[#0277BD] group-hover:scale-105 transition-transform">
                <Scan className="w-5 h-5 text-[#0277BD]" />
              </div>
              <span className="text-[10px] font-bold text-[#0277BD] bg-white/70 px-2 py-0.5 rounded-full">
                AI Vision
              </span>
            </div>
            <div>
              <h4 className="font-bold text-[#0A3D62] text-sm group-hover:text-[#087F68] transition-colors">
                Currency Scanner
              </h4>
              <p className="text-[11px] text-[#24618A] mt-0.5 leading-snug">
                Identify ₹10 to ₹500 notes with Hindi & English audio
              </p>
            </div>
          </button>

          {/* 3. Translator (Pale Pink) */}
          <button
            onClick={() => onNavigate('translator')}
            className="p-4 rounded-2xl bg-[#FCE4EC] border border-[#F8BBD0] text-left hover:shadow-md transition-all active:scale-[0.98] flex flex-col justify-between group h-38"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-[#F48FB1]/40 flex items-center justify-center text-[#AD1457] group-hover:scale-105 transition-transform">
                <Languages className="w-5 h-5 text-[#AD1457]" />
              </div>
              <span className="text-[10px] font-bold text-[#AD1457] bg-white/70 px-2 py-0.5 rounded-full">
                Voice & Text
              </span>
            </div>
            <div>
              <h4 className="font-bold text-[#550E2F] text-sm group-hover:text-[#087F68] transition-colors">
                Translator
              </h4>
              <p className="text-[11px] text-[#862A56] mt-0.5 leading-snug">
                English ⇄ Hindi conversation with speech synthesis
              </p>
            </div>
          </button>

          {/* 4. Currency Calculator (Pale Mint Green) */}
          <button
            onClick={() => onNavigate('currency_calculator')}
            className="p-4 rounded-2xl bg-[#E8F5E9] border border-[#C8E6C9] text-left hover:shadow-md transition-all active:scale-[0.98] flex flex-col justify-between group h-38"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-[#A5D6A7]/40 flex items-center justify-center text-[#2E7D32] group-hover:scale-105 transition-transform">
                <Calculator className="w-5 h-5 text-[#2E7D32]" />
              </div>
              <span className="text-[10px] font-bold text-[#2E7D32] bg-white/70 px-2 py-0.5 rounded-full">
                Live Rates
              </span>
            </div>
            <div>
              <h4 className="font-bold text-[#144218] text-sm group-hover:text-[#087F68] transition-colors">
                Currency Calculator
              </h4>
              <p className="text-[11px] text-[#2F6F35] mt-0.5 leading-snug">
                Convert USD, EUR, GBP to INR & sync to Expenses
              </p>
            </div>
          </button>

          {/* 5. Women Safety (Pale Lavender) */}
          <button
            onClick={() => onNavigate('safe_route')}
            className="p-4 rounded-2xl bg-[#EDE7F6] border border-[#D1C4E9] text-left hover:shadow-md transition-all active:scale-[0.98] flex flex-col justify-between group h-38"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-[#B39DDB]/40 flex items-center justify-center text-[#5E35B1] group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-[#5E35B1]" />
              </div>
              <span className="text-[10px] font-bold text-[#5E35B1] bg-white/70 px-2 py-0.5 rounded-full">
                Safe Routes
              </span>
            </div>
            <div>
              <h4 className="font-bold text-[#311B92] text-sm group-hover:text-[#087F68] transition-colors">
                Women Safety
              </h4>
              <p className="text-[11px] text-[#553C9A] mt-0.5 leading-snug">
                Well-lit arterial roads, police booths, live sharing
              </p>
            </div>
          </button>

          {/* 6. Explore India (Pale Peach) */}
          <button
            onClick={() => onNavigate('explore_india')}
            className="p-4 rounded-2xl bg-[#FFF3E0] border border-[#FFE0B2] text-left hover:shadow-md transition-all active:scale-[0.98] flex flex-col justify-between group h-38"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-[#FFCC80]/40 flex items-center justify-center text-[#E65100] group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-[#E65100]" />
              </div>
              <span className="text-[10px] font-bold text-[#E65100] bg-white/70 px-2 py-0.5 rounded-full">
                Cultural Guide
              </span>
            </div>
            <div>
              <h4 className="font-bold text-[#6D2702] text-sm group-hover:text-[#087F68] transition-colors">
                Explore India
              </h4>
              <p className="text-[11px] text-[#9E3E07] mt-0.5 leading-snug">
                Temple etiquette, street food safety, UPI setup
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Navigation Cards: Scam Encyclopedia & Nearby Verified Help */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Scam Encyclopedia */}
        <button
          onClick={() => onNavigate('scam_examples')}
          className="p-3.5 bg-white rounded-2xl border border-[#E2E8E6] text-left hover:border-[#087F68]/40 hover:shadow-sm transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEF8D8] text-[#8D6500] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#172B2A] group-hover:text-[#087F68] transition-colors">
                Scam Examples & Traps
              </h4>
              <p className="text-[11px] text-[#62716F]">
                8 categories: Gem tricks, fake tickets, closed hotel lies
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Nearby Verified Help */}
        <button
          onClick={() => onNavigate('nearby_help')}
          className="p-3.5 bg-white rounded-2xl border border-[#E2E8E6] text-left hover:border-[#087F68]/40 hover:shadow-sm transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E6F6EF] text-[#087F68] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#172B2A] group-hover:text-[#087F68] transition-colors">
                Nearby Verified Help
              </h4>
              <p className="text-[11px] text-[#62716F]">
                24/7 Police stations, trauma hospitals & Pink Booths
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Emergency Helpline Numbers Quick Bar */}
      <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8E6] shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#172B2A] flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-[#087F68]" />
            Official Indian Emergency Numbers
          </span>
          <span className="text-[10px] text-[#15965F] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Toll-Free
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          <a
            href="tel:112"
            className="p-2 rounded-xl bg-[#F5F7F7] hover:bg-[#E6F6EF] border border-[#E2E8E6] transition-colors"
          >
            <div className="text-xs font-black text-[#E53935]">112</div>
            <div className="text-[10px] text-[#62716F]">National SOS</div>
          </a>
          <a
            href="tel:1091"
            className="p-2 rounded-xl bg-[#F5F7F7] hover:bg-[#EDE7F6] border border-[#E2E8E6] transition-colors"
          >
            <div className="text-xs font-black text-[#5E35B1]">1091</div>
            <div className="text-[10px] text-[#62716F]">Women Helpline</div>
          </a>
          <a
            href="tel:1363"
            className="p-2 rounded-xl bg-[#F5F7F7] hover:bg-[#E3F2FD] border border-[#E2E8E6] transition-colors"
          >
            <div className="text-xs font-black text-[#0277BD]">1363</div>
            <div className="text-[10px] text-[#62716F]">Tourist Helpline</div>
          </a>
          <a
            href="tel:108"
            className="p-2 rounded-xl bg-[#F5F7F7] hover:bg-[#E8F5E9] border border-[#E2E8E6] transition-colors"
          >
            <div className="text-xs font-black text-[#15965F]">108</div>
            <div className="text-[10px] text-[#62716F]">Ambulance</div>
          </a>
        </div>
      </div>
    </div>
  );
};
