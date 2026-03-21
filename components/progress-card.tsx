"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlantLevel, LEVEL_ORDER } from "@/lib/types";

interface ProgressCardProps {
  totalXp: number;
  currentLevel: PlantLevel;
  xpToNextLevel: number;
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
  Tree: "Pro Gardener",
};

export function ProgressCard({
  totalXp,
  currentLevel,
  xpToNextLevel,
}: ProgressCardProps) {
  const currentLevelIndex = LEVEL_ORDER.indexOf(currentLevel);
  const progressPercentage = Math.min((totalXp / xpToNextLevel) * 100, 100);

  return (
    <Card className="glass">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground">Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* XP Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">XP Progress</span>
            <span className="font-medium text-foreground">
              {totalXp} / {xpToNextLevel} XP
            </span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="origin-left"
          >
            <Progress value={progressPercentage} />
          </motion.div>
        </div>

        {/* Level Title */}
        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            {levelTitles[currentLevel]}
          </span>
        </div>

        {/* Level Display */}
        <div className="flex items-center justify-center gap-2 rounded-xl bg-secondary/50 p-3">
          <div className="flex items-center gap-4">
            {LEVEL_ORDER.map((level, idx) => {
              const isActive = idx <= currentLevelIndex;
              const isCurrent = level === currentLevel;

              return (
                <motion.div
                  key={level}
                  className={`flex flex-col items-center gap-1 ${
                    isActive ? "" : "opacity-40"
                  }`}
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div
                    className={`rounded-full p-2 ${
                      isCurrent
                        ? "bg-primary/20 ring-2 ring-primary"
                        : isActive
                          ? "bg-primary/10"
                          : "bg-muted"
                    }`}
                  >
                    <span className="text-xl">{levelEmojis[level]}</span>
                  </div>
                  <span className="text-xs font-medium text-foreground">{level}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
