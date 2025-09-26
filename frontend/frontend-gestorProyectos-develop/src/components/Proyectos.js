import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProyectosService } from "../services/proyectosService";
import "../styles/Proyectos.css";

function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProyectos = async () => {
      const role = localStorage.getItem("role"); // Obtén el rol del usuario
      const userId = localStorage.getItem("userId"); // Obtén el userId si existe

      try {
        const data = await fetchProyectosService(role, userId); // Llama al servicio con el rol y userId
        setProyectos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Cargando proyectos...</p>;
  }

  if (error) {
    return <p className="text-center text-danger mt-5">{error}</p>;
  }

  if (proyectos.length === 0) {
    return (
      <div className="container mt-5 p-5 bg-light rounded shadow text-center">
        <h2 className="mb-4">Lista de proyectos</h2>
        <img
          src="https://img.freepik.com/vector-premium/portapapeles-signo-simbolo-vector-glifo-color-icono_942266-452.jpg?w=250"
          alt="Lista de proyectos"
          className="mt-4 mb-4"
        />
        <h5 className="mb-2">Aún no tienes solicitudes registradas</h5>
        <p className="text-muted mb-4">
          Aquí se mostrarán todas tus solicitudes
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/crear-proyecto")}
        >
          Crear solicitud
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5 p-5 bg-light rounded shadow">
      <h2 className="text-center mb-5">Lista de proyectos</h2>
      <div className="list-group proyectos-list">
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="list-group-item mb-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-2">{proyecto.nombre}</h5>
                <p className="mb-2 text-muted">
                  {"Estado: " + proyecto.estado}
                </p>
              </div>
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  const role = localStorage.getItem("role");
                  if (role === "admin") {
                    navigate(`/cambiar-estado/${proyecto.id}`); // Redirigir a la vista para admin
                  } else {
                    navigate(`/proyecto-detalles/${proyecto.id}`); // Redirigir a la vista normal
                  }
                }}
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 text-center">
        <button
          className="btn btn-primary crear-solicitud"
          onClick={() => navigate("/crear-proyecto")}
        >
          Crear solicitud
        </button>
      </div>
    </div>
  );
}

export default Proyectos;