"use client";

import { motion } from "framer-motion";
import { 
  Gamepad2, 
  Settings, 
  Bell, 
  Volume2, 
  VolumeX, 
  LogOut, 
  Loader2, 
  Wifi, 
  WifiOff,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks";

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  notificationCount?: number;
  isLoading?: boolean;
}

export function Header({ soundEnabled, onToggleSound, notificationCount = 0, isLoading = false }: HeaderProps) {
  const { isAuthenticated, logout } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass border-b border-border/50 sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
            className="p-2.5 rounded-xl bg-gradient-to-br from-primary via-purple-600 to-primary shadow-lg shadow-primary/40"
          >
            <Gamepad2 className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-foreground flex items-center gap-1">
              Life<span className="text-primary">RPG</span>
              <Sparkles className="w-4 h-4 text-primary/60" />
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
            className="relative p-2.5 rounded-xl bg-secondary/80 hover:bg-secondary transition-colors border border-border/50"
          >
            <Bell className="w-5 h-5 text-foreground" />
            {notificationCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs flex items-center justify-center font-bold shadow-lg"
              >
                {notificationCount > 9 ? "9+" : notificationCount}
              </motion.span>
            )}
          </motion.button>

          {/* Sound Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleSound}
            className={cn(
              "p-2.5 rounded-xl transition-all border",
              soundEnabled 
                ? "bg-gradient-to-br from-accent/20 to-emerald-500/10 border-accent/30 text-accent" 
                : "bg-secondary/80 border-border/50 text-muted-foreground hover:text-foreground"
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
              "px-3 py-2 rounded-xl transition-all flex items-center gap-2 border",
              isAuthenticated 
                ? "bg-gradient-to-r from-accent/15 to-emerald-500/10 border-accent/30" 
                : "bg-secondary/80 border-border/50"
            )}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            ) : isAuthenticated ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Wifi className="w-4 h-4 text-accent" />
              </motion.div>
            ) : (
              <WifiOff className="w-4 h-4 text-muted-foreground" />
            )}
            <span className={cn(
              "text-xs font-medium hidden sm:inline",
              isAuthenticated ? "text-accent" : "text-muted-foreground"
            )}>
              {isLoading ? "Syncing..." : isAuthenticated ? "Connected" : "Offline"}
            </span>
          </div>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-xl bg-secondary/80 hover:bg-secondary transition-colors border border-border/50"
          >
            <Settings className="w-5 h-5 text-foreground" />
          </motion.button>

          {/* Logout (only when authenticated) */}
          {isAuthenticated && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="p-2.5 rounded-xl bg-destructive/10 hover:bg-destructive/20 transition-colors border border-destructive/30"
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
