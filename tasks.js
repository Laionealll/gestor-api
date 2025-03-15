// tasks.js
const tasks = [];
const MAX_TASKS = 10;

function addTask(task) {
  if (tasks.length >= MAX_TASKS) {
    return { success: false, message: "No puedes agregar más tareas. Límite alcanzado." };
  }
  tasks.push(task);
  return { success: true, message: `Tarea "${task}" agregada.` };
}

function listTasks() {
  return tasks;
}

function removeTask(index) {
  if (index < 0 || index >= tasks.length) {
    return { success: false, message: "Índice inválido." };
  }
  const removed = tasks.splice(index, 1)[0];
  return { success: true, message: `Tarea "${removed}" eliminada.` };
}

function updateTask(index, newTask) {
  if (index < 0 || index >= tasks.length) {
    return { success: false, message: "Índice inválido." };
  }
  const oldTask = tasks[index];
  tasks[index] = newTask;
  return { success: true, message: `Tarea actualizada de "${oldTask}" a "${newTask}"` };
}

// Función para obtener la lista de tareas
function getTasks() {
  return tasks;
}

module.exports = { addTask, listTasks, removeTask, updateTask, getTasks };