"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, TrendingUp, Trophy, Swords, X } from "lucide-react";
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

const configMap = {
  xp: {
    gradient: "from-amber-500/20 to-yellow-500/10",
    border: "border-xp/40",
    text: "text-xp",
    glow: "shadow-[0_0_30px_hsl(43,96%,56%,0.3)]",
  },
  level: {
    gradient: "from-primary/20 to-purple-500/10",
    border: "border-primary/40",
    text: "text-primary",
    glow: "shadow-[0_0_40px_hsl(265,89%,62%,0.4)]",
  },
  stat: {
    gradient: "from-accent/20 to-emerald-500/10",
    border: "border-accent/40",
    text: "text-accent",
    glow: "shadow-[0_0_25px_hsl(142,76%,46%,0.25)]",
  },
  quest: {
    gradient: "from-charisma/20 to-amber-500/10",
    border: "border-charisma/40",
    text: "text-charisma",
    glow: "shadow-[0_0_25px_hsl(38,92%,58%,0.25)]",
  },
  gear: {
    gradient: "from-rare/20 to-cyan-500/10",
    border: "border-rare/40",
    text: "text-rare",
    glow: "shadow-[0_0_25px_hsl(217,91%,60%,0.25)]",
  },
};

export function NotificationPopup({ notifications, onDismiss }: NotificationPopupProps) {
  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 pointer-events-none max-w-sm">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => {
          const Icon = iconMap[notification.type];
          const config = configMap[notification.type];
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              onAnimationComplete={() => {
                setTimeout(() => onDismiss(notification.id), 3000);
              }}
              className={cn(
                "glass-card rounded-xl px-4 py-3 flex items-center gap-3 pointer-events-auto cursor-pointer",
                "bg-gradient-to-r",
                config.gradient,
                "border",
                config.border,
                config.glow
              )}
              onClick={() => onDismiss(notification.id)}
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "p-2.5 rounded-lg",
                  config.text,
                  "bg-current/10"
                )}
              >
                <Icon className="w-5 h-5" fill={notification.type === "level" ? "currentColor" : "none"} />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <p className={cn("font-semibold text-sm", config.text)}>
                  {notification.message}
                </p>
                {notification.value !== undefined && (
                  <motion.p
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className={cn("text-2xl font-bold", config.text)}
                  >
                    +{notification.value}
                    {notification.type === "xp" && " XP"}
                  </motion.p>
                )}
              </div>
              
              <button className="p-1 rounded-full hover:bg-foreground/10 transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
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
      initial={{ opacity: 1, y: 0, scale: 0.5 }}
      animate={{ opacity: 0, y: -80, scale: 1.5 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="fixed pointer-events-none z-50"
      style={{ left: x - 30, top: y - 10 }}
    >
      <div className="flex items-center gap-1 text-xp font-bold text-xl text-glow">
        <Sparkles className="w-5 h-5" />
        +{value} XP
      </div>
    </motion.div>
  );
}
