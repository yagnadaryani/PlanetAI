import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Layers, Wind, Droplets, Gauge, Thermometer, Cloud, Flame, Satellite, Plane, Activity, AlertTriangle } from 'lucide-react';
import type {
  Earthquake,
  WildfireData,
  WeatherData,
  AirQualityData,
  SatelliteData,
  FlightData,
} from '../types';

interface InfoPanelProps {
  earthquake?: Earthquake | null;
  wildfire?: WildfireData | null;
  weather?: WeatherData | null;
  airQuality?: AirQualityData | null;
  satellite?: SatelliteData | null;
  flight?: FlightData | null;
  onClose: () => void;
}

function riskColor(risk: string) {
  switch (risk) {
    case 'Low': return 'text-green-400';
    case 'Moderate': return 'text-yellow-400';
    case 'High': return 'text-orange-400';
    case 'Severe': return 'text-red-400';
    default: return 'text-slate-400';
  }
}

function aqiColor(aqi: number) {
  if (aqi > 200) return '#7e0023';
  if (aqi > 150) return '#8f3f97';
  if (aqi > 100) return '#fb5537';
  if (aqi > 50) return '#ffff00';
  return '#00e400';
}

export function InfoPanel({
  earthquake,
  wildfire,
  weather,
  airQuality,
  satellite,
  flight,
  onClose,
}: InfoPanelProps) {
  const isOpen = earthquake || wildfire || weather || airQuality || satellite || flight;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.3 }}
          className="glass-panel-strong absolute right-4 top-20 z-40 w-80 p-5 md:right-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Details</h3>
            <button onClick={onClose} className="rounded-lg p-1 text-slate-400 transition hover:bg-electric-400/10 hover:text-electric-400">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Earthquake */}
          {earthquake && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-red-400" />
                <span className="text-lg font-bold text-white">Earthquake</span>
                <span className={`data-badge ${riskColor(earthquake.riskLevel)} bg-white/5`">
                  {earthquake.riskLevel}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="h-4 w-4 text-electric-400" />
                {earthquake.location}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-panel p-3">
                  <p className="text-xs text-slate-400">Magnitude</p>
                  <p className="text-2xl font-bold text-red-400">{earthquake.magnitude}</p>
                </div>
                <div className="glass-panel p-3">
                  <p className="text-xs text-slate-400">Depth</p>
                  <p className="text-2xl font-bold text-white">{earthquake.depth}<span className="text-sm">km</span></p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Clock className="h-4 w-4 text-electric-400" />
                {earthquake.time}
              </div>
              <div className="text-xs text-slate-500">
                Lat: {earthquake.lat.toFixed(2)}°, Lon: {earthquake.lon.toFixed(2)}°
              </div>
            </div>
          )}

          {/* Wildfire */}
          {wildfire && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-400" />
                <span className="text-lg font-bold text-white">Wildfire</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="h-4 w-4 text-electric-400" />
                {wildfire.location}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-panel p-3">
                  <p className="text-xs text-slate-400">Intensity</p>
                  <p className="text-2xl font-bold text-orange-400">{wildfire.intensity}</p>
                  <p className="text-xs text-slate-500">MW</p>
                </div>
                <div className="glass-panel p-3">
                  <p className="text-xs text-slate-400">Area</p>
                  <p className="text-2xl font-bold text-white">{(wildfire.areaAffected / 1000).toFixed(1)}</p>
                  <p className="text-xs text-slate-500">k hectares</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Clock className="h-4 w-4 text-electric-400" />
                {wildfire.detectionTime}
              </div>
              <div className="text-xs text-slate-500">
                Lat: {wildfire.lat.toFixed(2)}°, Lon: {wildfire.lon.toFixed(2)}°
              </div>
            </div>
          )}

          {/* Weather */}
          {weather && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-electric-400" />
                <span className="text-lg font-bold text-white">{weather.city}</span>
                {weather.isStorm && (
                  <span className="data-badge bg-red-500/20 text-red-400">
                    <AlertTriangle className="h-3 w-3" /> Storm
                  </span>
                )}
              </div>
              <div className="glass-panel p-4 text-center">
                <Thermometer className="mx-auto mb-1 h-5 w-5 text-orange-400" />
                <p className="text-3xl font-bold text-white">{weather.temperature}°C</p>
                <p className="text-sm text-slate-400">{weather.condition}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-panel p-3">
                  <Droplets className="mb-1 h-4 w-4 text-electric-400" />
                  <p className="text-xs text-slate-400">Rainfall</p>
                  <p className="text-lg font-semibold text-white">{weather.rainfall} mm</p>
                </div>
                <div className="glass-panel p-3">
                  <Wind className="mb-1 h-4 w-4 text-electric-400" />
                  <p className="text-xs text-slate-400">Wind</p>
                  <p className="text-lg font-semibold text-white">{weather.windSpeed} km/h</p>
                </div>
                <div className="glass-panel p-3">
                  <Gauge className="mb-1 h-4 w-4 text-electric-400" />
                  <p className="text-xs text-slate-400">Pressure</p>
                  <p className="text-lg font-semibold text-white">{weather.pressure} hPa</p>
                </div>
                <div className="glass-panel p-3">
                  <Droplets className="mb-1 h-4 w-4 text-electric-400" />
                  <p className="text-xs text-slate-400">Humidity</p>
                  <p className="text-lg font-semibold text-white">{weather.humidity}%</p>
                </div>
              </div>
              <div className="text-xs text-slate-500">
                Wind direction: {weather.windDirection}°
              </div>
            </div>
          )}

          {/* Air Quality */}
          {airQuality && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-electric-400" />
                <span className="text-lg font-bold text-white">{airQuality.city}</span>
              </div>
              <div className="glass-panel p-4 text-center">
                <p className="text-xs text-slate-400">Air Quality Index</p>
                <p className="text-4xl font-bold" style={{ color: aqiColor(airQuality.aqi) }}>{airQuality.aqi}</p>
                <p className="text-sm" style={{ color: aqiColor(airQuality.aqi) }}>{airQuality.category}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-panel p-3">
                  <p className="text-xs text-slate-400">PM2.5</p>
                  <p className="text-lg font-semibold text-white">{airQuality.pm25} µg/m³</p>
                </div>
                <div className="glass-panel p-3">
                  <p className="text-xs text-slate-400">PM10</p>
                  <p className="text-lg font-semibold text-white">{airQuality.pm10} µg/m³</p>
                </div>
                <div className="glass-panel p-3">
                  <p className="text-xs text-slate-400">CO</p>
                  <p className="text-lg font-semibold text-white">{airQuality.co} mg/m³</p>
                </div>
                <div className="glass-panel p-3">
                  <p className="text-xs text-slate-400">NO₂</p>
                  <p className="text-lg font-semibold text-white">{airQuality.no2} µg/m³</p>
                </div>
              </div>
            </div>
          )}

          {/* Satellite */}
          {satellite && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Satellite className="h-5 w-5" style={{ color: satellite.color }} />
                <span className="text-lg font-bold text-white">{satellite.name}</span>
              </div>
              <span className="data-badge bg-electric-400/10 text-electric-400">{satellite.type}</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-panel p-3">
                  <p className="text-xs text-slate-400">Altitude</p>
                  <p className="text-lg font-semibold text-white">{satellite.altitude} km</p>
                </div>
                <div className="glass-panel p-3">
                  <p className="text-xs text-slate-400">Speed</p>
                  <p className="text-lg font-semibold text-white">{satellite.speed.toLocaleString()} km/h</p>
                </div>
                <div className="glass-panel p-3">
                  <p className="text-xs text-slate-400">Orbit Period</p>
                  <p className="text-lg font-semibold text-white">{satellite.orbitPeriod} min</p>
                </div>
                <div className="glass-panel p-3">
                  <p className="text-xs text-slate-400">Inclination</p>
                  <p className="text-lg font-semibold text-white">{satellite.inclination}°</p>
                </div>
              </div>
            </div>
          )}

          {/* Flight */}
          {flight && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-electric-400" />
                <span className="text-lg font-bold text-white">{flight.flightNumber}</span>
              </div>
              <div className="glass-panel p-3">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs text-slate-400">From</p>
                    <p className="font-semibold text-white">{flight.origin}</p>
                  </div>
                  <Plane className="h-4 w-4 text-electric-400" />
                  <div className="text-right">
                    <p className="text-xs text-slate-400">To</p>
                    <p className="font-semibold text-white">{flight.destination}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-panel p-3">
                  <p className="text-xs text-slate-400">Speed</p>
                  <p className="text-lg font-semibold text-white">{flight.speed} km/h</p>
                </div>
                <div className="glass-panel p-3">
                  <p className="text-xs text-slate-400">Altitude</p>
                  <p className="text-lg font-semibold text-white">{(flight.altitude / 1000).toFixed(1)} km</p>
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs text-slate-400">
                  <span>Progress</span>
                  <span>{Math.round(flight.progress * 100)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-space-700">
                  <div className="h-full rounded-full bg-gradient-to-r from-electric-400 to-cyan-glow" style={{ width: `${flight.progress * 100}%` }} />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
