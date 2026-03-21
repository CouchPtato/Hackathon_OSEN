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
import { Hobby } from "@/lib/types";
import { PixelPlant, levelToPixelStage } from "@/components/garden/pixel-plants";

interface HobbyModalProps {
  hobby: Hobby | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompleteTask: (hobbyId: string) => void;
  onGenerateTask: (hobbyId: string) => void;
}

export function HobbyModal({
  hobby,
  open,
  onOpenChange,
  onCompleteTask,
  onGenerateTask,
}: HobbyModalProps) {
  if (!hobby) return null;

  const stage = levelToPixelStage(hobby.level);
  const waterLevel = hobby.waterLevel ?? 50;
  const isWatered = waterLevel > 70;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>{hobby.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-6 space-y-5">

          {/* 🌱 PLANT */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="h-32 w-32 relative"
          >
            {/* glow */}
            <motion.div
              className="absolute inset-0 bg-green-400/20 blur-xl rounded-full"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="h-full w-full flex items-end justify-center"
              style={{ imageRendering: "pixelated" }}
            >
              <PixelPlant
                stage={stage}
                hobbyName={hobby.name}
                isWatered={isWatered}
                className="w-full h-full scale-110"
              />
            </motion.div>
          </motion.div>

          {/* 🌿 NAME */}
          <h2 className="text-2xl font-bold">{hobby.name}</h2>

          {/* 🔥 STATS */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-orange-100 dark:bg-orange-900/30 px-3 py-1.5 rounded-full">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-semibold">{hobby.streak} day</span>
            </div>

            <div className="flex items-center gap-1.5 bg-sky-100 dark:bg-sky-900/30 px-3 py-1.5 rounded-full">
              <Droplet className="h-4 w-4 text-sky-500" />
              <span className="text-sm font-semibold">{waterLevel}%</span>
            </div>
          </div>

          {/* ⭐ XP */}
          <div className="w-full px-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {hobby.level}
              </span>
              <span>{hobby.xp}/{hobby.maxXp} XP</span>
            </div>

            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                initial={{ width: 0 }}
                animate={{
                  width: `${(hobby.xp / hobby.maxXp) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* 💡 INFO */}
          <p className="text-sm text-muted-foreground text-center">
            Complete tasks to grow your plant 🌱
          </p>

          {/* 🎯 ACTIONS */}
          <div className="flex flex-col gap-3 w-full mt-2">

            {/* ✅ COMPLETE TASK */}
            <Button
              onClick={() => {
                onCompleteTask(hobby.id);
                onOpenChange(false);
              }}
              size="lg"
              className="w-full gap-2 relative overflow-hidden"
            >
              <CheckCircle2 className="h-4 w-4" />
              Complete Task

              {/* 💥 XP POP EFFECT */}
              <motion.span
                className="absolute right-3 text-xs text-white/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 0], y: [-5, -20] }}
                transition={{ duration: 1.2 }}
              >
                +25 XP
              </motion.span>
            </Button>

            {/* ✨ GENERATE TASK */}
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
              New Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}