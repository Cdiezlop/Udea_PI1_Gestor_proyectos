package co.edu.udea.gestor_de_proyectos.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b> 01/09/2025, 2:40 p. m.
 **/
@Data
@Document("estado")
public class Estados {

    private String id;
    private String name;
}
