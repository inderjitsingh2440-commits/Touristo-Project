export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  nationality: string;
  phone?: string;
  bloodGroup?: string;
  preferredCurrency: string;
  preferredLanguage?: string;
  isGuest?: boolean;
  token?: string;
  loggedInAt: string;
}

export interface DemoTraveler {
  id: string;
  name: string;
  email: string;
  nationality: string;
  countryCode: string;
  flag: string;
  avatar: string;
  preferredCurrency: string;
  role: string;
  bio: string;
}
