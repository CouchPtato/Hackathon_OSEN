"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { CharacterCard } from "./character-card";
import { StatsPanel } from "./stats-panel";
import { QuestPanel } from "./quest-panel";
import { GearSection } from "./gear-section";
import { WorldMap } from "./world-map";
import { AIQuestGenerator } from "./ai-quest-generator";
import { Leaderboard } from "./leaderboard";
import { Header } from "./header";
import { NotificationPopup, FloatingXP } from "./notification-popup";
import { useQuests, useLeaderboard, useProfile } from "@/lib/hooks";
import { mockUser, mockGear, mockLeaderboard, mockQuests } from "@/lib/mock-data";
import { calculateLevel, getTitle } from "@/lib/utils";
import * as api from "@/lib/api";
import type { Quest, Stats, Notification } from "@/lib/types";

interface FloatingXPItem {
  id: string;
  value: number;
  x: number;
  y: number;
}

export function Dashboard() {
  // API hooks with fallback to mock data
  const { quests: apiQuests, completeQuest: apiCompleteQuest, createQuest, isLoading: questsLoading } = useQuests();
  const { leaderboard: apiLeaderboard, isLoading: leaderboardLoading } = useLeaderboard();
  const { user: apiUser, updateLocalProfile, isLoading: profileLoading } = useProfile();

  // Local state with mock data fallback
  const [localUser, setLocalUser] = useState(mockUser);
  const [localQuests, setLocalQuests] = useState(mockQuests);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [floatingXPs, setFloatingXPs] = useState<FloatingXPItem[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>();
  const [statChanges, setStatChanges] = useState<Partial<Stats>>({});

  // Sync with API data when available
  useEffect(() => {
    if (apiUser) {
      setLocalUser(apiUser);
    }
  }, [apiUser]);

  useEffect(() => {
    if (apiQuests.length > 0) {
      setLocalQuests(apiQuests);
    }
  }, [apiQuests]);

  // Use API data if available, otherwise fall back to mock data
  const user = apiUser || localUser;
  const quests = apiQuests.length > 0 ? apiQuests : localQuests;
  const leaderboard = apiLeaderboard.length > 0 ? apiLeaderboard : mockLeaderboard;

  const addNotification = useCallback((notification: Omit<Notification, "id">) => {
    const id = `notif-${Date.now()}-${Math.random()}`;
    setNotifications((prev) => [...prev, { ...notification, id }]);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handleCompleteQuest = useCallback(
    async (quest: Quest, event: React.MouseEvent) => {
      // Add floating XP at click position
      const floatId = `float-${Date.now()}`;
      setFloatingXPs((prev) => [
        ...prev,
        { id: floatId, value: quest.xpReward, x: event.clientX, y: event.clientY },
      ]);
      setTimeout(() => {
        setFloatingXPs((prev) => prev.filter((f) => f.id !== floatId));
      }, 1000);

      // Try API call first
      try {
        await apiCompleteQuest(quest.id);
        
        // Log activity to backend
        await api.logActivity({
          type: "quest_complete",
          questId: quest.id,
          xpGained: quest.xpReward,
          statChanges: quest.statRewards,
        });
      } catch {
        // Fall back to local update if API fails
      }

      // Update local user state (either API or fallback)
      setLocalUser((prev) => {
        const newXp = prev.xp + quest.xpReward;
        const newLevel = calculateLevel(newXp);
        const newStats = { ...prev.stats };

        Object.entries(quest.statRewards).forEach(([stat, value]) => {
          if (value) {
            newStats[stat as keyof Stats] = Math.min(
              (newStats[stat as keyof Stats] || 0) + value,
              100
            );
          }
        });

        // Show level up notification
        if (newLevel > prev.level) {
          addNotification({
            type: "level",
            message: `Level Up! You are now level ${newLevel}!`,
            value: newLevel,
          });
        }

        const updatedUser = {
          ...prev,
          xp: newXp,
          level: newLevel,
          title: getTitle(newLevel),
          stats: newStats,
        };

        // Update profile hook if connected
        if (apiUser) {
          updateLocalProfile(updatedUser);
        }

        return updatedUser;
      });

      // Show stat changes
      setStatChanges(quest.statRewards);
      setTimeout(() => setStatChanges({}), 2000);

      // Mark quest as completed locally
      setLocalQuests((prev) =>
        prev.map((q) => (q.id === quest.id ? { ...q, completed: true } : q))
      );

      // Add XP notification
      addNotification({
        type: "xp",
        message: "Quest Completed!",
        value: quest.xpReward,
      });

      // Add stat notifications
      Object.entries(quest.statRewards).forEach(([stat, value]) => {
        if (value) {
          setTimeout(() => {
            addNotification({
              type: "stat",
              message: `+${value} ${stat.charAt(0).toUpperCase() + stat.slice(1)}`,
            });
          }, 300);
        }
      });
    },
    [addNotification, apiCompleteQuest, apiUser, updateLocalProfile]
  );

  const handleGenerateQuests = useCallback(async (newQuests: Quest[]) => {
    // Try to create quests via API
    for (const quest of newQuests) {
      try {
        await createQuest({
          title: quest.title,
          description: quest.description,
          xpReward: quest.xpReward,
          statRewards: quest.statRewards,
          category: quest.category,
        });
      } catch {
        // API unavailable, use local state
      }
    }

    // Always update local state for immediate UI feedback
    setLocalQuests((prev) => [...prev, ...newQuests]);
    addNotification({
      type: "quest",
      message: `${newQuests.length} new quest${newQuests.length > 1 ? "s" : ""} added!`,
    });
  }, [addNotification, createQuest]);

  const handleSelectRegion = useCallback((region: string) => {
    setSelectedRegion(region);
  }, []);

  const handleLevelUp = useCallback(() => {
    // Additional level up effects could go here
  }, []);

  const isLoading = questsLoading || leaderboardLoading || profileLoading;

  return (
    <div className="min-h-screen bg-background">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Header
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        notificationCount={notifications.length}
        isLoading={isLoading}
      />

      {/* Notifications */}
      <NotificationPopup
        notifications={notifications}
        onDismiss={dismissNotification}
      />

      {/* Floating XP */}
      <AnimatePresence>
        {floatingXPs.map((item) => (
          <FloatingXP key={item.id} value={item.value} x={item.x} y={item.y} />
        ))}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Stats */}
          <div className="lg:col-span-3 space-y-6">
            <StatsPanel stats={user.stats} statChanges={statChanges} />
            <WorldMap
              onSelectRegion={handleSelectRegion}
              selectedRegion={selectedRegion}
            />
          </div>

          {/* Center Column - Character & AI */}
          <div className="lg:col-span-5 space-y-6">
            <CharacterCard
              name={user.name}
              level={user.level}
              xp={user.xp}
              title={user.title}
              streak={user.streak}
              onLevelUp={handleLevelUp}
            />
            <AIQuestGenerator onGenerateQuests={handleGenerateQuests} />
            <GearSection gear={mockGear} />
          </div>

          {/* Right Column - Quests & Leaderboard */}
          <div className="lg:col-span-4 space-y-6">
            <QuestPanel quests={quests} onCompleteQuest={handleCompleteQuest} />
            <Leaderboard entries={leaderboard} currentUserId={user.id} />
          </div>
        </div>
      </main>
    </div>
  );
}
