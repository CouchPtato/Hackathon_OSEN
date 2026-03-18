"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Flame, Sparkles } from "lucide-react";
import { cn, xpForLevel, xpForNextLevel, formatNumber } from "@/lib/utils";
import { useState, useEffect } from "react";

interface CharacterCardProps {
  name: string;
  level: number;
  xp: number;
  title: string;
  streak: number;
  onLevelUp?: () => void;
}

export function CharacterCard({
  name,
  level,
  xp,
  title,
  streak,
  onLevelUp,
}: CharacterCardProps) {
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [displayedXp, setDisplayedXp] = useState(xp);
  
  const currentLevelXp = xpForLevel(level);
  const nextLevelXp = xpForNextLevel(level);
  const xpProgress = ((displayedXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;

  useEffect(() => {
    if (xp !== displayedXp) {
      const timer = setTimeout(() => setDisplayedXp(xp), 50);
      return () => clearTimeout(timer);
    }
  }, [xp, displayedXp]);

  useEffect(() => {
    if (xpProgress >= 100) {
      setShowLevelUp(true);
      onLevelUp?.();
      const timer = setTimeout(() => setShowLevelUp(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [xpProgress, onLevelUp]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      {/* Level up animation overlay */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="text-center"
            >
              <Sparkles className="w-16 h-16 text-xp mx-auto mb-2 animate-pulse" />
              <p className="text-3xl font-bold text-xp text-glow">LEVEL UP!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Streak badge */}
      {streak > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-destructive/20 border border-destructive/30"
        >
          <Flame className="w-4 h-4 text-destructive" />
          <span className="text-sm font-bold text-destructive">{streak}</span>
        </motion.div>
      )}

      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={cn(
            "relative w-32 h-32 rounded-full flex items-center justify-center",
            "bg-gradient-to-br from-primary/30 to-primary/10",
            "border-4 border-primary/50",
            showLevelUp && "glow-xp"
          )}
        >
          <User className="w-16 h-16 text-primary" />
          
          {/* Level badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground font-bold text-sm glow-primary"
          >
            LVL {level}
          </motion.div>
        </motion.div>

        <h2 className="text-2xl font-bold mt-6 text-foreground">{name}</h2>
        <p className="text-muted-foreground text-sm">{title}</p>
      </div>

      {/* XP Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Experience</span>
          <span className="text-xp font-mono">
            {formatNumber(displayedXp)} / {formatNumber(nextLevelXp)} XP
          </span>
        </div>
        
        <div className="h-4 rounded-full bg-secondary overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(xpProgress, 100)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full relative"
          >
            {/* Shimmer effect */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </motion.div>
        </div>
        
        <p className="text-center text-xs text-muted-foreground">
          {formatNumber(nextLevelXp - displayedXp)} XP until next level
        </p>
      </div>
    </motion.div>
  );
}
