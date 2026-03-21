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
}

export function GardenView({
  hobbies,
  onPlantClick,
  onAddHobby,
}: GardenViewProps) {
  return (
    <Card className="h-full min-h-[400px]">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-2">
          <Sprout className="h-5 w-5 text-primary" />
          Hobby Garden
        </CardTitle>
        <Button onClick={onAddHobby} size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Hobby</span>
        </Button>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {hobbies.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <span className="text-6xl mb-4">{"🌱"}</span>
              <p className="text-muted-foreground text-lg">
                Plant your first hobby
              </p>
              <Button onClick={onAddHobby} variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Hobby
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
            >
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={hobby.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <HobbyCard hobby={hobby} onClick={() => onPlantClick(hobby)} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
