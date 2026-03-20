import express from "express";
import { createHobby, getHobbies } from "../controllers/hobbyController.js";

const router = express.Router();

router.post("/", createHobby);
router.get("/:userId", getHobbies);

export default router;
