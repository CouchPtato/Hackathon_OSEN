"use client";

import { motion } from "framer-motion";
import { Moon, Sun, Sprout, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlantLevel } from "@/lib/types";

interface NavbarProps {
  totalXp: number;
  level: PlantLevel;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenProfile?: () => void;
  gardenerName?: string;
}

const levelEmojis: Record<PlantLevel, string> = {
  Seed: "🌱",
  Sprout: "🌿",
  Plant: "🌾",
  Tree: "🌳",
};

const levelTitles: Record<PlantLevel, string> = {
  Seed: "Beginner Gardener",
  Sprout: "Growing Gardener",
  Plant: "Skilled Gardener",
  Tree: "Master Gardener",
};

export function Navbar({
  totalXp,
  level,
  darkMode,
  onToggleDarkMode,
  onOpenProfile,
  gardenerName = "Gardener",
}: NavbarProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass sticky top-0 z-50 px-4 py-3 sm:px-6"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sprout className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
          </motion.div>
          <span className="text-lg font-semibold text-foreground sm:text-xl">
            AI Hobby Garden
          </span>
        </div>

        {/* Right side - Level, XP, Dark Mode */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Gardener Level */}
          <motion.div
            className="hidden sm:flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-lg">{levelEmojis[level]}</span>
            <span className="text-sm font-medium text-foreground">
              {levelTitles[level]}
            </span>
          </motion.div>

          {/* Mobile level display */}
          <motion.div
            className="flex sm:hidden items-center gap-1 rounded-full bg-secondary px-2 py-1"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-base">{levelEmojis[level]}</span>
          </motion.div>

          {/* XP Count */}
          <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 sm:px-3 sm:py-1.5">
            <span className="text-xs font-semibold text-primary sm:text-sm">
              {totalXp} XP
            </span>
          </div>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            {darkMode ? (
              <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
            <span className="sr-only">Toggle dark mode</span>
          </Button>

          {/* Profile Button */}
          {onOpenProfile && (
            <motion.button
              onClick={onOpenProfile}
              className="flex items-center gap-2 rounded-full bg-secondary px-2 py-1.5 sm:px-3 hover:bg-secondary/80 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              </div>
              <span className="hidden sm:inline text-sm font-medium text-foreground">
                {gardenerName}
              </span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
