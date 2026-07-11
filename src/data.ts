import type {
  Earthquake,
  WeatherData,
  AirQualityData,
  WildfireData,
  SatelliteData,
  FlightData,
  SearchLocation,
  TimelineData,
  DisasterSim,
  PlanetData,
} from './types';

export const earthquakes: Earthquake[] = [
  { id: 'eq1', lat: 35.6762, lon: 139.6503, magnitude: 5.4, location: 'Tokyo, Japan', time: '2 hours ago', depth: 45, riskLevel: 'Moderate' },
  { id: 'eq2', lat: 19.4326, lon: -99.1332, magnitude: 4.2, location: 'Mexico City, Mexico', time: '5 hours ago', depth: 22, riskLevel: 'Low' },
  { id: 'eq3', lat: -33.4489, lon: -70.6693, magnitude: 6.1, location: 'Santiago, Chile', time: '1 hour ago', depth: 65, riskLevel: 'High' },
  { id: 'eq4', lat: 37.7749, lon: -122.4194, magnitude: 3.8, location: 'San Francisco, USA', time: '8 hours ago', depth: 12, riskLevel: 'Low' },
  { id: 'eq5', lat: 28.6139, lon: 77.209, magnitude: 5.9, location: 'Delhi, India', time: '30 min ago', depth: 35, riskLevel: 'Moderate' },
  { id: 'eq6', lat: -6.2088, lon: 106.8456, magnitude: 6.8, location: 'Jakarta, Indonesia', time: '15 min ago', depth: 80, riskLevel: 'Severe' },
  { id: 'eq7', lat: 41.0082, lon: 28.9784, magnitude: 4.5, location: 'Istanbul, Turkey', time: '3 hours ago', depth: 18, riskLevel: 'Low' },
  { id: 'eq8', lat: -41.2865, lon: 174.7762, magnitude: 5.2, location: 'Wellington, New Zealand', time: '6 hours ago', depth: 55, riskLevel: 'Moderate' },
  { id: 'eq9', lat: 60.1699, lon: 24.9384, magnitude: 3.2, location: 'Helsinki, Finland', time: '12 hours ago', depth: 10, riskLevel: 'Low' },
  { id: 'eq10', lat: 14.5995, lon: 120.9842, magnitude: 6.3, location: 'Manila, Philippines', time: '45 min ago', depth: 40, riskLevel: 'High' },
];

export const weatherData: WeatherData[] = [
  { lat: 51.5074, lon: -0.1278, city: 'London', temperature: 12, rainfall: 3.2, windSpeed: 15, windDirection: 220, humidity: 78, pressure: 1013, condition: 'Rainy', isStorm: false },
  { lat: 40.7128, lon: -74.006, city: 'New York', temperature: 18, rainfall: 0, windSpeed: 8, windDirection: 180, humidity: 55, pressure: 1018, condition: 'Clear', isStorm: false },
  { lat: 35.6762, lon: 139.6503, city: 'Tokyo', temperature: 22, rainfall: 1.5, windSpeed: 12, windDirection: 90, humidity: 65, pressure: 1010, condition: 'Cloudy', isStorm: false },
  { lat: -33.8688, lon: 151.2093, city: 'Sydney', temperature: 25, rainfall: 0, windSpeed: 20, windDirection: 270, humidity: 60, pressure: 1015, condition: 'Sunny', isStorm: false },
  { lat: 25.2048, lon: 55.2708, city: 'Dubai', temperature: 38, rainfall: 0, windSpeed: 5, windDirection: 45, humidity: 30, pressure: 1008, condition: 'Hot', isStorm: false },
  { lat: 19.076, lon: 72.8777, city: 'Mumbai', temperature: 30, rainfall: 8.5, windSpeed: 35, windDirection: 315, humidity: 88, pressure: 1002, condition: 'Storm', isStorm: true },
  { lat: -22.9068, lon: -43.1729, city: 'Rio de Janeiro', temperature: 28, rainfall: 2.0, windSpeed: 10, windDirection: 135, humidity: 72, pressure: 1011, condition: 'Partly Cloudy', isStorm: false },
  { lat: 55.7558, lon: 37.6173, city: 'Moscow', temperature: 5, rainfall: 1.2, windSpeed: 18, windDirection: 300, humidity: 82, pressure: 1009, condition: 'Snow', isStorm: false },
  { lat: 13.7563, lon: 100.5018, city: 'Bangkok', temperature: 33, rainfall: 5.5, windSpeed: 8, windDirection: 200, humidity: 80, pressure: 1006, condition: 'Humid', isStorm: false },
  { lat: 30.0444, lon: 31.2357, city: 'Cairo', temperature: 35, rainfall: 0, windSpeed: 12, windDirection: 60, humidity: 25, pressure: 1014, condition: 'Clear', isStorm: false },
  { lat: 64.1466, lon: -21.9426, city: 'Reykjavik', temperature: 2, rainfall: 4.0, windSpeed: 45, windDirection: 340, humidity: 90, pressure: 998, condition: 'Storm', isStorm: true },
  { lat: -1.2921, lon: 36.8219, city: 'Nairobi', temperature: 24, rainfall: 0.5, windSpeed: 6, windDirection: 110, humidity: 50, pressure: 1016, condition: 'Clear', isStorm: false },
];

