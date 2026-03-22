"use client";

import { useState } from "react";
import { AuthModal } from "@/components/auth-modal";
import { motion } from "framer-motion";
import {
  Sparkles,
  Target,
  Flame,
  ArrowRight,
  Moon,
  Sun,
  Sprout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LandingPageProps {
  onStartGarden: () => void;
  onAddHobby: (hobby: string) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function LandingPage({
  onStartGarden,
  onAddHobby,
  darkMode = false,
  onToggleDarkMode,
}: LandingPageProps) {

  const [hobbyInput, setHobbyInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const suggestedHobbies = [
    "Guitar", "Painting", "Fitness", "Reading", "Cooking", "Photography", "Writing", "Gardening"
  ];

  const handleAddHobby = () => {
    if (hobbyInput.trim()) {
      onAddHobby(hobbyInput.trim());
      setHobbyInput("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1200);
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: "AI-powered guidance",
      description: "Smart tasks to grow your skills daily",
    },
    {
      icon: Target,
      title: "Visual growth system",
      description: "See your hobby evolve like a plant",
    },
    {
      icon: Flame,
      title: "Streak & XP system",
      description: "Stay consistent and level up",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-white dark:from-[#1a2e1a] dark:via-[#1a2e1a] dark:to-[#101c10] relative overflow-hidden">
      {/* Auth Modal for sign in/up */}
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} onAuthSuccess={(u) => { setUser(u); setAuthModalOpen(false); onStartGarden(); }} />
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-green-300/30 blur-3xl rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-emerald-400/30 blur-3xl rounded-full"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-green-100/10 blur-2xl rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* 🌙 NAVBAR */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl justify-end gap-2">
          {onToggleDarkMode && (
            <Button variant="ghost" size="icon" onClick={onToggleDarkMode}>
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}
          {/* Sign In/Up button */}
          {!user && (
            <Button className="bg-green-600 text-white" onClick={() => setAuthModalOpen(true)}>
              Sign In / Sign Up
            </Button>
          )}
        </div>
      </header>

      {/* 🌱 HERO */}
      <section className="px-4 py-28 text-center relative">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
            className="inline-block mb-2"
          >
            <Sprout className="h-12 w-12 text-green-500 drop-shadow-lg" />
          </motion.div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-green-600 via-emerald-500 to-lime-400 bg-clip-text text-transparent drop-shadow-lg">
            Grow Your Life
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-xl sm:text-2xl text-muted-foreground font-medium"
          >
            Build habits. Gain XP. Watch your hobbies evolve.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-10"
          >
            <Button
              onClick={user ? onStartGarden : () => setAuthModalOpen(true)}
              size="lg"
              className="text-lg px-10 py-6 gap-2 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-400 hover:scale-105 active:scale-95 transition"
            >
              {user ? "Go to My Garden" : "Start Growing"}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* 🌿 INPUT + SUGGESTIONS */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-xl">
          <div className="glass rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-center mb-4">
              Plant your first hobby <span className="inline-block animate-bounce">🌱</span>
            </h2>
            <div className="flex gap-3 items-center">
              <label htmlFor="hobby-input" className="sr-only">
                Hobby Name
              </label>
              <Input
                id="hobby-input"
                name="hobby"
                placeholder="e.g. Guitar, Gym, Coding..."
                value={hobbyInput}
                onChange={(e) => setHobbyInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleAddHobby()
                }
                className="text-lg px-4 py-3 rounded-full shadow"
                autoComplete="off"
              />
              <Button
                onClick={handleAddHobby}
                disabled={!hobbyInput.trim()}
                className="rounded-full px-6 text-lg"
              >
                Plant
              </Button>
            </div>
            {/* Suggestions */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {suggestedHobbies.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setHobbyInput(suggestion)}
                  className="rounded-full px-3 py-1 text-sm bg-secondary text-secondary-foreground hover:bg-green-100 dark:hover:bg-green-900/40 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            {/* Success feedback */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-4 text-green-600 font-semibold flex items-center justify-center gap-2"
              >
                <Sprout className="h-5 w-5" /> Hobby planted!
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ✨ FEATURES */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-bold mb-12 sm:text-3xl bg-gradient-to-r from-green-600 via-emerald-500 to-lime-400 bg-clip-text text-transparent">
            Why this works
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass rounded-2xl p-6 hover:scale-105 transition shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}