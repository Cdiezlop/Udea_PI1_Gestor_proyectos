package co.edu.udea.gestor_de_proyectos.service;

import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.proyecto.CambioDeEstadoModel;
import co.edu.udea.gestor_de_proyectos.model.proyecto.ProyectoModel;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b> 30/08/2025, 10:29 a. m.
 **/
public interface ProyectoService {

    ProyectoModel crearProyecto (CrearProyectoDTO crearProyectoDTO);

    Page<ProyectoModel> proyectosPaginados (int page, int size);

    ProyectoModel actualizarProyecto (String id, ActualizarProyectoDTO actualizarProyectoDTO);

    List<ProyectoModel> listarProyectos ();

    ProyectoModel cambiarEstado(String id, CambioDeEstadoModel cambioDeEstadoModel);

    ProyectoModel proyectoPorId(String proyectoId);

    List<ProyectoModel> listarProyectosPorUsuario(String userId);
}
