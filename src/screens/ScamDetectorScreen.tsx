import React, { useState } from 'react';
import { scamScoringEngine } from '../services/scamScoringEngine';
import { dbStorage } from '../services/dbStorage';
import { ScamAssessment } from '../types/touristo';
import { 
  AlertTriangle, 
  ShieldCheck, 
  ShieldAlert, 
  Car, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Info, 
  Save, 
  RotateCcw,
  Sparkles,
  History,
  AlertCircle
} from 'lucide-react';

export const ScamDetectorScreen: React.FC = () => {
  const [transportType, setTransportType] = useState('Auto Rickshaw');
  const [fromLoc, setFromLoc] = useState('New Delhi Railway Station (NDLS)');
  const [toLoc, setToLoc] = useState('Paharganj Main Bazaar');
  const [distanceKm, setDistanceKm] = useState<number>(2.5);
  const [quotedFare, setQuotedFare] = useState<string>('350');
  const [isNightTime, setIsNightTime] = useState<boolean>(false);
  const [travelerType, setTravelerType] = useState('International tourist');
  
  // Circumstance checkboxes
  const [circumstances, setCircumstances] = useState<string[]>([
    'Driver refused meter',
  ]);

  const [assessment, setAssessment] = useState<ScamAssessment | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showPastHistory, setShowPastHistory] = useState(false);

  const circumstanceOptions = [
    'Driver refused meter ("Meter is broken")',
    'Driver said hotel is closed / burnt down',
    'Tout approached unprompted inside transit hub',
    'Unregistered car / private white license plate',
    'Late night arrival (between 11 PM and 5 AM)',
    'Driver insists on visiting "Government Tourist Shop"',
  ];

  const handleToggleCircumstance = (item: string) => {
    setCircumstances((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  const handleCalculate = () => {
    const qFare = parseFloat(quotedFare) || 0;
    const result = scamScoringEngine.evaluate({
      transportType,
      fromLocation: fromLoc,
      toLocation: toLoc,
      distanceKm,
      quotedFare: qFare,
      isNightTime,
      circumstances,
    });
    setAssessment(result);
  };

  const handleSaveAssessment = () => {
    if (assessment) {
      dbStorage.saveScamReport(assessment);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  // Pre-fill realistic presets
  const applyPreset = (preset: 'ndls_overcharge' | 'airport_fair' | 'closed_hotel_scam') => {
    if (preset === 'ndls_overcharge') {
      setTransportType('Auto Rickshaw');
      setFromLoc('New Delhi Railway Station (NDLS)');
      setToLoc('Connaught Place Outer Circle');
      setDistanceKm(2.2);
      setQuotedFare('300');
      setIsNightTime(false);
      setCircumstances(['Driver refused meter ("Meter is broken")']);
    } else if (preset === 'airport_fair') {
      setTransportType('Prepaid Taxi (AC) / App Cab');
      setFromLoc('IGI Airport Terminal 3');
      setToLoc('Aerocity Hospitality District');
      setDistanceKm(4.5);
      setQuotedFare('180');
      setIsNightTime(false);
      setCircumstances([]);
    } else if (preset === 'closed_hotel_scam') {
      setTransportType('Prepaid Taxi (Non-AC)');
      setFromLoc('Delhi Airport T3');
      setToLoc('Hotel in Karol Bagh');
      setDistanceKm(16.0);
      setQuotedFare('2200');
      setIsNightTime(true);
      setCircumstances([
        'Driver said hotel is closed / burnt down',
        'Driver insists on visiting "Government Tourist Shop"',
      ]);
    }
  };

  return (
    <div className="space-y-4 pb-12 animate-in fade-in">
      {/* Header Notice Banner */}
      <div className="bg-[#FEF8D8] border border-[#F7E7A6] p-3.5 rounded-2xl flex items-start gap-2.5 text-xs text-[#785906]">
        <AlertTriangle className="w-4 h-4 text-[#8D6500] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Indian Motor Vehicles Tariff Validator:</span> Compare quoted auto/cab fares against official Delhi/state government tariffs and detect tout diversion scams before stepping in.
        </div>
      </div>

      {/* Preset Quick Tests */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
        <span className="text-[11px] font-bold text-[#62716F] shrink-0">Sample Scenarios:</span>
        <button
          onClick={() => applyPreset('ndls_overcharge')}
          className="px-2.5 py-1 rounded-xl bg-white border border-[#E2E8E6] text-[#172B2A] hover:bg-[#E6F6EF] hover:border-[#087F68] shrink-0 transition-colors"
        >
          NDLS Station Auto (₹300 for 2km)
        </button>
        <button
          onClick={() => applyPreset('closed_hotel_scam')}
          className="px-2.5 py-1 rounded-xl bg-white border border-[#E2E8E6] text-[#172B2A] hover:bg-red-50 hover:border-red-300 shrink-0 transition-colors"
        >
          "Hotel Closed" Diversion Trap
        </button>
        <button
          onClick={() => applyPreset('airport_fair')}
          className="px-2.5 py-1 rounded-xl bg-white border border-[#E2E8E6] text-[#172B2A] hover:bg-[#E6F6EF] shrink-0 transition-colors"
        >
          Airport Aerocity (Fair Fare)
        </button>
      </div>

      {/* Main Input Form */}
      <div className="bg-white rounded-3xl border border-[#E2E8E6] p-4 shadow-xs space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Transport Type */}
          <div>
            <label className="text-xs font-bold text-[#62716F] mb-1 block">
              Transport Type
            </label>
            <select
              value={transportType}
              onChange={(e) => setTransportType(e.target.value)}
              className="w-full text-xs font-semibold bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#087F68]"
            >
              <option value="Auto Rickshaw">Auto Rickshaw (Tuk-Tuk)</option>
              <option value="Prepaid Taxi (Non-AC)">Prepaid Taxi (Non-AC)</option>
              <option value="Prepaid Taxi (AC) / App Cab">Prepaid Taxi (AC) / App Cab</option>
              <option value="Airport Shuttle / Taxi">Airport Shuttle / Taxi</option>
              <option value="Cycle Rickshaw">Cycle Rickshaw</option>
            </select>
          </div>

          {/* Traveler Type */}
          <div>
            <label className="text-xs font-bold text-[#62716F] mb-1 block">
              Traveler Profile
            </label>
            <select
              value={travelerType}
              onChange={(e) => setTravelerType(e.target.value)}
              className="w-full text-xs font-semibold bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#087F68]"
            >
              <option value="International tourist">International Tourist (First visit)</option>
              <option value="Solo female">Solo Female Traveler</option>
              <option value="Family with kids">Family with Luggage</option>
              <option value="Domestic traveler">Domestic Traveler</option>
            </select>
          </div>
        </div>

        {/* Origin & Destination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-[#62716F] mb-1 block">
              Pickup Location
            </label>
            <input
              type="text"
              value={fromLoc}
              onChange={(e) => setFromLoc(e.target.value)}
              className="w-full text-xs bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#087F68]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#62716F] mb-1 block">
              Destination
            </label>
            <input
              type="text"
              value={toLoc}
              onChange={(e) => setToLoc(e.target.value)}
              className="w-full text-xs bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#087F68]"
            />
          </div>
        </div>

        {/* Distance & Quoted Fare */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-[#62716F] mb-1 block">
              Distance (km)
            </label>
            <input
              type="number"
              step="0.5"
              value={distanceKm}
              onChange={(e) => setDistanceKm(parseFloat(e.target.value) || 1)}
              className="w-full text-xs font-bold bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#087F68]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#62716F] mb-1 block">
              Quoted Fare (₹ INR)
            </label>
            <input
              type="number"
              value={quotedFare}
              onChange={(e) => setQuotedFare(e.target.value)}
              className="w-full text-xs font-bold text-[#087F68] bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#087F68]"
            />
          </div>
        </div>

        {/* Circumstance Red Flags */}
        <div>
          <label className="text-xs font-bold text-[#62716F] mb-1.5 block">
            Observed Circumstances & Behavior (Check all that apply)
          </label>
          <div className="space-y-1.5">
            {circumstanceOptions.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 p-2 rounded-xl bg-[#F5F7F7] hover:bg-[#E6F6EF] cursor-pointer transition-colors text-xs text-[#172B2A]"
              >
                <input
                  type="checkbox"
                  checked={circumstances.includes(opt)}
                  onChange={() => handleToggleCircumstance(opt)}
                  className="rounded text-[#087F68] focus:ring-[#087F68] w-4 h-4"
                />
                <span className="leading-tight">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Night Travel Switch */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="font-bold text-[#172B2A]">Night Journey (11:00 PM – 5:00 AM)</span>
            <p className="text-[11px] text-[#62716F]">Government tariff legally permits +25% night surcharge</p>
          </div>
          <input
            type="checkbox"
            checked={isNightTime}
            onChange={(e) => setIsNightTime(e.target.checked)}
            className="w-5 h-5 rounded text-[#087F68] focus:ring-[#087F68]"
          />
        </div>

        {/* Assess Button */}
        <button
          onClick={handleCalculate}
          className="w-full py-3.5 bg-[#07866D] hover:bg-[#075B4E] text-white font-bold rounded-2xl text-xs shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Analyze Travel Fare Risk</span>
        </button>
      </div>

      {/* Assessment Result Display */}
      {assessment && (
        <div className={`rounded-3xl p-5 shadow-sm space-y-4 border transition-all ${
          assessment.riskLevel === 'High'
            ? 'bg-rose-50 border-rose-200 text-rose-950'
            : assessment.riskLevel === 'Medium'
            ? 'bg-amber-50 border-amber-200 text-amber-950'
            : 'bg-emerald-50 border-emerald-200 text-emerald-950'
        }`}>
          {/* Risk Level Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white ${
                assessment.riskLevel === 'High'
                  ? 'bg-[#E53935]'
                  : assessment.riskLevel === 'Medium'
                  ? 'bg-[#F4B740]'
                  : 'bg-[#15965F]'
              }`}>
                {assessment.riskLevel === 'High' ? (
                  <ShieldAlert className="w-6 h-6" />
                ) : assessment.riskLevel === 'Medium' ? (
                  <AlertTriangle className="w-6 h-6" />
                ) : (
                  <ShieldCheck className="w-6 h-6" />
                )}
              </div>
              <div>
                <div className="text-xs uppercase font-extrabold tracking-wider opacity-80">
                  Assessment Result
                </div>
                <div className="text-xl font-black">
                  {assessment.riskLevel} Risk ({assessment.riskScore}/100)
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold opacity-80">Standard Tariff</div>
              <div className="text-lg font-black">₹{assessment.standardFare}</div>
            </div>
          </div>

          {/* Pricing Comparison Stats Bar */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-white/80 backdrop-blur-xs rounded-2xl border border-black/5 text-center text-xs">
            <div>
              <div className="text-[10px] text-slate-500 font-medium">Quoted Fare</div>
              <div className="font-black text-sm text-[#172B2A]">₹{assessment.quotedFare}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-medium">Official Benchmark</div>
              <div className="font-black text-sm text-[#087F68]">₹{assessment.standardFare}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-medium">Overcharge</div>
              <div className={`font-black text-sm ${
                assessment.quotedFare > assessment.standardFare ? 'text-red-600' : 'text-emerald-600'
              }`}>
                {assessment.quotedFare >= assessment.standardFare ? '+' : ''}
                {Math.round(((assessment.quotedFare - assessment.standardFare) / Math.max(1, assessment.standardFare)) * 100)}%
              </div>
            </div>
          </div>

          {/* Factor Breakdown */}
          <div className="space-y-1.5">
            <h5 className="text-xs font-bold uppercase tracking-wider">Influencing Risk Factors:</h5>
            <div className="space-y-1">
              {assessment.factors.map((factor, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 mt-1.5" />
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safer Recommendations */}
          <div className="p-3 bg-white/90 rounded-2xl border border-black/5 space-y-1.5">
            <h5 className="text-xs font-bold text-[#087F68] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Recommended Course of Action:
            </h5>
            <div className="space-y-1">
              {assessment.recommendations.map((rec, idx) => (
                <p key={idx} className="text-xs text-slate-700 leading-snug">
                  • {rec}
                </p>
              ))}
            </div>
          </div>

          {/* Save & Past Reports Actions */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleSaveAssessment}
              disabled={savedSuccess}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                savedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-[#172B2A] border border-black/10 hover:bg-slate-50'
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedSuccess ? 'Saved to History!' : 'Save Report'}</span>
            </button>

            <button
              onClick={() => setShowPastHistory(!showPastHistory)}
              className="px-3 py-2.5 bg-white text-[#62716F] border border-black/10 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-slate-50"
            >
              <History className="w-3.5 h-3.5" />
              <span>{showPastHistory ? 'Hide History' : 'Past Reports'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Past Reports List */}
      {showPastHistory && (
        <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 space-y-2">
          <h4 className="text-xs font-bold text-[#172B2A] uppercase">Saved Scam Reports</h4>
          {dbStorage.getScamReports().length === 0 ? (
            <p className="text-xs text-[#62716F]">No saved assessments yet.</p>
          ) : (
            <div className="space-y-2">
              {dbStorage.getScamReports().map((rep) => (
                <div key={rep.id} className="p-2.5 rounded-xl bg-[#F5F7F7] border border-[#E2E8E6] text-xs flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#172B2A]">{rep.fromLocation} → {rep.toLocation}</div>
                    <div className="text-[11px] text-[#62716F]">{rep.transportType} · Quoted: ₹{rep.quotedFare} (Benchmark: ₹{rep.standardFare})</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    rep.riskLevel === 'High' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {rep.riskLevel}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
