package co.edu.udea.gestor_de_proyectos.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b> 30/08/2025, 2:42 p. m.
 **/
@Data
public class CrearProyectoDTO {

    private String nombre;
    private String descripcion;
    private String userId;
    private String categoria;
    private String presupuesto;
    private String dirigidoa_a;
    private List<CrearCompromisoDTO> compromisos;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaModificacion;
    private LocalDateTime fechaFinalizacion;
}
