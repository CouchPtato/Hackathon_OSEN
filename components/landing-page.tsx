"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Target,
  Flame,
  ArrowRight,
  Moon,
  Sun,
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

  const handleAddHobby = () => {
    if (hobbyInput.trim()) {
      onAddHobby(hobbyInput.trim());
      setHobbyInput("");
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      
      {/* 🌿 BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-green-300/20 blur-3xl rounded-full" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-emerald-400/20 blur-3xl rounded-full" />
      </div>

      {/* 🌙 NAVBAR */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl justify-end">
          {onToggleDarkMode && (
            <Button variant="ghost" size="icon" onClick={onToggleDarkMode}>
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </header>

      {/* 🌱 HERO */}
      <section className="px-4 py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold sm:text-5xl lg:text-6xl"
        >
          Grow Your Life 🌱
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-lg text-muted-foreground"
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
            onClick={onStartGarden}
            size="lg"
            className="text-lg px-8 py-6 gap-2 hover:scale-105 active:scale-95"
          >
            Start Growing
            <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </section>

      {/* 🌿 INPUT */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-xl">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-center mb-4">
              Plant your first hobby 🌱
            </h2>

            <div className="flex gap-3">
              <Input
                placeholder="e.g. Guitar, Gym, Coding..."
                value={hobbyInput}
                onChange={(e) => setHobbyInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleAddHobby()
                }
              />

              <Button
                onClick={handleAddHobby}
                disabled={!hobbyInput.trim()}
              >
                Plant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ✨ FEATURES */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-bold mb-12 sm:text-3xl">
            Why this works
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass rounded-2xl p-6 hover:scale-105 transition"
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