// PLTU Video - Scene Data (Exact timestamps from approved voiceover)
// Total Duration: 100.61s = 3018 frames @ 30fps

import { colors, typography, layout } from "../styles/tokens";

export interface SceneData {
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

export const videoMeta = {
  width: 1080,
  height: 1920,
  fps: 30,
  totalFrames: 3018,
  durationSec: 100.61,
  audioFile: "voiceover.mp3",
};

export const scenesData = [
  {
    id: "hook",
    title: "DARI AIR & BATU BARA JADI LISTRIK ⚡",
    subtitle: "Bagaimana Sistem PLTU Bekerja?",
    description: "Pernahkah kamu berpikir, bagaimana batu bara dan air biasa bisa menyalakan seluruh kota? Mari kita bongkar proses lengkap PLTU!",
    startFrame: 0,
    endFrame: 246,
    startSec: 0.0,
    endSec: 8.2,
    color: colors.scene.hook,
    bgColor: "rgba(56, 189, 248, 0.15)",
    icon: "Zap",
    delay: 0.0,
  },
  {
    id: "demin",
    title: "1. WATER TREATMENT (DEMIN PLANT)",
    subtitle: "Air Bebas Mineral & Anti Korosi Pipa",
    description: "Sebelum masuk Boiler, air mentah diolah dulu di Demineralization Plant. Garam dan mineral dihilangkan total agar pipa Boiler bebas dari kerak dan korosi.",
    startFrame: 246,
    endFrame: 591,
    startSec: 8.2,
    endSec: 19.7,
    color: colors.scene.demin,
    bgColor: "rgba(6, 182, 212, 0.15)",
    icon: "Droplets",
    delay: 0.1,
  },
  {
    id: "boiler",
    title: "2. PULVERIZER & BOILER",
    subtitle: "Giling Halus & Pembakaran >1.000°C",
    description: "Sementara itu, batu bara dihancurkan di Pulverizer jadi serbuk halus selembut bedak, lalu ditiup ke Boiler dan dibakar pada suhu >1.000°C.",
    startFrame: 591,
    endFrame: 906,
    startSec: 19.7,
    endSec: 30.2,
    color: colors.scene.boiler,
    bgColor: "rgba(249, 115, 22, 0.15)",
    icon: "Flame",
    delay: 0.2,
  },
  {
    id: "ash_esp",
    title: "3. BOTTOM ASH & ESP FILTER",
    subtitle: "Filtrasi Abu 99,9% Medan Elektroda",
    description: "Abu berat jatuh ke bawah jadi Bottom Ash. Sedangkan abu terbang ditangkap ESP hingga 99,9% dengan medan listrik, sehingga asap keluar sangat bersih!",
    startFrame: 906,
    endFrame: 1509,
    startSec: 30.2,
    endSec: 50.3,
    color: colors.scene.esp,
    bgColor: "rgba(168, 85, 247, 0.15)",
    icon: "Filter",
    delay: 0.3,
  },
  {
    id: "steam",
    title: "4. STEAM GENERATION",
    subtitle: "Air Demin → Uap Super Panas High Pressure",
    description: "Panas membara Boiler memanaskan air murni Demin tadi di pipa-pipa Boiler, menguap menjadi uap air super panas bertekanan sangat tinggi.",
    startFrame: 1509,
    endFrame: 1671,
    startSec: 50.3,
    endSec: 55.7,
    color: colors.scene.steam,
    bgColor: "rgba(56, 189, 248, 0.15)",
    icon: "Gauge",
    delay: 0.4,
  },
  {
    id: "turbine_gen",
    title: "5. TURBIN & GENERATOR",
    subtitle: "Putaran 3.000 RPM → Generator Listrik",
    description: "Uap bertekanan tinggi menyemprot dan memutar sudu Turbin hingga 3.000 RPM! Poros Turbin memutar Generator untuk menghasilkan listrik.",
    startFrame: 1671,
    endFrame: 1959,
    startSec: 55.7,
    endSec: 65.3,
    color: colors.scene.turbine,
    bgColor: "rgba(16, 185, 129, 0.15)",
    icon: "RotateCcw",
    delay: 0.5,
  },
  {
    id: "trafo_sutet",
    title: "6. TRAFO STEP-UP & SUTET",
    subtitle: "Listrik Ratusan kV → SUTET → Rumah",
    description: "Listrik dari Generator dinaikkan tegangannya oleh Trafo Step-Up hingga ratusan kilovolt, lalu dialirkan melalui jaringan SUTET ke rumahmu.",
    startFrame: 1959,
    endFrame: 2244,
    startSec: 65.3,
    endSec: 74.8,
    color: colors.scene.trafo,
    bgColor: "rgba(251, 191, 36, 0.15)",
    icon: "Zap",
    delay: 0.6,
  },
  {
    id: "cta",
    title: "PAHAMI SISTEM CANGGIH PLTU 💡",
    subtitle: "Satu-satunya Sumber Energi Terinterkoneksi",
    description: "Itulah siklus canggih PLTU dari air murni, api, hingga listrik. Follow untuk penjelasan sains dan teknik menarik lainnya!",
    startFrame: 2244,
    endFrame: 3018,
    startSec: 74.8,
    endSec: 100.6,
    color: colors.scene.cta,
    bgColor: "rgba(239, 68, 68, 0.15)",
    icon: "Heart",
    delay: 0.7,
  },
];

// Helper functions
export function getCurrentScene(frame: number) {
  return scenesData.find(s => frame >= s.startFrame && frame < s.endFrame) || scenesData[0];
}

export function getSceneProgress(frame: number, sceneId: string) {
  const scene = scenesData.find(s => s.id === sceneId);
  if (!scene) return 0;
  return (frame - scene.startFrame) / (scene.endFrame - scene.startFrame);
}

export function isSceneActive(frame: number, sceneId: string) {
  const scene = scenesData.find(s => s.id === sceneId);
  if (!scene) return false;
  return frame >= scene.startFrame && frame < scene.endFrame;
}
