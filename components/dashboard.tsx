"use client";

import { useState, useCallback } from "react";
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
import { mockUser, mockQuests, mockGear, mockLeaderboard } from "@/lib/mock-data";
import { calculateLevel, getTitle } from "@/lib/utils";
import type { Quest, Stats, Notification } from "@/lib/types";

interface FloatingXPItem {
  id: string;
  value: number;
  x: number;
  y: number;
}

export function Dashboard() {
  const [user, setUser] = useState(mockUser);
  const [quests, setQuests] = useState(mockQuests);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [floatingXPs, setFloatingXPs] = useState<FloatingXPItem[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>();
  const [statChanges, setStatChanges] = useState<Partial<Stats>>({});

  const addNotification = useCallback((notification: Omit<Notification, "id">) => {
    const id = `notif-${Date.now()}-${Math.random()}`;
    setNotifications((prev) => [...prev, { ...notification, id }]);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handleCompleteQuest = useCallback(
    (quest: Quest, event: React.MouseEvent) => {
      // Add floating XP at click position
      const floatId = `float-${Date.now()}`;
      setFloatingXPs((prev) => [
        ...prev,
        { id: floatId, value: quest.xpReward, x: event.clientX, y: event.clientY },
      ]);
      setTimeout(() => {
        setFloatingXPs((prev) => prev.filter((f) => f.id !== floatId));
      }, 1000);

      // Update user XP and stats
      setUser((prev) => {
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

        return {
          ...prev,
          xp: newXp,
          level: newLevel,
          title: getTitle(newLevel),
          stats: newStats,
        };
      });

      // Show stat changes
      setStatChanges(quest.statRewards);
      setTimeout(() => setStatChanges({}), 2000);

      // Mark quest as completed
      setQuests((prev) =>
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
    [addNotification]
  );

  const handleGenerateQuests = useCallback((newQuests: Quest[]) => {
    setQuests((prev) => [...prev, ...newQuests]);
    addNotification({
      type: "quest",
      message: `${newQuests.length} new quest${newQuests.length > 1 ? "s" : ""} added!`,
    });
  }, [addNotification]);

  const handleSelectRegion = useCallback((region: string) => {
    setSelectedRegion(region);
    // Could filter quests by region here
  }, []);

  const handleLevelUp = useCallback(() => {
    // Additional level up effects could go here
  }, []);

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
            <Leaderboard entries={mockLeaderboard} />
          </div>
        </div>
      </main>
    </div>
  );
}
