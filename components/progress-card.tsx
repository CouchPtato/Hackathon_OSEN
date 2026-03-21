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

// 🌱 Emojis
const levelEmojis: Record<PlantLevel, string> = {
  Seed: "🌱",
  Sprout: "🌿",
  Plant: "🌾",
  Tree: "🌳",
};

// 🧠 Cleaner titles
const levelTitles: Record<PlantLevel, string> = {
  Seed: "Beginner",
  Sprout: "Growing",
  Plant: "Skilled",
  Tree: "Master",
};

export function ProgressCard({
  totalXp,
  currentLevel,
  xpToNextLevel,
}: ProgressCardProps) {
  const currentLevelIndex = LEVEL_ORDER.indexOf(currentLevel);
  const progressPercentage = Math.min(
    (totalXp / xpToNextLevel) * 100,
    100
  );

  return (
    <Card className="glass">
      <CardHeader className="pb-3">
        <CardTitle>Progress</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">

        {/* ⭐ XP */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">XP</span>
            <span className="font-medium">
              {totalXp} / {xpToNextLevel}
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

        {/* 🌿 CURRENT LEVEL */}
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-lg font-semibold"
          >
            {levelEmojis[currentLevel]} {levelTitles[currentLevel]}
          </motion.div>
        </div>

        {/* 🌱 LEVEL PATH */}
        <div className="flex justify-center gap-3 bg-secondary/50 rounded-xl p-3">
          {LEVEL_ORDER.map((level, idx) => {
            const isActive = idx <= currentLevelIndex;
            const isCurrent = level === currentLevel;

            return (
              <motion.div
                key={level}
                className={`flex flex-col items-center gap-1 ${
                  isActive ? "" : "opacity-30"
                }`}
                animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div
                  className={`p-2 rounded-full ${
                    isCurrent
                      ? "bg-green-200 ring-2 ring-green-500"
                      : isActive
                      ? "bg-green-100"
                      : "bg-muted"
                  }`}
                >
                  <span className="text-lg">{levelEmojis[level]}</span>
                </div>

                <span className="text-[10px] font-medium">
                  {levelTitles[level]}
                </span>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}