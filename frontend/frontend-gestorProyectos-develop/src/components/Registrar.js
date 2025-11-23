import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrarUsuarioService } from "../services/registrar-usuarioService";
import "../styles/Registrar.css";

function Registrar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    user: "",
    edad: "",
    estrato: "",
    ciudad: "",
    email: "",
    password: "",
    confirmarContrasena: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    const edadNum = Number(formData.edad);
    if (edadNum < 1 || !Number.isInteger(edadNum)) {
       alert("La edad debe ser un número entero mayor o igual a 1.");
       setLoading(false);
       return;
    }

    const dataToSend = {
      ...formData,
      edad: edadNum,
      estrato: Number(formData.estrato),
    };

    try {
      await registrarUsuarioService(dataToSend);
      alert("Usuario registrado exitosamente");
      navigate("/login");
    } catch (error) {
      alert(error.message || "Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crear-cuenta-page">
      <div className="form-container">
        <h1 className="text-center">Crear cuenta</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-column">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-column">
              <label htmlFor="apellidos">Apellidos</label>
              <input type="text" id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} required disabled={loading} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-column">
              <label htmlFor="usuario">Usuario</label>
              <input type="text" id="usuario" name="user" value={formData.user} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-column">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="ejemplo@correo.com" required disabled={loading} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-column">
              <label htmlFor="edad">Edad</label>
              <input type="number" id="edad" name="edad" value={formData.edad} onChange={handleChange} min="1" step="1" required disabled={loading} />
            </div>
            <div className="form-column">
              <label htmlFor="estrato">Estrato</label>
              <select id="estrato" name="estrato" className="form-control" value={formData.estrato} onChange={handleChange} required disabled={loading} 
                style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
                <option value="">Seleccione...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-column">
              <label htmlFor="ciudad">Ciudad</label>
              <input type="text" id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} required disabled={loading} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-column">
              <label htmlFor="contrasena">Contraseña</label>
              <input type="password" id="contrasena" name="password" value={formData.password} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-column">
              <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
              <input type="password" id="confirmarContrasena" name="confirmarContrasena" value={formData.confirmarContrasena} onChange={handleChange} required disabled={loading} />
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="/login">Volver a Inicio de Sesión</Link>
        </div>
      </div>
    </div>
  );
}

export default Registrar;