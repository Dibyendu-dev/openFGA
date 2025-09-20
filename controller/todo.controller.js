import {
  createTodoService,
  getAllTodosService,
  getTodoByIdService,
  updateTodoService,
  deleteTodoService,
} from "../service/todoService.js";

async function createTodo(req, res) {
  try {
    const { title, description, priority } = req.body;
    const userId = req.user.id;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const todo = await createTodoService(
      { title, description, priority },
      userId
    );

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating todo",
      error: error.message,
    });
  }
}

async function getAllTodos(req, res) {
  try {
    const userId = req.user.id;
    const todos = await getAllTodosService(userId);

    res.status(200).json({
      success: true,
      message: "Todos retrieved successfully",
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving todos",
      error: error.message,
    });
  }
}

async function getTodoById(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const todo = await getTodoByIdService(id, userId);

    res.status(200).json({
      success: true,
      message: "Todo retrieved successfully",
      data: todo,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    const todo = await updateTodoService(id, userId, updateData);

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteTodo(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await deleteTodoService(id, userId);

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

export { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo };
