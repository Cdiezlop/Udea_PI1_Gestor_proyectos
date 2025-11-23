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
  const [observacionesIniciales, setObservacionesIniciales] = useState('');
  
  const getTodayString = () => new Date().toISOString().split('T')[0];
  
  const [fechaInicio, setFechaInicio] = useState(getTodayString());
  const [fechaCompromiso, setFechaCompromiso] = useState('');
  const [fechaPrimerAvance, setFechaPrimerAvance] = useState('');
  
  const [responsables, setResponsables] = useState([
    { nombre: '', edad: '', rol: '', telefono: '', correo: '' }
  ]);
  
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

  const handlePresupuestoChange = (e) => {
    const filteredValue = e.target.value.replace(/[^0-9]/g, '');
    setPresupuesto(filteredValue);
  };

  const handleResponsableChange = (index, event) => {
    const values = [...responsables];
    values[index][event.target.name] = event.target.value;
    setResponsables(values);
  };

  const handleAddResponsable = () => {
    setResponsables([...responsables, { nombre: '', edad: '', rol: '', telefono: '', correo: '' }]);
  };

  const handleRemoveResponsable = (index) => {
    const values = [...responsables];
    values.splice(index, 1);
    setResponsables(values);
  };

  const submit = async (e) => {
    e.preventDefault();
    const today = getTodayString();

    if (!nombre || !descripcion || !categoria || !presupuesto || !fechaInicio || !fechaCompromiso || !fechaPrimerAvance || !observacionesIniciales.trim()) {
      alert('Complete todos los campos obligatorios, incluidas las observaciones.');
      return;
    }
    
    if (fechaInicio < today) return alert('La fecha de inicio no puede ser anterior a hoy.');
    if (fechaCompromiso < fechaInicio) return alert('Fecha compromiso inválida.');
    if (fechaPrimerAvance < fechaInicio) return alert('Fecha primer avance inválida.');
    if (fechaCompromiso < fechaPrimerAvance) return alert('El compromiso no puede ser antes del avance.');

    const presupuestoNum = Number(presupuesto);
    if (isNaN(presupuestoNum) || presupuestoNum <= 0 || !Number.isInteger(presupuestoNum)) {
      alert('El presupuesto debe ser un entero positivo.');
      return;
    }

    if (responsables.length === 0) {
        alert('Debe agregar al menos un responsable.');
        return;
    }
    for (let r of responsables) {
        if (!r.nombre || !r.edad || !r.rol || !r.telefono || !r.correo) {
            alert('Complete todos los campos de los responsables.');
            return;
        }
        const edadResp = Number(r.edad);
        if (edadResp < 1 || !Number.isInteger(edadResp)) {
            alert('La edad del responsable debe ser un entero mayor a 0.');
            return;
        }
    }

    const proyecto = {
      nombre,
      descripcion,
      categoria,
      userId,
      presupuesto: presupuestoNum,
      fechaInicio,
      fechaCompromiso,
      fechaPrimerAvance,
      responsables,
      observacionesIniciales
    };

    try {
      const res = await fetch(`${API_BASE}/api/proyectos/crear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proyecto),
      });
      if (!res.ok) {
        const errorData = await res.json(); 
        throw new Error(errorData.message || 'Error al crear el proyecto');
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
        <Link to="/proyectos" className="btn btn-outline-secondary btn-sm">&larr; Volver a Proyectos</Link>
      </div>
      <h2 className="text-center mb-4">Crear Proyecto</h2>
      <form onSubmit={submit}>
        {/* Datos Generales */}
        <h4 className="mb-3">Datos Generales</h4>
        <div className="row g-3 mb-4">
          <div className="col-12">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>
          <div className="col-12">
            <label className="form-label">Descripción</label>
            <textarea className="form-control" rows="2" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
          </div>
          <div className="col-12">
            <label className="form-label">Observaciones del Proyecto</label>
            <textarea className="form-control" rows="2" placeholder="Observaciones iniciales..." value={observacionesIniciales} onChange={e => setObservacionesIniciales(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Categoría</label>
            <select className="form-select" value={categoria} onChange={e => setCategoria(e.target.value)} required>
              <option value="">-- Seleccione --</option>
              {categorias.map(c => <option key={c._id || c.id} value={c.name || c.nombre}>{c.name || c.nombre}</option>)}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Presupuesto</label>
            <input type="text" className="form-control" value={presupuesto} onChange={handlePresupuestoChange} placeholder="Solo números" required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Fecha Inicio</label>
            <input type="date" className="form-control" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} min={getTodayString()} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Fecha Primer Avance</label>
            <input type="date" className="form-control" value={fechaPrimerAvance} onChange={e => setFechaPrimerAvance(e.target.value)} min={fechaInicio} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Fecha Compromiso</label>
            <input type="date" className="form-control" value={fechaCompromiso} onChange={e => setFechaCompromiso(e.target.value)} min={fechaPrimerAvance || fechaInicio} required />
          </div>
        </div>

        {/* Sección de Responsables */}
        <h4 className="mb-3">Responsables del Proyecto</h4>
        {responsables.map((responsable, index) => (
          <div key={index} className="card p-3 mb-3 bg-white border">
            <div className="row g-2">
               <div className="col-md-6">
                 <input type="text" name="nombre" placeholder="Nombre Completo" className="form-control" value={responsable.nombre} onChange={e => handleResponsableChange(index, e)} required />
               </div>
               <div className="col-md-2">
                 <input type="number" name="edad" placeholder="Edad" className="form-control" value={responsable.edad} onChange={e => handleResponsableChange(index, e)} min="1" step="1" required />
               </div>
               <div className="col-md-4">
                 <input type="text" name="rol" placeholder="Rol en el proyecto" className="form-control" value={responsable.rol} onChange={e => handleResponsableChange(index, e)} required />
               </div>
               <div className="col-md-6">
                 <input type="text" name="telefono" placeholder="Teléfono" className="form-control" value={responsable.telefono} onChange={e => handleResponsableChange(index, e)} required />
               </div>
               <div className="col-md-6">
                 <input type="email" name="correo" placeholder="Correo Electrónico" className="form-control" value={responsable.correo} onChange={e => handleResponsableChange(index, e)} required />
               </div>
            </div>
            {responsables.length > 1 && (
              <button type="button" className="btn btn-danger btn-sm mt-2" style={{width: 'fit-content'}} onClick={() => handleRemoveResponsable(index)}>Eliminar Responsable</button>
            )}
          </div>
        ))}
        <div className="text-center mb-4">
            <button type="button" className="btn btn-success btn-sm" onClick={handleAddResponsable}>+ Agregar otro responsable</button>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg crear-btn">Crear Proyecto</button>
        </div>
      </form>
    </div>
  );
}