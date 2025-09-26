export const recuperarContrasenaService = async (username, newPassword, confirmPassword) => {
    const url = "http://localhost:8088/gestor/api/usuario/change-password";
  
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
        throw new Error("Error al actualizar la contraseña");
      }
  
      const data = await response.json();
      return data; // Devuelve la respuesta del backend
    } catch (error) {
      throw error; // Propaga el error para manejarlo en el componente
    }
  };  