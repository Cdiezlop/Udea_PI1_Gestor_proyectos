import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importa Link
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
    password: "",
    confirmarContrasena: "",
  });
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activar loading

    if (formData.password !== formData.confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      setLoading(false); // Desactivar loading
      return;
    }

    // Convertir edad y estrato a números
    const dataToSend = {
      ...formData,
      edad: Number(formData.edad),
      estrato: Number(formData.estrato),
    };

    try {
      await registrarUsuarioService(dataToSend);
      alert("Usuario registrado exitosamente");
      navigate("/login");
    } catch (error) {
      alert(error.message || "Error en el registro");
    } finally {
      setLoading(false); // Desactivar loading
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
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Introduce tu nombre"
                required
                disabled={loading}
              />
            </div>
            <div className="form-column">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                placeholder="Introduce tus apellidos"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-column">
              <label htmlFor="usuario">Usuario</label>
              <input
                type="text"
                id="usuario"
                name="user"
                value={formData.user}
                onChange={handleChange}
                placeholder="Introduce tu usuario"
                required
                disabled={loading}
              />
            </div>
            <div className="form-column">
              <label htmlFor="edad">Edad</label>
              <input
                type="number"
                id="edad"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                placeholder="Introduce tu edad"
                required
                min="0"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-column">
              <label htmlFor="estrato">Estrato</label>
              <input
                type="number"
                id="estrato"
                name="estrato"
                value={formData.estrato}
                onChange={handleChange}
                placeholder="Introduce tu estrato"
                required
                min="0"
                disabled={loading}
              />
            </div>
            <div className="form-column">
              <label htmlFor="ciudad">Ciudad</label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                placeholder="Introduce tu ciudad"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-column">
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="password"
                id="contrasena"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Introduce tu contraseña"
                required
                disabled={loading}
              />
            </div>
            <div className="form-column">
              <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmarContrasena"
                name="confirmarContrasena"
                value={formData.confirmarContrasena}
                onChange={handleChange}
                placeholder="Confirma tu contraseña"
                required
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        {/* --- BOTÓN VOLVER AÑADIDO --- */}
        <div className="text-center mt-3">
          <Link to="/login">Volver a Inicio de Sesión</Link>
        </div>
        {/* --- FIN BOTÓN VOLVER --- */}

      </div>
    </div>
  );
}

export default Registrar;