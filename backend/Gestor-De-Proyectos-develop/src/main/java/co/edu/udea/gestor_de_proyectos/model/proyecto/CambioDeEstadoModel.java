package co.edu.udea.gestor_de_proyectos.model.proyecto;

import lombok.Data;

/**
 * Modelo para cambio de estado de proyecto
 */
@Data
public class CambioDeEstadoModel {

    private String estado;
    private String comentarios; // más simple y evita dependencias no implementadas
}
