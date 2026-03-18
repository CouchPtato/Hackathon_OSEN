const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  type: String,
  rewards: {
    xp: Number,
    statBoosts: Object
  },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Quest', questSchema);