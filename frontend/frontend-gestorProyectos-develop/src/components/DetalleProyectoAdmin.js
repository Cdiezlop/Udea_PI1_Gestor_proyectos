import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_BASE } from "../config";
import "../styles/DetalleProyectoAdmin.css";

export default function DetalleProyectoAdmin() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [estado, setEstado] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        console.error(err);
        setLoading(false);
        alert(err.message);
        navigate('/proyectos'); // Si falla, regresa a la lista
      });
  }, [id, navigate]);

  const isAdmin = localStorage.getItem('role') === 'admin';

  const guardarEstado = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/proyectos/cambiar-estado/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          estado: estado,
          comentarios: {
            user: localStorage.getItem('user') || 'admin', 
            comentario: `Estado actualizado a: ${estado}`
          }
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'No se pudo actualizar el estado');
      }
      alert('Estado actualizado');
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
          <Link to="/proyectos" className="btn btn-outline-secondary btn-sm">
            &larr; Volver a Proyectos
          </Link>
          <h2 className="h4 mb-0 text-center flex-grow-1">Detalle del Proyecto (Revisor)</h2>
        </div>
        
        <div className="card-body p-4">
          <h3 className="h5 card-title text-primary">{proyecto.nombre}</h3>
          <p className="card-text text-muted mb-4">{proyecto.descripcion}</p>
          
          <hr />

          <div className="row g-3">
            <div className="col-md-6">
              <p className="mb-2"><strong>Presupuesto:</strong> ${new Intl.NumberFormat('es-CO').format(proyecto.presupuesto)}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-2"><strong>Categoría:</strong> {proyecto.categoria}</p>
            </div>

            {/* --- CAMPOS ACTUALIZADOS/AÑADIDOS --- */}
            <div className="col-md-6">
              <p className="mb-2"><strong>Fecha de Registro:</strong> {proyecto.fechaCreacion}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-2"><strong>Fecha de Inicio:</strong> {proyecto.fechaInicio}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-2"><strong>Duración (Calculada):</strong> {proyecto.duracion} {proyecto.duracion === 1 ? 'mes' : 'meses'}</p>
            </div>
             {/* --- FIN CAMPOS --- */}
            
            <div className="col-md-6">
              <p className="mb-2"><strong>Fecha Compromiso (Final):</strong> {proyecto.fechaCompromiso}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-2"><strong>Fecha Primer Avance:</strong> {proyecto.fechaPrimerAvance}</p>
            </div>
            <div className="col-12">
              <p className="mb-2"><strong>Estado Actual:</strong> 
                <span className={`badge ms-2 fs-6 ${getEstadoClass(proyecto.estado)}`}>
                  {proyecto.estado}
                </span>
              </p>
            </div>
          </div>

          {isAdmin && (
            <div className="admin-panel mt-4 p-3 bg-light rounded border">
              <label htmlFor="estadoSelect" className="form-label fw-bold">Cambiar estado del proyecto:</label>
              <div className="input-group">
                <select id="estadoSelect" className="form-select" value={estado} onChange={e => setEstado(e.target.value)}>
                  <option value="Por revisar">Por revisar</option>
                  <option value="Aceptado">Aceptado</option>
                  <option value="En ejecución">En ejecución</option>
                  <option value="Rechazado">Rechazado</option>
                  <option value="Atrasado">Atrasado</option>
                  <option value="Terminado">Terminado</option>
                  <option value="Aplazado">Aplazado</option>
                </select>
                <button className="btn btn-primary" onClick={guardarEstado}>Guardar Estado</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}