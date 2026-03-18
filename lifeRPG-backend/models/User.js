const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  class: String,
  stats: {
    strength: { type: Number, default: 0 },
    intelligence: { type: Number, default: 0 },
    creativity: { type: Number, default: 0 },
    charisma: { type: Number, default: 0 },
    logic: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);