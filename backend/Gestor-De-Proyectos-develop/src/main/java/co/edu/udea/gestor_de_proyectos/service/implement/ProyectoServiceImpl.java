package co.edu.udea.gestor_de_proyectos.service.implement;

import co.edu.udea.gestor_de_proyectos.entity.Proyecto;
import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.proyecto.CambioDeEstadoModel;
import co.edu.udea.gestor_de_proyectos.model.proyecto.ProyectoModel;
import co.edu.udea.gestor_de_proyectos.repository.ProyectoRepository;
import co.edu.udea.gestor_de_proyectos.service.ProyectoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Implementación del servicio de proyectos.
 * - Mapea CrearProyectoDTO -> Proyecto -> ProyectoModel
 * - Asigna fechaRegistro = LocalDate.now()
 * - Estado inicial: "Por revisar"
 */

/**
 * Implementación del servicio de proyectos.
 * Maneja la lógica de negocio para CRUD y cambios de estado.
 */


@Service
@RequiredArgsConstructor
public class ProyectoServiceImpl implements ProyectoService {

    private final ProyectoRepository proyectoRepository;

    @Override
    public Proyecto crearProyecto(Proyecto proyecto) {
        proyecto.setId(UUID.randomUUID().toString());
        proyecto.setFechaCreacion(LocalDate.now());
        proyecto.setFechaRegistro(LocalDate.now());
        proyecto.setEstado("Por revisar");
        return proyectoRepository.save(proyecto);
    }

    @Override
    public Proyecto obtenerProyectoPorId(String id) {
        return proyectoRepository.findById(id).orElse(null);
    }

    @Override
    public List<Proyecto> listarProyectos() {
        return proyectoRepository.findAll();
    }

    @Override
    public Proyecto actualizarProyecto(String id, Proyecto proyecto) {
        return proyectoRepository.findById(id)
            .map(actualizado -> {
                actualizado.setNombre(proyecto.getNombre());
                actualizado.setDescripcion(proyecto.getDescripcion());
                actualizado.setPresupuesto(proyecto.getPresupuesto());
                actualizado.setCategoria(proyecto.getCategoria());
                actualizado.setFechaModificacion(LocalDate.now());
                return proyectoRepository.save(actualizado);
            })
            .orElse(null);
    }

    @Override
    public void eliminarProyecto(String id) {
        proyectoRepository.deleteById(id);
    }

    @Override
    public Proyecto cambiarEstado(String id, CambioDeEstadoModel cambioDeEstado) {
        Optional<Proyecto> optionalProyecto = proyectoRepository.findById(id);
        if (optionalProyecto.isPresent()) {
            Proyecto proyecto = optionalProyecto.get();
            proyecto.setEstado(cambioDeEstado.getEstado());
            proyecto.setFechaModificacion(LocalDate.now());
            return proyectoRepository.save(proyecto);
        }
        return null;
    }

    @Override
    public List<Proyecto> listarProyectosPorUsuario(String userId) {
        return proyectoRepository.findAllByUserId(userId);
    }
}