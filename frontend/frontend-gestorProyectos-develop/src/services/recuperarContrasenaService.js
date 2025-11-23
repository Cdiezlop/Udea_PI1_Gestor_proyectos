import { API_BASE } from "../config";

// Solicitar código enviando el NOMBRE DE USUARIO
export const solicitarRecuperacionService = async (username) => {
  // El backend espera ?username=...
  const url = `${API_BASE}/api/usuario/forgot-password?username=${encodeURIComponent(username)}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error al solicitar código. Verifique el usuario.");
    }
    
    return await response.text();
  } catch (error) {
    throw error;
  }
};

export const restablecerContrasenaService = async (token, newPassword) => {
  const url = `${API_BASE}/api/usuario/reset-password`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Código inválido.");
    }

    return await response.text();
  } catch (error) {
    throw error;
  }
};