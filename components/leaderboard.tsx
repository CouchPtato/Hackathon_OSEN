"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Crown, User, Sparkles, TrendingUp } from "lucide-react";
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
    bgGradient: "from-amber-500/25 to-yellow-500/15",
    borderColor: "border-legendary/40",
    iconBg: "from-amber-400 to-yellow-500",
    glow: "shadow-[0_0_20px_hsl(43,96%,56%,0.2)]",
  },
  2: {
    icon: Medal,
    color: "text-common",
    bgGradient: "from-gray-400/20 to-gray-500/10",
    borderColor: "border-common/40",
    iconBg: "from-gray-300 to-gray-400",
    glow: "",
  },
  3: {
    icon: Medal,
    color: "text-charisma",
    bgGradient: "from-orange-500/20 to-amber-500/10",
    borderColor: "border-charisma/40",
    iconBg: "from-orange-400 to-amber-500",
    glow: "",
  },
};

export function Leaderboard({ entries, currentUserId }: LeaderboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
            className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 shadow-lg shadow-amber-500/30"
          >
            <Trophy className="w-5 h-5 text-white" />
          </motion.div>
          <h3 className="text-lg font-bold text-foreground">Leaderboard</h3>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
          <TrendingUp className="w-4 h-4" />
          <span>Live</span>
        </div>
      </div>

      <div className="space-y-2.5">
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
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.01, x: 4 }}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all",
                isTopThree 
                  ? `bg-gradient-to-r ${config.bgGradient} border ${config.borderColor} ${config.glow}`
                  : "bg-secondary/40 border border-transparent hover:border-border/50",
                isCurrentUser && "ring-2 ring-primary/50 ring-offset-1 ring-offset-background"
              )}
            >
              {/* Rank Badge */}
              <div
                className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0",
                  isTopThree 
                    ? `bg-gradient-to-br ${config.iconBg} text-white shadow-md`
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {isTopThree ? (
                  <Icon className="w-5 h-5" fill={entry.rank === 1 ? "currentColor" : "none"} />
                ) : (
                  <span className="font-mono">{entry.rank}</span>
                )}
              </div>

              {/* Avatar */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0",
                  isTopThree
                    ? `bg-gradient-to-br ${config.iconBg} text-white`
                    : "bg-secondary text-foreground"
                )}
              >
                {entry.avatar}
              </div>

              {/* Player Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={cn(
                    "font-semibold text-sm truncate",
                    isCurrentUser ? "text-primary" : "text-foreground"
                  )}>
                    {entry.name}
                  </p>
                  {isCurrentUser && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium">
                      You
                    </span>
                  )}
                  {entry.rank === 1 && (
                    <Sparkles className="w-3 h-3 text-legendary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Level {entry.level}
                </p>
              </div>

              {/* XP */}
              <div className="text-right shrink-0">
                <p className={cn(
                  "font-mono font-bold text-sm",
                  isTopThree ? config.color : "text-xp"
                )}>
                  {formatNumber(entry.xp)}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">XP</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 pt-4 border-t border-border text-center"
      >
        <p className="text-xs text-muted-foreground">
          Compete with other players and climb the ranks!
        </p>
      </motion.div>
    </motion.div>
  );
}
