import Task from "../models/Task.js";
import Hobby from "../models/Hobby.js";
import { generateTasks } from "../services/aiService.js";
import { updateGrowth } from "../utils/growthEngine.js";

export const createAITasks = async (req, res) => {
  const { hobbyId, hobbyName } = req.body;

  const aiResponse = await generateTasks(hobbyName);

  const task = new Task({
    hobbyId,
    title: aiResponse,
  });

  await task.save();

  res.json(task);
};

export const completeTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = true;
  await task.save();

  const hobby = await Hobby.findById(task.hobbyId);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Check if last completion was on a different day
  if (hobby.lastCompleted) {
    const lastCompleted = new Date(hobby.lastCompleted);
    const lastCompletedDay = new Date(
      lastCompleted.getFullYear(),
      lastCompleted.getMonth(),
      lastCompleted.getDate()
    );

    // Only increment streak if this is the first completion of the day
    if (lastCompletedDay.getTime() !== today.getTime()) {
      hobby.streak += 1;
    }
  } else {
    // First task ever completed - start streak at 1
    hobby.streak = 1;
  }

  hobby.level = updateGrowth(hobby);
  hobby.lastCompleted = now;

  await hobby.save();

  res.json({ task, hobby });
};
