export const cambiarEstadoProyectoService = async (id, data) => {
    const url = `http://localhost:8088/gestor/api/proyectos/cambiar-estado/${id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Error al cambiar el estado del proyecto");
      }
  
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  