import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { StaticBackground } from "./components/Background";
import { HookScene } from "./components/HookScene";
import { CTAScene } from "./components/CTAScene";
import { PLTUMasterMap_Episodic } from "./components/PLTUMasterMap_Episodic";
import { scenesData, videoMeta, getCurrentScene } from "./data/scenes";
import { colors, typography, layout } from "./styles/tokens";
import { Zap } from "lucide-react";

export const PLTUComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const totalFrames = durationInFrames;
  const totalDuration = totalFrames / fps;

  // Get current active scene
  const currentScene = getCurrentScene(frame);
  const sceneIndex = scenesData.findIndex(s => s.id === currentScene.id);

  // Progress within current scene (0 to 1)
  const sceneProgress = interpolate(frame, [currentScene.startFrame, currentScene.endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Card entrance animation for hook/cta scenes
  const cardEntranceProgress = interpolate(frame, [
    currentScene.startFrame - 15,
    currentScene.startFrame + 15,
  ], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const cardOpacity = cardEntranceProgress;
  const cardY = interpolate(cardEntranceProgress, [0, 0.3, 1], [60, -5, 0]);
  const cardScale = interpolate(cardEntranceProgress, [0, 0.5, 0.7, 1], [0.7, 1.05, 0.98, 1]);

  // Determine if we're in process scenes (demin through trafo_sutet)
  const isProcessScene = currentScene.id !== "hook" && currentScene.id !== "cta";

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
      {/* Static background */}
      <StaticBackground />

      {/* ===== HOOK SCENE (0-8.2s) ===== */}
      {currentScene.id === "hook" && (
        <div
          key="hook"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: cardOpacity,
            transform: `translateY(${cardY}px) scale(${cardScale})`,
            paddingHorizontal: 40,
          }}
        >
          <HookScene scene={currentScene} isActive={true} progress={sceneProgress} />
        </div>
      )}

      {/* ===== CTA SCENE (74.8-100.6s) ===== */}
      {currentScene.id === "cta" && (
        <div
          key="cta"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: cardOpacity,
            transform: `translateY(${cardY}px) scale(${cardScale})`,
            paddingHorizontal: 40,
          }}
        >
          <CTAScene
            scene={currentScene}
            isActive={true}
            progress={sceneProgress}
            totalFrames={totalFrames}
            frame={frame}
            fps={fps}
          />
        </div>
      )}

      {/* ===== MASTER MAP EPISODIC for PROCESS SCENES (8.2-74.8s) ===== */}
      {isProcessScene && (
        <PLTUMasterMap_Episodic frame={frame} />
      )}

      {/* ===== PROGRESS BAR (Top) ===== */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          opacity: frame > 30 ? 1 : 0,
        }}
      >
        <div style={{
          width: 960,
          height: 6,
          background: "rgba(30, 41, 59, 0.5)",
          borderRadius: 9999,
          overflow: "hidden",
          border: "1px solid #334155",
        }}>
          <div
            style={{
              height: "100%",
              width: `${(frame / totalFrames) * 100}%`,
              background: "linear-gradient(to right, #38bdf8, #fbbf24, #10b981, #ef4444, #ec4899)",
              borderRadius: 9999,
              boxShadow: "0 0 20px rgba(56,189,248,0.6)",
            }}
          />
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 4,
          fontSize: 11,
          color: "#64748b",
          width: 960,
          paddingHorizontal: 8,
          fontFamily: typography.fonts.mono,
        }}>
          <span>MULAI</span>
          <span>{Math.floor(frame / fps)}s / {Math.floor(totalDuration)}s</span>
          <span>SELESAI</span>
        </div>
      </div>

      {/* ===== SCENE COUNTER (Bottom Right) - updated for episodes ===== */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          right: 48,
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4,
          opacity: frame > 45 ? 0.7 : 0,
        }}
      >
        <div style={{
          fontFamily: typography.fonts.mono,
          fontSize: "48px",
          fontWeight: "700",
          color: colors.text.accent,
          textShadow: "0 0 20px rgba(251, 191, 36, 0.4)",
        }}>
          {Math.min(Math.max(sceneIndex, 0), 5)}
        </div>
        <div style={{
          fontFamily: typography.fonts.sans,
          fontSize: typography.sizes.sm,
          color: colors.text.muted,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}>
          DARI 6 EPISODE
        </div>
      </div>

      {/* ===== WATERMARK ===== */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          right: 48,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: 8,
          opacity: frame > 60 ? 0.4 : 0,
        }}
      >
        <Zap style={{ width: 20, height: 20, color: "rgba(56, 189, 248, 0.5)" }} />
        <span style={{
          fontFamily: typography.fonts.sans,
          fontSize: typography.sizes.xs,
          color: "#64748b",
        }}>PLTU EDUKASI • Remotion</span>
      </div>
    </div>
  );
};