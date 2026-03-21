"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { LandingPage } from "@/components/landing-page";
import { Navbar } from "@/components/navbar";
import { TodaysTasks } from "@/components/todays-tasks";
import { ProgressCard } from "@/components/progress-card";
import { GardenView } from "@/components/garden-view";
import { HobbyModal } from "@/components/hobby-modal";
import { AddHobbyModal } from "@/components/add-hobby-modal";
import { Button } from "@/components/ui/button";
import {
  Hobby,
  Task,
  PlantLevel,
  LEVEL_XP_THRESHOLDS,
  getNextLevel,
} from "@/lib/types";

// Initial mock data
const initialHobbies: Hobby[] = [
  { id: "1", name: "Guitar", level: "Seed", streak: 1, xp: 25, maxXp: 100 },
  { id: "2", name: "Fitness", level: "Sprout", streak: 3, xp: 150, maxXp: 250 },
];

const initialTasks: Task[] = [
  {
    id: "t1",
    hobbyId: "1",
    title: "Practice chord transitions for 15 minutes",
    completed: false,
  },
  {
    id: "t2",
    hobbyId: "2",
    title: "Complete 20 push-ups",
    completed: false,
  },
  {
    id: "t3",
    hobbyId: "2",
    title: "Do 10 minutes of stretching",
    completed: false,
  },
];

// AI task templates per hobby
const aiTaskTemplates: Record<string, string[]> = {
  Guitar: [
    "Practice fingerpicking for 10 minutes",
    "Learn a new chord shape",
    "Play your favorite song from memory",
    "Work on strumming patterns",
    "Practice scales for 5 minutes",
  ],
  Fitness: [
    "Do 30 jumping jacks",
    "Hold a plank for 1 minute",
    "Take a 15-minute walk",
    "Do 15 squats",
    "Complete a 10-minute HIIT session",
  ],
  Painting: [
    "Sketch something around you",
    "Practice color mixing",
    "Draw 5 quick gesture drawings",
    "Paint a simple landscape",
  ],
  Reading: [
    "Read for 20 minutes",
    "Summarize what you read today",
    "Add a book to your reading list",
    "Read one chapter of your current book",
  ],
  Cooking: [
    "Try a new recipe",
    "Practice knife skills for 10 minutes",
    "Plan meals for the week",
    "Cook without a recipe",
  ],
  Photography: [
    "Take 10 photos of nature",
    "Practice portrait lighting",
    "Edit one of your old photos",
    "Learn a new technique online",
  ],
  Writing: [
    "Write for 15 minutes non-stop",
    "Complete a journal entry",
    "Write a short poem",
    "Outline an article idea",
  ],
  Gardening: [
    "Water your plants",
    "Check for pests",
    "Research a new plant to grow",
    "Prune dead leaves",
  ],
  default: [
    "Practice for 15 minutes",
    "Watch a tutorial video",
    "Set a small goal for today",
    "Review your progress",
  ],
};

