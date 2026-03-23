"use client";

import { motion } from "framer-motion";
import { Flame, Droplet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Hobby, PlantLevel, Task } from "@/lib/types";
import { PixelPlant, GrowthStage, getPlantSpriteFolder, PLANT_SCALES } from "@/components/garden/pixel-plants";

interface HobbyCardProps {
  hobby: Hobby;
  tasks?: Task[];
  onClick: () => void;
  recentlyCared?: boolean;
}

// 🌱 Level → stage
function levelToStage(level: PlantLevel): GrowthStage {
  switch (level) {
    case "Seed": return 1;
    case "Sprout": return 2;
    case "Small Plant": return 3;
    case "Medium Plant": return 4;
    case "Fruit Stage": return 5;
    case "Ripe Fruit": return 6;
    default: return 1;
  }
}

// 🌿 Clean level display
const levelDisplay: Record<PlantLevel, string> = {
  Seed: "🌱 Beginner",
  Sprout: "🌿 Growing",
  "Small Plant": "🌾 Skilled",
  "Medium Plant": "🌳 Master",
  "Fruit Stage": "🍎 Fruiting",
  "Ripe Fruit": "✨ Complete"
};

export function HobbyCard({ hobby, tasks = [], onClick, recentlyCared = false }: HobbyCardProps) {
  const stage = levelToStage(hobby.level);
  const waterLevel = hobby.waterLevel ?? 50;
  const isWatered = waterLevel > 70;

  const xpPercent = (hobby.xp / hobby.maxXp) * 100;

  // Filter tasks for this hobby
  const hobbyTasks = tasks.filter((t: Task) => t.hobbyId === hobby.id);
  const visibleTasks = hobbyTasks.slice(0, 3);
  const hasMoreTasks = hobbyTasks.length > 3;

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card
        onClick={onClick}
        className={`
          cursor-pointer relative overflow-hidden transition-all
          hover:shadow-xl glow-green
          ${recentlyCared ? "ring-2 ring-green-400 ring-offset-2" : ""}
        `}
      >
        {/* 🌿 CARE GLOW */}
        {recentlyCared && (
          <motion.div
            className="absolute inset-0 bg-green-400/20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.5 }}
          />
        )}

        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col items-center text-center gap-2">
            {/* 📋 TASKS (max 3, scrollable) */}
            {hobbyTasks.length > 0 && (
              <div className="w-full max-h-28 overflow-y-auto mt-2 rounded bg-secondary/30">
                <ul className="divide-y divide-muted-foreground/10">
                  {visibleTasks.map((task) => (
                    <li key={task.id} className="px-2 py-1 text-xs text-left flex items-center gap-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${task.completed ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                      <span className={task.completed ? 'line-through text-muted-foreground' : ''}>{task.title}</span>
                    </li>
                  ))}
                  {hasMoreTasks && (
                    <li className="px-2 py-1 text-xs text-muted-foreground text-center">+{hobbyTasks.length - 3} more...</li>
                  )}
                </ul>
              </div>
            )}

            {/* 🌱 PLANT */}
            <motion.div
              animate={{
                y: [0, -3, 0],
                scale: recentlyCared ? [1, 1.15, 1] : 1
              }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.4 }
              }}
            >
              {/* Use same scaling as garden */}
              {(() => {
                const spriteFolder = getPlantSpriteFolder(hobby.name) as keyof typeof PLANT_SCALES;
                const plantScales = PLANT_SCALES[spriteFolder] || PLANT_SCALES["plant1"];
                const scale = plantScales[Math.min(Math.max(stage - 1, 0), 5)];
                return (
                  <div style={{ width: `${56 * scale}px`, height: `${72 * scale}px` }} className="flex items-end justify-center mx-auto">
                    <PixelPlant
                      stage={stage}
                      hobbyName={hobby.name}
                      isWatered={isWatered}
                      className="relative"
                    />
                  </div>
                );
              })()}
            </motion.div>

            {/* 🌿 NAME */}
            <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
              {hobby.name}
            </h3>

            {/* 🌱 LEVEL */}
            <span className="text-xs text-muted-foreground">
              {levelDisplay[hobby.level as PlantLevel]}
            </span>

            {/* 💧 WATER */}
            <div className="w-full space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-sky-500">
                  <Droplet className="h-3 w-3" />
                  <span>{waterLevel}%</span>
                </div>

                {hobby.streak > 0 && (
                  <div className="flex items-center gap-1 text-orange-500">
                    <Flame className="h-3 w-3" />
                    <span>{hobby.streak}</span>
                  </div>
                )}
              </div>

              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${waterLevel > 70
                    ? "bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.7)]"
                    : waterLevel > 30
                      ? "bg-sky-300"
                      : "bg-amber-400"
                    }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${waterLevel}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* ⭐ XP */}
            <div className="w-full">
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-[0_0_6px_rgba(34,197,94,0.6)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercent}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>

              <p className="text-[10px] text-muted-foreground mt-0.5">
                {hobby.xp}/{hobby.maxXp} XP
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}