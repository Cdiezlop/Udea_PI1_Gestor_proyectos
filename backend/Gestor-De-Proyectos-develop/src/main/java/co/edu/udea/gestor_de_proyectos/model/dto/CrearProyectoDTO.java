package co.edu.udea.gestor_de_proyectos.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

/**
 * DTO para crear proyecto - Sprint 3
 * Validaciones estrictas:
 *  - campos obligatorios marcados con @NotBlank/@NotNull
 *  - fechas con @FutureOrPresent
 *  - presupuesto @PositiveOrZero
 * Formato de fechas esperado: "yyyy-MM-dd"
 */
@Data
public class CrearProyectoDTO {

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "La descripción es obligatoria")
    private String descripcion;

    @NotBlank(message = "El userId es obligatorio")
    private String userId;

    @NotBlank(message = "La categoría es obligatoria")
    private String categoria;

    @NotNull(message = "El presupuesto es obligatorio")
    @PositiveOrZero(message = "El presupuesto debe ser un número positivo o cero")
    private Double presupuesto;

    private String dirigidoa_a;

    private List<String> compromisos;

    @NotNull(message = "La fecha de compromiso es obligatoria")
    @FutureOrPresent(message = "La fecha de compromiso debe ser hoy o futura")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaCompromiso;

    @NotNull(message = "La fecha del primer avance es obligatoria")
    @FutureOrPresent(message = "La fecha del primer avance debe ser hoy o futura")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaPrimerAvance;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaFinalizacion;
}