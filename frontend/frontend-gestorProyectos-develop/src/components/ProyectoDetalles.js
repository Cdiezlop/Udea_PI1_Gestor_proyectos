import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Importa Link
import { fetchProyectoDetailsService } from "../services/detalle-proyectosService";
import "../styles/ProyectoDetalles.css";

function ProyectoDetalles() {
  const { id } = useParams();
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

  if (!proyecto) {
    return <p className="text-center mt-5">No se pudo encontrar el proyecto.</p>;
  }

  return (
    <div className="container mt-5 p-4 p-md-5 bg-light rounded shadow proyecto-detalles" style={{ maxWidth: '800px' }}>
      
      {/* --- BOTÓN VOLVER AÑADIDO (USANDO LINK) --- */}
      <div className="mb-3">
        <Link to="/proyectos" className="btn btn-outline-secondary btn-sm">
          &larr; Volver a Proyectos
        </Link>
      </div>
      {/* --- FIN BOTÓN VOLVER --- */}
      
      <h2 className="text-center mb-4">Detalles del proyecto</h2>
      
      <div className="card">
        <div className="card-header">
          <h3 className="h5 mb-0">{proyecto.nombre}</h3>
        </div>
        <div className="card-body">
          <p><strong>Descripción:</strong> {proyecto.descripcion}</p>
          <hr />
          <div className="row">
            <div className="col-md-6">
              <p><strong>Estado:</strong> <span className="badge bg-info text-dark">{proyecto.estado}</span></p>
              <p><strong>Categoría:</strong> {proyecto.categoria}</p>
              <p><strong>Presupuesto:</strong> ${new Intl.NumberFormat('es-CO').format(proyecto.presupuesto)}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Fecha de creación:</strong> {proyecto.fechaCreacion}</p>
              <p><strong>Fecha compromiso:</strong> {proyecto.fechaCompromiso}</p>
              <p><strong>Fecha primer avance:</strong> {proyecto.fechaPrimerAvance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProyectoDetalles;