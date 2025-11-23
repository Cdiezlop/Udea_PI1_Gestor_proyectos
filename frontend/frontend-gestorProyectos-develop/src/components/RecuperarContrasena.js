import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  solicitarRecuperacionService, 
  restablecerContrasenaService 
} from "../services/recuperarContrasenaService";
import "../styles/RecuperarContrasena.css";

function RecuperarContrasena() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState(""); // Ahora usamos username
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Paso 1: Enviar usuario
  const handleRequestCode = async (e) => {
    e.preventDefault();
    if (!username) return alert("Por favor ingrese su nombre de usuario.");

    setLoading(true);
    try {
      await solicitarRecuperacionService(username);
      alert(`Código enviado al correo asociado al usuario: ${username}\n(Revisa la consola del Backend si estás en pruebas)`);
      setStep(2);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Paso 2: Resetear clave
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!token || !newPassword || !confirmPassword) return alert("Complete todos los campos.");
    if (newPassword !== confirmPassword) return alert("Las contraseñas no coinciden.");

    setLoading(true);
    try {
      await restablecerContrasenaService(token, newPassword);
      alert("¡Contraseña actualizada correctamente!");
      navigate("/login");
    } catch (error) {
      alert("Error: " + error.message);
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
              Ingrese su <strong>Nombre de Usuario</strong>. Enviaremos un código a su correo registrado.
            </p>
            <div className="input-field">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ej: laura.res"
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Buscando..." : "Enviar Código"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <p className="text-muted text-center mb-4">
              Código enviado. Ingréselo para cambiar su clave.
            </p>
            <div className="input-field">
              <label htmlFor="token">Código de Verificación</label>
              <input type="text" id="token" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Ej: 123456" required disabled={loading} />
            </div>
            <div className="input-field">
              <label htmlFor="newPassword">Nueva Contraseña</label>
              <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Nueva contraseña" required disabled={loading} />
            </div>
            <div className="input-field">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repita la contraseña" required disabled={loading} />
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Actualizando..." : "Cambiar Contraseña"}
            </button>
            <div className="text-center mt-2">
                <button type="button" className="btn btn-link btn-sm" onClick={() => setStep(1)} disabled={loading}>Volver atrás</button>
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