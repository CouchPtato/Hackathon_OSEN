"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Scroll, 
  Sparkles, 
  CheckCircle2,
  Castle,
  Dumbbell,
  Palette,
  Monitor,
  Users,
  ChevronRight,
  Swords
} from "lucide-react";
import type { Quest, Stats } from "@/lib/types";
import { cn } from "@/lib/utils";

interface QuestPanelProps {
  quests: Quest[];
  onCompleteQuest: (quest: Quest, event: React.MouseEvent) => void;
}

const categoryConfig = {
  knowledge: {
    icon: Castle,
    color: "text-intelligence",
    bgGradient: "from-blue-500/20 to-cyan-500/10",
    borderColor: "border-blue-500/30",
    hoverGlow: "hover:shadow-[0_0_30px_hsl(217,91%,60%,0.2)]",
  },
  fitness: {
    icon: Dumbbell,
    color: "text-strength",
    bgGradient: "from-red-500/20 to-orange-500/10",
    borderColor: "border-red-500/30",
    hoverGlow: "hover:shadow-[0_0_30px_hsl(0,84%,60%,0.2)]",
  },
  creative: {
    icon: Palette,
    color: "text-creativity",
    bgGradient: "from-purple-500/20 to-pink-500/10",
    borderColor: "border-purple-500/30",
    hoverGlow: "hover:shadow-[0_0_30px_hsl(280,87%,65%,0.2)]",
  },
  tech: {
    icon: Monitor,
    color: "text-logic",
    bgGradient: "from-emerald-500/20 to-green-500/10",
    borderColor: "border-emerald-500/30",
    hoverGlow: "hover:shadow-[0_0_30px_hsl(142,71%,45%,0.2)]",
  },
  social: {
    icon: Users,
    color: "text-charisma",
    bgGradient: "from-amber-500/20 to-yellow-500/10",
    borderColor: "border-amber-500/30",
    hoverGlow: "hover:shadow-[0_0_30px_hsl(45,93%,58%,0.2)]",
  },
};

const statLabels: Record<keyof Stats, string> = {
  strength: "STR",
  intelligence: "INT",
  creativity: "CRE",
  charisma: "CHA",
  logic: "LOG",
};

const statColors: Record<keyof Stats, string> = {
  strength: "text-strength bg-strength/20",
  intelligence: "text-intelligence bg-intelligence/20",
  creativity: "text-creativity bg-creativity/20",
  charisma: "text-charisma bg-charisma/20",
  logic: "text-logic bg-logic/20",
};

export function QuestPanel({ quests, onCompleteQuest }: QuestPanelProps) {
  const activeQuests = quests.filter((q) => !q.completed);
  const completedCount = quests.filter((q) => q.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/20">
            <Scroll className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Active Quests</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
            {completedCount} completed
          </span>
          <span className="text-sm font-semibold text-primary">
            {activeQuests.length} available
          </span>
        </div>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
        <AnimatePresence mode="popLayout">
          {activeQuests.map((quest, index) => {
            const config = categoryConfig[quest.category];
            const Icon = config.icon;

            return (
              <motion.div
                key={quest.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className={cn(
                  "p-4 rounded-xl border transition-all cursor-pointer",
                  "bg-gradient-to-br",
                  config.bgGradient,
                  config.borderColor,
                  config.hoverGlow,
                  "group"
                )}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className={cn(
                      "p-2.5 rounded-xl bg-background/60 backdrop-blur-sm",
                      config.color,
                      "shadow-sm"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                        {quest.title}
                      </h4>
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {quest.description}
                    </p>

                    {/* Rewards */}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-xp text-xs font-bold border border-xp/30"
                      >
                        <Sparkles className="w-3 h-3" />
                        +{quest.xpReward} XP
                      </motion.span>
                      
                      {Object.entries(quest.statRewards).map(([stat, value]) => (
                        <span
                          key={stat}
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            statColors[stat as keyof Stats]
                          )}
                        >
                          +{value} {statLabels[stat as keyof Stats]}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Complete button */}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onCompleteQuest(quest, e);
                    }}
                    className="p-2.5 rounded-full bg-gradient-to-br from-accent to-emerald-600 text-accent-foreground shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-shadow"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {activeQuests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
              <Swords className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <p className="text-foreground font-medium">No active quests</p>
            <p className="text-sm text-muted-foreground mt-1">
              Generate new quests with the AI below!
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