export const airQualityData: AirQualityData[] = [
  { lat: 28.6139, lon: 77.209, city: 'Delhi', aqi: 285, pm25: 120, pm10: 180, co: 2.5, no2: 85, category: 'Very Unhealthy' },
  { lat: 39.9042, lon: 116.4074, city: 'Beijing', aqi: 195, pm25: 95, pm10: 140, co: 1.8, no2: 70, category: 'Unhealthy' },
  { lat: 31.2304, lon: 121.4737, city: 'Shanghai', aqi: 145, pm25: 65, pm10: 95, co: 1.2, no2: 55, category: 'Unhealthy for Sensitive' },
  { lat: 25.2048, lon: 55.2708, city: 'Dubai', aqi: 95, pm25: 38, pm10: 62, co: 0.8, no2: 40, category: 'Moderate' },
  { lat: 40.7128, lon: -74.006, city: 'New York', aqi: 42, pm25: 12, pm10: 22, co: 0.4, no2: 18, category: 'Good' },
  { lat: 51.5074, lon: -0.1278, city: 'London', aqi: 55, pm25: 18, pm10: 28, co: 0.5, no2: 25, category: 'Moderate' },
  { lat: -33.8688, lon: 151.2093, city: 'Sydney', aqi: 28, pm25: 8, pm10: 15, co: 0.2, no2: 10, category: 'Good' },
  { lat: 35.6762, lon: 139.6503, city: 'Tokyo', aqi: 65, pm25: 22, pm10: 35, co: 0.6, no2: 30, category: 'Moderate' },
  { lat: 19.076, lon: 72.8777, city: 'Mumbai', aqi: 165, pm25: 78, pm10: 115, co: 1.5, no2: 60, category: 'Unhealthy' },
  { lat: -6.2088, lon: 106.8456, city: 'Jakarta', aqi: 120, pm25: 55, pm10: 82, co: 1.1, no2: 48, category: 'Unhealthy for Sensitive' },
  { lat: 55.7558, lon: 37.6173, city: 'Moscow', aqi: 75, pm25: 28, pm10: 42, co: 0.7, no2: 35, category: 'Moderate' },
  { lat: 30.0444, lon: 31.2357, city: 'Cairo', aqi: 135, pm25: 62, pm10: 88, co: 1.3, no2: 52, category: 'Unhealthy for Sensitive' },
];

export const wildfires: WildfireData[] = [
  { id: 'wf1', lat: 38.5816, lon: -121.4944, location: 'California, USA', intensity: 850, areaAffected: 12500, detectionTime: '3 hours ago' },
  { id: 'wf2', lat: -33.4489, lon: -70.6693, location: 'Santiago, Chile', intensity: 620, areaAffected: 8200, detectionTime: '6 hours ago' },
  { id: 'wf3', lat: -25.2744, lon: 133.7751, location: 'Northern Territory, Australia', intensity: 720, areaAffected: 15000, detectionTime: '1 hour ago' },
  { id: 'wf4', lat: 60.0636, lon: -135.1895, location: 'Yukon, Canada', intensity: 580, areaAffected: 9800, detectionTime: '4 hours ago' },
  { id: 'wf5', lat: -15.7942, lon: -47.8825, location: 'Brasilia, Brazil', intensity: 910, areaAffected: 22000, detectionTime: '30 min ago' },
  { id: 'wf6', lat: 40.4637, lon: -3.7492, location: 'Madrid, Spain', intensity: 450, areaAffected: 5200, detectionTime: '8 hours ago' },
  { id: 'wf7', lat: 37.9838, lon: 23.7275, location: 'Athens, Greece', intensity: 680, areaAffected: 7100, detectionTime: '2 hours ago' },
  { id: 'wf8', lat: -29.0, lon: 24.0, location: 'Kalahari, South Africa', intensity: 380, areaAffected: 4500, detectionTime: '10 hours ago' },
];

