// Minimal User type for authentication and state
export interface User {
  id: string;
  name: string;
  email: string;
  // Add more fields as needed
}
// Gardener XP thresholds (single source of truth)
export const GARDENER_LEVEL_THRESHOLDS = [0, 500, 1500, 3000, 5000];

export function getGardenerXpInLevel(totalXp: number): number {
  if (totalXp >= GARDENER_LEVEL_THRESHOLDS[4]) return totalXp - GARDENER_LEVEL_THRESHOLDS[4];
  if (totalXp >= GARDENER_LEVEL_THRESHOLDS[3]) return totalXp - GARDENER_LEVEL_THRESHOLDS[3];
  if (totalXp >= GARDENER_LEVEL_THRESHOLDS[2]) return totalXp - GARDENER_LEVEL_THRESHOLDS[2];
  if (totalXp >= GARDENER_LEVEL_THRESHOLDS[1]) return totalXp - GARDENER_LEVEL_THRESHOLDS[1];
  return totalXp;
}

export function getGardenerXpToNextLevel(totalXp: number): number {
  if (totalXp >= GARDENER_LEVEL_THRESHOLDS[4]) return 0; // Maxed out
  if (totalXp >= GARDENER_LEVEL_THRESHOLDS[3]) return GARDENER_LEVEL_THRESHOLDS[4] - totalXp;
  if (totalXp >= GARDENER_LEVEL_THRESHOLDS[2]) return GARDENER_LEVEL_THRESHOLDS[3] - totalXp;
  if (totalXp >= GARDENER_LEVEL_THRESHOLDS[1]) return GARDENER_LEVEL_THRESHOLDS[2] - totalXp;
  return GARDENER_LEVEL_THRESHOLDS[1] - totalXp;
}
export type PlantLevel = "Seed" | "Sprout" | "Small Plant" | "Medium Plant" | "Fruit Stage" | "Ripe Fruit";

export type GardenerLevel = "Beginner" | "Growing" | "Pro" | "Master";

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

export const LEVEL_ORDER: PlantLevel[] = [
  "Seed",
  "Sprout",
  "Small Plant",
  "Medium Plant",
  "Fruit Stage",
  "Ripe Fruit"
];

export const LEVEL_XP_THRESHOLDS: Record<PlantLevel, number> = {
  Seed: 100,
  Sprout: 200,
  "Small Plant": 350,
  "Medium Plant": 550,
  "Fruit Stage": 800,
  "Ripe Fruit": 1000,
};

export function getNextLevel(current: PlantLevel): PlantLevel | null {
  const idx = LEVEL_ORDER.indexOf(current);
  if (idx < LEVEL_ORDER.length - 1) {
    return LEVEL_ORDER[idx + 1];
  }
  return null;
}

export const GARDENER_LEVELS: { level: GardenerLevel; xp: number }[] = [
  { level: "Beginner", xp: 0 },
  { level: "Growing", xp: 500 },
  { level: "Pro", xp: 1500 },
  { level: "Master", xp: 3000 },
];

export function getGardenerLevel(totalXp: number): GardenerLevel {
  for (let i = GARDENER_LEVELS.length - 1; i >= 0; i--) {
    if (totalXp >= GARDENER_LEVELS[i].xp) {
      return GARDENER_LEVELS[i].level;
    }
  }
  return "Beginner";
}
