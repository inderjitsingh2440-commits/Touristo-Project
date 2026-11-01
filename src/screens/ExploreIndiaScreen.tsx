import React, { useState, useMemo } from 'react';
import { ScreenId } from '../types/touristo';
import { 
  Search, 
  MapPin, 
  Compass, 
  Heart, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  Filter, 
  ArrowRight, 
  RotateCcw,
  Utensils, 
  Backpack, 
  Crown, 
  Clock, 
  Mountain, 
  Palmtree, 
  Landmark, 
  Flame, 
  TreePine, 
  Waves, 
  Building2,
  CheckCircle2,
  Share2,
  BookOpen,
  Info
} from 'lucide-react';
import { 
  DESTINATIONS_DATA, 
  CATEGORIES_LIST, 
  REGIONS_LIST, 
  REGIONAL_FOOD_SPECIALTIES, 
  UPCOMING_FESTIVALS, 
  Destination, 
  DestinationCategory, 
  IndianRegion 
} from '../data/exploreIndiaData';
import { dbStorage } from '../services/dbStorage';
import { DestinationDetailModal } from '../components/explore/DestinationDetailModal';

interface ExploreIndiaScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ExploreIndiaScreen: React.FC<ExploreIndiaScreenProps> = ({ onNavigate }) => {
  // Navigation View State
  const [activeMainTab, setActiveMainTab] = useState<'destinations' | 'hiddengems' | 'food_culture' | 'itineraries' | 'budget_calculator' | 'saved'>('destinations');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<IndianRegion | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory | 'all'>('all');
  const [onlyHiddenGems, setOnlyHiddenGems] = useState(false);

  // Selected Destination Modal
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Favourites state from dbStorage
  const [favorites, setFavorites] = useState<string[]>(() => dbStorage.getFavoriteDestinations());

  // Interactive standalone Itinerary Explorer state
  const [itineraryDestId, setItineraryDestId] = useState<string>('jaipur');
  const [itineraryDays, setItineraryDays] = useState<number>(3);

  // Interactive standalone Budget Calculator state
  const [budgetCalcDestId, setBudgetCalcDestId] = useState<string>('jaipur');
  const [budgetCalcDays, setBudgetCalcDays] = useState<number>(5);
  const [budgetCalcStyle, setBudgetCalcStyle] = useState<'backpacker' | 'midRange' | 'luxury'>('midRange');

  const toggleFavorite = (id: string) => {
    const updated = dbStorage.toggleFavoriteDestination(id);
    setFavorites(updated);
  };

  const isFav = (id: string) => favorites.includes(id);

