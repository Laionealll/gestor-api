# API de Gestión de Tareas

## Descripción
Esta API permite gestionar una lista de tareas con las operaciones básicas de un CRUD:
- Crear una tarea
- Obtener todas las tareas
- Actualizar una tarea existente
- Eliminar una tarea

La API está implementada con **Node.js** y **Express** y está desplegada en **Vercel**.

## Endpoints Disponibles

### Obtener todas las tareas
**GET** `/api/tasks`

#### Respuesta exitosa (200):
```json
{
  "tasks": ["Tarea 1", "Tarea 2", "Tarea 3"]
}
```

### Crear una nueva tarea
**POST** `/api/tasks`

#### Cuerpo de la solicitud:
```json
{
  "task": "Nueva tarea"
}
```

#### Respuesta exitosa (201):
```json
{
  "message": "Tarea \"Nueva tarea\" agregada.",
  "tasks": ["Tarea 1", "Tarea 2", "Nueva tarea"]
}
```

### Actualizar una tarea
**PUT** `/api/tasks`

#### Cuerpo de la solicitud:
```json
{
  "id": 0,
  "newTask": "Tarea actualizada"
}
```

#### Respuesta exitosa (200):
```json
{
  "message": "Tarea actualizada de \"Tarea 1\" a \"Tarea actualizada\"",
  "tasks": ["Tarea actualizada", "Tarea 2"]
}
```

### Eliminar una tarea
**DELETE** `/api/tasks?id=0`

#### Respuesta exitosa (200):
```json
{
  "message": "Tarea \"Tarea 1\" eliminada.",
  "tasks": ["Tarea 2"]
}
```

## Despliegue
La API está disponible en el siguiente enlace:
[https://gestor-api-git-main-laioneallissacs-projects.vercel.app](https://gestor-api-git-main-laioneallissacs-projects.vercel.app)

## Tecnologías Usadas
- **Node.js**
- **Express.js**
- **Vercel** para el despliegue

## Instalación y Uso Local
Si deseas correr esta API en tu máquina local, sigue estos pasos:

1. Clona el repositorio:
```sh
git clone https://github.com/tu-repositorio.git
```
2. Instala las dependencias:
```sh
npm install
```
3. Inicia el servidor:
```sh
npm start
```

El servidor correrá en `http://localhost:80/`.

