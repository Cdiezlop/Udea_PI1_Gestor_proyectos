package co.edu.udea.gestor_de_proyectos.entity;

import co.edu.udea.gestor_de_proyectos.model.comentarios.ComentariosModel;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa y cristian.diez
 * @version Id: <b>gestor-de-proyectos</b> 21/10/2025, 10:16 a. m.
 **/
@Data
@Document("proyecto")
@Document(collection = "proyectos")

/**
 * Entidad Proyecto - Sprint 3
 * Campos añadidos: fechaCompromiso, fechaPrimerAvance, fechaRegistro (LocalDate, formato yyyy-MM-dd)
 * Comentarios: fechaRegistro se asigna en el service al crear el proyecto.
 */
public class Proyecto {
    @Id
    private String id;

    private String nombre;
    private String descripcion;
    private Double presupuesto;
    private String categoria;
    private String userId;
    private String dirigidoa_a;
    private List<String> compromisosId;

    // Fechas (LocalDate -> yyyy-MM-dd)
    private LocalDate fechaCreacion;
    private LocalDate fechaModificacion;
    private LocalDate fechaFinalizacion;

    // NUEVOS CAMPOS Sprint 3
    private LocalDate fechaCompromiso;
    private LocalDate fechaPrimerAvance;
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

    public String getDirigidoa_a() { return dirigidoa_a; }
    public void setDirigidoa_a(String dirigidoa_a) { this.dirigidoa_a = dirigidoa_a; }

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