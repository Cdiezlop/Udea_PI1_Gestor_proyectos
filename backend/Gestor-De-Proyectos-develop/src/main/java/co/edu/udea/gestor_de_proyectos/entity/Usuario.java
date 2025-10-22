package co.edu.udea.gestor_de_proyectos.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

import java.time.LocalDateTime;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b>  01/09/2025, 10:17 a. m.
 **/
@Data
@Document("usuario")
public class Usuario {

    @Id
    private String id;
    private String nombre;
    private String apellidos;
    private int edad;
    private int estrato;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaModificacion;
    private String ciudad;
    private String user;
    private String password;
    private String rol;
}
