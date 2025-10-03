"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskcontrollers_1 = require("../controllers/taskcontrollers");
const Middlewares_1 = require("../middlewares/Middlewares");
const router = express_1.default.Router();
router.post("/", Middlewares_1.authMiddleware, taskcontrollers_1.createTask);
router.get("/", Middlewares_1.authMiddleware, taskcontrollers_1.getTasks);
router.put("/:id", Middlewares_1.authMiddleware, taskcontrollers_1.updateTask);
router.delete("/:id", Middlewares_1.authMiddleware, taskcontrollers_1.deleteTask);
exports.default = router;
