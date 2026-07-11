import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { PlanetData } from '../../types';

/** Sun with glow */
export function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={sunRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshBasicMaterial color="#ffcc00" />
      </mesh>
      <mesh scale={1.3}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color="#ff8800" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh scale={1.6}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={3} color="#ffcc00" distance={300} />
    </group>
  );
}

/** Planet mesh with optional rings */
export function PlanetMesh({ planet }: { planet: PlanetData }) {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.2;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[planet.distance, 0, 0]}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[planet.radius, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          roughness={0.8}
          metalness={0.1}
          emissive={planet.color}
          emissiveIntensity={0.1}
        />
      </mesh>
      {planet.hasRings && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[planet.radius * 1.4, planet.radius * 2.2, 64]} />
          <meshBasicMaterial
            color={planet.color}
            side={THREE.DoubleSide}
            transparent
            opacity={0.5}
          />
        </mesh>
      )}
    </group>
  );
}

/** Moon orbiting Earth */
export function Moon() {
  const moonRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (moonRef.current) {
      const t = state.clock.elapsedTime * 0.2;
      moonRef.current.position.set(
        Math.cos(t) * 4,
        0,
        Math.sin(t) * 4
      );
    }
  });

  return (
    <group ref={moonRef}>
      <mesh>
        <sphereGeometry args={[0.27, 32, 32]} />
        <meshStandardMaterial color="#cccccc" roughness={0.9} />
      </mesh>
    </group>
  );
}

/** Solar system view */
export function SolarSystem({ planets }: { planets: PlanetData[] }) {
  return (
    <>
      <Sun />
      {planets.map((p, i) => (
        <group key={i}>
          <PlanetMesh planet={p} />
          {/* Orbit ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[p.distance - 0.05, p.distance + 0.05, 128]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.08} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </>
  );
}

/** Disaster simulation visual */
export function DisasterVisual({
  lat,
  lon,
  type,
}: {
  lat: number;
  lon: number;
  type: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const position = useMemo(() => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const r = 2.05;
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  }, [lat, lon]);

  const color = useMemo(() => {
    switch (type) {
      case 'Cyclone':
      case 'Hurricane':
        return '#ff00ff';
      case 'Flood':
        return '#00aaff';
      case 'Earthquake':
        return '#ff4400';
      case 'Tsunami':
        return '#0066ff';
      case 'Volcano':
        return '#ff6600';
      default:
        return '#ff0000';
    }
  }, [type]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.scale.setScalar(0.05 + Math.sin(t * 5) * 0.02);
    }
    if (ringRef.current) {
      const pulse = (Math.sin(t * 2) + 1) * 0.5;
      ringRef.current.scale.setScalar(0.05 + pulse * 0.15);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.6 * (1 - pulse);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.5, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
