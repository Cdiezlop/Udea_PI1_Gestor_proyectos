package co.edu.udea.gestor_de_proyectos.model.dto;

import lombok.Data;

@Data
public class CrearResponsableDTO {
    private String nombre;
    private int edad;
    private String rol;
    private String telefono;
    private String correo;
}