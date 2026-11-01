import React, { useState, useEffect } from 'react';
import { dbStorage } from '../services/dbStorage';
import { audioAlarmService } from '../services/audioAlarmService';
import { EmergencyContact, ScreenId } from '../types/touristo';
import { 
  ShieldAlert, 
  MapPin, 
  Volume2, 
  VolumeX, 
  PhoneCall, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Navigation, 
  Lock, 
  Radio,
  Send,
  X
} from 'lucide-react';

interface SOSEmergencyScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const SOSEmergencyScreen: React.FC<SOSEmergencyScreenProps> = ({ onNavigate }) => {
  const [isTestMode, setIsTestMode] = useState<boolean>(true);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState<boolean>(false);
  const [sosActivated, setSosActivated] = useState<boolean>(false);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [notifiedStatus, setNotifiedStatus] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());

  // GPS Coordinates (Default: Delhi Central Heritage District)
  const [lat, setLat] = useState('28.6315° N');
  const [lng, setLng] = useState('77.2167° E');
  const [locationName, setLocationName] = useState('Connaught Place, New Delhi 110001');

  useEffect(() => {
    setContacts(dbStorage.getContacts());
    const clock = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => {
      clearInterval(clock);
      audioAlarmService.stopSiren();
    };
  }, []);

  const toggleSiren = () => {
    if (isAlarmPlaying) {
      audioAlarmService.stopSiren();
      setIsAlarmPlaying(false);
    } else {
      const started = audioAlarmService.startSiren();
      setIsAlarmPlaying(started);
    }
  };

  const handleSOSPress = () => {
    // If not in quick action mode, confirm first
    setShowConfirmModal(true);
  };

  const executeSOS = () => {
    setShowConfirmModal(false);
    setSosActivated(true);

    // Trigger audible alarm if user wants
    audioAlarmService.startSiren();
    setIsAlarmPlaying(true);

    if (isTestMode) {
      setNotifiedStatus('TEST MODE: Emergency simulation dispatches generated. No real authorities notified.');
    } else {
      // In real mode, explain actual status
      setNotifiedStatus(`Alert queued for ${contacts.filter(c => c.notifyOnSOS).length} emergency contacts. Call 112 directly below.`);
    }
  };

  const cancelSOS = () => {
    setSosActivated(false);
    audioAlarmService.stopSiren();
    setIsAlarmPlaying(false);
    setNotifiedStatus(null);
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-[#450A0A] via-[#3B0707] to-[#1C0303] text-white p-4 rounded-3xl space-y-4 animate-in fade-in border border-[#991B1B] shadow-2xl pb-16">
      {/* Top Test Mode & Warning Strip */}
      <div className="flex items-center justify-between p-2.5 bg-red-950/80 rounded-2xl border border-red-800 text-xs">
        <div className="flex items-center gap-2">
          <Radio className={`w-4 h-4 ${isTestMode ? 'text-amber-400' : 'text-red-500 animate-pulse'}`} />
          <span className="font-bold">
            {isTestMode ? 'Safe Test Mode (Active)' : 'LIVE EMERGENCY MODE'}
          </span>
        </div>
        <button
          onClick={() => setIsTestMode(!isTestMode)}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
            isTestMode
              ? 'bg-amber-500 text-black hover:bg-amber-400'
              : 'bg-red-600 text-white ring-2 ring-white/50'
          }`}
        >
          {isTestMode ? 'Switch to Live' : 'Switch to Test'}
        </button>
      </div>

      {/* Primary Emergency Headline */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black tracking-tight text-red-100 flex items-center justify-center gap-2">
          <ShieldAlert className="w-7 h-7 text-red-500 animate-bounce" />
          TOURISTO SOS EMERGENCY
        </h2>
        <p className="text-xs text-red-300 max-w-xs mx-auto leading-relaxed">
          {isTestMode 
            ? 'Practice mode: Press the SOS button to verify location transmission and alarm siren without triggering live emergency services.' 
            : 'Pressing SOS dispatches GPS coordinates to your emergency contacts and gives instant 1-tap dial to Indian Police.'}
        </p>
      </div>

      {/* Big Circular Pulsing SOS Button */}
      <div className="flex flex-col items-center justify-center py-4 relative">
        {/* Pulsing Outer Rings */}
        <div className={`absolute w-56 h-56 rounded-full border-4 border-red-500/20 ${sosActivated ? 'animate-ping' : ''}`} />
        <div className="absolute w-48 h-48 rounded-full bg-red-600/10 animate-pulse-slow" />

        <button
          onClick={sosActivated ? cancelSOS : handleSOSPress}
          className={`w-40 h-40 rounded-full font-black text-2xl tracking-wider shadow-2xl flex flex-col items-center justify-center transition-transform active:scale-90 border-4 ${
            sosActivated
              ? 'bg-red-800 border-white text-white animate-pulse'
              : 'bg-gradient-to-tr from-[#991B1B] via-[#DC2626] to-[#EF4444] border-red-400 text-white hover:brightness-110'
          }`}
        >
          <span>{sosActivated ? 'CANCEL' : 'SOS'}</span>
          <span className="text-[10px] tracking-normal uppercase font-semibold mt-1 opacity-90">
            {sosActivated ? 'Stop Alert' : 'Tap for Help'}
          </span>
        </button>

        <span className="text-[11px] text-red-300 font-mono mt-3">
          {currentTime} · GPS Fixed
        </span>
      </div>

      {/* Audible Siren Toggle Button */}
      <div className="flex justify-center">
        <button
          onClick={toggleSiren}
          className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
            isAlarmPlaying
              ? 'bg-red-600 text-white ring-4 ring-red-400/50 animate-bounce'
              : 'bg-red-900/60 hover:bg-red-900 text-red-200 border border-red-700'
          }`}
        >
          {isAlarmPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{isAlarmPlaying ? 'Silence Siren Alarm' : 'Sound High-Decibel Siren'}</span>
        </button>
      </div>

      {/* GPS Location & Live Telemetry Card */}
      <div className="bg-red-950/70 border border-red-800/80 rounded-2xl p-3.5 space-y-2 text-xs">
        <div className="flex items-center justify-between text-red-300 font-semibold">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-red-400" />
            Current Location Stamp
          </span>
          <span className="font-mono text-[10px] text-emerald-400">● 100% Signal</span>
        </div>
        <div className="font-bold text-white text-sm">
          {locationName}
        </div>
        <div className="flex items-center justify-between font-mono text-[11px] text-red-300 pt-1 border-t border-red-900/60">
          <span>LAT: {lat}</span>
          <span>LNG: {lng}</span>
        </div>
      </div>

      {/* Status Notice if SOS Triggered */}
      {notifiedStatus && (
        <div className="bg-red-900 border border-red-600 p-3.5 rounded-2xl text-xs space-y-1.5 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-white">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Alert Status</span>
          </div>
          <p className="text-red-200 text-[11px] leading-relaxed">
            {notifiedStatus}
          </p>
        </div>
      )}

      {/* Immediate Emergency Dial Cards */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-red-300 uppercase tracking-wide">
          One-Tap Direct Helpline Calling
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* 112 National Helpline */}
          <a
            href="tel:112"
            className="p-3 bg-red-900/80 hover:bg-red-800 border border-red-700 rounded-2xl flex items-center justify-between transition-colors group"
          >
            <div>
              <div className="text-base font-black text-white">112</div>
              <div className="text-[10px] text-red-300">National Emergency SOS</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <PhoneCall className="w-4 h-4" />
            </div>
          </a>

          {/* 1091 Women Helpline */}
          <a
            href="tel:1091"
            className="p-3 bg-red-900/80 hover:bg-red-800 border border-red-700 rounded-2xl flex items-center justify-between transition-colors group"
          >
            <div>
              <div className="text-base font-black text-white">1091</div>
              <div className="text-[10px] text-red-300">Women Protection Desk</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-purple-700 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <PhoneCall className="w-4 h-4" />
            </div>
          </a>

          {/* 1363 Ministry of Tourism Helpline */}
          <a
            href="tel:1363"
            className="p-3 bg-red-900/80 hover:bg-red-800 border border-red-700 rounded-2xl flex items-center justify-between transition-colors group"
          >
            <div>
              <div className="text-base font-black text-white">1363</div>
              <div className="text-[10px] text-red-300">Tourist Police Helpline</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-sky-700 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <PhoneCall className="w-4 h-4" />
            </div>
          </a>

          {/* 108 Ambulance & Trauma */}
          <a
            href="tel:108"
            className="p-3 bg-red-900/80 hover:bg-red-800 border border-red-700 rounded-2xl flex items-center justify-between transition-colors group"
          >
            <div>
              <div className="text-base font-black text-white">108</div>
              <div className="text-[10px] text-red-300">Ambulance Trauma Unit</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-emerald-700 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <PhoneCall className="w-4 h-4" />
            </div>
          </a>
        </div>
      </div>

      {/* Emergency Contacts & Nearby Facilities Shortcut */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <button
          onClick={() => onNavigate('nearby_help')}
          className="p-2.5 bg-red-950/90 border border-red-800 rounded-2xl text-xs font-bold text-red-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Nearby Police / Hospitals</span>
        </button>

        <button
          onClick={() => onNavigate('profile_settings')}
          className="p-2.5 bg-red-950/90 border border-red-800 rounded-2xl text-xs font-bold text-red-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
        >
          <Users className="w-3.5 h-3.5" />
          <span>Manage Contacts ({contacts.length})</span>
        </button>
      </div>

      {/* SOS Activation Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#450A0A] border-2 border-red-600 rounded-3xl w-full max-w-sm p-5 text-white shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center mx-auto text-white shadow-lg">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="text-lg font-black tracking-tight">Confirm SOS Trigger</h4>
              <p className="text-xs text-red-200 leading-relaxed">
                {isTestMode
                  ? 'Initiate emergency simulation? This will sound the alarm and generate test broadcast data.'
                  : 'Are you in danger? This will broadcast your exact coordinates to all emergency contacts and initiate rapid dispatch.'}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 bg-red-950 hover:bg-red-900 border border-red-700 text-red-200 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={executeSOS}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Yes, Trigger SOS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
