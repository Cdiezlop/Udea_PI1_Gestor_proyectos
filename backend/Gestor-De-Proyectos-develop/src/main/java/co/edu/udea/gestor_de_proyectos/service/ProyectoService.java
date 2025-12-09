package co.edu.udea.gestor_de_proyectos.service;

import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.proyecto.CambioDeEstadoModel;
import co.edu.udea.gestor_de_proyectos.model.proyecto.ProyectoModel;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;

public interface ProyectoService {

    ProyectoModel crearProyecto(CrearProyectoDTO crearProyectoDTO);

    // SE AGREGA String userId
    Page<ProyectoModel> proyectosPaginados(int page, int size, String userId);

    // SE AGREGA String userId
    Page<ProyectoModel> proyectosPorFechaYEstado(LocalDate fechaDesde, LocalDate fechaHasta, String estado, int page, int size, String userId);

    List<ProyectoModel> listarProyectosPorUsuario(String userId);

    ProyectoModel proyectoPorId(String proyectoId);

    // SE AGREGA String userId
    Page<ProyectoModel> buscarProyectosGeneral(String termino, int page, int size, String userId);

    ProyectoModel actualizarProyecto(String id, ActualizarProyectoDTO actualizarProyectoDTO);

    List<ProyectoModel> listarProyectos();

    ProyectoModel cambiarEstado(String id, CambioDeEstadoModel cambioDeEstadoModel);
}