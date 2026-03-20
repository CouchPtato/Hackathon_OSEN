import Hobby from "../models/Hobby.js";

export const createHobby = async (req, res) => {
  const { userId, name } = req.body;

  const hobby = new Hobby({ userId, name });
  await hobby.save();

  res.json(hobby);
};

export const getHobbies = async (req, res) => {
  const hobbies = await Hobby.find({ userId: req.params.userId });
  res.json(hobbies);
};
