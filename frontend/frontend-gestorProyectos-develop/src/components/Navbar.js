import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CerrarSesion from "./CerrarSesion";
import { PersonCircle } from 'react-bootstrap-icons'; // --- ¡ICONO IMPORTADO! ---
import "../styles/Navbar.css"; // Importa los estilos

function Navbar() {
  const [role, setRole] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const navigate = useNavigate(); // Hook para navegar

  useEffect(() => {
    // Obtener el rol y nombre completo desde localStorage al cargar el componente
    const userRole = localStorage.getItem("role");
    const nombreUser = localStorage.getItem("nombreUser");
    const apellidosUser = localStorage.getItem("apellidosUser");

    if (userRole) setRole(userRole);
    
    // Comprobamos que los valores no sean "null" (como string)
    if (nombreUser && apellidosUser && nombreUser !== "null" && apellidosUser !== "null") {
      setNombreCompleto(`${nombreUser} ${apellidosUser}`); // Combinar nombre y apellidos
    } else {
      // Si no hay nombre/apellido, usamos el 'user' (admin) como fallback
      setNombreCompleto(localStorage.getItem('user') || ""); 
    }
  }, [navigate]); // Añadimos navigate a las dependencias

  // Si no hay nombre (no logueado), no muestra nada.
  if (!nombreCompleto) {
    return null; 
  }

  const roleClass = role === "admin" ? "navbar-admin" : "navbar-basico";
  
  const navbarTitle =
    role === "admin"
      ? "Gestor de solicitudes - REVISOR"
      : "Gestor de solicitudes - SOLICITANTE";

  return (
    // Navbar de Bootstrap estándar, claro y con una sombra sutil
    // 'sticky-top' hace que se quede pegado arriba al hacer scroll
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-2 sticky-top">
      <div className="container-fluid navbar-content px-md-4">
        
        {/* Título/Brand (link a proyectos) */}
        <Link className={`navbar-brand navbar-title ${roleClass}`} to="/proyectos">
          {navbarTitle}
        </Link>

        {/* Info del Usuario (Alineado a la derecha) */}
        <div className="user-info d-flex align-items-center">
          {/* --- ICONO Y NOMBRE DE USUARIO AÑADIDOS --- */}
          <PersonCircle className="user-icon me-2" size={24} /> 
          {/* 'd-none d-md-block' oculta el nombre en pantallas pequeñas (móvil) */}
          <span className="user-name me-3 d-none d-md-block">{nombreCompleto}</span>
          {/* --- FIN DE LA MODIFICACIÓN --- */}
          <CerrarSesion />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;