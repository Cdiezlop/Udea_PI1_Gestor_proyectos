import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importa Link
import { API_BASE } from "../config";
import "../styles/CrearProyecto.css";

export default function CrearProyecto() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [presupuesto, setPresupuesto] = useState('');
  const [fechaCompromiso, setFechaCompromiso] = useState('');
  const [fechaPrimerAvance, setFechaPrimerAvance] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/categorias/listar`)
      .then(r => r.json())
      .then(data => setCategorias(data))
      .catch(() => {});

    const uid = localStorage.getItem('userId');
    if (uid) setUserId(uid);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];

    if (!nombre || !descripcion || !categoria || !presupuesto || !fechaCompromiso || !fechaPrimerAvance) {
      alert('Complete todos los campos obligatorios.');
      return;
    }
    if (fechaCompromiso < today || fechaPrimerAvance < today) {
      alert('Las fechas no pueden ser anteriores a hoy.');
      return;
    }
    if (Number(presupuesto) < 0 || isNaN(Number(presupuesto))) {
      alert('El presupuesto debe ser un número positivo.');
      return;
    }

    const proyecto = {
      nombre,
      descripcion,
      categoria,
      userId,
      presupuesto: Number(presupuesto),
      fechaCompromiso,
      fechaPrimerAvance,
    };

    try {
      const res = await fetch(`${API_BASE}/api/proyectos/crear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proyecto),
      });
      if (!res.ok) {
        const errorData = await res.json(); // Intenta leer el error JSON del backend
        throw new Error(errorData.message || 'Error desconocido al crear el proyecto');
      }
      alert('Proyecto creado correctamente.');
      navigate('/proyectos');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    // Aplicamos clases de Bootstrap para centrar y dar estilo
    <div className="crear-proyecto container mt-5 p-4 p-md-5 bg-light rounded shadow" style={{ maxWidth: '800px' }}>
      
      {/* --- BOTÓN VOLVER AÑADIDO --- */}
      <div className="mb-3">
        <Link to="/proyectos" className="btn btn-outline-secondary btn-sm">
          &larr; Volver a Proyectos
        </Link>
      </div>
      {/* --- FIN BOTÓN VOLVER --- */}

      <h2 className="text-center mb-4">Crear Proyecto</h2>
      <form onSubmit={submit}>
        {/* Usamos el sistema de grid de Bootstrap para un formulario más limpio */}
        <div className="row g-3">
          <div className="col-12">
            <label htmlFor="nombre" className="form-label">Nombre del Proyecto</label>
            <input type="text" id="nombre" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>
          <div className="col-12">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea id="descripcion" className="form-control" rows="3" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label htmlFor="categoria" className="form-label">Categoría</label>
            <select id="categoria" className="form-select" value={categoria} onChange={e => setCategoria(e.target.value)} required>
              <option value="">-- Seleccione --</option>
              {categorias.map(c => (
                <option key={c._id || c.id} value={c.name || c.nombre}>
                  {c.name || c.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="presupuesto" className="form-label">Presupuesto</label>
            <input type="number" id="presupuesto" className="form-control" min="0" step="0.01" value={presupuesto} onChange={e => setPresupuesto(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label htmlFor="fechaCompromiso" className="form-label">Fecha compromiso</label>
            <input type="date" id="fechaCompromiso" className="form-control" value={fechaCompromiso} onChange={e => setFechaCompromiso(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label htmlFor="fechaPrimerAvance" className="form-label">Fecha primer avance</label>
            <input type="date" id="fechaPrimerAvance" className="form-control" value={fechaPrimerAvance} onChange={e => setFechaPrimerAvance(e.target.value)} required />
          </div>
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary btn-lg crear-btn">Crear</button>
        </div>
      </form>
    </div>
  );
}