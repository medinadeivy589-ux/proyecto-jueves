# 🗺️ ARQUITECTURA DEL PROYECTO

## 1. Diagrama de Arquitectura


> La arquitectura sigue un patrón de microservicios con tres componentes principales separados:

* **Frontend (Vercel):** Capa de presentación (React/Vite). Consume la API REST del Backend.
* **Backend (Render):** Servidor de aplicación (FastAPI/Python). Contiene la lógica de negocio (CRUD).
* **Base de Datos (Railway):** Persistencia de datos (MySQL).

## 2. Descripción de Componentes
* **Frontend (React/Vite):** Gestiona el estado de la aplicación usando hooks (`useState`, `useEffect`). [cite_start]Contiene los componentes funcionales (`TodoForm`, `TodoItem`) y centraliza las llamadas HTTP en `/services/api.js`[cite: 43, 46].
* **Backend (FastAPI/Python):** Utiliza SQLAlchemy para interactuar con MySQL. Las rutas (`/api/todos`) se definen en `/routers` y el modelo de datos se define en `/models`. [cite_start]La validación de datos se realiza con Pydantic [cite: 58-60].
* [cite_start]**Base de Datos (MySQL - Railway):** Contiene la tabla `tareas` con los campos requeridos (`id`, `title`, `description`, `status`, `created_at`)[cite: 74, 75].

## 3. Flujo de una Operación Típica: Crear Tarea

1.  **Usuario** ingresa datos en `TodoForm.jsx` y presiona "Añadir Tarea".
2.  **Frontend** (en `/services/api.js`) llama al endpoint `POST /api/todos` enviando un objeto JSON con `title` y `description`.
3.  **Backend (FastAPI)** recibe la petición.
4.  **Backend** valida los datos con el esquema Pydantic. [cite_start]Si el `title` está vacío, retorna error `422`[cite: 38].
5.  **Backend** utiliza SQLAlchemy para crear una nueva fila en la tabla `tareas` de Railway.
6.  **Railway** retorna el objeto recién creado.
7.  [cite_start]**Backend** retorna el objeto creado al Frontend con estado `201 Created`[cite: 136].
8.  **Frontend** actualiza su estado local (`setTodos`) para mostrar la nueva tarea sin recargar la página.

## 4. Pipeline de CI (GitHub Actions)
[cite_start]El workflow `ci.yml` se ejecuta en cada `push` o `pull_request`[cite: 102]. Su función es asegurar la calidad de la entrega:
1.  [cite_start]Instala las dependencias de Node.js en el directorio `/frontend`[cite: 105].
2.  [cite_start]Ejecuta `npm run build`[cite: 106]. [cite_start]Si el build falla por error de sintaxis o configuración, el pipeline **falla**, notificando al desarrollador[cite: 107, 108].