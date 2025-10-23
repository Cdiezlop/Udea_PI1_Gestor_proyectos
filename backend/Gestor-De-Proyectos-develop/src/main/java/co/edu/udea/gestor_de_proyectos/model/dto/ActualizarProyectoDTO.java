package co.edu.udea.gestor_de_proyectos.model.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

/**
 * DTO para actualizar proyecto - Sprint 3
 */
@Data
public class ActualizarProyectoDTO {

    private String nombre;
    private String userId;
    private String categoria;
    private String estado;
    private Double presupuesto;
    private String dirigidoa_a;
    private List<String> compromisosId;
    private LocalDate fechaFinalizacion;
}
