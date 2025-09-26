import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recuperarContrasenaService } from "../services/recuperarContrasenaService"; // Importar el servicio
import "../styles/RecuperarContrasena.css"; // Estilos para esta página

function RecuperarContrasena() {
  const [formData, setFormData] = useState({
    usuario: "",
    nuevaContrasena: "",
    confirmarContrasena: "",
  });
  const [loading, setLoading] = useState(false); // Manejo de estado de carga
  const navigate = useNavigate(); // Redirección

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.nuevaContrasena !== formData.confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true); // Activar estado de carga

    try {
      // Llamar al servicio
      await recuperarContrasenaService(
        formData.usuario,
        formData.nuevaContrasena,
        formData.confirmarContrasena
      );

      alert("Contraseña actualizada correctamente");
      setFormData({ usuario: "", nuevaContrasena: "", confirmarContrasena: "" }); // Limpiar formulario
      
      navigate("/login"); // Redirigir al login
    } catch (error) {
      alert(error.message || "Error al actualizar la contraseña");
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  return (
    <div className="recuperar-contrasena-page">
      <div className="recuperar-contrasena-container">
        <h2>Recuperar contraseña</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="Introduce tu usuario"
              required
              disabled={loading} // Desactivar mientras carga
            />
          </div>

          <div className="input-field">
            <label htmlFor="nuevaContrasena">Nueva contraseña</label>
            <input
              type="password"
              id="nuevaContrasena"
              name="nuevaContrasena"
              value={formData.nuevaContrasena}
              onChange={handleChange}
              placeholder="Introduce tu nueva contraseña"
              required
              disabled={loading} // Desactivar mientras carga
            />
          </div>

          <div className="input-field">
            <label htmlFor="confirmarContrasena">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmarContrasena"
              name="confirmarContrasena"
              value={formData.confirmarContrasena}
              onChange={handleChange}
              placeholder="Confirma tu nueva contraseña"
              required
              disabled={loading} // Desactivar mientras carga
            />
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={loading} // Desactivar mientras carga
          >
            {loading ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RecuperarContrasena;