  // Filtered Destinations Logic
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS_DATA.filter((dest) => {
      // Main tab constraint
      if (activeMainTab === 'hiddengems' && !dest.isHiddenGem) return false;
      if (activeMainTab === 'saved' && !favorites.includes(dest.id)) return false;

      // Filter: Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = dest.name.toLowerCase().includes(q);
        const matchesState = dest.state.toLowerCase().includes(q);
        const matchesTagline = dest.tagline.toLowerCase().includes(q);
        const matchesAttraction = dest.topAttractions.some(a => a.name.toLowerCase().includes(q));
        if (!matchesName && !matchesState && !matchesTagline && !matchesAttraction) {
          return false;
        }
      }

      // Filter: Region
      if (selectedRegion !== 'All' && dest.region !== selectedRegion) {
        return false;
      }

      // Filter: Category
      if (selectedCategory !== 'all' && !dest.categories.includes(selectedCategory)) {
        return false;
      }

      // Filter: Hidden gem checkbox (if in destinations tab)
      if (onlyHiddenGems && !dest.isHiddenGem) {
        return false;
      }

      return true;
    });
  }, [activeMainTab, searchQuery, selectedRegion, selectedCategory, onlyHiddenGems, favorites]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('All');
    setSelectedCategory('all');
    setOnlyHiddenGems(false);
  };

  // Itinerary explorer destination lookup
  const currentItineraryDest = DESTINATIONS_DATA.find(d => d.id === itineraryDestId) || DESTINATIONS_DATA[0];
  const activeItineraryPlan = currentItineraryDest.itineraries.find(it => it.daysCount === itineraryDays) 
    || currentItineraryDest.itineraries[0];

  // Budget calculator rates lookup
  const currentBudgetDest = DESTINATIONS_DATA.find(d => d.id === budgetCalcDestId) || DESTINATIONS_DATA[0];
  const activeBudgetRate = currentBudgetDest.budget[budgetCalcStyle];
  const calcStay = activeBudgetRate.accommodation * budgetCalcDays;
  const calcFood = activeBudgetRate.food * budgetCalcDays;
  const calcTransport = activeBudgetRate.transport * budgetCalcDays;
  const calcActivities = activeBudgetRate.activities * budgetCalcDays;
  const calcTotalINR = calcStay + calcFood + calcTransport + calcActivities;
  const calcUSD = Math.round(calcTotalINR / 83.5);
  const calcEUR = Math.round(calcTotalINR / 91.2);

  // Category Icon Resolver
  const renderCategoryIcon = (id: DestinationCategory) => {
    switch (id) {
      case 'mountains': return <Mountain className="w-3.5 h-3.5" />;
      case 'beaches': return <Palmtree className="w-3.5 h-3.5" />;
      case 'heritage': return <Landmark className="w-3.5 h-3.5" />;
      case 'spiritual': return <Flame className="w-3.5 h-3.5" />;
      case 'wildlife': return <TreePine className="w-3.5 h-3.5" />;
      case 'adventure': return <Compass className="w-3.5 h-3.5" />;
      case 'nature': return <Waves className="w-3.5 h-3.5" />;
      case 'city': return <Building2 className="w-3.5 h-3.5" />;
      default: return <Compass className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-5 pb-16 animate-in fade-in duration-300">
      
      {/* Premium Hero Banner */}
      <div className="bg-gradient-to-br from-[#087F68] to-[#075B4E] rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-medium">
                Incredible India Tourism Hub
              </span>
              <span className="text-xs text-emerald-200">28 States & 8 UTs</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Explore India
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Discover timeless palaces, spiritual riverbanks, hidden valleys, regional street food, and curated day-wise travel itineraries.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => setActiveMainTab('saved')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                activeMainTab === 'saved' 
                  ? 'bg-white text-[#087F68]' 
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${activeMainTab === 'saved' ? 'fill-current text-rose-500' : ''}`} />
              <span>Saved ({favorites.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Section Navigation Bar (Interactive Tabs) */}
      <div className="flex items-center p-1 bg-white border border-[#E2E8E6] rounded-2xl shadow-xs overflow-x-auto no-scrollbar gap-1">
        {[
          { id: 'destinations', label: 'All Destinations', icon: Compass },
          { id: 'hiddengems', label: 'Hidden Gems', icon: Sparkles },
          { id: 'food_culture', label: 'Food & Culture', icon: Utensils },
          { id: 'itineraries', label: 'Itinerary Planner', icon: Calendar },
          { id: 'budget_calculator', label: 'Budget Estimator', icon: DollarSign },
          { id: 'saved', label: `Favourites (${favorites.length})`, icon: Heart },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMainTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveMainTab(tab.id as any);
                if (tab.id === 'hiddengems') setOnlyHiddenGems(true);
                else setOnlyHiddenGems(false);
              }}
              className={`flex-1 min-w-[120px] py-2.5 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shrink-0 ${
                isActive
                  ? 'bg-[#087F68] text-white shadow-xs'
                  : 'text-[#62716F] hover:text-[#172B2A] hover:bg-[#F5F7F7]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive && tab.id === 'saved' ? 'fill-current' : ''}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* VIEW 1: DESTINATIONS & HIDDEN GEMS & SAVED */}
      {(activeMainTab === 'destinations' || activeMainTab === 'hiddengems' || activeMainTab === 'saved') && (
        <div className="space-y-4">
          
          {/* Search & Region Filter Bar */}
          <div className="bg-white rounded-2xl border border-[#E2E8E6] p-3.5 shadow-xs space-y-3">
            {/* Search Input Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, state, monument (e.g. Jaipur, Backwaters, Taj, Ghats)..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl text-xs text-[#172B2A] placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#087F68]/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Region Filter Segmented Control */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-bold text-[#62716F] uppercase tracking-wider mr-1">
                Region:
              </span>
              {(['All', ...REGIONS_LIST] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                    selectedRegion === reg
                      ? 'bg-[#087F68] text-white font-bold shadow-2xs'
                      : 'bg-[#F5F7F7] text-[#62716F] hover:text-[#172B2A] border border-[#E2E8E6]'
                  }`}
                >
                  {reg === 'All' ? 'All India' : reg}
                </button>
              ))}

              {activeMainTab === 'destinations' && (
                <button
                  onClick={() => setOnlyHiddenGems(!onlyHiddenGems)}
                  className={`ml-auto px-2.5 py-1 text-xs font-bold rounded-lg border transition-all flex items-center gap-1 ${
                    onlyHiddenGems 
                      ? 'bg-amber-500 text-white border-amber-600' 
                      : 'bg-[#F5F7F7] text-[#62716F] border-[#E2E8E6] hover:text-[#172B2A]'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Hidden Gems Only</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Category Selector Pills / Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-[#172B2A] text-white shadow-xs'
                  : 'bg-white border border-[#E2E8E6] text-[#62716F] hover:text-[#172B2A]'
              }`}
            >
              <span>All Categories</span>
            </button>
            {CATEGORIES_LIST.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#087F68] text-white shadow-xs'
                      : 'bg-white border border-[#E2E8E6] text-[#62716F] hover:text-[#172B2A]'
                  }`}
                >
                  {renderCategoryIcon(cat.id)}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Result Count and Active Filters Notice */}
          <div className="flex items-center justify-between text-xs text-[#62716F] px-1">
            <div className="flex items-center gap-1.5">
              <span>Showing <strong>{filteredDestinations.length}</strong> {filteredDestinations.length === 1 ? 'destination' : 'destinations'}</span>
              {(selectedRegion !== 'All' || selectedCategory !== 'all' || searchQuery || onlyHiddenGems) && (
                <button
                  onClick={resetFilters}
                  className="text-[#087F68] hover:underline font-semibold ml-2 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
            {activeMainTab === 'saved' && (
              <span className="text-emerald-700 font-semibold">Your saved wishlist</span>
            )}
          </div>

          {/* Destination Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDestinations.map((dest) => {
                const isFavorite = isFav(dest.id);
                return (
                  <div
                    key={dest.id}
                    className="group bg-white rounded-3xl border border-[#E2E8E6] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Destination Card Image Header */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setSelectedDestination(dest)}>
                      <img 
                        src={dest.heroImage} 
                        alt={dest.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        {dest.isHiddenGem ? (
                          <span className="bg-amber-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                            Hidden Gem
                          </span>
                        ) : (
                          <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
                            {dest.region} India
                          </span>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(dest.id);
                          }}
                          className={`p-1.5 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
                            isFavorite ? 'bg-rose-500 text-white' : 'bg-black/35 hover:bg-black/60 text-white'
                          }`}
                          title={isFavorite ? 'Remove from wishlist' : 'Save destination'}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Bottom Image Overlay Details */}
                      <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                        <h3 className="font-extrabold text-lg tracking-tight group-hover:text-emerald-300 transition-colors">
                          {dest.name}
                        </h3>
                        {/* Unboxed metadata rule: quiet inline text with separators */}
                        <div className="flex items-center gap-1.5 text-[11px] text-white/85 font-medium mt-0.5">
                          <MapPin className="w-3 h-3 text-emerald-300 shrink-0" />
                          <span>{dest.state}</span>
                          <span aria-hidden="true">·</span>
                          <span>{dest.bestTimeToVisit.recommendedMonths}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <p className="text-xs font-semibold text-[#075B4E] line-clamp-1">
                          {dest.tagline}
                        </p>
                        <p className="text-xs text-[#62716F] line-clamp-2 leading-relaxed">
                          {dest.shortDescription}
                        </p>
                      </div>

                      {/* Sights & Budget info row */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#62716F]">
                        <span className="font-medium">
                          {dest.topAttractions.length} Attractions · {dest.itineraries.length} Itineraries
                        </span>
                        <span className="font-bold text-emerald-700 font-mono">
                          From ₹{dest.budget.backpacker.accommodation + dest.budget.backpacker.food}/day
                        </span>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => setSelectedDestination(dest)}
                        className="w-full py-2 bg-[#F5F7F7] hover:bg-[#E6F6EF] text-[#087F68] hover:text-[#075B4E] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 border border-[#E2E8E6]"
                      >
                        <span>Explore Details & Plans</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12 bg-white rounded-3xl border border-[#E2E8E6] p-6 space-y-3">
              <Compass className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-[#172B2A]">No destinations matched your criteria</h3>
              <p className="text-xs text-[#62716F] max-w-sm mx-auto">
                {activeMainTab === 'saved'
                  ? 'You have not saved any favourite destinations yet. Browse destinations and click the heart icon to build your wishlist!'
                  : 'Try broadening your search term or clearing the region and category filters to discover more Indian travel spots.'}
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-[#087F68] text-white rounded-xl text-xs font-bold hover:bg-[#075B4E] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>
      )}

      {/* VIEW 2: FOOD & LOCAL CULTURE ATLAS */}
      {activeMainTab === 'food_culture' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Note */}
          <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-3xl p-4 sm:p-5 text-xs space-y-2">
            <h3 className="font-bold text-sm text-amber-900 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-amber-700" />
              <span>Incredible India Gastronomy & Cultural Atlas</span>
            </h3>
            <p className="text-amber-950 leading-relaxed">
              India’s cultural richness is best discovered through its distinct regional cuisines, age-old culinary techniques, grand harvest festivals, and centuries-old artisan traditions.
            </p>
          </div>

          {/* Regional Cuisines Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#075B4E]">
              Regional Culinary Traditions of India
            </h3>

            <div className="grid grid-cols-1 gap-3.5">
              {REGIONAL_FOOD_SPECIALTIES.map((spec, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#087F68]">
                        {spec.region}
                      </span>
                      <h4 className="font-bold text-sm text-[#172B2A]">{spec.cuisines}</h4>
                    </div>
                  </div>

                  <p className="text-xs text-[#62716F] leading-relaxed">
                    {spec.highlights}
                  </p>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-[#172B2A] block">Signature Dishes:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {spec.topDishes.map((dish, dIdx) => (
                        <span key={dIdx} className="bg-[#E6F6EF] text-[#087F68] text-xs font-semibold px-2.5 py-1 rounded-lg">
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 bg-[#F5F7F7] rounded-xl text-xs text-[#62716F]">
                    <strong className="text-[#075B4E]">Cultural Tradition:</strong> {spec.cultureTradition}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Cultural Festivals of India */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#075B4E]">
              Grand Cultural Festivals & Timings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {UPCOMING_FESTIVALS.map((fest, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-[#172B2A]">{fest.name}</h4>
                    <span className="text-[11px] font-bold text-[#087F68] bg-[#E6F6EF] px-2 py-0.5 rounded-md">
                      {fest.month}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#62716F]">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{fest.location}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {fest.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* VIEW 3: ITINERARY PLANNER */}
      {activeMainTab === 'itineraries' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* Destination & Duration Selectors */}
          <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#172B2A]">Indian Travel Itinerary Generator</h3>
              <p className="text-xs text-[#62716F]">Select a destination and duration to review day-wise morning, afternoon, and evening schedules.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Destination Dropdown */}
              <div>
                <label className="text-xs font-bold text-[#62716F] mb-1 block">Select Destination:</label>
                <select
                  value={itineraryDestId}
                  onChange={(e) => setItineraryDestId(e.target.value)}
                  className="w-full p-2.5 bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl text-xs font-semibold text-[#172B2A] focus:outline-hidden focus:ring-2 focus:ring-[#087F68]/30"
                >
                  {DESTINATIONS_DATA.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.name} ({dest.state}) {dest.isHiddenGem ? '⭐ Hidden Gem' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Trip Duration Tabs */}
              <div>
                <label className="text-xs font-bold text-[#62716F] mb-1 block">Select Duration:</label>
                <div className="grid grid-cols-5 gap-1 bg-[#F5F7F7] p-1 rounded-xl border border-[#E2E8E6]">
                  {[1, 2, 3, 5, 7].map((days) => (
                    <button
                      key={days}
                      onClick={() => setItineraryDays(days)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                        itineraryDays === days 
                          ? 'bg-[#087F68] text-white shadow-2xs' 
                          : 'text-[#62716F] hover:text-[#172B2A]'
                      }`}
                    >
                      {days}D
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary Banner */}
          <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#087F68]">
                  {activeItineraryPlan.daysCount}-Day Itinerary
                </span>
                <span className="text-xs text-slate-400">·</span>
                <h4 className="font-bold text-xs text-[#172B2A]">{activeItineraryPlan.title}</h4>
              </div>
              <p className="text-xs text-[#62716F] mt-0.5">{activeItineraryPlan.summary}</p>
            </div>

            <button
              onClick={() => setSelectedDestination(currentItineraryDest)}
              className="px-3 py-1.5 bg-[#E6F6EF] hover:bg-[#d5f0e4] text-[#087F68] font-bold text-xs rounded-xl shrink-0 transition-colors ml-3 hidden sm:inline-block"
            >
              View Full Guide
            </button>
          </div>

          {/* Day-by-Day Schedule List */}
          <div className="space-y-3">
            {activeItineraryPlan.schedule.map((day) => (
              <div key={day.day} className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-[#087F68] text-white font-black text-xs flex items-center justify-center">
                      Day {day.day}
                    </span>
                    <h5 className="font-bold text-xs text-[#172B2A]">{day.title}</h5>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-[#F5F7F7] rounded-xl space-y-1">
                    <span className="font-bold text-[#075B4E] block">🌅 Morning</span>
                    <p className="text-[#62716F] leading-relaxed">{day.morning}</p>
                  </div>

                  <div className="p-3 bg-[#F5F7F7] rounded-xl space-y-1">
                    <span className="font-bold text-[#075B4E] block">☀️ Afternoon</span>
                    <p className="text-[#62716F] leading-relaxed">{day.afternoon}</p>
                  </div>

                  <div className="p-3 bg-[#F5F7F7] rounded-xl space-y-1">
                    <span className="font-bold text-[#075B4E] block">🌙 Evening</span>
                    <p className="text-[#62716F] leading-relaxed">{day.evening}</p>
                  </div>
                </div>

                <div className="text-xs text-[#075B4E] bg-[#E6F6EF]/60 p-2.5 rounded-xl flex items-center gap-2 font-medium">
                  <Utensils className="w-4 h-4 shrink-0 text-[#087F68]" />
                  <span><strong>Recommended Meals:</strong> {day.recommendedMeals}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* VIEW 4: TRAVEL BUDGET ESTIMATOR */}
      {activeMainTab === 'budget_calculator' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 sm:p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#172B2A]">Interactive India Travel Budget Estimator</h3>
              <p className="text-xs text-[#62716F]">Estimate realistic total expenses across accommodation, food, local transit, and activities.</p>
            </div>

            {/* Destination Selection */}
            <div>
              <label className="text-xs font-bold text-[#62716F] mb-1 block">Destination:</label>
              <select
                value={budgetCalcDestId}
                onChange={(e) => setBudgetCalcDestId(e.target.value)}
                className="w-full p-2.5 bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl text-xs font-semibold text-[#172B2A] focus:outline-hidden focus:ring-2 focus:ring-[#087F68]/30"
              >
                {DESTINATIONS_DATA.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name}, {dest.state} ({dest.region} India)
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Comfort Tier */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#62716F] block">Travel Comfort Level:</label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'backpacker', label: 'Backpacker', icon: Backpack, desc: 'Hostels, sleeper/buses & street food' },
                  { id: 'midRange', label: 'Mid-Range', icon: Compass, desc: '3-star hotels, AC cabs & restaurants' },
                  { id: 'luxury', label: 'Luxury', icon: Crown, desc: 'Heritage havelis, chauffeur & fine dining' },
                ].map((tier) => {
                  const Icon = tier.icon;
                  const isSelected = budgetCalcStyle === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setBudgetCalcStyle(tier.id as any)}
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
            </div>

            {/* Trip Duration Slider */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#172B2A]">Duration:</span>
                <span className="font-extrabold text-sm text-[#087F68]">{budgetCalcDays} {budgetCalcDays === 1 ? 'Day' : 'Days'}</span>
              </div>
              <input 
                type="range"
                min={1}
                max={14}
                value={budgetCalcDays}
                onChange={(e) => setBudgetCalcDays(parseInt(e.target.value))}
                className="w-full accent-[#087F68] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1 day</span>
                <span>3 days</span>
                <span>7 days</span>
                <span>14 days</span>
              </div>
            </div>
          </div>

          {/* Detailed Itemized Cards */}
          <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 sm:p-5 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-[#075B4E] uppercase tracking-wider">
              Estimated Expenses Breakdown ({budgetCalcDays} Days in {currentBudgetDest.name})
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-[#F5F7F7] rounded-xl space-y-1">
                <span className="text-[#62716F] text-[11px] block">🏨 Stay ({budgetCalcDays} nights)</span>
                <span className="font-extrabold text-base text-[#172B2A]">₹{calcStay.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block font-mono">₹{activeBudgetRate.accommodation}/night</span>
              </div>

              <div className="p-3 bg-[#F5F7F7] rounded-xl space-y-1">
                <span className="text-[#62716F] text-[11px] block">🍲 Food & Drinks</span>
                <span className="font-extrabold text-base text-[#172B2A]">₹{calcFood.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block font-mono">₹{activeBudgetRate.food}/day</span>
              </div>

              <div className="p-3 bg-[#F5F7F7] rounded-xl space-y-1">
                <span className="text-[#62716F] text-[11px] block">🚖 Local Transit</span>
                <span className="font-extrabold text-base text-[#172B2A]">₹{calcTransport.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block font-mono">₹{activeBudgetRate.transport}/day</span>
              </div>

              <div className="p-3 bg-[#F5F7F7] rounded-xl space-y-1">
                <span className="text-[#62716F] text-[11px] block">🎟️ Activities & Tickets</span>
                <span className="font-extrabold text-base text-[#172B2A]">₹{calcActivities.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block font-mono">₹{activeBudgetRate.activities}/day</span>
              </div>
            </div>

            {/* Total Highlight Banner */}
            <div className="p-5 bg-[#E6F6EF] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#087F68]/20">
              <div>
                <span className="text-[11px] font-bold text-[#075B4E] uppercase tracking-wider block">
                  Total Estimated Trip Budget
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#087F68]">
                    ₹{calcTotalINR.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-600 font-semibold font-mono">
                    (~${calcUSD} USD / ~€{calcEUR} EUR)
                  </span>
                </div>
                <p className="text-[11px] text-[#62716F] mt-1">
                  Excludes inter-state flights to India. Converted using live market rates.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => onNavigate('expense_tracker')}
                  className="px-4 py-2 bg-[#087F68] hover:bg-[#075B4E] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Track in Expenses</span>
                </button>
                <button
                  onClick={() => onNavigate('currency_calculator')}
                  className="px-3.5 py-2 bg-white hover:bg-slate-50 text-[#075B4E] border border-[#E2E8E6] rounded-xl text-xs font-bold transition-all"
                >
                  Currency Calculator
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Destination Detail Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        isOpen={Boolean(selectedDestination)}
        onClose={() => setSelectedDestination(null)}
        isFavorite={selectedDestination ? isFav(selectedDestination.id) : false}
        onToggleFavorite={toggleFavorite}
        onNavigateToExpense={() => onNavigate('expense_tracker')}
      />

    </div>
  );
};
