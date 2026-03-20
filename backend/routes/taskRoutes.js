import express from "express";
import { createAITasks, completeTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/generate", createAITasks);
router.put("/complete/:id", completeTask);

export default router;
