"use client";

import { motion } from "framer-motion";
import { TrendingUp, Sparkles } from "lucide-react";
import { XP_PER_LEVEL } from "@/lib/types";

interface ProgressCardProps {
  totalXp: number;
  currentLevel: number;
}

const levelNames = ["Seedling", "Sprout", "Gardener", "Botanist", "Master Gardener"];

export function ProgressCard({ totalXp, currentLevel }: ProgressCardProps) {
  const xpForCurrentLevel = currentLevel * XP_PER_LEVEL;
  const xpForNextLevel = (currentLevel + 1) * XP_PER_LEVEL;
  const xpInCurrentLevel = totalXp - xpForCurrentLevel;
  const xpNeeded = xpForNextLevel - xpForCurrentLevel;
  const progress = (xpInCurrentLevel / xpNeeded) * 100;

  const levelName = levelNames[Math.min(currentLevel, levelNames.length - 1)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-xp/10 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-xp" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Progress</h2>
          <p className="text-sm text-muted-foreground">Level {currentLevel}</p>
        </div>
      </div>

      {/* Level badge */}
      <motion.div
        className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Sparkles className="w-6 h-6 text-primary-foreground" />
        </motion.div>
        <div>
          <p className="font-bold text-foreground">{levelName}</p>
          <p className="text-sm text-muted-foreground">
            {totalXp} XP total
          </p>
        </div>
      </motion.div>

      {/* XP Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-muted-foreground">
            {xpInCurrentLevel} / {xpNeeded} XP
          </span>
          <span className="text-primary font-medium">
            Level {currentLevel + 1}
          </span>
        </div>
        <div className="h-4 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent xp-shine" />
            </div>
          </motion.div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {xpNeeded - xpInCurrentLevel} XP to next level
        </p>
      </div>
    </motion.div>
  );
}
