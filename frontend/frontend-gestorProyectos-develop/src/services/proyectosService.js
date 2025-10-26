import { API_ROUTES } from '../config/apiConfig';

export const fetchProyectosService = async (role, userId) => {
  // Determinar el endpoint según el rol del usuario
  let url;

  if (role === "Basico") {
    // Endpoint para usuario básico
    url = API_ROUTES.PROJECTS.LIST_BY_USER(userId);
  } else if (role === "admin") {
    // Endpoint para admin
    url = API_ROUTES.PROJECTS.LIST;
  } else {
    // Manejo opcional si el rol no es reconocido
    throw new Error("Rol desconocido: No se pudo determinar el endpoint");
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al cargar proyectos");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error de red: no se pudo conectar al servidor");
  }
};