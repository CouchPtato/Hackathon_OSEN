const mongoose = require('mongoose');

const gearSchema = new mongoose.Schema({
  name: String,
  type: String,
  unlockCondition: String,
  statBoost: Object,
  rarity: String
});

module.exports = mongoose.model('Gear', gearSchema);