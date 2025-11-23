import { API_BASE } from "../config";

// 1. Solicitar el envío del código/token al correo
export const solicitarRecuperacionService = async (email) => {
  // El backend usa @RequestParam, así que enviamos el email en la URL
  const url = `${API_BASE}/api/usuario/forgot-password?email=${encodeURIComponent(email)}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Intentamos leer el error como texto, ya que el backend devuelve strings
      const errorText = await response.text();
      throw new Error(errorText || "No se pudo enviar el código de recuperación.");
    }
    
    // El backend devuelve texto plano ("Correo enviado"), no un JSON
    return await response.text();
  } catch (error) {
    throw error;
  }
};

// 2. Enviar el token y la nueva contraseña
export const restablecerContrasenaService = async (token, newPassword) => {
  const url = `${API_BASE}/api/usuario/reset-password`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // El backend espera un ResetPasswordDTO (token y newPassword)
      body: JSON.stringify({
        token: token,
        newPassword: newPassword
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error al restablecer la contraseña.");
    }

    // El backend devuelve texto plano ("Contraseña actualizada correctamente")
    return await response.text();
  } catch (error) {
    throw error;
  }
};