import React from "react";
import { useCurrentFrame, useVideoConfig, staticFile, Audio } from "remotion";
import { colors, typography, layout } from "./styles/tokens";

export const TestComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <div style={{ width: "1080px", height: "1920px", background: colors.bg.primary, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white", fontFamily: typography.fonts.sans }}>
      <h1 style={{ fontSize: 64, fontWeight: "bold" }}>TEST RENDER</h1>
      <p style={{ fontSize: 32, marginTop: 24 }}>Frame: {frame} / {durationInFrames}</p>
      <p style={{ fontSize: 24, marginTop: 12 }}>Duration: {durationInFrames / fps}s</p>
      <Audio src={staticFile("voiceover.mp3")} />
    </div>
  );
};
