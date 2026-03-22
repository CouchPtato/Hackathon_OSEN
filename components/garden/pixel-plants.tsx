"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type GrowthStage = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface PixelPlantProps {
  stage: GrowthStage;
  hobbyName: string;
  isWatered?: boolean;
  className?: string;
}

const OUTLINE = "#1b1b1b";

// 🎨 COLORS (flower = fruit color)
function getColors(type: string) {
  const palettes: any = {
    default: { leaf: "#4caf50", dark: "#2e7d32", flower: "#ffd54f" },
    fitness: { leaf: "#4caf50", dark: "#2e7d32", flower: "#ff5252" },
    art: { leaf: "#66bb6a", dark: "#388e3c", flower: "#ff6ec7" },
    music: { leaf: "#81c784", dark: "#388e3c", flower: "#fff176" },
    coding: { leaf: "#64b5f6", dark: "#1976d2", flower: "#00e5ff" },
  };

  return palettes[type] || palettes.default;
}

function getPlantType(name: string) {
  const n = name.toLowerCase();
  if (n.includes("fitness") || n.includes("gym")) return "fitness";
  if (n.includes("art") || n.includes("paint")) return "art";
  if (n.includes("music") || n.includes("guitar")) return "music";
  if (
    n.includes("code") ||
    n.includes("dev") ||
    n.includes("tech") ||
    n.includes("program") ||
    n.includes("software") ||
    n.includes("robot") ||
    n.includes("ai") ||
    n.includes("app") ||
    n.includes("web") ||
    n.includes("data")
  )
    return "coding";
  return "default";
}

function getPlantSpriteFolder(type: string) {
  const folders: Record<string, string> = {
    default: "plant1",
    fitness: "plant2",
    art: "plant3",
    music: "plant4",
    coding: "plant5",
  };
  return folders[type] || folders.default;
}

// 🧱 PIXEL WITH OUTLINE
function Pixel({
  x,
  y,
  w,
  h,
  fill,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
}) {
  // Thinner outline: 0.5px inset instead of 1px
  return (
    <>
      <rect x={x} y={y} width={w} height={h} fill={OUTLINE} />
      <rect x={x + 0.5} y={y + 0.5} width={w - 1} height={h - 1} fill={fill} />
    </>
  );
}

export function PixelPlant({
  stage,
  hobbyName,
  isWatered,
  className,
}: PixelPlantProps) {
  const type = getPlantType(hobbyName);
  const c = getColors(type);

  const [prevStage, setPrevStage] = useState(stage);
  const [leveledUp, setLeveledUp] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const seed = hobbyName.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const variation = (Math.sin(seed) + 1) / 2;

  useEffect(() => {
    audioRef.current = new Audio("/sounds/levelup.mp3");
    audioRef.current.volume = 0.4;
  }, []);

  useEffect(() => {
    if (stage > prevStage) {
      setLeveledUp(true);
      audioRef.current?.play().catch(() => {});
      setTimeout(() => setLeveledUp(false), 1200);
    }
    setPrevStage(stage);
  }, [stage]);


  // Per-plant, per-stage scaling for consistent visual size
  const spriteFolder = getPlantSpriteFolder(type);
  // These values should be tuned for your actual sprite dimensions
  const PLANT_SCALES: Record<string, number[]> = {
    plant1: [0.54, 0.58, 1.20, 1.45, 1.58, 1.75],
    plant2: [0.56, 0.58, 0.98, 1.38, 1.38, 1.48],
    plant3: [0.52, 0.52, 1.04, 1.36, 1.54, 1.60],
    plant4: [0.54, 0.58, 1.14, 1.51, 1.86, 1.85],
    plant5: [0.51, 0.58, 0.92, 1.12, 1.28, 1.40],
  };
  // fallback to plant1 if not found
  const plantScales = PLANT_SCALES[spriteFolder] || PLANT_SCALES["plant1"];
  // stage is 1-based, array is 0-based
  const scale = plantScales[Math.min(Math.max(stage - 1, 0), 5)];

  return (
    <motion.div className={`relative flex items-end justify-center ${className}`} style={{ width: 'auto', height: 'auto' }}>
      {/* 🌑 SHADOW */}
      <div
        className="absolute rounded-full blur-sm left-1/2 -translate-x-1/2 z-0"
        style={{
          width: `${32 * scale}px`,
          height: `${8 * scale}px`,
          background: 'rgba(0,0,0,0.25)',
          bottom: `${2 * scale}px`,
        }}
      />

      {/* 🌿 PLANT */}
      <motion.img
        src={`/sprites/${getPlantSpriteFolder(type)}/stage${stage}.png`}
        style={{ 
          imageRendering: "pixelated",
          width: 'auto',
          height: 'auto',
          maxWidth: `${64 * scale}px`,
          maxHeight: `${80 * scale}px`,
          aspectRatio: 'auto',
        }}
        animate={{ rotate: variation * 2 - 1 }}
        transition={{ duration: 4, repeat: Infinity }}
        alt="plant"
      />

      {/* 💧 WATER */}
      {isWatered && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="text-blue-300 text-2xl">💧</div>
        </motion.div>
      )}
    </motion.div>
  );
}

export function levelToPixelStage(level: string): GrowthStage {
  switch (level) {
    case "Seed": return 1;
    case "Sprout": return 2;
    case "Small Plant": return 3;
    case "Medium Plant": return 4;
    case "Fruit Stage": return 5;
    case "Ripe Fruit": return 6;
    default: return 1;
  }
}