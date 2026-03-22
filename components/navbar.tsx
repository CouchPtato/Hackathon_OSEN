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

// 🌱 Emoji
const levelEmojis: Record<PlantLevel, string> = {
  Seed: "🌱",
  Sprout: "🌿",
  Plant: "🌾",
  Tree: "🌳",
};

// 🧠 Titles
const levelTitles: Record<PlantLevel, string> = {
  Seed: "Beginner",
  Sprout: "Growing",
  Plant: "Skilled",
  Tree: "Master",
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
      className="glass sticky top-0 z-50 px-4 py-3 sm:px-6 backdrop-blur-md glow-green"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* 🌿 LOGO */}
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
          >
            <Sprout className="h-6 w-6 text-green-500 sm:h-7 sm:w-7" />
          </motion.div>

          <span className="text-lg font-semibold sm:text-xl">
            AI Hobby Garden
          </span>
        </div>

        {/* ⚡ RIGHT */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* 🌱 LEVEL removed as requested */}

          {/* 📱 MOBILE */}
          <div className="flex sm:hidden items-center px-2 py-1 bg-secondary rounded-full">
            {levelEmojis[level]}
          </div>

          {/* ⭐ XP */}
          <motion.div
            className="flex items-center gap-1 rounded-full bg-green-100/40 px-2 py-1 sm:px-3 sm:py-1.5 shadow-sm"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs font-semibold text-green-600 sm:text-sm">
              {totalXp} XP
            </span>
          </motion.div>

          {/* 🌙 DARK MODE */}
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
          </Button>

          {/* 👤 PROFILE */}
          {onOpenProfile && (
            <motion.button
              onClick={onOpenProfile}
              className="flex items-center gap-2 rounded-full bg-secondary px-2 py-1.5 sm:px-3 hover:bg-secondary/80 transition shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              </div>

              <span className="hidden sm:inline text-sm font-medium">
                {gardenerName}
              </span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  );
}