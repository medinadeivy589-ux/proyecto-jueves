// /frontend/src/components/TodoItem.jsx
import React from 'react';

function TodoItem({ todo, onUpdateStatus, onDelete }) {
    // Determinar si la tarea está completada
    const isCompleted = todo.status === 'completed';

    // Estilo condicional para las tareas completadas
    const itemStyle = {
        padding: '15px',
        margin: '10px 0',
        border: '1px solid #eee',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: isCompleted ? '#e6ffe6' : '#fff', // Fondo verde claro si está completada
        textDecoration: isCompleted ? 'line-through' : 'none', // Texto tachado si está completada
    };

    const handleToggleStatus = () => {
        onUpdateStatus(todo.id, todo.status);
    };

    const handleDelete = () => {
        if (window.confirm(`¿Estás seguro de eliminar la tarea: "${todo.title}"?`)) {
            onDelete(todo.id);
        }
    };

    return (
        <div style={itemStyle}>
            {/* Contenido de la Tarea */}
            <div>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1em' }}>{todo.title}</h3>
                {todo.description && <p style={{ margin: '0', color: '#666', fontSize: '0.9em' }}>{todo.description}</p>}
                <small style={{ color: '#999' }}>Creada: {new Date(todo.created_at).toLocaleDateString()}</small>
            </div>
            
            {/* Acciones */}
            <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                    onClick={handleToggleStatus}
                    style={{ 
                        padding: '5px 10px', 
                        backgroundColor: isCompleted ? '#f0ad4e' : '#5cb85c', // Amarillo si está completada, Verde si está pendiente
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '3px', 
                        cursor: 'pointer' 
                    }}
                >
                    {isCompleted ? 'Marcar Pendiente' : 'Marcar Completada'}
                </button>
                <button 
                    onClick={handleDelete}
                    style={{ 
                        padding: '5px 10px', 
                        backgroundColor: '#d9534f', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '3px', 
                        cursor: 'pointer' 
                    }}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default TodoItem;