export default function HomePage() {
  const [showLanding, setShowLanding] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [hobbies, setHobbies] = useState<Hobby[]>(initialHobbies);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null);
  const [hobbyModalOpen, setHobbyModalOpen] = useState(false);
  const [addHobbyModalOpen, setAddHobbyModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Calculate total XP
  const totalXp = hobbies.reduce((sum, h) => sum + h.xp, 0);

  // Determine overall level based on total XP
  const getOverallLevel = (): PlantLevel => {
    if (totalXp >= 1000) return "Tree";
    if (totalXp >= 500) return "Plant";
    if (totalXp >= 250) return "Sprout";
    return "Seed";
  };

  const getXpToNextLevel = (): number => {
    const level = getOverallLevel();
    const nextLevel = getNextLevel(level);
    if (!nextLevel) return LEVEL_XP_THRESHOLDS.Tree;
    return LEVEL_XP_THRESHOLDS[nextLevel];
  };

  // Handle task completion
  const handleCompleteTask = useCallback(
    (taskId: string) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t))
      );

      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        setHobbies((prev) =>
          prev.map((h) => {
            if (h.id === task.hobbyId) {
              const newXp = h.xp + 25;
              const threshold = LEVEL_XP_THRESHOLDS[h.level];
              let newLevel = h.level;

              if (newXp >= threshold) {
                const next = getNextLevel(h.level);
                if (next) newLevel = next;
              }

              return {
                ...h,
                xp:
                  newXp >= threshold && newLevel !== h.level
                    ? newXp - threshold
                    : newXp,
                level: newLevel,
                streak: h.streak + 1,
              };
            }
            return h;
          })
        );
      }
    },
    [tasks]
  );

  // Handle completing task from hobby modal
  const handleCompleteTaskFromModal = useCallback(
    (hobbyId: string) => {
      const hobbyTasks = tasks.filter(
        (t) => t.hobbyId === hobbyId && !t.completed
      );

      if (hobbyTasks.length > 0) {
        handleCompleteTask(hobbyTasks[0].id);
      } else {
        setHobbies((prev) =>
          prev.map((h) => {
            if (h.id === hobbyId) {
              const newXp = h.xp + 25;
              const threshold = LEVEL_XP_THRESHOLDS[h.level];
              let newLevel = h.level;

              if (newXp >= threshold) {
                const next = getNextLevel(h.level);
                if (next) newLevel = next;
              }

              return {
                ...h,
                xp:
                  newXp >= threshold && newLevel !== h.level
                    ? newXp - threshold
                    : newXp,
                level: newLevel,
                streak: h.streak + 1,
              };
            }
            return h;
          })
        );
      }
    },
    [tasks, handleCompleteTask]
  );

  // Handle adding new hobby
  const handleAddHobby = useCallback((name: string) => {
    const newHobby: Hobby = {
      id: `hobby-${Date.now()}`,
      name,
      level: "Seed",
      streak: 0,
      xp: 0,
      maxXp: 100,
    };
    setHobbies((prev) => [...prev, newHobby]);
    setShowLanding(false);
  }, []);

  // Generate AI task for specific hobby
  const handleGenerateTaskForHobby = useCallback(
    (hobbyId: string) => {
      setHobbies((currentHobbies) => {
        const hobby = currentHobbies.find((h) => h.id === hobbyId);
        if (!hobby) return currentHobbies;

        const templates =
          aiTaskTemplates[hobby.name] || aiTaskTemplates.default;
        const randomTask =
          templates[Math.floor(Math.random() * templates.length)];

        const newTask: Task = {
          id: `task-${Date.now()}`,
          hobbyId: hobby.id,
          title: randomTask,
          completed: false,
        };

        setTasks((prev) => [...prev, newTask]);
        return currentHobbies;
      });
    },
    []
  );

  // Generate AI tasks for all hobbies
  const handleGenerateAITasks = useCallback(async () => {
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newTasks: Task[] = [];

    hobbies.forEach((hobby) => {
      const templates =
        aiTaskTemplates[hobby.name] || aiTaskTemplates.default;
      const randomTask =
        templates[Math.floor(Math.random() * templates.length)];

      newTasks.push({
        id: `task-${Date.now()}-${hobby.id}`,
        hobbyId: hobby.id,
        title: randomTask,
        completed: false,
      });
    });

    setTasks((prev) => [...prev.filter((t) => !t.completed), ...newTasks]);
    setIsGenerating(false);
  }, [hobbies]);

  // Handle plant click
  const handlePlantClick = (hobby: Hobby) => {
    setSelectedHobby(hobby);
    setHobbyModalOpen(true);
  };

  // Show landing page
  if (showLanding) {
    return (
      <LandingPage
        onStartGarden={() => setShowLanding(false)}
        onAddHobby={handleAddHobby}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        totalXp={totalXp}
        level={getOverallLevel()}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          {/* Left Column - Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <TodaysTasks
              tasks={tasks.filter((t) => !t.completed)}
              hobbies={hobbies}
              onCompleteTask={handleCompleteTask}
            />

            <ProgressCard
              totalXp={totalXp}
              currentLevel={getOverallLevel()}
              xpToNextLevel={getXpToNextLevel()}
            />

            <Button
              onClick={handleGenerateAITasks}
              disabled={isGenerating || hobbies.length === 0}
              className="w-full gap-2"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate AI Tasks
                </>
              )}
            </Button>
          </motion.div>

          {/* Right Column - Garden View */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GardenView
              hobbies={hobbies}
              onPlantClick={handlePlantClick}
              onAddHobby={() => setAddHobbyModalOpen(true)}
            />
          </motion.div>
        </div>
      </main>

      {/* Modals */}
      <HobbyModal
        hobby={selectedHobby}
        open={hobbyModalOpen}
        onOpenChange={setHobbyModalOpen}
        onCompleteTask={handleCompleteTaskFromModal}
        onGenerateTask={handleGenerateTaskForHobby}
      />

      <AddHobbyModal
        open={addHobbyModalOpen}
        onOpenChange={setAddHobbyModalOpen}
        onAddHobby={handleAddHobby}
      />
    </div>
  );
}
