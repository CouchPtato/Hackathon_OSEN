"use client";

import { motion } from "framer-motion";
import { Gamepad2, Settings, Bell, Volume2, VolumeX, LogOut, Loader2, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks";

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  notificationCount?: number;
  isLoading?: boolean;
}

export function Header({ soundEnabled, onToggleSound, notificationCount = 0, isLoading = false }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass border-b border-border sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/60 glow-primary">
            <Gamepad2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Life<span className="text-primary">RPG</span>
            </h1>
            <p className="text-xs text-muted-foreground">Gamify Your Life</p>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <Bell className="w-5 h-5 text-foreground" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-bold">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </motion.button>

          {/* Sound Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleSound}
            className={cn(
              "p-2 rounded-xl transition-colors",
              soundEnabled ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground"
            )}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </motion.button>

          {/* Connection Status */}
          <div
            className={cn(
              "p-2 rounded-xl transition-colors flex items-center gap-1.5",
              isAuthenticated ? "bg-accent/20" : "bg-secondary"
            )}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
            ) : isAuthenticated ? (
              <Wifi className="w-4 h-4 text-accent" />
            ) : (
              <WifiOff className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {isLoading ? "Syncing..." : isAuthenticated ? "Connected" : "Offline"}
            </span>
          </div>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <Settings className="w-5 h-5 text-foreground" />
          </motion.button>

          {/* Logout (only when authenticated) */}
          {isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="p-2 rounded-xl bg-destructive/10 hover:bg-destructive/20 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-destructive" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
