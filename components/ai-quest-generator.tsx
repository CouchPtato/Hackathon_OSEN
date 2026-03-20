"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Wand2, 
  Loader2,
  Plus,
  Zap,
  Brain,
  ChevronRight
} from "lucide-react";
import type { Quest } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AIQuestGeneratorProps {
  onGenerateQuests: (quests: Quest[]) => void;
}

const sampleQuests: Quest[][] = [
  [
    {
      id: `ai-${Date.now()}-1`,
      title: "Build a Mini Project",
      description: "Create a small coding project that solves a real problem you face daily.",
      xpReward: 200,
      statRewards: { logic: 6, creativity: 4 },
      completed: false,
      category: "tech",
    },
    {
      id: `ai-${Date.now()}-2`,
      title: "Learn Something New",
      description: "Spend 30 minutes learning a new skill or technology you have been curious about.",
      xpReward: 100,
      statRewards: { intelligence: 5, logic: 3 },
      completed: false,
      category: "knowledge",
    },
    {
      id: `ai-${Date.now()}-3`,
      title: "Active Break",
      description: "Take a 15-minute walk or do some stretching exercises.",
      xpReward: 75,
      statRewards: { strength: 3, charisma: 2 },
      completed: false,
      category: "fitness",
    },
  ],
  [
    {
      id: `ai-${Date.now()}-4`,
      title: "Write Documentation",
      description: "Document a process or create a guide that helps others understand your work.",
      xpReward: 120,
      statRewards: { intelligence: 4, charisma: 3 },
      completed: false,
      category: "knowledge",
    },
    {
      id: `ai-${Date.now()}-5`,
      title: "Creative Expression",
      description: "Spend time on a creative hobby - drawing, writing, music, or any artistic pursuit.",
      xpReward: 150,
      statRewards: { creativity: 7, charisma: 2 },
      completed: false,
      category: "creative",
    },
    {
      id: `ai-${Date.now()}-6`,
      title: "Mentor Someone",
      description: "Help a colleague or friend with something you are good at.",
      xpReward: 130,
      statRewards: { charisma: 5, intelligence: 3 },
      completed: false,
      category: "social",
    },
  ],
];

const suggestedGoals = [
  "Learn to code",
  "Get fit",
  "Be creative",
  "Level up skills",
];

export function AIQuestGenerator({ onGenerateQuests }: AIQuestGeneratorProps) {
  const [goal, setGoal] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuests, setGeneratedQuests] = useState<Quest[]>([]);

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    
    setIsGenerating(true);
    setGeneratedQuests([]);

    // Simulate AI generation with typing effect
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const randomQuests = sampleQuests[Math.floor(Math.random() * sampleQuests.length)].map(
      (q, i) => ({
        ...q,
        id: `ai-${Date.now()}-${i}`,
        title: goal.includes("code") || goal.includes("tech") ? q.title : 
               goal.includes("fitness") || goal.includes("health") ? sampleQuests[0][2].title :
               q.title,
      })
    );

    setGeneratedQuests(randomQuests);
    setIsGenerating(false);
  };

  const handleAddQuest = (quest: Quest) => {
    onGenerateQuests([quest]);
    setGeneratedQuests((prev) => prev.filter((q) => q.id !== quest.id));
  };

  const handleAddAll = () => {
    onGenerateQuests(generatedQuests);
    setGeneratedQuests([]);
    setGoal("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="p-2 rounded-lg bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/30"
        >
          <Wand2 className="w-5 h-5 text-white" />
        </motion.div>
        <h3 className="text-lg font-bold text-foreground">AI Quest Generator</h3>
        <Brain className="w-4 h-4 text-muted-foreground ml-auto" />
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="Enter your goal (e.g., 'Learn React')"
            className={cn(
              "w-full px-4 py-3.5 rounded-xl",
              "bg-secondary/80 border border-border",
              "text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
              "transition-all"
            )}
          />
          <motion.div
            animate={{ rotate: isGenerating ? 360 : 0 }}
            transition={{ duration: 2, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
          >
            <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
          </motion.div>
        </div>

        {/* Suggested goals */}
        {!goal && generatedQuests.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {suggestedGoals.map((suggestion) => (
              <motion.button
                key={suggestion}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGoal(suggestion)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors border border-border/50"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleGenerate}
          disabled={!goal.trim() || isGenerating}
          className={cn(
            "w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all",
            "bg-gradient-to-r from-primary via-purple-600 to-primary bg-[length:200%_100%]",
            "text-primary-foreground shadow-lg shadow-primary/30",
            "hover:shadow-primary/40 hover:bg-[100%_0]",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
            "animated-gradient"
          )}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Quests...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Generate Quests
            </>
          )}
        </motion.button>
      </div>

      {/* Generated Quests */}
      <AnimatePresence mode="popLayout">
        {generatedQuests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-primary" />
                Generated {generatedQuests.length} quests
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddAll}
                className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1"
              >
                Add all
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            {generatedQuests.map((quest, index) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="p-3.5 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-between gap-3 group hover:border-primary/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {quest.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                    <span className="text-xp font-medium">+{quest.xpReward} XP</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span className="truncate">{quest.description}</span>
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAddQuest(quest)}
                  className="p-2 rounded-full bg-gradient-to-br from-accent to-emerald-600 text-white shadow-lg shadow-accent/30"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
