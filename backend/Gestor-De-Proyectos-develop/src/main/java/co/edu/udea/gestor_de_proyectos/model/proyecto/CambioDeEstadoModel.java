package co.edu.udea.gestor_de_proyectos.model.proyecto;

import co.edu.udea.gestor_de_proyectos.model.dto.ComentariosDTO;
import lombok.Data;

/**
 * Modelo para cambio de estado de proyecto
 */
@Data
public class CambioDeEstadoModel {

    private String estado;
    private ComentariosDTO comentarios;
}
