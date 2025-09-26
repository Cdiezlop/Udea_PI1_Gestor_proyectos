import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuarioService } from "../services/registrar-usuarioService"; // Importar el servicio
import "../styles/Registrar.css"; // Estilos para esta página

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      await registrarUsuarioService(formData); // Usar el servicio para registrar
      alert("Usuario registrado exitosamente");
      navigate("/login"); // Redirigir al login
    } catch (error) {
      alert(error.message || "Error en el registro");
    }
  };

  return (
    <div className="crear-cuenta-page">
      <div className="form-container">
        <h1>Crear cuenta</h1>
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
              />
            </div>
          </div>

          <button type="submit" className="btn-submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Registrar;