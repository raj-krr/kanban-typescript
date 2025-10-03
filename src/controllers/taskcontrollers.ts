import { Response } from "express";
import Task, { ITask } from "../models/Task";
import { AuthRequest } from "../middlewares/Middlewares";

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    const { title, description, status } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const task: ITask = await Task.create({
      title,
      description,
      status,
      userId: req.userId,
    });

    res.status(201).json(task);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (err: any) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Task deleted" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
