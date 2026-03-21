"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task, Hobby } from "@/lib/types";
import { useState } from "react";

interface TodaysTasksProps {
  tasks: Task[];
  hobbies: Hobby[];
  onCompleteTask: (taskId: string) => void;
}

export function TodaysTasks({
  tasks,
  hobbies,
  onCompleteTask,
}: TodaysTasksProps) {
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);
  const [showStreakPopup, setShowStreakPopup] = useState<string | null>(null);

  const handleComplete = (taskId: string) => {
    setCompletingTaskId(taskId);
    setShowStreakPopup(taskId);

    setTimeout(() => {
      onCompleteTask(taskId);
      setCompletingTaskId(null);
    }, 300);

    setTimeout(() => {
      setShowStreakPopup(null);
    }, 1000);
  };

  const getHobbyName = (hobbyId: string) => {
    return hobbies.find((h) => h.id === hobbyId)?.name || "Unknown";
  };

  return (
    <Card className="glass">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <span>Today&apos;s Tasks</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No tasks yet. Generate some AI tasks!
          </p>
        ) : (
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative"
              >
                <div
                  className={`flex items-center gap-3 rounded-xl p-3 transition-all ${
                    task.completed
                      ? "bg-primary/10"
                      : "bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  <button
                    onClick={() => !task.completed && handleComplete(task.id)}
                    disabled={task.completed}
                    className="flex-shrink-0 focus:outline-none"
                  >
                    <motion.div
                      animate={
                        completingTaskId === task.id
                          ? { scale: [1, 1.3, 1] }
                          : {}
                      }
                    >
                      {task.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                      )}
                    </motion.div>
                  </button>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        task.completed
                          ? "line-through text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getHobbyName(task.hobbyId)}
                    </p>
                  </div>
                </div>

                {/* Streak Popup */}
                <AnimatePresence>
                  {showStreakPopup === task.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, y: 0 }}
                      animate={{ opacity: 1, scale: 1.2, y: -10 }}
                      exit={{ opacity: 0, scale: 1, y: -20 }}
                      className="absolute right-2 top-0 flex items-center gap-1 text-orange-500 font-bold text-sm pointer-events-none"
                    >
                      <Flame className="h-4 w-4" />
                      <span>+1 streak</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  );
}