export const satellites: SatelliteData[] = [
  { id: 'sat1', name: 'ISS (Zarya)', type: 'ISS', altitude: 408, speed: 27600, orbitPeriod: 92, orbitRadius: 1.06, inclination: 51.6, color: '#00d4ff', phaseOffset: 0 },
  { id: 'sat2', name: 'NOAA-20', type: 'Weather', altitude: 824, speed: 7400, orbitPeriod: 101, orbitRadius: 1.13, inclination: 98.7, color: '#22d3ee', phaseOffset: 1.2 },
  { id: 'sat3', name: 'GOES-16', type: 'Weather', altitude: 35786, speed: 3074, orbitPeriod: 1436, orbitRadius: 6.6, inclination: 0.1, color: '#00a8ff', phaseOffset: 2.5 },
  { id: 'sat4', name: 'GPS-IIF-12', type: 'GPS', altitude: 20180, speed: 3874, orbitPeriod: 720, orbitRadius: 4.16, inclination: 55, color: '#fbbf24', phaseOffset: 0.8 },
  { id: 'sat5', name: 'GPS-III-5', type: 'GPS', altitude: 20180, speed: 3874, orbitPeriod: 720, orbitRadius: 4.16, inclination: 55, color: '#f59e0b', phaseOffset: 3.5 },
  { id: 'sat6', name: 'Starlink-1547', type: 'Communication', altitude: 550, speed: 27000, orbitPeriod: 95, orbitRadius: 1.09, inclination: 53, color: '#34d399', phaseOffset: 1.8 },
  { id: 'sat7', name: 'Starlink-2305', type: 'Communication', altitude: 550, speed: 27000, orbitPeriod: 95, orbitRadius: 1.09, inclination: 53, color: '#10b981', phaseOffset: 4.2 },
  { id: 'sat8', name: 'Sentinel-2B', type: 'Weather', altitude: 786, speed: 7450, orbitPeriod: 100, orbitRadius: 1.12, inclination: 98.6, color: '#818cf8', phaseOffset: 5.0 },
];

export const flights: FlightData[] = [
  { id: 'fl1', flightNumber: 'BA286', origin: 'London', destination: 'New York', originLat: 51.5074, originLon: -0.1278, destLat: 40.7128, destLon: -74.006, speed: 920, altitude: 11000, progress: 0.35 },
  { id: 'fl2', flightNumber: 'EK202', origin: 'Dubai', destination: 'New York', originLat: 25.2048, originLon: 55.2708, destLat: 40.7128, destLon: -74.006, speed: 890, altitude: 12000, progress: 0.55 },
  { id: 'fl3', flightNumber: 'SQ317', origin: 'Singapore', destination: 'London', originLat: 1.3521, originLon: 103.8198, destLat: 51.5074, destLon: -0.1278, speed: 910, altitude: 11500, progress: 0.72 },
  { id: 'fl4', flightNumber: 'QF12', origin: 'Sydney', destination: 'Los Angeles', originLat: -33.8688, originLon: 151.2093, destLat: 34.0522, destLon: -118.2437, speed: 880, altitude: 12000, progress: 0.28 },
  { id: 'fl5', flightNumber: 'AI101', origin: 'Delhi', destination: 'New York', originLat: 28.6139, originLon: 77.209, destLat: 40.7128, destLon: -74.006, speed: 900, altitude: 11000, progress: 0.45 },
  { id: 'fl6', flightNumber: 'JL5', origin: 'Tokyo', destination: 'San Francisco', originLat: 35.6762, originLon: 139.6503, destLat: 37.7749, destLon: -122.4194, speed: 920, altitude: 11500, progress: 0.62 },
  { id: 'fl7', flightNumber: 'AF108', origin: 'Paris', destination: 'New York', originLat: 48.8566, originLon: 2.3522, destLat: 40.7128, destLon: -74.006, speed: 910, altitude: 11000, progress: 0.15 },
  { id: 'fl8', flightNumber: 'LH715', origin: 'Munich', destination: 'Tokyo', originLat: 48.1351, originLon: 11.582, destLat: 35.6762, destLon: 139.6503, speed: 890, altitude: 12000, progress: 0.80 },
  { id: 'fl9', flightNumber: 'CX846', origin: 'Hong Kong', destination: 'New York', originLat: 22.3193, originLon: 114.1694, destLat: 40.7128, destLon: -74.006, speed: 900, altitude: 11500, progress: 0.50 },
  { id: 'fl10', flightNumber: 'EK417', origin: 'Dubai', destination: 'Sydney', originLat: 25.2048, originLon: 55.2708, destLat: -33.8688, destLon: 151.2093, speed: 880, altitude: 12000, progress: 0.38 },
];

