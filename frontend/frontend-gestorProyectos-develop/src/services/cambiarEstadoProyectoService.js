import { API_BASE } from "../config";

export const cambiarEstadoProyectoService = async (id, nuevoEstado) => {
  const url = `${API_BASE}/proyectos/${id}/estado`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: nuevoEstado }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error al cambiar el estado del proyecto");
    }

    return await response.json();
  } catch (error) {
    console.error("Error cambiando estado:", error);
    throw error;
  }
};
  