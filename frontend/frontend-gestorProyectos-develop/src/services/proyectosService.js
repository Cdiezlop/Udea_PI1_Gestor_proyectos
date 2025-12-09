import { API_BASE } from "../config";

// Obtener proyectos paginados (Vista por defecto)
export const fetchProyectosPaginadosService = async (page, size) => {
  const url = `${API_BASE}/api/proyectos/pagina/${page}/${size}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al cargar proyectos paginados");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Buscar proyectos por término (Nombre o Usuario)
export const fetchBuscarProyectosService = async (termino, page, size) => {
  const url = `${API_BASE}/api/proyectos/buscar/${termino}/${page}/${size}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al buscar proyectos");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Filtrar proyectos por fecha y estado
export const fetchProyectosFiltrosService = async (page, size, fechaDesde, fechaFin, estado) => {
  let query = `?page=${page}&size=${size}`;
  if (fechaDesde) query += `&fechaDesde=${fechaDesde}`;
  if (fechaFin) query += `&fechafin=${fechaFin}`;
  if (estado) query += `&estado=${estado}`;

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