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
  Shield,
  Sparkles
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
    bgGradient: "from-gray-500/20 to-gray-600/10",
    borderColor: "border-common/30",
    glowColor: "group-hover:shadow-[0_0_20px_hsl(220,10%,60%,0.15)]",
    label: "Common",
    iconBg: "from-gray-400 to-gray-500",
  },
  uncommon: {
    color: "text-uncommon",
    bgGradient: "from-emerald-500/20 to-green-600/10",
    borderColor: "border-uncommon/30",
    glowColor: "group-hover:shadow-[0_0_25px_hsl(142,76%,46%,0.2)]",
    label: "Uncommon",
    iconBg: "from-emerald-400 to-green-500",
  },
  rare: {
    color: "text-rare",
    bgGradient: "from-blue-500/20 to-cyan-600/10",
    borderColor: "border-rare/30",
    glowColor: "group-hover:shadow-[0_0_30px_hsl(217,91%,60%,0.25)]",
    label: "Rare",
    iconBg: "from-blue-400 to-cyan-500",
  },
  epic: {
    color: "text-epic",
    bgGradient: "from-purple-500/20 to-pink-600/10",
    borderColor: "border-epic/30",
    glowColor: "group-hover:shadow-[0_0_35px_hsl(280,82%,62%,0.3)]",
    label: "Epic",
    iconBg: "from-purple-400 to-pink-500",
  },
  legendary: {
    color: "text-legendary",
    bgGradient: "from-amber-500/20 to-yellow-600/10",
    borderColor: "border-legendary/30",
    glowColor: "group-hover:shadow-[0_0_40px_hsl(43,96%,56%,0.35)]",
    label: "Legendary",
    iconBg: "from-amber-400 to-yellow-500",
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
  const unlockedCount = gear.filter(g => g.unlocked).length;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/20">
            <Swords className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Gear Collection</h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {unlockedCount}/{gear.length} unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {gear.map((item, index) => {
          const rarity = rarityConfig[item.rarity];
          const Icon = iconMap[item.icon] || Shield;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={item.unlocked ? { scale: 1.03, y: -4 } : {}}
              className={cn(
                "relative p-4 rounded-xl border transition-all group overflow-hidden",
                "bg-gradient-to-br",
                item.unlocked ? rarity.bgGradient : "from-secondary/50 to-secondary/30",
                item.unlocked ? rarity.borderColor : "border-border",
                item.unlocked && rarity.glowColor,
                !item.unlocked && "opacity-60"
              )}
            >
              {/* Background glow for legendary items */}
              {item.unlocked && item.rarity === "legendary" && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/20 blur-xl"
                />
              )}

              {!item.unlocked && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm rounded-xl z-10"
                >
                  <div className="text-center">
                    <Lock className="w-6 h-6 text-muted-foreground mx-auto" />
                    <p className="text-xs text-muted-foreground mt-1">Locked</p>
                  </div>
                </motion.div>
              )}

              <div className="relative text-center">
                {/* Item icon */}
                <motion.div
                  whileHover={item.unlocked ? { rotate: 10, scale: 1.1 } : {}}
                  className={cn(
                    "w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-3",
                    item.unlocked 
                      ? `bg-gradient-to-br ${rarity.iconBg} shadow-lg`
                      : "bg-secondary"
                  )}
                >
                  <Icon className={cn(
                    "w-7 h-7",
                    item.unlocked ? "text-white" : "text-muted-foreground"
                  )} />
                </motion.div>

                {/* Item name */}
                <h4 className="text-sm font-semibold text-foreground truncate">
                  {item.name}
                </h4>
                
                {/* Rarity label */}
                <span
                  className={cn(
                    "text-xs font-medium inline-flex items-center gap-1 mt-1",
                    item.unlocked ? rarity.color : "text-muted-foreground"
                  )}
                >
                  {item.rarity === "legendary" && item.unlocked && (
                    <Sparkles className="w-3 h-3" />
                  )}
                  {rarity.label}
                </span>

                {/* Stat boosts */}
                {item.unlocked && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="flex flex-wrap justify-center gap-1 mt-2"
                  >
                    {Object.entries(item.statBoosts).map(([stat, value]) => (
                      <span
                        key={stat}
                        className="px-1.5 py-0.5 rounded bg-background/60 text-xs text-muted-foreground font-medium"
                      >
                        +{value} {statLabels[stat as keyof Stats]}
                      </span>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
