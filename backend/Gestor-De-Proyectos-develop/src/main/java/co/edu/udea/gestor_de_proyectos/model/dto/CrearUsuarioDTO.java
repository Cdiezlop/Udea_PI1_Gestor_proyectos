package co.edu.udea.gestor_de_proyectos.model.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CrearUsuarioDTO {

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;
    
    @NotBlank(message = "Los apellidos son obligatorios")
    private String apellidos;

    @Min(value = 1, message = "La edad debe ser mayor o igual a 1")
    private int edad;

    @Min(value = 1, message = "El estrato mínimo es 1")
    @Max(value = 6, message = "El estrato máximo es 6")
    private int estrato;

    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaModificacion;
    private String ciudad;
    
    @NotBlank(message = "El usuario es obligatorio")
    private String user;
    
    @NotBlank(message = "La contraseña es obligatoria")
    private String password;

    @Email(message = "El formato del correo no es válido")
    @NotBlank(message = "El correo es obligatorio")
    private String email;
}