import { AuthUser, DemoTraveler } from '../types/auth';
import { dbStorage } from './dbStorage';

const AUTH_STORAGE_KEY = 'touristo_auth_user';

export const DEMO_TRAVELERS: DemoTraveler[] = [
  {
    id: 'traveler-alex',
    name: 'Alex Morgan',
    email: 'alex.morgan@traveler.com',
    nationality: 'United States',
    countryCode: 'US',
    flag: '🇺🇸',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    preferredCurrency: 'USD',
    role: 'Solo Explorer & Photographer',
    bio: 'Backpacking through Delhi, Agra, and Varanasi. Love historical architecture.',
  },
  {
    id: 'traveler-elena',
    name: 'Elena Rostova',
    email: 'elena.rostova@traveler.eu',
    nationality: 'France',
    countryCode: 'FR',
    flag: '🇫🇷',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    preferredCurrency: 'EUR',
    role: 'Art & Heritage Researcher',
    bio: 'Visiting Rajasthan palace forts and UNESCO stepwells across Gujarat.',
  },
  {
    id: 'traveler-arjun',
    name: 'Arjun & Sarah Patel',
    email: 'arjun.patel@london.co.uk',
    nationality: 'United Kingdom',
    countryCode: 'GB',
    flag: '🇬🇧',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    preferredCurrency: 'GBP',
    role: 'Diaspora Family Journey',
    bio: 'First time visiting family roots in Punjab and traveling with spouse.',
  },
  {
    id: 'traveler-kenji',
    name: 'Kenji Sato',
    email: 'kenji.sato@tokyo.jp',
    nationality: 'Japan',
    countryCode: 'JP',
    flag: '🇯🇵',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    preferredCurrency: 'JPY',
    role: 'Culinary & Train Traveler',
    bio: 'Exploring Indian Railways network, street foods, and Konark Sun temple.',
  },
];

export const authService = {
  getCurrentUser(): AuthUser | null {
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  setCurrentUser(user: AuthUser | null): void {
    try {
      if (!user) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } else {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        // Keep dbStorage profile in sync
        const currentProfile = dbStorage.getProfile();
        dbStorage.saveProfile({
          ...currentProfile,
          name: user.name,
          email: user.email,
          nationality: user.nationality || currentProfile.nationality,
          preferredCurrency: user.preferredCurrency || currentProfile.preferredCurrency,
          preferredLanguage: user.preferredLanguage || currentProfile.preferredLanguage,
          phone: user.phone || currentProfile.phone,
          bloodGroup: user.bloodGroup || currentProfile.bloodGroup,
        });
      }
    } catch (e) {
      console.error('Failed to set current user:', e);
    }
  },

  loginWithDemo(traveler: DemoTraveler): AuthUser {
    const user: AuthUser = {
      id: traveler.id,
      name: traveler.name,
      email: traveler.email,
      avatar: traveler.avatar,
      nationality: traveler.nationality,
      preferredCurrency: traveler.preferredCurrency,
      preferredLanguage: 'English',
      bloodGroup: 'O+',
      isGuest: false,
      token: 'demo_token_' + Date.now(),
      loggedInAt: new Date().toISOString(),
    };
    this.setCurrentUser(user);
    return user;
  },

  loginWithCredentials(email: string, _password: string, name?: string): AuthUser {
    const safeName = name?.trim() || email.split('@')[0] || 'Traveler';
    // Format capitalized name
    const formattedName = safeName.charAt(0).toUpperCase() + safeName.slice(1);
    
    const user: AuthUser = {
      id: 'usr_' + Date.now(),
      name: formattedName,
      email: email.trim().toLowerCase(),
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(formattedName)}`,
      nationality: 'International Traveler',
      preferredCurrency: 'USD',
      preferredLanguage: 'English',
      bloodGroup: 'Unknown',
      isGuest: false,
      token: 'auth_' + Date.now(),
      loggedInAt: new Date().toISOString(),
    };
    this.setCurrentUser(user);
    return user;
  },

  registerNewUser(data: {
    name: string;
    email: string;
    nationality: string;
    preferredCurrency: string;
    phone?: string;
  }): AuthUser {
    const user: AuthUser = {
      id: 'usr_' + Date.now(),
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(data.name)}`,
      nationality: data.nationality,
      phone: data.phone?.trim() || '',
      preferredCurrency: data.preferredCurrency || 'USD',
      preferredLanguage: 'English',
      bloodGroup: 'O+',
      isGuest: false,
      token: 'reg_' + Date.now(),
      loggedInAt: new Date().toISOString(),
    };
    this.setCurrentUser(user);
    return user;
  },

  continueAsGuest(): AuthUser {
    const guestUser: AuthUser = {
      id: 'guest_' + Date.now(),
      name: 'Guest Traveler',
      email: 'guest@touristo.app',
      avatar: '',
      nationality: 'International',
      preferredCurrency: 'USD',
      preferredLanguage: 'English',
      isGuest: true,
      token: 'guest_token_' + Date.now(),
      loggedInAt: new Date().toISOString(),
    };
    this.setCurrentUser(guestUser);
    return guestUser;
  },

  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};
