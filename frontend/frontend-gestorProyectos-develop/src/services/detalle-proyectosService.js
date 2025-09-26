const API_BASE_URL = "http://localhost:8088/gestor/api";

export const fetchProyectoDetailsService = async (id) => {
  const url = `${API_BASE_URL}/proyectos/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener los detalles del proyecto");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error de red: no se pudo conectar al servidor");
  }
};
