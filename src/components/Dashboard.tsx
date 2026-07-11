import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe2, Activity, Flame, Satellite, Plane, Brain,
  Layers, Cloud, ChevronLeft, BarChart3, Orbit,
  Wind, Home, CloudRain,
} from 'lucide-react';
import { EarthScene } from './EarthScene';
import { InfoPanel } from './InfoPanel';
import { AIAssistant } from './AIAssistant';
import { SimulatorPanel, type ClimateParams } from './SimulatorPanel';
import { SearchBar, Timeline } from './SearchBar';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import {
  earthquakes, wildfires, weatherData, airQualityData,
  satellites, flights, planets,
} from '../data';
import type {
  Earthquake, WildfireData, WeatherData, AirQualityData,
  SatelliteData, FlightData, LayerType, SearchLocation, DisasterSim,
} from '../types';

interface DashboardProps {
  onExit: () => void;
}

export function Dashboard({ onExit }: DashboardProps) {
  const [activeLayers, setActiveLayers] = useState<Set<LayerType>>(new Set(['earthquake', 'weather']));
  const [selectedEarthquake, setSelectedEarthquake] = useState<Earthquake | null>(null);
  const [selectedWildfire, setSelectedWildfire] = useState<WildfireData | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<WeatherData | null>(null);
  const [selectedAirQuality, setSelectedAirQuality] = useState<AirQualityData | null>(null);
  const [selectedSatellite, setSelectedSatellite] = useState<SatelliteData | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<FlightData | null>(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [spaceView, setSpaceView] = useState(false);
  const [analyticsView, setAnalyticsView] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showClouds, setShowClouds] = useState(true);
  const [showAtmosphere, setShowAtmosphere] = useState(true);
  const [dayNight, setDayNight] = useState(true);
  const [focusTarget, setFocusTarget] = useState<{ lat: number; lon: number } | null>(null);
  const [year, setYear] = useState(2025);
  const [activeDisaster, setActiveDisaster] = useState<DisasterSim | null>(null);
  const [climateParams, setClimateParams] = useState<ClimateParams>({
    co2: 422, glacierMelt: 15, seaLevel: 21, temperature: 1.15, deforestation: 10,
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleLayer = (layer: LayerType) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layer)) next.delete(layer);
      else next.add(layer);
      return next;
    });
  };

  const closeAllPanels = () => {
    setSelectedEarthquake(null);
    setSelectedWildfire(null);
    setSelectedWeather(null);
    setSelectedAirQuality(null);
    setSelectedSatellite(null);
    setSelectedFlight(null);
  };

  const handleSearchSelect = (loc: SearchLocation) => {
    setFocusTarget({ lat: loc.lat, lon: loc.lon });
    setSpaceView(false);
    setAnalyticsView(false);
    setTimeout(() => setFocusTarget(null), 2000);
  };

  const layerButtons: { id: LayerType; label: string; icon: any; color: string }[] = [
    { id: 'weather', label: 'Weather', icon: Cloud, color: '#00ddff' },
    { id: 'earthquake', label: 'Earthquakes', icon: Activity, color: '#ff4400' },
    { id: 'airquality', label: 'Air Quality', icon: Wind, color: '#fbbf24' },
    { id: 'wildfire', label: 'Wildfires', icon: Flame, color: '#ff8800' },
    { id: 'satellite', label: 'Satellites', icon: Satellite, color: '#22d3ee' },
    { id: 'flight', label: 'Flights', icon: Plane, color: '#34d399' },
    { id: 'climate', label: 'Climate Sim', icon: Orbit, color: '#818cf8' },
    { id: 'disaster', label: 'Disaster Sim', icon: CloudRain, color: '#ff00ff' },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-space-900">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="glass-panel p-2 text-electric-400 transition hover:bg-electric-400/10"
          >
            <ChevronLeft className={`h-5 w-5 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
          </button>
          <div className="flex items-center gap-2">
            <Globe2 className="h-6 w-6 text-electric-400" />
            <span className="text-lg font-bold text-white">
              Planet<span className="text-electric-400">AI</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar onSelect={handleSearchSelect} />
          <Timeline year={year} onChange={setYear} />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setSpaceView(false); setAnalyticsView(true); }}
            className={`glass-panel flex items-center gap-2 px-3 py-2 text-sm transition ${
              analyticsView ? 'border-electric-400/50 text-electric-400' : 'text-slate-300 hover:text-white'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden md:inline">Analytics</span>
          </button>
          <button
            onClick={() => { setSpaceView(!spaceView); setAnalyticsView(false); }}
            className={`glass-panel flex items-center gap-2 px-3 py-2 text-sm transition ${
              spaceView ? 'border-electric-400/50 text-electric-400' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Orbit className="h-4 w-4" />
            <span className="hidden md:inline">Space</span>
          </button>
          <button
            onClick={onExit}
            className="glass-panel flex items-center gap-2 px-3 py-2 text-sm text-slate-300 transition hover:text-white"
          >
            <Home className="h-4 w-4" />
            <span className="hidden md:inline">Home</span>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 top-16 bottom-0 z-20 w-72 p-3"
          >
            <div className="glass-panel-strong h-full overflow-y-auto p-4">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                <Layers className="h-4 w-4 text-electric-400" />
                Data Layers
              </h3>
              <div className="space-y-2">
                {layerButtons.map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => toggleLayer(btn.id)}
                    className={`flex w-full items-center gap-3 rounded-lg p-2.5 text-sm transition ${
                      activeLayers.has(btn.id)
                        ? 'bg-electric-400/15 text-white'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div
                      className="rounded-lg p-1.5"
                      style={{
                        backgroundColor: activeLayers.has(btn.id) ? `${btn.color}30` : 'rgba(255,255,255,0.05)',
                      }}
                    >
                      <btn.icon className="h-4 w-4" style={{ color: activeLayers.has(btn.id) ? btn.color : '#64748b' }} />
                    </div>
                    <span>{btn.label}</span>
                    <div
                      className="ml-auto h-2 w-2 rounded-full transition"
                      style={{ backgroundColor: activeLayers.has(btn.id) ? btn.color : 'transparent' }}
                    />
                  </button>
                ))}
              </div>

              {/* Earth controls */}
              <h3 className="mb-3 mt-6 flex items-center gap-2 text-sm font-semibold text-white">
                <Globe2 className="h-4 w-4 text-electric-400" />
                Earth Controls
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'Auto-Rotate', value: autoRotate, onChange: () => setAutoRotate(!autoRotate) },
                  { label: 'Clouds', value: showClouds, onChange: () => setShowClouds(!showClouds) },
                  { label: 'Atmosphere', value: showAtmosphere, onChange: () => setShowAtmosphere(!showAtmosphere) },
                  { label: 'Day/Night', value: dayNight, onChange: () => setDayNight(!dayNight) },
                ].map((ctrl) => (
                  <button
                    key={ctrl.label}
                    onClick={ctrl.onChange}
                    className="flex w-full items-center justify-between rounded-lg p-2 text-sm text-slate-300 transition hover:bg-white/5"
                  >
                    <span>{ctrl.label}</span>
                    <div
                      className={`relative h-5 w-9 rounded-full transition ${
                        ctrl.value ? 'bg-electric-400' : 'bg-space-700'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                          ctrl.value ? 'left-4' : 'left-0.5'
                        }`}
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick stats */}
              <h3 className="mb-3 mt-6 flex items-center gap-2 text-sm font-semibold text-white">
                <Activity className="h-4 w-4 text-electric-400" />
                Live Stats
              </h3>
              <div className="space-y-2">
                <div className="glass-panel p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Active Earthquakes</span>
                    <span className="text-lg font-bold text-red-400">{earthquakes.length}</span>
                  </div>
                </div>
                <div className="glass-panel p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Active Wildfires</span>
                    <span className="text-lg font-bold text-orange-400">{wildfires.length}</span>
                  </div>
                </div>
                <div className="glass-panel p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Tracked Satellites</span>
                    <span className="text-lg font-bold text-cyan-400">{satellites.length}</span>
                  </div>
                </div>
                <div className="glass-panel p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Live Flights</span>
                    <span className="text-lg font-bold text-green-400">{flights.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Earth / Analytics */}
      <div className="absolute inset-0 z-0">
        {analyticsView ? (
          <AnalyticsDashboard />
        ) : (
          <EarthScene
            activeLayers={activeLayers}
            earthquakes={earthquakes}
            wildfires={wildfires}
            weatherData={weatherData}
            airQualityData={airQualityData}
            satellites={satellites}
            flights={flights}
            planets={planets}
            activeDisaster={activeDisaster}
            climateParams={climateParams}
            onEarthquakeSelect={setSelectedEarthquake}
            onWildfireSelect={setSelectedWildfire}
            onWeatherSelect={setSelectedWeather}
            onAirQualitySelect={setSelectedAirQuality}
            onSatelliteSelect={setSelectedSatellite}
            onFlightSelect={setSelectedFlight}
            spaceView={spaceView}
            autoRotate={autoRotate}
            showClouds={showClouds}
            showAtmosphere={showAtmosphere}
            dayNight={dayNight}
            focusTarget={focusTarget}
          />
        )}
      </div>

      {/* Simulator panel (right side) */}
      <AnimatePresence>
        {(activeLayers.has('climate') || activeLayers.has('disaster')) && !analyticsView && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-16 bottom-0 z-20 w-80 p-3"
          >
            <SimulatorPanel
              climateParams={climateParams}
              onClimateChange={setClimateParams}
              activeDisaster={activeDisaster}
              onDisasterSelect={setActiveDisaster}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info panel */}
      <InfoPanel
        earthquake={selectedEarthquake}
        wildfire={selectedWildfire}
        weather={selectedWeather}
        airQuality={selectedAirQuality}
        satellite={selectedSatellite}
        flight={selectedFlight}
        onClose={closeAllPanels}
      />

      {/* AI Assistant */}
      <AIAssistant isOpen={aiOpen} onToggle={() => setAiOpen(!aiOpen)} />

      {/* Bottom layer indicator */}
      <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
        <div className="glass-panel flex items-center gap-4 px-4 py-2 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Brain className="h-3 w-3 text-electric-400" />
            Click markers for details
          </span>
          <span className="text-slate-600">|</span>
          <span>Drag to rotate · Scroll to zoom · Right-click to pan</span>
        </div>
      </div>
    </div>
  );
}
