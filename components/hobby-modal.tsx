"use client";

import { motion } from "framer-motion";
import { Flame, Sprout, Leaf, Flower2, TreeDeciduous } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Hobby, PlantLevel, LEVEL_ORDER, LEVEL_XP_THRESHOLDS } from "@/lib/types";

interface HobbyModalProps {
  hobby: Hobby | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompleteTask: (hobbyId: string) => void;
}

const levelIcons: Record<PlantLevel, React.ReactNode> = {
  Seed: <Sprout className="h-8 w-8" />,
  Sprout: <Leaf className="h-8 w-8" />,
  Plant: <Flower2 className="h-8 w-8" />,
  Tree: <TreeDeciduous className="h-8 w-8" />,
};

export function HobbyModal({
  hobby,
  open,
  onOpenChange,
  onCompleteTask,
}: HobbyModalProps) {
  if (!hobby) return null;

  const progressPercentage = Math.min(
    (hobby.xp / LEVEL_XP_THRESHOLDS[hobby.level]) * 100,
    100
  );
  const levelIndex = LEVEL_ORDER.indexOf(hobby.level);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <motion.div
              className="text-primary"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              {levelIcons[hobby.level]}
            </motion.div>
            {hobby.name}
          </DialogTitle>
          <DialogDescription>
            Keep nurturing your hobby to watch it grow!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Level & Streak Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Level:</span>
              <span className="font-semibold text-primary">{hobby.level}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="font-medium text-orange-700">
                {hobby.streak} day streak
              </span>
            </div>
          </div>

          {/* XP Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">XP Progress</span>
              <span className="font-medium">
                {hobby.xp} / {LEVEL_XP_THRESHOLDS[hobby.level]} XP
              </span>
            </div>
            <Progress value={progressPercentage} />
            {levelIndex < LEVEL_ORDER.length - 1 && (
              <p className="text-xs text-muted-foreground">
                Next level: {LEVEL_ORDER[levelIndex + 1]}
              </p>
            )}
          </div>

          {/* Level progression visual */}
          <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-3">
            {LEVEL_ORDER.map((level, idx) => {
              const isActive = idx <= levelIndex;
              const isCurrent = level === hobby.level;

              return (
                <div
                  key={level}
                  className={`flex flex-col items-center gap-1 ${
                    isActive ? "text-primary" : "text-muted-foreground/40"
                  }`}
                >
                  <div
                    className={`rounded-full p-1.5 ${
                      isCurrent
                        ? "bg-primary/20 ring-2 ring-primary"
                        : isActive
                          ? "bg-primary/10"
                          : "bg-muted"
                    }`}
                  >
                    {levelIcons[level]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Complete Task Button */}
          <Button
            onClick={() => {
              onCompleteTask(hobby.id);
              onOpenChange(false);
            }}
            className="w-full"
            size="lg"
          >
            Complete Task (+25 XP)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
