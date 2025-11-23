import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  solicitarRecuperacionService, 
  restablecerContrasenaService 
} from "../services/recuperarContrasenaService";
import "../styles/RecuperarContrasena.css";

function RecuperarContrasena() {
  const [step, setStep] = useState(1); // 1: Solicitar correo, 2: Cambiar contraseña
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Paso 1: Enviar correo para pedir código
  const handleRequestCode = async (e) => {
    e.preventDefault();
    if (!email) return alert("Por favor ingrese su correo.");

    setLoading(true);
    try {
      await solicitarRecuperacionService(email);
      alert(`Se ha enviado un código de recuperación a ${email}`);
      setStep(2); // Avanzar al siguiente paso
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Paso 2: Restablecer con código y nueva clave
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!token || !newPassword || !confirmPassword) {
      return alert("Todos los campos son obligatorios.");
    }
    if (newPassword !== confirmPassword) {
      return alert("Las contraseñas no coinciden.");
    }

    setLoading(true);
    try {
      // Solo enviamos token y nueva contraseña al servicio
      await restablecerContrasenaService(token, newPassword);
      alert("¡Contraseña actualizada con éxito!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recuperar-contrasena-page">
      <div className="recuperar-contrasena-container">
        <h2>Recuperación de Cuenta</h2>

        {step === 1 && (
          <form onSubmit={handleRequestCode}>
            <p className="text-muted text-center mb-4">
              Ingrese su correo electrónico registrado. Le enviaremos un código de seguridad.
            </p>
            <div className="input-field">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Código"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <p className="text-muted text-center mb-4">
              Ingrese el código recibido y su nueva contraseña.
            </p>
            <div className="input-field">
              <label htmlFor="token">Código de Verificación</label>
              <input
                type="text"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Código recibido"
                required
                disabled={loading}
              />
            </div>
            <div className="input-field">
              <label htmlFor="newPassword">Nueva Contraseña</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nueva contraseña"
                required
                disabled={loading}
              />
            </div>
            <div className="input-field">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita la contraseña"
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Actualizando..." : "Cambiar Contraseña"}
            </button>
            
            {/* Opción para volver atrás si se equivocó de correo */}
            <div className="text-center mt-2">
                <button 
                    type="button" 
                    className="btn btn-link btn-sm text-decoration-none"
                    onClick={() => setStep(1)}
                    disabled={loading}
                >
                    ¿No recibiste el código? Intentar de nuevo
                </button>
            </div>
          </form>
        )}

        <div className="text-center mt-3">
          <Link to="/login">Volver a Inicio de Sesión</Link>
        </div>
      </div>
    </div>
  );
}

export default RecuperarContrasena;