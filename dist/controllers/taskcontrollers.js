"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const createTask = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: "Unauthorized: User ID missing" });
        }
        const { title, description, status } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }
        const task = await Task_1.default.create({
            title,
            description,
            status,
            userId: req.userId,
        });
        res.status(201).json(task);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.createTask = createTask;
const getTasks = async (req, res) => {
    try {
        const tasks = await Task_1.default.find({ userId: req.userId });
        res.json(tasks);
    }
    catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
};
exports.getTasks = getTasks;
const updateTask = async (req, res) => {
    try {
        const task = await Task_1.default.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
        res.json(task);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        await Task_1.default.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        res.json({ message: "Task deleted" });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.deleteTask = deleteTask;
