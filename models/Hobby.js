import mongoose from "mongoose";

const hobbySchema = new mongoose.Schema({
  userId: String,
  name: String,
  level: { type: String, default: "Seed" },
  streak: { type: Number, default: 0 },
  lastCompleted: Date
});

export default mongoose.model("Hobby", hobbySchema);
