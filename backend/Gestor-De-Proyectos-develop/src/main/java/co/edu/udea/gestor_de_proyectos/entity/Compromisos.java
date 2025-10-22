package co.edu.udea.gestor_de_proyectos.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.LocalDate;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b> 01/09/2025, 10:16 a. m.
 **/
@Data
@Document("compromiso")
public class Compromisos {
    @Id
    private String id;
    private String estado;
    private String descripcion;
    private LocalDateTime fechaEstimada;
    private LocalDateTime fechaReal;
}
