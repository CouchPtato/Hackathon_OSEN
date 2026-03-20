"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Sword, 
  Brain, 
  Palette, 
  Users, 
  Lightbulb,
  TrendingUp,
  Sparkles
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
    gradientFrom: "from-red-500",
    gradientTo: "to-orange-500",
    description: "Physical power & endurance",
  },
  intelligence: {
    icon: Brain,
    label: "Intelligence",
    color: "text-intelligence",
    bgColor: "bg-intelligence",
    gradientFrom: "from-blue-500",
    gradientTo: "to-cyan-400",
    description: "Mental acuity & knowledge",
  },
  creativity: {
    icon: Palette,
    label: "Creativity",
    color: "text-creativity",
    bgColor: "bg-creativity",
    gradientFrom: "from-purple-500",
    gradientTo: "to-pink-500",
    description: "Artistic & innovative thinking",
  },
  charisma: {
    icon: Users,
    label: "Charisma",
    color: "text-charisma",
    bgColor: "bg-charisma",
    gradientFrom: "from-amber-500",
    gradientTo: "to-yellow-400",
    description: "Social influence & presence",
  },
  logic: {
    icon: Lightbulb,
    label: "Logic",
    color: "text-logic",
    bgColor: "bg-logic",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-green-400",
    description: "Problem-solving & reasoning",
  },
};

export function StatsPanel({ stats, statChanges }: StatsPanelProps) {
  const maxStat = 100;
  const totalPower = Object.values(stats).reduce((a, b) => a + b, 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/20">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Character Stats</h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Total Power</p>
          <p className="text-xl font-bold text-primary">{totalPower}</p>
        </div>
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
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={cn(
                      "p-2 rounded-lg bg-gradient-to-br",
                      config.gradientFrom,
                      config.gradientTo,
                      "shadow-lg"
                    )}
                    style={{
                      boxShadow: `0 4px 14px ${config.color.replace('text-', 'var(--')}30)`
                    }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </motion.div>
                  <div>
                    <span className="text-sm font-semibold text-foreground">
                      {config.label}
                    </span>
                    <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {config.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.span
                    key={value}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className={cn("font-mono font-bold text-lg", config.color)}
                  >
                    {value}
                  </motion.span>
                  <AnimatePresence>
                    {change > 0 && (
                      <motion.span
                        initial={{ opacity: 0, y: 10, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-0.5 text-sm text-accent font-bold"
                      >
                        <Sparkles className="w-3 h-3" />
                        +{change}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Stat bar */}
              <div className="h-3 rounded-full bg-secondary/80 overflow-hidden relative border border-border/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                  className={cn(
                    "h-full rounded-full relative bg-gradient-to-r",
                    config.gradientFrom,
                    config.gradientTo
                  )}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.2 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                  
                  {/* Pulse on change */}
                  <AnimatePresence>
                    {change > 0 && (
                      <motion.div
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-white/50 rounded-full"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
                
                {/* Percentage markers */}
                <div className="absolute inset-0 flex justify-between px-1">
                  {[25, 50, 75].map((mark) => (
                    <div
                      key={mark}
                      className="w-px h-full bg-foreground/10"
                      style={{ marginLeft: `${mark}%` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Power level indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 pt-4 border-t border-border"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Power Level</span>
          <span className={cn(
            "font-bold px-2 py-0.5 rounded-full text-xs",
            totalPower >= 400 ? "bg-legendary/20 text-legendary" :
            totalPower >= 300 ? "bg-epic/20 text-epic" :
            totalPower >= 200 ? "bg-rare/20 text-rare" :
            totalPower >= 100 ? "bg-uncommon/20 text-uncommon" :
            "bg-common/20 text-common"
          )}>
            {totalPower >= 400 ? "Legendary" :
             totalPower >= 300 ? "Epic" :
             totalPower >= 200 ? "Rare" :
             totalPower >= 100 ? "Uncommon" : "Common"}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
