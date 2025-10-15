package co.edu.udea.gestor_de_proyectos.controller;

import co.edu.udea.gestor_de_proyectos.model.compromiso.CompromisoModel;
import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarCompromisoDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearCompromisoDTO;
import co.edu.udea.gestor_de_proyectos.service.CompromisoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/compromisos")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class CompromisosController {

    private final CompromisoService compromisosService;

    @PostMapping
    public ResponseEntity<CompromisoModel> crear(@RequestBody CrearCompromisoDTO dto) {
        return ResponseEntity.ok(compromisosService.crearCompromiso(dto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CompromisoModel> actualizar(@PathVariable String id, @RequestBody ActualizarCompromisoDTO dto) {
        return ResponseEntity.ok(compromisosService.actualizarCompromiso(id, dto));
    }

    @GetMapping("/proyecto/{proyectoId}")
    public ResponseEntity<List<CompromisoModel>> obtenerPorProyecto(@PathVariable String proyectoId) {
        return ResponseEntity.ok(compromisosService.obtenerCompromisosPorProyecto(proyectoId));
    }


    @GetMapping
    public ResponseEntity<List<CompromisoModel>> listar() {
        return ResponseEntity.ok(compromisosService.listarCompromisos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompromisoModel> obtenerPorId(@PathVariable String id) {
        return ResponseEntity.ok(compromisosService.obtenerCompromisoPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        compromisosService.eliminarCompromiso(id);
        return ResponseEntity.noContent().build();
    }
}
