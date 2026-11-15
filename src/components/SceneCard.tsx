import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import {
  Zap, Droplets, Flame, RotateCcw, Filter, Gauge, Heart, Globe
} from "lucide-react";
import { SceneData } from "../data/scenes";
import { colors, typography, layout } from "../styles/tokens";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Zap, Droplets, Flame, RotateCcw, Filter, Gauge, Heart, Globe,
};

export const SceneCard: React.FC<{ scene: SceneData; isActive: boolean; progress: number }> = ({ scene, isActive, progress }) => {
  const frame = useCurrentFrame();
  
  // Remotion-per-frame interpolation for smooth 30fps animation
  const entranceProgress = interpolate(progress, [0, 0.3, 1], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const yOffset = interpolate(entranceProgress, [0, 0.3, 1], [40, -5, 0]);
  const opacity = interpolate(entranceProgress, [0, 0.2, 1], [0, 1, 1]);
  const scale = interpolate(entranceProgress, [0, 0.5, 0.7, 1], [0.8, 1.05, 0.98, 1]);

  // Icon animation
  const iconScale = interpolate(entranceProgress, [0, 0.3, 0.6, 1], [0, 1.2, 0.95, 1]);
  const iconRotate = interpolate(entranceProgress, [0, 0.4, 1], [90, -10, 0]);

  // Content animation
  const contentOpacity = interpolate(entranceProgress, [0, 0.3, 1], [0, 1, 1]);
  const contentX = interpolate(entranceProgress, [0, 0.4, 1], [-20, 5, 0]);

  // Active indicator
  const indicatorOpacity = isActive ? 1 : 0.2;
  const indicatorScale = isActive ? 1 : 0.7;

  if (!isActive && progress <= 0) return null;

  const IconComponent = iconMap[scene.icon] || Globe;

  return (
    <div
      style={{
        width: layout.card.width,
        height: layout.card.height,
        borderRadius: layout.card.radius,
        background: colors.ui.cardBg,
        backdropFilter: "blur(12px)",
        border: `2px solid ${colors.ui.cardBorder}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 24,
        padding: 24,
        boxSizing: "border-box",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        opacity,
        transform: `translateY(${yOffset}px) scale(${scale})`,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: scene.bgColor,
          border: `1px solid ${colors.ui.cardBorder}`,
          flexShrink: 0,
          transform: `scale(${iconScale}) rotate(${iconRotate}deg)`,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            color: scene.color,
            filter: `drop-shadow(0 0 10px ${scene.color})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-hidden="true"
        >
          <IconComponent className="icon" style={{ width: 44, height: 44 }} />
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minWidth: 0,
          overflow: "hidden",
          opacity: contentOpacity,
          transform: `translateX(${contentX}px)`,
        }}
      >
        <div style={{
          fontFamily: typography.fonts.sans,
          fontSize: typography.sizes.xl,
          fontWeight: typography.weights.bold,
          color: colors.text.primary,
          marginBottom: 4,
          lineHeight: "1.3",
        }}>
          {scene.title}
        </div>
        <div style={{
          fontFamily: typography.fonts.sans,
          fontSize: typography.sizes.base,
          fontWeight: typography.weights.medium,
          color: colors.text.accent,
          marginBottom: 8,
        }}>
          {scene.subtitle}
        </div>
        <div style={{
          fontFamily: typography.fonts.sans,
          fontSize: typography.sizes.sm,
          fontWeight: typography.weights.normal,
          color: colors.text.secondary,
          lineHeight: "1.5",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {scene.description}
        </div>
      </div>

      {/* Active indicator */}
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: scene.color,
          boxShadow: `0 0 15px ${scene.color}`,
          marginLeft: 16,
          opacity: indicatorOpacity,
          transform: `scale(${indicatorScale})`,
        }}
      />
    </div>
  );
};