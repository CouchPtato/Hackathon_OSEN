"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Plant } from "@/components/plant";
import { Hobby } from "@/lib/types";

interface HobbyCardProps {
  hobby: Hobby;
  onClick: () => void;
}

export function HobbyCard({ hobby, onClick }: HobbyCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card
        className="cursor-pointer transition-shadow hover:shadow-lg overflow-hidden"
        onClick={onClick}
      >
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col items-center text-center gap-3">
            {/* SVG Plant */}
            <Plant level={hobby.level} size="md" />

            {/* Hobby Name */}
            <h3 className="font-semibold text-foreground text-sm sm:text-base">
              {hobby.name}
            </h3>

            {/* Streak */}
            {hobby.streak > 0 && (
              <div className="flex items-center gap-1 text-orange-500">
                <Flame className="h-4 w-4" />
                <span className="text-sm font-medium">{hobby.streak}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
