# 🚀 Proyecto Final Integrador: Todo List Fullstack (Python + React)

Aplicación de gestión de tareas (Todo List) desarrollada como proyecto final integrador. Fullstack moderno con frontend en **React** y backend en **FastAPI** (Python).

## 📸 Preview

*Paleta oscura profesional*
*Acentos amarillo/naranja vibrante*
*Tipografía Inter moderna*
*Interfaz elegante y responsiva*

## 🛠️ Stack Tecnológico

| Componente | Tecnología | Versión | Rol |
| :--- | :--- | :--- | :--- |
| **Frontend** | React | 18+ | Librería UI |
| | Vite | 5+ | Build tool moderno |
| | Axios / Fetch | - | Cliente HTTP |
| **Backend** | FastAPI | Python 3.11+ | Framework API REST |
| | SQLAlchemy | - | ORM para Base de Datos |
| **Base de Datos**| MySQL | - | Persistencia de datos relacional |
| **Hosting Frontend** | Vercel | - | Despliegue Estático |
| **Hosting Backend** | Render | - | Web Service de Python |
| **Hosting DB** | Railway | - | MySQL Service |
| **DevOps** | GitHub Actions | - | [cite_start]CI/CD (Build y Pruebas automáticas) [cite: 13] |

## ✅ Requisitos Previos

Asegúrate de tener instalados los siguientes sistemas en tu ambiente de desarrollo:

### Sistema

  * **Python** v3.11 o superior
  * **pip** (Administrador de paquetes de Python)
  * **Node.js** v20.x o superior
  * **npm** v10.x o superior
  * **Git**

### Verificación

```bash
python --version    # v3.11.x
npm --version       # v10.x.x
```

## 🚀 Ejecución en Local

La aplicación utiliza una arquitectura monorepo. Necesitas iniciar el backend y el frontend por separado.

### 1️⃣ Clonar Repositorio

```bash
git clone https://github.com/<TU_USUARIO>/<TU_REPOSITORIO>.git
cd <TU_REPOSITORIO>
```

### 2️⃣ Backend - FastAPI + MySQL

El backend se conecta a tu instancia de MySQL en Railway para persistir los datos.

#### Instalación

```bash
cd backend
# Crea un entorno virtual (opcional pero recomendado)
python -m venv .venv
source .venv/bin/activate  # En Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

#### Variables de Entorno (Conexión a Railway)

Crea el archivo **`.env`** en la carpeta `/backend` usando el formato del `.env.example`.

```bash
cp .env.example .env
```

Edita `backend/.env` con tu cadena de conexión **pública** de Railway (la que empieza con `mysql+mysqlclient://...`):

```text
# backend/.env
# Puerto del servidor (FastAPI)
PORT=8000
# CADENA DE CONEXIÓN PÚBLICA DE RAILWAY (mysql+mysqlclient)
DATABASE_URL="mysql+mysqlclient://<USER>:<PASSWORD>@<HOST_PUBLICO>:<PORT_PUBLICO>/<DB_NAME>"
```

#### Ejecutar en Desarrollo

```bash
# Asegúrate de estar en la carpeta /backend con el entorno virtual activado
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

*Backend estará en: `http://localhost:8000` (la documentación de la API en `/docs`)*

### 3️⃣ Frontend - React + Vite

#### Instalación

```bash
cd frontend
npm install
```

#### Variables de Entorno

Crea el archivo **`.env.development`** en la carpeta `/frontend`.

```bash
cp .env.example .env.development
```

Edita `frontend/.env.development` para apuntar al backend local:

```text
# frontend/.env.development
# URL de la API Backend local (incluyendo el prefijo del router)
VITE_API_URL=http://localhost:8000/api/todos 
```

#### Ejecutar en Desarrollo

```bash
# Asegúrate de estar en la carpeta /frontend
npm run dev
```

*Frontend estará en: `http://localhost:5173` (o similar)*

## 🌍 URLs de Producción

[cite_start]Los enlaces de producción cumplen con los requisitos de despliegue [cite: 8-11].

