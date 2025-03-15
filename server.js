// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { addTask, listTasks, updateTask, removeTask, getTasks } = require('./tasks');

const app = express();
const PORT = process.env.PORT || 80;

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Página de inicio
app.get('/', (req, res) => {
  res.send(`
    <h1>API de Gestor de Tareas</h1>
    <p>Endpoints disponibles:</p>
    <ul>
      <li>GET /api/tasks - Obtener todas las tareas</li>
      <li>POST /api/tasks - Crear una nueva tarea</li>
      <li>PUT /api/tasks - Actualizar una tarea</li>
      <li>DELETE /api/tasks?id=0 - Eliminar una tarea</li>
    </ul>
  `);
});

// Rutas de la API
app.get('/api/tasks', (req, res) => {
  // Devuelve la lista de tareas
  return res.status(200).json({ tasks: getTasks() });
});

app.post('/api/tasks', (req, res) => {
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
});

app.put('/api/tasks', (req, res) => {
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
});

app.delete('/api/tasks', (req, res) => {
  // Elimina una tarea
  const id = req.query.id;
  if (id === undefined) {
    return res.status(400).json({ error: "El parámetro 'id' es obligatorio." });
  }
  const result = removeTask(parseInt(id));
  return res.status(result.success ? 200 : 400).json({
    message: result.message,
    tasks: getTasks()
  });
});

// Manejo de errores para rutas no existentes
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
