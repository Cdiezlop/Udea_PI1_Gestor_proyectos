import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_BASE } from "../config";
import "../styles/DetalleProyectoAdmin.css";

export default function DetalleProyectoAdmin() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [estado, setEstado] = useState('');
  const [observacion, setObservacion] = useState(''); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    fetch(`${API_BASE}/api/proyectos/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('No se pudo cargar el proyecto');
        return r.json();
      })
      .then(data => {
        setProyecto(data);
        setEstado(data.estado);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        alert(err.message);
        navigate('/proyectos');
      });
  }, [id, navigate]);

  const isAdmin = localStorage.getItem('role') === 'admin';

  const guardarEstado = async () => {
    if (!observacion.trim()) {
        alert("Debe agregar una observación para cambiar el estado.");
        return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/proyectos/cambiar-estado/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          estado: estado,
          comentarios: {
            user: localStorage.getItem('user') || 'admin', 
            comentario: observacion
          }
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'No se pudo actualizar el estado');
      }
      alert('Estado actualizado correctamente.');
      navigate('/proyectos');
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (!proyecto) return <div className="text-center mt-5">No se encontró el proyecto.</div>;

  return (
    <div className="detalle-proyecto-admin container mt-5" style={{ maxWidth: '900px' }}>
      <div className="detalle-container card shadow-lg border-0">
        <div className="card-header bg-light d-flex justify-content-between align-items-center p-3">
          <Link to="/proyectos" className="btn btn-outline-secondary btn-sm">&larr; Volver a Proyectos</Link>
          <h2 className="h4 mb-0 text-center flex-grow-1">Detalle del Proyecto (Revisor)</h2>
        </div>
        
        <div className="card-body p-4">
          <h3 className="h5 card-title text-primary">{proyecto.nombre}</h3>
          <p className="card-text text-muted mb-2"><strong>Descripción:</strong> {proyecto.descripcion}</p>
          <p className="card-text text-muted mb-4"><strong>Observaciones Creador:</strong> {proyecto.observacionesIniciales}</p>
          
          <hr />
          <div className="row g-3">
            <div className="col-md-6"><p className="mb-2"><strong>Presupuesto:</strong> ${new Intl.NumberFormat('es-CO').format(proyecto.presupuesto)}</p></div>
            <div className="col-md-6"><p className="mb-2"><strong>Categoría:</strong> {proyecto.categoria}</p></div>
            <div className="col-md-6"><p className="mb-2"><strong>Fecha Inicio:</strong> {proyecto.fechaInicio || 'N/A'}</p></div>
            <div className="col-md-6"><p className="mb-2"><strong>Duración:</strong> {proyecto.duracion} meses</p></div>
            <div className="col-md-6"><p className="mb-2"><strong>Fecha Compromiso:</strong> {proyecto.fechaCompromiso}</p></div>
            <div className="col-md-6"><p className="mb-2"><strong>Fecha Primer Avance:</strong> {proyecto.fechaPrimerAvance}</p></div>
            <div className="col-12"><p className="mb-2"><strong>Estado Actual:</strong> <span className={`badge ms-2 fs-6 ${getEstadoClass(proyecto.estado)}`}>{proyecto.estado}</span></p></div>
          </div>

          <hr />
          <h5 className="mb-3">Responsables</h5>
          {proyecto.responsables && proyecto.responsables.length > 0 ? (
            <div className="table-responsive mb-4">
                <table className="table table-sm table-bordered">
                    <thead className="table-light">
                        <tr><th>Nombre</th><th>Rol</th><th>Teléfono</th><th>Correo</th></tr>
                    </thead>
                    <tbody>
                        {proyecto.responsables.map((resp, idx) => (
                            <tr key={idx}><td>{resp.nombre}</td><td>{resp.rol}</td><td>{resp.telefono}</td><td>{resp.correo}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
          ) : <p className="text-muted">No hay responsables.</p>}

          {/* Historial de Observaciones Admin */}
          {proyecto.comentarios && (
             <div className="alert alert-secondary mt-3">
               <strong>Última observación del admin:</strong> {proyecto.comentarios.comentario}
             </div>
          )}

          {isAdmin && (
            <div className="admin-panel mt-4 p-3 bg-light rounded border">
              <label htmlFor="estadoSelect" className="form-label fw-bold">Actualizar Estado:</label>
              <div className="row g-2">
                <div className="col-md-4">
                    <select id="estadoSelect" className="form-select" value={estado} onChange={e => setEstado(e.target.value)}>
                    <option value="Por revisar">Por revisar</option>
                    <option value="Aceptado">Aceptado</option>
                    <option value="En ejecución">En ejecución</option>
                    <option value="Rechazado">Rechazado</option>
                    <option value="Atrasado">Atrasado</option>
                    <option value="Terminado">Terminado</option>
                    <option value="Aplazado">Aplazado</option>
                    </select>
                </div>
                <div className="col-md-8">
                    <input type="text" className="form-control" placeholder="Escriba la observación (Obligatorio)..." value={observacion} onChange={e => setObservacion(e.target.value)} required />
                </div>
                <div className="col-12 text-end mt-2">
                    <button className="btn btn-primary" onClick={guardarEstado}>Guardar Cambios</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}