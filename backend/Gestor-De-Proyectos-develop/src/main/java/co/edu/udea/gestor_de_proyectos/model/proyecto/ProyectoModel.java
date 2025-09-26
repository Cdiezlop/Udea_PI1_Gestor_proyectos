package co.edu.udea.gestor_de_proyectos.model.proyecto;

import co.edu.udea.gestor_de_proyectos.model.comentarios.ComentariosModel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b> 30/08/2025, 10:18 a. m.
 **/
@Data
@Getter
@Setter
public class ProyectoModel {

    private String id;
    private String nombre;
    private String descripcion;
    private String userId;
    private String categoria;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaModificacion;
    private String estado;
    private ComentariosModel comentarios;
}
