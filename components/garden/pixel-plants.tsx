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
  if (n.includes("code") || n.includes("dev")) return "coding";
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


  // Refined scaling for all plant types and stages (visually balanced)
  let scale = 1;
  if (stage === 1) scale = 0.58;
  else if (stage === 2) scale = 0.74;
  else if (stage === 3) scale = 1.08;
  else if (stage === 4) scale = 1.32;
  else if (stage === 5) scale = 1.48;
  else if (stage === 6) scale = 1.62;

  // Per-sprite normalization factors
  const spriteFolder = getPlantSpriteFolder(type);
  let spriteScale = 1;
  if (spriteFolder === "plant1") spriteScale = 0.92;
  else if (spriteFolder === "plant2") spriteScale = 0.84;
  else if (spriteFolder === "plant3") spriteScale = 0.86;
  else if (spriteFolder === "plant4") spriteScale = 1.18;
  scale *= spriteScale;

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