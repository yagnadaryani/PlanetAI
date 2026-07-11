import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
  Earth,
  EarthLighting,
  Starfield,
  NebulaBackground,
  latLonToVector3,
} from './three/Earth';
import {
  EarthquakeLayer,
  WildfireLayer,
  WeatherLayer,
  AirQualityLayer,
  SatelliteLayer,
  FlightLayer,
} from './three/Layers';
import { SolarSystem, Moon, DisasterVisual } from './three/Space';
import type {
  Earthquake,
  WildfireData,
  WeatherData,
  AirQualityData,
  SatelliteData,
  FlightData,
  DisasterSim,
  PlanetData,
  LayerType,
} from '../types';

export interface EarthSceneProps {
  activeLayers: Set<LayerType>;
  earthquakes: Earthquake[];
  wildfires: WildfireData[];
  weatherData: WeatherData[];
  airQualityData: AirQualityData[];
  satellites: SatelliteData[];
  flights: FlightData[];
  planets?: PlanetData[];
  activeDisaster?: DisasterSim | null;
  climateParams?: {
    co2: number;
    glacierMelt: number;
    seaLevel: number;
    temperature: number;
    deforestation: number;
  };
  onEarthquakeSelect?: (eq: Earthquake) => void;
  onWildfireSelect?: (f: WildfireData) => void;
  onWeatherSelect?: (w: WeatherData) => void;
  onAirQualitySelect?: (a: AirQualityData) => void;
  onSatelliteSelect?: (s: SatelliteData) => void;
  onFlightSelect?: (f: FlightData) => void;
  spaceView?: boolean;
  autoRotate?: boolean;
  showClouds?: boolean;
  showAtmosphere?: boolean;
  dayNight?: boolean;
  focusTarget?: { lat: number; lon: number } | null;
}

function CameraFocus({
  focusTarget,
}: {
  focusTarget?: { lat: number; lon: number } | null;
}) {
  const controlsRef = useRef<any>(null);

  if (focusTarget && controlsRef.current) {
    const pos = latLonToVector3(focusTarget.lat, focusTarget.lon, 5);
    controlsRef.current.target.copy(pos);
    controlsRef.current.update();
  }

  return null;
}

export function EarthScene({
  activeLayers,
  earthquakes,
  wildfires,
  weatherData,
  airQualityData,
  satellites,
  flights,
  planets = [],
  activeDisaster,
  onEarthquakeSelect,
  onWildfireSelect,
  onWeatherSelect,
  onAirQualitySelect,
  onSatelliteSelect,
  onFlightSelect,
  spaceView = false,
  autoRotate = true,
  showClouds = true,
  showAtmosphere = true,
  dayNight = true,
  focusTarget,
}: EarthSceneProps) {

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 2000 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#050816']} />
      <fog attach="fog" args={['#050816', 100, 500]} />

      <Suspense fallback={null}>
        <Starfield count={5000} />
        <NebulaBackground />

        {spaceView ? (
          <>
            <ambientLight intensity={0.2} />
            <SolarSystem planets={planets} />
          </>
        ) : (
          <>
            <EarthLighting />
            <Earth
              radius={2}
              rotationSpeed={0.0008}
              showClouds={showClouds}
              showAtmosphere={showAtmosphere}
              dayNight={dayNight}
              autoRotate={autoRotate}
            />
            <Moon />

            {activeLayers.has('earthquake') && (
              <EarthquakeLayer earthquakes={earthquakes} onSelect={(eq) => onEarthquakeSelect?.(eq)} />
            )}
            {activeLayers.has('wildfire') && (
              <WildfireLayer wildfires={wildfires} onSelect={(f) => onWildfireSelect?.(f)} />
            )}
            {activeLayers.has('weather') && (
              <WeatherLayer weatherData={weatherData} onSelect={(w) => onWeatherSelect?.(w)} />
            )}
            {activeLayers.has('airquality') && (
              <AirQualityLayer airQualityData={airQualityData} onSelect={(a) => onAirQualitySelect?.(a)} />
            )}
            {activeLayers.has('satellite') && (
              <SatelliteLayer satellites={satellites} onSelect={(s) => onSatelliteSelect?.(s)} />
            )}
            {activeLayers.has('flight') && (
              <FlightLayer flights={flights} onSelect={(f) => onFlightSelect?.(f)} />
            )}
            {activeLayers.has('disaster') && activeDisaster && (
              <DisasterVisual lat={activeDisaster.lat} lon={activeDisaster.lon} type={activeDisaster.type} />
            )}
          </>
        )}

        <CameraFocus focusTarget={focusTarget} />
      </Suspense>

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={3}
        maxDistance={spaceView ? 200 : 15}
        zoomSpeed={0.8}
        rotateSpeed={0.5}
        panSpeed={0.5}
      />
    </Canvas>
  );
}
