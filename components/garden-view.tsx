"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sprout } from "lucide-react";
import { Plant } from "@/components/plant";
import { Button } from "@/components/ui/button";
import { Hobby } from "@/lib/types";

interface GardenViewProps {
  hobbies: Hobby[];
  onPlantClick: (hobby: Hobby) => void;
  onAddHobby: () => void;
  growingHobbyId?: string | null;
}

export function GardenView({
  hobbies,
  onPlantClick,
  onAddHobby,
  growingHobbyId,
}: GardenViewProps) {
  // Calculate positions for plants in a natural garden layout
  const getPlantPosition = (index: number, total: number) => {
    const basePositions = [
      { x: 20, y: 60 },
      { x: 50, y: 70 },
      { x: 80, y: 55 },
      { x: 35, y: 45 },
      { x: 65, y: 40 },
      { x: 15, y: 35 },
      { x: 85, y: 45 },
      { x: 50, y: 30 },
    ];

    if (index < basePositions.length) {
      return basePositions[index];
    }

    // For additional plants, create a semi-random position
    const row = Math.floor(index / 4);
    const col = index % 4;
    return {
      x: 15 + col * 23 + (row % 2) * 10,
      y: 30 + row * 15,
    };
  };

  return (
    <div className="relative h-full min-h-[500px] w-full overflow-hidden rounded-3xl">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/50 via-sky-50/30 to-transparent" />
      <div className="absolute inset-0 garden-pattern" />

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] garden-ground rounded-b-3xl" />

      {/* Decorative elements */}
      <div className="absolute bottom-[35%] left-[5%] w-3 h-3 rounded-full bg-primary/20" />
      <div className="absolute bottom-[38%] right-[10%] w-2 h-2 rounded-full bg-primary/15" />
      <div className="absolute bottom-[32%] left-[40%] w-2.5 h-2.5 rounded-full bg-primary/10" />

      {/* Sun glow */}
      <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-amber-200/30 blur-2xl" />
      <div className="absolute top-6 right-10 w-10 h-10 rounded-full bg-amber-100/50 blur-xl" />

      {/* Plants */}
      <AnimatePresence>
        {hobbies.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <Sprout className="h-16 w-16 text-primary/30 mb-4" />
            <p className="text-muted-foreground text-center px-4">
              Start your first hobby
            </p>
          </motion.div>
        ) : (
          hobbies.map((hobby, index) => {
            const pos = getPlantPosition(index, hobbies.length);
            return (
              <motion.div
                key={hobby.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                className="absolute"
                style={{
                  left: `${pos.x}%`,
                  bottom: `${pos.y}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <Plant
                  hobby={hobby}
                  onClick={() => onPlantClick(hobby)}
                  isGrowing={growingHobbyId === hobby.id}
                />
              </motion.div>
            );
          })
        )}
      </AnimatePresence>

      {/* Floating Add Hobby Button */}
      <motion.div
        className="absolute bottom-4 right-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <Button
          onClick={onAddHobby}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Add Hobby</span>
        </Button>
      </motion.div>
    </div>
  );
}
