import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { API_BASE } from "../config";
import "../styles/CrearProyecto.css";

export default function CrearProyecto() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [presupuesto, setPresupuesto] = useState('');
  
  const getTodayString = () => new Date().toISOString().split('T')[0];
  
  const [fechaInicio, setFechaInicio] = useState(getTodayString());
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

  // --- NUEVO HANDLER PARA PRESUPUESTO ---
  // Esto filtra la entrada para permitir solo números enteros
  const handlePresupuestoChange = (e) => {
    const value = e.target.value;
    // Elimina cualquier carácter que no sea un dígito (quita puntos, comas, signos, etc.)
    const filteredValue = value.replace(/[^0-9]/g, '');
    setPresupuesto(filteredValue);
  };
  // --- FIN NUEVO HANDLER ---

  const submit = async (e) => {
    e.preventDefault();
    const today = getTodayString();

    // --- BLOQUE DE VALIDACIÓN ---
    if (!nombre || !descripcion || !categoria || !presupuesto || !fechaInicio || !fechaCompromiso || !fechaPrimerAvance) {
      alert('Complete todos los campos obligatorios.');
      return;
    }
    
    // Validación 1: Fecha de inicio
    if (fechaInicio < today) {
      alert('La fecha de inicio no puede ser anterior a hoy.');
      return;
    }
    
    // Validación 2: Fechas de avance y compromiso vs Fecha de inicio
    if (fechaCompromiso < fechaInicio) {
      alert('La fecha de compromiso (fecha final) no puede ser anterior a la fecha de inicio.');
      return;
    }
    if (fechaPrimerAvance < fechaInicio) {
      alert('La fecha del primer avance no puede ser anterior a la fecha de inicio.');
      return;
    }

    // Validación 3: Fecha de compromiso vs Fecha de primer avance
    if (fechaCompromiso < fechaPrimerAvance) {
      alert('La fecha de compromiso (final) no puede ser anterior a la fecha del primer avance.');
      return;
    }

    // --- VALIDACIÓN DE PRESUPUESTO ACTUALIZADA ---
    const presupuestoNum = Number(presupuesto);
    if (isNaN(presupuestoNum) || presupuestoNum <= 0 || !Number.isInteger(presupuestoNum)) {
      alert('El presupuesto debe ser un número entero positivo (sin comas ni puntos).');
      return;
    }
    // --- FIN VALIDACIÓN ---

    // Objeto de envío (sin duracion)
    const proyecto = {
      nombre,
      descripcion,
      categoria,
      userId,
      presupuesto: presupuestoNum, // Enviamos el número validado
      fechaInicio,
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
        const errorData = await res.json(); 
        throw new Error(errorData.message || 'Error desconocido al crear el proyecto');
      }
      alert('Proyecto creado correctamente.');
      navigate('/proyectos');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="crear-proyecto container mt-5 p-4 p-md-5 bg-light rounded shadow" style={{ maxWidth: '800px' }}>
      
      <div className="mb-3">
        <Link to="/proyectos" className="btn btn-outline-secondary btn-sm">
          &larr; Volver a Proyectos
        </Link>
      </div>

      <h2 className="text-center mb-4">Crear Proyecto</h2>
      <form onSubmit={submit}>
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

          {/* --- CAMPO PRESUPUESTO ACTUALIZADO --- */}
          <div className="col-md-6">
            <label htmlFor="presupuesto" className="form-label">Presupuesto</label>
            <input 
              type="text" // Cambiado a text para filtrar manualmente
              pattern="[0-9]*" // Ayuda a teclados móviles a mostrar solo números
              id="presupuesto" 
              className="form-control" 
              value={presupuesto} 
              onChange={handlePresupuestoChange} // Usar el handler personalizado
              placeholder="Ej: 5000000 (Solo números)"
              required 
            />
          </div>
          {/* --- FIN CAMPO --- */}

          <div className="col-md-6">
            <label htmlFor="fechaInicio" className="form-label">Fecha de Inicio</label>
            <input type="date" id="fechaInicio" className="form-control" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} min={getTodayString()} required />
          </div>
          
          <div className="col-md-6">
            <label htmlFor="fechaPrimerAvance" className="form-label">Fecha primer avance</label>
            <input type="date" id="fechaPrimerAvance" className="form-control" value={fechaPrimerAvance} onChange={e => setFechaPrimerAvance(e.target.value)} min={fechaInicio || getTodayString()} required />
          </div>

          <div className="col-md-6">
            <label htmlFor="fechaCompromiso" className="form-label">Fecha Compromiso (Final)</label>
            <input type="date" id="fechaCompromiso" className="form-control" value={fechaCompromiso} onChange={e => setFechaCompromiso(e.target.value)} min={fechaPrimerAvance || fechaInicio || getTodayString()} required />
          </div>

        </div>
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary btn-lg crear-btn">Crear</button>
        </div>
      </form>
    </div>
  );
}