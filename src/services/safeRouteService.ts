export interface LocationPoint {
  id?: string;
  name: string;
  displayName: string;
  lat: number;
  lon: number;
  state?: string;
  city?: string;
  district?: string;
}

export type SafetyCategory = 
  | 'Higher Available Safety Indicators'
  | 'Moderate Available Safety Indicators'
  | 'Lower Available Safety Indicators'
  | 'Limited Available Data';

export interface SafetyFactorDetail {
  factor: string;
  status: 'positive' | 'neutral' | 'warning' | 'missing';
  detail: string;
}

export interface RouteSafetyOption {
  id: string;
  title: string;
  category: SafetyCategory;
  score: number | null;
  distanceKm: number;
  durationMins: number;
  mode: 'driving' | 'walking' | 'cycling';
  geometry: [number, number][]; // [lat, lon] tuples for Leaflet
  summary: string;
  isRecommended: boolean;
  advantages: string[];
  limitations: string[];
  safetyFactors: SafetyFactorDetail[];
  missingDataNotice?: string;
  policeCount: number;
  hospitalCount: number;
}

export interface EmergencyFacility {
  id: string;
  name: string;
  type: 'police' | 'hospital' | 'women_desk';
  address?: string;
  phone?: string;
  lat?: number;
  lon?: number;
  contact?: string;
  description?: string;
  isHotline?: boolean;
}

export interface CalculateRoutesResult {
  origin: LocationPoint;
  destination: LocationPoint;
  mode: 'driving' | 'walking' | 'cycling';
  routes: RouteSafetyOption[];
  emergencyFacilities: EmergencyFacility[];
}

export const safeRouteService = {
  // Search any location across India with autocomplete
  async searchLocations(query: string): Promise<LocationPoint[]> {
    if (!query || query.trim().length < 2) return [];

    try {
      const response = await fetch(`/api/safety-routes/geocode?q=${encodeURIComponent(query.trim())}`, {
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) return [];

      const data = await response.json();
      return Array.isArray(data.results) ? data.results : [];
    } catch (err) {
      console.warn('Geocoding search failed, returning local matches:', err);
      return [];
    }
  },

  // Reverse geocode user GPS location
  async reverseGeocode(lat: number, lon: number): Promise<LocationPoint | null> {
    try {
      const response = await fetch(`/api/safety-routes/reverse-geocode?lat=${lat}&lon=${lon}`, {
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) return null;

      const data = await response.json();
      return {
        name: data.name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`,
        displayName: data.displayName || `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`,
        lat: data.lat || lat,
        lon: data.lon || lon,
        state: data.state,
        city: data.city,
      };
    } catch (err) {
      console.warn('Reverse geocode failed:', err);
      return {
        name: `${lat.toFixed(4)}, ${lon.toFixed(4)}`,
        displayName: `GPS (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
        lat,
        lon,
      };
    }
  },

  // Calculate safe route options between two locations
  async calculateRoutes(
    origin: LocationPoint,
    destination: LocationPoint,
    mode: 'driving' | 'walking' | 'cycling' = 'driving'
  ): Promise<CalculateRoutesResult> {
    const response = await fetch('/api/safety-routes/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        origin: { lat: origin.lat, lon: origin.lon, name: origin.name },
        destination: { lat: destination.lat, lon: destination.lon, name: destination.name },
        mode,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to calculate safe routes between these locations');
    }

    const data = await response.json();
    return {
      origin,
      destination,
      mode,
      routes: data.routes || [],
      emergencyFacilities: data.emergencyFacilities || [],
    };
  },

  // Get emergency hotlines and assistance facilities
  async getEmergencyFacilities(lat: number, lon: number): Promise<EmergencyFacility[]> {
    try {
      const res = await fetch(`/api/safety-routes/emergency-facilities?lat=${lat}&lon=${lon}`);
      if (!res.ok) return [];
      const data = await res.json();
      return data.facilities || [];
    } catch {
      return [];
    }
  },
};
