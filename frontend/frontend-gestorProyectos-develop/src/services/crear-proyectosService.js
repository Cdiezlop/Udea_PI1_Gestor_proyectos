const API_BASE_URL = "http://localhost:8088/gestor/api";

export const fetchCategoriasService = async () => {
  const url = `${API_BASE_URL}/categorias/listar`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al cargar categorías");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error de red: no se pudo conectar al servidor");
  }
};

export const crearProyectoService = async (proyecto) => {
  const url = `${API_BASE_URL}/proyectos/crear`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proyecto),
    });
    if (!response.ok) {
      throw new Error("Error al crear el proyecto");
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};