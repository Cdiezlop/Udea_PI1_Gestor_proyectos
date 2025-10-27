import { API_BASE } from "../config"; // Importa la URL base

export const fetchProyectosService = async (role, userId) => {
  let endpoint;

  if (role === "Basico" && userId) {
     // Endpoint para usuario básico requiere userId
    endpoint = `/api/proyectos/listar/${userId}`;
  } else if (role === "admin") {
    // Endpoint para admin no requiere userId
    endpoint = "/api/proyectos/listar";
  } else {
    throw new Error("Rol desconocido o falta userId: No se pudo determinar el endpoint");
  }

  const url = `${API_BASE}${endpoint}`; // Construye la URL completa

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al cargar proyectos");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Error de red: no se pudo conectar al servidor");
  }
};