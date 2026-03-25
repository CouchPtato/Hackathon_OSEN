"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export type GrowthStage = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface PixelPlantProps {
  stage: GrowthStage;
  hobbyName: string;
  isWatered?: boolean;
  className?: string;
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



// Export plant scale constants and sprite folder logic for reuse
export const PLANT_SCALES: Record<string, number[]> = {
  plant1: [0.54, 0.58, 1.20, 1.45, 1.58, 1.75],
  plant2: [0.56, 0.58, 0.98, 1.38, 1.38, 1.48],
  plant3: [0.64, 0.52, 1.04, 1.36, 1.54, 1.60],
  plant4: [0.54, 0.58, 1.14, 1.51, 1.86, 1.85],
  plant5: [0.81, 0.58, 0.92, 1.12, 1.28, 1.40],
};

export function getPlantSpriteFolder(name: string) {
  const n = name.toLowerCase();
  if (n.includes("fitness") || n.includes("gym")) return "plant2";
  if (n.includes("art") || n.includes("paint")) return "plant3";
  if (n.includes("music") || n.includes("guitar")) return "plant4";
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
  ) return "plant5";
  return "plant1";
}

export function PixelPlant({
  stage,
  hobbyName,
  isWatered,
  className,
}: PixelPlantProps) {
  const type = getPlantType(hobbyName);

  const prevStageRef = useRef(stage);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const seed = hobbyName.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const variation = (Math.sin(seed) + 1) / 2;

  useEffect(() => {
    audioRef.current = new Audio("/sounds/levelup.mp3");
    audioRef.current.volume = 0.4;
  }, []);

  useEffect(() => {
    if (stage > prevStageRef.current) {
      audioRef.current?.play().catch(() => {});
    }
    prevStageRef.current = stage;
  }, [stage]);


  // Per-plant, per-stage scaling for consistent visual size
  // Use the exported getPlantSpriteFolder and PLANT_SCALES from above
  const spriteFolder = getPlantSpriteFolder(hobbyName);
  const plantScales = PLANT_SCALES[spriteFolder] || PLANT_SCALES["plant1"];
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