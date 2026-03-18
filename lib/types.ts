export interface Stats {
  strength: number;
  intelligence: number;
  creativity: number;
  charisma: number;
  logic: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  statRewards: Partial<Stats>;
  completed: boolean;
  category: "knowledge" | "fitness" | "creative" | "tech" | "social";
}

export interface GearItem {
  id: string;
  name: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  statBoosts: Partial<Stats>;
  icon: string;
  unlocked: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  title: string;
  stats: Stats;
  streak: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  level: number;
  xp: number;
  avatar: string;
}

export interface Notification {
  id: string;
  type: "xp" | "level" | "stat" | "quest" | "gear";
  message: string;
  value?: number;
}