export const searchLocations: SearchLocation[] = [
  { id: 's1', name: 'Mount Everest', type: 'Mountain', lat: 27.9881, lon: 86.925, description: 'Earth\'s highest mountain, 8,849m' },
  { id: 's2', name: 'Amazon River', type: 'River', lat: -3.4653, lon: -62.2159, description: 'Largest river by volume in the world' },
  { id: 's3', name: 'Pacific Ocean', type: 'Ocean', lat: 0, lon: -160, description: 'Largest and deepest ocean on Earth' },
  { id: 's4', name: 'Mount Fuji', type: 'Volcano', lat: 35.3606, lon: 138.7274, description: 'Active stratovolcano, 3,776m' },
  { id: 's5', name: 'Heathrow Airport', type: 'Airport', lat: 51.47, lon: -0.4543, description: 'Busiest airport in Europe' },
  { id: 's6', name: 'India', type: 'Country', lat: 22.5937, lon: 78.9629, description: 'Seventh-largest country by area' },
  { id: 's7', name: 'Tokyo', type: 'City', lat: 35.6762, lon: 139.6503, description: 'Capital of Japan, largest metro area' },
  { id: 's8', name: 'K2', type: 'Mountain', lat: 35.8808, lon: 76.5155, description: 'Second-highest mountain, 8,611m' },
  { id: 's9', name: 'Nile River', type: 'River', lat: 2.2183, lon: 31.025, description: 'Longest river in Africa' },
  { id: 's10', name: 'Atlantic Ocean', type: 'Ocean', lat: 0, lon: -25, description: 'Second-largest ocean' },
  { id: 's11', name: 'Krakatoa', type: 'Volcano', lat: -6.1024, lon: 105.4231, description: 'Famous volcanic island in Indonesia' },
  { id: 's12', name: 'JFK Airport', type: 'Airport', lat: 40.6413, lon: -73.7781, description: 'Major international airport in New York' },
  { id: 's13', name: 'United States', type: 'Country', lat: 39.8283, lon: -98.5795, description: 'Fourth-largest country by area' },
  { id: 's14', name: 'Paris', type: 'City', lat: 48.8566, lon: 2.3522, description: 'Capital of France' },
  { id: 's15', name: 'Mount Vesuvius', type: 'Volcano', lat: 40.8214, lon: 14.4303, description: 'Famous volcano near Naples, Italy' },
  { id: 's16', name: 'Mississippi River', type: 'River', lat: 32.3547, lon: -90.0, description: 'Major river in North America' },
  { id: 's17', name: 'Indian Ocean', type: 'Ocean', lat: -20, lon: 80, description: 'Third-largest ocean' },
  { id: 's18', name: 'Singapore', type: 'City', lat: 1.3521, lon: 103.8198, description: 'Major city-state in Southeast Asia' },
  { id: 's19', name: 'Mauna Kea', type: 'Mountain', lat: 19.8207, lon: -155.4681, description: 'Dormant volcano, 4,207m' },
  { id: 's20', name: 'Dubai Airport', type: 'Airport', lat: 25.2532, lon: 55.3657, description: 'World\'s busiest for international passengers' },
];

export const timelineData: TimelineData[] = [
  { year: 1990, globalTemp: 0.35, co2: 354, population: 5.3, forestCover: 31.8, iceCapArea: 11.5, oceanTemp: 16.2, airQuality: 45 },
  { year: 1995, globalTemp: 0.45, co2: 360, population: 5.7, forestCover: 31.5, iceCapArea: 11.3, oceanTemp: 16.4, airQuality: 48 },
  { year: 2000, globalTemp: 0.59, co2: 369, population: 6.1, forestCover: 31.0, iceCapArea: 11.0, oceanTemp: 16.6, airQuality: 52 },
  { year: 2005, globalTemp: 0.69, co2: 379, population: 6.5, forestCover: 30.8, iceCapArea: 10.7, oceanTemp: 16.8, airQuality: 58 },
  { year: 2010, globalTemp: 0.72, co2: 389, population: 6.9, forestCover: 30.5, iceCapArea: 10.3, oceanTemp: 17.0, airQuality: 65 },
  { year: 2015, globalTemp: 0.90, co2: 401, population: 7.3, forestCover: 30.2, iceCapArea: 9.8, oceanTemp: 17.3, airQuality: 72 },
  { year: 2020, globalTemp: 1.02, co2: 414, population: 7.8, forestCover: 29.8, iceCapArea: 9.2, oceanTemp: 17.6, airQuality: 78 },
  { year: 2025, globalTemp: 1.15, co2: 422, population: 8.1, forestCover: 29.5, iceCapArea: 8.8, oceanTemp: 17.9, airQuality: 82 },
];

