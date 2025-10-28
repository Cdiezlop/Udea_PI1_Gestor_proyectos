package co.edu.udea.gestor_de_proyectos.service.implement;

import co.edu.udea.gestor_de_proyectos.entity.Compromisos;
import co.edu.udea.gestor_de_proyectos.entity.Proyecto;
import co.edu.udea.gestor_de_proyectos.model.compromiso.CompromisoModel;
import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarCompromisoDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearCompromisoDTO;
import co.edu.udea.gestor_de_proyectos.repository.CompromisosRepository;
import co.edu.udea.gestor_de_proyectos.repository.ProyectoRepository;
import co.edu.udea.gestor_de_proyectos.service.CompromisoService;
import co.edu.udea.gestor_de_proyectos.service.FechaActualService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CompromisoServiceImpl implements CompromisoService {

    private final CompromisosRepository compromisosRepository;
    private final ProyectoRepository proyectoRepository;
    private final FechaActualService fechaActual;

    @Override
    public CompromisoModel crearCompromiso(CrearCompromisoDTO dto) {
        Compromisos compromiso = new Compromisos();
        compromiso.setId(generateId(null));
        compromiso.setEstado(dto.getEstado());
        compromiso.setDescripcion(dto.getDescripcion());
        compromiso.setFechaEstimada(dto.getFechaEstimada());
        compromiso.setFechaReal(null);

        Compromisos saved = compromisosRepository.save(compromiso);
        log.info("Compromiso creado con ID: {}", saved.getId());
        return mapToModel(saved);
    }

    @Override
    public CompromisoModel actualizarCompromiso(String id, ActualizarCompromisoDTO dto) {
        Compromisos compromiso = compromisosRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Compromiso no encontrado"));

        compromiso.setEstado(dto.getEstado());
        compromiso.setDescripcion(dto.getDescripcion());
        compromiso.setFechaEstimada(dto.getFechaEstimada());
        compromiso.setFechaReal(dto.getFechaReal());

        Compromisos updated = compromisosRepository.save(compromiso);
        log.info("Compromiso actualizado con ID: {}", id);
        return mapToModel(updated);
    }

    @Override
    public List<CompromisoModel> listarCompromisos() {
        return compromisosRepository.findAll()
                .stream()
                .map(this::mapToModel)
                .toList();
    }

    @Override
    public List<CompromisoModel> obtenerCompromisosPorProyecto(String proyectoId) {
        Proyecto proyecto = proyectoRepository.findById(proyectoId)
                .orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));

        List<String> compromisosId = proyecto.getCompromisosId();

        if (compromisosId == null || compromisosId.isEmpty()) {
            log.info("El proyecto {} no tiene compromisos asociados.", proyectoId);
            return new ArrayList<>();
        }

        List<Compromisos> compromisos = compromisosRepository.findAllById(compromisosId);

        return compromisos.stream()
                .map(this::mapToModel)
                .toList();
    }

    @Override
    public CompromisoModel obtenerCompromisoPorId(String id) {
        Compromisos compromiso = compromisosRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Compromiso no encontrado"));
        return mapToModel(compromiso);
    }

    @Override
    public void eliminarCompromiso(String id) {
        if (!compromisosRepository.existsById(id)) {
            throw new IllegalArgumentException("Compromiso no encontrado");
        }
        compromisosRepository.deleteById(id);
        log.info("Compromiso eliminado con ID: {}", id);
    }

    private CompromisoModel mapToModel(Compromisos compromiso) {
        CompromisoModel model = new CompromisoModel();
        model.setId(compromiso.getId());
        model.setCategoria(compromiso.getEstado());
        model.setDescripcion(compromiso.getDescripcion());
        model.setFechaEstimada(compromiso.getFechaEstimada());
        model.setFechaReal(compromiso.getFechaReal());
        return model;
    }

    private String generateId(String base) {
        return UUID.randomUUID().toString();
    }
}

