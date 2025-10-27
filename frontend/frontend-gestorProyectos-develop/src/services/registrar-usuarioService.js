import { API_BASE } from "../config"; // Importa la URL base

export const registrarUsuarioService = async (formData) => {
  const url = `${API_BASE}/api/usuario/crear`; // Construye la URL completa

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
       // Intenta obtener un mensaje de error del backend si existe
      let errorMsg = "Error al registrar usuario";
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMsg = errorData.message;
        }
      } catch (e) { /* No hacer nada si no hay JSON */}
      throw new Error(errorMsg);
    }

    const data = await response.json(); // Si el backend devuelve un JSON, parsearlo
    return data; // Devolver datos del backend si es necesario
  } catch (error) {
    throw error; // Propagar el error para manejarlo en el componente
  }
};