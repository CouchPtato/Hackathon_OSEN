"use client";

import { motion } from "framer-motion";
import { Flame, Droplet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Hobby, PlantLevel } from "@/lib/types";
import { GrowthStage, getPlantComponent } from "@/components/garden/plant-graphics";

interface HobbyCardProps {
  hobby: Hobby;
  onClick: () => void;
  recentlyCared?: boolean;
}

// Convert plant level to growth stage
function levelToStage(level: PlantLevel): GrowthStage {
  switch (level) {
    case "Seed": return 1;
    case "Sprout": return 2;
    case "Plant": return 3;
    case "Tree": return 4;
    default: return 1;
  }
}

export function HobbyCard({ hobby, onClick, recentlyCared = false }: HobbyCardProps) {
  const stage = levelToStage(hobby.level);
  const PlantComponent = getPlantComponent(hobby.name);
  const waterLevel = hobby.waterLevel ?? 50;
  const isWatered = waterLevel > 70;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card
        className={`cursor-pointer transition-all hover:shadow-lg overflow-hidden relative ${
          recentlyCared ? "ring-2 ring-primary ring-offset-2" : ""
        }`}
        onClick={onClick}
      >
        {/* Glow effect when recently cared */}
        {recentlyCared && (
          <motion.div
            className="absolute inset-0 bg-primary/10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 1.5 }}
          />
        )}
        
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col items-center text-center gap-2">
            {/* Plant SVG */}
            <motion.div
              className="h-20 w-20 sm:h-24 sm:w-24"
              animate={{ 
                y: [0, -2, 0],
                scale: recentlyCared ? [1, 1.1, 1] : 1
              }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.5 }
              }}
            >
              <PlantComponent stage={stage} isWatered={isWatered} className="w-full h-full" />
            </motion.div>

            {/* Hobby Name */}
            <h3 className="font-semibold text-foreground text-sm sm:text-base line-clamp-1">
              {hobby.name}
            </h3>

            {/* Level indicator */}
            <span className="text-xs text-muted-foreground">{hobby.level}</span>

            {/* Water level bar */}
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
                  className={`h-full rounded-full ${
                    waterLevel > 70 ? "bg-sky-400" : 
                    waterLevel > 30 ? "bg-sky-300" : "bg-amber-400"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${waterLevel}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* XP Progress */}
            <div className="w-full">
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(hobby.xp / hobby.maxXp) * 100}%` }}
                  transition={{ duration: 0.5 }}
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
