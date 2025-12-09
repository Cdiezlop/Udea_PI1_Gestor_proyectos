import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  fetchProyectosPaginadosService, 
  fetchBuscarProyectosService, 
  fetchProyectosFiltrosService 
} from "../services/proyectosService";
import "../styles/Proyectos.css";

function Proyectos() {
  const navigate = useNavigate();
  
  // Estados para datos y paginación
  const [proyectos, setProyectos] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const size = 5; // Cantidad de proyectos por página

  // Estado para controlar qué tipo de vista estamos mostrando
  // 'default' = paginación normal, 'search' = resultados de búsqueda, 'filter' = resultados filtrados
  const [viewMode, setViewMode] = useState('default');

  // Estados para los inputs
  const [searchTerm, setSearchTerm] = useState("");
  const [filtros, setFiltros] = useState({
    fechaDesde: "",
    fechaFin: "",
    estado: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Efecto principal: Recarga cuando cambia la página o el modo de vista
  useEffect(() => {
    cargarProyectos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, viewMode]);

  const cargarProyectos = async () => {
    setLoading(true);
    setError("");
    try {
      let data;
      
      if (viewMode === 'search' && searchTerm) {
        data = await fetchBuscarProyectosService(searchTerm, page, size);
      } else if (viewMode === 'filter') {
        data = await fetchProyectosFiltrosService(page, size, filtros.fechaDesde, filtros.fechaFin, filtros.estado);
      } else {
        // Modo default
        data = await fetchProyectosPaginadosService(page, size);
      }

      setProyectos(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      setError(err.message);
      setProyectos([]);
    } finally {
      setLoading(false);
    }
  };

  // Manejadores de eventos
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setPage(0); // Reiniciar a primera página
    setViewMode('search'); // Cambiar modo, esto disparará el useEffect
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setPage(0);
    setViewMode('filter');
  };

  const handleReset = () => {
    setSearchTerm("");
    setFiltros({ fechaDesde: "", fechaFin: "", estado: "" });
    setPage(0);
    setViewMode('default'); // Volver a la carga normal
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  // Renderizado
  return (
    <div className="container mt-5 p-4 bg-light rounded shadow-lg">
      <h2 className="text-center mb-4">Gestión de Proyectos</h2>

      {/* --- SECCIÓN DE CONTROLES (Búsqueda y Filtros) --- */}
      <div className="controls-container mb-4">
        
        {/* Barra de Búsqueda General */}
        <form onSubmit={handleSearch} className="d-flex mb-3 gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre de proyecto o usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-info text-white">Buscar</button>
        </form>

        {/* Filtros Avanzados */}
        <form onSubmit={handleFilter} className="filters-row p-3 border rounded bg-white">
          <h6 className="text-muted mb-2">Filtrar por:</h6>
          <div className="row g-2 align-items-end">
            <div className="col-md-3">
              <label className="form-label small">Desde</label>
              <input 
                type="date" 
                className="form-control form-control-sm" 
                value={filtros.fechaDesde}
                onChange={(e) => setFiltros({...filtros, fechaDesde: e.target.value})}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small">Hasta</label>
              <input 
                type="date" 
                className="form-control form-control-sm" 
                value={filtros.fechaFin}
                onChange={(e) => setFiltros({...filtros, fechaFin: e.target.value})}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small">Estado</label>
              <select 
                className="form-select form-select-sm"
                value={filtros.estado}
                onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
              >
                <option value="">Todos</option>
                <option value="Por revisar">Por revisar</option>
                <option value="Aceptado">Aceptado</option>
                <option value="Rechazado">Rechazado</option>
              </select>
            </div>
            <div className="col-md-3 d-flex gap-2">
              <button type="submit" className="btn btn-primary btn-sm w-100">Aplicar Filtros</button>
              {(viewMode !== 'default') && (
                 <button type="button" className="btn btn-secondary btn-sm" onClick={handleReset}>Limpiar</button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* --- ESTADOS DE CARGA Y ERROR --- */}
      {loading && <p className="text-center my-4">Cargando resultados...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* --- LISTA DE RESULTADOS --- */}
      {!loading && !error && (
        <>
          {proyectos.length === 0 ? (
             <div className="text-center py-5">
               <h5>No se encontraron proyectos.</h5>
               <p className="text-muted">Intenta ajustar los filtros o registra uno nuevo.</p>
             </div>
          ) : (
            <div className="list-group mb-4">
              {proyectos.map((proyecto) => (
                <div key={proyecto.id} className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center shadow-sm mb-2 border-start border-4 ${getStatusColorClass(proyecto.estado)}`}>
                  <div className="ms-2">
                    <h5 className="mb-1 fw-bold">{proyecto.nombre}</h5>
                    <small className="text-muted d-block">
                      Categoría: {proyecto.categoria} | Inicio: {proyecto.fechaInicio}
                    </small>
                    <span className={`badge mt-2 ${getBadgeClass(proyecto.estado)}`}>
                      {proyecto.estado}
                    </span>
                  </div>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                      const role = localStorage.getItem("role");
                      const path = (role === "admin") ? `/cambiar-estado/${proyecto.id}` : `/proyecto-detalles/${proyecto.id}`;
                      navigate(path);
                    }}
                  >
                    Ver Detalles
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* --- PAGINACIÓN --- */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-3">
              <button 
                className="btn btn-outline-secondary" 
                disabled={page === 0}
                onClick={() => handlePageChange(page - 1)}
              >
                &laquo; Anterior
              </button>
              <span className="fw-bold text-muted">
                Página {page + 1} de {totalPages}
              </span>
              <button 
                className="btn btn-outline-secondary" 
                disabled={page === totalPages - 1}
                onClick={() => handlePageChange(page + 1)}
              >
                Siguiente &raquo;
              </button>
            </div>
          )}
        </>
      )}

      {/* --- BOTÓN DE REGISTRO --- */}
      <div className="mt-4 text-center border-top pt-4">
        <button
          className="btn btn-success btn-lg px-5 shadow"
          onClick={() => navigate("/crear-proyecto")}
        >
          Registrar Proyecto
        </button>
      </div>
    </div>
  );
}

// Funciones auxiliares para estilos
const getStatusColorClass = (estado) => {
    switch(estado) {
        case "Aceptado": return "border-success";
        case "Rechazado": return "border-danger";
        default: return "border-warning"; // Por revisar
    }
};

const getBadgeClass = (estado) => {
    switch(estado) {
        case "Aceptado": return "bg-success";
        case "Rechazado": return "bg-danger";
        default: return "bg-warning text-dark";
    }
};

export default Proyectos;