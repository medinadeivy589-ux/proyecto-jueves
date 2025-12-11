# app/schemas/todo.py
from pydantic import BaseModel, Field, conlist, validator
from datetime import datetime
from typing import Optional

# Esquema para la CREACIÓN de una tarea (datos de entrada POST)
class TodoCreate(BaseModel):
    # Requisito: Título obligatorio, validación mínima
    title: str = Field(..., min_length=1, max_length=100) 
    description: Optional[str] = Field(None, max_length=500)

# Esquema para la ACTUALIZACIÓN de una tarea (datos de entrada PUT)
class TodoUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    # Permitir actualizar el status a 'pending' o 'completed'
    status: Optional[str] = Field(None)

    @validator('status')
    def validate_status(cls, value):
        if value is not None and value not in ['pending', 'completed']:
            raise ValueError('Status must be "pending" or "completed"')
        return value

# Esquema para la RESPUESTA (datos de salida)
class TodoResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: str
    created_at: datetime

    class Config:
        # Esto permite que Pydantic lea los datos de un objeto ORM
        from_attributes = True