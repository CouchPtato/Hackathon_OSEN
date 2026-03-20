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

  hobby.streak += 1;
  hobby.level = updateGrowth(hobby);
  hobby.lastCompleted = new Date();

  await hobby.save();

  res.json({ task, hobby });
};
