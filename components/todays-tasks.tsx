"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Task, Hobby } from "@/lib/types";
import { useState } from "react";

interface TodaysTasksProps {
  tasks: Task[];
  hobbies: Hobby[];
  onCompleteTask: (taskId: string) => void;
  onAddTaskClick: () => void;
}

export function TodaysTasks({
  tasks,
  hobbies,
  onCompleteTask,
  onAddTaskClick,
}: TodaysTasksProps) {
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<string | null>(null);

  const handleComplete = (taskId: string) => {
    setCompletingTaskId(taskId);
    setShowPopup(taskId);

    setTimeout(() => {
      onCompleteTask(taskId);
      setCompletingTaskId(null);
    }, 300);

    setTimeout(() => {
      setShowPopup(null);
    }, 1200);
  };

  const getHobbyName = (hobbyId: string) => {
    return hobbies.find((h) => h.id === hobbyId)?.name || "Unknown";
  };

  return (
    <Card className="glass glow-green">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle>Today's Tasks</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-xs px-3 py-1 rounded-full shadow hover:bg-green-100"
          onClick={onAddTaskClick}
        >
          <span role="img" aria-label="Add Task">➕</span> Add Task
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 max-h-40 overflow-y-auto">
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
                  className={`
                    flex items-center gap-3 rounded-xl p-3 transition-all
                    ${
                      task.completed
                        ? "bg-green-100/40 dark:bg-green-900/20"
                        : "bg-secondary/50 hover:bg-secondary"
                    }
                  `}
                >
                  {/* ✅ CHECK */}
                  <button
                    onClick={() => !task.completed && handleComplete(task.id)}
                    disabled={task.completed}
                    className="flex-shrink-0"
                  >
                    <motion.div
                      animate={
                        completingTaskId === task.id
                          ? { scale: [1, 1.4, 1] }
                          : {}
                      }
                    >
                      {task.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground hover:text-green-500 transition-colors" />
                      )}
                    </motion.div>
                  </button>
                  {/* 📄 TEXT */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        task.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getHobbyName(task.hobbyId)}
                    </p>
                  </div>
                </div>
                {/* 💥 XP + STREAK POPUP */}
                <AnimatePresence>
                  {showPopup === task.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, y: 0 }}
                      animate={{ opacity: 1, scale: 1.2, y: -15 }}
                      exit={{ opacity: 0, scale: 1, y: -25 }}
                      className="absolute right-2 top-0 flex flex-col items-end gap-1 pointer-events-none"
                    >
                      {/* XP */}
                      <div className="text-green-500 font-bold text-sm">
                        +25 XP
                      </div>
                      {/* STREAK */}
                      <div className="flex items-center gap-1 text-orange-500 font-semibold text-xs">
                        <Flame className="h-3 w-3" />
                        +1 streak
                      </div>
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