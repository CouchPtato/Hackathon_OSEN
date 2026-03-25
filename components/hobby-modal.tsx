"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles, Droplet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Hobby } from "@/lib/types";
import { PixelPlant, levelToPixelStage } from "@/components/garden/pixel-plants";

import { Task } from "@/lib/types";

interface HobbyModalProps {
  hobby: Hobby | null;
  tasks: Task[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompleteTask: (taskId: string) => void;
  onGenerateTask: (hobbyId: string) => void;
  onWaterPlant: (hobbyId: string) => void;
}

export function HobbyModal({
  hobby,
  tasks,
  open,
  onOpenChange,
  onCompleteTask,
  onGenerateTask,
  onWaterPlant,
}: HobbyModalProps) {
  if (!hobby) return null;

  const stage = levelToPixelStage(hobby.level);
  const waterLevel = hobby.waterLevel ?? 50;
  const isWatered = waterLevel > 70;

  // Sort tasks: incomplete first
  const sortedTasks = [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));

  // Handler for completing a task
  const handleCompleteTask = (taskId: string) => {
    onCompleteTask(taskId);
  };

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
            <motion.div
              className="absolute inset-0 bg-green-400/20 blur-xl rounded-full glow-green"
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
              <span className="text-sm font-semibold">{hobby.streak} day streak</span>
            </div>
            <div className="flex items-center gap-1.5 bg-sky-100 dark:bg-sky-900/30 px-3 py-1.5 rounded-full">
              <Droplet className="h-4 w-4 text-sky-500" />
              <span className="text-sm font-semibold">{waterLevel}%</span>
            </div>
            <div className="flex items-center gap-1.5 bg-green-100 dark:bg-green-900/30 px-3 py-1.5 rounded-full">
              <span className="text-green-700 text-xs">Care: {hobby.careActions}</span>
            </div>
          </div>

          {/* ⭐ XP */}
          <div className="w-full px-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{hobby.level}</span>
              <span>{hobby.xp}/{hobby.maxXp} XP</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${(hobby.xp / hobby.maxXp) * 100}%` }}
              />
            </div>
          </div>

          {/* 💧 WATER PLANT */}
          <Button
            onClick={() => onWaterPlant(hobby.id)}
            variant="secondary"
            className="w-full gap-2"
          >
            <Droplet className="h-4 w-4" />
            Water Plant
          </Button>

          {/* 📋 TASKS FOR THIS PLANT */}
          <div className="w-full mt-2">
            <h3 className="text-base font-semibold mb-2">Tasks</h3>
            <div className="max-h-20 overflow-y-auto pr-1">
              {sortedTasks.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center">No tasks for this plant.</p>
              ) : (
                <ul className="space-y-2">
                  {sortedTasks.map((task) => (
                    <li key={task.id} className="flex items-center gap-2">
                      <input
                        id={`task-complete-${task.id}`}
                        name={`task-complete-${task.id}`}
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleCompleteTask(task.id)}
                        className="accent-green-500 h-4 w-4"
                        disabled={task.completed}
                      />
                      <span className={task.completed ? "line-through text-muted-foreground" : ""}>{task.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* ✨ GENERATE TASK */}
          <Button
            onClick={() => onGenerateTask(hobby.id)}
            variant="outline"
            size="lg"
            className="w-full gap-2"
          >
            <Sparkles className="h-4 w-4" />
            New Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}