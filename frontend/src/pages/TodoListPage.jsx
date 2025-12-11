// /frontend/src/pages/TodoListPage.jsx
import React, { useState, useEffect } from 'react';
import * as api from '../services/api'; 
import TodoForm from '../components/TodoForm'; // Se crea luego
import TodoItem from '../components/TodoItem'; // Se crea luego

function TodoListPage() {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Manejo de estado de carga 
    const [error, setError] = useState(null);       // Manejo de estado de error 

    // 1. Cargar tareas al inicio (useEffect)
    const fetchTodos = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await api.getTodos();
            setTodos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []); 

    // 2. Función para crear tarea (usada por TodoForm)
    const handleCreate = async (title, description) => {
        try {
            const newTodo = await api.createTodo({ title, description });
            setTodos([...todos, newTodo]);
        } catch (err) {
            alert(err.message); 
        }
    };

    // 3. Función para actualizar (ej. cambiar status)
    const handleUpdateStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
        try {
            await api.updateTodo(id, { status: newStatus });
            // Actualizar el estado local para reflejar el cambio (sin recargar toda la lista)
            setTodos(todos.map(todo => 
                todo.id === id ? { ...todo, status: newStatus } : todo
            ));
        } catch (err) {
            alert(err.message);
        }
    };
    
    // 4. Función para eliminar
    const handleDelete = async (id) => {
        try {
            await api.deleteTodo(id);
            // Eliminar del estado local
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err) {
            alert(err.message);
        }
    };

    // --- Renderizado ---
    if (isLoading) return <div>Cargando tareas...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <div>
            <h1>📝 Mi Lista de Tareas (FastAPI + MySQL)</h1>
            <TodoForm onCreate={handleCreate} />
            
            <div className="todo-list">
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onUpdateStatus={handleUpdateStatus}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default TodoListPage;