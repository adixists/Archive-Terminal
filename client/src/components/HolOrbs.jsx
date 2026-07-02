/**
 * =============================================================================
 * SPACE HUD — Archive Terminal v4.0
 * =============================================================================
 * Renders:
 * - Full-width deep-space background with starfield (Three.js)
 * - A 3D rocket that flies in from the left, settles in the center with live
 *   animated exhaust/fire plume
 * - Three holographic "porthole windows" showing TOTAL / ACTIVE / ARCHIVED stats
 */

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  STARFIELD                                                                   */
/* ═══════════════════════════════════════════════════════════════════════════ */
function StarField() {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 80;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#b0c8ff" size={0.06} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  EXHAUST PARTICLES                                                           */
/* ═══════════════════════════════════════════════════════════════════════════ */
function ExhaustParticles({ active }) {
  const ref = useRef();
  const COUNT = 120;

  const { positions, velocities, lifetimes, sizes } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    const lt  = new Float32Array(COUNT);
    const sz  = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      lt[i] = Math.random(); // stagger initial lifetimes
      sz[i] = 0.04 + Math.random() * 0.08;
    }
    return { positions: pos, velocities: vel, lifetimes: lt, sizes: sz };
  }, []);

  const colorsArr = useMemo(() => new Float32Array(COUNT * 3), []);

  useFrame((_, delta) => {
    if (!ref.current || !active) return;
    const posAttr = ref.current.geometry.attributes.position;
    const colAttr = ref.current.geometry.attributes.color;
    const szAttr  = ref.current.geometry.attributes.size;

    for (let i = 0; i < COUNT; i++) {
      lifetimes[i] -= delta * 1.8;
      if (lifetimes[i] <= 0) {
        // Reset particle at rocket nozzle (behind rocket, in local coords)
        lifetimes[i] = 0.6 + Math.random() * 0.4;
        posAttr.array[i * 3]     = -1.15 + (Math.random() - 0.5) * 0.05;
        posAttr.array[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
        posAttr.array[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
        velocities[i * 3]     = -(0.6 + Math.random() * 1.4); // shoots left
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
      }
      posAttr.array[i * 3]     += velocities[i * 3] * delta;
      posAttr.array[i * 3 + 1] += velocities[i * 3 + 1] * delta;
      posAttr.array[i * 3 + 2] += velocities[i * 3 + 2] * delta;

      // Color gradient: white core → orange → red → transparent
      const t = 1 - lifetimes[i] / 1.0;
      if (t < 0.2) {
        colAttr.array[i * 3]     = 1.0;
        colAttr.array[i * 3 + 1] = 1.0;
        colAttr.array[i * 3 + 2] = 0.9;
      } else if (t < 0.5) {
        colAttr.array[i * 3]     = 1.0;
        colAttr.array[i * 3 + 1] = 0.5 - (t - 0.2) * 0.8;
        colAttr.array[i * 3 + 2] = 0.1;
      } else {
        colAttr.array[i * 3]     = 0.9 - (t - 0.5) * 1.5;
        colAttr.array[i * 3 + 1] = 0.1;
        colAttr.array[i * 3 + 2] = 0.0;
      }

      const alpha = Math.max(0, lifetimes[i] / 0.6);
      szAttr.array[i] = sizes[i] * (0.5 + 0.5 * alpha);
    }
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
    szAttr.needsUpdate  = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colorsArr, 3]} />
        <bufferAttribute attach="attributes-size"     args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
        size={0.08}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  ROCKET BODY                                                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
function RocketMesh({ settled }) {
  const groupRef = useRef();
  const flameRef = useRef();
  const timeRef  = useRef(0);

  // Fly-in animation: start off-screen left, settle to center
  const startX = -22;
  const endX   = 0;
  const xRef   = useRef(startX);
  const doneRef = useRef(false);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;

    if (groupRef.current) {
      if (!doneRef.current) {
        // Ease-in-out to center
        xRef.current += (endX - xRef.current) * delta * 1.6;
        if (Math.abs(xRef.current - endX) < 0.01) {
          xRef.current = endX;
          doneRef.current = true;
        }
        groupRef.current.position.x = xRef.current;
      }

      // Gentle float when settled
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.05;
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.03;
    }

    // Pulsate flame cone
    if (flameRef.current) {
      const pulse = 1 + Math.sin(t * 14) * 0.12;
      flameRef.current.scale.set(pulse, 1 + Math.sin(t * 18) * 0.15, pulse);
    }
  });

  return (
    <group ref={groupRef} position={[startX, 0, 0]}>
      {/* === Fuselage === */}
      <mesh>
        <cylinderGeometry args={[0.18, 0.22, 1.8, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Fuselage metallic stripe */}
      <mesh>
        <cylinderGeometry args={[0.185, 0.225, 0.06, 32]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.4} metalness={1} roughness={0.1} />
      </mesh>

      {/* === Nose cone === */}
      <mesh position={[0, 1.15, 0]}>
        <coneGeometry args={[0.18, 0.75, 32]} />
        <meshStandardMaterial color="#0f0f1e" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Nose tip glow */}
      <mesh position={[0, 1.52, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
      </mesh>

      {/* === Fins (4) === */}
      {[0, 90, 180, 270].map((deg, i) => (
        <mesh key={i} position={[
          Math.sin(deg * Math.PI / 180) * 0.23,
          -0.72,
          Math.cos(deg * Math.PI / 180) * 0.23,
        ]} rotation={[0, deg * Math.PI / 180, 0]}>
          <coneGeometry args={[0.13, 0.5, 3]} />
          <meshStandardMaterial color="#12122a" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* === Engine nozzle === */}
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.16, 0.22, 0.25, 24]} />
        <meshStandardMaterial color="#0a0a18" metalness={1} roughness={0.05} />
      </mesh>

      {/* === Flame cone (visible glow) === */}
      <mesh ref={flameRef} position={[0, -1.35, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.14, 0.55, 24, 1, true]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.6} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Inner flame */}
      <mesh position={[0, -1.28, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.07, 0.35, 16, 1, true]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Window porthole on rocket body */}
      <mesh position={[0, 0.3, 0.2]}>
        <circleGeometry args={[0.08, 24]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} transparent opacity={0.9} />
      </mesh>

      {/* Glow light from engine */}
      <pointLight position={[0, -1.5, 0]} color="#ff4400" intensity={2.5} distance={2.5} decay={2} />
      {/* Blue rim glow */}
      <pointLight position={[0, 0.5, 0]} color="#00f0ff" intensity={0.5} distance={3} decay={2} />

      {/* Exhaust particles */}
      <ExhaustParticles active={true} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  SCENE CAMERA & FOG                                                          */
/* ═══════════════════════════════════════════════════════════════════════════ */
function SceneSetup() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2('#04040e', 0.018);
    return () => { scene.fog = null; };
  }, [scene]);
  return null;
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  PORTHOLE / STAT WINDOW OVERLAY                                              */
/* ═══════════════════════════════════════════════════════════════════════════ */
function StatWindow({ value, label, color, glowColor, delay }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className="stat-porthole"
      style={{
        borderColor: color,
        boxShadow: `0 0 24px ${glowColor}44, inset 0 0 20px ${glowColor}11, 0 0 2px ${color}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
        transition: `opacity 0.7s ease, transform 0.7s ease`,
      }}
    >
      {/* Porthole glass rim */}
      <div className="porthole-rim" style={{ borderColor: `${color}66` }} />

      {/* Scan-line decoration */}
      <div className="porthole-scanlines" />

      {/* Inner content */}
      <div className="porthole-content">
        {/* Corner bolts */}
        <div className="bolt bolt-tl" style={{ background: color }} />
        <div className="bolt bolt-tr" style={{ background: color }} />
        <div className="bolt bolt-bl" style={{ background: color }} />
        <div className="bolt bolt-br" style={{ background: color }} />

        {/* Value */}
        <div className="porthole-value" style={{ color, textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}88` }}>
          {String(value).padStart(2, '0')}
        </div>

        {/* Label */}
        <div className="porthole-label" style={{ color: `${color}aa`, borderTopColor: `${color}44` }}>
          {label}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                              */
/* ═══════════════════════════════════════════════════════════════════════════ */
const HolOrbs = ({ total, active, archived }) => {
  return (
    <div className="space-hud">
      {/* ── 3D Canvas (background scene) ── */}
      <div className="space-hud-canvas">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ alpha: false, antialias: true }}
          dpr={Math.min(window.devicePixelRatio, 1.5)}
          style={{ background: '#04040e' }}
        >
          <SceneSetup />
          <ambientLight intensity={0.15} color="#1a1a3e" />
          <pointLight position={[5, 5, 5]} intensity={0.4} color="#4040ff" />
          <pointLight position={[-5, 3, 3]} intensity={0.3} color="#00f0ff" />
          <StarField />
          <RocketMesh />
        </Canvas>
      </div>

      {/* ── Porthole Stat Windows overlay ── */}
      <div className="space-hud-stats">
        <StatWindow value={total}    label="TOTAL"    color="#00c8ff" glowColor="#00f0ff" delay={800}  />
        <StatWindow value={active}   label="ACTIVE"   color="#00e87a" glowColor="#00ff88" delay={1100} />
        <StatWindow value={archived} label="ARCHIVED" color="#cc44ff" glowColor="#aa00ff" delay={1400} />
      </div>

      {/* ── Decorative HUD lines ── */}
      <div className="hud-corner hud-tl" />
      <div className="hud-corner hud-tr" />
      <div className="hud-corner hud-bl" />
      <div className="hud-corner hud-br" />
      <div className="hud-scan-bar" />
    </div>
  );
};

export default HolOrbs;
