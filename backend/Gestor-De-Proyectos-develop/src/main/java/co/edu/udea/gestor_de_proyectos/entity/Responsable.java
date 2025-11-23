package co.edu.udea.gestor_de_proyectos.entity;

import lombok.Data;

@Data
public class Responsable {
    private String nombre;
    private int edad;
    private String rol;
    private String telefono;
    private String correo;
}