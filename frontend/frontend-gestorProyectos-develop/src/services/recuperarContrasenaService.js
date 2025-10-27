import { API_BASE } from "../config"; // Importa la URL base

export const recuperarContrasenaService = async (username, newPassword, confirmPassword) => {
  const url = `${API_BASE}/api/usuario/change-password`; // Construye la URL completa

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        newPassword,
        confirmPassword,
      }),
    });

    if (!response.ok) {
      // Intenta obtener un mensaje de error del backend
      let errorMsg = "Error al actualizar la contraseña";
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMsg = errorData.message;
        }
      } catch (e) { /* No hacer nada si no hay JSON */}
      throw new Error(errorMsg);
    }

    const data = await response.json();
    return data; // Devuelve la respuesta del backend
  } catch (error) {
    throw error; // Propaga el error para manejarlo en el componente
  }
};