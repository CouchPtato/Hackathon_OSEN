"use client";

import { motion } from "framer-motion";
import { 
  Swords, 
  Lock,
  Keyboard,
  Footprints,
  Crown,
  Gem,
  Hand,
  Shield
} from "lucide-react";
import type { GearItem, Stats } from "@/lib/types";
import { cn } from "@/lib/utils";

interface GearSectionProps {
  gear: GearItem[];
}

const iconMap: Record<string, React.ElementType> = {
  keyboard: Keyboard,
  footprints: Footprints,
  crown: Crown,
  gem: Gem,
  hand: Hand,
  shield: Shield,
};

const rarityConfig = {
  common: {
    color: "text-common",
    bgColor: "bg-common/10",
    borderColor: "border-common/30",
    label: "Common",
  },
  uncommon: {
    color: "text-uncommon",
    bgColor: "bg-uncommon/10",
    borderColor: "border-uncommon/30",
    label: "Uncommon",
  },
  rare: {
    color: "text-rare",
    bgColor: "bg-rare/10",
    borderColor: "border-rare/30",
    label: "Rare",
  },
  epic: {
    color: "text-epic",
    bgColor: "bg-epic/10",
    borderColor: "border-epic/30",
    label: "Epic",
  },
  legendary: {
    color: "text-legendary",
    bgColor: "bg-legendary/10",
    borderColor: "border-legendary/30",
    label: "Legendary",
  },
};

const statLabels: Record<keyof Stats, string> = {
  strength: "STR",
  intelligence: "INT",
  creativity: "CRE",
  charisma: "CHA",
  logic: "LOG",
};

export function GearSection({ gear }: GearSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Swords className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">Gear Collection</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gear.map((item, index) => {
          const rarity = rarityConfig[item.rarity];
          const Icon = iconMap[item.icon] || Shield;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={item.unlocked ? { scale: 1.05, y: -5 } : {}}
              className={cn(
                "relative p-4 rounded-xl border transition-all",
                item.unlocked ? rarity.bgColor : "bg-secondary/50",
                item.unlocked ? rarity.borderColor : "border-secondary",
                !item.unlocked && "opacity-60"
              )}
            >
              {!item.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-xl backdrop-blur-sm">
                  <Lock className="w-6 h-6 text-muted-foreground" />
                </div>
              )}

              <div className="text-center">
                <div
                  className={cn(
                    "w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2",
                    item.unlocked ? rarity.bgColor : "bg-secondary",
                    item.unlocked && rarity.color
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h4 className="text-sm font-semibold text-foreground truncate">
                  {item.name}
                </h4>
                
                <span
                  className={cn(
                    "text-xs font-medium",
                    item.unlocked ? rarity.color : "text-muted-foreground"
                  )}
                >
                  {rarity.label}
                </span>

                {item.unlocked && (
                  <div className="flex flex-wrap justify-center gap-1 mt-2">
                    {Object.entries(item.statBoosts).map(([stat, value]) => (
                      <span
                        key={stat}
                        className="px-1.5 py-0.5 rounded bg-background/50 text-xs text-muted-foreground"
                      >
                        +{value} {statLabels[stat as keyof Stats]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
