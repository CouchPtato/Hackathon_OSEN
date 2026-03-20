export type PlantLevel = "Seed" | "Sprout" | "Plant" | "Tree";

export interface Hobby {
  _id: string;
  userId: string;
  name: string;
  level: PlantLevel;
  streak: number;
  lastCompleted?: Date;
}

export interface Task {
  _id: string;
  hobbyId: string;
  title: string;
  completed: boolean;
  date: Date;
}

export interface User {
  _id: string;
  name: string;
  avatar?: string;
  totalXp: number;
  currentLevel: number;
}

// XP thresholds for user levels
export const XP_PER_LEVEL = 100;

// Streak thresholds for plant growth
export const GROWTH_THRESHOLDS = {
  Seed: 0,
  Sprout: 3,
  Plant: 7,
  Tree: 21,
} as const;

export const getLevelFromStreak = (streak: number): PlantLevel => {
  if (streak >= 21) return "Tree";
  if (streak >= 7) return "Plant";
  if (streak >= 3) return "Sprout";
  return "Seed";
};

export const getXpForLevel = (level: number): number => {
  return level * XP_PER_LEVEL;
};
