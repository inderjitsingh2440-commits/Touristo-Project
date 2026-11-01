import React, { useState } from 'react';
import { SCAM_CATEGORIES } from '../data/mockData';
import { ScamCategory, ScreenId } from '../types/touristo';
import { 
  Car, 
  Hotel, 
  ShoppingBag, 
  Users, 
  Utensils, 
  CreditCard, 
  Ticket, 
  ShieldAlert, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Search,
  BookOpen
} from 'lucide-react';

interface ScamExamplesScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ScamExamplesScreen: React.FC<ScamExamplesScreenProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<ScamCategory | null>(SCAM_CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return Car;
      case 'Hotel': return Hotel;
      case 'ShoppingBag': return ShoppingBag;
      case 'Users': return Users;
      case 'Utensils': return Utensils;
      case 'CreditCard': return CreditCard;
      case 'Ticket': return Ticket;
      default: return ShieldAlert;
    }
  };

  const filteredCategories = SCAM_CATEGORIES.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.scenarios.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-4 pb-12 animate-in fade-in">
      {/* Search Header */}
      <div className="bg-white p-3.5 rounded-2xl border border-[#E2E8E6] shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#087F68]" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#172B2A]">
              Tourist Scam Encyclopedia & Traps
            </h3>
          </div>
          <span className="text-[10px] text-[#62716F]">8 Verified Categories</span>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scams: e.g., 'closed hotel', 'gemstones', 'broken meter'..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl focus:outline-none focus:border-[#087F68]"
          />
        </div>
      </div>

      {/* Category Pills/Cards Horizontal Scroll or Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {filteredCategories.map((cat) => {
          const Icon = getCategoryIcon(cat.iconName);
          const isSelected = selectedCategory?.id === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between h-24 ${
                isSelected
                  ? 'border-[#087F68] ring-2 ring-[#087F68]/20 bg-white shadow-sm'
                  : 'border-[#E2E8E6] bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${cat.color}` }}
                >
                  <Icon className="w-4 h-4 text-[#172B2A]" />
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#087F68]" />
                )}
              </div>
              <div>
                <div className="text-xs font-bold text-[#172B2A] truncate">
                  {cat.title}
                </div>
                <div className="text-[10px] text-[#62716F] truncate">
                  {cat.scenarios.length} Scenarios
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Category Scenarios Details */}
      {selectedCategory && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-xs font-bold text-[#075B4E] uppercase tracking-wide">
              {selectedCategory.title} Traps & Solutions
            </h4>
            <span className="text-[11px] text-[#62716F]">
              {selectedCategory.subtitle}
            </span>
          </div>

          <div className="space-y-3">
            {selectedCategory.scenarios.map((scen, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#E2E8E6] p-4 shadow-xs space-y-3.5 hover:border-[#087F68]/30 transition-all"
              >
                {/* Scenario Title */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-[#172B2A]">
                      {scen.name}
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    High Frequency
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {scen.description}
                </p>

                {/* Warning Signs */}
                <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-3 space-y-1.5 text-xs text-rose-950">
                  <div className="font-bold flex items-center gap-1.5 text-rose-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Red Flag Warning Signs:</span>
                  </div>
                  <ul className="space-y-1 pl-4 list-disc text-rose-900/90 text-[11px]">
                    {scen.warningSigns.map((sign, sIdx) => (
                      <li key={sIdx}>{sign}</li>
                    ))}
                  </ul>
                </div>

                {/* Prevention Tips */}
                <div className="bg-[#E6F6EF]/70 border border-emerald-200 rounded-2xl p-3 space-y-1.5 text-xs text-emerald-950">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#15965F]" />
                    <span>Prevention Protocol:</span>
                  </div>
                  <ul className="space-y-1 pl-4 list-disc text-emerald-900/90 text-[11px]">
                    {scen.preventionTips.map((tip, tIdx) => (
                      <li key={tIdx}>{tip}</li>
                    ))}
                  </ul>
                </div>

                {/* What to do if trapped */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1">
                  <span className="font-bold text-[#172B2A]">Immediate Counter-Action:</span>
                  <p className="text-[#62716F] text-[11px] leading-relaxed">
                    "{scen.whatToDo}"
                  </p>
                </div>

                {/* Direct Action Link to Scam Detector */}
                <div className="pt-1 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[11px] text-[#62716F]">Suspect this is happening right now?</span>
                  <button
                    onClick={() => onNavigate('scam_detector')}
                    className="text-xs font-bold text-[#087F68] hover:text-[#075B4E] flex items-center gap-1 hover:underline"
                  >
                    <span>Check in Scam Detector</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
