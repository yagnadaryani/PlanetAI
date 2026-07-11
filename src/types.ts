export interface Earthquake {
  id: string;
  lat: number;
  lon: number;
  magnitude: number;
  location: string;
  time: string;
  depth: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
}

export interface WeatherData {
  lat: number;
  lon: number;
  city: string;
  temperature: number;
  rainfall: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  pressure: number;
  condition: string;
  isStorm: boolean;
}

export interface AirQualityData {
  lat: number;
  lon: number;
  city: string;
  aqi: number;
  pm25: number;
  pm10: number;
  co: number;
  no2: number;
  category: string;
}

export interface WildfireData {
  id: string;
  lat: number;
  lon: number;
  location: string;
  intensity: number;
  areaAffected: number;
  detectionTime: string;
}

export interface SatelliteData {
  id: string;
  name: string;
  type: 'ISS' | 'Weather' | 'GPS' | 'Communication';
  altitude: number;
  speed: number;
  orbitPeriod: number;
  orbitRadius: number;
  inclination: number;
  color: string;
  phaseOffset: number;
}

export interface FlightData {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  originLat: number;
  originLon: number;
  destLat: number;
  destLon: number;
  speed: number;
  altitude: number;
  progress: number;
}

export interface SearchLocation {
  id: string;
  name: string;
  type: 'Country' | 'City' | 'Mountain' | 'River' | 'Ocean' | 'Volcano' | 'Airport';
  lat: number;
  lon: number;
  description: string;
}

export interface TimelineData {
  year: number;
  globalTemp: number;
  co2: number;
  population: number;
  forestCover: number;
  iceCapArea: number;
  oceanTemp: number;
  airQuality: number;
}

export interface DisasterSim {
  id: string;
  name: string;
  type: 'Cyclone' | 'Hurricane' | 'Flood' | 'Earthquake' | 'Tsunami' | 'Volcano';
  lat: number;
  lon: number;
  description: string;
  affectedRegions: string[];
}

export interface PlanetData {
  name: string;
  radius: number;
  distance: number;
  color: string;
  description: string;
  hasRings: boolean;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
}

export type LayerType =
  | 'weather'
  | 'earthquake'
  | 'airquality'
  | 'wildfire'
  | 'satellite'
  | 'flight'
  | 'climate'
  | 'disaster'
  | 'space';

export type ViewMode = 'landing' | 'dashboard' | 'analytics';
