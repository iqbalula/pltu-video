import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Globe, Heart, Sparkles } from "lucide-react";
import { scenesData, videoMeta as sceneVideoMeta } from "../data/scenes";
import { colors, typography, layout, videoMeta } from "../styles/tokens";

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

interface CTASceneProps {
  scene: SceneData;
  isActive: boolean;
  progress: number;
  totalFrames: number;
  frame: number;
  fps: number;
}

export const CTAScene: React.FC<CTASceneProps> = ({ 
  scene, isActive, progress, totalFrames, frame, fps 
}) => {
  const ctaProgress = interpolate(progress, [0, 0.3, 1], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeIn = interpolate(ctaProgress, [0, 0.2, 1], [0, 1, 1]);
  const scaleUp = interpolate(ctaProgress, [0, 0.5, 1], [0.8, 1.05, 1]);

  // Heartbeat animation
  const heartbeat = Math.sin(frame * 0.3) * 0.15 + 1; // 0.85 to 1.15

  // Background glow pulse
  const glowPulse = Math.sin(frame * 0.1) * 0.1 + 0.3;

  // Overall scene opacity
  const sceneOpacity = isActive || progress > 0 ? 1 : 0;

  return (
    <div
      style={{
        textAlign: "center",
        padding: "32px",
        width: "100%",
        opacity: sceneOpacity,
        transform: `scale(${scaleUp})`,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          opacity: glowPulse * fadeIn,
        }}
      />

      {/* Earth icon */}
      <div
        style={{
          width: 140,
          height: 140,
          margin: "0 auto 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #38bdf8, #10b981)",
          boxShadow: "0 0 80px rgba(56, 189, 248, 0.6), inset 0 2px 4px rgba(255,255,255,0.2)",
          position: "relative",
          zIndex: 10,
          opacity: fadeIn,
          transform: `scale(${interpolate(ctaProgress, [0, 0.5, 1], [0, 1.05, 1])}) rotate(${interpolate(ctaProgress, [0, 0.5, 1], [-180, 0, 0])}deg)`,
        }}
      >
        <Globe style={{ width: 72, height: 72, color: "#0f172a" }} />
      </div>

      {/* CTA Title */}
      <h2
        style={{
          fontFamily: typography.fonts.sans,
          fontSize: typography.sizes["4xl"],
          fontWeight: typography.weights.extrabold,
          color: colors.text.primary,
          lineHeight: "1.2",
          maxWidth: 800,
          margin: "0 auto 16px",
          textShadow: "0 0 40px rgba(56, 189, 248, 0.3)",
          opacity: interpolate(ctaProgress, [0.6, 1], [0, 1]),
          transform: `translateY(${interpolate(ctaProgress, [0.6, 1], [30, 0])}px)`,
        }}
      >
        JAGA BUMI — SATU-SATUNYA RUMAH 🌍
      </h2>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: typography.fonts.sans,
          fontSize: typography.sizes.xl,
          fontWeight: typography.weights.medium,
          color: colors.text.accent,
          maxWidth: 700,
          margin: "0 auto 32px",
          opacity: interpolate(ctaProgress, [0.9, 1], [0, 1]),
          transform: `translateY(${interpolate(ctaProgress, [0.9, 1], [20, 0])}px)`,
        }}
      >
        Satu-satunya rumah kita
      </p>

      {/* Hashtags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
          maxWidth: 900,
          margin: "0 auto",
          opacity: interpolate(ctaProgress, [1.2, 1.6], [0, 1]),
        }}
      >
        {videoMeta.hashtags.slice(0, 6).map((tag: string, i: number) => (
          <span
            key={tag}
            style={{
              fontFamily: typography.fonts.sans,
              fontSize: typography.sizes.sm,
              fontWeight: typography.weights.medium,
              color: colors.text.secondary,
              background: "rgba(30, 41, 59, 0.6)",
              padding: "8px 16px",
              borderRadius: 9999,
              border: `1px solid ${colors.ui.cardBorder}`,
              opacity: interpolate(ctaProgress, [1.3 + i * 0.06, 1.5 + i * 0.06], [0, 1]),
              transform: `scale(${interpolate(ctaProgress, [1.3 + i * 0.06, 1.5 + i * 0.06], [0.5, 1])})`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Follow CTA with heartbeat */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          opacity: interpolate(ctaProgress, [1.8, 2], [0, 1]),
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ef4444, #ec4899)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)",
            transform: `scale(${heartbeat})`,
          }}
        >
          <Heart style={{ width: 24, height: 24, color: "white" }} />
        </div>
        <span style={{
          fontFamily: typography.fonts.sans,
          fontSize: typography.sizes.lg,
          fontWeight: typography.weights.semibold,
          color: colors.text.primary,
        }}>
          Follow untuk konten sains!
        </span>
      </div>

      {/* Sparkles */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 90,
          height: 90,
          opacity: 0.6,
          transform: `scale(${Math.sin(frame * 0.05) * 0.15 + 0.85})`,
        }}
      >
        <Sparkles style={{ width: "100%", height: "100%", color: "rgba(251, 191, 36, 0.4)" }} />
      </div>
    </div>
  );
};