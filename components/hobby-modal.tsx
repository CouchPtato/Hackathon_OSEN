"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Hobby, PlantLevel } from "@/lib/types";

interface HobbyModalProps {
  hobby: Hobby | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompleteTask: (hobbyId: string) => void;
  onGenerateTask: (hobbyId: string) => void;
}

const levelEmojis: Record<PlantLevel, string> = {
  Seed: "🌱",
  Sprout: "🌿",
  Plant: "🌾",
  Tree: "🌳",
};

export function HobbyModal({
  hobby,
  open,
  onOpenChange,
  onCompleteTask,
  onGenerateTask,
}: HobbyModalProps) {
  if (!hobby) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>{hobby.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-6 space-y-6">
          {/* Big Emoji Plant */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-8xl"
          >
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {levelEmojis[hobby.level]}
            </motion.span>
          </motion.div>

          {/* Hobby Name */}
          <h2 className="text-2xl font-bold text-foreground">{hobby.name}</h2>

          {/* Streak Count */}
          <div className="flex items-center gap-2 rounded-full bg-orange-100 dark:bg-orange-900/30 px-4 py-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="font-semibold text-orange-700 dark:text-orange-400">
              {hobby.streak} day streak
            </span>
          </div>

          {/* Level Badge */}
          <div className="text-sm text-muted-foreground">
            Level: <span className="font-medium text-primary">{hobby.level}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full mt-4">
            <Button
              onClick={() => {
                onCompleteTask(hobby.id);
                onOpenChange(false);
              }}
              size="lg"
              className="w-full"
            >
              Complete Task
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
              Generate Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
