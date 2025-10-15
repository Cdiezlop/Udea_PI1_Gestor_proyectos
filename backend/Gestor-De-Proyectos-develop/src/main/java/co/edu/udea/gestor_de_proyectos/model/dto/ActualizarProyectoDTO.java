package co.edu.udea.gestor_de_proyectos.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b>  01/09/2025, 2:56 p. m.
 **/
@Data
public class ActualizarProyectoDTO {

    private String nombre;
    private String userId;
    private String categoria;
    private String estado;
    private String presupuesto;
    private String dirigidoa_a;
    private List<String> compromisosId;
    private LocalDateTime fechaFinalizacion;
}
