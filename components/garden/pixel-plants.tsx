"use client";

import { motion } from "framer-motion";

export type GrowthStage = 0 | 1 | 2 | 3 | 4;

interface PixelPlantProps {
  stage: GrowthStage;
  hobbyName: string;
  isWatered?: boolean;
  className?: string;
}

// Helper to get colors based on hobby type
function getHobbyColors(hobbyName: string) {
  const name = hobbyName.toLowerCase();
  
  if (name.includes("guitar") || name.includes("music")) {
    return { primary: "#e6c95a", secondary: "#c4a742", accent: "#8b5a2b", flower: "#ffd700" };
  }
  if (name.includes("fitness") || name.includes("exercise") || name.includes("gym")) {
    return { primary: "#ff6b6b", secondary: "#ee5a5a", accent: "#c45a3a", flower: "#ff4757" };
  }
  if (name.includes("paint") || name.includes("art") || name.includes("draw")) {
    return { primary: "#a29bfe", secondary: "#6c5ce7", accent: "#5f27cd", flower: "#ff6b81" };
  }
  if (name.includes("read") || name.includes("book")) {
    return { primary: "#81c784", secondary: "#66bb6a", accent: "#8d6e63", flower: "#fff9c4" };
  }
  if (name.includes("cook") || name.includes("bak")) {
    return { primary: "#ff7043", secondary: "#ff5722", accent: "#bf360c", flower: "#ffcc80" };
  }
  if (name.includes("photo") || name.includes("camera")) {
    return { primary: "#ffc107", secondary: "#ff9800", accent: "#5d4037", flower: "#ffeb3b" };
  }
  if (name.includes("writ") || name.includes("journal")) {
    return { primary: "#7986cb", secondary: "#5c6bc0", accent: "#3f51b5", flower: "#e8eaf6" };
  }
  if (name.includes("garden") || name.includes("plant")) {
    return { primary: "#66bb6a", secondary: "#4caf50", accent: "#2e7d32", flower: "#e91e63" };
  }
  if (name.includes("yoga") || name.includes("meditat")) {
    return { primary: "#80deea", secondary: "#4dd0e1", accent: "#00acc1", flower: "#b2ebf2" };
  }
  if (name.includes("game") || name.includes("gaming")) {
    return { primary: "#ba68c8", secondary: "#9c27b0", accent: "#7b1fa2", flower: "#ce93d8" };
  }
  // Default green
  return { primary: "#4caf50", secondary: "#388e3c", accent: "#2e7d32", flower: "#ffeb3b" };
}

// Pixel art plant SVG - renders a plant at different growth stages
export function PixelPlant({ stage, hobbyName, isWatered, className }: PixelPlantProps) {
  const colors = getHobbyColors(hobbyName);
  const stemColor = isWatered ? "#2d5a27" : "#3d6b37";
  const leafColor = isWatered ? "#4a8b3f" : "#5a9b4f";
  
  // Pixel size for the grid
  const px = 4;
  
  return (
    <motion.svg
      viewBox="0 0 64 80"
      className={className}
      style={{ imageRendering: "pixelated" }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      {/* Dirt mound - always visible */}
      <rect x={16} y={68} width={px * 8} height={px * 2} fill="#5d3a1a" />
      <rect x={12} y={72} width={px * 10} height={px * 2} fill="#6b4423" />
      <rect x={20} y={64} width={px * 6} height={px} fill="#5d3a1a" />
      
      {/* Stage 0: Just dirt with seed hint */}
      {stage === 0 && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <rect x={28} y={64} width={px * 2} height={px} fill="#7d5a3a" />
        </motion.g>
      )}
      
      {/* Stage 1: Tiny sprout */}
      {stage >= 1 && (
        <motion.g
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          style={{ transformOrigin: "bottom" }}
        >
          {/* Small stem */}
          <rect x={28} y={56} width={px * 2} height={px * 3} fill={stemColor} />
          {/* Two tiny leaves */}
          <rect x={24} y={52} width={px} height={px} fill={leafColor} />
          <rect x={36} y={52} width={px} height={px} fill={leafColor} />
          <rect x={28} y={48} width={px * 2} height={px} fill={leafColor} />
        </motion.g>
      )}
      
      {/* Stage 2: Small plant with more leaves */}
      {stage >= 2 && (
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Extended stem */}
          <rect x={28} y={40} width={px * 2} height={px * 4} fill={stemColor} />
          {/* Left branch */}
          <rect x={20} y={44} width={px * 2} height={px} fill={stemColor} />
          <rect x={16} y={40} width={px * 2} height={px * 2} fill={leafColor} />
          <rect x={12} y={44} width={px * 2} height={px} fill={leafColor} />
          {/* Right branch */}
          <rect x={36} y={44} width={px * 2} height={px} fill={stemColor} />
          <rect x={40} y={40} width={px * 2} height={px * 2} fill={leafColor} />
          <rect x={44} y={44} width={px * 2} height={px} fill={leafColor} />
        </motion.g>
      )}
      
      {/* Stage 3: Bigger plant with colored leaves */}
      {stage >= 3 && (
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Taller stem */}
          <rect x={28} y={28} width={px * 2} height={px * 3} fill={stemColor} />
          {/* More branches */}
          <rect x={20} y={32} width={px * 2} height={px} fill={stemColor} />
          <rect x={36} y={32} width={px * 2} height={px} fill={stemColor} />
          {/* Colored leaves based on hobby */}
          <rect x={12} y={28} width={px * 3} height={px * 2} fill={colors.primary} />
          <rect x={8} y={32} width={px * 2} height={px} fill={colors.secondary} />
          <rect x={40} y={28} width={px * 3} height={px * 2} fill={colors.primary} />
          <rect x={48} y={32} width={px * 2} height={px} fill={colors.secondary} />
          {/* Top leaves */}
          <rect x={24} y={24} width={px * 4} height={px} fill={leafColor} />
        </motion.g>
      )}
      
      {/* Stage 4: Full tree/plant with flowers/fruits */}
      {stage >= 4 && (
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
        >
          {/* Crown */}
          <rect x={28} y={16} width={px * 2} height={px * 3} fill={stemColor} />
          
          {/* Tree crown / flower cluster */}
          <rect x={16} y={8} width={px * 8} height={px * 4} fill={colors.primary} />
          <rect x={12} y={12} width={px * 10} height={px * 3} fill={colors.primary} />
          <rect x={20} y={4} width={px * 6} height={px * 2} fill={colors.secondary} />
          
          {/* Flowers/fruits */}
          <motion.rect 
            x={16} y={8} width={px} height={px} 
            fill={colors.flower}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.rect 
            x={40} y={12} width={px} height={px} 
            fill={colors.flower}
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
          <motion.rect 
            x={28} y={4} width={px} height={px} 
            fill={colors.flower}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
        </motion.g>
      )}
      
      {/* Water drops when watered */}
      {isWatered && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0], y: [0, 8, 16] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <rect x={24} y={20} width={px} height={px * 2} fill="#87ceeb" />
          <rect x={36} y={28} width={px} height={px * 2} fill="#87ceeb" />
        </motion.g>
      )}
    </motion.svg>
  );
}

// Export helper to convert level to stage
export function levelToPixelStage(level: string): GrowthStage {
  switch (level) {
    case "Seed": return 1;
    case "Sprout": return 2;
    case "Plant": return 3;
    case "Tree": return 4;
    default: return 1;
  }
}
