// /frontend/src/services/api.js

// Lee la variable de entorno configurada en el .env.development
const BASE_URL = import.meta.env.VITE_API_URL; 

/**
 * 1. GET /api/todos - Listar tareas
 */
export const getTodos = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error("Error al listar tareas.");
    }
    return response.json();
};

/**
 * 2. POST /api/todos - Crear tarea
 * @param {object} todoData - {title: string, description: string}
 */
export const createTodo = async (todoData) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
    });
    if (!response.ok) {
        // Manejo de error si el backend rechaza (ej. título vacío) [cite: 39]
        throw new Error("Error al crear tarea: Asegúrate de incluir un título.");
    }
    return response.json();
};

/**
 * 3. PUT /api/todos/{id} - Actualizar tarea
 * @param {number} id - ID de la tarea
 * @param {object} updateData - {title?: string, description?: string, status?: string}
 */
export const updateTodo = async (id, updateData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    });
    if (!response.ok) {
        throw new Error("Error al actualizar tarea. Tarea no encontrada o datos inválidos.");
    }
    return response.json();
};

/**
 * 4. DELETE /api/todos/{id} - Eliminar tarea
 */
export const deleteTodo = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    // DELETE retorna 204 No Content, por lo que solo verificamos si la respuesta no es OK
    if (!response.ok) {
        throw new Error("Error al eliminar tarea. Tarea no encontrada.");
    }
    // No hay body que retornar
    return true; 
};