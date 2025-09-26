import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cambiarEstadoProyectoService } from "../services/cambiarEstadoProyectoService"; // Importar el servicio
import "../styles/DetalleProyectoAdmin.css"; // Estilos para esta vista

function DetalleProyectoAdmin() {
  const { id } = useParams(); // Obtener el ID desde la URL
  const navigate = useNavigate();

  const [proyecto, setProyecto] = useState(null);
  const [estado, setEstado] = useState("");
  const [comentario, setComentario] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const response = await fetch(
          `http://localhost:8088/gestor/api/proyectos/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setProyecto(data);
          setEstado(data.estado !== "Por revisar" ? data.estado : "Aceptado"); // Valor inicial válido
        } else {
          alert("Error al cargar los detalles del proyecto");
        }
      } catch (error) {
        console.error("Error al cargar el proyecto:", error);
      }
    };
  
    fetchProyecto();
  }, [id]);
  

  const handleEstadoChange = async (e) => {
    e.preventDefault();

    if (!estado) {
      alert("Debes seleccionar un estado antes de enviar.");
      return;
    }

    const data = {
      estado, // Enviar el estado actual
      comentarios: {
        user: localStorage.getItem("user"), // Usuario actual
        comentario, // Comentario ingresado
      },
    };

    setLoading(true);
    try {
      await cambiarEstadoProyectoService(id, data); // Llamar al servicio
      alert("Estado actualizado con éxito");
      navigate("/proyectos"); // Regresar a la lista de proyectos
    } catch (error) {
      alert("Error al actualizar el estado del proyecto");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!proyecto) {
    return <p>Cargando detalles del proyecto...</p>;
  }

  return (
    <div className="detalle-proyecto-admin">
      <div className="detalle-container">
        <h2>Detalles del proyecto</h2>
        <p>
          <strong>ID:</strong> {proyecto.id}
        </p>
        <p>
          <strong>Estado:</strong> {proyecto.estado}
        </p>
        <p>
          <strong>Nombre:</strong> {proyecto.nombre}
        </p>
        <p>
          <strong>Categoría:</strong> {proyecto.categoria}
        </p>
        <p>
          <strong>Fecha de creación:</strong> {proyecto.fechaCreacion}
        </p>
        <p>
          <strong>Fecha de modificación:</strong> {proyecto.fechaModificacion}
        </p>
        <p>
          <strong>Descripción:</strong> {proyecto.descripcion}
        </p>

        <form onSubmit={handleEstadoChange} className="estado-form">
          <h3>Cambiar estado</h3>
          <label htmlFor="estado">Nuevo estado:</label>
          <select
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            {/* Renderizamos solo las opciones distintas a "Por revisar" */}
            {["Aceptado", "Rechazado"].map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>

          <label htmlFor="comentario">Comentario:</label>
          <textarea
            id="comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Agrega un comentario"
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Actualizar estado"}
          </button>
        </form>

        <button onClick={() => navigate("/proyectos")} className="volver-btn">
          Volver a la lista
        </button>
      </div>
    </div>
  );
}

export default DetalleProyectoAdmin;