| Servicio | Tecnología | URL de Ejemplo | Requisito |
| :--- | :--- | :--- | :--- |
| **Frontend** | Vercel | `https://proyecto-final-9z34.vercel.app/` | [cite_start]Despliegue en Vercel [cite: 9] |
| **Backend** | Render | `https://proyecto-final-rqns.onrender.com/api` | [cite_start]Despliegue en Render [cite: 10] |
| **Base de Datos** | Railway | *(Captura de instancia en la documentación)* | [cite_start]Base de datos en Railway [cite: 11] |

## 📚 Documentación

La documentación detallada de la arquitectura, endpoints y procesos se encuentra en el repositorio:

  * [cite_start][**API.md**](API.md): Documentación completa de los endpoints CRUD, bodies, y códigos de estado HTTP. [cite: 131-136]
  * [cite_start][**ARQUITECTURA.md**](https://www.google.com/search?q=ARQUITECTURA.md): Diagrama de arquitectura y descripción del flujo de datos entre Vercel, Render y Railway. [cite: 122-130]

## 🤖 CI/CD con GitHub Actions

[cite_start]El repositorio está configurado con un flujo de **Integración Continua (CI)** que se ejecuta en cada *push* o *Pull Request*[cite: 101, 102].

  * **Workflow:** `/.github/workflows/ci.yml`
  * [cite_start]**Jobs:** Instalación de dependencias de Node.js y ejecución de `npm run build` en el frontend. [cite: 104-106]
  * [cite_start]**Criterio de Éxito:** El pipeline debe compilar el frontend sin errores; si el `build` falla, el flujo de trabajo de CI falla. [cite: 107, 108]

-----

*Última actualización: Diciembre 2025*
*Desarrollador: [Tu Nombre Completo]*
*Repositorio: `https://github.com/<TU_USUARIO>/<TU_REPOSITORIO>`*



📂 Estructura del Proyecto Final Integrador

```text
PROYECTO-JUEVES/
├── .github/
│   └── workflows/
│       └── ci.yml             # Configuración de Integración Continua
├── backend/                   # Carpeta del Backend (API)
│   ├── app/
│   │   ├── core/
│   │   │   ├── config.py      # Configuraciones de la aplicación
│   │   │   └── database.py    # Conexión a la base de datos
│   │   ├── models/
│   │   │   └── todo.py        # Modelos de la base de datos (Ej: Tarea)
│   │   ├── routers/
│   │   │   └── todo.py        # Endpoints de la API para 'todo'
│   │   ├── schemas/
│   │   │   └── todo.py        # Esquemas de datos para validación (Pydantic)
│   │   └── main.py            # Punto de entrada de la aplicación FastAPI
│   ├── .env                   # Variables de entorno
│   └── requirements.txt       # Dependencias de Python
├── documentacion/
│   └── api.md                 # Documentación de la API
├── frontend/                  # Carpeta del Frontend (Aplicación Web)
│   ├── public/                # Archivos públicos (imágenes, etc.)
│   ├── src/
│   │   ├── assets/            # Archivos estáticos (íconos, etc.)
│   │   ├── components/        # Componentes reutilizables de React
│   │   │   ├── TodoForm.jsx
│   │   │   └── TodoItem.jsx
│   │   ├── pages/             # Componentes que representan páginas/vistas
│   │   │   └── TodoListPage.jsx
│   │   ├── services/          # Lógica para comunicarse con la API
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.jsx            # Componente principal de React
│   │   ├── index.css
│   │   └── main.jsx           # Punto de entrada de la aplicación React
│   ├── .env.development       # Variables de entorno para desarrollo
│   ├── .gitignore             # Archivos a ignorar por Git
│   ├── .eslintrc.cjs          # Configuración de ESLint (Linting de JS/JSX)
│   ├── package-lock.json      # Bloqueo de dependencias de Node
│   ├── package.json           # Dependencias de Node
│   ├── README.md              # Documentación del Frontend (Opcional)
│   └── vite.config.js         # Configuración de Vite
├── package-lock.json          # ¿Dependencias globales? (Espera, esto está duplicado)
└── README.md                  # Documentación principal del proyecto
```


```markdown
## ✍️ Autores

* **Danna Segura**: https://github.com/DannaSegura2
* **Nicol Amaya**: https://github.com/nicolamaya
* **Jhon Medina**: https://github.com/Kanciro 
```

