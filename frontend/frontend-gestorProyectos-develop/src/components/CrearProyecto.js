import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { crearProyectoService } from "../services/crear-proyectosService";
import "../styles/CrearProyecto.css";

function CrearProyecto() {
  const navigate = useNavigate();
  
  const hoy = new Date();
  const fechaMinimaInicio = new Date(hoy);
  fechaMinimaInicio.setDate(hoy.getDate() + 15);
  const fechaMinimaString = fechaMinimaInicio.toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    presupuesto: "",
    dirigidoa_a: "", 
    fechaInicio: "",
    duracionDias: "",
    responsables: [],
    compromisos: [],
    observacionesIniciales: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const isFormComplete = validateForm();
    setFormValid(isFormComplete);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const validateForm = () => {
    // 1. Campos básicos
    if (!formData.nombre || !formData.descripcion || !formData.categoria || !formData.presupuesto || !formData.dirigidoa_a || !formData.fechaInicio || !formData.duracionDias) {
        return false;
    }
    // 2. Fecha
    if (new Date(formData.fechaInicio) < fechaMinimaInicio) return false;
    
    // 3. Responsables
    if (formData.responsables.length === 0) return false;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Valida exactamente 10 dígitos

    for (let r of formData.responsables) {
        if (!r.nombre || !r.rol || !r.correo || !r.telefono) return false;
        if (!emailRegex.test(r.correo)) return false;
        if (!phoneRegex.test(r.telefono)) return false; // Nueva validación de teléfono
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fechaInicio") {
      const fechaSeleccionada = new Date(value);
      if (fechaSeleccionada < fechaMinimaInicio) {
        setError("La fecha de inicio debe ser al menos 15 días después de la fecha actual.");
      } else {
        setError("");
      }
    }
    if (name === "duracionDias") {
       if (value < 0 || value.includes(".") || value.includes(",")) return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleAddResponsable = () => {
    setFormData({
      ...formData,
      responsables: [...formData.responsables, { nombre: "", edad: "", rol: "", telefono: "", correo: "" }],
    });
  };

  const handleResponsableChange = (index, e) => {
    const { name, value } = e.target;
    
    // Si es teléfono, solo permitimos números
    if (name === "telefono") {
        if (!/^\d*$/.test(value)) return; // Si no es número, no hace nada
    }

    const newResponsables = [...formData.responsables];
    newResponsables[index][name] = value;
    setFormData({ ...formData, responsables: newResponsables });
  };

  const handleRemoveResponsable = (index) => {
      const newResponsables = formData.responsables.filter((_, i) => i !== index);
      setFormData({ ...formData, responsables: newResponsables });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) {
        setError("Por favor verifique los campos. El teléfono debe tener 10 dígitos.");
        return;
    }
    setError("");
    setSuccess("");

    const proyectoPayload = {
      ...formData,
      presupuesto: parseFloat(formData.presupuesto),
      duracionDias: parseInt(formData.duracionDias),
      userId: localStorage.getItem("userId") || "anonimo",
    };

    try {
      await crearProyectoService(proyectoPayload);
      setSuccess("¡Proyecto registrado exitosamente para revisión!");
      setTimeout(() => navigate("/proyectos"), 2000);
    } catch (err) {
      setError(err.message || "Error al registrar el proyecto");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Registrar Proyecto</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow">
        
        {/* --- (El resto de inputs: Nombre, Categoría, Descripción se mantienen igual) --- */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Nombre del Proyecto</label>
            <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Categoría</label>
            <select className="form-select" name="categoria" value={formData.categoria} onChange={handleChange} required>
              <option value="">Seleccione...</option>
              <option value="Investigación">Investigación</option>
              <option value="Desarrollo">Desarrollo</option>
              <option value="Infraestructura">Infraestructura</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" name="descripcion" rows="3" value={formData.descripcion} onChange={handleChange} required></textarea>
        </div>

        {/* --- Fechas y Duración --- */}
        <div className="row mb-3">
          <div className="col-md-4">
             <label className="form-label">Fecha de Inicio</label>
             <input 
               type="date" 
               className="form-control" 
               name="fechaInicio" 
               value={formData.fechaInicio} 
               onChange={handleChange} 
               min={fechaMinimaString}
               required 
             />
             <small className="text-muted">Mínimo 15 días después de hoy</small>
          </div>
          <div className="col-md-4">
             <label className="form-label">Duración (Días)</label>
             <input 
               type="number" 
               className="form-control" 
               name="duracionDias" 
               value={formData.duracionDias} 
               onChange={handleChange} 
               placeholder="Ej: 30"
               min="1"
               step="1"
               required 
             />
          </div>
          <div className="col-md-4">
            <label className="form-label">Presupuesto</label>
            <input type="number" className="form-control" name="presupuesto" value={formData.presupuesto} onChange={handleChange} required />
          </div>
        </div>

        <div className="mb-3">
           <label className="form-label">Observaciones Generales</label>
           <input 
             type="text" 
             className="form-control" 
             name="dirigidoa_a" 
             value={formData.dirigidoa_a} 
             onChange={handleChange} 
             placeholder="Información adicional relevante..."
             required 
           />
        </div>

        {/* --- Responsables (CON CAMBIOS) --- */}
        <div className="mt-4 p-3 border rounded bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Responsables (Obligatorio)</h5>
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddResponsable}>+ Agregar Responsable</button>
            </div>
            
            {formData.responsables.length === 0 && (
                <div className="alert alert-warning py-2 text-center">Debe agregar al menos un responsable para guardar.</div>
            )}

            {formData.responsables.map((resp, index) => (
            <div key={index} className="row mb-2 g-2 align-items-start">
                <div className="col-md-3">
                   <label className="small text-muted">Nombre</label>
                   <input type="text" className="form-control form-control-sm" name="nombre" value={resp.nombre} onChange={(e) => handleResponsableChange(index, e)} required />
                </div>
                <div className="col-md-3">
                   <label className="small text-muted">Rol</label>
                   <input type="text" className="form-control form-control-sm" name="rol" value={resp.rol} onChange={(e) => handleResponsableChange(index, e)} required />
                </div>
                 <div className="col-md-3">
                   <label className="small text-muted">Correo</label>
                   <input type="email" className="form-control form-control-sm" name="correo" value={resp.correo} onChange={(e) => handleResponsableChange(index, e)} placeholder="user@mail.com" required />
                </div>
                <div className="col-md-2">
                   <label className="small text-muted">Teléfono</label>
                   <input 
                     type="text" 
                     className="form-control form-control-sm" 
                     name="telefono" 
                     value={resp.telefono} 
                     onChange={(e) => handleResponsableChange(index, e)} 
                     placeholder="3001234567"
                     maxLength="10"
                     required 
                   />
                   {/* Mensaje de ayuda */}
                   <div style={{fontSize: "0.7rem", color: "#6c757d", marginTop: "2px"}}>
                     Solo números (10 dígitos)
                   </div>
                </div>
                <div className="col-md-1 align-self-center pt-2">
                    <button type="button" className="btn btn-danger btn-sm w-100" onClick={() => handleRemoveResponsable(index)}>X</button>
                </div>
            </div>
            ))}
        </div>

        {/* --- Observaciones Adicionales --- */}
        <div className="mb-4 mt-3">
           <label className="form-label">Comentarios Adicionales (Opcional)</label>
           <textarea className="form-control" name="observacionesIniciales" rows="2" value={formData.observacionesIniciales} onChange={handleChange}></textarea>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg" disabled={!formValid}>
            Guardar registro para revisión
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearProyecto;