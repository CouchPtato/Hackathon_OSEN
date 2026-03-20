"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Flame, Scroll } from "lucide-react";
import type { Task, Hobby } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  tasks: Task[];
  hobbies: Hobby[];
  onCompleteTask: (taskId: string, hobbyId: string) => void;
}

export function TaskCard({ tasks, hobbies, onCompleteTask }: TaskCardProps) {
  const [completingTask, setCompletingTask] = useState<string | null>(null);
  const [showStreakPopup, setShowStreakPopup] = useState<string | null>(null);

  const getHobbyName = (hobbyId: string) => {
    return hobbies.find((h) => h._id === hobbyId)?.name || "Unknown";
  };

  const handleComplete = (task: Task) => {
    if (task.completed) return;
    
    setCompletingTask(task._id);
    setShowStreakPopup(task._id);
    
    setTimeout(() => {
      onCompleteTask(task._id, task.hobbyId);
      setCompletingTask(null);
    }, 300);

    setTimeout(() => {
      setShowStreakPopup(null);
    }, 1000);
  };

  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Scroll className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Today&apos;s Tasks</h2>
          <p className="text-sm text-muted-foreground">
            {incompleteTasks.length} remaining
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {incompleteTasks.map((task) => (
            <motion.div
              key={task._id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              className="relative"
            >
              <div
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/50 transition-all cursor-pointer hover:bg-secondary",
                  completingTask === task._id && "bg-primary/10 border-primary/30"
                )}
                onClick={() => handleComplete(task)}
              >
                {/* Checkbox */}
                <motion.div
                  className={cn(
                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors",
                    completingTask === task._id
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/30 hover:border-primary/50"
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {completingTask === task._id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="check-animate"
                    >
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Task info */}
                <div className="flex-1">
                  <p className="font-medium text-foreground">{task.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {getHobbyName(task.hobbyId)}
                  </p>
                </div>
              </div>

              {/* Streak popup */}
              <AnimatePresence>
                {showStreakPopup === task._id && (
                  <motion.div
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: 1, y: -10, scale: 1 }}
                    exit={{ opacity: 0, y: -40, scale: 1.2 }}
                    className="absolute right-4 top-0 flex items-center gap-1 text-streak font-bold"
                  >
                    <Flame className="w-4 h-4" />
                    <span>+1 streak</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Completed tasks */}
        {completedTasks.length > 0 && (
          <div className="pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-3">
              Completed ({completedTasks.length})
            </p>
            {completedTasks.map((task) => (
              <div
                key={task._id}
                className="flex items-center gap-4 p-3 rounded-xl opacity-60"
              >
                <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
                <p className="font-medium text-foreground line-through">
                  {task.title}
                </p>
              </div>
            ))}
          </div>
        )}

        {tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No tasks yet. Generate some with AI!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
