package co.edu.udea.gestor_de_proyectos.model.proyecto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

/**
 * Modelo de respuesta para la API (ProyectoModel)
 * Contiene los campos que enviaremos al frontend.
 * Las fechas se formatean con pattern yyyy-MM-dd.
 */
@Data
public class ProyectoModel {

    private String id;
    private String nombre;
    private String descripcion;
    private Double presupuesto;
    private String categoria;
    private String userId;
    private List<String> compromisosId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaCreacion;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaModificacion;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaFinalizacion;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaCompromiso;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaPrimerAvance;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaRegistro;

    private String estado;
}