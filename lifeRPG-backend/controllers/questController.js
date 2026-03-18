const Quest = require('../models/Quest');
const User = require('../models/User');
const { handleXP } = require('../services/levelService');
const { applyStats } = require('../services/statService');

exports.getQuests = async (req, res) => {
  const quests = await Quest.find({ userId: req.user.id });
  res.json(quests);
};

exports.createQuest = async (req, res) => {
  const quest = await Quest.create({
    ...req.body,
    userId: req.user.id
  });
  res.json(quest);
};

exports.completeQuest = async (req, res) => {
  const quest = await Quest.findById(req.params.id);
  const user = await User.findById(req.user.id);

  if (!quest || quest.status === 'completed')
    return res.status(400).json({ msg: "Invalid quest" });

  quest.status = 'completed';

  handleXP(user, quest.rewards.xp);
  applyStats(user, quest.rewards.statBoosts);

  await quest.save();
  await user.save();

  res.json({ msg: "Quest completed", user });
};