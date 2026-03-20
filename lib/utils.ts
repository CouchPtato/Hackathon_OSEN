import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function xpForLevel(level: number): number {
  return Math.pow(level - 1, 2) * 100;
}

export function xpForNextLevel(level: number): number {
  return Math.pow(level, 2) * 100;
}

export function getTitle(level: number): string {
  if (level >= 50) return "Legendary Hero";
  if (level >= 40) return "Grand Master";
  if (level >= 30) return "Champion";
  if (level >= 20) return "Veteran";
  if (level >= 15) return "Expert";
  if (level >= 10) return "Journeyman";
  if (level >= 5) return "Apprentice";
  return "Novice";
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}
