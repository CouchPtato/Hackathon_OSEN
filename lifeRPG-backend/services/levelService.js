exports.handleXP = (user, gainedXP) => {
  user.xp += gainedXP;

  let xpRequired = user.level * 100;

  while (user.xp >= xpRequired) {
    user.xp -= xpRequired;
    user.level += 1;
    xpRequired = user.level * 100;
  }

  return user;
};