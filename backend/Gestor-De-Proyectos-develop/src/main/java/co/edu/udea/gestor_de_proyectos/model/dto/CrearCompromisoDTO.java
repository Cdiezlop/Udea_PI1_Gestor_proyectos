package co.edu.udea.gestor_de_proyectos.model.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CrearCompromisoDTO {

    private String estado;
    private String descripcion;
    private LocalDateTime fechaEstimada;
}
