# app/models/todo.py
from sqlalchemy import Column, Integer, String, DateTime, Boolean, func
from app.core.database import Base # Importamos la base declarativa

class Todo(Base):
    __tablename__ = "tareas" # Nombre de la tabla

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), index=True, nullable=False) # Título (obligatorio)
    description = Column(String(500), nullable=True)
    # Usaremos un String para 'status' ('pending' o 'completed')
    status = Column(String(20), default="pending", nullable=False) 
    # Fecha de creación automática
    created_at = Column(DateTime, server_default=func.now())
    # Opcional: user_id si se requiere autenticación
    # user_id = Column(Integer, nullable=True) 

# Importante: Para que el ORM cree la tabla en MySQL,
# debes ejecutar Base.metadata.create_all(bind=engine) una vez
# después de tener la conexión a Railway.