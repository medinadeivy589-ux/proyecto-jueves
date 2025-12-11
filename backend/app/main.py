# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import todo 
from app.core.database import Base, engine 

# Inicializa la Base de Datos (crea las tablas si no existen)
# Esto es importante para que el modelo se sincronice con MySQL de Railway.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo List FastAPI - Final Integrador")

# Configuración de CORS 
# Necesitas permitir el origen de tu frontend en Vercel
origins = [
    "*", # Dejar en "*" durante el desarrollo.
    # Cuando despliegues: "https://[tu-dominio].vercel.app" 
    "https://proyecto-jueves.onrender.com"
    "https://proyecto-jueves-hsibt75w1-jhons-projects-d1b2eaad.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir las rutas
app.include_router(todo.router)

@app.get("/")
def read_root():
    return {"message": "Todo List API is operational. Visit /docs for OpenAPI documentation."}