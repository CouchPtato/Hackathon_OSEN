"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sprout } from "lucide-react";
import { HobbyCard } from "@/components/hobby-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hobby } from "@/lib/types";

interface GardenViewProps {
  hobbies: Hobby[];
  onPlantClick: (hobby: Hobby) => void;
  onAddHobby: () => void;
  recentlyCaredHobbyId?: string | null;
}

export function GardenView({
  hobbies,
  onPlantClick,
  onAddHobby,
  recentlyCaredHobbyId,
}: GardenViewProps) {
  return (
    <Card className="h-full min-h-[400px] glow-green">

      {/* HEADER */}
      <CardHeader className="flex flex-row items-center justify-between pb-4 relative z-20">
        <CardTitle className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
          >
            <Sprout className="h-5 w-5 text-green-500" />
          </motion.div>
          Hobby Garden
        </CardTitle>

        <Button onClick={onAddHobby} size="sm">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline ml-1">Add Hobby</span>
        </Button>
      </CardHeader>

      <CardContent className="relative z-10">
        <AnimatePresence mode="wait">

          {/* EMPTY */}
          {hobbies.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <span className="text-6xl mb-4">🌱</span>

              <p className="text-muted-foreground text-lg">
                Plant your first hobby
              </p>

              <Button onClick={onAddHobby} variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Hobby
              </Button>
            </motion.div>
          ) : (

            /* GRID */
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
            >
              {hobbies.map((hobby, index) => {
                const isRecentlyCared =
                  recentlyCaredHobbyId === hobby.id;

                return (
                  <motion.div
                    key={hobby.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: isRecentlyCared ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.3,
                    }}
                  >
                    <HobbyCard
                      hobby={hobby}
                      tasks={typeof window !== 'undefined' && window.localStorage ? (JSON.parse(window.localStorage.getItem('tasks') || '[]')) : []}
                      onClick={() => onPlantClick(hobby)}
                      recentlyCared={isRecentlyCared}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}