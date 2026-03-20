import type { Hobby, Task, User } from "./types";

export const mockUser: User = {
  _id: "user-1",
  name: "Garden Keeper",
  avatar: undefined,
  totalXp: 245,
  currentLevel: 3,
};

export const mockHobbies: Hobby[] = [
  {
    _id: "hobby-1",
    userId: "user-1",
    name: "Guitar",
    level: "Seed",
    streak: 1,
    lastCompleted: new Date(),
  },
  {
    _id: "hobby-2",
    userId: "user-1",
    name: "Fitness",
    level: "Sprout",
    streak: 5,
    lastCompleted: new Date(),
  },
  {
    _id: "hobby-3",
    userId: "user-1",
    name: "Reading",
    level: "Plant",
    streak: 12,
    lastCompleted: new Date(),
  },
  {
    _id: "hobby-4",
    userId: "user-1",
    name: "Meditation",
    level: "Tree",
    streak: 28,
    lastCompleted: new Date(),
  },
];

export const mockTasks: Task[] = [
  {
    _id: "task-1",
    hobbyId: "hobby-1",
    title: "Practice chord transitions for 15 minutes",
    completed: false,
    date: new Date(),
  },
  {
    _id: "task-2",
    hobbyId: "hobby-2",
    title: "Complete a 20-minute workout",
    completed: false,
    date: new Date(),
  },
  {
    _id: "task-3",
    hobbyId: "hobby-3",
    title: "Read 20 pages of your current book",
    completed: true,
    date: new Date(),
  },
  {
    _id: "task-4",
    hobbyId: "hobby-4",
    title: "10-minute morning meditation",
    completed: false,
    date: new Date(),
  },
];
