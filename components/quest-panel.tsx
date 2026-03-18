"use client";

import { motion } from "framer-motion";
import { 
  Scroll, 
  Sparkles, 
  CheckCircle2,
  Castle,
  Dumbbell,
  Palette,
  Monitor,
  Users
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
    bgColor: "bg-intelligence/20",
    borderColor: "border-intelligence/30",
  },
  fitness: {
    icon: Dumbbell,
    color: "text-strength",
    bgColor: "bg-strength/20",
    borderColor: "border-strength/30",
  },
  creative: {
    icon: Palette,
    color: "text-creativity",
    bgColor: "bg-creativity/20",
    borderColor: "border-creativity/30",
  },
  tech: {
    icon: Monitor,
    color: "text-logic",
    bgColor: "bg-logic/20",
    borderColor: "border-logic/30",
  },
  social: {
    icon: Users,
    color: "text-charisma",
    bgColor: "bg-charisma/20",
    borderColor: "border-charisma/30",
  },
};

const statLabels: Record<keyof Stats, string> = {
  strength: "STR",
  intelligence: "INT",
  creativity: "CRE",
  charisma: "CHA",
  logic: "LOG",
};

export function QuestPanel({ quests, onCompleteQuest }: QuestPanelProps) {
  const activeQuests = quests.filter((q) => !q.completed);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Scroll className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">Active Quests</h3>
        <span className="ml-auto text-sm text-muted-foreground">
          {activeQuests.length} available
        </span>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {activeQuests.map((quest, index) => {
          const config = categoryConfig[quest.category];
          const Icon = config.icon;

          return (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "p-4 rounded-xl border transition-all",
                config.bgColor,
                config.borderColor,
                "hover:shadow-lg"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-lg bg-background/50", config.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-sm">
                    {quest.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {quest.description}
                  </p>

                  {/* Rewards */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-xp/20 text-xp text-xs font-medium">
                      <Sparkles className="w-3 h-3" />
                      +{quest.xpReward} XP
                    </span>
                    
                    {Object.entries(quest.statRewards).map(([stat, value]) => (
                      <span
                        key={stat}
                        className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-xs font-medium"
                      >
                        +{value} {statLabels[stat as keyof Stats]}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Complete button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => onCompleteQuest(quest, e)}
                  className="p-2 rounded-full bg-accent text-accent-foreground hover:glow-accent transition-shadow"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          );
        })}

        {activeQuests.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Scroll className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No active quests</p>
            <p className="text-sm">Generate new quests with the AI!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
