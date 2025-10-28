import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importa Link
import { recuperarContrasenaService } from "../services/recuperarContrasenaService";
import "../styles/RecuperarContrasena.css";

function RecuperarContrasena() {
  const [formData, setFormData] = useState({
    usuario: "",
    nuevaContrasena: "",
    confirmarContrasena: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    setLoading(true);

    try {
      await recuperarContrasenaService(
        formData.usuario,
        formData.nuevaContrasena,
        formData.confirmarContrasena
      );

      alert("Contraseña actualizada correctamente");
      setFormData({ usuario: "", nuevaContrasena: "", confirmarContrasena: "" });
      
      navigate("/login");
    } catch (error) {
      alert(error.message || "Error al actualizar la contraseña");
    } finally {
      setLoading(false);
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? "Actualizando..." : "Actualizar contraseña"}
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

export default RecuperarContrasena;