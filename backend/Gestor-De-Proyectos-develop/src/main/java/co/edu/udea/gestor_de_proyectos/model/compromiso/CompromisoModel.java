package co.edu.udea.gestor_de_proyectos.model.compromiso;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CompromisoModel {
    private String id;
    private String categoria;
    private String descripcion;
    private LocalDateTime fechaEstimada;
    private LocalDateTime fechaReal;
}
