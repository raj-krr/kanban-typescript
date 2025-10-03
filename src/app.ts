import express from "express";
import authRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
