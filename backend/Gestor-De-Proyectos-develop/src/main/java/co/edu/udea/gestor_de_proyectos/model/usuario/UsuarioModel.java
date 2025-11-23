package co.edu.udea.gestor_de_proyectos.model.usuario;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b> 30/08/2025, 10:19 a. m.
 **/
@Data
@Getter
@Setter
public class UsuarioModel {

    private String id;
    private String nombre;
    private String apellidos;
    private int edad;
    private int estrato;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaModificacion;
    private String email;
    private String ciudad;
    private String rol;
    private String user;
}
