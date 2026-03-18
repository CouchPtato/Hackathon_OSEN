"use client";

import { motion } from "framer-motion";
import { 
  Map, 
  Castle, 
  Dumbbell, 
  Palette, 
  Monitor,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WorldMapProps {
  onSelectRegion: (region: string) => void;
  selectedRegion?: string;
}

const regions = [
  {
    id: "knowledge",
    name: "Knowledge Kingdom",
    icon: Castle,
    color: "text-intelligence",
    bgColor: "from-intelligence/30 to-intelligence/10",
    borderColor: "border-intelligence/50",
    glowColor: "hover:shadow-[0_0_30px_hsl(217,91%,60%,0.3)]",
    description: "Master wisdom and learning",
    quests: 12,
  },
  {
    id: "fitness",
    name: "Fitness Arena",
    icon: Dumbbell,
    color: "text-strength",
    bgColor: "from-strength/30 to-strength/10",
    borderColor: "border-strength/50",
    glowColor: "hover:shadow-[0_0_30px_hsl(0,84%,60%,0.3)]",
    description: "Build strength and endurance",
    quests: 8,
  },
  {
    id: "creative",
    name: "Creative Forest",
    icon: Palette,
    color: "text-creativity",
    bgColor: "from-creativity/30 to-creativity/10",
    borderColor: "border-creativity/50",
    glowColor: "hover:shadow-[0_0_30px_hsl(280,87%,65%,0.3)]",
    description: "Unleash your imagination",
    quests: 10,
  },
  {
    id: "tech",
    name: "Tech City",
    icon: Monitor,
    color: "text-logic",
    bgColor: "from-logic/30 to-logic/10",
    borderColor: "border-logic/50",
    glowColor: "hover:shadow-[0_0_30px_hsl(142,71%,45%,0.3)]",
    description: "Conquer code and systems",
    quests: 15,
  },
];

export function WorldMap({ onSelectRegion, selectedRegion }: WorldMapProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Map className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">World Map</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {regions.map((region, index) => {
          const Icon = region.icon;
          const isSelected = selectedRegion === region.id;

          return (
            <motion.button
              key={region.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectRegion(region.id)}
              className={cn(
                "relative p-4 rounded-xl border text-left transition-all",
                `bg-gradient-to-br ${region.bgColor}`,
                isSelected ? region.borderColor : "border-transparent",
                region.glowColor
              )}
            >
              {/* Background decoration */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className={cn(
                  "absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-20",
                  region.color.replace("text-", "bg-")
                )} />
              </div>

              <div className="relative">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                  "bg-background/50",
                  region.color
                )}>
                  <Icon className="w-5 h-5" />
                </div>

                <h4 className="font-semibold text-foreground text-sm">
                  {region.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {region.description}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">
                    {region.quests} quests
                  </span>
                  <ChevronRight className={cn("w-4 h-4", region.color)} />
                </div>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="selected-region"
                  className={cn(
                    "absolute inset-0 rounded-xl border-2",
                    region.borderColor
                  )}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
