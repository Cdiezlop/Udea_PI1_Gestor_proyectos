import { API_BASE } from "../config"; // Importa la URL base

export const fetchCategoriasService = async () => {
  const url = `${API_BASE}/api/categorias/listar`; // Construye la URL completa
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al cargar categorías");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Error de red: no se pudo conectar al servidor");
  }
};

export const crearProyectoService = async (proyecto) => {
  const url = `${API_BASE}/api/proyectos/crear`; // Construye la URL completa
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proyecto),
    });
    if (!response.ok) {
       // Intenta obtener un mensaje de error del backend
      let errorMsg = "Error al crear el proyecto";
       try {
         const errorData = await response.json();
         if (errorData && errorData.message) {
           errorMsg = errorData.message;
         }
       } catch (e) { /* No hacer nada si no hay JSON */}
      throw new Error(errorMsg);
    }
    // Si la respuesta es OK pero no tiene contenido JSON (ej: 201 Created sin body)
    // podríamos simplemente devolver true o el status. Aquí asumimos que puede devolver algo.
    try {
        return await response.json(); 
    } catch(e) {
        return true; // Asumimos éxito si no hay JSON
    }
  } catch (error) {
    throw new Error(error.message);
  }
};