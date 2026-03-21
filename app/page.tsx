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
export function getGardenerXpInLevel(totalXp: number): number {
  if (totalXp >= 500) return totalXp - 500;
  if (totalXp >= 150) return totalXp - 150;
  if (totalXp >= 50) return totalXp - 50;
  return totalXp;
}

export function getGardenerXpToNextLevel(totalXp: number): number {
  if (totalXp >= 500) return 0; // Maxed out
  if (totalXp >= 150) return 500 - 150; // Pro → Master
  if (totalXp >= 50) return 150 - 50; // Growing → Pro
  return 50; // Beginner → Growing
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
      <div className="flex justify-end max-w-7xl mx-auto px-4 mt-2">
        <Button
          variant="outline"
          className="gap-2 text-sm px-4 py-2 rounded-full shadow hover:bg-green-100"
          onClick={() => setShowLanding(true)}
        >
          <span role="img" aria-label="Home">🏡</span> Back to Home
        </Button>
      </div>

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