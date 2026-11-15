import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { colors, layout } from "../styles/tokens";

// Pre-computed particle data - calculated once, not per frame
function generateParticles(count: number) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const seed = i * 137.508; // Golden angle
    const x = (seed * 1000) % layout.width;
    const y = (seed * 730) % layout.height;
    const s = 0.02 + (seed % 8) * 0.015;
    const size = 1 + (seed % 3);
    const opacity = 0.08 + (seed % 5) * 0.08;
    const driftX = Math.sin(seed) * 0.5;
    const driftY = Math.cos(seed) * 0.3;
    
    particles.push({ seed, x, y, s, size, opacity, driftX, driftY });
  }
  return particles;
}

// Static particle positions - computed once at module load
const PARTICLE_CACHE_30 = generateParticles(30);
const PARTICLE_CACHE_20 = generateParticles(20);

export const StaticBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();

  // Slow ambient background animation
  const bgShift = interpolate(frame, [0, 300], [0, Math.PI * 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: layout.width,
        height: layout.height,
        position: "relative",
        background: colors.bg.primary,
        overflow: "hidden",
      }}
    >
      {/* Deep space gradient base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${colors.bg.secondary} 0%, ${colors.bg.tertiary} 100%)`,
        }}
      />
    
      {/* Animated aurora-like glows - SVG-based for realism */}
      <svg 
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="glow1" cx="30%" cy="30%" r="60%" fx="30%" fy="30%">
            <stop offset="0%" stopColor={colors.accent.blue} stopOpacity="0.15" />
            <stop offset="100%" stopColor={colors.accent.blue} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow2" cx="70%" cy="70%" r="50%" fx="70%" fy="70%">
            <stop offset="0%" stopColor={colors.accent.green} stopOpacity="0.12" />
            <stop offset="100%" stopColor={colors.accent.green} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow3" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={colors.accent.amber} stopOpacity="0.08" />
            <stop offset="100%" stopColor={colors.accent.amber} stopOpacity="0" />
          </radialGradient>
        </defs>
      
        <rect 
          x="0" y="0" width={layout.width} height={layout.height} 
          fill="url(#glow1)" 
          style={{ transform: `rotate(${bgShift * 15}deg)`, transformOrigin: "center" }} 
        />
        <rect 
          x="0" y="0" width={layout.width} height={layout.height} 
          fill="url(#glow2)" 
          style={{ transform: `rotate(${-bgShift * 12}deg)`, transformOrigin: "center" }} 
        />
        <rect 
          x="0" y="0" width={layout.width} height={layout.height} 
          fill="url(#glow3)" 
        />
      </svg>
    
      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
          opacity: 0.4,
        }}
      />
    
      {/* Top vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "35%",
          background: "linear-gradient(to bottom, rgba(15,23,42,0.7), transparent)",
          pointerEvents: "none",
        }}
      />
    
      {/* Bottom vignette */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30%",
          background: "linear-gradient(to top, rgba(15,23,42,0.9), transparent)",
          pointerEvents: "none",
        }}
      />
    
      {children}
    </div>
  );
};

// Optimized ParticleField - uses pre-computed data, no array creation per frame
export const ParticleField: React.FC<{ count?: 30 | 20; color?: string; speed?: number }> = ({ 
  count = 30, 
  color = "rgba(56, 189, 248, 0.3)",
  speed = 1
}) => {
  const frame = useCurrentFrame();
  const particles = count === 30 ? PARTICLE_CACHE_30 : PARTICLE_CACHE_20;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {particles.map((p, i) => {
        const currentX = (p.x + frame * p.s * 0.5 * speed + p.driftX * Math.sin(frame * 0.01)) % layout.width;
        const currentY = (p.y + frame * p.s * 0.3 * speed + p.driftY * Math.cos(frame * 0.01)) % layout.height;
      
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: currentX,
              top: currentY,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: color,
              opacity: p.opacity,
              filter: "blur(0.5px)",
            }}
          />
        );
      })}
    </div>
  );
};