"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, TrendingUp, Trophy, Swords } from "lucide-react";
import type { Notification } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NotificationPopupProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const iconMap = {
  xp: Sparkles,
  level: Star,
  stat: TrendingUp,
  quest: Trophy,
  gear: Swords,
};

const colorMap = {
  xp: "text-xp bg-xp/20 border-xp/30",
  level: "text-primary bg-primary/20 border-primary/30",
  stat: "text-accent bg-accent/20 border-accent/30",
  quest: "text-charisma bg-charisma/20 border-charisma/30",
  gear: "text-rare bg-rare/20 border-rare/30",
};

export function NotificationPopup({ notifications, onDismiss }: NotificationPopupProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => {
          const Icon = iconMap[notification.type];
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              onAnimationComplete={() => {
                setTimeout(() => onDismiss(notification.id), 2000);
              }}
              className={cn(
                "glass rounded-xl px-4 py-3 flex items-center gap-3 border pointer-events-auto cursor-pointer",
                colorMap[notification.type]
              )}
              onClick={() => onDismiss(notification.id)}
            >
              <div className="p-2 rounded-full bg-current/10">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">{notification.message}</p>
                {notification.value && (
                  <p className="text-2xl font-bold">
                    +{notification.value}
                    {notification.type === "xp" && " XP"}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export function FloatingXP({ value, x, y }: { value: number; x: number; y: number }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -50 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed pointer-events-none z-50 text-xp font-bold text-xl text-glow"
      style={{ left: x, top: y }}
    >
      +{value} XP
    </motion.div>
  );
}
