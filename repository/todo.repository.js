import { Todo } from "../models/todo.js";

async function createTodo(todoData) {
  const todo = new Todo(todoData);
  await todo.save();
  return todo;
}

async function findAllTodos(userId) {
  return Todo.find({ createdBy: userId }).sort({ createdAt: -1 });
}

async function findTodoById(todoId, userId) {
  return Todo.findOne({ _id: todoId, createdBy: userId });
}

async function updateTodo(todoId, userId, updateData) {
  return Todo.findOneAndUpdate({ _id: todoId, createdBy: userId }, updateData, {
    new: true,
    runValidators: true,
  });
}

async function deleteTodo(todoId, userId) {
  return Todo.findOneAndDelete({ _id: todoId, createdBy: userId });
}

export { createTodo, findAllTodos, findTodoById, updateTodo, deleteTodo };
