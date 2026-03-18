const User = require('../models/User');
const { handleXP } = require('../services/levelService');

const activityMap = {
  coding: { stat: "logic", xp: 20 },
  gym: { stat: "strength", xp: 20 },
  reading: { stat: "intelligence", xp: 15 }
};

exports.logActivity = async (req, res) => {
  const { activityType, duration } = req.body;

  const user = await User.findById(req.user.id);
  const activity = activityMap[activityType];

  if (!activity) return res.status(400).json({ msg: "Invalid activity" });

  user.stats[activity.stat] += Math.floor(duration / 10);
  handleXP(user, activity.xp);

  await user.save();

  res.json(user);
};