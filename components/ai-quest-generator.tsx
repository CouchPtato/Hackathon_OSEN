"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Wand2, 
  Loader2,
  Plus,
  Zap
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

export function AIQuestGenerator({ onGenerateQuests }: AIQuestGeneratorProps) {
  const [goal, setGoal] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuests, setGeneratedQuests] = useState<Quest[]>([]);

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    
    setIsGenerating(true);
    setGeneratedQuests([]);

    // Simulate AI generation
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
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Wand2 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">AI Quest Generator</h3>
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
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          disabled={!goal.trim() || isGenerating}
          className={cn(
            "w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all",
            "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
            "hover:glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
              <p className="text-sm text-muted-foreground">
                Generated {generatedQuests.length} quests
              </p>
              <button
                onClick={handleAddAll}
                className="text-sm text-primary hover:underline"
              >
                Add all
              </button>
            </div>

            {generatedQuests.map((quest, index) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-xl bg-secondary/50 border border-border flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {quest.title}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    +{quest.xpReward} XP
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAddQuest(quest)}
                  className="p-2 rounded-full bg-accent text-accent-foreground"
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
