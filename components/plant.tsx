"use client";

import { motion } from "framer-motion";
import { Sprout, Leaf, TreeDeciduous, Flower2 } from "lucide-react";
import { PlantLevel } from "@/lib/types";

interface PlantProps {
  level: PlantLevel;
  isGrowing?: boolean;
  size?: "sm" | "md" | "lg";
}

const plantConfig: Record<
  PlantLevel,
  { icon: typeof Sprout; color: string; scale: number }
> = {
  Seed: { icon: Sprout, color: "text-lime-500", scale: 0.6 },
  Sprout: { icon: Leaf, color: "text-green-500", scale: 0.8 },
  Plant: { icon: Flower2, color: "text-emerald-500", scale: 1 },
  Tree: { icon: TreeDeciduous, color: "text-green-600", scale: 1.2 },
};

const sizeConfig = {
  sm: { base: 32, pot: 24 },
  md: { base: 48, pot: 36 },
  lg: { base: 72, pot: 48 },
};

export function Plant({ level, isGrowing = false, size = "md" }: PlantProps) {
  const config = plantConfig[level];
  const Icon = config.icon;
  const sizes = sizeConfig[size];

  return (
    <motion.div
      className="flex flex-col items-center"
      animate={
        isGrowing
          ? {
              scale: [1, 1.15, 1],
              filter: [
                "drop-shadow(0 0 0px rgba(34, 197, 94, 0))",
                "drop-shadow(0 0 12px rgba(34, 197, 94, 0.6))",
                "drop-shadow(0 0 0px rgba(34, 197, 94, 0))",
              ],
            }
          : {}
      }
      transition={{ duration: 0.6 }}
    >
      {/* Plant */}
      <motion.div
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ scale: config.scale }}
      >
        <Icon
          className={`${config.color}`}
          style={{ width: sizes.base, height: sizes.base }}
        />
      </motion.div>

      {/* Pot */}
      <svg
        width={sizes.pot}
        height={sizes.pot * 0.7}
        viewBox="0 0 40 28"
        className="-mt-1"
      >
        <path
          d="M5 4 L35 4 L32 24 L8 24 Z"
          fill="hsl(var(--primary))"
          opacity={0.8}
        />
        <path
          d="M3 0 L37 0 L37 6 L3 6 Z"
          fill="hsl(var(--primary))"
          rx="2"
        />
        <ellipse
          cx="20"
          cy="6"
          rx="12"
          ry="3"
          fill="hsl(30, 50%, 30%)"
          opacity={0.6}
        />
      </svg>
    </motion.div>
  );
}
