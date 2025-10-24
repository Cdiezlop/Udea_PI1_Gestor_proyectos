import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import "../styles/DetalleProyectoAdmin.css";

export default function DetalleProyectoAdmin() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [estado, setEstado] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/proyectos/${id}`)
      .then(r => r.json())
      .then(data => { setProyecto(data); setEstado(data.estado); })
      .catch(console.error);
  }, [id]);

  const isAdmin = localStorage.getItem('role') === 'admin';

  const guardarEstado = async () => {
    try {
      const res = await fetch(`${API_BASE}/proyectos/${id}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado }),
      });
      if (!res.ok) throw new Error('No se pudo actualizar el estado');
      alert('Estado actualizado');
      navigate('/proyectos');
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  if (!proyecto) return <div className="loading">Cargando...</div>;

  return (
    <div className="detalle-proyecto">
      <h2>Detalle del proyecto</h2>
      <p><strong>Nombre:</strong> {proyecto.nombre}</p>
      <p><strong>Descripción:</strong> {proyecto.descripcion}</p>
      <p><strong>Presupuesto:</strong> {proyecto.presupuesto}</p>
      <p><strong>Fecha compromiso:</strong> {proyecto.fechaCompromiso}</p>
      <p><strong>Fecha primer avance:</strong> {proyecto.fechaPrimerAvance}</p>
      <p><strong>Estado:</strong> {proyecto.estado}</p>

      {isAdmin && (
        <div className="admin-panel">
          <label>Cambiar estado</label>
          <select value={estado} onChange={e => setEstado(e.target.value)}>
            <option>Por revisar</option>
            <option>Aceptado</option>
            <option>En ejecución</option>
            <option>Rechazado</option>
            <option>Atrasado</option>
            <option>Terminado</option>
            <option>Aplazado</option>
          </select>
          <button onClick={guardarEstado}>Guardar</button>
        </div>
      )}
    </div>
  );
}
