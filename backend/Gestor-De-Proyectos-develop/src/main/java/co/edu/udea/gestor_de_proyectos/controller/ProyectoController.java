package co.edu.udea.gestor_de_proyectos.controller;

import co.edu.udea.gestor_de_proyectos.model.dto.CrearProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.proyecto.CambioDeEstadoModel;
import co.edu.udea.gestor_de_proyectos.model.proyecto.ProyectoModel;
import co.edu.udea.gestor_de_proyectos.service.ProyectoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;


/**
 * Controlador REST para gestión de proyectos
 * Permite crear, listar, actualizar, eliminar y cambiar estado de proyectos.
 */
@RestController
@RequestMapping("/api/proyectos")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ProyectoController {

    private final ProyectoService proyectoService;

    @PostMapping("/crear")
    public ResponseEntity<Proyecto> crearProyecto(@Valid @RequestBody Proyecto proyecto) {
        Proyecto nuevo = proyectoService.crearProyecto(proyecto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Proyecto>> listarProyectos() {
        return ResponseEntity.ok(proyectoService.listarProyectos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Proyecto> obtenerProyecto(@PathVariable String id) {
        Proyecto proyecto = proyectoService.obtenerProyectoPorId(id);
        if (proyecto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(proyecto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Proyecto> actualizarProyecto(@PathVariable String id, @RequestBody Proyecto proyecto) {
        Proyecto actualizado = proyectoService.actualizarProyecto(id, proyecto);
        if (actualizado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProyecto(@PathVariable String id) {
        proyectoService.eliminarProyecto(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Proyecto> cambiarEstado(@PathVariable String id, @RequestBody CambioDeEstadoModel cambio) {
        Proyecto actualizado = proyectoService.cambiarEstado(id, cambio);
        if (actualizado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(actualizado);
    }

    @GetMapping("/usuario/{userId}")
    public ResponseEntity<List<Proyecto>> listarPorUsuario(@PathVariable String userId) {
        return ResponseEntity.ok(proyectoService.listarProyectosPorUsuario(userId));
    }
}