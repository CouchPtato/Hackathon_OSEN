import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  hobbyId: String,
  title: String,
  completed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Task", taskSchema);
