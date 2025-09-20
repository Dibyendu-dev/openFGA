import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from "../controller/todo.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes require authentication
 router.use(authenticateToken);

// GET /api/todos - Get all todos for the authenticated user
router.get("/", getAllTodos);

// POST /api/todos - Create a new todo
router.post("/", createTodo);

// GET /api/todos/:id - Get a specific todo by ID
router.get("/:id", getTodoById);

// PUT /api/todos/:id - Update a specific todo
router.put("/:id", updateTodo);

// DELETE /api/todos/:id - Delete a specific todo
router.delete("/:id", deleteTodo);

export default router;
