package co.edu.udea.gestor_de_proyectos.service.implement;

import co.edu.udea.gestor_de_proyectos.entity.Compromisos;
import co.edu.udea.gestor_de_proyectos.entity.Proyecto;
import co.edu.udea.gestor_de_proyectos.model.comentarios.ComentariosModel;
import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.ComentariosDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearCompromisoDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.proyecto.CambioDeEstadoModel;
import co.edu.udea.gestor_de_proyectos.model.proyecto.ProyectoModel;
import co.edu.udea.gestor_de_proyectos.repository.CompromisosRepository;
import co.edu.udea.gestor_de_proyectos.repository.ProyectoRepository;
import co.edu.udea.gestor_de_proyectos.service.FechaActualService;
import co.edu.udea.gestor_de_proyectos.service.ProyectoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProyectoServiceImpl implements ProyectoService {

    private final ProyectoRepository proyectoRepository;
    private final CompromisosRepository compromisosRepository;
    private final FechaActualService fechaActual;

    @Override
    public ProyectoModel crearProyecto(CrearProyectoDTO crearProyectoDTO) {
        Proyecto proyecto = new Proyecto();
        proyecto.setId(generateId(null));
        proyecto.setNombre(crearProyectoDTO.getNombre());
        proyecto.setDescripcion(crearProyectoDTO.getDescripcion());
        proyecto.setUserId(crearProyectoDTO.getUserId());
        proyecto.setCategoria(crearProyectoDTO.getCategoria());
        proyecto.setPresupuesto(crearProyectoDTO.getPresupuesto());
        proyecto.setDirigidoa_a(crearProyectoDTO.getDirigidoa_a());
        proyecto.setFechaCreacion(fechaActual.getCurrentDate().toLocalDate());
        proyecto.setFechaModificacion(fechaActual.getCurrentDate().toLocalDate());

        // --- CORRECCION DE LA LÓGICA DE CREACION ---
        proyecto.setFechaCompromiso(crearProyectoDTO.getFechaCompromiso());
        proyecto.setFechaPrimerAvance(crearProyectoDTO.getFechaPrimerAvance());
        // --- FIN CORRECCION ---

        proyecto.setEstado("Por revisar");

        List<String> compromisosIds = new ArrayList<>();

        if (crearProyectoDTO.getCompromisos() != null && !crearProyectoDTO.getCompromisos().isEmpty()) {
            for (CrearCompromisoDTO compromisoDTO : crearProyectoDTO.getCompromisos()) {
                Compromisos compromiso = new Compromisos();
                compromiso.setId(generateId(null));
                compromiso.setDescripcion(compromisoDTO.getDescripcion());
                compromiso.setEstado(compromisoDTO.getEstado());
                compromiso.setFechaEstimada(compromisoDTO.getFechaEstimada());
                compromiso.setFechaReal(fechaActual.getCurrentDate());
                Compromisos saved = compromisosRepository.save(compromiso);
                compromisosIds.add(saved.getId());
            }
        }

        proyecto.setCompromisosId(compromisosIds);

        Proyecto savedProyecto = proyectoRepository.save(proyecto);
        log.info("Proyecto creado con ID: {}", savedProyecto.getId());
        return mapToModel(savedProyecto);
    }

    @Override
    public List<ProyectoModel> listarProyectosPorUsuario(String userId) {
        List<Proyecto> proyectos = proyectoRepository.findAllByUserId(userId);
        return proyectos.stream().map(this::mapToModel).toList();
    }

    @Override
    public ProyectoModel proyectoPorId(String proyectoId) {
        Optional<Proyecto> proyectoOptional = proyectoRepository.findById(proyectoId);
        Proyecto proyecto = proyectoOptional.orElseThrow(() ->
                new RuntimeException("El proyecto con ID " + proyectoId + " no existe"));
        return mapToModel(proyecto);
    }

    @Override
    public Page<ProyectoModel> proyectosPaginados(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);
        Page<Proyecto> proyectosPage = proyectoRepository.findAll(pageable);
        return proyectosPage.map(this::mapToModel);
    }

    @Override
    public ProyectoModel actualizarProyecto(String id,  ActualizarProyectoDTO actualizarProyectoDTO) {
        Proyecto proyecto = proyectoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));
        proyecto.setNombre(actualizarProyectoDTO.getNombre());
        proyecto.setCategoria(actualizarProyectoDTO.getCategoria());
        proyecto.setFechaModificacion(fechaActual.getCurrentDate().toLocalDate());
        proyecto.setEstado(actualizarProyectoDTO.getEstado());

        Proyecto updatedProyecto = proyectoRepository.save(proyecto);
        return mapToModel(updatedProyecto);
    }

    @Override
    public List<ProyectoModel> listarProyectos() {
        List<Proyecto> proyectos = proyectoRepository.findAll();
        return proyectos.stream().map(this::mapToModel).toList();
    }

    @Override
    public ProyectoModel cambiarEstado(String id, CambioDeEstadoModel cambioDeEstadoModel) {
        Proyecto proyecto = proyectoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));

        proyecto.setEstado(cambioDeEstadoModel.getEstado());

        // --- INICIO DE LA CORRECCIÓN ---
        // Solo procesar comentarios si se enviaron en el request
        ComentariosDTO comentariosDTO = cambioDeEstadoModel.getComentarios();
        if (comentariosDTO != null && comentariosDTO.getComentario() != null && !comentariosDTO.getComentario().isEmpty()) {
            ComentariosModel comentario = new ComentariosModel();
            comentario.setUser(comentariosDTO.getUser()); // Asumimos que el frontend enviará el usuario
            comentario.setFechaComentarios(fechaActual.getCurrentDate());
            comentario.setComentario(comentariosDTO.getComentario());

            if ("Aceptado".equalsIgnoreCase(cambioDeEstadoModel.getEstado())) {
                comentario.setTipoComentario("Proyecto aceptado");
            } else if ("Rechazado".equalsIgnoreCase(cambioDeEstadoModel.getEstado())) {
                comentario.setTipoComentario("Proyecto rechazado");
            } else {
                comentario.setTipoComentario("Actualización de estado");
            }
            proyecto.setComentarios(comentario); // Anade el nuevo comentario
        }
        // --- FIN DE LA CORRECCIÓN ---

        proyecto.setFechaModificacion(fechaActual.getCurrentDate().toLocalDate());
        Proyecto updatedProyecto = proyectoRepository.save(proyecto);
        return mapToModel(updatedProyecto);
    }

    private ProyectoModel mapToModel(Proyecto proyecto) {
        ProyectoModel model = new ProyectoModel();
        model.setId(proyecto.getId());
        model.setNombre(proyecto.getNombre());
        model.setDescripcion(proyecto.getDescripcion());
        model.setUserId(proyecto.getUserId());
        model.setCategoria(proyecto.getCategoria());
        model.setPresupuesto(proyecto.getPresupuesto());
        model.setDirigidoa_a(proyecto.getDirigidoa_a());
        model.setFechaCreacion(proyecto.getFechaCreacion());
        model.setFechaModificacion(proyecto.getFechaModificacion());
        model.setFechaFinalizacion(proyecto.getFechaFinalizacion());
        model.setEstado(proyecto.getEstado());
        model.setComentarios(proyecto.getComentarios());
        model.setCompromisosId(proyecto.getCompromisosId());

        // --- CORRECCIÓN DEL MAPEO (PARA MOSTRAR FECHAS) ---
        model.setFechaCompromiso(proyecto.getFechaCompromiso());
        model.setFechaPrimerAvance(proyecto.getFechaPrimerAvance());
        // --- FIN CORRECCIÓN ---

        return model;
    }

    private String generateId(String id) {
        return (id == null) ? UUID.randomUUID().toString() : id;
    }
}