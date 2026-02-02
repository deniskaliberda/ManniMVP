"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

// ===== ROAD WITH ANIMATED TEXTURE =====
function AnimatedRoad() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create road texture with markings (bright daylight version)
  const roadTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // Road surface (light gray asphalt)
    ctx.fillStyle = "#8A8A8A";
    ctx.fillRect(0, 0, 512, 512);

    // Add asphalt texture (subtle noise)
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const brightness = Math.random() * 30 - 15;
      const color = 138 + brightness;
      ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
      ctx.fillRect(x, y, 2, 2);
    }

    // Center line (clean white)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(236, 0, 40, 512);

    // White dashed lines on sides
    ctx.fillStyle = "#FFFFFF";
    for (let i = 0; i < 512; i += 80) {
      ctx.fillRect(100, i, 20, 50);
      ctx.fillRect(392, i, 20, 50);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 8);

    return texture;
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Animate texture offset to simulate movement
      roadTexture.offset.y -= delta * 2; // Speed of road
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[8, 30]} />
      <meshStandardMaterial map={roadTexture} />
    </mesh>
  );
}

// ===== STEERING WHEEL =====
interface SteeringWheelProps {
  mousePosition: { x: number; y: number };
}

function SteeringWheel({ mousePosition }: SteeringWheelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wheelRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (wheelRef.current) {
      // Smooth rotation based on mouse X position
      const targetRotation = mousePosition.x * Math.PI * 0.3;
      wheelRef.current.rotation.z +=
        (targetRotation - wheelRef.current.rotation.z) * 0.1;
    }

    // Subtle breathing animation
    if (groupRef.current) {
      groupRef.current.position.y =
        -1.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 2]}>
      {/* Outer ring */}
      <mesh ref={wheelRef}>
        <torusGeometry args={[0.8, 0.08, 16, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
          emissive="#8B1B23"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Center hub */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
        <meshPhysicalMaterial
          color="#8B1B23"
          metalness={0.9}
          roughness={0.1}
          emissive="#8B1B23"
          emissiveIntensity={0.3}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Spokes */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <mesh key={i} rotation={[0, 0, angle]} position={[0.4, 0, 0]}>
          <boxGeometry args={[0.5, 0.06, 0.04]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// ===== DASHBOARD (GLASSMORPHISM WITH REFLECTIONS) =====
function Dashboard() {
  return (
    <group position={[0, -0.8, 2.5]}>
      {/* Main dashboard panel - highly reflective glass */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6, 0.6, 0.1]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.0}
          roughness={0.0}
          transparent={true}
          opacity={0.3}
          transmission={0.7}
          thickness={1.0}
          clearcoat={1.0}
          clearcoatRoughness={0.0}
          ior={1.5}
          reflectivity={1.0}
        />
      </mesh>

      {/* Speed indicator (left) - glowing Manni-Rot */}
      <mesh position={[-2, 0.1, 0.08]}>
        <circleGeometry args={[0.25, 32]} />
        <meshBasicMaterial 
          color="#8B1B23" 
          transparent 
          opacity={0.9}
        />
      </mesh>

      {/* Center display - glowing Manni-Rot */}
      <mesh position={[0, 0.1, 0.08]}>
        <planeGeometry args={[1.5, 0.3]} />
        <meshBasicMaterial 
          color="#8B1B23" 
          transparent 
          opacity={0.8}
        />
      </mesh>

      {/* Fuel indicator (right) - glowing Manni-Rot */}
      <mesh position={[2, 0.1, 0.08]}>
        <circleGeometry args={[0.25, 32]} />
        <meshBasicMaterial 
          color="#8B1B23" 
          transparent 
          opacity={0.9}
        />
      </mesh>

      {/* Small indicator lights */}
      {[-1.5, -1, 1, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 0.15, 0.09]}>
          <circleGeometry args={[0.05, 16]} />
          <meshBasicMaterial
            color="#8B1B23"
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

// ===== SPEED LINES / PARTICLES =====
function SpeedLines() {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6; // y
      pos[i * 3 + 2] = Math.random() * -20; // z (behind camera)
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Move particles towards camera
        positions[i * 3 + 2] += delta * 15; // z speed

        // Reset particle when it passes camera
        if (positions[i * 3 + 2] > 5) {
          positions[i * 3] = (Math.random() - 0.5) * 10;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
          positions[i * 3 + 2] = -20;
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#8B1B23"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ===== ROADSIDE MARKERS =====
function RoadsideMarkers() {
  const leftTreesRef = useRef<THREE.Group>(null);
  const rightTreesRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (leftTreesRef.current) {
      leftTreesRef.current.children.forEach((child, i) => {
        child.position.z += delta * 8;
        if (child.position.z > 5) {
          child.position.z = -25;
        }
      });
    }
    if (rightTreesRef.current) {
      rightTreesRef.current.children.forEach((child, i) => {
        child.position.z += delta * 8;
        if (child.position.z > 5) {
          child.position.z = -25;
        }
      });
    }
  });

  const trees = [];
  for (let i = 0; i < 10; i++) {
    trees.push(i * -3);
  }

  return (
    <>
      {/* Left side markers */}
      <group ref={leftTreesRef}>
        {trees.map((z, i) => (
          <mesh key={`left-${i}`} position={[-4.5, -0.5, z]}>
            <boxGeometry args={[0.2, 1.5, 0.2]} />
            <meshStandardMaterial
              color="#1a1a1a"
              emissive="#8B1B23"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Right side markers */}
      <group ref={rightTreesRef}>
        {trees.map((z, i) => (
          <mesh key={`right-${i}`} position={[4.5, -0.5, z]}>
            <boxGeometry args={[0.2, 1.5, 0.2]} />
            <meshStandardMaterial
              color="#1a1a1a"
              emissive="#8B1B23"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

// ===== ALPINE MOUNTAIN PANORAMA BACKGROUND =====
function AlpinePanorama() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create realistic alpine mountain panorama
  const panoramaTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 4096; // Higher resolution
    canvas.height = 2048;
    const ctx = canvas.getContext("2d")!;

    // Bright sky gradient - clear alpine day
    const skyGradient = ctx.createLinearGradient(0, 0, 0, 1200);
    skyGradient.addColorStop(0, "#5BA3D0"); // Bright sky blue
    skyGradient.addColorStop(0.4, "#7FCDFF"); // Light blue
    skyGradient.addColorStop(0.7, "#B8E3FF"); // Very light blue
    skyGradient.addColorStop(1, "#E8F5FF"); // Almost white
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, 4096, 2048);

    // Add fluffy white clouds
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * 4096;
      const y = Math.random() * 800;
      const width = 150 + Math.random() * 300;
      const height = 60 + Math.random() * 120;
      ctx.beginPath();
      ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Far back mountains (lightest, atmospheric perspective)
    ctx.fillStyle = "rgba(180, 200, 220, 0.5)";
    ctx.beginPath();
    ctx.moveTo(0, 1400);
    for (let i = 0; i < 4096; i += 200) {
      const peak = 1200 - Math.random() * 200;
      ctx.lineTo(i, peak);
    }
    ctx.lineTo(4096, 2048);
    ctx.lineTo(0, 2048);
    ctx.closePath();
    ctx.fill();

    // Middle mountains (medium tone with blue-gray)
    ctx.fillStyle = "rgba(140, 160, 180, 0.7)";
    ctx.beginPath();
    ctx.moveTo(0, 1500);
    for (let i = 0; i < 4096; i += 150) {
      const peak = 1300 - Math.random() * 250;
      ctx.lineTo(i, peak);
    }
    ctx.lineTo(4096, 2048);
    ctx.lineTo(0, 2048);
    ctx.closePath();
    ctx.fill();

    // Front mountains (darker with green tint for alpine meadows)
    const mountainGradient = ctx.createLinearGradient(0, 1200, 0, 2048);
    mountainGradient.addColorStop(0, "rgba(110, 130, 150, 0.8)"); // Gray-blue peaks
    mountainGradient.addColorStop(0.6, "rgba(90, 120, 100, 0.9)"); // Green-gray slopes
    mountainGradient.addColorStop(1, "rgba(80, 110, 90, 1)"); // Dark green meadows
    ctx.fillStyle = mountainGradient;
    ctx.beginPath();
    ctx.moveTo(0, 1600);
    for (let i = 0; i < 4096; i += 120) {
      const peak = 1400 - Math.random() * 300;
      ctx.lineTo(i, peak);
    }
    ctx.lineTo(4096, 2048);
    ctx.lineTo(0, 2048);
    ctx.closePath();
    ctx.fill();

    // Add snow caps on peaks
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    for (let i = 200; i < 4096; i += 400) {
      const peakX = i;
      const peakY = 1250 - Math.random() * 150;
      ctx.beginPath();
      ctx.moveTo(peakX, peakY);
      ctx.lineTo(peakX - 50, peakY + 80);
      ctx.lineTo(peakX + 50, peakY + 80);
      ctx.closePath();
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }, []);

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]} position={[0, 0, 0]}>
      <sphereGeometry args={[80, 64, 64]} />
      <meshBasicMaterial 
        map={panoramaTexture} 
        side={THREE.BackSide}
        toneMapped={false}
      />
    </mesh>
  );
}

// ===== LIGHT FOG FOR DEPTH =====
function AtmosphericFog() {
  const { scene } = useThree();

  useMemo(() => {
    // Light blue fog for alpine atmosphere
    scene.fog = new THREE.Fog("#B8E3FF", 20, 60);
  }, [scene]);

  return null;
}

// ===== MAIN SCENE =====
export default function SimulatorScene() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    setMousePosition({ x, y });
  };

  return (
    <div className="w-full h-full relative" onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 0.5, 3], fov: 75 }}
        className="w-full h-full"
        gl={{ 
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        {/* ENVIRONMENT FOR REALISTIC REFLECTIONS */}
        <Environment preset="sunset" background={false} />

        {/* ALPINE PANORAMA BACKGROUND */}
        <AlpinePanorama />

        {/* BRIGHT DAYLIGHT LIGHTING - MIDDAY SUN */}
        <ambientLight intensity={1.5} color="#FFFFFF" />

        {/* Main sun light from top-right (creates hard shadows) */}
        <directionalLight
          position={[10, 15, 8]}
          intensity={3.0}
          color="#FFF8E7"
          castShadow
        />

        {/* Fill light from opposite side */}
        <directionalLight
          position={[-8, 10, 5]}
          intensity={1.0}
          color="#E8F4FF"
        />

        {/* Back light for rim lighting */}
        <directionalLight
          position={[0, 8, -10]}
          intensity={1.5}
          color="#FFFFFF"
        />

        {/* Subtle dashboard glow (Manni-Rot) */}
        <pointLight 
          position={[0, -0.5, 2.5]} 
          intensity={0.3} 
          color="#8B1B23"
          distance={3}
          decay={2}
        />

        {/* SCENE ELEMENTS */}
        <AnimatedRoad />
        <SteeringWheel mousePosition={mousePosition} />
        <Dashboard />
        <SpeedLines />
        <RoadsideMarkers />
        <AtmosphericFog />
      </Canvas>

      {/* Minimal overlay for integration */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
