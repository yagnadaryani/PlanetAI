import { useRef, useState, useMemo } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { latLonToVector3 } from './Earth';
import type {
  Earthquake,
  SatelliteData,
  FlightData,
  WildfireData,
  WeatherData,
  AirQualityData,
} from '../../types';

const RADIUS = 2;

/** Pulsing earthquake marker */
export function EarthquakeMarker({
  earthquake,
  onClick,
}: {
  earthquake: Earthquake;
  onClick: (eq: Earthquake) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const position = useMemo(() => latLonToVector3(earthquake.lat, earthquake.lon, RADIUS * 1.01), [earthquake]);
  const color = useMemo(() => {
    if (earthquake.magnitude >= 6.5) return '#ff2200';
    if (earthquake.magnitude >= 5.5) return '#ff8800';
    if (earthquake.magnitude >= 4.5) return '#ffcc00';
    return '#00ff88';
  }, [earthquake.magnitude]);

  const scale = useMemo(() => 0.02 + earthquake.magnitude * 0.008, [earthquake.magnitude]);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      const pulse = 1 + Math.sin(t * 3) * 0.3;
      meshRef.current.scale.setScalar(scale * pulse * (hovered ? 1.5 : 1));
    }
    if (ringRef.current) {
      const t = state.clock.elapsedTime;
      const ringPulse = (Math.sin(t * 2) + 1) * 0.5;
      ringRef.current.scale.setScalar(scale * (1 + ringPulse * 2));
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.6 * (1 - ringPulse);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onClick(earthquake);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.2, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function EarthquakeLayer({
  earthquakes,
  onSelect,
}: {
  earthquakes: Earthquake[];
  onSelect: (eq: Earthquake) => void;
}) {
  return (
    <>
      {earthquakes.map((eq) => (
        <EarthquakeMarker key={eq.id} earthquake={eq} onClick={onSelect} />
      ))}
    </>
  );
}

/** Wildfire marker with flame-like glow */
export function WildfireMarker({
  fire,
  onClick,
}: {
  fire: WildfireData;
  onClick: (f: WildfireData) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const position = useMemo(() => latLonToVector3(fire.lat, fire.lon, RADIUS * 1.01), [fire]);
  const intensityScale = 0.02 + fire.intensity / 50000;

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      const flicker = 0.8 + Math.sin(t * 8 + fire.lat) * 0.2;
      meshRef.current.scale.setScalar(intensityScale * flicker * (hovered ? 1.5 : 1));
    }
    if (glowRef.current) {
      const t = state.clock.elapsedTime;
      glowRef.current.scale.setScalar(intensityScale * (1.5 + Math.sin(t * 4) * 0.3));
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onClick(fire);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#ff4400" transparent opacity={0.9} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#ff8800" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

export function WildfireLayer({
  wildfires,
  onSelect,
}: {
  wildfires: WildfireData[];
  onSelect: (f: WildfireData) => void;
}) {
  return (
    <>
      {wildfires.map((f) => (
        <WildfireMarker key={f.id} fire={f} onClick={onSelect} />
      ))}
    </>
  );
}

/** Weather marker */
export function WeatherMarker({
  weather,
  onClick,
}: {
  weather: WeatherData;
  onClick: (w: WeatherData) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const position = useMemo(() => latLonToVector3(weather.lat, weather.lon, RADIUS * 1.01), [weather]);

  const color = weather.isStorm ? '#ff00ff' : '#00ddff';

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      if (weather.isStorm) {
        const pulse = 1 + Math.sin(t * 4) * 0.3;
        meshRef.current.scale.setScalar(0.03 * pulse * (hovered ? 1.5 : 1));
      } else {
        meshRef.current.scale.setScalar(0.025 * (hovered ? 1.5 : 1));
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onClick(weather);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

export function WeatherLayer({
  weatherData,
  onSelect,
}: {
  weatherData: WeatherData[];
  onSelect: (w: WeatherData) => void;
}) {
  return (
    <>
      {weatherData.map((w, i) => (
        <WeatherMarker key={i} weather={w} onClick={onSelect} />
      ))}
    </>
  );
}

/** Air quality marker */
export function AirQualityMarker({
  aq,
  onClick,
}: {
  aq: AirQualityData;
  onClick: (a: AirQualityData) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const position = useMemo(() => latLonToVector3(aq.lat, aq.lon, RADIUS * 1.01), [aq]);

  const color = useMemo(() => {
    if (aq.aqi > 200) return '#7e0023';
    if (aq.aqi > 150) return '#8f3f97';
    if (aq.aqi > 100) return '#fb5537';
    if (aq.aqi > 50) return '#ffff00';
    return '#00e400';
  }, [aq.aqi]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(0.035 * (hovered ? 1.5 : 1));
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onClick(aq);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

export function AirQualityLayer({
  airQualityData,
  onSelect,
}: {
  airQualityData: AirQualityData[];
  onSelect: (a: AirQualityData) => void;
}) {
  return (
    <>
      {airQualityData.map((aq, i) => (
        <AirQualityMarker key={i} aq={aq} onClick={onSelect} />
      ))}
    </>
  );
}

/** Satellite orbiting Earth */
export function SatelliteMesh({
  satellite,
  onClick,
}: {
  satellite: SatelliteData;
  onClick: (s: SatelliteData) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);

  const orbitR = RADIUS * satellite.orbitRadius;
  const speed = 1 / (satellite.orbitPeriod / 92);

  // Orbit trail points
  const trailPositions = useMemo(() => {
    const points: number[] = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      points.push(Math.cos(angle) * orbitR, 0, Math.sin(angle) * orbitR);
    }
    return new Float32Array(points);
  }, [orbitR]);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime * speed * 0.3 + satellite.phaseOffset;
      const x = Math.cos(t) * orbitR;
      const z = Math.sin(t) * orbitR;
      groupRef.current.position.set(x, 0, z);
    }
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered ? 1.5 : 1);
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.03;
    }
  });

  return (
    <>
      {/* Orbit ring */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={trailPositions.length / 3}
            array={trailPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={satellite.color}
          size={0.03}
          transparent
          opacity={0.3}
          sizeAttenuation
        />
      </points>

      {/* Satellite */}
      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          onClick={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            onClick(satellite);
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[0.06, 0.06, 0.06]} />
          <meshStandardMaterial
            color={satellite.color}
            emissive={satellite.color}
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* Glow */}
        <mesh scale={2}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={satellite.color} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </>
  );
}

export function SatelliteLayer({
  satellites,
  onSelect,
}: {
  satellites: SatelliteData[];
  onSelect: (s: SatelliteData) => void;
}) {
  return (
    <>
      {satellites.map((sat) => (
        <SatelliteMesh key={sat.id} satellite={sat} onClick={onSelect} />
      ))}
    </>
  );
}

/** Flight path with moving aircraft */
export function FlightMesh({
  flight,
  index,
  onClick,
}: {
  flight: FlightData;
  index: number;
  onClick: (f: FlightData) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const originPos = useMemo(() => latLonToVector3(flight.originLat, flight.originLon, RADIUS * 1.02), [flight]);
  const destPos = useMemo(() => latLonToVector3(flight.destLat, flight.destLon, RADIUS * 1.02), [flight]);

  // Curved path
  const curve = useMemo(() => {
    const mid = originPos.clone().add(destPos).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(RADIUS * 1.5);
    return new THREE.QuadraticBezierCurve3(originPos, mid, destPos);
  }, [originPos, destPos]);

  const pathPoints = useMemo(() => curve.getPoints(64), [curve]);
  const lineObject = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const mat = new THREE.LineBasicMaterial({ color: '#00d4ff', transparent: true, opacity: 0.3 });
    return new THREE.Line(geo, mat);
  }, [pathPoints]);

  useFrame((state) => {
    const t = (state.clock.elapsedTime * 0.03 + flight.progress + index * 0.1) % 1;
    if (meshRef.current) {
      const pos = curve.getPoint(t);
      meshRef.current.position.copy(pos);
      const tangent = curve.getTangent(t);
      meshRef.current.lookAt(pos.clone().add(tangent));
      meshRef.current.scale.setScalar(hovered ? 1.5 : 1);
    }
  });

  return (
    <>
      <primitive object={lineObject} />
      <mesh
        ref={meshRef}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onClick(flight);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <coneGeometry args={[0.015, 0.04, 4]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.6} />
      </mesh>
    </>
  );
}

export function FlightLayer({
  flights,
  onSelect,
}: {
  flights: FlightData[];
  onSelect: (f: FlightData) => void;
}) {
  return (
    <>
      {flights.map((f, i) => (
        <FlightMesh key={f.id} flight={f} index={i} onClick={onSelect} />
      ))}
    </>
  );
}
