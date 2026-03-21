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
const initialHobbies: Hobby[] = [
  { id: "1", name: "Guitar", level: "Seed", streak: 1, xp: 25, maxXp: 100, waterLevel: 60, careActions: 2 },
  { id: "2", name: "Fitness", level: "Sprout", streak: 3, xp: 150, maxXp: 250, waterLevel: 80, careActions: 5 },
];

const initialTasks: Task[] = [
  { id: "t1", hobbyId: "1", title: "Practice chord transitions for 15 minutes", completed: false },
  { id: "t2", hobbyId: "2", title: "Complete 20 push-ups", completed: false },
];

// ---- AI TASKS ----
const aiTaskTemplates: Record<string, string[]> = {
  Guitar: ["Practice fingerpicking", "Learn a chord", "Play a song"],
  Fitness: ["30 jumping jacks", "1 min plank", "15 squats"],
  default: ["Practice 15 mins", "Watch tutorial"],
};

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
    if (totalXp >= 1000) return "Tree";
    if (totalXp >= 500) return "Plant";
    if (totalXp >= 250) return "Sprout";
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
        onAddHobby={() => setShowLanding(false)}
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
            />

            <ProgressCard
              totalXp={totalXp}
              currentLevel={getOverallLevel()}
              xpToNextLevel={100}
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
            />
          </div>
        </div>
      </main>

      {profileModalOpen && (
        <GardenerProfileModal
          profile={gardenerProfile}
          onUpdateName={() => {}}
          onClose={() => setProfileModalOpen(false)}
        />
      )}

      {/* Hobby Modal */}
      {showHobbyModal && selectedHobby && (
        <HobbyModal
          hobby={selectedHobby}
          open={showHobbyModal}
          onOpenChange={setShowHobbyModal}
          onCompleteTask={() => {}}
          onGenerateTask={() => {}}
        />
      )}

      {/* Add Hobby Modal */}
      {showAddHobbyModal && (
        <AddHobbyModal
          open={showAddHobbyModal}
          onOpenChange={setShowAddHobbyModal}
          onAddHobby={() => {}}
        />
      )}
    </div>
  );
}