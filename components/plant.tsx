"use client";

import { motion } from "framer-motion";
import { PlantLevel, Hobby } from "@/lib/types";

interface PlantProps {
  hobby: Hobby;
  onClick: () => void;
  isGrowing?: boolean;
}

// Plant SVG components for each level
function SeedPlant() {
  return (
    <svg
      viewBox="0 0 100 120"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soil mound */}
      <ellipse cx="50" cy="110" rx="30" ry="8" fill="hsl(30 30% 35%)" />
      {/* Seed */}
      <ellipse
        cx="50"
        cy="95"
        rx="12"
        ry="8"
        fill="hsl(45 40% 50%)"
        stroke="hsl(45 40% 40%)"
        strokeWidth="1"
      />
      {/* Tiny sprout */}
      <path
        d="M50 95 Q50 85 52 80 Q50 82 48 80 Q50 85 50 95"
        fill="hsl(142 45% 45%)"
      />
    </svg>
  );
}

function SproutPlant() {
  return (
    <svg
      viewBox="0 0 100 120"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soil */}
      <ellipse cx="50" cy="110" rx="30" ry="8" fill="hsl(30 30% 35%)" />
      {/* Stem */}
      <path
        d="M50 110 Q50 90 50 70"
        stroke="hsl(142 40% 35%)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Left leaf */}
      <motion.path
        d="M50 85 Q35 80 30 70 Q40 75 50 85"
        fill="hsl(142 50% 50%)"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: "50px 85px" }}
      />
      {/* Right leaf */}
      <motion.path
        d="M50 75 Q65 70 70 60 Q60 65 50 75"
        fill="hsl(142 50% 55%)"
        animate={{ rotate: [2, -2, 2] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        style={{ transformOrigin: "50px 75px" }}
      />
    </svg>
  );
}

function PlantPlant() {
  return (
    <svg
      viewBox="0 0 100 120"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soil */}
      <ellipse cx="50" cy="110" rx="30" ry="8" fill="hsl(30 30% 35%)" />
      {/* Main stem */}
      <path
        d="M50 110 Q50 80 50 50"
        stroke="hsl(142 40% 35%)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Leaves */}
      <motion.g
        animate={{ rotate: [-1, 1, -1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: "50px 90px" }}
      >
        <path
          d="M50 90 Q25 85 20 65 Q35 75 50 90"
          fill="hsl(142 50% 45%)"
        />
      </motion.g>
      <motion.g
        animate={{ rotate: [1, -1, 1] }}
        transition={{ duration: 3.2, repeat: Infinity }}
        style={{ transformOrigin: "50px 75px" }}
      >
        <path
          d="M50 75 Q75 70 80 50 Q65 60 50 75"
          fill="hsl(142 50% 50%)"
        />
      </motion.g>
      <motion.g
        animate={{ rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 2.8, repeat: Infinity }}
        style={{ transformOrigin: "50px 60px" }}
      >
        <path
          d="M50 60 Q30 55 25 40 Q38 48 50 60"
          fill="hsl(142 55% 55%)"
        />
      </motion.g>
      {/* Flower bud */}
      <circle cx="50" cy="45" r="8" fill="hsl(45 60% 65%)" />
      <circle cx="50" cy="45" r="5" fill="hsl(45 70% 75%)" />
    </svg>
  );
}

function TreePlant() {
  return (
    <svg
      viewBox="0 0 100 120"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soil */}
      <ellipse cx="50" cy="110" rx="30" ry="8" fill="hsl(30 30% 35%)" />
      {/* Trunk */}
      <path
        d="M45 110 L45 70 L55 70 L55 110 Z"
        fill="hsl(30 35% 40%)"
      />
      {/* Tree crown layers */}
      <motion.g
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ transformOrigin: "50px 50px" }}
      >
        {/* Bottom layer */}
        <ellipse cx="50" cy="60" rx="35" ry="20" fill="hsl(142 45% 40%)" />
        {/* Middle layer */}
        <ellipse cx="50" cy="45" rx="28" ry="18" fill="hsl(142 50% 48%)" />
        {/* Top layer */}
        <ellipse cx="50" cy="32" rx="20" ry="14" fill="hsl(142 55% 55%)" />
      </motion.g>
      {/* Fruits/flowers */}
      <circle cx="35" cy="55" r="4" fill="hsl(0 65% 55%)" />
      <circle cx="65" cy="50" r="4" fill="hsl(0 65% 55%)" />
      <circle cx="50" cy="35" r="4" fill="hsl(45 70% 60%)" />
    </svg>
  );
}

const plantComponents: Record<PlantLevel, React.FC> = {
  Seed: SeedPlant,
  Sprout: SproutPlant,
  Plant: PlantPlant,
  Tree: TreePlant,
};

const plantSizes: Record<PlantLevel, string> = {
  Seed: "w-16 h-20",
  Sprout: "w-20 h-24",
  Plant: "w-24 h-28",
  Tree: "w-32 h-36",
};

export function Plant({ hobby, onClick, isGrowing }: PlantProps) {
  const PlantComponent = plantComponents[hobby.level];
  const sizeClass = plantSizes[hobby.level];

  return (
    <motion.button
      onClick={onClick}
      className={`relative flex flex-col items-center cursor-pointer focus:outline-none group ${sizeClass}`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      animate={
        isGrowing
          ? {
              scale: [1, 1.2, 1],
              filter: [
                "drop-shadow(0 0 0px hsl(142 45% 45%))",
                "drop-shadow(0 0 20px hsl(142 45% 45%))",
                "drop-shadow(0 0 0px hsl(142 45% 45%))",
              ],
            }
          : {}
      }
      transition={{ duration: 0.5 }}
      style={{ transformOrigin: "bottom center" }}
    >
      {/* Plant SVG */}
      <motion.div
        className="w-full h-full"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "bottom center" }}
      >
        <PlantComponent />
      </motion.div>

      {/* Hobby name label */}
      <motion.div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-card/90 px-2 py-0.5 text-xs font-medium text-foreground shadow-sm border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ opacity: 0, y: 5 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        {hobby.name}
      </motion.div>
    </motion.button>
  );
}
