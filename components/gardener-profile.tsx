"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Trophy, Calendar, Edit2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  GardenerProfile as GardenerProfileType,
  GardenerLevel,
  GARDENER_LEVELS,
} from "@/lib/types";

interface GardenerProfileProps {
  profile: GardenerProfileType;
  onUpdateName: (name: string) => void;
  onClose: () => void;
}

// 🎨 Colors
const levelColors: Record<GardenerLevel, string> = {
  "Beginner": "from-emerald-400 to-green-500",
  "Growing": "from-green-400 to-teal-500",
  "Pro": "from-teal-400 to-cyan-500",
  "Master": "from-amber-400 to-yellow-500",
};

// 🌱 Icons
const levelIcons: Record<GardenerLevel, string> = {
  "Beginner": "🌱",
  "Growing": "🌿",
  "Pro": "🌳",
  "Master": "👑",
};

// 🧠 Short names
const levelDisplay: Record<GardenerLevel, string> = {
  "Beginner": "Beginner",
  "Growing": "Growing",
  "Pro": "Pro",
  "Master": "Master",
};

export function GardenerProfileModal({
  profile,
  onUpdateName,
  onClose,
}: GardenerProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(profile.name);

  const handleSaveName = () => {
    if (editedName.trim()) {
      onUpdateName(editedName.trim());
      setIsEditing(false);
    }
  };

  // 📊 Progress
  const currentLevelIndex = GARDENER_LEVELS.findIndex(
    (l) => l.level === profile.level
  );

  const nextLevel =
    currentLevelIndex < GARDENER_LEVELS.length - 1
      ? GARDENER_LEVELS[currentLevelIndex + 1]
      : null;

  const currentLevelXp = GARDENER_LEVELS[currentLevelIndex]?.xp || 0;
  const nextLevelXp = nextLevel?.xp || profile.totalXp;

  const progressToNextLevel = nextLevel
    ? ((profile.totalXp - currentLevelXp) /
        (nextLevelXp - currentLevelXp)) *
      100
    : 100;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md"
        >
          <Card className="overflow-hidden border-2">
            
            {/* 🌈 HEADER */}
            <div
              className={`bg-gradient-to-r ${levelColors[profile.level]} p-6 relative`}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white hover:bg-white/20"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-4">
                
                {/* Avatar */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-3xl"
                >
                  {levelIcons[profile.level]}
                </motion.div>

                {/* Name */}
                <div className="text-white">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="h-8 bg-white/20 text-white"
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleSaveName()
                        }
                        autoFocus
                      />
                      <Button size="icon" onClick={handleSaveName}>
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold">{profile.name}</h2>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}

                  {/* Level */}
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <span>{levelIcons[profile.level]}</span>
                    <span className="font-medium">
                      {levelDisplay[profile.level]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <CardContent className="p-6 space-y-6">
              
              {/* ⭐ XP BAR */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    Progress
                  </span>
                  <span>{profile.totalXp} XP</span>
                </div>

                <Progress value={progressToNextLevel} />

                {nextLevel && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {nextLevelXp - profile.totalXp} XP to{" "}
                    {levelDisplay[nextLevel.level]}
                  </p>
                )}
              </div>

              {/* 📊 STATS */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <Trophy className="h-5 w-5 mx-auto text-amber-500 mb-1" />
                  <p className="text-2xl font-bold">
                    {profile.totalTasksCompleted}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tasks
                  </p>
                </div>

                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <Flame className="h-5 w-5 mx-auto text-orange-500 mb-1" />
                  <p className="text-2xl font-bold">
                    {profile.longestStreak}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Streak
                  </p>
                </div>
              </div>

              {/* 📅 DATE */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Since {profile.joinDate.toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}