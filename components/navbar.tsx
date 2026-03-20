"use client";

import { motion } from "framer-motion";
import { Flame, User } from "lucide-react";

interface NavbarProps {
  streak: number;
  userName: string;
}

export function Navbar({ streak, userName }: NavbarProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass-card border-b border-border/50"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-2xl">🌱</span>
          <span className="text-xl font-bold text-foreground">
            AI Hobby Garden
          </span>
        </motion.div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Streak counter */}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Flame className="w-5 h-5 text-streak" />
            </motion.div>
            <span className="font-semibold text-foreground">{streak}</span>
          </motion.div>

          {/* Profile avatar */}
          <motion.button
            className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.1, borderColor: "hsl(var(--primary))" }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-5 h-5 text-primary" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
