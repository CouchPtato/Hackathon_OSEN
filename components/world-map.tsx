"use client";

import { motion } from "framer-motion";
import { 
  Map, 
  Castle, 
  Dumbbell, 
  Palette, 
  Monitor,
  ChevronRight,
  Sparkles
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
    colorClass: "text-intelligence",
    bgGradient: "from-blue-600/30 via-blue-500/20 to-cyan-500/10",
    borderGlow: "border-blue-500/40",
    hoverShadow: "group-hover:shadow-[0_0_40px_hsl(217,91%,60%,0.25)]",
    iconBg: "from-blue-500 to-cyan-400",
    description: "Master wisdom and learning",
    quests: 12,
    unlocked: true,
  },
  {
    id: "fitness",
    name: "Fitness Arena",
    icon: Dumbbell,
    colorClass: "text-strength",
    bgGradient: "from-red-600/30 via-red-500/20 to-orange-500/10",
    borderGlow: "border-red-500/40",
    hoverShadow: "group-hover:shadow-[0_0_40px_hsl(0,84%,60%,0.25)]",
    iconBg: "from-red-500 to-orange-400",
    description: "Build strength and endurance",
    quests: 8,
    unlocked: true,
  },
  {
    id: "creative",
    name: "Creative Forest",
    icon: Palette,
    colorClass: "text-creativity",
    bgGradient: "from-purple-600/30 via-purple-500/20 to-pink-500/10",
    borderGlow: "border-purple-500/40",
    hoverShadow: "group-hover:shadow-[0_0_40px_hsl(280,87%,65%,0.25)]",
    iconBg: "from-purple-500 to-pink-400",
    description: "Unleash your imagination",
    quests: 10,
    unlocked: true,
  },
  {
    id: "tech",
    name: "Tech City",
    icon: Monitor,
    colorClass: "text-logic",
    bgGradient: "from-emerald-600/30 via-emerald-500/20 to-green-500/10",
    borderGlow: "border-emerald-500/40",
    hoverShadow: "group-hover:shadow-[0_0_40px_hsl(142,71%,45%,0.25)]",
    iconBg: "from-emerald-500 to-green-400",
    description: "Conquer code and systems",
    quests: 15,
    unlocked: true,
  },
];

export function WorldMap({ onSelectRegion, selectedRegion }: WorldMapProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-primary/20">
          <Map className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">World Map</h3>
        <Sparkles className="w-4 h-4 text-muted-foreground ml-auto" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {regions.map((region, index) => {
          const Icon = region.icon;
          const isSelected = selectedRegion === region.id;

          return (
            <motion.button
              key={region.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectRegion(region.id)}
              className={cn(
                "relative p-4 rounded-xl border text-left transition-all group overflow-hidden",
                "bg-gradient-to-br",
                region.bgGradient,
                isSelected ? region.borderGlow : "border-border/50",
                region.hoverShadow
              )}
            >
              {/* Background glow effect */}
              <motion.div
                animate={{
                  opacity: isSelected ? [0.3, 0.5, 0.3] : 0.15,
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={cn(
                  "absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-2xl",
                  `bg-gradient-to-r ${region.iconBg}`
                )}
              />

              <div className="relative">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-3",
                    "bg-gradient-to-br",
                    region.iconBg,
                    "shadow-lg"
                  )}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Region info */}
                <h4 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                  {region.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {region.description}
                </p>

                {/* Quest count and arrow */}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs font-medium text-muted-foreground bg-background/50 px-2 py-0.5 rounded-full">
                    {region.quests} quests
                  </span>
                  <motion.div
                    animate={{ x: isSelected ? 2 : 0 }}
                    className={cn("transition-colors", region.colorClass)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>

              {/* Selected indicator */}
              {isSelected && (
                <motion.div
                  layoutId="selected-region-border"
                  className={cn(
                    "absolute inset-0 rounded-xl border-2",
                    region.borderGlow
                  )}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected region detail */}
      {selectedRegion && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 pt-4 border-t border-border"
        >
          <p className="text-xs text-muted-foreground text-center">
            Click a region to filter quests
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
