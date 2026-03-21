"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Flame, Trophy, Calendar, Edit2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GardenerProfile as GardenerProfileType, GardenerLevel, GARDENER_LEVELS } from "@/lib/types";

interface GardenerProfileProps {
  profile: GardenerProfileType;
  onUpdateName: (name: string) => void;
  onClose: () => void;
}

const levelColors: Record<GardenerLevel, string> = {
  "Beginner Gardener": "from-emerald-400 to-green-500",
  "Growing Gardener": "from-green-400 to-teal-500",
  "Pro Gardener": "from-teal-400 to-cyan-500",
  "Master Gardener": "from-amber-400 to-yellow-500",
};

const levelIcons: Record<GardenerLevel, string> = {
  "Beginner Gardener": "🌱",
  "Growing Gardener": "🌿",
  "Pro Gardener": "🌳",
  "Master Gardener": "👨‍🌾",
};

export function GardenerProfileModal({ profile, onUpdateName, onClose }: GardenerProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(profile.name);

  const handleSaveName = () => {
    if (editedName.trim()) {
      onUpdateName(editedName.trim());
      setIsEditing(false);
    }
  };

  const currentLevelIndex = GARDENER_LEVELS.findIndex(l => l.level === profile.level);
  const nextLevel = currentLevelIndex < GARDENER_LEVELS.length - 1 ? GARDENER_LEVELS[currentLevelIndex + 1] : null;
  const currentLevelXp = GARDENER_LEVELS[currentLevelIndex]?.xp || 0;
  const nextLevelXp = nextLevel?.xp || profile.totalXp;
  const progressToNextLevel = nextLevel 
    ? ((profile.totalXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100 
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
          <Card className="border-2 overflow-hidden">
            {/* Header with gradient */}
            <div className={`bg-gradient-to-r ${levelColors[profile.level]} p-6 relative`}>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white hover:bg-white/20"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                  {levelIcons[profile.level]}
                </div>
                <div className="text-white">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="h-8 bg-white/20 border-white/30 text-white placeholder:text-white/50"
                        onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                        autoFocus
                      />
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20" onClick={handleSaveName}>
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold">{profile.name}</h2>
                      <Button size="icon" variant="ghost" className="h-6 w-6 text-white hover:bg-white/20" onClick={() => setIsEditing(true)}>
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  <p className="text-white/80 text-sm">{profile.level}</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* XP Progress to next level */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress to next level</span>
                  <span className="font-medium">{profile.totalXp} XP</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progressToNextLevel, 100)}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${levelColors[profile.level]}`}
                  />
                </div>
                {nextLevel && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {nextLevelXp - profile.totalXp} XP to {nextLevel.level}
                  </p>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <Trophy className="h-5 w-5 mx-auto text-amber-500 mb-1" />
                  <p className="text-2xl font-bold text-foreground">{profile.totalTasksCompleted}</p>
                  <p className="text-xs text-muted-foreground">Tasks Completed</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <Flame className="h-5 w-5 mx-auto text-orange-500 mb-1" />
                  <p className="text-2xl font-bold text-foreground">{profile.longestStreak}</p>
                  <p className="text-xs text-muted-foreground">Longest Streak</p>
                </div>
              </div>

              {/* Join Date */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Gardening since {profile.joinDate.toLocaleDateString()}</span>
              </div>

              {/* Level progression */}
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Gardener Ranks</p>
                <div className="space-y-2">
                  {GARDENER_LEVELS.map((lvl, idx) => {
                    const isUnlocked = profile.totalXp >= lvl.xp;
                    const isCurrent = lvl.level === profile.level;
                    return (
                      <div
                        key={lvl.level}
                        className={`flex items-center gap-3 p-2 rounded-lg ${
                          isCurrent ? "bg-primary/10 border border-primary/20" : ""
                        }`}
                      >
                        <span className={`text-lg ${isUnlocked ? "" : "grayscale opacity-50"}`}>
                          {levelIcons[lvl.level]}
                        </span>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
                            {lvl.level}
                          </p>
                          <p className="text-xs text-muted-foreground">{lvl.xp} XP</p>
                        </div>
                        {isCurrent && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
