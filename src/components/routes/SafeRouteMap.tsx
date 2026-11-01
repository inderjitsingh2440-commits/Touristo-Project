import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { RouteSafetyOption, LocationPoint, EmergencyFacility } from '../../services/safeRouteService';

interface SafeRouteMapProps {
  origin: LocationPoint | null;
  destination: LocationPoint | null;
  routes: RouteSafetyOption[];
  selectedRouteId: string;
  onSelectRoute: (id: string) => void;
  emergencyFacilities?: EmergencyFacility[];
  onMapClickLocation?: (point: { lat: number; lon: number }) => void;
}

export const SafeRouteMap: React.FC<SafeRouteMapProps> = ({
  origin,
  destination,
  routes,
  selectedRouteId,
  onSelectRoute,
  emergencyFacilities = [],
  onMapClickLocation,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polylinesLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const markersLayerGroupRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Default center over central India if no origin
      const defaultCenter: [number, number] = origin 
        ? [origin.lat, origin.lon] 
        : [28.6139, 77.2090]; // Delhi as initial anchor

      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: 12,
        zoomControl: true,
      });

      // High-performance OpenStreetMap standard tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Layer groups for clean updates
      polylinesLayerGroupRef.current = L.layerGroup().addTo(map);
      markersLayerGroupRef.current = L.layerGroup().addTo(map);

      // Map click handler
      map.on('click', (e: L.LeafletMouseEvent) => {
        if (onMapClickLocation) {
          onMapClickLocation({ lat: e.latlng.lat, lon: e.latlng.lng });
        }
      });

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Routes, Markers & Fit Bounds
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const polyGroup = polylinesLayerGroupRef.current;
    const markerGroup = markersLayerGroupRef.current;

    if (polyGroup) polyGroup.clearLayers();
    if (markerGroup) markerGroup.clearLayers();

    const bounds = L.latLngBounds([]);

    // 1. Draw Origin Marker
    if (origin) {
      bounds.extend([origin.lat, origin.lon]);
      const originIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div class="relative flex items-center justify-center">
            <span class="absolute w-8 h-8 rounded-full bg-emerald-500/30 animate-ping"></span>
            <div class="w-8 h-8 rounded-full bg-[#087F68] border-2 border-white shadow-lg flex items-center justify-center text-white font-extrabold text-xs">
              A
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      L.marker([origin.lat, origin.lon], { icon: originIcon })
        .bindPopup(`<strong>Starting Point (A):</strong><br/>${origin.displayName || origin.name}`)
        .addTo(markerGroup!);
    }

    // 2. Draw Destination Marker
    if (destination) {
      bounds.extend([destination.lat, destination.lon]);
      const destIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div class="w-8 h-8 rounded-full bg-[#E53935] border-2 border-white shadow-lg flex items-center justify-center text-white font-extrabold text-xs">
            B
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      L.marker([destination.lat, destination.lon], { icon: destIcon })
        .bindPopup(`<strong>Destination (B):</strong><br/>${destination.displayName || destination.name}`)
        .addTo(markerGroup!);
    }

    // 3. Draw Emergency Facilities (Police & Hospitals)
    emergencyFacilities.forEach((facility) => {
      if (facility.lat && facility.lon) {
        bounds.extend([facility.lat, facility.lon]);
        const isPolice = facility.type === 'police';
        const facilityIcon = L.divIcon({
          className: 'emergency-map-marker',
          html: `
            <div class="w-6 h-6 rounded-full ${isPolice ? 'bg-sky-600' : 'bg-red-600'} border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-bold">
              ${isPolice ? '👮' : '🏥'}
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        L.marker([facility.lat, facility.lon], { icon: facilityIcon })
          .bindPopup(`
            <div class="text-xs space-y-1">
              <strong class="${isPolice ? 'text-sky-700' : 'text-red-700'}">${facility.name}</strong>
              <p class="text-[11px] text-slate-600">${facility.address || ''}</p>
              ${facility.contact ? `<p class="font-bold text-[11px] text-emerald-800">Helpline: ${facility.contact}</p>` : ''}
            </div>
          `)
          .addTo(markerGroup!);
      }
    });

    // 4. Draw Polylines for Routes
    routes.forEach((route) => {
      if (!route.geometry || route.geometry.length === 0) return;

      const isSelected = route.id === selectedRouteId;
      route.geometry.forEach(pt => bounds.extend(pt));

      // Color coding per route role
      let strokeColor = '#087F68'; // Primary / High Safety (Emerald)
      if (route.id === 'route-alternative' || route.id === 'route-secondary') {
        strokeColor = '#0284c7'; // Alternative (Sky Blue)
      } else if (route.id === 'route-shortest') {
        strokeColor = '#d97706'; // Shortest (Amber)
      }

      const polyline = L.polyline(route.geometry, {
        color: strokeColor,
        weight: isSelected ? 7 : 4,
        opacity: isSelected ? 0.95 : 0.55,
        lineCap: 'round',
        lineJoin: 'round',
      });

      // Click polyline to select
      polyline.on('click', () => {
        onSelectRoute(route.id);
      });

      polyline.bindTooltip(
        `<strong>${route.title}</strong><br/>Score: ${route.score ? `${route.score}/100` : 'Data Limited'} · ${route.distanceKm} km`,
        { sticky: true }
      );

      polyline.addTo(polyGroup!);
    });

    // Adjust zoom & bounds to frame all points comfortably
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    }
  }, [origin, destination, routes, selectedRouteId, emergencyFacilities, onSelectRoute]);

  return (
    <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-[#E2E8E6] shadow-sm bg-slate-100 z-10">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Map Legend */}
      <div className="absolute bottom-3 left-3 right-3 sm:right-auto z-[1000] bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-200/80 shadow-md text-[11px] flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#087F68]" />
          <span className="font-semibold text-slate-800">Primary Arterial</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#0284c7]" />
          <span className="text-slate-600">Alternative</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#d97706]" />
          <span className="text-slate-600">Shortest Cut</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 pl-1 border-l border-slate-200 hidden sm:flex">
          <span>👮 Police</span>
          <span aria-hidden="true">·</span>
          <span>🏥 Hospital</span>
        </div>
      </div>
    </div>
  );
};
