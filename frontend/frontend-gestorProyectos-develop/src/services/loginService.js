export const loginService = async (username, password) => {
    const url = "http://localhost:8088/gestor/api/usuario/login";
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: username, password }),
      });
  
      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }
  
      const data = await response.json();
      return data; // Retorna los datos del usuario
    } catch (error) {
      throw error; // Propaga el error para manejarlo en el componente
    }
  };  