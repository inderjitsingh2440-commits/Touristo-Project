import { ExpenseItem, ScamAssessment, EmergencyContact, UserTrip, UserProfile } from '../types/touristo';
import { DEFAULT_CONTACTS, DEFAULT_PROFILE, DEFAULT_TRIP } from '../data/mockData';

const KEYS = {
  EXPENSES: 'touristo_expenses',
  SCAM_REPORTS: 'touristo_scam_reports',
  CONTACTS: 'touristo_contacts',
  PROFILE: 'touristo_profile',
  TRIPS: 'touristo_trips',
  CONVERSIONS: 'touristo_recent_conversions',
  FAVORITES: 'touristo_favorite_destinations',
};

const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: 'exp-1',
    title: 'Delhi Metro Airport Express',
    amount: 60,
    currency: 'INR',
    amountInINR: 60,
    category: 'Transport',
    date: new Date(Date.now() - 3600000 * 24).toISOString().split('T')[0],
    notes: 'Super clean and fast direct line to New Delhi Station',
  },
  {
    id: 'exp-2',
    title: 'Dinner at Karim\'s Old Delhi',
    amount: 850,
    currency: 'INR',
    amountInINR: 850,
    category: 'Food',
    date: new Date(Date.now() - 3600000 * 18).toISOString().split('T')[0],
    notes: 'Mutton Korma and fresh butter naan near Jama Masjid',
  },
  {
    id: 'exp-3',
    title: 'Red Fort Foreigner Ticket + Audio',
    amount: 600,
    currency: 'INR',
    amountInINR: 600,
    category: 'Tickets',
    date: new Date().toISOString().split('T')[0],
    notes: 'Booked online via ASI counter QR',
  },
  {
    id: 'exp-4',
    title: 'Handmade Pashmina Scarf',
    amount: 2200,
    currency: 'INR',
    amountInINR: 2200,
    category: 'Shopping',
    date: new Date().toISOString().split('T')[0],
    notes: 'Verified GI tagged cottage emporium at Janpath',
  },
];

export const dbStorage = {
  getExpenses(): ExpenseItem[] {
    try {
      const data = localStorage.getItem(KEYS.EXPENSES);
      return data ? JSON.parse(data) : INITIAL_EXPENSES;
    } catch {
      return INITIAL_EXPENSES;
    }
  },

  saveExpenses(expenses: ExpenseItem[]): void {
    try {
      localStorage.setItem(KEYS.EXPENSES, JSON.stringify(expenses));
    } catch (e) {
      console.error('Failed to save expenses:', e);
    }
  },

  addExpense(item: Omit<ExpenseItem, 'id'>): ExpenseItem {
    const expenses = this.getExpenses();
    const newItem: ExpenseItem = {
      ...item,
      id: 'exp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    };
    const updated = [newItem, ...expenses];
    this.saveExpenses(updated);
    return newItem;
  },

  deleteExpense(id: string): void {
    const expenses = this.getExpenses().filter((e) => e.id !== id);
    this.saveExpenses(expenses);
  },

  getScamReports(): ScamAssessment[] {
    try {
      const data = localStorage.getItem(KEYS.SCAM_REPORTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveScamReport(report: ScamAssessment): void {
    const list = this.getScamReports();
    const updated = [report, ...list];
    try {
      localStorage.setItem(KEYS.SCAM_REPORTS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save scam report:', e);
    }
  },

  getContacts(): EmergencyContact[] {
    try {
      const data = localStorage.getItem(KEYS.CONTACTS);
      return data ? JSON.parse(data) : DEFAULT_CONTACTS;
    } catch {
      return DEFAULT_CONTACTS;
    }
  },

  saveContacts(contacts: EmergencyContact[]): void {
    try {
      localStorage.setItem(KEYS.CONTACTS, JSON.stringify(contacts));
    } catch (e) {
      console.error('Failed to save contacts:', e);
    }
  },

  getProfile(): UserProfile {
    try {
      const data = localStorage.getItem(KEYS.PROFILE);
      return data ? JSON.parse(data) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile:', e);
    }
  },

  getTrips(): UserTrip[] {
    try {
      const data = localStorage.getItem(KEYS.TRIPS);
      return data ? JSON.parse(data) : [DEFAULT_TRIP];
    } catch {
      return [DEFAULT_TRIP];
    }
  },

  saveTrips(trips: UserTrip[]): void {
    try {
      localStorage.setItem(KEYS.TRIPS, JSON.stringify(trips));
    } catch (e) {
      console.error('Failed to save trips:', e);
    }
  },

  exportAllData(): string {
    const dump = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      profile: this.getProfile(),
      trips: this.getTrips(),
      contacts: this.getContacts(),
      expenses: this.getExpenses(),
      scamReports: this.getScamReports(),
    };
    return JSON.stringify(dump, null, 2);
  },

  importData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile) this.saveProfile(parsed.profile);
      if (parsed.trips) this.saveTrips(parsed.trips);
      if (parsed.contacts) this.saveContacts(parsed.contacts);
      if (parsed.expenses) this.saveExpenses(parsed.expenses);
      return true;
    } catch (e) {
      console.error('Failed to import data:', e);
      return false;
    }
  },

  getFavoriteDestinations(): string[] {
    try {
      const data = typeof localStorage !== 'undefined' ? localStorage.getItem(KEYS.FAVORITES) : null;
      return data ? JSON.parse(data) : ['jaipur', 'kerala_backwaters', 'varanasi'];
    } catch (e) {
      console.error('Failed to get favorites:', e);
      return ['jaipur', 'kerala_backwaters', 'varanasi'];
    }
  },

  toggleFavoriteDestination(id: string): string[] {
    try {
      const current = this.getFavoriteDestinations();
      const next = current.includes(id) 
        ? current.filter((item) => item !== id) 
        : [...current, id];
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(KEYS.FAVORITES, JSON.stringify(next));
      }
      return next;
    } catch (e) {
      console.error('Failed to toggle favorite:', e);
      return [];
    }
  },

  isFavoriteDestination(id: string): boolean {
    return this.getFavoriteDestinations().includes(id);
  },

  resetAll(): void {
    Object.values(KEYS).forEach((k) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(k);
      }
    });
  },
};
