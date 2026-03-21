export type PlantLevel = "Seed" | "Sprout" | "Plant" | "Tree";

export interface Hobby {
  id: string;
  name: string;
  level: PlantLevel;
  streak: number;
  xp: number;
  maxXp: number;
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
