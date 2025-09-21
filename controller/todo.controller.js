import {
  createTodoService,
  getAllTodosService,
  getTodoByIdService,
  updateTodoService,
  deleteTodoService,
} from "../service/todoService.js";
import {
  writeTuple,
  listUserObjects,
  checkAccess,
  deleteTuple,
} from "../openfga.js";

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

    // Create OpenFGA tuple: user:userId -> owner -> todo:todoId
    await writeTuple(`user:${userId}`, "owner", `todo:${todo._id}`);

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

    // Get all todos that user has access to from OpenFGA
    const allowedTodos = await listUserObjects(
      `user:${userId}`,
      "owner",
      "todo"
    );

    // Extract todo IDs from OpenFGA response
    const allowedTodoIds = allowedTodos.objects.map((obj) => obj.split(":")[1]);

    // Get todos from database based on allowed IDs
    const todos = await getAllTodosService(userId);

    // Filter todos to only include those the user has access to
    const allowedTodosData = todos.filter((todo) =>
      allowedTodoIds.includes(todo._id.toString())
    );

    res.status(200).json({
      success: true,
      message: "Todos retrieved successfully",
      data: allowedTodosData,
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

    // Check if user has access to this todo via OpenFGA
    const hasAccess = await checkAccess(
      `user:${userId}`,
      "owner",
      `todo:${id}`
    );

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to access this todo",
      });
    }

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

    // Check if user has access to this todo via OpenFGA
    const hasAccess = await checkAccess(
      `user:${userId}`,
      "owner",
      `todo:${id}`
    );

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to update this todo",
      });
    }

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

    // Check if user has access to this todo via OpenFGA
    const hasAccess = await checkAccess(
      `user:${userId}`,
      "owner",
      `todo:${id}`
    );

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to delete this todo",
      });
    }

    // Delete the todo from database
    await deleteTodoService(id, userId);

    // Delete the tuple from OpenFGA
    await deleteTuple(`user:${userId}`, "owner", `todo:${id}`);

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
