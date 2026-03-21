"use client";

import { motion } from "framer-motion";
import { Sprout, Leaf, TreeDeciduous, Flower2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlantLevel, LEVEL_ORDER } from "@/lib/types";

interface ProgressCardProps {
  totalXp: number;
  currentLevel: PlantLevel;
  xpToNextLevel: number;
}

const levelIcons: Record<PlantLevel, React.ReactNode> = {
  Seed: <Sprout className="h-5 w-5" />,
  Sprout: <Leaf className="h-5 w-5" />,
  Plant: <Flower2 className="h-5 w-5" />,
  Tree: <TreeDeciduous className="h-5 w-5" />,
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

        {/* Level Display */}
        <div className="flex items-center gap-2 rounded-xl bg-secondary/50 p-3">
          <div className="flex items-center gap-3">
            {LEVEL_ORDER.map((level, idx) => {
              const isActive = idx <= currentLevelIndex;
              const isCurrent = level === currentLevel;

              return (
                <motion.div
                  key={level}
                  className={`flex flex-col items-center gap-1 ${
                    isActive ? "text-primary" : "text-muted-foreground/40"
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
                    {levelIcons[level]}
                  </div>
                  <span className="text-xs font-medium">{level}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
