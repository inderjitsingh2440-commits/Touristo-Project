import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Navigation, 
  Search, 
  Compass, 
  PhoneCall, 
  Share2, 
  Check, 
  Clock, 
  AlertTriangle, 
  Info, 
  Car, 
  Footprints, 
  Bike, 
  RotateCcw, 
  CheckCircle2, 
  ShieldAlert, 
  LocateFixed, 
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  safeRouteService, 
  LocationPoint, 
  RouteSafetyOption, 
  EmergencyFacility 
} from '../services/safeRouteService';
import { SafeRouteMap } from '../components/routes/SafeRouteMap';

// Popular All-India Testing Presets
const PRESET_ROUTES: { label: string; origin: LocationPoint; destination: LocationPoint }[] = [
  {
    label: 'Chandigarh ➔ Shimla',
    origin: { name: 'Chandigarh', displayName: 'Chandigarh, 160017, India', lat: 30.7333, lon: 76.7794, state: 'Chandigarh' },
    destination: { name: 'Shimla Mall Road', displayName: 'Shimla, Himachal Pradesh, India', lat: 31.1048, lon: 77.1734, state: 'Himachal Pradesh' },
  },
  {
    label: 'Delhi ➔ Jaipur',
    origin: { name: 'Connaught Place, Delhi', displayName: 'Connaught Place, New Delhi, Delhi, India', lat: 28.6328, lon: 77.2195, state: 'Delhi' },
    destination: { name: 'Jaipur Pink City', displayName: 'Jaipur, Rajasthan, India', lat: 26.9124, lon: 75.7873, state: 'Rajasthan' },
  },
  {
    label: 'Mumbai ➔ Pune',
    origin: { name: 'Bandra, Mumbai', displayName: 'Bandra, Mumbai, Maharashtra, India', lat: 19.0596, lon: 72.8295, state: 'Maharashtra' },
    destination: { name: 'Shivajinagar, Pune', displayName: 'Shivajinagar, Pune, Maharashtra, India', lat: 18.5314, lon: 73.8446, state: 'Maharashtra' },
  },
  {
    label: 'Amritsar ➔ Ludhiana',
    origin: { name: 'Golden Temple, Amritsar', displayName: 'Amritsar, Punjab, India', lat: 31.6200, lon: 74.8765, state: 'Punjab' },
    destination: { name: 'Clock Tower, Ludhiana', displayName: 'Ludhiana, Punjab, India', lat: 30.9010, lon: 75.8573, state: 'Punjab' },
  },
  {
    label: 'Kalka ➔ Pinjore (Town to Village)',
    origin: { name: 'Kalka Station', displayName: 'Kalka, Haryana, India', lat: 30.8354, lon: 76.9351, state: 'Haryana' },
    destination: { name: 'Pinjore Gardens', displayName: 'Pinjore, Haryana, India', lat: 30.7981, lon: 76.9133, state: 'Haryana' },
  },
];

