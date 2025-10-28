import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Importa Link
import { API_BASE } from "../config";
import "../styles/DetalleProyectoAdmin.css";

export default function DetalleProyectoAdmin() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [estado, setEstado] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        // El backend espera un objeto CambioDeEstadoModel, 
        // enviamos el estado y un objeto 'comentarios' vacío por ahora.
        body: JSON.stringify({ 
          estado: estado,
          comentarios: {
            user: localStorage.getItem('user') || 'admin', // Enviar el usuario que hace el cambio
            comentario: `Estado actualizado a: ${estado}` // Un comentario por defecto
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
      <div className="detalle-container card shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          {/* --- BOTÓN VOLVER AÑADIDO --- */}
          <Link to="/proyectos" className="btn btn-outline-secondary btn-sm">
            &larr; Volver a Proyectos
          </Link>
          <h2 className="h4 mb-0 text-center flex-grow-1">Detalle del Proyecto (Revisor)</h2>
        </div>
        <div className="card-body p-4">
          <h3 className="h5 card-title">{proyecto.nombre}</h3>
          <p className="card-text text-muted">{proyecto.descripcion}</p>
          
          <hr />

          <div className="row g-3">
            <div className="col-md-6">
              <p><strong>Presupuesto:</strong> ${new Intl.NumberFormat('es-CO').format(proyecto.presupuesto)}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Categoría:</strong> {proyecto.categoria}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Fecha Compromiso:</strong> {proyecto.fechaCompromiso}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Fecha Primer Avance:</strong> {proyecto.fechaPrimerAvance}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Estado Actual:</strong> <span className="badge bg-info text-dark">{proyecto.estado}</span></p>
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