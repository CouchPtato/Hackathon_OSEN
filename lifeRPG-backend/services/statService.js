exports.applyStats = (user, statBoosts) => {
  for (let key in statBoosts) {
    user.stats[key] += statBoosts[key];
  }
  return user;
};