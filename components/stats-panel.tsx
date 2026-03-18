"use client";

import { motion } from "framer-motion";
import { 
  Sword, 
  Brain, 
  Palette, 
  Users, 
  Lightbulb,
  TrendingUp
} from "lucide-react";
import type { Stats } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StatsPanelProps {
  stats: Stats;
  statChanges?: Partial<Stats>;
}

const statConfig = {
  strength: {
    icon: Sword,
    label: "Strength",
    color: "text-strength",
    bgColor: "bg-strength",
    description: "Physical power & endurance",
  },
  intelligence: {
    icon: Brain,
    label: "Intelligence",
    color: "text-intelligence",
    bgColor: "bg-intelligence",
    description: "Mental acuity & knowledge",
  },
  creativity: {
    icon: Palette,
    label: "Creativity",
    color: "text-creativity",
    bgColor: "bg-creativity",
    description: "Artistic & innovative thinking",
  },
  charisma: {
    icon: Users,
    label: "Charisma",
    color: "text-charisma",
    bgColor: "bg-charisma",
    description: "Social influence & presence",
  },
  logic: {
    icon: Lightbulb,
    label: "Logic",
    color: "text-logic",
    bgColor: "bg-logic",
    description: "Problem-solving & reasoning",
  },
};

export function StatsPanel({ stats, statChanges }: StatsPanelProps) {
  const maxStat = 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">Character Stats</h3>
      </div>

      <div className="space-y-5">
        {(Object.keys(statConfig) as Array<keyof Stats>).map((statKey, index) => {
          const config = statConfig[statKey];
          const Icon = config.icon;
          const value = stats[statKey];
          const change = statChanges?.[statKey] || 0;
          const percentage = (value / maxStat) * 100;

          return (
            <motion.div
              key={statKey}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={cn("p-1.5 rounded-lg bg-secondary", config.color)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">
                      {config.label}
                    </span>
                    <p className="text-xs text-muted-foreground hidden group-hover:block">
                      {config.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("font-mono font-bold", config.color)}>
                    {value}
                  </span>
                  {change > 0 && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-xs text-accent font-bold"
                    >
                      +{change}
                    </motion.span>
                  )}
                </div>
              </div>

              {/* Stat bar */}
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                  className={cn("h-full rounded-full relative", config.bgColor)}
                >
                  {/* Pulse on change */}
                  {change > 0 && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0 bg-white/50 rounded-full"
                    />
                  )}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Total stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total Power</span>
          <span className="text-xl font-bold text-primary">
            {Object.values(stats).reduce((a, b) => a + b, 0)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
