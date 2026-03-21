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
  return (
    <>
      <rect x={x} y={y} width={w} height={h} fill={OUTLINE} />
      <rect x={x + 1} y={y + 1} width={w - 2} height={h - 2} fill={fill} />
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

  return (
    <motion.div>
      <motion.svg
        viewBox="0 0 64 72"
        className={className}
        style={{ imageRendering: "pixelated" }}
      >
        {/* 🌑 SHADOW */}
        <ellipse cx="32" cy="68" rx="12" ry="4" fill="rgba(0,0,0,0.25)" />

        {/* 🌿 PLANT */}
        <motion.g
          animate={{ rotate: variation * 2 - 1 }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ transformOrigin: "bottom center" }}
        >
          {/* 🌱 STAGE 1 — SEED (NO OUTLINE BASE) */}
          {stage >= 1 && (
            <>
              <rect x={26} y={62} width={12} height={4} fill="#5d4037" />
              <Pixel x={31} y={60} w={2} h={2} fill="#3e2723" />
            </>
          )}

          {/* 🌿 STAGE 2 */}
          {stage >= 2 && (
            <>
              <Pixel x={30} y={54} w={4} h={6} fill={c.dark} />
              <Pixel x={26} y={52} w={4} h={2} fill={c.leaf} />
              <Pixel x={34} y={52} w={4} h={2} fill={c.leaf} />
            </>
          )}

          {/* 🌱 STAGE 3 */}
          {stage >= 3 && (
            <>
              <Pixel x={30} y={46} w={4} h={10} fill={c.dark} />
              <Pixel x={24} y={48} w={6} h={3} fill={c.leaf} />
              <Pixel x={34} y={48} w={6} h={3} fill={c.leaf} />
              <Pixel x={28} y={42} w={8} h={3} fill={c.leaf} />
            </>
          )}

          {/* 🌸 STAGE 4 */}
          {stage >= 4 && (
            <>
              <Pixel x={30} y={36} w={4} h={10} fill={c.dark} />
              <Pixel x={24} y={40} w={6} h={3} fill={c.leaf} />
              <Pixel x={34} y={40} w={6} h={3} fill={c.leaf} />
              <Pixel x={29} y={32} w={6} h={4} fill={c.flower} />
            </>
          )}

          {/* 🍎 STAGE 5 */}
          {stage >= 5 && (
            <>
              <Pixel x={29} y={38} w={6} h={14} fill="#6b3e1f" />
              <Pixel x={22} y={34} w={20} h={10} fill={c.leaf} />

              <Pixel x={24} y={36} w={3} h={3} fill={c.flower} />
              <Pixel x={36} y={36} w={3} h={3} fill={c.flower} />
            </>
          )}

          {/* 🌳 STAGE 6 */}
          {stage >= 6 && (
            <>
              <Pixel x={28} y={34} w={8} h={18} fill="#5d4037" />
              <Pixel x={20} y={28} w={24} h={12} fill={c.leaf} />
              <Pixel x={24} y={24} w={16} h={8} fill={c.leaf} />

              <Pixel x={22} y={30} w={3} h={3} fill={c.flower} />
              <Pixel x={38} y={30} w={3} h={3} fill={c.flower} />
              <Pixel x={30} y={26} w={3} h={3} fill={c.flower} />
            </>
          )}
        </motion.g>

        {/* 💧 WATER */}
        {isWatered && (
          <motion.g
            animate={{ opacity: [0, 1, 0], y: [0, 10, 20] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <rect x={24} y={20} width={2} height={4} fill="#87ceeb" />
            <rect x={38} y={24} width={2} height={4} fill="#87ceeb" />
          </motion.g>
        )}
      </motion.svg>
    </motion.div>
  );
}

export function levelToPixelStage(level: string): GrowthStage {
  switch (level) {
    case "Seed": return 1;
    case "Sprout": return 2;
    case "Plant": return 3;
    case "Tree": return 4;
    case "Bloom": return 5;
    case "Ancient": return 6;
    default: return 1;
  }
}