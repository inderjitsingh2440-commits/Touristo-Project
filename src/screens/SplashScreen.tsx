import React, { useEffect, useState } from 'react';
import { Plane, Compass, ShieldCheck } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Initializing travel safety engine...');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(45);
      setStatusText('Loading Indian banknote detection models...');
    }, 700);

    const timer2 = setTimeout(() => {
      setProgress(78);
      setStatusText('Syncing live exchange rates & police contacts...');
    }, 1400);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText("Let's Explore Safely...");
    }, 2100);

    const timer4 = setTimeout(() => {
      onFinish();
    }, 2700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onFinish]);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#E6F6EF] via-white to-[#E6F6EF]/40 flex flex-col justify-between items-center p-6 text-center overflow-hidden">
      {/* Top Floating Airplane Silhouette */}
      <div className="w-full flex justify-between items-center pt-6 max-w-md">
        <div className="flex items-center gap-1.5 text-[#075B4E] font-medium text-xs tracking-wider uppercase">
          <ShieldCheck className="w-4 h-4 text-[#087F68]" />
          <span>India Travel Protection</span>
        </div>
        <div className="relative">
          <Plane className="w-6 h-6 text-[#087F68] -rotate-12 transform animate-pulse" />
        </div>
      </div>

      {/* Main Hero & Indian Monument Illustration */}
      <div className="flex flex-col items-center my-auto max-w-sm w-full space-y-6">
        {/* Brand Icon Badge */}
        <div className="relative">
          <div className="w-32 h-32 rounded-3xl bg-white shadow-2xl flex items-center justify-center p-1.5 ring-8 ring-[#E6F6EF] overflow-hidden border border-emerald-500/20">
            <img 
              src="/assets/aistudio/WhatsApp_Image_2026-10-31_at_9.52.03_AM_17298cf5.jpeg" 
              alt="Touristo Official Logo" 
              className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#087F68] text-white p-2 rounded-full ring-4 ring-white shadow">
            <ShieldCheck className="w-5 h-5 text-emerald-200" />
          </div>
        </div>

        {/* Brand Typography */}
        <div className="space-y-1.5">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#087F68] font-sans">
            TOURISTO
          </h1>
          <p className="text-sm font-semibold tracking-wide text-[#075B4E]">
            Travel Smart. Travel Safe.
          </p>
          <p className="text-xs text-[#62716F] max-w-xs mx-auto pt-1">
            Your AI Travel Companion in India
          </p>
        </div>

        {/* Indian Architectural Heritage Vector Art */}
        <div className="w-full max-w-xs h-36 bg-white/80 backdrop-blur-xs rounded-2xl border border-[#E2E8E6] p-3 flex flex-col items-center justify-center relative shadow-xs overflow-hidden">
          <svg className="w-full h-24 text-[#087F68]/25" viewBox="0 0 300 100" fill="none" stroke="currentColor">
            {/* Taj Mahal silhouette */}
            <path d="M120 70 C120 40 150 20 150 20 C150 20 180 40 180 70 Z" fill="currentColor" fillOpacity="0.2" />
            <path d="M140 20 L150 5 L160 20" strokeWidth="2" stroke="currentColor" />
            <rect x="110" y="70" width="80" height="25" fill="currentColor" fillOpacity="0.3" rx="2" />
            {/* Minarets */}
            <line x1="90" y1="25" x2="90" y2="95" strokeWidth="3" stroke="currentColor" />
            <line x1="210" y1="25" x2="210" y2="95" strokeWidth="3" stroke="currentColor" />
            {/* India Gate arch representation */}
            <path d="M20 95 L20 45 L60 45 L60 95 Z" fill="currentColor" fillOpacity="0.2" />
            <path d="M30 95 L30 65 C30 55 50 55 50 65 L50 95" strokeWidth="2" stroke="currentColor" />
            {/* Sun/Lotus Temple curves */}
            <path d="M240 95 C240 60 280 60 280 95" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
            {/* Ground line */}
            <line x1="0" y1="95" x2="300" y2="95" strokeWidth="2" stroke="#087F68" />
          </svg>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-[#075B4E] font-medium">
            <span>Taj Mahal</span>
            <span>·</span>
            <span>Red Fort</span>
            <span>·</span>
            <span>Hampi</span>
            <span>·</span>
            <span>Konark</span>
          </div>
        </div>
      </div>

      {/* Progress & Skip Action */}
      <div className="w-full max-w-sm space-y-3 pb-4">
        {/* Progress Bar */}
        <div className="w-full bg-[#E2E8E6] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#087F68] h-full transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-[#62716F] font-medium animate-pulse">
            {statusText}
          </span>
          <button
            onClick={onFinish}
            className="text-[#087F68] font-bold hover:underline py-1 px-2 focus:outline-none"
          >
            Skip &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
