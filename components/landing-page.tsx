"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Target, Flame, ArrowRight, TreeDeciduous } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LandingPageProps {
  onStartGarden: () => void;
  onAddHobby: (hobby: string) => void;
  onOpenInteractiveGarden?: () => void;
}

export function LandingPage({ onStartGarden, onAddHobby, onOpenInteractiveGarden }: LandingPageProps) {
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
      title: "AI-powered task guidance",
      description: "Get personalized tasks to help you progress",
    },
    {
      icon: Target,
      title: "Visual progress tracking",
      description: "Watch your garden grow as you complete tasks",
    },
    {
      icon: Flame,
      title: "Gamified streak system",
      description: "Stay motivated with streaks and levels",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-32">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 select-none">
          {"🌱"}
        </div>
        <div className="absolute top-40 right-20 text-5xl opacity-15 select-none">
          {"🌿"}
        </div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-10 select-none">
          {"🌳"}
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            <span className="text-balance">
              {"Grow Your Life, One Hobby at a Time 🌱"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            AI guides you. Your garden grows with your consistency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={onStartGarden}
              size="lg"
              className="gap-2 text-lg px-8 py-6"
            >
              Start Your Garden
              <ArrowRight className="h-5 w-5" />
            </Button>
            {onOpenInteractiveGarden && (
              <Button
                onClick={onOpenInteractiveGarden}
                variant="outline"
                size="lg"
                className="gap-2 text-lg px-8 py-6"
              >
                <TreeDeciduous className="h-5 w-5" />
                Interactive Garden
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Input Section */}
      <section className="px-4 py-16 bg-secondary/30">
        <div className="mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-foreground text-center mb-6">
              Plant your first hobby
            </h2>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter a hobby you want to start"
                value={hobbyInput}
                onChange={(e) => setHobbyInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddHobby()}
                className="flex-1"
              />
              <Button onClick={handleAddHobby} disabled={!hobbyInput.trim()}>
                Add Hobby
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-foreground text-center mb-12 sm:text-3xl"
          >
            Why AI Hobby Garden?
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
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
