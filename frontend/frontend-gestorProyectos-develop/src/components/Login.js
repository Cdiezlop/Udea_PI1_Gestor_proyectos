import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginService } from "../services/loginService"; // Importar el servicio
import "../styles/Login.css"; // Asegúrate de tener el archivo CSS correspondiente

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Manejo del estado de carga
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!username || !password) {
      alert("Por favor, completa todos los campos");
      return;
    }

    setLoading(true); // Activar loading

    try {
      const data = await loginService(username, password); // Usar el servicio

      // Guardar datos en localStorage
      localStorage.setItem("userId", data.id); // Guardar el ID del usuario
      localStorage.setItem("role", data.rol); // Guardar el role del usuario
      localStorage.setItem("nombreUser", data.nombre); // Guardar el nombre del usuario
      localStorage.setItem("apellidosUser", data.apellidos); // Guardar apellidos del usuario
      localStorage.setItem("user", data.user); // Almacenar el username

      navigate("/proyectos"); // Redirigir a proyectos
    } catch (error) {
      alert(error.message || "Error al iniciar sesión"); // Mostrar error
    } finally {
      setLoading(false); // Desactivar loading
    }
  };

  return (
    <div className="login-page">
      {/* Parte izquierda con el título y subtítulo */}
      <div className="left-side">
        <h1>Gestor de proyectos</h1>
        <p>Gestión eficiente a las solicitudes de proyectos</p>
      </div>

      {/* Parte derecha con el formulario de login */}
      <div className="right-side">
        <div className="login-container">
          <h2>Inicio de sesión</h2>

          {/* Formulario de inicio de sesión */}
          <form onSubmit={handleLogin}>
            <div className="input-field">
              <label htmlFor="user">Usuario</label>
              <input
                type="text"
                id="user"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading} // Desactivar mientras está cargando
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading} // Desactivar mientras está cargando
              />
            </div>

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>

          {/* Enlaces de la parte inferior */}
          <div className="bottom-links">
            {/* Enlace a la página de recuperar contraseña */}
            <Link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
            {/* Enlace a la página de crear cuenta */}
            <Link to="/registrar">¿No tienes cuenta? Regístrate</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;