// api/tasks.js
const { addTask, listTasks, updateTask, removeTask, getTasks } = require("../tasks");

// Controlador para Vercel
module.exports = (req, res) => {
  // Configuración CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Content-Type, Accept');

  // Manejar opciones de preflight CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method } = req;

  switch (method) {
    case "GET":
      // Devuelve la lista de tareas
      return res.status(200).json({ tasks: getTasks() });

    case "POST": {
      // Agrega una nueva tarea
      const { task } = req.body;
      if (!task) {
        return res.status(400).json({ error: "El campo 'task' es obligatorio." });
      }
      const result = addTask(task);
      return res.status(result.success ? 201 : 400).json({
        message: result.message,
        tasks: getTasks()
      });
    }

    case "PUT": {
      // Actualiza una tarea existente
      const { id, newTask } = req.body;
      if (id === undefined || !newTask) {
        return res.status(400).json({ error: "Los campos 'id' y 'newTask' son obligatorios." });
      }
      const result = updateTask(parseInt(id), newTask);
      return res.status(result.success ? 200 : 400).json({
        message: result.message,
        tasks: getTasks()
      });
    }

    case "DELETE": {
      // Elimina una tarea
      const { id } = req.query;
      if (id === undefined) {
        return res.status(400).json({ error: "El parámetro 'id' es obligatorio." });
      }
      const result = removeTask(parseInt(id));
      return res.status(result.success ? 200 : 400).json({
        message: result.message,
        tasks: getTasks()
      });
    }

    default:
      // Método no permitido
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Método ${method} no permitido.`);
  }
};