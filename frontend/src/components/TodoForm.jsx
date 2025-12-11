// /frontend/src/components/TodoForm.jsx
import React, { useState } from 'react';

// Recibe la función 'onCreate' desde el componente principal (TodoListPage)
function TodoForm({ onCreate }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validación mínima: No permitir crear tareas sin título [cite: 38]
        if (!title.trim()) {
            alert('El título de la tarea es obligatorio.');
            return;
        }

        // Llamar a la función principal para crear la tarea
        onCreate(title, description); 

        // Limpiar el formulario después de la creación exitosa
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <input
                type="text"
                placeholder="Título (obligatorio)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ flexGrow: 1, padding: '8px', border: '1px solid #ddd' }}
            />
            <input
                type="text"
                placeholder="Descripción (opcional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ flexGrow: 2, padding: '8px', border: '1px solid #ddd' }}
            />
            <button type="submit" style={{ padding: '8px 15px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Añadir Tarea
            </button>
        </form>
    );
}

export default TodoForm;