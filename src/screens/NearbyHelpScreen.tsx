import React, { useState } from 'react';
import { EMERGENCY_FACILITIES } from '../data/mockData';
import { EmergencyFacility } from '../types/touristo';
import { 
  MapPin, 
  PhoneCall, 
  Navigation, 
  ShieldCheck, 
  Clock, 
  Building2, 
  Cross, 
  Users, 
  Compass, 
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

export const NearbyHelpScreen: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'police' | 'hospital' | 'safe_zone' | 'women_desk'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<EmergencyFacility | null>(EMERGENCY_FACILITIES[0]);

  const filtered = EMERGENCY_FACILITIES.filter((f) => {
    const matchesType = filterType === 'all' || f.type === filterType;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getBadgeStyle = (type: EmergencyFacility['type']) => {
    switch (type) {
      case 'police': return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'hospital': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'women_desk': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'safe_zone': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-teal-100 text-teal-800 border-teal-200';
    }
  };

  const getFacilityIcon = (type: EmergencyFacility['type']) => {
    switch (type) {
      case 'police': return Building2;
      case 'hospital': return Cross;
      case 'women_desk': return Users;
      default: return ShieldCheck;
    }
  };

  return (
    <div className="space-y-4 pb-12 animate-in fade-in">
      {/* Header Info Banner */}
      <div className="bg-[#E6F6EF] border border-teal-200 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs text-[#075B4E]">
        <ShieldCheck className="w-4 h-4 text-[#087F68] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Verified Indian Public Assistance Points:</span> All displayed facilities operate with 24/7 manned emergency response teams and English-speaking tourist officers.
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: 'All Services' },
          { id: 'police', label: 'Police Stations' },
          { id: 'women_desk', label: 'Women Pink Booths' },
          { id: 'hospital', label: '24/7 Trauma Hospitals' },
          { id: 'safe_zone', label: 'Safe Havens' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              filterType === tab.id
                ? 'bg-[#087F68] text-white shadow-xs'
                : 'bg-white border border-[#E2E8E6] text-[#62716F] hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search assistance points by name or street..."
          className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E2E8E6] rounded-xl focus:outline-none focus:border-[#087F68]"
        />
      </div>

      {/* Interactive Map Visual with Location Pins */}
      <div className="relative w-full aspect-[16/9] bg-slate-900 rounded-3xl overflow-hidden shadow-md border border-slate-700">
        <svg className="w-full h-full" viewBox="0 0 600 340">
          <rect width="600" height="340" fill="#0f172a" />
          
          {/* Subtle grid lines */}
          <path d="M0 80 H600 M0 160 H600 M0 240 H600" stroke="#1e293b" strokeWidth="2" />
          <path d="M150 0 V340 M300 0 V340 M450 0 V340" stroke="#1e293b" strokeWidth="2" />

          {/* Road Network */}
          <path d="M40 170 Q300 190 560 170" stroke="#334155" strokeWidth="16" />
          <path d="M300 30 L300 310" stroke="#334155" strokeWidth="16" />
          <circle cx="300" cy="170" r="50" stroke="#334155" strokeWidth="10" fill="none" />

          {/* User's current location pin */}
          <circle cx="280" cy="165" r="7" fill="#087F68" stroke="#ffffff" strokeWidth="2">
            <animate attributeName="r" values="7;11;7" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="280" y="152" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">You are here</text>

          {/* Facility Pins */}
          {filtered.map((item, idx) => {
            // Distribute markers across canvas
            const coords = [
              { x: 310, y: 140 },
              { x: 330, y: 190 },
              { x: 200, y: 110 },
              { x: 390, y: 170 },
              { x: 290, y: 220 },
              { x: 440, y: 120 },
            ][idx % 6];

            const isCurrent = selectedFacility?.id === item.id;
            const pinColor = item.type === 'police' ? '#0284c7' : item.type === 'women_desk' ? '#db2777' : item.type === 'hospital' ? '#10b981' : '#8b5cf6';

            return (
              <g
                key={item.id}
                onClick={() => setSelectedFacility(item)}
                className="cursor-pointer group"
              >
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={isCurrent ? 12 : 9}
                  fill={pinColor}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />
                <text
                  x={coords.x}
                  y={coords.y + 20}
                  fill="#f1f5f9"
                  fontSize="8"
                  fontWeight={isCurrent ? 'bold' : 'normal'}
                  textAnchor="middle"
                >
                  {item.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Map Header Overlay */}
        <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-bold text-white flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-teal-400" />
          <span>Central Delhi Assistance Radar (5 km Radius)</span>
        </div>
      </div>

      {/* Facilities List Cards */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-[#172B2A]">
          <span>{filtered.length} Emergency Posts Discovered</span>
          <span className="text-[#62716F]">Sorted by proximity</span>
        </div>

        {filtered.map((facility) => {
          const Icon = getFacilityIcon(facility.type);
          const isSelected = selectedFacility?.id === facility.id;

          return (
            <div
              key={facility.id}
              onClick={() => setSelectedFacility(facility)}
              className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all space-y-2 ${
                isSelected
                  ? 'bg-white border-[#087F68] ring-2 ring-[#087F68]/20 shadow-sm'
                  : 'bg-white border-[#E2E8E6] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#E6F6EF] text-[#087F68] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#172B2A] truncate">
                      {facility.name}
                    </h4>
                    <p className="text-[11px] text-[#62716F] truncate">
                      {facility.address}
                    </p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${getBadgeStyle(facility.type)}`}>
                  {facility.distanceKm} km away
                </span>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-3 text-[11px] text-[#62716F]">
                  <span className="flex items-center gap-1 font-semibold text-emerald-700">
                    <Clock className="w-3 h-3" />
                    Open 24/7
                  </span>
                  <span>·</span>
                  <span>~{facility.travelTimeMin} mins</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${facility.phone.replace(/[^0-9+]/g, '')}`}
                    className="px-2.5 py-1.5 bg-[#087F68] hover:bg-[#075B4E] text-white rounded-xl font-bold text-[11px] flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>Call Now</span>
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://maps.google.com/?q=${facility.lat},${facility.lng}`, '_blank');
                    }}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-[#172B2A] rounded-xl transition-colors"
                    title="Open Navigation"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
