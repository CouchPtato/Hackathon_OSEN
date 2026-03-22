"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { GardenerLevel, GARDENER_LEVELS } from "@/lib/types";

interface ProgressCardProps {
  totalXp: number;
  currentLevel: GardenerLevel;
  xpToNextLevel: number;
  xpInLevel: number;
}

// Gardener emojis and titles
const gardenerEmojis: Record<GardenerLevel, string> = {
  "Beginner Gardener": "🧑‍🌾",
  "Growing Gardener": "🌱",
  "Pro Gardener": "🌿",
  "Master Gardener": "🌳",
};

export function ProgressCard({
  totalXp,
  currentLevel,
  xpToNextLevel,
  xpInLevel,
}: ProgressCardProps) {
  const currentLevelIndex = GARDENER_LEVELS.findIndex(l => l.level === currentLevel);
  const progressPercentage = xpToNextLevel === 0 ? 100 : Math.min((xpInLevel / xpToNextLevel) * 100, 100);

  return (
    <Card className="glass glow-emerald">
      <CardHeader className="pb-3">
        <CardTitle>Progress</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">

        {/* ⭐ XP */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">XP</span>
            <span className="font-medium">
              {xpInLevel} / {xpToNextLevel}
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

        {/* 👨‍🌾 CURRENT GARDENER LEVEL */}
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-lg font-semibold"
          >
            {gardenerEmojis[currentLevel]} {currentLevel}
          </motion.div>
        </div>

        {/* 👨‍🌾 GARDENER LEVEL PATH */}
        <div className="flex justify-center gap-3 bg-secondary/50 rounded-xl p-3">
          {GARDENER_LEVELS.map((l, idx) => {
            const isActive = idx <= currentLevelIndex;
            const isCurrent = l.level === currentLevel;
            return (
              <motion.div
                key={l.level}
                className={`flex flex-col items-center gap-1 ${isActive ? "" : "opacity-30"}`}
                animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className={`p-2 rounded-full ${isCurrent ? "bg-green-200 ring-2 ring-green-500" : isActive ? "bg-green-100" : "bg-muted"}`}>
                  <span className="text-lg">{gardenerEmojis[l.level]}</span>
                </div>
                <span className="text-[10px] font-medium">{l.level}</span>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}