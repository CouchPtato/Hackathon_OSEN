exports.generateQuest = (req, res) => {
  const { goal } = req.body;

  const quests = [
    { title: `Learn basics of ${goal}`, xp: 50 },
    { title: `Build project in ${goal}`, xp: 100 },
    { title: `Practice ${goal} for 30 mins`, xp: 30 }
  ];

  res.json(quests);
};