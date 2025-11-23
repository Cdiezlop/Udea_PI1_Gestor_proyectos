package co.edu.udea.gestor_de_proyectos.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

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
    private String email;
}