import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Se eliminó useNavigate no usado
import { fetchProyectoDetailsService } from "../services/detalle-proyectosService";
import "../styles/ProyectoDetalles.css";

function ProyectoDetalles() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- FUNCIÓN DE COLOR AÑADIDA ---
  const getEstadoClass = (estado) => {
    switch (estado) {
      case 'Aceptado':
        return 'bg-success'; // Verde
      case 'En ejecución':
        return 'bg-primary'; // Azul
      case 'Rechazado':
        return 'bg-danger'; // Rojo
      case 'Atrasado':
        return 'bg-warning text-dark'; // Amarillo (con texto oscuro)
      case 'Terminado':
        return 'bg-info text-dark'; // Celeste (con texto oscuro)
      case 'Aplazado':
        return 'bg-dark'; // Negro/Gris oscuro
      case 'Por revisar':
      default:
        return 'bg-secondary'; // Gris
    }
  };
  // --- FIN FUNCIÓN DE COLOR ---

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
    // Contenedor principal con clases de Bootstrap para centrar y dar sombra
    <div className="container mt-5 p-4 p-md-5 bg-white rounded shadow-lg proyecto-detalles" style={{ maxWidth: '800px' }}>
      
      <div className="mb-4"> {/* Aumentado el margen inferior */}
        <Link to="/proyectos" className="btn btn-outline-secondary btn-sm">
          &larr; Volver a Proyectos
        </Link>
      </div>
      
      <h2 className="text-center mb-4">Detalles del proyecto</h2>
      
      <div className="card border-0">
        <div className="card-header bg-primary text-white">
          <h3 className="h5 mb-0">{proyecto.nombre}</h3>
        </div>
        <div className="card-body px-0 py-3">
          <p className="px-3"><strong>Descripción:</strong> {proyecto.descripcion}</p>
          <hr />
          <div className="row px-3 gy-3"> {/* gy-3 añade espacio vertical en móvil */}
            <div className="col-md-6">
              {/* --- ESTADO CON COLOR AÑADIDO --- */}
              <p className="mb-0"><strong>Estado:</strong> 
                <span className={`badge ms-2 fs-6 ${getEstadoClass(proyecto.estado)}`}>
                  {proyecto.estado}
                </span>
              </p>
            </div>
            <div className="col-md-6">
              <p className="mb-0"><strong>Categoría:</strong> {proyecto.categoria}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-0"><strong>Presupuesto:</strong> ${new Intl.NumberFormat('es-CO').format(proyecto.presupuesto)}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-0"><strong>Fecha de creación:</strong> {proyecto.fechaCreacion}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-0"><strong>Fecha compromiso:</strong> {proyecto.fechaCompromiso}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-0"><strong>Fecha primer avance:</strong> {proyecto.fechaPrimerAvance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProyectoDetalles;