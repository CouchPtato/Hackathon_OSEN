"use client";

import { motion } from "framer-motion";
import { Flame, Sprout } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  totalStreak: number;
}

export function Navbar({ totalStreak }: NavbarProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass sticky top-0 z-50 px-6 py-4"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sprout className="h-7 w-7 text-primary" />
          </motion.div>
          <span className="text-xl font-semibold text-foreground">
            AI Hobby Garden
          </span>
        </div>

        {/* Right side - Streak + Avatar */}
        <div className="flex items-center gap-4">
          {/* Streak Counter */}
          <motion.div
            className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5"
            whileHover={{ scale: 1.05 }}
          >
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="font-medium text-foreground">{totalStreak}</span>
          </motion.div>

          {/* Profile Avatar */}
          <Avatar className="h-9 w-9 border-2 border-primary/30">
            <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
            <AvatarFallback className="bg-primary/20 text-primary">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </motion.header>
  );
}
