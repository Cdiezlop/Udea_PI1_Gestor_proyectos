package co.edu.udea.gestor_de_proyectos.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

/**
 * @author Tgl. Jhoan Villa y cristian.diez
 * Email: jhoan.villa y cristian.diez
 * @version Id: <b>gestor-de-proyectos</b> 
 **/
@Data

/**
 * DTO para crear proyecto - Sprint 3
 * Validaciones estrictas:
 *  - campos obligatorios marcados con @NotBlank/@NotNull
 *  - fechas con @FutureOrPresent
 *  - presupuesto @PositiveOrZero
 *
 * Formato de fechas esperado: "yyyy-MM-dd"
 */
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

    private List<Object> compromisos;

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

    // Getters / Setters
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public Double getPresupuesto() { return presupuesto; }
    public void setPresupuesto(Double presupuesto) { this.presupuesto = presupuesto; }

    public String getDirigidoa_a() { return dirigidoa_a; }
    public void setDirigidoa_a(String dirigidoa_a) { this.dirigidoa_a = dirigidoa_a; }

    public List<Object> getCompromisos() { return compromisos; }
    public void setCompromisos(List<Object> compromisos) { this.compromisos = compromisos; }

    public LocalDate getFechaCompromiso() { return fechaCompromiso; }
    public void setFechaCompromiso(LocalDate fechaCompromiso) { this.fechaCompromiso = fechaCompromiso; }

    public LocalDate getFechaPrimerAvance() { return fechaPrimerAvance; }
    public void setFechaPrimerAvance(LocalDate fechaPrimerAvance) { this.fechaPrimerAvance = fechaPrimerAvance; }

    public LocalDate getFechaFinalizacion() { return fechaFinalizacion; }
    public void setFechaFinalizacion(LocalDate fechaFinalizacion) { this.fechaFinalizacion = fechaFinalizacion; }
}