"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Droplets, Star } from "lucide-react";
import { LandingPage } from "@/components/landing-page";
import { Navbar } from "@/components/navbar";
import { TodaysTasks } from "@/components/todays-tasks";
import { ProgressCard } from "@/components/progress-card";
import { PixelGarden } from "@/components/garden/pixel-garden";
import { HobbyModal } from "@/components/hobby-modal";
import { AddHobbyModal } from "@/components/add-hobby-modal";
import { AddTaskModal } from "@/components/add-task-modal";
import { GardenerProfileModal } from "@/components/gardener-profile";
import { Button } from "@/components/ui/button";
import {
  Hobby,
  Task,
  PlantLevel,
  LEVEL_XP_THRESHOLDS,
  getNextLevel,
  GardenerProfile,
  getGardenerLevel,
} from "@/lib/types";

// ---- SAME DATA ----

// Start with an empty garden for first-time visitors
const initialHobbies: Hobby[] = [];
const initialTasks: Task[] = [];


// ---- AI TASKS ----
const aiTaskTemplates: Record<string, string[]> = {
  Guitar: ["Practice fingerpicking", "Learn a chord", "Play a song"],
  Fitness: ["30 jumping jacks", "1 min plank", "15 squats"],
  default: ["Practice 15 mins", "Watch tutorial"],
};


// Gardener XP helpers (define outside of component, after HomePage)
// New XP caps for gardener levels
const GARDENER_LEVEL_THRESHOLDS = [0, 500, 1500, 3000, 5000];
// 0: Beginner, 500: Growing, 1500: Pro, 3000: Master, 5000: Max

export function getGardenerXpInLevel(totalXp: number): number {
  if (totalXp >= GARDENER_LEVEL_THRESHOLDS[4]) return totalXp - GARDENER_LEVEL_THRESHOLDS[4];
  if (totalXp >= GARDENER_LEVEL_THRESHOLDS[3]) return totalXp - GARDENER_LEVEL_THRESHOLDS[3];
  if (totalXp >= GARDENER_LEVEL_THRESHOLDS[2]) return totalXp - GARDENER_LEVEL_THRESHOLDS[2];
  if (totalXp >= GARDENER_LEVEL_THRESHOLDS[1]) return totalXp - GARDENER_LEVEL_THRESHOLDS[1];
  return totalXp;
}

export function getGardenerXpToNextLevel(totalXp: number): number {
  if (totalXp >= GARDENER_LEVEL_THRESHOLDS[4]) return 0; // Maxed out
  if (totalXp >= GARDENER_LEVEL_THRESHOLDS[3]) return GARDENER_LEVEL_THRESHOLDS[4] - totalXp;
  if (totalXp >= GARDENER_LEVEL_THRESHOLDS[2]) return GARDENER_LEVEL_THRESHOLDS[3] - totalXp;
  if (totalXp >= GARDENER_LEVEL_THRESHOLDS[1]) return GARDENER_LEVEL_THRESHOLDS[2] - totalXp;
  return GARDENER_LEVEL_THRESHOLDS[1] - totalXp;
}

