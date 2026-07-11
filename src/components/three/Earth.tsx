import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural Earth texture generated on the GPU side.
 * Instead of loading external images (which may be blocked in sandboxed environments),
 * we draw a canvas-based Earth with continents, oceans, and ice caps.
 */

function createEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Ocean base
  const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGradient.addColorStop(0, '#0a3d6e');
  oceanGradient.addColorStop(0.5, '#0d5a9e');
  oceanGradient.addColorStop(1, '#0a3d6e');
  ctx.fillStyle = oceanGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Continent shapes (simplified blob polygons)
  const continents: { x: number; y: number; points: number; radius: number; color: string }[] = [
    { x: 0.55, y: 0.35, points: 12, radius: 180, color: '#2d6e3e' }, // North America
    { x: 0.68, y: 0.42, points: 8, radius: 80, color: '#3a7a4a' }, // Central America
    { x: 0.72, y: 0.65, points: 10, radius: 120, color: '#2d6e3e' }, // South America
    { x: 0.5, y: 0.3, points: 10, radius: 90, color: '#3a7a4a' }, // Greenland
    { x: 0.52, y: 0.5, points: 14, radius: 160, color: '#2d6e3e' }, // Africa
    { x: 0.45, y: 0.32, points: 12, radius: 130, color: '#3a7a4a' }, // Europe
    { x: 0.6, y: 0.35, points: 16, radius: 220, color: '#2d6e3e' }, // Asia
    { x: 0.82, y: 0.7, points: 8, radius: 90, color: '#3a7a4a' }, // Australia
    { x: 0.5, y: 0.95, points: 10, radius: 250, color: '#e8e8e8' }, // Antarctica
  ];

  for (const c of continents) {
    const cx = c.x * canvas.width;
    const cy = c.y * canvas.height;
    ctx.beginPath();
    for (let i = 0; i <= c.points; i++) {
      const angle = (i / c.points) * Math.PI * 2;
      const variance = 0.6 + Math.random() * 0.8;
      const r = c.radius * variance;
      const px = cx + Math.cos(angle) * r;
      const py = cy + Math.sin(angle) * r * 0.7;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = c.color;
    ctx.fill();

    // Add texture variation
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * c.radius * 0.8;
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist * 0.7;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(45,110,62,0.4)' : 'rgba(58,122,74,0.4)';
      ctx.beginPath();
      ctx.arc(px, py, Math.random() * 20 + 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Ice caps at poles
  const iceGradient1 = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.08);
  iceGradient1.addColorStop(0, 'rgba(255,255,255,0.95)');
  iceGradient1.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = iceGradient1;
  ctx.fillRect(0, 0, canvas.width, canvas.height * 0.08);

  const iceGradient2 = ctx.createLinearGradient(0, canvas.height * 0.92, 0, canvas.height);
  iceGradient2.addColorStop(0, 'rgba(255,255,255,0)');
  iceGradient2.addColorStop(1, 'rgba(255,255,255,0.95)');
  ctx.fillStyle = iceGradient2;
  ctx.fillRect(0, canvas.height * 0.92, canvas.width, canvas.height * 0.08);

  // Add some noise for realism
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 15;
    imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + noise));
    imageData.data[i + 1] = Math.max(0, Math.min(255, imageData.data[i + 1] + noise));
    imageData.data[i + 2] = Math.max(0, Math.min(255, imageData.data[i + 2] + noise));
  }
  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createCloudTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Cloud blobs
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 80 + 30;
    const opacity = Math.random() * 0.6 + 0.2;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(255,255,255,${opacity})`);
    gradient.addColorStop(0.5, `rgba(255,255,255,${opacity * 0.5})`);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Cloud bands near equator
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * canvas.width;
    const y = canvas.height * 0.4 + Math.random() * canvas.height * 0.2;
    const radius = Math.random() * 120 + 50;
    const opacity = Math.random() * 0.4 + 0.15;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(255,255,255,${opacity})`);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createBumpTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 8 + 1;
    const shade = Math.random() > 0.5 ? 200 : 100;
    ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

interface EarthProps {
  radius?: number;
  rotationSpeed?: number;
  showClouds?: boolean;
  showAtmosphere?: boolean;
  dayNight?: boolean;
  autoRotate?: boolean;
}

export function Earth({
  radius = 2,
  rotationSpeed = 0.0008,
  showClouds = true,
  showAtmosphere = true,
  dayNight = true,
  autoRotate = true,
}: EarthProps) {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const earthTexture = useMemo(() => createEarthTexture(), []);
  const cloudTexture = useMemo(() => createCloudTexture(), []);
  const bumpTexture = useMemo(() => createBumpTexture(), []);

  useFrame(() => {
    if (autoRotate && earthRef.current) {
      earthRef.current.rotation.y += rotationSpeed;
    }
    if (autoRotate && cloudsRef.current) {
      cloudsRef.current.rotation.y += rotationSpeed * 1.2;
    }
  });

  return (
    <group>
      {/* Earth surface */}
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={0.05}
          roughness={0.85}
          metalness={0.1}
          emissive={dayNight ? new THREE.Color('#0a1520') : new THREE.Color('#000000')}
          emissiveIntensity={dayNight ? 0.15 : 0}
        />
      </mesh>

      {/* Clouds */}
      {showClouds && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[radius * 1.015, 64, 64]} />
          <meshStandardMaterial
            map={cloudTexture}
            transparent
            opacity={0.4}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Atmosphere glow */}
      {showAtmosphere && (
        <mesh ref={atmosphereRef} scale={1.08}>
          <sphereGeometry args={[radius, 64, 64]} />
          <shaderMaterial
            transparent
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            vertexShader={`
              varying vec3 vNormal;
              void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              varying vec3 vNormal;
              void main() {
                float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
                vec3 atmosphereColor = vec3(0.0, 0.83, 1.0);
                gl_FragColor = vec4(atmosphereColor, 1.0) * intensity;
              }
            `}
          />
        </mesh>
      )}
    </group>
  );
}

/** Convert lat/lon to 3D position on a sphere of given radius */
export function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

/** Starfield background */
export function Starfield({ count = 8000 }: { count?: number }) {
  const starsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 100 + Math.random() * 400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.005;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.8}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Nebula background plane */
export function NebulaBackground() {
  const { viewport } = useThree();
  return (
    <mesh position={[0, 0, -200]} scale={[viewport.width * 3, viewport.height * 3, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
          }
          void main() {
            vec2 uv = vUv;
            float dist = distance(uv, vec2(0.5));
            vec3 color1 = vec3(0.0, 0.1, 0.3) * (1.0 - dist * 1.5);
            vec3 color2 = vec3(0.05, 0.0, 0.15) * smoothstep(0.3, 0.8, dist);
            vec3 color3 = vec3(0.0, 0.05, 0.2) * random(uv * 5.0);
            vec3 finalColor = color1 + color2 + color3 * 0.3;
            gl_FragColor = vec4(finalColor, 0.6);
          }
        `}
      />
    </mesh>
  );
}

/** Lighting setup for day/night effect */
export function EarthLighting() {
  const sunRef = useRef<THREE.DirectionalLight>(null);

  useEffect(() => {
    if (sunRef.current) {
      sunRef.current.position.set(10, 3, 5);
    }
  }, []);

  return (
    <>
      <ambientLight intensity={0.15} color="#1a2a4a" />
      <directionalLight
        ref={sunRef}
        position={[10, 3, 5]}
        intensity={2.5}
        color="#ffffff"
      />
      <pointLight position={[-10, -5, -5]} intensity={0.3} color="#0044aa" />
    </>
  );
}
