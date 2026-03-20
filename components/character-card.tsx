"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Flame, Sparkles, Crown, Star, Zap } from "lucide-react";
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
  const [particles, setParticles] = useState<number[]>([]);
  
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
      setParticles(Array.from({ length: 20 }, (_, i) => i));
      onLevelUp?.();
      const timer = setTimeout(() => {
        setShowLevelUp(false);
        setParticles([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [xpProgress, onLevelUp]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass-card rounded-2xl p-8 relative overflow-hidden",
        showLevelUp && "glow-level"
      )}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-full blur-2xl"
        />
      </div>

      {/* Level up particles */}
      <AnimatePresence>
        {particles.map((i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 1,
              x: "50%",
              y: "50%",
              scale: 0,
            }}
            animate={{
              opacity: 0,
              x: `${50 + (Math.random() - 0.5) * 200}%`,
              y: `${50 + (Math.random() - 0.5) * 200}%`,
              scale: Math.random() * 2 + 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-2 h-2 rounded-full bg-xp"
            style={{ left: 0, top: 0 }}
          />
        ))}
      </AnimatePresence>

      {/* Level up animation overlay */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-background/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-20 h-20 text-xp mx-auto mb-4" fill="currentColor" />
              </motion.div>
              <motion.p
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-4xl font-bold text-xp text-glow"
              >
                LEVEL UP!
              </motion.p>
              <p className="text-xl text-foreground mt-2">Level {level}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Streak badge */}
      {streak > 0 && (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Flame className="w-4 h-4 text-orange-400" />
          </motion.div>
          <span className="text-sm font-bold text-orange-400">{streak} day streak</span>
        </motion.div>
      )}

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-8 relative z-0">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          {/* Outer glow ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-8px] rounded-full bg-gradient-to-r from-primary via-purple-500 to-primary opacity-50 blur-sm"
          />
          
          {/* Avatar container */}
          <div
            className={cn(
              "relative w-36 h-36 rounded-full flex items-center justify-center",
              "bg-gradient-to-br from-primary/30 via-purple-600/20 to-primary/10",
              "border-4 border-primary/60",
              "shadow-lg shadow-primary/20"
            )}
          >
            {/* Inner glow */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/10 to-transparent" />
            
            <User className="w-16 h-16 text-primary relative z-10" />
            
            {/* Crown for high levels */}
            {level >= 10 && (
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute -top-4"
              >
                <Crown className="w-8 h-8 text-legendary" fill="currentColor" />
              </motion.div>
            )}
          </div>
          
          {/* Level badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-primary to-purple-600 text-primary-foreground font-bold text-sm shadow-lg shadow-primary/40"
          >
            <Zap className="w-3 h-3 inline mr-1" />
            LVL {level}
          </motion.div>
        </motion.div>

        <h2 className="text-2xl font-bold mt-8 text-foreground">{name}</h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-primary font-medium flex items-center gap-1"
        >
          <Sparkles className="w-4 h-4" />
          {title}
        </motion.p>
      </div>

      {/* XP Bar Section */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-medium">Experience</span>
          <span className="text-xp font-mono font-bold">
            {formatNumber(displayedXp)} / {formatNumber(nextLevelXp)} XP
          </span>
        </div>
        
        <div className="h-5 rounded-full bg-secondary/80 overflow-hidden relative border border-border">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-px bg-foreground/10"
                style={{ left: `${(i + 1) * 10}%` }}
              />
            ))}
          </div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(xpProgress, 100)}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full relative overflow-hidden"
          >
            {/* Animated shimmer */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
            />
          </motion.div>
        </div>
        
        <p className="text-center text-sm text-muted-foreground">
          <span className="text-xp font-semibold">{formatNumber(nextLevelXp - displayedXp)}</span> XP until level {level + 1}
        </p>
      </div>
    </motion.div>
  );
}