export default function HomePage() {
  const [showLanding, setShowLanding] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [hobbies, setHobbies] = useState<Hobby[]>(initialHobbies);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const [gardenerProfile, setGardenerProfile] = useState<GardenerProfile>({
    name: "Gardener",
    level: "Beginner Gardener",
    totalXp: 0,
    totalTasksCompleted: 0,
    longestStreak: 0,
    joinDate: new Date(),
  });

  const [showCareAnimation, setShowCareAnimation] = useState(false);

  // Modal state for hobby and add hobby
  const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null);
  const [showHobbyModal, setShowHobbyModal] = useState(false);
  const [showAddHobbyModal, setShowAddHobbyModal] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);

    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  // 🌙 Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // ⭐ XP calc
  const totalXp = hobbies.reduce((sum, h) => sum + h.xp, 0);

  useEffect(() => {
    setGardenerProfile((prev) => ({
      ...prev,
      totalXp,
      level: getGardenerLevel(totalXp),
    }));
  }, [totalXp]);

  const getOverallLevel = (): PlantLevel => {
    if (totalXp >= 1000) return "Ripe Fruit";
    if (totalXp >= 800) return "Fruit Stage";
    if (totalXp >= 550) return "Medium Plant";
    if (totalXp >= 350) return "Small Plant";
    if (totalXp >= 200) return "Sprout";
    return "Seed";
  };

  // 🌱 CARE + LEVEL-UP
  const performPlantCare = (hobbyId: string) => {
    setShowCareAnimation(true);
    setTimeout(() => setShowCareAnimation(false), 1500);
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t))
    );

    setHobbies((prev) =>
      prev.map((h) => {
        const newXp = h.xp + 25;

        if (newXp >= LEVEL_XP_THRESHOLDS[h.level]) {
          setShowLevelUp(true);
          setTimeout(() => setShowLevelUp(false), 2000);

          return {
            ...h,
            xp: 0,
            level: getNextLevel(h.level) || h.level,
          };
        }

        return { ...h, xp: newXp };
      })
    );

    performPlantCare("1");
  };

  if (showLanding) {
    return (
      <LandingPage
        onStartGarden={() => setShowLanding(false)}
        onAddHobby={(hobbyName) => {
          setHobbies((prev) => [
            ...prev,
            {
              id: `${Date.now()}_${Math.floor(Math.random() * 100000)}`,
              name: hobbyName,
              level: "Seed",
              streak: 0,
              xp: 0,
              maxXp: 100,
              waterLevel: 50,
              careActions: 0,
            },
          ]);
          setShowLanding(false);
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
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
        onOpenProfile={() => setProfileModalOpen(true)}
        gardenerName={gardenerProfile.name}
      />



      {/* Add Task Modal */}
      <AddTaskModal
        open={showAddTaskModal}
        onOpenChange={setShowAddTaskModal}
        hobbies={hobbies}
        onAddTask={(task) => {
          setTasks((prev) => [
            ...prev,
            {
              id: `manual_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
              hobbyId: task.hobbyId,
              title: task.title,
              completed: false,
            },
          ]);
        }}
      />
  


      {/* 💧 CARE ANIMATION */}
      <AnimatePresence>
        {showCareAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-blue-500 text-white px-6 py-3 rounded-full flex gap-2">
              <Droplets /> Plant Cared!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ⭐ LEVEL UP ANIMATION */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.2 }}
            exit={{ scale: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-yellow-400 text-black px-8 py-4 rounded-xl flex gap-2 text-lg font-bold shadow-lg">
              <Star /> LEVEL UP!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          
          {/* LEFT */}
          <div className="space-y-6">
            <TodaysTasks
              tasks={tasks.filter((t) => !t.completed)}
              hobbies={hobbies}
              onCompleteTask={handleCompleteTask}
              onAddTaskClick={() => setShowAddTaskModal(true)}
            />

            <ProgressCard
              totalXp={totalXp}
              currentLevel={gardenerProfile.level}
              xpToNextLevel={getGardenerXpToNextLevel(totalXp)}
              xpInLevel={getGardenerXpInLevel(totalXp)}
            />
            <Button
              className="w-full gap-2"
              onClick={() => {
                setTasks((prevTasks) => {
                  const newTasks = [...prevTasks];
                  hobbies.forEach((hobby) => {
                    const templates = aiTaskTemplates[hobby.name] || aiTaskTemplates.default;
                    const randomTitle = templates[Math.floor(Math.random() * templates.length)];
                    // Use a more robust unique ID
                    const uniqueId = `t${Date.now()}_${hobby.id}_${Math.floor(Math.random() * 100000)}`;
                    newTasks.push({
                      id: uniqueId,
                      hobbyId: hobby.id,
                      title: randomTitle,
                      completed: false,
                    });
                  });
                  return newTasks;
                });
              }}
            >
              <Sparkles /> Generate Tasks
            </Button>
          </div>

          {/* RIGHT */}
          <div>
            <PixelGarden
              hobbies={hobbies}
              onPlantClick={(hobby) => {
                setSelectedHobby(hobby);
                setShowHobbyModal(true);
              }}
              onAddHobby={() => setShowAddHobbyModal(true)}
              onRemoveHobby={(hobbyId) => {
                setHobbies((prev) => prev.filter((h) => h.id !== hobbyId));
              }}
            />
          </div>
        </div>
      </main>

      {profileModalOpen && (
        <GardenerProfileModal
          profile={{
            ...gardenerProfile,
            totalTasksCompleted: tasks.filter(t => t.completed).length,
            longestStreak: Math.max(...hobbies.map(h => h.streak || 0), 0),
            // joinDate is already in gardenerProfile
          }}
          onUpdateName={(name) => setGardenerProfile((prev) => ({ ...prev, name }))}
          onClose={() => setProfileModalOpen(false)}
        />
      )}

      {/* Hobby Modal */}
      {showHobbyModal && selectedHobby && (
        <HobbyModal
          hobby={selectedHobby}
          tasks={tasks.filter((t) => t.hobbyId === selectedHobby.id)}
          open={showHobbyModal}
          onOpenChange={setShowHobbyModal}
          onCompleteTask={(taskId) => {
            setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, completed: true } : t));
            setHobbies((prev) => prev.map((h) => {
              if (h.id !== selectedHobby.id) return h;
              let newXp = h.xp + 25;
              let newLevel = h.level;
              let maxXp = h.maxXp;
              // Level up logic
              const nextLevel = getNextLevel(h.level);
              if (newXp >= maxXp && nextLevel) {
                newXp = newXp - maxXp;
                newLevel = nextLevel;
                maxXp = LEVEL_XP_THRESHOLDS[newLevel];
              } else if (newXp > maxXp) {
                newXp = maxXp;
              }
              return { ...h, xp: newXp, level: newLevel, maxXp, careActions: h.careActions + 1 };
            }));
          }}
          onGenerateTask={(hobbyId) => {
            const templates = aiTaskTemplates[selectedHobby.name] || aiTaskTemplates.default;
            const randomTitle = templates[Math.floor(Math.random() * templates.length)];
            const uniqueId = `t${Date.now()}_${hobbyId}_${Math.floor(Math.random() * 100000)}`;
            setTasks((prev) => [
              ...prev,
              {
                id: uniqueId,
                hobbyId,
                title: randomTitle,
                completed: false,
              },
            ]);
          }}
          onWaterPlant={(hobbyId) => {
            setHobbies((prev) => prev.map((h) =>
              h.id === hobbyId
                ? { ...h, waterLevel: Math.min(100, (h.waterLevel ?? 50) + 20), careActions: h.careActions + 1, lastCaredAt: new Date() }
                : h
            ));
          }}
        />
      )}

      {/* Add Hobby Modal */}
      {showAddHobbyModal && (
        <AddHobbyModal
          open={showAddHobbyModal}
          onOpenChange={setShowAddHobbyModal}
          onAddHobby={(hobbyName) => {
            setHobbies((prev) => [
              ...prev,
              {
                id: `${Date.now()}_${Math.floor(Math.random() * 100000)}`,
                name: hobbyName,
                level: "Seed",
                streak: 0,
                xp: 0,
                maxXp: 100,
                waterLevel: 50,
                careActions: 0,
              },
            ]);
            setShowAddHobbyModal(false);
          }}
        />
      )}
    </div>
  );
}