export const SafeRouteScreen: React.FC = () => {
  // Input fields state
  const [originText, setOriginText] = useState('Connaught Place, New Delhi');
  const [destinationText, setDestinationText] = useState('India Gate, New Delhi');

  const [originPoint, setOriginPoint] = useState<LocationPoint | null>({
    name: 'Connaught Place',
    displayName: 'Connaught Place, New Delhi, Delhi, India',
    lat: 28.6328,
    lon: 77.2195,
    state: 'Delhi',
  });

  const [destPoint, setDestPoint] = useState<LocationPoint | null>({
    name: 'India Gate',
    displayName: 'India Gate, Rajpath, New Delhi, Delhi, India',
    lat: 28.6129,
    lon: 77.2410,
    state: 'Delhi',
  });

  // Autocomplete suggestions
  const [originSuggestions, setOriginSuggestions] = useState<LocationPoint[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<LocationPoint[]>([]);
  const [isSearchingOrigin, setIsSearchingOrigin] = useState(false);
  const [isSearchingDest, setIsSearchingDest] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'origin' | 'dest' | null>(null);

  // Transit mode: Driving, Walking, Cycling
  const [travelMode, setTravelMode] = useState<'driving' | 'walking' | 'cycling'>('driving');

  // Calculation Results
  const [routes, setRoutes] = useState<RouteSafetyOption[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-arterial');
  const [emergencyFacilities, setEmergencyFacilities] = useState<EmergencyFacility[]>([]);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Live Location & Safety Sharing
  const [isLocatingUser, setIsLocatingUser] = useState(false);
  const [shareSuccessNotice, setShareSuccessNotice] = useState(false);
  const [showDetailedScoreModal, setShowDetailedScoreModal] = useState(false);

  // Time-of-day Caution Check
  const currentHour = new Date().getHours();
  const isNightHours = currentHour >= 20 || currentHour < 5;

  const originDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  const destDebounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Search Origin Autocomplete
  const handleOriginChange = (val: string) => {
    setOriginText(val);
    setActiveDropdown('origin');
    if (originDebounceTimer.current) clearTimeout(originDebounceTimer.current);

    if (val.trim().length >= 2) {
      setIsSearchingOrigin(true);
      originDebounceTimer.current = setTimeout(async () => {
        const results = await safeRouteService.searchLocations(val);
        setOriginSuggestions(results);
        setIsSearchingOrigin(false);
      }, 350);
    } else {
      setOriginSuggestions([]);
      setIsSearchingOrigin(false);
    }
  };

  // Search Destination Autocomplete
  const handleDestChange = (val: string) => {
    setDestinationText(val);
    setActiveDropdown('dest');
    if (destDebounceTimer.current) clearTimeout(destDebounceTimer.current);

    if (val.trim().length >= 2) {
      setIsSearchingDest(true);
      destDebounceTimer.current = setTimeout(async () => {
        const results = await safeRouteService.searchLocations(val);
        setDestSuggestions(results);
        setIsSearchingDest(false);
      }, 350);
    } else {
      setDestSuggestions([]);
      setIsSearchingDest(false);
    }
  };

  // Select Location from dropdown
  const handleSelectOrigin = (item: LocationPoint) => {
    setOriginPoint(item);
    setOriginText(item.name || item.displayName);
    setOriginSuggestions([]);
    setActiveDropdown(null);
  };

  const handleSelectDest = (item: LocationPoint) => {
    setDestPoint(item);
    setDestinationText(item.name || item.displayName);
    setDestSuggestions([]);
    setActiveDropdown(null);
  };

  // GPS Current Location Detection
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocatingUser(true);
    setErrorMsg(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const place = await safeRouteService.reverseGeocode(lat, lon);
        if (place) {
          setOriginPoint(place);
          setOriginText(place.name || place.displayName);
        }
        setIsLocatingUser(false);
      },
      (err) => {
        setIsLocatingUser(false);
        setErrorMsg('Could not access current location. Please ensure location permissions are enabled.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Swap Locations
  const handleSwapLocations = () => {
    const tempPoint = originPoint;
    const tempText = originText;
    setOriginPoint(destPoint);
    setOriginText(destinationText);
    setDestPoint(tempPoint);
    setDestinationText(tempText);
  };

  // Apply Preset Route
  const handleApplyPreset = (preset: typeof PRESET_ROUTES[0]) => {
    setOriginPoint(preset.origin);
    setOriginText(preset.origin.name);
    setDestPoint(preset.destination);
    setDestinationText(preset.destination.name);
    setActiveDropdown(null);
  };

  // Execute Route Calculation
  const handleCalculateRoutes = async () => {
    if (!originPoint || !destPoint) {
      setErrorMsg('Please specify both a starting point and destination in India.');
      return;
    }

    setIsLoadingRoutes(true);
    setErrorMsg(null);

    try {
      const res = await safeRouteService.calculateRoutes(originPoint, destPoint, travelMode);
      setRoutes(res.routes);
      if (res.routes.length > 0) {
        setSelectedRouteId(res.routes[0].id);
      }
      setEmergencyFacilities(res.emergencyFacilities);
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not calculate routes. Please check network connection.');
    } finally {
      setIsLoadingRoutes(false);
    }
  };

  // Auto-calculate on initial load
  useEffect(() => {
    if (originPoint && destPoint) {
      handleCalculateRoutes();
    }
  }, [travelMode]);

  const activeRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  // Share Route Alert via SMS/WhatsApp
  const handleShareRoute = () => {
    if (!activeRoute || !originPoint || !destPoint) return;

    const message = `🚨 TOURISTO Women Safety Route Alert:\nI am traveling from ${originPoint.name} to ${destPoint.name} via ${activeRoute.title}.\n• Distance: ${activeRoute.distanceKm} km (Est. time: ${activeRoute.durationMins} mins)\n• Safety Level: ${activeRoute.category} (${activeRoute.score ? `${activeRoute.score}/100` : 'Data Limited'})\n• Emergency: National Helpline 112\nPlease contact me if I do not reach safely in ${Math.round(activeRoute.durationMins * 1.5)} minutes.`;

    try {
      navigator.clipboard.writeText(message);
      setShareSuccessNotice(true);
      setTimeout(() => setShareSuccessNotice(false), 3000);

      // Open WhatsApp Web/App if on mobile
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4 pb-16 animate-in fade-in duration-200">
      
      {/* Top Banner Notice with Strict Legal Disclaimer */}
      <div className="bg-[#EDE7F6] border border-[#D1C4E9] p-4 rounded-3xl space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-2 text-[#5E35B1] font-bold text-xs">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span className="text-sm">All-India Women Safety Route Advisor</span>
        </div>
        <p className="text-xs text-[#553C9A] leading-relaxed">
          Recommends routes based on verifiable arterial road hierarchy, active commercial traffic, street illumination indicators, and verified proximity to police posts.
        </p>
        <p className="text-[11px] text-[#7E57C2] font-medium pt-0.5">
          <strong>Safety Advisory:</strong> No route can ever be guaranteed 100% safe. Always remain alert, inform trusted contacts, and dial 112 immediately in any emergency.
        </p>
      </div>

      {/* Night Caution Banner if after 8:00 PM */}
      {isNightHours && (
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block">Night-Time Travel Warning (8:00 PM – 5:00 AM)</strong>
            <span>Isolated service lanes and poorly lit secondary roads experience drastic drops in civilian footfall. Prefer well-patrolled arterial highways and avoid walking alone.</span>
          </div>
        </div>
      )}

      {/* Search & Location Card */}
      <div className="bg-white rounded-3xl border border-[#E2E8E6] p-4 sm:p-5 shadow-xs space-y-3.5 relative z-20">
        
        {/* Origin & Destination Inputs with Swap */}
        <div className="space-y-2.5 relative">
          
          {/* Starting Point (A) */}
          <div className="relative">
            <div className="flex items-center gap-2.5 bg-[#F5F7F7] border border-[#E2E8E6] rounded-2xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#087F68]/30">
              <div className="w-6 h-6 rounded-full bg-[#087F68] text-white flex items-center justify-center font-extrabold text-xs shrink-0">
                A
              </div>
              <div className="flex-1 min-w-0">
                <label className="text-[10px] uppercase font-bold text-[#62716F] block leading-none mb-1">
                  Starting Point (All India)
                </label>
                <input
                  type="text"
                  value={originText}
                  onChange={(e) => handleOriginChange(e.target.value)}
                  onFocus={() => setActiveDropdown('origin')}
                  placeholder="Enter starting city, landmark or village..."
                  className="w-full text-xs font-bold text-[#172B2A] bg-transparent focus:outline-hidden truncate"
                />
              </div>
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                disabled={isLocatingUser}
                className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#087F68] border border-[#E2E8E6] shadow-2xs text-[11px] font-bold flex items-center gap-1 shrink-0"
                title="Detect GPS Current Location"
              >
                <LocateFixed className={`w-3.5 h-3.5 ${isLocatingUser ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">GPS</span>
              </button>
            </div>

            {/* Origin Autocomplete Dropdown */}
            {activeDropdown === 'origin' && originSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8E6] rounded-2xl shadow-xl z-50 max-h-56 overflow-y-auto divide-y divide-slate-100">
                {originSuggestions.map((item, idx) => (
                  <button
                    key={item.id || `${item.lat}-${item.lon}-${idx}`}
                    type="button"
                    onClick={() => handleSelectOrigin(item)}
                    className="w-full text-left p-3 hover:bg-[#E6F6EF] transition-colors flex items-start gap-2.5 text-xs"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#087F68] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#172B2A]">{item.name}</div>
                      <div className="text-[11px] text-[#62716F] line-clamp-1">{item.displayName}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button Center Divider */}
          <div className="flex items-center justify-between px-3">
            <div className="border-l-2 border-dashed border-teal-300 ml-3 h-3" />
            <button
              type="button"
              onClick={handleSwapLocations}
              className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[#62716F] text-[10px] font-bold flex items-center gap-1 px-2.5 transition-colors border border-slate-200"
              title="Swap starting point and destination"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Swap</span>
            </button>
          </div>

          {/* Destination Point (B) */}
          <div className="relative">
            <div className="flex items-center gap-2.5 bg-[#F5F7F7] border border-[#E2E8E6] rounded-2xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#087F68]/30">
              <div className="w-6 h-6 rounded-full bg-[#E53935] text-white flex items-center justify-center font-extrabold text-xs shrink-0">
                B
              </div>
              <div className="flex-1 min-w-0">
                <label className="text-[10px] uppercase font-bold text-[#62716F] block leading-none mb-1">
                  Destination (All India)
                </label>
                <input
                  type="text"
                  value={destinationText}
                  onChange={(e) => handleDestChange(e.target.value)}
                  onFocus={() => setActiveDropdown('dest')}
                  placeholder="Enter destination city, monument or address..."
                  className="w-full text-xs font-bold text-[#172B2A] bg-transparent focus:outline-hidden truncate"
                />
              </div>
            </div>

            {/* Destination Autocomplete Dropdown */}
            {activeDropdown === 'dest' && destSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8E6] rounded-2xl shadow-xl z-50 max-h-56 overflow-y-auto divide-y divide-slate-100">
                {destSuggestions.map((item, idx) => (
                  <button
                    key={item.id || `${item.lat}-${item.lon}-${idx}`}
                    type="button"
                    onClick={() => handleSelectDest(item)}
                    className="w-full text-left p-3 hover:bg-[#E6F6EF] transition-colors flex items-start gap-2.5 text-xs"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#E53935] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#172B2A]">{item.name}</div>
                      <div className="text-[11px] text-[#62716F] line-clamp-1">{item.displayName}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mode Selector & Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          {/* Mode Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl self-start">
            {[
              { id: 'driving', label: 'Driving', icon: Car },
              { id: 'walking', label: 'Walking', icon: Footprints },
              { id: 'cycling', label: 'Cycling', icon: Bike },
            ].map((m) => {
              const Icon = m.icon;
              const isSelected = travelMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setTravelMode(m.id as any)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    isSelected 
                      ? 'bg-[#087F68] text-white shadow-2xs' 
                      : 'text-[#62716F] hover:text-[#172B2A]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Calculate Routes Button */}
          <button
            onClick={handleCalculateRoutes}
            disabled={isLoadingRoutes}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#087F68] hover:bg-[#075B4E] text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Compass className={`w-4 h-4 ${isLoadingRoutes ? 'animate-spin' : ''}`} />
            <span>{isLoadingRoutes ? 'Analyzing Safety Routes...' : 'Calculate Safe Routes'}</span>
          </button>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Quick Testing Presets Across India */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          <span className="text-[11px] font-bold text-[#62716F] uppercase tracking-wider block">
            Popular Route Presets (All India Testing):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_ROUTES.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(p)}
                className="px-2.5 py-1 bg-[#F5F7F7] hover:bg-[#E6F6EF] text-[#075B4E] text-[11px] font-semibold rounded-lg border border-[#E2E8E6] transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Interactive Map Visual */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs px-1">
          <div className="flex items-center gap-1.5 font-bold text-[#075B4E]">
            <Layers className="w-4 h-4" />
            <span>Interactive Route & Emergency Assistance Map</span>
          </div>
          <span className="text-[11px] text-[#62716F]">OpenStreetMap Engine</span>
        </div>

        <SafeRouteMap
          origin={originPoint}
          destination={destPoint}
          routes={routes}
          selectedRouteId={selectedRouteId}
          onSelectRoute={setSelectedRouteId}
          emergencyFacilities={emergencyFacilities}
        />
      </div>

      {/* Alternative Route Comparison Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-[#172B2A] uppercase tracking-wider">
            Available Route Options ({routes.length} Computed)
          </h3>
          <span className="text-[11px] text-[#62716F]">
            Click any route to highlight on map
          </span>
        </div>

        {routes.map((route) => {
          const isSelected = selectedRouteId === route.id;
          return (
            <div
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`p-4 sm:p-5 rounded-3xl border text-left cursor-pointer transition-all space-y-3 ${
                isSelected
                  ? route.isRecommended
                    ? 'bg-[#E6F6EF] border-[#087F68] ring-2 ring-[#087F68]/20 shadow-sm'
                    : 'bg-sky-50/60 border-sky-300 ring-2 ring-sky-200'
                  : 'bg-white border-[#E2E8E6] hover:bg-slate-50 shadow-2xs'
              }`}
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Score Badge */}
                  <div className={`w-10 h-10 rounded-2xl flex flex-col items-center justify-center font-black ${
                    route.score && route.score >= 80 
                      ? 'bg-[#087F68] text-white' 
                      : route.score && route.score >= 65 
                      ? 'bg-sky-600 text-white' 
                      : 'bg-amber-500 text-white'
                  }`}>
                    <span className="text-sm leading-none">{route.score || '--'}</span>
                    <span className="text-[8px] font-mono leading-none opacity-80">SCORE</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="font-extrabold text-xs sm:text-sm text-[#172B2A]">{route.title}</h4>
                      {route.isRecommended && (
                        <span className="text-[10px] font-bold text-white bg-[#087F68] px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#62716F] font-medium mt-0.5">
                      <span>{route.distanceKm} km</span>
                      <span aria-hidden="true">·</span>
                      <span>Approx. {route.durationMins} mins</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-800 font-semibold">{route.category}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRouteId(route.id);
                    setShowDetailedScoreModal(true);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-white/80 hover:bg-white text-[#087F68] border border-[#E2E8E6] text-[11px] font-bold shrink-0 transition-colors"
                >
                  Score Details
                </button>
              </div>

              {/* Summary description */}
              <p className="text-xs text-[#62716F] leading-relaxed">
                {route.summary}
              </p>

              {/* Advantages & Limitations tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="bg-white/80 rounded-xl p-2.5 border border-emerald-200/60 space-y-1">
                  <span className="font-bold text-[#075B4E] block">Key Safety Advantages:</span>
                  <ul className="space-y-0.5 text-slate-600 list-disc list-inside">
                    {route.advantages.map((adv, idx) => (
                      <li key={idx} className="line-clamp-1">{adv}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/80 rounded-xl p-2.5 border border-amber-200/60 space-y-1">
                  <span className="font-bold text-amber-900 block">Limitations & Cautions:</span>
                  <ul className="space-y-0.5 text-slate-600 list-disc list-inside">
                    {route.limitations.map((lim, idx) => (
                      <li key={idx} className="line-clamp-1">{lim}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contributing Factors Pills */}
              <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center gap-2 text-[11px]">
                {route.safetyFactors.map((f, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded-lg font-medium ${
                      f.status === 'positive' 
                        ? 'bg-emerald-100 text-emerald-900' 
                        : f.status === 'warning' 
                        ? 'bg-rose-100 text-rose-900' 
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <strong>{f.factor}:</strong> {f.detail}
                  </span>
                ))}
              </div>

              {/* Missing data transparency notice */}
              {route.missingDataNotice && (
                <div className="text-[10px] text-slate-500 italic flex items-center gap-1">
                  <Info className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{route.missingDataNotice}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Emergency Assistance Strip (112 & Women Helpline) */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-3xl p-4 sm:p-5 text-white shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-200 animate-pulse" />
              <h3 className="font-black text-sm uppercase tracking-wide">
                All-India 24x7 Emergency Assistance
              </h3>
            </div>
            <p className="text-xs text-red-100">
              Immediate connection to local police patrol, emergency ambulance & women distress dispatch.
            </p>
          </div>

          {/* Real Phone Call Integration */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <a
              href="tel:112"
              className="px-4 py-2 bg-white text-red-700 font-extrabold text-xs rounded-xl shadow-sm hover:bg-red-50 transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call 112 (Police)</span>
            </a>
            <a
              href="tel:1091"
              className="px-3.5 py-2 bg-red-800 hover:bg-red-900 text-white font-bold text-xs rounded-xl border border-red-400/40 transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Women 1091</span>
            </a>
          </div>
        </div>

        {/* Share Live Route Button */}
        <div className="pt-2 border-t border-white/20 flex items-center justify-between">
          <span className="text-xs text-red-100">
            Share active route & estimated arrival with trusted emergency contacts:
          </span>
          <button
            onClick={handleShareRoute}
            className="px-3 py-1.5 bg-black/25 hover:bg-black/40 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition-colors"
          >
            {shareSuccessNotice ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{shareSuccessNotice ? 'Copied & Opening WhatsApp...' : 'Share Route Alert'}</span>
          </button>
        </div>
      </div>

      {/* Nearby Verified Emergency Facilities List */}
      <div className="bg-white rounded-3xl border border-[#E2E8E6] p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#172B2A]">
              Nearby Verified Emergency Facilities along Route
            </h4>
            <p className="text-[11px] text-[#62716F]">
              Government police stations, medical trauma centers, and district control rooms.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {emergencyFacilities.map((fac) => (
            <div key={fac.id} className="p-3 bg-[#F5F7F7] rounded-2xl border border-[#E2E8E6] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#172B2A] flex items-center gap-1.5">
                  <span>{fac.type === 'police' ? '👮' : '🏥'}</span>
                  <span>{fac.name}</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  {fac.type}
                </span>
              </div>
              <p className="text-[11px] text-[#62716F] line-clamp-2">{fac.address || fac.description}</p>
              {fac.phone ? (
                <a
                  href={`tel:${fac.phone}`}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#087F68] hover:underline pt-0.5"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Call {fac.phone}</span>
                </a>
              ) : fac.contact ? (
                <span className="text-[11px] font-semibold text-emerald-800 block pt-0.5">
                  Helpline: {fac.contact}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Safety Score Breakdown Modal */}
      {showDetailedScoreModal && activeRoute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg p-5 border border-[#E2E8E6] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h4 className="font-bold text-sm text-[#172B2A]">{activeRoute.title}</h4>
                <p className="text-xs text-[#62716F]">Multi-factor safety indicator breakdown</p>
              </div>
              <button
                onClick={() => setShowDetailedScoreModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-[#E6F6EF] rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#075B4E] uppercase tracking-wider block">
                  Overall Computed Safety Score
                </span>
                <span className="text-3xl font-black text-[#087F68]">
                  {activeRoute.score ? `${activeRoute.score}/100` : 'Data Limited'}
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-white/80 px-3 py-1 rounded-xl">
                {activeRoute.category}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <span className="font-bold text-[#172B2A] block uppercase tracking-wider text-[11px]">
                Evaluation Breakdown:
              </span>
              {activeRoute.safetyFactors.map((f, idx) => (
                <div key={idx} className="p-3 bg-[#F5F7F7] rounded-xl flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-[#172B2A] block">{f.factor}</span>
                    <span className="text-slate-600 text-[11px]">{f.detail}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                    f.status === 'positive' ? 'bg-emerald-100 text-emerald-800' :
                    f.status === 'warning' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-800'
                  }`}>
                    {f.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
              <strong>Transparent Data Guarantee:</strong>
              <p className="text-[11px] leading-relaxed">
                Touristo does not invent crime statistics or fabricate local street ratings. If a rural or small-town road lacks verified public lighting tags, this is explicitly communicated as an indicator gap.
              </p>
            </div>

            <button
              onClick={() => setShowDetailedScoreModal(false)}
              className="w-full py-2.5 bg-[#087F68] hover:bg-[#075B4E] text-white font-bold text-xs rounded-xl"
            >
              Close Breakdown
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
