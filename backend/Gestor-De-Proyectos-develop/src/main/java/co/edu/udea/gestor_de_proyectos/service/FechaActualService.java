package co.edu.udea.gestor_de_proyectos.service;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;

/**
 * @author Jhoan Villa;
 * Email: jhoan.echeverri
 * @version Id: <b>gestor proyectos </b> 30/08/2025, 11:36 AM
 **/
@Component
public class FechaActualService {
    private static final String ZONE_ID = "UTC";

    public LocalDateTime getCurrentDate() {
        return LocalDateTime.now(ZoneId.of(ZONE_ID));
    }
}