export const disasterSims: DisasterSim[] = [
  { id: 'ds1', name: 'Cyclone Amphan', type: 'Cyclone', lat: 20.0, lon: 88.0, description: 'Category 5 cyclone in the Bay of Bengal', affectedRegions: ['India', 'Bangladesh'] },
  { id: 'ds2', name: 'Hurricane Katrina', type: 'Hurricane', lat: 29.0, lon: -90.0, description: 'Category 5 Atlantic hurricane', affectedRegions: ['USA', 'Cuba'] },
  { id: 'ds3', name: 'Flood 2023', type: 'Flood', lat: 25.0, lon: 81.0, description: 'Major flooding in the Ganges basin', affectedRegions: ['India', 'Nepal'] },
  { id: 'ds4', name: 'Tohoku Earthquake', type: 'Earthquake', lat: 38.3, lon: 142.4, description: 'Magnitude 9.0 undersea earthquake', affectedRegions: ['Japan'] },
  { id: 'ds5', name: 'Tsunami 2004', type: 'Tsunami', lat: 3.3, lon: 95.8, description: 'Indian Ocean tsunami', affectedRegions: ['Indonesia', 'Sri Lanka', 'India', 'Thailand'] },
  { id: 'ds6', name: 'Eyjafjallajökull', type: 'Volcano', lat: 63.6, lon: -19.6, description: 'Icelandic volcanic eruption', affectedRegions: ['Iceland'] },
];

export const planets: PlanetData[] = [
  { name: 'Mercury', radius: 0.38, distance: 15, color: '#8c7853', description: 'Smallest planet, closest to the Sun', hasRings: false },
  { name: 'Venus', radius: 0.95, distance: 22, color: '#ffc649', description: 'Hottest planet, thick CO2 atmosphere', hasRings: false },
  { name: 'Earth', radius: 1.0, distance: 30, color: '#4a90d9', description: 'Our home planet, the blue marble', hasRings: false },
  { name: 'Mars', radius: 0.53, distance: 40, color: '#cd5c5c', description: 'The Red Planet, future colony target', hasRings: false },
  { name: 'Jupiter', radius: 3.5, distance: 60, color: '#daa520', description: 'Largest planet, gas giant with Great Red Spot', hasRings: false },
  { name: 'Saturn', radius: 3.0, distance: 80, color: '#f4a460', description: 'Famous for its spectacular ring system', hasRings: true },
  { name: 'Uranus', radius: 2.0, distance: 100, color: '#4fd0e0', description: 'Ice giant tilted on its side', hasRings: true },
  { name: 'Neptune', radius: 1.9, distance: 120, color: '#4166f5', description: 'Windiest planet, deep blue ice giant', hasRings: false },
];

export const continents = [
  { name: 'Asia', lat: 34.0479, lon: 100.6197 },
  { name: 'Africa', lat: 1.6519, lon: 16.3271 },
  { name: 'Europe', lat: 54.526, lon: 15.2551 },
  { name: 'North America', lat: 54.526, lon: -105.2551 },
  { name: 'South America', lat: -8.7832, lon: -55.4915 },
  { name: 'Australia', lat: -25.2744, lon: 133.7751 },
  { name: 'Antarctica', lat: -82.8628, lon: 135.0 },
];

export const oceans = [
  { name: 'Pacific Ocean', lat: 0, lon: -160 },
  { name: 'Atlantic Ocean', lat: 0, lon: -25 },
  { name: 'Indian Ocean', lat: -20, lon: 80 },
  { name: 'Arctic Ocean', lat: 75, lon: 0 },
  { name: 'Southern Ocean', lat: -65, lon: 100 },
];

export const countries = [
  { name: 'United States', lat: 39.8283, lon: -98.5795 },
  { name: 'India', lat: 22.5937, lon: 78.9629 },
  { name: 'China', lat: 35.8617, lon: 104.1954 },
  { name: 'Brazil', lat: -14.235, lon: -51.9253 },
  { name: 'Russia', lat: 61.524, lon: 105.3188 },
  { name: 'Japan', lat: 36.2048, lon: 138.2529 },
  { name: 'United Kingdom', lat: 55.3781, lon: -3.436 },
  { name: 'Australia', lat: -25.2744, lon: 133.7751 },
  { name: 'Germany', lat: 51.1657, lon: 10.4515 },
  { name: 'France', lat: 46.2276, lon: 2.2137 },
  { name: 'Egypt', lat: 26.8206, lon: 30.8025 },
  { name: 'South Africa', lat: -30.5595, lon: 22.9375 },
];
