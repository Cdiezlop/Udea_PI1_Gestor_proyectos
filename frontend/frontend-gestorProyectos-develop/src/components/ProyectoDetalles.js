import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; 
import { fetchProyectoDetailsService } from "../services/detalle-proyectosService";
import "../styles/ProyectoDetalles.css";

function ProyectoDetalles() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getEstadoClass = (estado) => {
    switch (estado) {
      case 'Aceptado': return 'bg-success';
      case 'En ejecución': return 'bg-primary';
      case 'Rechazado': return 'bg-danger';
      case 'Atrasado': return 'bg-warning text-dark';
      case 'Terminado': return 'bg-info text-dark';
      case 'Aplazado': return 'bg-dark';
      default: return 'bg-secondary';
    }
  };

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

  if (loading) return <p className="text-center mt-5">Cargando...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;
  if (!proyecto) return <p className="text-center mt-5">No se encontró el proyecto.</p>;

  return (
    <div className="container mt-5 p-4 p-md-5 bg-white rounded shadow-lg proyecto-detalles" style={{ maxWidth: '900px' }}>
      <div className="mb-4"> 
        <Link to="/proyectos" className="btn btn-outline-secondary btn-sm">&larr; Volver a Proyectos</Link>
      </div>
      
      <h2 className="text-center mb-4">Detalles del proyecto</h2>
      
      {/* DATOS GENERALES */}
      <div className="card border-0 mb-4">
        <div className="card-header bg-primary text-white">
          <h3 className="h5 mb-0">{proyecto.nombre}</h3>
        </div>
        <div className="card-body px-0 py-3">
          <p className="px-3"><strong>Descripción:</strong> {proyecto.descripcion}</p>
          {/* --- ACTUALIZACIÓN: MOSTRAR OBSERVACIONES INICIALES --- */}
          <p className="px-3"><strong>Observaciones Creador:</strong> {proyecto.observacionesIniciales || "Sin observaciones."}</p>
          
          <hr />
          <div className="row px-3 gy-3"> 
            <div className="col-md-6">
              <p className="mb-0"><strong>Estado:</strong> <span className={`badge ms-2 fs-6 ${getEstadoClass(proyecto.estado)}`}>{proyecto.estado}</span></p>
            </div>
            <div className="col-md-6">
              <p className="mb-0"><strong>Categoría:</strong> {proyecto.categoria}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-0"><strong>Presupuesto:</strong> ${new Intl.NumberFormat('es-CO').format(proyecto.presupuesto)}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-0"><strong>Fecha Registro:</strong> {proyecto.fechaCreacion}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-0"><strong>Fecha Inicio:</strong> {proyecto.fechaInicio}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-0"><strong>Duración:</strong> {proyecto.duracion} {proyecto.duracion === 1 ? 'mes' : 'meses'}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-0"><strong>Fecha Compromiso:</strong> {proyecto.fechaCompromiso}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-0"><strong>Fecha Primer Avance:</strong> {proyecto.fechaPrimerAvance}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN RESPONSABLES */}
      <h4 className="mb-3">Responsables</h4>
      {proyecto.responsables && proyecto.responsables.length > 0 ? (
        <div className="table-responsive mb-4">
            <table className="table table-bordered table-hover">
                <thead className="table-light">
                    <tr>
                        <th>Nombre</th>
                        <th>Rol</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                    </tr>
                </thead>
                <tbody>
                    {proyecto.responsables.map((resp, idx) => (
                        <tr key={idx}>
                            <td>{resp.nombre}</td>
                            <td>{resp.rol}</td>
                            <td>{resp.telefono}</td>
                            <td>{resp.correo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      ) : (
        <p className="text-muted mb-4">No hay responsables registrados.</p>
      )}

      {/* SECCIÓN OBSERVACIONES (COMENTARIOS ADMIN) */}
      {proyecto.comentarios && (
        <div className="alert alert-info mt-4">
          <h5 className="alert-heading">Observaciones del Administrador:</h5>
          <p className="mb-1">{proyecto.comentarios.comentario}</p>
          <hr />
          <p className="mb-0 small">
            <em>Fecha: {proyecto.comentarios.fechaComentarios ? proyecto.comentarios.fechaComentarios.replace("T", " ").substring(0, 16) : ""}</em>
          </p>
        </div>
      )}
    </div>
  );
}

export default ProyectoDetalles;