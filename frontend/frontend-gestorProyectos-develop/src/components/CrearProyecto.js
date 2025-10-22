import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCategoriasService,
  crearProyectoService,
} from "../services/crear-proyectosService"; // Importamos los servicios
import "../styles/CrearProyecto.css"; // Importamos los estilos

export default function CrearProyecto() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [presupuesto, setPresupuesto] = useState('');
  const [fechaCompromiso, setFechaCompromiso] = useState('');
  const [fechaPrimerAvance, setFechaPrimerAvance] = useState('');
  const [userId, setUserId] = useState(''); // se asume proviene del login
  const navigate = useNavigate();

  useEffect(() => {
    // Buscar categorías si el endpoint existe
    fetch(`${API_BASE}/categorias/listar`)
      .then(r => r.json())
      .then(data => setCategorias(data))
      .catch(()=>{ /* silencioso si no existe */ });

    const uid = localStorage.getItem('userId');
    if(uid) setUserId(uid);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    // Validaciones cliente
    const today = new Date().toISOString().split('T')[0];
    if (!nombre || !descripcion || !categoria || !presupuesto || !fechaCompromiso || !fechaPrimerAvance) {
      alert('Complete todos los campos obligatorios.');
      return;
    }
    if (fechaCompromiso < today) {
      alert('La fecha de compromiso no puede ser anterior a hoy.');
      return;
    }
    if (fechaPrimerAvance < today) {
      alert('La fecha del primer avance no puede ser anterior a hoy.');
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
      fechaPrimerAvance
    };

    try {
      const res = await fetch(`${API_BASE}/proyectos/crear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proyecto)
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Error al crear proyecto');
      }
      alert('Proyecto creado correctamente.');
      navigate('/proyectos');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="crear-proyecto">
      <h2>Crear Proyecto</h2>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" value={nombre} onChange={e=>setNombre(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea value={descripcion} onChange={e=>setDescripcion(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <select value={categoria} onChange={e=>setCategoria(e.target.value)} required>
            <option value="">-- Seleccione --</option>
            {categorias.map(c => <option key={c._id || c.id} value={c.name || c.nombre}>{c.name || c.nombre}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Presupuesto</label>
          <input type="number" min="0" step="0.01" value={presupuesto} onChange={e=>setPresupuesto(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Fecha compromiso</label>
          <input type="date" value={fechaCompromiso} onChange={e=>setFechaCompromiso(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Fecha primer avance</label>
          <input type="date" value={fechaPrimerAvance} onChange={e=>setFechaPrimerAvance(e.target.value)} required />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Crear</button>
        </div>
      </form>
    </div>
  );
}