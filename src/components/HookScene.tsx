import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Globe, Sparkles } from "lucide-react";
import { scenesData } from "../data/scenes";
import { colors, typography, layout } from "../styles/tokens";

interface SceneData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  startFrame: number;
  endFrame: number;
  startSec: number;
  endSec: number;
  color: string;
  bgColor: string;
  icon: string;
  delay: number;
}

interface HookSceneProps {
  scene: SceneData;
  isActive: boolean;
  progress: number;
}

export const HookScene: React.FC<HookSceneProps> = ({ scene, isActive, progress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Per-frame interpolation for continuous animations
  const earthRotation = (frame / fps) * 30; // 30 deg/sec continuous
  const glowPulse = Math.sin(frame * 0.1) * 0.2 + 0.6; // 0.4 to 0.8

  // Entrance animation using progress
  const entranceProgress = interpolate(progress, [0, 0.4, 1], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(entranceProgress, [0, 0.3, 1], [0, 1, 1]);
  const titleY = interpolate(entranceProgress, [0, 0.3, 1], [40, 0, 0]);
  const subtitleOpacity = interpolate(entranceProgress, [0.2, 0.6, 1], [0, 1, 1]);
  const subtitleY = interpolate(entranceProgress, [0.2, 0.6, 1], [30, 0, 0]);
  const descOpacity = interpolate(entranceProgress, [0.4, 0.8, 1], [0, 1, 1]);
  const descY = interpolate(entranceProgress, [0.4, 0.8, 1], [20, 0, 0]);

  // Sparkle animation
  const sparkle1Scale = Math.sin(frame * 0.05) * 0.15 + 0.85;
  const sparkle2Scale = Math.cos(frame * 0.04) * 0.15 + 0.85;

  // Overall opacity for the hook scene
  const sceneOpacity = isActive || progress > 0 ? 1 : 0;

  return (
    <div
      style={{
        textAlign: "center",
        padding: "24px",
        width: "100%",
        opacity: sceneOpacity,
        transform: `scale(${interpolate(entranceProgress, [0, 1], [0.8, 1])})`,
      }}
    >
      {/* Earth with glow */}
      <div
        style={{
          width: 160,
          height: 160,
          margin: "0 auto 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #38bdf8 0%, #10b981 100%)",
          boxShadow: "0 0 80px rgba(56, 189, 248, 0.6), inset 0 2px 4px rgba(255,255,255,0.2)",
          position: "relative",
        }}
      >
        {/* Rotating earth inside */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "conic-gradient(from 0deg, #0f172a, #1e3a5f, #0f172a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `rotate(${earthRotation}deg)`,
          }}
        >
          <Globe style={{ width: 72, height: 72, color: "#38bdf8" }} />
        </div>

        {/* Glow ring - animated per frame */}
        <div
          style={{
            position: "absolute",
            inset: -16,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56,189,248,0.4) 0%, transparent 70%)",
            filter: "blur(20px)",
            opacity: glowPulse,
            transform: `scale(${0.9 + glowPulse * 0.15})`,
          }}
        />
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: typography.fonts.sans,
          fontSize: typography.sizes["5xl"],
          fontWeight: typography.weights.extrabold,
          color: colors.text.primary,
          lineHeight: "1.1",
          textShadow: "0 0 40px rgba(56, 189, 248, 0.5)",
          letterSpacing: "-0.02em",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          marginBottom: 12,
        }}
      >
        {scene.title}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: typography.fonts.sans,
          fontSize: typography.sizes["2xl"],
          fontWeight: typography.weights.medium,
          color: colors.text.accent,
          textShadow: "0 0 30px rgba(251, 191, 36, 0.4)",
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          marginBottom: 16,
        }}
      >
        {scene.subtitle}
      </div>

      {/* Description */}
      <div
        style={{
          fontFamily: typography.fonts.sans,
          fontSize: typography.sizes.lg,
          color: colors.text.secondary,
          maxWidth: 600,
          margin: "0 auto",
          opacity: descOpacity,
          transform: `translateY(${descY}px)`,
        }}
      >
        {scene.description}
      </div>

      {/* Sparkles decoration */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 110,
          height: 110,
          transform: `scale(${sparkle1Scale})`,
          opacity: 0.8,
        }}
      >
        <Sparkles style={{ width: "100%", height: "100%", color: "rgba(251, 191, 36, 0.5)" }} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 90,
          height: 90,
          transform: `scale(${sparkle2Scale})`,
          opacity: 0.6,
        }}
      >
        <Sparkles style={{ width: "100%", height: "100%", color: "rgba(16, 185, 129, 0.4)" }} />
      </div>
    </div>
  );
};