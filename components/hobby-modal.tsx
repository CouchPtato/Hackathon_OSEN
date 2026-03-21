"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles, Droplet, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Hobby, PlantLevel } from "@/lib/types";
import { PixelPlant, levelToPixelStage } from "@/components/garden/pixel-plants";

interface HobbyModalProps {
  hobby: Hobby | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompleteTask: (hobbyId: string) => void;
  onGenerateTask: (hobbyId: string) => void;
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

export function HobbyModal({
  hobby,
  open,
  onOpenChange,
  onCompleteTask,
  onGenerateTask,
}: HobbyModalProps) {
  if (!hobby) return null;

  const PlantComponent = getPlantComponent(hobby.name);
  const stage = levelToStage(hobby.level);
  const waterLevel = hobby.waterLevel ?? 50;
  const isWatered = waterLevel > 70;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>{hobby.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-6 space-y-5">
          {/* Plant SVG */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="h-32 w-32"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="h-full w-full"
            >
              <PlantComponent stage={stage} isWatered={isWatered} className="w-full h-full" />
            </motion.div>
          </motion.div>

          {/* Hobby Name */}
          <h2 className="text-2xl font-bold text-foreground">{hobby.name}</h2>

          {/* Stats Row */}
          <div className="flex items-center gap-4">
            {/* Streak Count */}
            <div className="flex items-center gap-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 px-3 py-1.5">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-semibold text-orange-700 dark:text-orange-400">
                {hobby.streak} day
              </span>
            </div>

            {/* Water Level */}
            <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${
              waterLevel > 70 
                ? "bg-sky-100 dark:bg-sky-900/30" 
                : waterLevel > 30 
                  ? "bg-sky-50 dark:bg-sky-900/20"
                  : "bg-amber-100 dark:bg-amber-900/30"
            }`}>
              <Droplet className={`h-4 w-4 ${
                waterLevel > 70 ? "text-sky-500" : waterLevel > 30 ? "text-sky-400" : "text-amber-500"
              }`} />
              <span className={`text-sm font-semibold ${
                waterLevel > 70 
                  ? "text-sky-700 dark:text-sky-400" 
                  : waterLevel > 30 
                    ? "text-sky-600 dark:text-sky-400"
                    : "text-amber-700 dark:text-amber-400"
              }`}>
                {waterLevel}%
              </span>
            </div>
          </div>

          {/* Level Badge and XP Progress */}
          <div className="w-full space-y-2 px-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Level: <span className="font-medium text-primary">{hobby.level}</span>
              </span>
              <span className="text-muted-foreground">
                {hobby.xp}/{hobby.maxXp} XP
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(hobby.xp / hobby.maxXp) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Care Actions Info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>{hobby.careActions || 0} care actions performed</span>
          </div>

          {/* Task Completion Note */}
          <div className="bg-secondary/50 rounded-lg p-3 text-center text-sm text-muted-foreground">
            <span>Completing tasks automatically waters and nurtures your plant!</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full mt-2">
            <Button
              onClick={() => {
                onCompleteTask(hobby.id);
                onOpenChange(false);
              }}
              size="lg"
              className="w-full gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              Complete Task & Care for Plant
            </Button>
            <Button
              onClick={() => {
                onGenerateTask(hobby.id);
                onOpenChange(false);
              }}
              variant="outline"
              size="lg"
              className="w-full gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Generate New Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
