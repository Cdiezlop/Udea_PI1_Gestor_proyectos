import { API_BASE } from "../config"; // Importa la URL base

export const fetchProyectoDetailsService = async (id) => {
  const url = `${API_BASE}/api/proyectos/${id}`; // Construye la URL completa
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener los detalles del proyecto");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Error de red: no se pudo conectar al servidor");
  }
};