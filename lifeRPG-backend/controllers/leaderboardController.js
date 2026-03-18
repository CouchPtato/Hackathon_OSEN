const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
  const users = await User.find()
    .sort({ level: -1, xp: -1 })
    .limit(10);

  res.json(users);
};