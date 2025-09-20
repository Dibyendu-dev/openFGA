import {
  createTodo,
  findAllTodos,
  findTodoById,
  updateTodo,
  deleteTodo,
} from "../repository/todo.repository.js";

async function createTodoService(todoData, userId) {
  const todo = await createTodo({
    ...todoData,
    createdBy: userId,
  });
  return todo;
}

async function getAllTodosService(userId) {
  const todos = await findAllTodos(userId);
  return todos;
}

async function getTodoByIdService(todoId, userId) {
  const todo = await findTodoById(todoId, userId);
  if (!todo) {
    throw new Error("Todo not found or you don't have permission to access it");
  }
  return todo;
}

async function updateTodoService(todoId, userId, updateData) {
  const todo = await updateTodo(todoId, userId, updateData);
  if (!todo) {
    throw new Error("Todo not found or you don't have permission to update it");
  }
  return todo;
}

async function deleteTodoService(todoId, userId) {
  const todo = await deleteTodo(todoId, userId);
  if (!todo) {
    throw new Error("Todo not found or you don't have permission to delete it");
  }
  return todo;
}

export {
  createTodoService,
  getAllTodosService,
  getTodoByIdService,
  updateTodoService,
  deleteTodoService,
};
