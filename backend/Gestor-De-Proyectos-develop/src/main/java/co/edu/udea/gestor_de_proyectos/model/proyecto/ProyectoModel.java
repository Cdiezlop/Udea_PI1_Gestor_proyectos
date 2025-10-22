package co.edu.udea.gestor_de_proyectos.model.proyecto;

import co.edu.udea.gestor_de_proyectos.model.comentarios.ComentariosModel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;


import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

/**
 * @author Tgl. Jhoan Villa y cristian.diez
 * Email: jhoan.villa y cristian.diez
 * @version Id: <b>gestor-de-proyectos</b> 
 **/


@Data
@Getter
@Setter

/**
 * Modelo de respuesta para API (ProyectoModel)
 * Contiene los campos que enviaremos al frontend.
 * Las fechas se formatean con pattern yyyy-MM-dd
 */
public class ProyectoModel {
    private String id;
    private String nombre;
    private String descripcion;
    private Double presupuesto;
    private String categoria;
    private String userId;
    private List<String> compromisosId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaCreacion;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaModificacion;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaFinalizacion;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaCompromiso;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaPrimerAvance;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaRegistro;

    private String estado;

    // Getters / Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Double getPresupuesto() { return presupuesto; }
    public void setPresupuesto(Double presupuesto) { this.presupuesto = presupuesto; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public List<String> getCompromisosId() { return compromisosId; }
    public void setCompromisosId(List<String> compromisosId) { this.compromisosId = compromisosId; }

    public LocalDate getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDate fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public LocalDate getFechaModificacion() { return fechaModificacion; }
    public void setFechaModificacion(LocalDate fechaModificacion) { this.fechaModificacion = fechaModificacion; }

    public LocalDate getFechaFinalizacion() { return fechaFinalizacion; }
    public void setFechaFinalizacion(LocalDate fechaFinalizacion) { this.fechaFinalizacion = fechaFinalizacion; }

    public LocalDate getFechaCompromiso() { return fechaCompromiso; }
    public void setFechaCompromiso(LocalDate fechaCompromiso) { this.fechaCompromiso = fechaCompromiso; }

    public LocalDate getFechaPrimerAvance() { return fechaPrimerAvance; }
    public void setFechaPrimerAvance(LocalDate fechaPrimerAvance) { this.fechaPrimerAvance = fechaPrimerAvance; }

    public LocalDate getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDate fechaRegistro) { this.fechaRegistro = fechaRegistro; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}