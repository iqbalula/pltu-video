import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { colors, typography, layout } from "../../styles/tokens";
import { scenesData, getCurrentScene, videoMeta } from "../../data/scenes";

interface EpisodeMapProps {
  frame: number;
}

export const PLTUMasterMap_Episodic: React.FC<EpisodeMapProps> = ({ frame }) => {
  const CANVAS_W = 2400;
  const CANVAS_H = 3200;
  const VIEWPORT_W = 1080;
  const VIEWPORT_H = 1920;

  // Episode definitions - each station = 1 episode
  const episodes = [
    {
      id: "demin",
      title: "WATER TREATMENT",
      subtitle: "DEMINERALISASI AIR",
      color: colors.scene.demin,
      startFrame: scenesData.find(s => s.id === "demin")?.startFrame || 246,
      endFrame: scenesData.find(s => s.id === "demin")?.endFrame || 690,
      // Camera positions for this episode (zoom-in points)
      shots: [
        { x: 1200, y: 300, label: "TANGKI RAW WATER", zoom: 2.5, duration: 0.2 },
        { x: 1200, y: 550, label: "FILTER PASIR & CARBON", zoom: 2.5, duration: 0.25 },
        { x: 1200, y: 800, label: "ION EXCHANGE", zoom: 2.5, duration: 0.25 },
        { x: 1200, y: 550, label: "AIR BERSIH SIAP BOILER", zoom: 2.0, duration: 0.3 },
      ],
    },
    {
      id: "boiler",
      title: "PULVERIZER & BOILER",
      subtitle: "PEMBAKARAN BATU BARA",
      color: colors.scene.boiler,
      startFrame: scenesData.find(s => s.id === "boiler")?.startFrame || 690,
      endFrame: scenesData.find(s => s.id === "boiler")?.endFrame || 1310,
      shots: [
        { x: 1200, y: 1300, label: "PULVERIZER - RODA GILING", zoom: 2.5, duration: 0.2 },
        { x: 950, y: 1550, label: "BURNER BATU BARA", zoom: 2.5, duration: 0.25 },
        { x: 1200, y: 1550, label: "TUNGKU BOILER 1.450°C", zoom: 2.0, duration: 0.25 },
        { x: 1450, y: 1550, label: "SUPERHEATER UAP", zoom: 2.0, duration: 0.3 },
      ],
    },
    {
      id: "ash_esp",
      title: "ESP FILTER",
      subtitle: "PENGOLAHAN DEBU & GAS BAKAR",
      color: colors.scene.esp,
      startFrame: scenesData.find(s => s.id === "ash_esp")?.startFrame || 1310,
      endFrame: scenesData.find(s => s.id === "ash_esp")?.endFrame || 1850,
      shots: [
        { x: 1200, y: 2050, label: "ESP INLET - GAS BAKAR MASUK", zoom: 2.5, duration: 0.2 },
        { x: 900, y: 2200, label: "FIELD 1 - KORONA DISCHARGE", zoom: 2.5, duration: 0.25 },
        { x: 1200, y: 2200, label: "FIELD 2 - PARTIKEL TERIONKAN", zoom: 2.5, duration: 0.25 },
        { x: 1200, y: 2350, label: "HOPPER - ABU TERKUMPUL", zoom: 2.0, duration: 0.3 },
      ],
    },
    {
      id: "steam",
      title: "STEAM GENERATION",
      subtitle: "UAP BERTEKANAN TINGGI",
      color: colors.scene.steam,
      startFrame: scenesData.find(s => s.id === "steam")?.startFrame || 1850,
      endFrame: scenesData.find(s => s.id === "steam")?.endFrame || 2470,
      shots: [
        { x: 1200, y: 2550, label: "STEAM DRUM", zoom: 2.5, duration: 0.3 },
        { x: 1200, y: 2650, label: "PIPA UAP 170 BAR / 540°C", zoom: 2.0, duration: 0.35 },
        { x: 1200, y: 2650, label: "UAP SUPERHEATED KE TURBIN", zoom: 2.0, duration: 0.35 },
      ],
    },
    {
      id: "turbine_gen",
      title: "TURBINE & GENERATOR",
      subtitle: "KONVERSI ENERGI MEGAH",
      color: colors.scene.turbine,
      startFrame: scenesData.find(s => s.id === "turbine_gen")?.startFrame || 2470,
      endFrame: scenesData.find(s => s.id === "turbine_gen")?.endFrame || 3280,
      shots: [
        { x: 1200, y: 2850, label: "TURBIN HP/IP/LP - 3.000 RPM", zoom: 2.5, duration: 0.25 },
        { x: 1200, y: 2950, label: "ROTOR GENERATOR", zoom: 2.5, duration: 0.25 },
        { x: 1200, y: 2950, label: "MEDAN MAGNET - LISTRIK 20 kV", zoom: 2.0, duration: 0.25 },
        { x: 1200, y: 2950, label: "OUTPUT 600 MW KE TRAFO", zoom: 2.0, duration: 0.25 },
      ],
    },
    {
      id: "trafo_sutet",
      title: "STEP-UP TRANSFORMER",
      subtitle: "SUTET 275/500 kV",
      color: colors.scene.trafo,
      startFrame: scenesData.find(s => s.id === "trafo_sutet")?.startFrame || 3280,
      endFrame: scenesData.find(s => s.id === "trafo_sutet")?.endFrame || 4416,
      shots: [
        { x: 1200, y: 3150, label: "TRAFO STEP-UP 20→275 kV", zoom: 2.5, duration: 0.3 },
        { x: 1200, y: 3150, label: "KUMARAN PRIMER & SEKUNDER", zoom: 2.5, duration: 0.25 },
        { x: 1200, y: 3150, label: "MENERA SUTET - DISTRIBUSI NASIONAL", zoom: 1.8, duration: 0.45 },
      ],
    },
  ];

  // Current episode
  const currentEpisode = episodes.find(
    e => frame >= e.startFrame && frame < e.endFrame
  ) || episodes[episodes.length - 1];

  const episodeProgress = interpolate(frame, [currentEpisode.startFrame, currentEpisode.endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Determine current shot within episode
  const totalShots = currentEpisode.shots.length;
  const shotProgress = episodeProgress * totalShots;
  const shotIndex = Math.min(Math.floor(shotProgress), totalShots - 1);
  const shotLocalProgress = shotProgress - shotIndex;

  const currentShot = currentEpisode.shots[shotIndex];
  const nextShot = currentEpisode.shots[Math.min(shotIndex + 1, totalShots - 1)];

  // Smooth camera transition between shots
  const cameraX = interpolate(shotLocalProgress, [0, 1], [currentShot.x, nextShot.x]);
  const cameraY = interpolate(shotLocalProgress, [0, 1], [currentShot.y, nextShot.y]);
  const cameraZoom = spring({
    frame,
    fps: videoMeta.fps,
    config: { stiffness: 200, damping: 30 },
    from: currentShot.zoom,
    to: nextShot.zoom,
  });

  const translateX = VIEWPORT_W / 2 - cameraX * cameraZoom;
  const translateY = VIEWPORT_H / 2 - cameraY * cameraZoom;

  // Shot entrance animation (pop-in effect)
  const shotEntrance = interpolate(shotLocalProgress, [0, 0.15, 1], [0, 1.05, 1]);
  const labelOpacity = interpolate(shotLocalProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Machine activation based on shot
  const isActive = shotLocalProgress > 0.1 && shotLocalProgress < 0.9;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        background: "#0a0f1a",
      }}
    >
      <svg
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        style={{
          width: `${CANVAS_W}px`,
          height: `${CANVAS_H}px`,
          transform: `scale(${cameraZoom}) translate(${translateX / cameraZoom}px, ${translateY / cameraZoom}px)`,
          transformOrigin: "0 0",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.scene.demin} stopOpacity="0.3" />
            <stop offset="50%" stopColor={colors.accent.cyan} stopOpacity="0.7" />
            <stop offset="100%" stopColor={colors.scene.demin} stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="steamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={colors.scene.steam} stopOpacity="0.9" />
            <stop offset="50%" stopColor="#b8e0f0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#88c8e0" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={colors.accent.red} stopOpacity="0.9" />
            <stop offset="30%" stopColor={colors.accent.orange} stopOpacity="0.8" />
            <stop offset="60%" stopColor={colors.accent.amber} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colors.accent.amber} stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="fireCore" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#fff8e7" stopOpacity="1" />
            <stop offset="20%" stopColor={colors.accent.amber} stopOpacity="0.9" />
            <stop offset="50%" stopColor={colors.accent.orange} stopOpacity="0.7" />
            <stop offset="100%" stopColor={colors.accent.red} stopOpacity="0.3" />
          </radialGradient>
          <radialGradient id="magFieldGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.accent.green} stopOpacity="0.4" />
            <stop offset="100%" stopColor={colors.scene.turbine} stopOpacity="0" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
            <feComposite in="SourceGraphic" operator="over" />
          </filter>
          <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="steamBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <rect width={CANVAS_W} height={CANVAS_H} fill="#0a0f1a" />
        <g stroke="#152535" strokeWidth="0.5" opacity="0.1">
          {Array.from({ length: Math.ceil(CANVAS_W / 60) }, (_, i) => (
            <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2={CANVAS_H} />
          ))}
          {Array.from({ length: Math.ceil(CANVAS_H / 60) }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 60} x2={CANVAS_W} y2={i * 60} />
          ))}
        </g>

        {/* ===== PATH GUIDE (subtle) ===== */}
        <path
          d="M1200,300 L1200,800 L1200,1300 L1200,1800 L1200,2350 L1200,2750 L1200,3150"
          stroke="#2a3a4a"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="15,20"
          opacity={0.2}
        />

        {/* ===== STATION MARKERS (always visible, dimmed) ===== */}
        {episodes.map((ep, epIdx) => (
          <g key={ep.id} opacity={ep === currentEpisode ? 1 : 0.25}>
            {ep.shots.map((shot, si) => (
              <g key={si} transform={`translate(${shot.x}, ${shot.y})`}>
                <circle r={8} fill={ep.color} opacity={0.4} />
                <circle r={4} fill={ep.color} />
              </g>
            ))}
          </g>
        ))}

        {/* ===== EPISODE-SPECIFIC RENDERING ===== */}
        {currentEpisode.id === "demin" && (
          <g transform="translate(1050, 150)">
            {/* Tank */}
            <rect x={0} y={0} width={300} height={400} rx={12} fill="#1a2a3a" stroke={colors.scene.demin} strokeWidth={2} opacity={0.6} />
            <rect x={10} y={10} width={280} height={380} rx={10} fill="url(#waterGrad)" opacity={0.4} />
            
            {/* Flow particles - active during shot 0-1 */}
            {(shotIndex <= 1 && isActive) && Array.from({ length: 15 }, (_, i) => {
              const y = 50 + ((frame * 0.08 + i * 24) % 360);
              const x = 150 + Math.sin(frame * 0.05 + i) * 80;
              return (
                <circle key={i} cx={x} cy={y} r={4} fill={colors.accent.cyan} opacity={0.8} filter="url(#softBlur)" />
              );
            })}

            {/* Filter stages */}
            {[150, 450, 750].map((py, idx) => (
              <g key={idx} transform={`translate(150, ${py - 150})`} opacity={shotIndex >= idx && isActive ? 1 : 0.3}>
                <ellipse cx={0} cy={0} rx={60} ry={40} fill="#1a2a3a" stroke={colors.scene.demin} strokeWidth={2} />
                <ellipse cx={0} cy={0} rx={50} ry={35} fill="#2a3a4a" opacity={0.4} />
                <text x={0} y={50} textAnchor="middle" fill={colors.text.muted} fontFamily={typography.fonts.mono} fontSize={12}>
                  {idx === 0 ? "SAND FILTER" : idx === 1 ? "CARBON FILTER" : "ION EXCHANGE"}
                </text>
              </g>
            ))}

            {/* Pure water output */}
            {(shotIndex === 3 && isActive) && (
              <g transform="translate(150, 380)">
                <ellipse cx={0} cy={0} rx={30} ry={20} fill={colors.accent.cyan} opacity={0.6} filter="url(#glow)" />
                <text x={0} y={35} textAnchor="middle" fill={colors.accent.cyan} fontFamily={typography.fonts.mono} fontSize={11}>AIR MURNI</text>
              </g>
            )}
          </g>
        )}

        {currentEpisode.id === "boiler" && (
          <g transform="translate(100, 1150)">
            {/* Boiler structure */}
            <rect x={200} y={0} width={800} height={400} rx={8} fill="#0a151a" stroke={colors.scene.boiler} strokeWidth={2} opacity={0.5} />
            
            {/* Pulverizer (shot 0) */}
            <g transform={`translate(100, 200) rotate(${frame * 10})`} opacity={shotIndex === 0 && isActive ? 1 : 0.2}>
              <ellipse cx={0} cy={0} rx={80} ry={50} fill="#1a2a2a" stroke={colors.accent.blue} strokeWidth={3} />
              <ellipse cx={0} cy={0} rx={70} ry={45} fill="#152525" />
              {[0, 120, 240].map((angle, i) => (
                <g key={i} transform={`rotate(${angle})`}>
                  <ellipse cx={0} cy={-40} rx={20} ry={30} fill="#2a3a3a" stroke="#4a5a5a" strokeWidth={2} />
                </g>
              ))}
            </g>

            {/* PF Pipes */}
            <g stroke="#2a2a2a" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.5}>
              <path d="M180,200 Q300,200 400,120" />
              <path d="M180,200 Q300,200 400,200" />
              <path d="M180,200 Q300,200 400,280" />
            </g>

            {/* Coal particles in pipes (shot 0-1) */}
            {(shotIndex <= 1 && isActive) && Array.from({ length: 15 }, (_, i) => {
              const pipe = i % 3;
              const pos = ((frame * 0.08 + i * 0.07) % 1);
              const baseY = [120, 200, 280][pipe];
              const x = 180 + pos * 220;
              const y = 200 + (baseY - 200) * pos;
              return <circle key={i} cx={x} cy={y} r={2} fill="#3a3a3a" opacity={0.7} />;
            })}

            {/* 4 Corner Burners + Flames (shot 1-2) */}
            {(shotIndex >= 1 && shotIndex <= 2 && isActive) && [
              { x: 250, y: 80, angle: 45 },
              { x: 950, y: 80, angle: 135 },
              { x: 250, y: 320, angle: -45 },
              { x: 950, y: 320, angle: -135 },
            ].map((b, idx) => (
              <g key={idx} transform={`translate(${b.x}, ${b.y}) rotate(${b.angle})`} filter="url(#glow)">
                <rect x={-12} y={-6} width={24} height={12} rx={2} fill="#1a1a1a" stroke={colors.accent.orange} strokeWidth={2} />
                <ellipse cx={35} cy={0} rx={50 + Math.sin(frame * 0.4 + idx) * 15} ry={20} fill="url(#fireGrad)" opacity={0.8} />
                <ellipse cx={40} cy={0} rx={25 + Math.sin(frame * 0.4 + idx) * 8} ry={12} fill="url(#fireCore)" opacity={0.9} />
              </g>
            ))}

            {/* Central Fireball (shot 2) */}
            {(shotIndex === 2 && isActive) && (
              <g transform="translate(600, 200)" filter="url(#glow)">
                <ellipse cx={0} cy={0} rx={100 + Math.sin(frame * 0.3) * 20} ry={60} fill="url(#fireCore)" opacity={0.3} />
                <ellipse cx={0} cy={0} rx={150 + Math.sin(frame * 0.3) * 30} ry={90} fill={colors.scene.boiler} opacity={0.15} />
              </g>
            )}

            {/* Superheater outlet (shot 3) */}
            {(shotIndex === 3) && (
              <g transform="translate(900, 180)" opacity={isActive ? 1 : 0.3}>
                <rect x={0} y={0} width={100} height={40} rx={20} fill="#1a2a2a" stroke={colors.scene.steam} strokeWidth={2} />
                <rect x={5} y={5} width={90} height={30} rx={18} fill="url(#steamGrad)" opacity={0.7} />
                <text x={50} y={-15} textAnchor="middle" fill={colors.scene.steam} fontFamily={typography.fonts.mono} fontSize={11}>UAP 540°C</text>
              </g>
            )}
          </g>
        )}

        {currentEpisode.id === "ash_esp" && (
          <g transform="translate(600, 1850)">
            {/* ESP Housing */}
            <rect x={0} y={0} width={600} height={500} rx={8} fill="#0a151a" stroke={colors.scene.esp} strokeWidth={2} opacity={0.5} />
            
            {/* Collection plates */}
            <g stroke="#2a4a4a" strokeWidth={1.5} fill="none" opacity={0.3}>
              {Array.from({ length: 7 }, (_, i) => (
                <line key={i} x1={i * 100} y1={0} x2={i * 100} y2={500} />
              ))}
            </g>

            {/* Corona wires - active shot 1-2 */}
            {(shotIndex >= 1 && shotIndex <= 2 && isActive) && Array.from({ length: 5 }, (_, i) => {
              const wy = 100 + i * 80;
              const intensity = 0.5 + Math.sin(frame * 0.2 + i) * 0.4;
              return (
                <g key={i} transform={`translate(50, ${wy})`} filter="url(#softBlur)">
                  <line x1={-40} y1={0} x2={40} y2={0} stroke="#fff" strokeWidth={2} opacity={intensity} />
                  <ellipse cx={0} cy={0} rx={30 * intensity} ry={8 * intensity} fill={colors.scene.esp} opacity={intensity * 0.4} />
                </g>
              );
            })}

            {/* Particle migration (shot 1-2) */}
            {(shotIndex >= 1 && shotIndex <= 2 && isActive) && Array.from({ length: 25 }, (_, i) => {
              const field = Math.floor(i / 5);
              const progress = ((frame * 0.04 + i * 0.08) % 1);
              const isCharged = progress > 0.3;
              const fx = field * 100 + 50 - 40 + progress * 80;
              const fy = 50 + (i % 5) * 90;
              return (
                <circle
                  key={i}
                  cx={isCharged ? field * 100 + 100 : fx}
                  cy={fy + Math.sin(frame * 0.1 + i) * 3}
                  r={isCharged ? 3 : 2}
                  fill={isCharged ? colors.accent.cyan : colors.accent.amber}
                  opacity={isCharged ? 0.9 : 0.5}
                  filter={isCharged ? "url(#softBlur)" : "none"}
                />
              );
            })}

            {/* Hopper ash (shot 3) */}
            {(shotIndex === 3) && (
              <g transform="translate(250, 500)" opacity={isActive ? 1 : 0.3}>
                <path d="M0,0 L300,0 L280,80 L20,80 Z" fill="#1a1a1a" stroke={colors.accent.amber} strokeWidth={2} />
                <path d="M20,80 L280,80 L260,120 L40,120 Z" fill="#1a1a1a" stroke={colors.accent.amber} strokeWidth={2} />
                <path d="M30,120 L270,120 L250,150 L50,150 Z" fill="#3a3a3a" opacity={0.7} />
                <text x={150} y={180} textAnchor="middle" fill={colors.accent.amber} fontFamily={typography.fonts.mono} fontSize={11}>FLY ASH</text>
              </g>
            )}
          </g>
        )}

        {currentEpisode.id === "steam" && (
          <g transform="translate(1000, 2300)">
            {/* Steam drum */}
            <ellipse cx={0} cy={0} rx={120} ry={25} fill="#1a2a2a" stroke={colors.scene.steam} strokeWidth={2} />
            <ellipse cx={0} cy={0} rx={115} ry={20} fill="url(#steamGrad)" opacity={0.6} />
            
            {/* Steam pipe */}
            <rect x={-60} y={-300} width={120} height={300} rx={10} fill="#1a2a2a" stroke={colors.scene.steam} strokeWidth={2} />
            <rect x={-55} y={-295} width={110} height={290} rx={8} fill="url(#steamGrad)" opacity={0.5} />

            {/* Pressure pulses (shot 1) */}
            {(shotIndex === 1 && isActive) && Array.from({ length: 4 }, (_, i) => (
              <ellipse
                key={i}
                cx={0}
                cy={-150 + (frame * 0.08 + i * 0.25) % 1 * 200}
                rx={40 + (1 - (frame * 0.08 + i * 0.25) % 1) * 80}
                ry={15 + (1 - (frame * 0.08 + i * 0.25) % 1) * 25}
                fill="none"
                stroke={colors.scene.steam}
                strokeWidth={2}
                opacity={(1 - (frame * 0.08 + i * 0.25) % 1) * 0.7}
              />
            ))}

            {/* Steam particles (shot 1-2) */}
            {(shotIndex >= 1 && isActive) && Array.from({ length: 20 }, (_, i) => {
              const fy = -280 - ((frame * 2 + i * 18) % 280);
              return (
                <circle
                  key={i}
                  cx={Math.sin(frame * 0.05 + i) * 40}
                  cy={fy}
                  r={2 + (i % 3)}
                  fill="url(#steamGrad)"
                  opacity={0.7 * (1 - (fy + 280) / 280)}
                  filter="url(#steamBlur)"
                />
              );
            })}

            {/* Output label (shot 2) */}
            {(shotIndex === 2 && isActive) && (
              <text x={0} y={-330} textAnchor="middle" fill={colors.scene.steam} fontFamily={typography.fonts.mono} fontSize={14} fontWeight="bold">KE TURBIN</text>
            )}
          </g>
        )}

        {currentEpisode.id === "turbine_gen" && (
          <g transform="translate(1200, 2700)">
            {/* Turbine housing */}
            <ellipse cx={0} cy={0} rx={180} ry={120} fill="#0a151a" stroke={colors.scene.turbine} strokeWidth={3} />
            <ellipse cx={0} cy={0} rx={170} ry={115} fill="#0a0f1a" />
            
            {/* Turbine rotor */}
            <g transform={`rotate(${frame * 20})`} opacity={shotIndex <= 1 && isActive ? 1 : 0.3}>
              <ellipse cx={0} cy={0} rx={35} ry={20} fill="#ffd700" stroke="#b8860b" strokeWidth={2} />
              {Array.from({ length: 36 }, (_, i) => {
                const angle = (i / 36) * Math.PI * 2;
                const bx = Math.cos(angle) * 150;
                const by = Math.sin(angle) * 100;
                return (
                  <g key={i} transform={`translate(${bx}, ${by}) rotate(${angle * 180 / Math.PI + 25})`}>
                    <path d="M0,0 Q20,-10 40,0 Q20,10 0,0" fill={colors.scene.turbine} opacity={0.9} />
                  </g>
                );
              })}
              <ellipse cx={0} cy={0} rx={110} ry={75} fill="none" stroke="#3a4a4a" strokeWidth={2} />
            </g>

            {/* Generator rotor */}
            <g transform={`translate(0, 180) rotate(${frame * 30})`} opacity={shotIndex >= 1 && shotIndex <= 2 && isActive ? 1 : 0.3}>
              <ellipse cx={0} cy={0} rx={120} ry={70} fill="#2a2a2a" stroke={colors.accent.green} strokeWidth={2} />
              <g filter="url(#glow)">
                {Array.from({ length: 6 }, (_, i) => (
                  <ellipse key={i} cx={0} cy={0} rx={100 + i * 15} ry={50 + i * 8} fill="url(#magFieldGrad)" opacity={0.3} />
                ))}
              </g>
              {Array.from({ length: 20 }, (_, i) => {
                const angle = (i / 20) * Math.PI * 2;
                const wx = Math.cos(angle) * 100;
                const wy = Math.sin(angle) * 55;
                return (
                  <g key={i} transform={`translate(${wx}, ${wy}) rotate(${angle * 180 / Math.PI})`}>
                    <rect x={-8} y={-4} width={16} height={8} rx={1} fill="#ffd700" stroke="#b8860b" strokeWidth={1} />
                  </g>
                );
              })}
            </g>

            {/* 3-phase output (shot 3) */}
            {(shotIndex === 3 && isActive) && (
              <g transform="translate(0, 250)">
                <rect x={-150} y={0} width={300} height={80} rx={4} fill="#1a2a2a" stroke="#3a4a4a" strokeWidth={2} />
                {Array.from({ length: 3 }, (_, i) => {
                  const offset = (frame * 5 + i * 5) % 160;
                  return (
                    <polygon
                      key={i}
                      points={`${-20},${offset - 5} 0,${offset - 12} 20,${offset - 5}`}
                      fill={colors.accent.green}
                      opacity={0.7}
                    />
                  );
                })}
              </g>
            )}
          </g>
        )}

        {currentEpisode.id === "trafo_sutet" && (
          <g transform="translate(1200, 3050)">
            {/* Transformer */}
            <rect x={-80} y={-80} width={160} height={160} rx={8} fill="#1a2a2a" stroke={colors.scene.trafo} strokeWidth={3} />
            <rect x={-70} y={-70} width={140} height={140} rx={6} fill="#2a2a2a" />
            
            {/* Windings */}
            {(shotIndex <= 1 && isActive) && (
              <g>
                {Array.from({ length: 12 }, (_, i) => {
                  const angle = (i / 12) * Math.PI * 2;
                  const r = 55;
                  return (
                    <g key={i} transform={`translate(${Math.cos(angle) * r}, ${Math.sin(angle) * r}) rotate(${angle * 180 / Math.PI})`}>
                      <rect x={-10} y={-6} width={20} height={12} rx={1} fill="#ffd700" opacity={0.8} />
                    </g>
                  );
                })}
                {Array.from({ length: 24 }, (_, i) => {
                  const angle = (i / 24) * Math.PI * 2;
                  const r = 65;
                  return (
                    <g key={i} transform={`translate(${Math.cos(angle) * r}, ${Math.sin(angle) * r}) rotate(${angle * 180 / Math.PI})`}>
                      <rect x={-6} y={-4} width={12} height={8} rx={1} fill={colors.scene.trafo} opacity={0.9} />
                    </g>
                  );
                })}
              </g>
            )}

            {/* Magnetic pulse (shot 1) */}
            {(shotIndex === 1 && isActive) && (
              <g filter="url(#glow)">
                <ellipse cx={0} cy={0} rx={80 + Math.sin(frame * 0.3) * 30} ry={80 + Math.sin(frame * 0.3) * 30} fill="#ffd700" opacity={0.1} />
                <ellipse cx={0} cy={0} rx={110 + Math.sin(frame * 0.3) * 40} ry={110 + Math.sin(frame * 0.3) * 40} fill={colors.scene.trafo} opacity={0.05} />
              </g>
            )}

            {/* Electrical arcs (shot 2) */}
            {(shotIndex === 2 && isActive) && (
              <g filter="url(#softBlur)">
                {Array.from({ length: 8 }, (_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const length = 60 + Math.sin(frame * 0.4 + i) * 40;
                  const sx = Math.cos(angle) * 80;
                  const sy = Math.sin(angle) * 80;
                  const ex = Math.cos(angle) * (80 + length);
                  const ey = Math.sin(angle) * (80 + length);
                  return (
                    <g key={i}>
                      <path
                        d={`M${sx},${sy} Q${sx + (Math.random()-0.5)*20},${sy + (Math.random()-0.5)*20} ${ex},${ey}`}
                        stroke={colors.scene.trafo}
                        strokeWidth={3}
                        fill="none"
                        strokeLinecap="round"
                        opacity={0.8}
                      />
                      <circle cx={ex} cy={ey} r={5} fill={colors.accent.amber} opacity={0.9} filter="url(#softBlur)" />
                    </g>
                  );
                })}
              </g>
            )}

            {/* SUTET Towers (shot 2-3) */}
            {(shotIndex >= 2) && (
              <g transform="translate(0, 120)" opacity={isActive ? 1 : 0.3}>
                {[-1, 1].map((side) => (
                  <g key={side} transform={`translate(${side * 200}, 0)`}>
                    <path d="M0,0 L-40,120 L40,120 L0,0" fill="none" stroke={colors.scene.trafo} strokeWidth={4} strokeLinejoin="round" />
                    <path d="M-30,40 L30,40 M-25,80 L25,80" stroke={colors.scene.trafo} strokeWidth={3} />
                    <g stroke={colors.scene.trafo} strokeWidth={3} fill="none" strokeLinecap="round">
                      {[-1, 0, 1].map((wire) => (
                        <path key={wire} d={`M${wire * 15},0 Q${wire * 15 + side * 100},60 ${side * 200 + wire * 15},120`} opacity={0.8} />
                      ))}
                    </g>
                    {[-1, 0, 1].map((wire) => (
                      <circle key={wire} cx={wire * 15} cy={0} r={4 + Math.sin(frame * 0.5 + wire) * 2} fill={colors.accent.amber} opacity={0.8} filter="url(#softBlur)" />
                    ))}
                  </g>
                ))}
              </g>
            )}
          </g>
        )}

        {/* ===== INLINE LABEL (MRT Style) ===== */}
        <g transform={`translate(${currentShot.x}, ${currentShot.y - 100}) scale(${shotEntrance})`} opacity={labelOpacity}>
          <rect x={-140} y={-30} width={280} height={50} rx={8} fill="rgba(10, 15, 26, 0.95)" stroke={currentEpisode.color} strokeWidth={2} />
          <text x={0} y={0} textAnchor="middle" fill={currentEpisode.color} fontFamily={typography.fonts.sans} fontSize={18} fontWeight="bold">
            {currentShot.label}
          </text>
        </g>
      </svg>

      {/* ===== TOP PROGRESS BAR ===== */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          width: 960,
        }}
      >
        <div style={{
          height: 4,
          background: "rgba(30, 41, 59, 0.5)",
          borderRadius: 9999,
          overflow: "hidden",
          border: "1px solid #334155",
        }}>
          <div
            style={{
              height: "100%",
              width: `${(frame / videoMeta.totalFrames) * 100}%`,
              background: `linear-gradient(to right, ${colors.scene.demin}, ${colors.scene.boiler}, ${colors.scene.esp}, ${colors.scene.steam}, ${colors.scene.turbine}, ${colors.scene.trafo})`,
              borderRadius: 9999,
            }}
          />
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 4,
          fontSize: 10,
          color: "#64748b",
          fontFamily: typography.fonts.mono,
        }}>
          {episodes.map((ep, i) => (
            <span key={ep.id} style={{ opacity: ep === currentEpisode ? 1 : 0.4, fontWeight: ep === currentEpisode ? 700 : 400 }}>
              {ep.title.split(" ")[0]}
            </span>
          ))}
        </div>
      </div>

      {/* ===== BOTTOM EPISODE TITLE (MRT Style) ===== */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          textAlign: "center",
          paddingHorizontal: 40,
        }}
      >
        <div style={{
          background: "rgba(10, 15, 26, 0.95)",
          border: `2px solid ${currentEpisode.color}`,
          borderRadius: "12px",
          padding: "12px 24px",
          backdropFilter: "blur(10px)",
        }}>
          <div style={{
            fontFamily: typography.fonts.sans,
            fontSize: "20px",
            fontWeight: "bold",
            color: currentEpisode.color,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 4,
          }}>
            {currentEpisode.title}
          </div>
          <div style={{
            fontFamily: typography.fonts.sans,
            fontSize: "14px",
            color: colors.text.secondary,
            textTransform: "uppercase",
            letterSpacing: "0.3px",
          }}>
            {currentEpisode.subtitle}
          </div>
        </div>
      </div>

      {/* ===== EPISODE COUNTER ===== */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 2,
        }}
      >
        <div style={{
          fontFamily: typography.fonts.mono,
          fontSize: "36px",
          fontWeight: "700",
          color: currentEpisode.color,
        }}>
          EP. {episodes.indexOf(currentEpisode) + 1}
        </div>
        <div style={{
          fontFamily: typography.fonts.mono,
          fontSize: "11px",
          color: colors.text.muted,
        }}>
          DARI {episodes.length}
        </div>
      </div>
    </div>
  );
};