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
import { AuthModal } from "@/components/auth-modal";
import {
  Hobby,
  Task,
  PlantLevel,
  LEVEL_XP_THRESHOLDS,
  getNextLevel,
  GardenerProfile,
  getGardenerLevel,
  GARDENER_LEVEL_THRESHOLDS,
  getGardenerXpInLevel,
  getGardenerXpToNextLevel,
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



export default function HomePage() {
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

  const [showLanding, setShowLanding] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [hobbies, setHobbies] = useState<Hobby[]>(initialHobbies);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);


  // Load user, hobbies, and tasks from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    const savedHobbies = localStorage.getItem('hobbies');
    const savedTasks = localStorage.getItem('tasks');
    if (savedHobbies) {
      try {
        setHobbies(JSON.parse(savedHobbies));
      } catch (e) {}
    }
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {}
    }
  }, []);

  // Save user, hobbies, and tasks to localStorage when they change
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    if (token) localStorage.setItem('token', token);
  }, [user, token]);
  useEffect(() => {
    localStorage.setItem('hobbies', JSON.stringify(hobbies));
  }, [hobbies]);
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const [gardenerProfile, setGardenerProfile] = useState<GardenerProfile>({
    name: "Gardener",
    level: "Beginner",
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

  // 🌙 Dark mode - Load from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save dark mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
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

  // Unified XP/level update logic for completing a task
  const handleCompleteTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t))
    );

    setHobbies((prev) =>
      prev.map((h) => {
        if (h.id !== task.hobbyId) return h;
        let newXp = h.xp + 25;
        let newLevel = h.level;
        let maxXp = h.maxXp;
        let newStreak = h.streak;
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const lastCared = h.lastCaredAt ? new Date(h.lastCaredAt) : null;
        const lastCaredDay = lastCared
          ? new Date(lastCared.getFullYear(), lastCared.getMonth(), lastCared.getDate())
          : null;
        if (!lastCaredDay || lastCaredDay.getTime() !== today.getTime()) {
          newStreak = h.streak === 0 ? 1 : h.streak + 1;
        }
        const nextLevel = getNextLevel(h.level);
        if (newXp >= maxXp && nextLevel) {
          setShowLevelUp(true);
          setTimeout(() => setShowLevelUp(false), 2000);
          newXp = newXp - maxXp;
          newLevel = nextLevel;
          maxXp = LEVEL_XP_THRESHOLDS[newLevel];
        } else if (newXp > maxXp) {
          newXp = maxXp;
        }
        return {
          ...h,
          xp: newXp,
          level: newLevel,
          maxXp,
          streak: newStreak,
          lastCaredAt: now,
          careActions: h.careActions + 1,
        };
      })
    );
    performPlantCare(task.hobbyId);
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

          {/* Auth Modal */}
          <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} onAuthSuccess={(u, t) => { setUser(u); setToken(t); }} />
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
          user={user}
          onSignOut={() => {
            setUser(null);
            setToken(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }}
          onSignIn={() => setAuthModalOpen(true)}
        />
      )}

      {/* Hobby Modal */}
      {showHobbyModal && selectedHobby && (
        <HobbyModal
          hobby={hobbies.find((h) => h.id === selectedHobby.id) || selectedHobby}
          tasks={tasks.filter((t) => t.hobbyId === selectedHobby.id)}
          open={showHobbyModal}
          onOpenChange={setShowHobbyModal}
          onCompleteTask={handleCompleteTask}
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