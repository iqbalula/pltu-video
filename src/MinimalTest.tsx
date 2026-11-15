import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, layout } from "./styles/tokens";

export const MinimalTestComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <div
      style={{
        width: layout.width,
        height: layout.height,
        background: colors.bg.primary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 64, marginBottom: 20 }}>PLTU Video Test</h1>
      <p style={{ fontSize: 32 }}>Frame: {frame} / {durationInFrames}</p>
      <p style={{ fontSize: 24 }}>FPS: {fps}</p>
      <p style={{ fontSize: 24 }}>Duration: {Math.floor(durationInFrames / fps)}s</p>
    </div>
  );
};