# backend/app/core/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv # Añadir esta línea si usas .env localmente

# Cargar variables de entorno si estás ejecutando localmente
load_dotenv() 

# Obtiene la URL del entorno
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# --- SOLUCIÓN: Verificación y Manejo de None ---
if SQLALCHEMY_DATABASE_URL is None:
    # Esto levantará un error claro si la variable no está configurada,
    # evitando el error de tipo y fallos silenciosos.
    raise ValueError("DATABASE_URL no está configurada. Asegúrate de tener tu archivo .env o la variable configurada en Render.")

# 1. Creación del motor (Engine)
# Ahora, Python sabe que SQLALCHEMY_DATABASE_URL es definitivamente un 'str'
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    pool_recycle=3600
)

# ... El resto del código de SessionLocal, Base y get_db sigue igual ...

# Sesión Local (SessionLocal)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base Declarativa (Base)
Base = declarative_base()

# Dependencia de inyección para FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()