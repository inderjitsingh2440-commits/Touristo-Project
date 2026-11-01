import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  MapPin, 
  Calendar, 
  Plane, 
  Train, 
  Bus, 
  Car, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Check, 
  Share2, 
  Utensils, 
  Sun, 
  Backpack, 
  Crown, 
  Compass, 
  Info,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Destination, Itinerary } from '../../data/exploreIndiaData';
import { dbStorage } from '../../services/dbStorage';

interface DestinationDetailModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onNavigateToExpense?: () => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onNavigateToExpense,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'attractions' | 'todo' | 'food' | 'reach' | 'itinerary' | 'budget'>('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedItineraryDays, setSelectedItineraryDays] = useState<number>(3);
  const [budgetDays, setBudgetDays] = useState<number>(3);
  const [budgetStyle, setBudgetStyle] = useState<'backpacker' | 'midRange' | 'luxury'>('midRange');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !destination) return null;

  const allImages = [destination.heroImage, ...(destination.gallery || [])];
  const activeImage = allImages[selectedImageIndex] || destination.heroImage;

  // Find itinerary matching selected duration or fallback to first
  const currentItinerary: Itinerary = destination.itineraries.find(it => it.daysCount === selectedItineraryDays) 
    || destination.itineraries[0];

  // Calculate dynamic budget for destination
  const rates = destination.budget[budgetStyle];
  const totalAccommodation = rates.accommodation * budgetDays;
  const totalFood = rates.food * budgetDays;
  const totalTransport = rates.transport * budgetDays;
  const totalActivities = rates.activities * budgetDays;
  const totalCostINR = totalAccommodation + totalFood + totalTransport + totalActivities;
  const approxUSD = Math.round(totalCostINR / 83.5);
  const approxEUR = Math.round(totalCostINR / 91.2);

  const handleCopyShare = () => {
    try {
      navigator.clipboard.writeText(
        `Explore ${destination.name}, ${destination.state} on Touristo — Your AI Travel Companion for India!`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-[#E2E8E6] overflow-hidden my-auto">
        
        {/* Top Floating Control Bar */}
        <div className="relative">
          {/* Main Hero Image */}
          <div className="h-60 sm:h-80 w-full relative overflow-hidden bg-slate-900">
            <img 
              src={activeImage} 
              alt={destination.name} 
              className="w-full h-full object-cover transition-all duration-500"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />

            {/* Top Action Icons */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5 border border-white/20">
                  <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                  {destination.state} · {destination.region} India
                </span>
                {destination.isHiddenGem && (
                  <span className="bg-amber-500/90 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                    Hidden Gem
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyShare}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
                  title="Share Destination"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => onToggleFavorite(destination.id)}
                  className={`p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
                    isFavorite ? 'bg-rose-500 text-white' : 'bg-black/40 hover:bg-black/60 text-white'
                  }`}
                  title={isFavorite ? 'Remove from Favourites' : 'Save to Favourites'}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Bottom Hero Info */}
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {destination.name}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200 font-medium mt-1">
                {destination.tagline}
              </p>
              {/* Unboxed Metadata (Rule: No pill enclosures for static metadata) */}
              <div className="flex items-center gap-2 text-xs text-white/80 mt-2 font-medium">
                <span>Best: {destination.bestTimeToVisit.recommendedMonths}</span>
                <span aria-hidden="true">·</span>
                <span>Avg: {destination.bestTimeToVisit.avgTemp}</span>
                <span aria-hidden="true">·</span>
                <span>{destination.topAttractions.length} Top Sights</span>
                <span aria-hidden="true">·</span>
                <span>{destination.itineraries.length} Ready Plans</span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-md p-1 rounded-xl">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-10 h-7 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx ? 'border-emerald-400 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Navigation Tabs (Interactive filter buttons) */}
        <div className="border-b border-[#E2E8E6] bg-[#F5F7F7] px-4 pt-2 overflow-x-auto no-scrollbar flex gap-1">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'attractions', label: `Attractions (${destination.topAttractions.length})` },
            { id: 'todo', label: `Things to Do (${destination.thingsToDo.length})` },
            { id: 'food', label: 'Food & Culture' },
            { id: 'reach', label: 'How to Reach' },
            { id: 'itinerary', label: 'Itineraries' },
            { id: 'budget', label: 'Budget Estimator' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-all whitespace-nowrap border-t border-x ${
                activeTab === tab.id
                  ? 'bg-white text-[#087F68] border-[#E2E8E6] -mb-[1px] shadow-xs'
                  : 'text-[#62716F] hover:text-[#172B2A] border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Tab Content Area */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-[#172B2A]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-[#E6F6EF]/50 border border-[#087F68]/15 rounded-2xl p-4">
                <h4 className="text-xs font-bold text-[#075B4E] uppercase tracking-wider mb-1">
                  Destination Summary
                </h4>
                <p className="text-xs sm:text-sm text-[#172B2A] leading-relaxed">
                  {destination.overview}
                </p>
              </div>

              {/* Quick Key Facts Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-white rounded-2xl border border-[#E2E8E6] shadow-2xs">
                  <span className="text-[11px] text-[#62716F] block">Region</span>
                  <span className="font-bold text-sm text-[#087F68]">{destination.region} India</span>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-[#E2E8E6] shadow-2xs">
                  <span className="text-[11px] text-[#62716F] block">State</span>
                  <span className="font-bold text-sm text-[#172B2A]">{destination.state}</span>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-[#E2E8E6] shadow-2xs">
                  <span className="text-[11px] text-[#62716F] block">Prime Season</span>
                  <span className="font-bold text-sm text-[#172B2A]">{destination.bestTimeToVisit.recommendedMonths}</span>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-[#E2E8E6] shadow-2xs">
                  <span className="text-[11px] text-[#62716F] block">Daily Budget</span>
                  <span className="font-bold text-sm text-emerald-700">₹{rates.accommodation + rates.food + rates.transport + rates.activities} / day</span>
                </div>
              </div>

              {/* Best Time To Visit Spotlight */}
              <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#172B2A]">
                    Best Time to Visit & Climate
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#F5F7F7] rounded-xl space-y-1">
                    <span className="font-bold text-[#075B4E] block">Peak Season</span>
                    <p className="text-[#62716F]">{destination.bestTimeToVisit.peakSeason}</p>
                  </div>
                  <div className="p-3 bg-[#F5F7F7] rounded-xl space-y-1">
                    <span className="font-bold text-[#075B4E] block">Off-Season</span>
                    <p className="text-[#62716F]">{destination.bestTimeToVisit.offSeason}</p>
                  </div>
                </div>
                <p className="text-xs text-[#62716F] pt-1 leading-relaxed">
                  <strong>Weather Overview:</strong> {destination.bestTimeToVisit.weatherOverview}
                </p>
              </div>

              {/* Highlights Preview */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#075B4E]">
                  Signature Attractions & Experiences
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {destination.topAttractions.slice(0, 2).map((att, idx) => (
                    <div key={idx} className="p-3.5 bg-white rounded-2xl border border-[#E2E8E6] space-y-1.5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#172B2A]">{att.name}</span>
                        <span className="text-[10px] text-emerald-700 font-semibold bg-[#E6F6EF] px-2 py-0.5 rounded-md">{att.highlight}</span>
                      </div>
                      <p className="text-xs text-[#62716F] line-clamp-2">{att.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ATTRACTIONS */}
          {activeTab === 'attractions' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#172B2A]">Must-Visit Landmarks in {destination.name}</h3>
                  <p className="text-xs text-[#62716F]">Verified entrance timings and official ticket guidelines.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {destination.topAttractions.map((att, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#E6F6EF] text-[#087F68] text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <h4 className="font-bold text-sm text-[#172B2A]">{att.name}</h4>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 pl-7 leading-relaxed">
                          {att.description}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#087F68] bg-[#E6F6EF] px-2.5 py-1 rounded-xl shrink-0">
                        {att.highlight}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 pl-7 flex flex-wrap items-center gap-4 text-xs text-[#62716F]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span><strong>Timings:</strong> {att.timing}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                        <span><strong>Entry Fee:</strong> {att.entryFee}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: THINGS TO DO */}
          {activeTab === 'todo' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-sm font-bold text-[#172B2A]">Curated Experiences & Activities</h3>
                <p className="text-xs text-[#62716F]">From pulse-pounding adventures to tranquil artisan craft workshops.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {destination.thingsToDo.map((act, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#087F68]">
                          {act.category}
                        </span>
                        <span className="text-[11px] text-[#62716F] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {act.duration}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-[#172B2A] mb-1">{act.title}</h4>
                      <p className="text-xs text-[#62716F] leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FOOD & LOCAL CULTURE */}
          {activeTab === 'food' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Cultural Heritage Banner */}
              <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-2xl p-4 text-xs space-y-1.5">
                <h4 className="font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Cultural Soul of {destination.name}
                </h4>
                <p className="text-amber-950 leading-relaxed">
                  {destination.foodAndCulture.culturalTradition}
                </p>
              </div>

              {/* Famous Regional Dishes */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#075B4E] uppercase tracking-wider flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-[#087F68]" />
                  Iconic Local Gastronomy & Where to Taste
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {destination.foodAndCulture.famousDishes.map((dish, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-[#E2E8E6] p-3.5 shadow-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#172B2A]">{dish.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          dish.type === 'Veg' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          dish.type === 'Non-Veg' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {dish.type}
                        </span>
                      </div>
                      <p className="text-xs text-[#62716F] leading-relaxed">{dish.description}</p>
                      <div className="text-[11px] text-[#075B4E] font-medium pt-1">
                        <strong>Try at:</strong> {dish.whereToTry}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traditional Festivals */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#075B4E] uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#087F68]" />
                  Traditional Festivals & Celebrations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {destination.foodAndCulture.festivals.map((fest, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-[#E2E8E6] p-3.5 shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#172B2A]">{fest.name}</span>
                        <span className="text-[11px] text-[#087F68] font-semibold">{fest.month}</span>
                      </div>
                      <p className="text-xs text-[#62716F] leading-relaxed">{fest.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Local Markets */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#075B4E] uppercase tracking-wider">
                  Authentic Local Bazaars & Artisan Souvenirs
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {destination.foodAndCulture.localMarkets.map((mkt, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-[#E2E8E6] p-3.5 shadow-xs space-y-1">
                      <h5 className="font-bold text-xs text-[#172B2A]">{mkt.name}</h5>
                      <p className="text-xs text-[#62716F]"><strong>Famous for:</strong> {mkt.famousFor}</p>
                      <p className="text-[11px] text-emerald-800 bg-emerald-50 p-1.5 rounded-lg">
                        <strong>Insider Tip:</strong> {mkt.tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: HOW TO REACH */}
          {activeTab === 'reach' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-sm font-bold text-[#172B2A]">Transit & Connectivity to {destination.name}</h3>
                <p className="text-xs text-[#62716F]">Flight gateways, railway networks, and local transit choices.</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-50 text-sky-700 shrink-0">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#172B2A] mb-1">Nearest Airport</h4>
                    <p className="text-xs text-[#62716F] leading-relaxed">{destination.howToReach.airport}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                    <Train className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#172B2A] mb-1">Railway Connectivity</h4>
                    <p className="text-xs text-[#62716F] leading-relaxed">{destination.howToReach.railway}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#172B2A] mb-1">Inter-State Bus Routes</h4>
                    <p className="text-xs text-[#62716F] leading-relaxed">{destination.howToReach.bus}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#172B2A] mb-1">Local City Transportation</h4>
                    <p className="text-xs text-[#62716F] leading-relaxed">{destination.howToReach.localTransport}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: ITINERARIES */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-[#172B2A]">Ready-Made Travel Itineraries</h3>
                  <p className="text-xs text-[#62716F]">Carefully structured day-by-day morning, afternoon & evening schedules.</p>
                </div>

                {/* Duration Selector Tabs */}
                <div className="flex items-center gap-1 p-1 bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl self-start">
                  {[1, 2, 3, 5, 7].map((days) => (
                    <button
                      key={days}
                      onClick={() => setSelectedItineraryDays(days)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                        selectedItineraryDays === days 
                          ? 'bg-[#087F68] text-white shadow-xs' 
                          : 'text-[#62716F] hover:text-[#172B2A]'
                      }`}
                    >
                      {days} {days === 1 ? 'Day' : 'Days'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Itinerary Card */}
              <div className="bg-[#E6F6EF]/40 border border-[#087F68]/20 rounded-2xl p-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#087F68]">
                    {currentItinerary.daysCount}-Day Plan
                  </span>
                  <span className="text-xs text-[#62716F]">·</span>
                  <h4 className="font-bold text-xs text-[#172B2A]">{currentItinerary.title}</h4>
                </div>
                <p className="text-xs text-[#62716F]">{currentItinerary.summary}</p>
              </div>

              {/* Day-by-Day Timeline */}
              <div className="space-y-3 pt-1">
                {currentItinerary.schedule.map((day) => (
                  <div key={day.day} className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-[#087F68] text-white font-black text-xs flex items-center justify-center">
                          D{day.day}
                        </span>
                        <h5 className="font-bold text-xs text-[#172B2A]">{day.title}</h5>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-2.5 bg-[#F5F7F7] rounded-xl space-y-1">
                        <span className="font-bold text-[#075B4E] block">🌅 Morning</span>
                        <p className="text-[#62716F] leading-relaxed">{day.morning}</p>
                      </div>
                      <div className="p-2.5 bg-[#F5F7F7] rounded-xl space-y-1">
                        <span className="font-bold text-[#075B4E] block">☀️ Afternoon</span>
                        <p className="text-[#62716F] leading-relaxed">{day.afternoon}</p>
                      </div>
                      <div className="p-2.5 bg-[#F5F7F7] rounded-xl space-y-1">
                        <span className="font-bold text-[#075B4E] block">🌙 Evening</span>
                        <p className="text-[#62716F] leading-relaxed">{day.evening}</p>
                      </div>
                    </div>

                    <div className="text-[11px] text-[#075B4E] bg-[#E6F6EF]/60 p-2 rounded-xl flex items-center gap-1.5 font-medium">
                      <Utensils className="w-3.5 h-3.5 shrink-0" />
                      <span><strong>Suggested Dining:</strong> {day.recommendedMeals}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: BUDGET ESTIMATOR */}
          {activeTab === 'budget' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-sm font-bold text-[#172B2A]">Travel Budget Estimator for {destination.name}</h3>
                <p className="text-xs text-[#62716F]">Calculate realistic expenses based on your preferred travel comfort tier.</p>
              </div>

              {/* Style Controls */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'backpacker', label: 'Backpacker', icon: Backpack, desc: 'Hostels, public transit & street food' },
                  { id: 'midRange', label: 'Mid-Range', icon: Compass, desc: '3-star hotels, cabs & heritage dining' },
                  { id: 'luxury', label: 'Luxury', icon: Crown, desc: 'Heritage havelis, private chauffeur & fine dining' },
                ].map((tier) => {
                  const Icon = tier.icon;
                  const isSelected = budgetStyle === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setBudgetStyle(tier.id as any)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected 
                          ? 'bg-[#E6F6EF] border-[#087F68] ring-1 ring-[#087F68] shadow-xs' 
                          : 'bg-white border-[#E2E8E6] hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[#087F68]' : 'text-slate-400'}`} />
                        {isSelected && <span className="w-2 h-2 rounded-full bg-[#087F68]" />}
                      </div>
                      <span className="font-bold text-xs text-[#172B2A] block">{tier.label}</span>
                      <span className="text-[10px] text-[#62716F] line-clamp-1">{tier.desc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Duration Slider */}
              <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#172B2A]">Trip Duration:</span>
                  <span className="font-extrabold text-sm text-[#087F68]">{budgetDays} {budgetDays === 1 ? 'Day' : 'Days'}</span>
                </div>
                <input 
                  type="range"
                  min={1}
                  max={14}
                  value={budgetDays}
                  onChange={(e) => setBudgetDays(parseInt(e.target.value))}
                  className="w-full accent-[#087F68] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1 day</span>
                  <span>3 days</span>
                  <span>7 days</span>
                  <span>14 days</span>
                </div>
              </div>

              {/* Itemized Cost Breakdown Card */}
              <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-[#075B4E] uppercase tracking-wider">
                  Itemized Expense Breakdown ({budgetDays} Days · {budgetStyle.toUpperCase()})
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-3 bg-[#F5F7F7] rounded-xl space-y-1">
                    <span className="text-[#62716F] text-[11px] block">🏨 Stay ({budgetDays}d)</span>
                    <span className="font-extrabold text-[#172B2A]">₹{totalAccommodation.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">₹{rates.accommodation}/night</span>
                  </div>

                  <div className="p-3 bg-[#F5F7F7] rounded-xl space-y-1">
                    <span className="text-[#62716F] text-[11px] block">🍲 Food & Dining</span>
                    <span className="font-extrabold text-[#172B2A]">₹{totalFood.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">₹{rates.food}/day</span>
                  </div>

                  <div className="p-3 bg-[#F5F7F7] rounded-xl space-y-1">
                    <span className="text-[#62716F] text-[11px] block">🚖 Transport</span>
                    <span className="font-extrabold text-[#172B2A]">₹{totalTransport.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">₹{rates.transport}/day</span>
                  </div>

                  <div className="p-3 bg-[#F5F7F7] rounded-xl space-y-1">
                    <span className="text-[#62716F] text-[11px] block">🎟️ Activities & Entry</span>
                    <span className="font-extrabold text-[#172B2A]">₹{totalActivities.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">₹{rates.activities}/day</span>
                  </div>
                </div>

                {/* Total Estimated Cost Banner */}
                <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#E6F6EF] -mx-4 -mb-4 p-4 rounded-b-2xl">
                  <div>
                    <span className="text-[11px] font-bold text-[#075B4E] uppercase tracking-wider block">
                      Total Estimated Trip Cost
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-[#087F68]">
                        ₹{totalCostINR.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-600 font-semibold font-mono">
                        (~${approxUSD} USD / ~€{approxEUR} EUR)
                      </span>
                    </div>
                  </div>

                  {onNavigateToExpense && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToExpense();
                      }}
                      className="px-4 py-2 bg-[#087F68] hover:bg-[#075B4E] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 self-start sm:self-auto"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Open in Expense Tracker</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="border-t border-[#E2E8E6] bg-[#F5F7F7] p-3 sm:p-4 flex items-center justify-between">
          <button
            onClick={() => onToggleFavorite(destination.id)}
            className={`px-3 py-2 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition-colors ${
              isFavorite 
                ? 'bg-rose-50 text-rose-700 border-rose-200' 
                : 'bg-white text-[#62716F] border-[#E2E8E6] hover:text-[#172B2A]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current text-rose-500' : ''}`} />
            <span>{isFavorite ? 'Saved in Favourites' : 'Add to Favourites'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#087F68] hover:bg-[#075B4E] text-white rounded-xl text-xs font-bold transition-colors"
          >
            Close Explorer
          </button>
        </div>

      </div>
    </div>
  );
};
