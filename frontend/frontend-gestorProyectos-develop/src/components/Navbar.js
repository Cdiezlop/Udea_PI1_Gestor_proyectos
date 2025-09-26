import React, { useEffect, useState } from "react";
import CerrarSesion from "./CerrarSesion"; // Botón de cerrar sesión
import "../styles/Navbar.css"; // Importa los estilos

function Navbar() {
  const [role, setRole] = useState(""); // Estado para el rol del usuario
  const [nombreCompleto, setNombreCompleto] = useState(""); // Estado para el nombre completo del usuario

  useEffect(() => {
    // Obtener el rol y nombre completo desde localStorage al cargar el componente
    const userRole = localStorage.getItem("role");
    const nombreUser = localStorage.getItem("nombreUser");
    const apellidosUser = localStorage.getItem("apellidosUser");

    setRole(userRole);
    setNombreCompleto(`${nombreUser} ${apellidosUser}`); // Combinar nombre y apellidos
  }, []);

  const roleClass = role === "admin" ? "navbar-admin" : "navbar-basico"; 
  //<h1 className={`navbar-title ${roleClass}`}>{navbarTitle}</h1>

  // Determinar el título dinámico según el rol
  const navbarTitle =
    role === "admin"
      ? "Gestor de solicitudes - REVISOR"
      : role === "Basico"
      ? "Gestor de solicitudes - SOLICITANTE"
      : "Gestor de solicitudes";

  return (
    <nav className="navbar">
      <div className="navbar-content">
      <h1 className={`navbar-title ${roleClass}`}>{navbarTitle}</h1>
        <div className="user-info">
          <span className="user-name">{nombreCompleto}</span>
          <CerrarSesion />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;