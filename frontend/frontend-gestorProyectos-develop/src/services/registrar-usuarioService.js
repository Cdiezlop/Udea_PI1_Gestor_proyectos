export const registrarUsuarioService = async (formData) => {
    const url = "http://localhost:8088/gestor/api/usuario/crear";
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Error al registrar usuario");
      }
  
      const data = await response.json(); // Si el backend devuelve un JSON, parsearlo
      return data; // Devolver datos del backend si es necesario
    } catch (error) {
      throw error; // Propagar el error para manejarlo en el componente
    }
  };  