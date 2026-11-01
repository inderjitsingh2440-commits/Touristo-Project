export type ScreenId = 
  | 'splash'
  | 'home'
  | 'currency_scanner'
  | 'translator'
  | 'currency_calculator'
  | 'expense_tracker'
  | 'scam_detector'
  | 'scam_examples'
  | 'safe_route'
  | 'sos_emergency'
  | 'nearby_help'
  | 'profile_settings'
  | 'explore_india';

export interface BanknoteData {
  denomination: number;
  code: string;
  nameEn: string;
  nameHi: string;
  colorName: string;
  primaryColor: string;
  accentColor: string;
  backMonument: string;
  widthMm: number;
  heightMm: number;
  features: string[];
  imageUrl: string;
}

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  currency: string;
  amountInINR: number;
  category: 'Food' | 'Transport' | 'Shopping' | 'Hotel' | 'Tickets' | 'Other';
  date: string;
  tripId?: string;
  notes?: string;
}

export interface ScamAssessment {
  id: string;
  date: string;
  transportType: string;
  fromLocation: string;
  toLocation: string;
  distanceKm: number;
  quotedFare: number;
  standardFare: number;
  riskScore: number; // 0-100
  riskLevel: 'Low' | 'Medium' | 'High';
  factors: string[];
  recommendations: string[];
}

export interface ScamCategory {
  id: string;
  title: string;
  iconName: string;
  subtitle: string;
  color: string;
  scenarios: {
    name: string;
    description: string;
    warningSigns: string[];
    preventionTips: string[];
    whatToDo: string;
  }[];
}

export interface EmergencyFacility {
  id: string;
  name: string;
  type: 'police' | 'hospital' | 'safe_zone' | 'women_desk' | 'tourist_police';
  address: string;
  phone: string;
  distanceKm: number;
  travelTimeMin: number;
  lat: number;
  lng: number;
  isOpen24x7: boolean;
  rating?: number;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  notifyOnSOS: boolean;
}

export interface UserTrip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budgetINR: number;
  notes: string;
}

export interface UserProfile {
  name: string;
  nationality: string;
  email: string;
  phone: string;
  bloodGroup: string;
  preferredCurrency: string;
  preferredLanguage: string;
  emergencyQuickAction: boolean;
  notificationEnabled: boolean;
}
