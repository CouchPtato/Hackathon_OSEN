import type { Quest, GearItem, LeaderboardEntry, User } from "./types";

export const mockUser: User = {
  id: "1",
  name: "Hero",
  avatar: "/avatar.png",
  xp: 2450,
  level: 5,
  title: "Apprentice",
  stats: {
    strength: 45,
    intelligence: 62,
    creativity: 38,
    charisma: 55,
    logic: 71,
  },
  streak: 7,
};

export const mockQuests: Quest[] = [
  {
    id: "1",
    title: "Complete a Coding Challenge",
    description: "Solve a medium-difficulty algorithm problem on any coding platform.",
    xpReward: 150,
    statRewards: { intelligence: 3, logic: 5 },
    completed: false,
    category: "tech",
  },
  {
    id: "2",
    title: "Morning Workout",
    description: "Complete a 30-minute workout session before noon.",
    xpReward: 100,
    statRewards: { strength: 5, charisma: 2 },
    completed: false,
    category: "fitness",
  },
  {
    id: "3",
    title: "Read for 30 Minutes",
    description: "Read a non-fiction book for at least 30 minutes.",
    xpReward: 80,
    statRewards: { intelligence: 4, creativity: 2 },
    completed: false,
    category: "knowledge",
  },
  {
    id: "4",
    title: "Create Something New",
    description: "Sketch, write, or design something creative today.",
    xpReward: 120,
    statRewards: { creativity: 6, charisma: 2 },
    completed: false,
    category: "creative",
  },
  {
    id: "5",
    title: "Network with Peers",
    description: "Have a meaningful conversation with a colleague or friend.",
    xpReward: 75,
    statRewards: { charisma: 5, intelligence: 1 },
    completed: false,
    category: "social",
  },
];

export const mockGear: GearItem[] = [
  {
    id: "1",
    name: "Keyboard of Efficiency",
    rarity: "rare",
    statBoosts: { logic: 5, intelligence: 3 },
    icon: "keyboard",
    unlocked: true,
  },
  {
    id: "2",
    name: "Boots of Swiftness",
    rarity: "uncommon",
    statBoosts: { strength: 4 },
    icon: "footprints",
    unlocked: true,
  },
  {
    id: "3",
    name: "Crown of Wisdom",
    rarity: "epic",
    statBoosts: { intelligence: 8, creativity: 4 },
    icon: "crown",
    unlocked: true,
  },
  {
    id: "4",
    name: "Amulet of Charisma",
    rarity: "legendary",
    statBoosts: { charisma: 10, creativity: 5 },
    icon: "gem",
    unlocked: false,
  },
  {
    id: "5",
    name: "Gloves of Precision",
    rarity: "common",
    statBoosts: { logic: 2 },
    icon: "hand",
    unlocked: true,
  },
  {
    id: "6",
    name: "Helm of Focus",
    rarity: "rare",
    statBoosts: { intelligence: 5, logic: 3 },
    icon: "shield",
    unlocked: false,
  },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "DragonSlayer99", level: 42, xp: 176400, avatar: "D" },
  { rank: 2, name: "QuestMaster", level: 38, xp: 144400, avatar: "Q" },
  { rank: 3, name: "NightOwl", level: 35, xp: 122500, avatar: "N" },
  { rank: 4, name: "CodeWizard", level: 32, xp: 102400, avatar: "C" },
  { rank: 5, name: "Hero", level: 5, xp: 2450, avatar: "H" },
  { rank: 6, name: "NewPlayer", level: 3, xp: 450, avatar: "P" },
];
