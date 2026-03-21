export type PlantLevel = "Seed" | "Sprout" | "Plant" | "Tree";

export type GardenerLevel = "Beginner Gardener" | "Growing Gardener" | "Pro Gardener" | "Master Gardener";

export interface GardenerProfile {
  name: string;
  level: GardenerLevel;
  totalXp: number;
  totalTasksCompleted: number;
  longestStreak: number;
  joinDate: Date;
}

export interface Hobby {
  id: string;
  name: string;
  level: PlantLevel;
  streak: number;
  xp: number;
  maxXp: number;
  waterLevel: number; // 0-100
  lastCaredAt?: Date;
  careActions: number; // total care actions performed
}

export interface Task {
  id: string;
  hobbyId: string;
  title: string;
  completed: boolean;
}

export const LEVEL_ORDER: PlantLevel[] = ["Seed", "Sprout", "Plant", "Tree"];

export const LEVEL_XP_THRESHOLDS: Record<PlantLevel, number> = {
  Seed: 100,
  Sprout: 250,
  Plant: 500,
  Tree: 1000,
};

export function getNextLevel(current: PlantLevel): PlantLevel | null {
  const idx = LEVEL_ORDER.indexOf(current);
  if (idx < LEVEL_ORDER.length - 1) {
    return LEVEL_ORDER[idx + 1];
  }
  return null;
}

export const GARDENER_LEVELS: { level: GardenerLevel; xp: number }[] = [
  { level: "Beginner Gardener", xp: 0 },
  { level: "Growing Gardener", xp: 50 },
  { level: "Pro Gardener", xp: 150 },
  { level: "Master Gardener", xp: 500 },
];

export function getGardenerLevel(totalXp: number): GardenerLevel {
  for (let i = GARDENER_LEVELS.length - 1; i >= 0; i--) {
    if (totalXp >= GARDENER_LEVELS[i].xp) {
      return GARDENER_LEVELS[i].level;
    }
  }
  return "Beginner Gardener";
}
