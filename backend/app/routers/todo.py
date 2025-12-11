# app/routers/todo.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas.todo import TodoCreate, TodoUpdate, TodoResponse
from app.models.todo import Todo 
from app.core.database import get_db

router = APIRouter(
    prefix="/api/todos",
    tags=["Todos"]
)

# Endpoint GET /api/todos (Listar tareas)
@router.get("/", response_model=List[TodoResponse])
def read_todos(db: Session = Depends(get_db)):
    """Lista todas las tareas de la base de datos."""
    todos = db.query(Todo).all()
    return todos

# Endpoint POST /api/todos (Crear tarea)
@router.post("/", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
def create_todo(todo_data: TodoCreate, db: Session = Depends(get_db)):
    """Crea una nueva tarea."""
    new_todo = Todo(title=todo_data.title, description=todo_data.description)
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo

# Endpoint PUT /api/todos/{id} (Actualizar tarea)
@router.put("/{todo_id}", response_model=TodoResponse)
def update_todo(todo_id: int, todo_data: TodoUpdate, db: Session = Depends(get_db)):
    """Actualiza una tarea existente por ID."""
    todo_to_update = db.query(Todo).filter(Todo.id == todo_id).first()
    
    if todo_to_update is None:
        # Requisito: Manejo de errores básicos [cite: 39]
        raise HTTPException(status_code=404, detail="Tarea no encontrada") 
    
    # Actualizar solo los campos que se proporcionaron
    update_data = todo_data.model_dump(exclude_unset=True) 
    for key, value in update_data.items():
        setattr(todo_to_update, key, value)
        
    db.commit()
    db.refresh(todo_to_update)
    return todo_to_update

# Endpoint DELETE /api/todos/{id} (Eliminar tarea)
@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    """Elimina una tarea por ID."""
    todo_to_delete = db.query(Todo).filter(Todo.id == todo_id)
    
    if todo_to_delete.first() is None:
        # Requisito: Manejo de errores básicos [cite: 39]
        raise HTTPException(status_code=404, detail="Tarea no encontrada")

    todo_to_delete.delete(synchronize_session=False)
    db.commit()
    # Retorna 204 No Content por ser eliminación exitosa
    return