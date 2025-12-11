# 📚 DOCUMENTACIÓN DE API REST

## Stack: FastAPI (Python)

### 1. Crear Tarea (POST)

* [cite_start]**Endpoint:** `/api/todos` [cite: 65]
* [cite_start]**Método:** `POST` [cite: 133]
* [cite_start]**Body Esperado (JSON):** [cite: 134]
    ```json
    {
        "title": "Comprar leche", 
        "description": "Leche deslactosada" 
    }
    ```
* **Respuestas de Ejemplo:**
    * [cite_start]**201 Created (Éxito):** Retorna la tarea creada con ID y fecha[cite: 135].
        ```json
        {
            "id": 1,
            "title": "Comprar leche",
            "description": "Leche deslactosada",
            "status": "pending",
            "created_at": "2025-12-10T22:00:00.000000"
        }
        ```
    * **422 Unprocessable Entity:** Si falta el campo `title`[cite: 136].

### 2. Listar Tareas (GET)

* [cite_start]**Endpoint:** `/api/todos` [cite: 64]
* [cite_start]**Método:** `GET` [cite: 133]
* **Body Esperado:** Ninguno
* **Respuestas de Ejemplo:**
    * [cite_start]**200 OK (Éxito):** Retorna una lista de objetos de tareas[cite: 135].

### 3. Actualizar Tarea (PUT)

* [cite_start]**Endpoint:** `/api/todos/{id}` [cite: 66]
* [cite_start]**Método:** `PUT` [cite: 133]
* [cite_start]**Body Esperado (JSON):** Cualquier combinación de campos (ej. solo `status`)[cite: 134].
    ```json
    {
        "status": "completed" 
    }
    ```
* **Respuestas de Ejemplo:**
    * **200 OK (Éxito):** Retorna el objeto de la tarea actualizada[cite: 135].
    * **404 Not Found:** Si el ID de la tarea no existe[cite: 39, 136].

### 4. Eliminar Tarea (DELETE)

* [cite_start]**Endpoint:** `/api/todos/{id}` [cite: 67]
* [cite_start]**Método:** `DELETE` [cite: 133]
* **Body Esperado:** Ninguno
* **Respuestas de Ejemplo:**
    * [cite_start]**204 No Content (Éxito):** Tarea eliminada[cite: 136].
    * [cite_start]**404 Not Found:** Si el ID de la tarea no existe[cite: 39, 136].