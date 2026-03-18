"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Crown, User } from "lucide-react";
import type { LeaderboardEntry } from "@/lib/types";
import { cn, formatNumber } from "@/lib/utils";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

const rankConfig = {
  1: {
    icon: Crown,
    color: "text-legendary",
    bgColor: "bg-legendary/20",
    borderColor: "border-legendary/50",
  },
  2: {
    icon: Medal,
    color: "text-common",
    bgColor: "bg-common/20",
    borderColor: "border-common/50",
  },
  3: {
    icon: Medal,
    color: "text-charisma",
    bgColor: "bg-charisma/20",
    borderColor: "border-charisma/50",
  },
};

export function Leaderboard({ entries, currentUserId }: LeaderboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-legendary" />
        <h3 className="text-lg font-bold text-foreground">Leaderboard</h3>
      </div>

      <div className="space-y-3">
        {entries.map((entry, index) => {
          const isTopThree = entry.rank <= 3;
          const config = rankConfig[entry.rank as keyof typeof rankConfig];
          const Icon = config?.icon || User;
          const isCurrentUser = entry.name === "Hero";

          return (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all",
                isTopThree ? config.bgColor : "bg-secondary/50",
                isTopThree ? config.borderColor : "border-transparent",
                isCurrentUser && "ring-2 ring-primary/50",
                "border"
              )}
            >
              {/* Rank */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                  isTopThree ? config.bgColor : "bg-secondary",
                  isTopThree ? config.color : "text-muted-foreground"
                )}
              >
                {isTopThree ? (
                  <Icon className="w-4 h-4" />
                ) : (
                  entry.rank
                )}
              </div>

              {/* Avatar */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                  isTopThree ? config.bgColor : "bg-secondary",
                  isTopThree ? config.color : "text-foreground"
                )}
              >
                {entry.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "font-semibold text-sm truncate",
                  isCurrentUser ? "text-primary" : "text-foreground"
                )}>
                  {entry.name}
                  {isCurrentUser && (
                    <span className="ml-2 text-xs text-muted-foreground">(You)</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  Level {entry.level}
                </p>
              </div>

              {/* XP */}
              <div className="text-right">
                <p className={cn(
                  "font-mono font-bold text-sm",
                  isTopThree ? config.color : "text-xp"
                )}>
                  {formatNumber(entry.xp)}
                </p>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
