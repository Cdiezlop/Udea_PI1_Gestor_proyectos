import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProyectoDetailsService } from "../services/detalle-proyectosService";
import "../styles/ProyectoDetalles.css";

function ProyectoDetalles() {
  const { id } = useParams(); // Obtén el ID del proyecto desde la URL
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProyectoDetails = async () => {
      try {
        const data = await fetchProyectoDetailsService(id);
        setProyecto(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectoDetails();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center mt-5">Cargando detalles del proyecto...</p>
    );
  }

  if (error) {
    return <p className="text-center text-danger mt-5">{error}</p>;
  }

  return (
    <div className="container mt-5 p-5 bg-light rounded shadow proyecto-detalles">
      <h2 className="text-center mb-4">Detalles del proyecto</h2>
      <div className="mb-3">
        <strong>ID:</strong> {proyecto.id}
      </div>
      <div className="mb-3">
        <strong>Estado:</strong> {proyecto.estado}
      </div>
      <div className="mb-3">
        <strong>Nombre:</strong> {proyecto.nombre}
      </div>
      <div className="mb-3">
        <strong>Categoría:</strong> {proyecto.categoria}
      </div>
      <div className="mb-3">
        <strong>Fecha de creación:</strong>{" "}
        {new Date(proyecto.fechaCreacion).toLocaleString()}
      </div>
      <div className="mb-3">
        <strong>Fecha de modificación:</strong>{" "}
        {new Date(proyecto.fechaModificacion).toLocaleString()}
      </div>
      <div className="mb-3">
        <strong>Descripción:</strong> {proyecto.descripcion}
      </div>
      <div className="text-center mt-4">
        <button
          className="btn btn-primary volver-lista"
          onClick={() => navigate("/proyectos")}
        >
          Volver a la lista
        </button>
      </div>
    </div>
  );
}

export default ProyectoDetalles;