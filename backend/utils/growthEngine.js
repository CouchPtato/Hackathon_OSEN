export const updateGrowth = (hobby) => {
  const streak = hobby.streak;

  if (streak >= 21) return "Tree";
  if (streak >= 7) return "Plant";
  if (streak >= 3) return "Sprout";
  return "Seed";
};
