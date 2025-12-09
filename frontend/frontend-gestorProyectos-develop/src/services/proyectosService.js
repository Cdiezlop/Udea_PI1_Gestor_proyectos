import { API_BASE } from "../config";

// Obtener proyectos paginados (Vista por defecto)
// CORRECCIÓN: Se agrega el parámetro userId
export const fetchProyectosPaginadosService = async (page, size, userId) => {
  let url = `${API_BASE}/api/proyectos/pagina/${page}/${size}`;
  
  // Si existe userId, lo añadimos como Query Param
  if (userId) {
    url += `?userId=${userId}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al cargar proyectos paginados");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Buscar proyectos por término (Nombre o Usuario)
// CORRECCIÓN: Se agrega el parámetro userId
export const fetchBuscarProyectosService = async (termino, page, size, userId) => {
  let url = `${API_BASE}/api/proyectos/buscar/${termino}/${page}/${size}`;
  
  // Si existe userId, lo añadimos como Query Param
  if (userId) {
    url += `?userId=${userId}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al buscar proyectos");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Filtrar proyectos por fecha y estado
// CORRECCIÓN: Se agrega el parámetro userId
export const fetchProyectosFiltrosService = async (page, size, fechaDesde, fechaFin, estado, userId) => {
  // Construimos el query string inicial
  let query = `?`;
  
  if (fechaDesde) query += `fechaDesde=${fechaDesde}&`;
  if (fechaFin) query += `fechafin=${fechaFin}&`;
  if (estado) query += `estado=${estado}&`;
  if (userId) query += `userId=${userId}&`; // Agregamos userId al filtro

  // Quitamos el último '&' si existe para limpiar la URL
  if (query.endsWith('&')) {
    query = query.slice(0, -1);
  }

  // Si no hay filtros, el query queda solo con '?' o vacío según prefieras, 
  // pero el backend espera los params en la URL base o query params.
  // Basado en tu código original, la URL base incluía page/size en el path:
  const url = `${API_BASE}/api/proyectos/pagina/filters/${page}/${size}${query}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al filtrar proyectos");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Obtener un solo proyecto por ID (Para detalles)
export const fetchProyectoByIdService = async (id) => {
  const url = `${API_BASE}/api/proyectos/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Proyecto no encontrado");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};